"use client";

import { useEffect, useState } from "react";
import { useWindowStore } from "@/lib/desktop/windowStore";
import { WALLPAPERS, useSettingsStore } from "@/lib/desktop/settingsStore";
import { APPS } from "@/lib/desktop/apps";
import { useDeviceType } from "@/lib/desktop/useDeviceType";
import { useContextMenu } from "@/lib/desktop/useContextMenu";
import { playBootChime } from "@/lib/desktop/sound";
import type { GitHubRepo } from "@/lib/github";
import BootScreen from "./BootScreen";
import LockScreen from "./LockScreen";
import Taskbar from "./Taskbar";
import Window from "./Window";
import AppIconTile from "./AppIconTile";
import WallpaperBackground from "./WallpaperBackground";
import ContextMenu from "./ContextMenu";
import PhoneStatusBar from "./mobile/PhoneStatusBar";
import PhoneHomeScreen from "./mobile/PhoneHomeScreen";
import PhoneNavBar from "./mobile/PhoneNavBar";
import PhoneAppSwitcher from "./mobile/PhoneAppSwitcher";
import ShortcutsOverlay from "./ShortcutsOverlay";
import GalleryApp from "./apps/GalleryApp";
import MessagesApp from "./apps/MessagesApp";
import MailApp from "./apps/MailApp";
import NotesApp from "./apps/NotesApp";
import TerminalApp from "./apps/TerminalApp";
import ResumeApp from "./apps/ResumeApp";
import SettingsApp from "./apps/SettingsApp";
import ExplorerApp from "./apps/ExplorerApp";
import BrowserApp from "./apps/BrowserApp";
import TaskManagerApp from "./apps/TaskManagerApp";
import BinApp from "./apps/BinApp";
import WeatherWidget from "./WeatherWidget";
import type { AppId } from "@/lib/desktop/types";

interface DesktopOSProps {
  repos: GitHubRepo[];
}

type Stage = "booting" | "locked" | "unlocked";

const DESKTOP_ICON_IDS: AppId[] = ["resume", "notes", "bin"];
const DESKTOP_ICON_LABELS: Partial<Record<AppId, string>> = {
  resume: "Resume.pdf",
  notes: "About Me",
};

