"use client";

import { useEffect, useRef, useState } from "react";
import type { RealtimeChannel } from "@supabase/supabase-js";
import {
  ensureVisitorSession,
  getSupabaseBrowserClient,
} from "@/lib/supabase/client";

interface Message {
  id: string;
  sender: "visitor" | "dhruv";
  body: string;
  created_at: string;
}

const CONVERSATION_KEY = "dh_conversation_id";

type Status = "loading" | "needs-name" | "ready" | "unavailable";

export default function MessagesApp() {
  const [status, setStatus] = useState<Status>("loading");
  const [name, setName] = useState("");
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const channelRef = useRef<RealtimeChannel | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      const supabase = getSupabaseBrowserClient();
      if (!supabase) {
        setStatus("unavailable");
        return;
      }

      const visitorUid = await ensureVisitorSession();
      if (!visitorUid) {
        setStatus("unavailable");
        return;
      }

      const savedId = localStorage.getItem(CONVERSATION_KEY);
      if (savedId) {
        const { data } = await supabase
          .from("conversations")
          .select("id")
          .eq("id", savedId)
          .maybeSingle();
        if (data?.id && !cancelled) {
          setConversationId(data.id);
          setStatus("ready");
          return;
        }
      }

      if (!cancelled) setStatus("needs-name");
    }

    init();
    return () => {
      cancelled = true;
    };
  }, []);

  // Load history + subscribe once we have a conversation
  useEffect(() => {
    if (!conversationId) return;
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;

    let cancelled = false;

    supabase
      .from("messages")
      .select("id, sender, body, created_at")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true })
      .then(({ data }) => {
        if (!cancelled && data) setMessages(data as Message[]);
      });

    const channel = supabase
      .channel(`messages-${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          const row = payload.new as Message;
          setMessages((prev) =>
            prev.some((m) => m.id === row.id) ? prev : [...prev, row]
          );
        }
      )
      .subscribe();

    channelRef.current = channel;

    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
    };
  }, [conversationId]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  async function handleStart(e: React.FormEvent) {
    e.preventDefault();
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;

    const { data: sessionData } = await supabase.auth.getSession();
    const visitorUid = sessionData.session?.user?.id;
    if (!visitorUid) return;

    const { data, error } = await supabase
      .from("conversations")
      .insert({ visitor_uid: visitorUid, visitor_name: name.trim() || null })
      .select("id")
      .single();

    if (error || !data) return;

    localStorage.setItem(CONVERSATION_KEY, data.id);
    setConversationId(data.id);
    setStatus("ready");
  }

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!conversationId || !draft.trim() || sending) return;
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;

    setSending(true);
    const body = draft.trim();
    setDraft("");

    const optimistic: Message = {
      id: `local-${Date.now()}`,
      sender: "visitor",
      body,
      created_at: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, optimistic]);

    const { error } = await supabase
      .from("messages")
      .insert({ conversation_id: conversationId, sender: "visitor", body });

    if (error) {
      setMessages((prev) => prev.filter((m) => m.id !== optimistic.id));
    }
    setSending(false);
  }

  if (status === "loading") {
    return (
      <div className="flex h-full items-center justify-center text-sm text-text-tertiary">
        Connecting…
      </div>
    );
  }

  if (status === "unavailable") {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 px-8 text-center">
        <p className="text-sm font-medium text-text-primary">Chat is offline</p>
        <p className="text-xs text-text-tertiary">
          Live messaging isn&apos;t configured yet — try the Mail app instead.
        </p>
      </div>
    );
  }

  if (status === "needs-name") {
    return (
      <form
        onSubmit={handleStart}
        className="flex h-full flex-col items-center justify-center gap-4 px-8 text-center"
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-green/10 text-2xl">
          💬
        </div>
        <div>
          <p className="text-sm font-semibold text-text-primary">
            Say hi to Dhruv
          </p>
          <p className="mt-1 text-xs text-text-tertiary">
            What should he call you? (optional)
          </p>
        </div>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          autoFocus
          className="w-full max-w-[240px] rounded-full border border-white/10 bg-bg-primary px-4 py-2 text-center text-sm text-text-primary placeholder:text-text-tertiary focus:border-accent-green/40 focus:outline-none"
        />
        <button
          type="submit"
          className="rounded-full bg-accent-green px-6 py-2 text-sm font-semibold text-black transition-transform hover:scale-[1.03]"
        >
          Start chatting
        </button>
      </form>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div ref={scrollRef} className="flex-1 space-y-2 overflow-y-auto px-4 py-3">
        {messages.length === 0 && (
          <p className="mt-8 text-center text-xs text-text-tertiary">
            Say something — Dhruv usually replies within a day.
          </p>
        )}
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.sender === "visitor" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[75%] rounded-2xl px-3.5 py-2 text-sm ${
                m.sender === "visitor"
                  ? "bg-accent-green text-black"
                  : "bg-bg-elevated text-text-primary"
              }`}
            >
              {m.body}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSend} className="flex gap-2 border-t border-white/5 p-3">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Message"
          className="flex-1 rounded-full border border-white/10 bg-bg-elevated px-4 py-2 text-sm text-text-primary placeholder:text-text-tertiary focus:border-accent-green/40 focus:outline-none"
        />
        <button
          type="submit"
          disabled={!draft.trim()}
          className="rounded-full bg-accent-green px-4 py-2 text-sm font-semibold text-black transition-opacity disabled:opacity-40"
        >
          Send
        </button>
      </form>
    </div>
  );
}
