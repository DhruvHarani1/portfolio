"use client";

import { useState } from "react";
import Link from "next/link";
import { APPS } from "@/lib/desktop/apps";
import type { AppId } from "@/lib/desktop/types";
import AppIconTile from "./AppIconTile";

interface StartMenuProps {
  onOpenApp: (appId: AppId) => void;
  onClose: () => void;
}

export default function StartMenu({ onOpenApp, onClose }: StartMenuProps) {
  const [query, setQuery] = useState("");

  const filtered = APPS.filter((app) =>
    app.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="fixed bottom-[60px] left-1/2 z-50 w-[420px] max-w-[92vw] -translate-x-1/2 overflow-hidden rounded-xl border border-white/10 bg-[#1e1e1e]/85 shadow-2xl shadow-black/60 backdrop-blur-2xl">
        <div className="p-4">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search apps"
            autoFocus
            className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:border-white/25 focus:outline-none"
          />
        </div>

        <div className="px-4 pb-2">
          <p className="mb-2 text-xs font-medium text-white/50">Pinned</p>
          <div className="grid grid-cols-4 gap-2">
            {filtered.map((app) => (
              <button
                key={app.id}
                onClick={() => {
                  onOpenApp(app.id);
                  onClose();
                }}
                className="flex flex-col items-center gap-1.5 rounded-lg p-2 text-center transition-colors hover:bg-white/10"
              >
                <AppIconTile icon={app.icon} accent={app.accent} size={40} />
                <span className="text-[11px] text-white/90">{app.name}</span>
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="col-span-4 py-4 text-center text-xs text-white/40">
                No apps match &ldquo;{query}&rdquo;
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-white/10 bg-black/20 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-link-blue to-accent-green text-[11px] font-bold text-white">
              DH
            </div>
            <span className="text-xs text-white/80">Dhruv Harani</span>
          </div>
          <Link
            href="/"
            className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.636 5.636a9 9 0 1012.728 0M12 3v9" />
            </svg>
            Exit desktop
          </Link>
        </div>
      </div>
    </>
  );
}
