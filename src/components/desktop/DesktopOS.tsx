"use client";

import { useEffect, useState } from "react";
import { useWindowStore } from "@/lib/desktop/windowStore";
import { WALLPAPERS, useSettingsStore } from "@/lib/desktop/settingsStore";
import { APPS, getApp } from "@/lib/desktop/apps";
import type { GitHubRepo } from "@/lib/github";
import BootScreen from "./BootScreen";
import Taskbar from "./Taskbar";
import Window from "./Window";
import AppIconTile from "./AppIconTile";
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

const DESKTOP_ICON_IDS: AppId[] = ["resume", "notes"];

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
    const defaultSize = getApp(appId).defaultSize;
    const rect: Rect = isMobile
      ? { x: 0, y: 0, width: window.innerWidth, height: window.innerHeight - 48 }
      : {
          x: window.innerWidth / 2 - defaultSize.width / 2,
          y: Math.max(24, window.innerHeight / 2 - defaultSize.height / 2 - 40),
          width: Math.min(defaultSize.width, window.innerWidth - 80),
          height: Math.min(defaultSize.height, window.innerHeight - 160),
        };
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
      className="fixed inset-0 overflow-hidden bg-cover bg-center"
      style={
        wallpaper.image
          ? { backgroundImage: `url(${wallpaper.image})` }
          : { background: wallpaper.css }
      }
    >
      {/* Desktop icons */}
      {!isMobile && (
        <div className="absolute left-3 top-3 flex flex-col gap-1">
          {DESKTOP_ICON_IDS.map((appId) => {
            const app = APPS.find((a) => a.id === appId)!;
            return (
              <button
                key={appId}
                onDoubleClick={() => handleIconOpen(appId)}
                onClick={() => handleIconOpen(appId)}
                className="flex w-20 flex-col items-center gap-1 rounded p-2 text-center transition-colors hover:bg-white/10 focus:bg-white/15 focus:outline-none"
              >
                <AppIconTile icon={app.icon} accent={app.accent} size={38} />
                <span className="text-[11px] font-medium text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.8)]">
                  {app.name === "Resume" ? "Resume.pdf" : "About Me"}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {windows.map((win) => (
        <Window key={win.id} win={win} isMobile={isMobile}>
          {renderApp(win.appId)}
        </Window>
      ))}

      <Taskbar isMobile={isMobile} />
    </div>
  );
}