export default function DesktopOS({ repos }: DesktopOSProps) {
  const [stage, setStage] = useState<Stage>("booting");
  const [mobileApp, setMobileApp] = useState<AppId | null>(null);
  const [recentMobileApps, setRecentMobileApps] = useState<AppId[]>([]);
  const [switcherOpen, setSwitcherOpen] = useState(false);
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const { windows, openAppCentered, focusWindow, closeWindow, snapPreview } = useWindowStore();
  const { wallpaperId, soundEnabled } = useSettingsStore();
  const deviceType = useDeviceType();
  const isMobile = deviceType !== "desktop";
  const desktopMenu = useContextMenu();
  const iconMenu = useContextMenu();

  const wallpaper =
    WALLPAPERS.find((w) => w.id === wallpaperId) ?? WALLPAPERS[0];
  const mobileWallpaper = wallpaper.mobileImage
    ? { ...wallpaper, image: wallpaper.mobileImage }
    : wallpaper;

  function handleUnlock() {
    if (soundEnabled) playBootChime();
    setStage("unlocked");
  }

  function handleIconOpen(appId: AppId) {
    const existing = windows.find((w) => w.appId === appId);
    if (existing) {
      focusWindow(existing.id);
      return;
    }
    openAppCentered(appId);
  }

  function openMobileApp(appId: AppId) {
    setMobileApp(appId);
    setSwitcherOpen(false);
    setRecentMobileApps((prev) => [appId, ...prev.filter((id) => id !== appId)].slice(0, 6));
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
      case "explorer":
        return <ExplorerApp />;
      case "browser":
        return <BrowserApp />;
      case "taskmgr":
        return <TaskManagerApp />;
      case "bin":
        return <BinApp />;
      default:
        return null;
    }
  }

  // Ctrl+Alt+Delete opens Task Manager, "?" shows shortcuts — both skipped
  // while typing in any app's own input (Terminal, chat, address bar, etc).
  useEffect(() => {
    if (isMobile) return;
    function isTypingTarget(target: EventTarget | null) {
      if (!(target instanceof HTMLElement)) return false;
      return (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      );
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.ctrlKey && e.altKey && e.key === "Delete") {
        e.preventDefault();
        handleIconOpen("taskmgr");
        return;
      }
      if (e.key === "?" && !isTypingTarget(e.target)) {
        e.preventDefault();
        setShortcutsOpen((o) => !o);
      }
      if (e.key === "Escape") setShortcutsOpen(false);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  if (stage === "booting") {
    return <BootScreen onDone={() => setStage("locked")} />;
  }

  if (stage === "locked") {
    return <LockScreen wallpaper={wallpaper} onUnlock={handleUnlock} />;
  }

  // Phone shell: iOS or Android home-screen chrome, one app open at a time
  if (isMobile) {
    return (
      <WallpaperBackground wallpaper={mobileWallpaper} className="fixed inset-0 flex flex-col overflow-hidden">
        <PhoneStatusBar deviceType={deviceType} />
        {mobileApp ? (
          <div className="flex min-h-0 flex-1 flex-col">
            <div className="min-h-0 flex-1 bg-bg-elevated text-text-primary">
              {renderApp(mobileApp)}
            </div>
            <PhoneNavBar
              deviceType={deviceType}
              onHome={() => setMobileApp(null)}
              onRecents={() => setSwitcherOpen(true)}
            />
          </div>
        ) : (
          <PhoneHomeScreen deviceType={deviceType} onOpenApp={openMobileApp} />
        )}
        {switcherOpen && (
          <PhoneAppSwitcher
            recentApps={recentMobileApps}
            onSelect={openMobileApp}
            onClose={() => setSwitcherOpen(false)}
          />
        )}
      </WallpaperBackground>
    );
  }

  // Desktop shell: Windows 11-style taskbar and floating windows
  return (
    <WallpaperBackground
      wallpaper={wallpaper}
      className="fixed inset-0 overflow-hidden"
    >
      <div
        className="absolute inset-0"
        onContextMenu={(e) =>
          desktopMenu.open(e, [
            {
              label: "Refresh",
              onClick: () => {},
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
              ),
            },
            {
              label: "Personalize",
              onClick: () => handleIconOpen("settings"),
              icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
                </svg>
              ),
            },
            {
              label: "Display settings",
              onClick: () => handleIconOpen("settings"),
              separatorBefore: true,
            },
            {
              label: "Keyboard shortcuts",
              onClick: () => setShortcutsOpen(true),
              separatorBefore: true,
            },
          ])
        }
      />

      <div className="absolute left-3 top-3 flex flex-col gap-1">
        {DESKTOP_ICON_IDS.map((appId) => {
          const app = APPS.find((a) => a.id === appId)!;
          return (
            <button
              key={appId}
              onDoubleClick={() => handleIconOpen(appId)}
              onClick={() => handleIconOpen(appId)}
              onContextMenu={(e) =>
                iconMenu.open(e, [
                  { label: "Open", onClick: () => handleIconOpen(appId) },
                  {
                    label: "Properties",
                    onClick: () => handleIconOpen("settings"),
                    separatorBefore: true,
                  },
                ])
              }
              className="flex w-20 flex-col items-center gap-1 rounded p-2 text-center transition-colors hover:bg-white/10 focus:bg-white/15 focus:outline-none"
            >
              <AppIconTile icon={app.icon} accent={app.accent} size={38} />
              <span className="text-[11px] font-medium text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.8)]">
                {DESKTOP_ICON_LABELS[appId] ?? app.name}
              </span>
            </button>
          );
        })}
      </div>

      <div className="absolute right-3 top-3">
        <WeatherWidget />
      </div>

      {snapPreview && (
        <div
          className="pointer-events-none fixed z-[60] rounded-lg border-2 border-link-blue bg-link-blue/20 transition-all duration-100"
          style={{
            left: snapPreview.x,
            top: snapPreview.y,
            width: snapPreview.width,
            height: snapPreview.height,
          }}
        />
      )}

      {windows.map((win) => (
        <Window
          key={win.id}
          win={win}
          onContextMenu={(e) =>
            iconMenu.open(e, [
              { label: "Restore/Open", onClick: () => focusWindow(win.id) },
              {
                label: "Close window",
                onClick: () => closeWindow(win.id),
                danger: true,
                separatorBefore: true,
              },
            ])
          }
        >
          {renderApp(win.appId)}
        </Window>
      ))}

      <Taskbar />

      {desktopMenu.menu && (
        <ContextMenu
          x={desktopMenu.menu.x}
          y={desktopMenu.menu.y}
          items={desktopMenu.menu.items}
          onClose={desktopMenu.close}
        />
      )}
      {iconMenu.menu && (
        <ContextMenu
          x={iconMenu.menu.x}
          y={iconMenu.menu.y}
          items={iconMenu.menu.items}
          onClose={iconMenu.close}
        />
      )}

      {shortcutsOpen && <ShortcutsOverlay onClose={() => setShortcutsOpen(false)} />}
    </WallpaperBackground>
  );
}
