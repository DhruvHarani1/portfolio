"use client";

import { useEffect, useRef, useState } from "react";

const BOOKMARKS = [
  { label: "Clarityy AI", url: "https://clarityy.ai" },
  { label: "DevPain-AI", url: "https://dev-pain-ai.netlify.app" },
  { label: "GitHub", url: "https://github.com/DhruvHarani1" },
];

export default function BrowserApp() {
  const [input, setInput] = useState(BOOKMARKS[0].url);
  const [url, setUrl] = useState(BOOKMARKS[0].url);
  const [loadState, setLoadState] = useState<"loading" | "loaded" | "blocked">("loading");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const reset = setTimeout(() => setLoadState("loading"), 0);
    // Many sites send X-Frame-Options/CSP that silently block embedding —
    // there's no reliable cross-origin onError for that, so we fall back
    // to an "open in new tab" card if onLoad hasn't fired in time.
    const timeout = setTimeout(() => setLoadState((s) => (s === "loading" ? "blocked" : s)), 4000);
    return () => {
      clearTimeout(reset);
      clearTimeout(timeout);
    };
  }, [url]);

  function navigate(target: string) {
    let normalized = target.trim();
    if (!/^https?:\/\//i.test(normalized)) normalized = `https://${normalized}`;
    setInput(normalized);
    setUrl(normalized);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    navigate(input);
  }

  return (
    <div className="flex h-full flex-col bg-[#1e1e1e]">
      {/* Address bar */}
      <form onSubmit={handleSubmit} className="flex items-center gap-2 border-b border-white/10 px-3 py-2">
        <button
          type="button"
          onClick={() => navigate(url)}
          aria-label="Reload"
          className="text-white/50 hover:text-white"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
        </button>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/90 focus:border-white/25 focus:outline-none"
        />
        {/* Always available, not just on detected failure — some blocked
            embeds still fire onLoad, which would hide the "blocked" state below. */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open in new tab"
          className="text-white/50 hover:text-white"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
        </a>
      </form>

      {/* Bookmarks bar */}
      <div className="flex items-center gap-1 border-b border-white/10 px-2 py-1.5">
        {BOOKMARKS.map((b) => (
          <button
            key={b.url}
            onClick={() => navigate(b.url)}
            className={`rounded px-2.5 py-1 text-[11px] transition-colors ${
              url === b.url ? "bg-white/15 text-white" : "text-white/60 hover:bg-white/10 hover:text-white"
            }`}
          >
            {b.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="relative flex-1 bg-white">
        {loadState === "loading" && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#1e1e1e] text-xs text-white/50">
            Loading…
          </div>
        )}
        {loadState === "blocked" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#1e1e1e] px-8 text-center">
            <p className="text-sm font-medium text-white">This site can&apos;t be embedded</p>
            <p className="text-xs text-white/50">
              Most sites block being shown inside another page. Open it directly instead.
            </p>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-link-blue px-4 py-2 text-xs font-semibold text-white"
            >
              Open {url} ↗
            </a>
          </div>
        )}
        <iframe
          ref={iframeRef}
          src={url}
          title="Browser"
          onLoad={() => setLoadState("loaded")}
          className={`h-full w-full border-none ${loadState === "loaded" ? "" : "opacity-0"}`}
        />
      </div>
    </div>
  );
}
