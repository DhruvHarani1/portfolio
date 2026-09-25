"use client";

import { useState } from "react";

const TO = "dhruvharani5@gmail.com";

export default function MailApp() {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  function handleSend() {
    const params = new URLSearchParams({ subject, body });
    window.location.href = `mailto:${TO}?${params.toString()}`;
  }

  return (
    <div className="flex h-full flex-col">
      <div className="space-y-px border-b border-white/5">
        <div className="flex items-center gap-3 px-4 py-2.5 text-sm">
          <span className="w-14 shrink-0 text-text-tertiary">To:</span>
          <span className="text-text-primary">{TO}</span>
        </div>
        <div className="flex items-center gap-3 px-4 py-2.5 text-sm">
          <span className="w-14 shrink-0 text-text-tertiary">Subject:</span>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="What's this about?"
            className="flex-1 bg-transparent text-text-primary placeholder:text-text-tertiary focus:outline-none"
          />
        </div>
      </div>

      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Write your message…"
        className="flex-1 resize-none bg-transparent px-4 py-3 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none"
      />

      <div className="flex justify-end border-t border-white/5 p-3">
        <button
          onClick={handleSend}
          disabled={!body.trim()}
          className="inline-flex items-center gap-2 rounded-full bg-link-blue px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-link-blue-hover disabled:opacity-40"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
          </svg>
          Send
        </button>
      </div>
    </div>
  );
}
