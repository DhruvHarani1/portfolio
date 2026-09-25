"use client";

import { useRef, useState } from "react";
import { APPS } from "@/lib/desktop/apps";
import { useWindowStore } from "@/lib/desktop/windowStore";
import type { AppId, Rect } from "@/lib/desktop/types";
import AppIconTile from "./AppIconTile";
import StartMenu from "./StartMenu";
import SystemTray from "./SystemTray";

interface TaskbarProps {
  isMobile: boolean;
}

export default function Taskbar({ isMobile }: TaskbarProps) {
  const { windows, openApp, focusWindow, minimizeWindow } = useWindowStore();
  const [startOpen, setStartOpen] = useState(false);
  const cascadeOffset = useRef(0);

  function handleOpen(appId: AppId, defaultSize: { width: number; height: number }) {
    const existing = windows.find((w) => w.appId === appId);
    if (existing) {
      if (existing.minimized) {
        focusWindow(existing.id);
      } else {
        minimizeWindow(existing.id);
      }
      return;
    }

    if (isMobile) {
      const rect: Rect = { x: 0, y: 0, width: window.innerWidth, height: window.innerHeight - 48 };
      openApp(appId, rect);
      return;
    }

    cascadeOffset.current = (cascadeOffset.current + 1) % 6;
    const offset = cascadeOffset.current;
    const rect: Rect = {
      x: Math.max(40, window.innerWidth / 2 - defaultSize.width / 2 + offset * 24),
      y: Math.max(24, window.innerHeight / 2 - defaultSize.height / 2 - 40 + offset * 24),
      width: Math.min(defaultSize.width, window.innerWidth - 80),
      height: Math.min(defaultSize.height, window.innerHeight - 160),
    };
    openApp(appId, rect);
  }

  return (
    <>
      {startOpen && (
        <StartMenu
          onOpenApp={(id) => handleOpen(id, APPS.find((a) => a.id === id)!.defaultSize)}
          onClose={() => setStartOpen(false)}
        />
      )}
      <div className="fixed inset-x-0 bottom-0 z-40 flex h-12 items-center justify-between border-t border-white/10 bg-[#1a1a1a]/75 px-2 backdrop-blur-2xl">
        {/* Left spacer to balance the centered group (desktop only) */}
        <div className={isMobile ? "hidden" : "flex-1"} />

        <div className="flex items-center gap-1">
          {/* Start button */}
          <button
            onClick={() => setStartOpen((o) => !o)}
            aria-label="Start"
            className={`flex h-9 w-11 items-center justify-center rounded-md transition-colors ${
              startOpen ? "bg-white/15" : "hover:bg-white/10"
            }`}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
              <rect x="2" y="2" width="9" height="9" rx="1.2" fill="#4FA1FF" />
              <rect x="13" y="2" width="9" height="9" rx="1.2" fill="#30D158" />
              <rect x="2" y="13" width="9" height="9" rx="1.2" fill="#FFD54F" />
              <rect x="13" y="13" width="9" height="9" rx="1.2" fill="#FF6B6B" />
            </svg>
          </button>

          {/* Pinned + running apps */}
          {APPS.map((app) => {
            const win = windows.find((w) => w.appId === app.id);
            const isRunning = !!win;
            const isFocused =
              isRunning &&
              !win!.minimized &&
              win!.zIndex === Math.max(...windows.map((w) => w.zIndex));

            return (
              <button
                key={app.id}
                onClick={() => handleOpen(app.id, app.defaultSize)}
                aria-label={`Open ${app.name}`}
                className={`group relative flex h-9 w-11 items-center justify-center rounded-md transition-colors ${
                  isFocused ? "bg-white/15" : "hover:bg-white/10"
                }`}
              >
                <div className="h-6 w-6">
                  <AppIconTile icon={app.icon} accent={app.accent} size={24} />
                </div>
                <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-black/85 px-2 py-1 text-[11px] text-white opacity-0 transition-opacity group-hover:opacity-100">
                  {app.name}
                </span>
                <span
                  className={`absolute bottom-0.5 left-1/2 h-[3px] -translate-x-1/2 rounded-full bg-white transition-all ${
                    isRunning ? (isFocused ? "w-4 opacity-100" : "w-1.5 opacity-70") : "w-0 opacity-0"
                  }`}
                />
              </button>
            );
          })}
        </div>

        <div className="flex flex-1 justify-end">
          <SystemTray />
        </div>
      </div>
    </>
  );
}
