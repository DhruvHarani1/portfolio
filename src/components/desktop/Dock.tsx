"use client";

import { useRef } from "react";
import { APPS } from "@/lib/desktop/apps";
import { useWindowStore } from "@/lib/desktop/windowStore";
import type { AppId, Rect } from "@/lib/desktop/types";

interface DockProps {
  isMobile: boolean;
}

export default function Dock({ isMobile }: DockProps) {
  const { windows, openApp, focusWindow } = useWindowStore();
  const cascadeOffset = useRef(0);

  function handleOpen(appId: AppId, defaultSize: { width: number; height: number }) {
    const existing = windows.find((w) => w.appId === appId);
    if (existing) {
      focusWindow(existing.id);
      return;
    }

    if (isMobile) {
      const rect: Rect = { x: 0, y: 28, width: window.innerWidth, height: window.innerHeight - 28 };
      openApp(appId, rect);
      return;
    }

    cascadeOffset.current = (cascadeOffset.current + 1) % 6;
    const offset = cascadeOffset.current;
    const rect: Rect = {
      x: Math.max(40, window.innerWidth / 2 - defaultSize.width / 2 + offset * 24),
      y: Math.max(48, window.innerHeight / 2 - defaultSize.height / 2 - 40 + offset * 24),
      width: Math.min(defaultSize.width, window.innerWidth - 80),
      height: Math.min(defaultSize.height, window.innerHeight - 160),
    };
    openApp(appId, rect);
  }

  return (
    <div className="fixed bottom-4 left-1/2 z-40 -translate-x-1/2">
      <div className="flex items-end gap-2 rounded-2xl border border-white/10 bg-bg-elevated/70 px-3 py-2.5 shadow-2xl shadow-black/40 backdrop-blur-2xl">
        {APPS.map((app) => {
          const isRunning = windows.some((w) => w.appId === app.id);
          return (
            <button
              key={app.id}
              onClick={() => handleOpen(app.id, app.defaultSize)}
              aria-label={`Open ${app.name}`}
              className="group relative flex flex-col items-center"
            >
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-lg transition-transform duration-200 ease-out group-hover:-translate-y-2 group-hover:scale-110 sm:h-14 sm:w-14"
                style={{ background: app.accent }}
              >
                {app.icon}
              </div>
              <span
                className={`mt-1 h-1 w-1 rounded-full bg-text-primary transition-opacity ${
                  isRunning ? "opacity-100" : "opacity-0"
                }`}
              />
              <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-black/80 px-2 py-1 text-[11px] text-white opacity-0 transition-opacity group-hover:opacity-100">
                {app.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
