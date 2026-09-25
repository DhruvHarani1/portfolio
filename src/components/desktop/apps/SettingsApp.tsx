"use client";

import { useState } from "react";
import { WALLPAPERS, useSettingsStore } from "@/lib/desktop/settingsStore";
import { useDeviceType } from "@/lib/desktop/useDeviceType";

const TABS = ["Personalization", "Display", "About"] as const;
type Tab = (typeof TABS)[number];

const TAB_ICONS: Record<Tab, React.ReactNode> = {
  Personalization: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
    </svg>
  ),
  Display: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
    </svg>
  ),
  About: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    </svg>
  ),
};

export default function SettingsApp() {
  const { wallpaperId, setWallpaper, soundEnabled, toggleSound } = useSettingsStore();
  const deviceType = useDeviceType();
  const [tab, setTab] = useState<Tab>("Personalization");

  return (
    <div className="flex h-full">
      <div className="w-40 shrink-0 border-r border-white/10 bg-white/[0.02] p-2">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-xs transition-colors ${
              tab === t ? "bg-white/10 text-text-primary" : "text-text-secondary hover:bg-white/5"
            }`}
          >
            <span className="h-4 w-4 shrink-0">{TAB_ICONS[t]}</span>
            {t}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        {tab === "Personalization" && (
          <>
            <h3 className="text-sm font-semibold text-text-primary">Wallpaper</h3>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {WALLPAPERS.map((wp) => (
                <button
                  key={wp.id}
                  onClick={() => setWallpaper(wp.id)}
                  className={`h-20 rounded-lg border-2 bg-cover bg-center transition-all ${
                    wallpaperId === wp.id
                      ? "border-link-blue"
                      : "border-transparent hover:border-white/20"
                  }`}
                  style={
                    wp.image
                      ? { backgroundImage: `url(${wp.image})` }
                      : { background: wp.css }
                  }
                  aria-label={wp.label}
                />
              ))}
            </div>

            <h3 className="mt-6 text-sm font-semibold text-text-primary">Sound</h3>
            <button
              onClick={toggleSound}
              className="mt-3 flex w-full items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-xs text-text-secondary hover:bg-white/[0.07]"
            >
              Startup chime
              <span
                className={`relative h-5 w-9 rounded-full transition-colors ${
                  soundEnabled ? "bg-link-blue" : "bg-white/15"
                }`}
              >
                <span
                  className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-transform ${
                    soundEnabled ? "translate-x-4" : "translate-x-0.5"
                  }`}
                />
              </span>
            </button>
          </>
        )}

        {tab === "Display" && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-text-primary">Display</h3>
            <Row label="Resolution" value={typeof window !== "undefined" ? `${window.innerWidth} × ${window.innerHeight}` : "—"} />
            <Row label="Shell" value={deviceType === "desktop" ? "Windows 11-style desktop" : deviceType === "ios" ? "iOS home screen" : "Android home screen"} />
            <Row label="Color mode" value="Dark" />
            <Row label="Scale" value="100%" />
          </div>
        )}

        {tab === "About" && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-text-primary">About this Desktop</h3>
            <p className="text-xs leading-relaxed text-text-secondary">
              A playful, interactive corner of Dhruv&apos;s portfolio — a little
              desktop OS with real apps: live chat, a project gallery, a file
              explorer, and a terminal easter egg. Built with Next.js, React,
              and Supabase Realtime.
            </p>
            <div className="space-y-0 pt-2">
              <Row label="Device name" value="DHRUV-OS" />
              <Row label="Edition" value="Portfolio, 2026" />
              <Row label="Processor" value="Backend-leaning brain" />
              <Row label="Installed RAM" value="5+ shipped projects" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-white/5 py-2 text-xs">
      <span className="text-text-tertiary">{label}</span>
      <span className="text-text-secondary">{value}</span>
    </div>
  );
}
