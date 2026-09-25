"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { RealtimeChannel } from "@supabase/supabase-js";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

interface Conversation {
  id: string;
  visitor_name: string | null;
  created_at: string;
  last_message_at: string;
  unread_by_admin: boolean;
}

interface Message {
  id: string;
  sender: "visitor" | "dhruv";
  body: string;
  created_at: string;
}

const POLL_MS = 4000;

export default function InboxClient() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [search, setSearch] = useState("");
  const [visitorTyping, setVisitorTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const channelRef = useRef<RealtimeChannel | null>(null);
  const visitorTypingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();

  const loadConversations = useCallback(async () => {
    const res = await fetch("/api/admin/conversations");
    if (!res.ok) return;
    const data = await res.json();
    setConversations(data.conversations ?? []);
  }, []);

  const loadMessages = useCallback(async (conversationId: string) => {
    const res = await fetch(
      `/api/admin/messages?conversation_id=${conversationId}`
    );
    if (!res.ok) return;
    const data = await res.json();
    setMessages(data.messages ?? []);
  }, []);

  useEffect(() => {
    const kickoff = setTimeout(loadConversations, 0);
    const interval = setInterval(loadConversations, POLL_MS);
    return () => {
      clearTimeout(kickoff);
      clearInterval(interval);
    };
  }, [loadConversations]);

  useEffect(() => {
    if (!activeId) return;

    const kickoff = setTimeout(() => {
      loadMessages(activeId);
      fetch("/api/admin/read", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversation_id: activeId }),
      }).then(() => loadConversations());
    }, 0);

    const interval = setInterval(() => loadMessages(activeId), POLL_MS);
    return () => {
      clearTimeout(kickoff);
      clearInterval(interval);
    };
  }, [activeId, loadMessages, loadConversations]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  // Typing indicator — a broadcast-only channel (no DB writes/RLS involved),
  // safe to use with the public anon key on both the visitor and admin side.
  useEffect(() => {
    const reset = setTimeout(() => setVisitorTyping(false), 0);
    if (!activeId) return () => clearTimeout(reset);
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return () => clearTimeout(reset);

    const channel = supabase
      .channel(`messages-${activeId}`)
      .on("broadcast", { event: "typing" }, (payload) => {
        if (payload.payload?.sender !== "visitor") return;
        setVisitorTyping(true);
        if (visitorTypingTimeoutRef.current) clearTimeout(visitorTypingTimeoutRef.current);
        visitorTypingTimeoutRef.current = setTimeout(() => setVisitorTyping(false), 3000);
      })
      .subscribe();

    channelRef.current = channel;

    return () => {
      clearTimeout(reset);
      supabase.removeChannel(channel);
      if (visitorTypingTimeoutRef.current) clearTimeout(visitorTypingTimeoutRef.current);
    };
  }, [activeId]);

  function handleDraftChange(value: string) {
    setDraft(value);
    channelRef.current?.send({
      type: "broadcast",
      event: "typing",
      payload: { sender: "dhruv" },
    });
  }

  async function handleReply(e: React.FormEvent) {
    e.preventDefault();
    if (!activeId || !draft.trim() || sending) return;
    setSending(true);
    const body = draft.trim();
    setDraft("");
    const res = await fetch("/api/admin/reply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ conversation_id: activeId, body }),
    });
    if (res.ok) {
      await loadMessages(activeId);
      await loadConversations();
    }
    setSending(false);
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  }

  const active = conversations.find((c) => c.id === activeId);
  const filteredConversations = conversations.filter((c) =>
    (c.visitor_name || "Anonymous visitor")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen">
      {/* Conversation list */}
      <div className="flex w-full max-w-xs shrink-0 flex-col border-r border-white/5 bg-bg-elevated">
        <div className="flex items-center justify-between border-b border-white/5 px-4 py-4">
          <h1 className="text-sm font-semibold text-text-primary">Inbox</h1>
          <button
            onClick={handleLogout}
            className="text-xs text-text-tertiary transition-colors hover:text-text-primary"
          >
            Log out
          </button>
        </div>
        <div className="border-b border-white/5 px-3 py-2.5">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search conversations"
            className="w-full rounded-full border border-white/10 bg-bg-primary px-3 py-1.5 text-xs text-text-primary placeholder:text-text-tertiary focus:border-link-blue/40 focus:outline-none"
          />
        </div>
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.length === 0 && (
            <p className="p-4 text-sm text-text-tertiary">
              {conversations.length === 0 ? "No conversations yet." : "No matches."}
            </p>
          )}
          {filteredConversations.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveId(c.id)}
              className={`flex w-full items-center justify-between border-b border-white/5 px-4 py-3 text-left transition-colors ${
                activeId === c.id ? "bg-link-blue/10" : "hover:bg-white/5"
              }`}
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-text-primary">
                  {c.visitor_name || "Anonymous visitor"}
                </p>
                <p className="text-xs text-text-tertiary">
                  {new Date(c.last_message_at).toLocaleString()}
                </p>
              </div>
              {c.unread_by_admin && (
                <span className="ml-2 h-2 w-2 shrink-0 rounded-full bg-link-blue" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Active conversation */}
      <div className="flex flex-1 flex-col bg-bg-primary">
        {active ? (
          <>
            <div className="border-b border-white/5 px-6 py-4">
              <p className="text-sm font-semibold text-text-primary">
                {active.visitor_name || "Anonymous visitor"}
              </p>
              {visitorTyping && (
                <p className="mt-0.5 text-xs text-link-blue">typing…</p>
              )}
            </div>
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-6 py-4">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.sender === "dhruv" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm ${
                      m.sender === "dhruv"
                        ? "bg-link-blue text-white"
                        : "bg-bg-elevated text-text-primary"
                    }`}
                  >
                    {m.body}
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleReply} className="flex gap-2 border-t border-white/5 p-4">
              <input
                value={draft}
                onChange={(e) => handleDraftChange(e.target.value)}
                placeholder="Type a reply…"
                className="flex-1 rounded-full border border-white/10 bg-bg-elevated px-4 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary focus:border-link-blue/40 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!draft.trim() || sending}
                className="rounded-full bg-link-blue px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-link-blue-hover disabled:opacity-50"
              >
                Send
              </button>
            </form>
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center text-sm text-text-tertiary">
            Select a conversation
          </div>
        )}
      </div>
    </div>
  );
}
