"use client";

import { APPS } from "@/lib/desktop/apps";
import type { AppId } from "@/lib/desktop/types";
import AppIconTile from "../AppIconTile";

interface PhoneAppSwitcherProps {
  recentApps: AppId[];
  onSelect: (appId: AppId) => void;
  onClose: () => void;
}

export default function PhoneAppSwitcher({ recentApps, onSelect, onClose }: PhoneAppSwitcherProps) {
  const apps = recentApps
    .map((id) => APPS.find((a) => a.id === id))
    .filter((a): a is NonNullable<typeof a> => !!a);

  return (
    <div className="fixed inset-0 z-[70] flex flex-col bg-black/70 backdrop-blur-xl" onClick={onClose}>
      <div className="flex items-center justify-between px-5 pt-4">
        <p className="text-sm font-medium text-white/80">Recent apps</p>
        <button onClick={onClose} className="text-xs text-white/60">Done</button>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6">
        {apps.length === 0 && (
          <p className="text-sm text-white/40">No recent apps yet.</p>
        )}
        {apps.map((app) => (
          <button
            key={app.id}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(app.id);
            }}
            className="flex w-full max-w-xs items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 text-left transition-colors hover:bg-white/10"
          >
            <div className="h-10 w-10 shrink-0">
              <AppIconTile icon={app.icon} accent={app.accent} size={40} />
            </div>
            <span className="text-sm font-medium text-white">{app.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
