import type { ReactNode } from "react";
import type { AppId } from "./types";

export interface AppMeta {
  id: AppId;
  name: string;
  icon: ReactNode;
  accent: string;
  defaultSize: { width: number; height: number };
}

const iconProps = {
  fill: "none" as const,
  viewBox: "0 0 24 24",
  stroke: "currentColor" as const,
  strokeWidth: 1.75,
};

export const APPS: AppMeta[] = [
  {
    id: "gallery",
    name: "Gallery",
    accent: "linear-gradient(135deg, #2997FF, #5AC8FA)",
    defaultSize: { width: 860, height: 560 },
    icon: (
      <svg {...iconProps}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M18 22.5H6a3.75 3.75 0 01-3.75-3.75V5.25A3.75 3.75 0 016 1.5h12a3.75 3.75 0 013.75 3.75v13.5A3.75 3.75 0 0118 22.5zM8.25 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
  },
  {
    id: "messages",
    name: "Messages",
    accent: "linear-gradient(135deg, #30D158, #2fce7d)",
    defaultSize: { width: 420, height: 560 },
    icon: (
      <svg {...iconProps}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
      </svg>
    ),
  },
  {
    id: "mail",
    name: "Mail",
    accent: "linear-gradient(135deg, #0A84FF, #2997FF)",
    defaultSize: { width: 520, height: 480 },
    icon: (
      <svg {...iconProps}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    id: "notes",
    name: "Notes",
    accent: "linear-gradient(135deg, #FFD60A, #FF9F0A)",
    defaultSize: { width: 560, height: 520 },
    icon: (
      <svg {...iconProps}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
      </svg>
    ),
  },
  {
    id: "terminal",
    name: "Terminal",
    accent: "linear-gradient(135deg, #1D1D1F, #3A3A3C)",
    defaultSize: { width: 640, height: 440 },
    icon: (
      <svg {...iconProps}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3M4.5 3.75h15a1.5 1.5 0 011.5 1.5v13.5a1.5 1.5 0 01-1.5 1.5h-15a1.5 1.5 0 01-1.5-1.5V5.25a1.5 1.5 0 011.5-1.5z" />
      </svg>
    ),
  },
  {
    id: "resume",
    name: "Resume",
    accent: "linear-gradient(135deg, #BF5AF2, #8944ab)",
    defaultSize: { width: 620, height: 640 },
    icon: (
      <svg {...iconProps}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-1.519-2.394a2.25 2.25 0 10-3.86-1.353m3.86 1.353l-2.148-2.148M6 21h12a2.25 2.25 0 002.25-2.25V6.108c0-.464-.184-.909-.513-1.237L15.129 1.263a1.5 1.5 0 00-1.06-.44H6.75A2.25 2.25 0 004.5 3.075v15.675A2.25 2.25 0 006.75 21z" />
      </svg>
    ),
  },
  {
    id: "settings",
    name: "Settings",
    accent: "linear-gradient(135deg, #8E8E93, #636366)",
    defaultSize: { width: 420, height: 420 },
    icon: (
      <svg {...iconProps}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export function getApp(id: AppId): AppMeta {
  const app = APPS.find((a) => a.id === id);
  if (!app) throw new Error(`Unknown app: ${id}`);
  return app;
}
