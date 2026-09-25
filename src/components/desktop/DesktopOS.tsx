"use client";

import { useEffect, useState } from "react";
import { useWindowStore } from "@/lib/desktop/windowStore";
import { WALLPAPERS, useSettingsStore } from "@/lib/desktop/settingsStore";
import type { GitHubRepo } from "@/lib/github";
import BootScreen from "./BootScreen";
import MenuBar from "./MenuBar";
import Dock from "./Dock";
import Window from "./Window";
import GalleryApp from "./apps/GalleryApp";
import MessagesApp from "./apps/MessagesApp";
import MailApp from "./apps/MailApp";
import NotesApp from "./apps/NotesApp";
import TerminalApp from "./apps/TerminalApp";
import ResumeApp from "./apps/ResumeApp";
import SettingsApp from "./apps/SettingsApp";
import type { AppId, Rect } from "@/lib/desktop/types";

interface DesktopOSProps {
  repos: GitHubRepo[];
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return isMobile;
}

const DESKTOP_ICONS: { appId: AppId; label: string; emoji: string }[] = [
  { appId: "resume", label: "Resume.pdf", emoji: "📄" },
  { appId: "notes", label: "About Me", emoji: "📝" },
];

export default function DesktopOS({ repos }: DesktopOSProps) {
  const [booted, setBooted] = useState(false);
  const { windows, openApp, focusWindow } = useWindowStore();
  const { wallpaperId } = useSettingsStore();
  const isMobile = useIsMobile();

  const wallpaper =
    WALLPAPERS.find((w) => w.id === wallpaperId) ?? WALLPAPERS[0];

  function handleIconOpen(appId: AppId) {
    const existing = windows.find((w) => w.appId === appId);
    if (existing) {
      focusWindow(existing.id);
      return;
    }
    const rect: Rect = isMobile
      ? { x: 0, y: 28, width: window.innerWidth, height: window.innerHeight - 28 }
      : { x: window.innerWidth / 2 - 300, y: 100, width: 600, height: 620 };
    openApp(appId, rect);
  }

  function renderApp(appId: AppId) {
    switch (appId) {
      case "gallery":
        return <GalleryApp repos={repos} />;
      case "messages":
        return <MessagesApp />;
      case "mail":
        return <MailApp />;
      case "notes":
        return <NotesApp />;
      case "terminal":
        return <TerminalApp />;
      case "resume":
        return <ResumeApp />;
      case "settings":
        return <SettingsApp />;
      default:
        return null;
    }
  }

  if (!booted) {
    return <BootScreen onDone={() => setBooted(true)} />;
  }

  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{ background: wallpaper.css }}
    >
      <MenuBar />

      {/* Desktop icons */}
      {!isMobile && (
        <div className="absolute left-4 top-10 flex flex-col gap-4">
          {DESKTOP_ICONS.map((icon) => (
            <button
              key={icon.appId}
              onDoubleClick={() => handleIconOpen(icon.appId)}
              onClick={() => handleIconOpen(icon.appId)}
              className="flex w-20 flex-col items-center gap-1 rounded-lg p-2 text-center transition-colors hover:bg-white/10"
            >
              <span className="text-3xl drop-shadow">{icon.emoji}</span>
              <span className="text-[11px] font-medium text-white drop-shadow">
                {icon.label}
              </span>
            </button>
          ))}
        </div>
      )}

      {windows.map((win) => (
        <Window key={win.id} win={win} isMobile={isMobile}>
          {renderApp(win.appId)}
        </Window>
      ))}

      <Dock isMobile={isMobile} />
    </div>
  );
}
