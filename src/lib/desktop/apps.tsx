import type { ReactNode } from "react";
import type { AppId } from "./types";

export interface AppMeta {
  id: AppId;
  name: string;
  icon: ReactNode;
  accent: string;
  defaultSize: { width: number; height: number };
  /** false hides the app from the taskbar/Start menu (still openable directly, e.g. Task Manager via Ctrl+Alt+Del). Defaults to true. */
  pinned?: boolean;
}

export const APPS: AppMeta[] = [
  {
    id: "explorer",
    name: "File Explorer",
    accent: "linear-gradient(160deg, #FFCA5F 0%, #E8A317 100%)",
    defaultSize: { width: 760, height: 520 },
    icon: (
      <svg viewBox="0 0 24 24" className="h-full w-full" fill="none">
        <path d="M2 6.5A1.5 1.5 0 013.5 5H9l2 2.25h9.5A1.5 1.5 0 0122 8.75v9.75A1.5 1.5 0 0120.5 20h-17A1.5 1.5 0 012 18.5v-12z" fill="#FFE9B3" />
        <path d="M2 9.5A1.5 1.5 0 013.5 8h17A1.5 1.5 0 0122 9.5v9a1.5 1.5 0 01-1.5 1.5h-17A1.5 1.5 0 012 18.5v-9z" fill="#FFC64B" />
      </svg>
    ),
  },
  {
    id: "browser",
    name: "Browser",
    accent: "linear-gradient(160deg, #5AC8FA 0%, #0A84FF 100%)",
    defaultSize: { width: 900, height: 600 },
    icon: (
      <svg viewBox="0 0 24 24" className="h-full w-full" fill="none">
        <circle cx="12" cy="12" r="10" fill="white" />
        <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" stroke="#0A84FF" strokeWidth="1.4" fill="none" />
      </svg>
    ),
  },
  {
    id: "taskmgr",
    name: "Task Manager",
    accent: "linear-gradient(160deg, #3A3A3C 0%, #1c1c1e 100%)",
    defaultSize: { width: 520, height: 480 },
    pinned: false,
    icon: (
      <svg viewBox="0 0 24 24" className="h-full w-full" fill="none" stroke="#4ade80" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 17l4-8 4 5 3-9 3 7 4-4" />
      </svg>
    ),
  },
  {
    id: "bin",
    name: "Recycle Bin",
    accent: "linear-gradient(160deg, #A8ADB4 0%, #6B7280 100%)",
    defaultSize: { width: 480, height: 420 },
    pinned: false,
    icon: (
      <svg viewBox="0 0 24 24" className="h-full w-full" fill="none">
        <path d="M5 7h14l-1.2 13.2a2 2 0 01-2 1.8H8.2a2 2 0 01-2-1.8L5 7z" fill="white" />
        <path d="M3 7h18M9 7V4.5a1 1 0 011-1h4a1 1 0 011 1V7" stroke="#6B7280" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M10 10.5v7M14 10.5v7" stroke="#9CA3AF" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "gallery",
    name: "Gallery",
    accent: "linear-gradient(160deg, #4FC3F7 0%, #1976D2 100%)",
    defaultSize: { width: 860, height: 560 },
    icon: (
      <svg viewBox="0 0 24 24" className="h-full w-full" fill="none">
        <rect x="2" y="4" width="20" height="16" rx="2.5" fill="white" fillOpacity="0.95" />
        <circle cx="8" cy="10" r="2" fill="#1976D2" />
        <path d="M2 17l5.5-5.5a1.5 1.5 0 012.12 0L15 17H2z" fill="#4FC3F7" />
        <path d="M11 17l4.5-4.5a1.5 1.5 0 012.12 0L22 17H11z" fill="#1976D2" />
      </svg>
    ),
  },
  {
    id: "messages",
    name: "Messages",
    accent: "linear-gradient(160deg, #7C5CFC 0%, #4B2FBE 100%)",
    defaultSize: { width: 420, height: 560 },
    icon: (
      <svg viewBox="0 0 24 24" className="h-full w-full" fill="none">
        <path
          d="M3 6.5A2.5 2.5 0 015.5 4h13A2.5 2.5 0 0121 6.5v8a2.5 2.5 0 01-2.5 2.5H9l-4.5 3.5v-3.5H5.5A2.5 2.5 0 013 14.5v-8z"
          fill="white"
        />
        <circle cx="8" cy="10.5" r="1.15" fill="#5A3EDB" />
        <circle cx="12" cy="10.5" r="1.15" fill="#5A3EDB" />
        <circle cx="16" cy="10.5" r="1.15" fill="#5A3EDB" />
      </svg>
    ),
  },
  {
    id: "mail",
    name: "Mail",
    accent: "linear-gradient(160deg, #4FA1FF 0%, #0A5FD6 100%)",
    defaultSize: { width: 520, height: 480 },
    icon: (
      <svg viewBox="0 0 24 24" className="h-full w-full" fill="none">
        <rect x="2" y="5" width="20" height="14" rx="2" fill="white" />
        <path
          d="M3 6.5l8.36 6.07a1 1 0 001.28 0L21 6.5"
          stroke="#0A5FD6"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "notes",
    name: "Notes",
    accent: "linear-gradient(160deg, #FFD54F 0%, #F79F1A 100%)",
    defaultSize: { width: 560, height: 520 },
    icon: (
      <svg viewBox="0 0 24 24" className="h-full w-full" fill="none">
        <rect x="4" y="2.5" width="16" height="19" rx="1.5" fill="white" />
        <rect x="6.5" y="6" width="11" height="1.4" rx="0.7" fill="#F79F1A" />
        <rect x="6.5" y="9.4" width="11" height="1.4" rx="0.7" fill="#F79F1A" />
        <rect x="6.5" y="12.8" width="7" height="1.4" rx="0.7" fill="#F79F1A" />
      </svg>
    ),
  },
  {
    id: "terminal",
    name: "Terminal",
    accent: "linear-gradient(160deg, #2b2b2b 0%, #0a0a0a 100%)",
    defaultSize: { width: 640, height: 440 },
    icon: (
      <svg viewBox="0 0 24 24" className="h-full w-full" fill="none">
        <rect x="2" y="3.5" width="20" height="17" rx="2" fill="#0c0c0c" stroke="#4ade80" strokeWidth="1" />
        <path d="M5.5 8.5l3.5 3-3.5 3" stroke="#4ade80" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="11" y="13.5" width="6" height="1.5" rx="0.75" fill="#4ade80" />
      </svg>
    ),
  },
  {
    id: "resume",
    name: "Resume",
    accent: "linear-gradient(160deg, #FF6B6B 0%, #C62828 100%)",
    defaultSize: { width: 620, height: 640 },
    icon: (
      <svg viewBox="0 0 24 24" className="h-full w-full" fill="none">
        <path d="M6 2.5h8l5 5V21a1 1 0 01-1 1H6a1 1 0 01-1-1V3.5a1 1 0 011-1z" fill="white" />
        <path d="M14 2.5l5 5h-4a1 1 0 01-1-1v-4z" fill="#FFD1D1" />
        <rect x="7.5" y="12" width="9" height="1.4" rx="0.7" fill="#C62828" />
        <rect x="7.5" y="15" width="9" height="1.4" rx="0.7" fill="#C62828" />
        <rect x="7.5" y="18" width="5.5" height="1.4" rx="0.7" fill="#C62828" />
      </svg>
    ),
  },
  {
    id: "settings",
    name: "Settings",
    accent: "linear-gradient(160deg, #B0B4BB 0%, #6B7280 100%)",
    defaultSize: { width: 460, height: 460 },
    icon: (
      <svg viewBox="0 0 24 24" className="h-full w-full" fill="none" stroke="white" strokeWidth="1.6">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
        />
        <circle cx="12" cy="12" r="2.6" />
      </svg>
    ),
  },
];

export function getApp(id: AppId): AppMeta {
  const app = APPS.find((a) => a.id === id);
  if (!app) throw new Error(`Unknown app: ${id}`);
  return app;
}
