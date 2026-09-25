"use client";

import { APPS } from "@/lib/desktop/apps";
import type { AppId } from "@/lib/desktop/types";
import type { DeviceType } from "@/lib/desktop/useDeviceType";
import AppIconTile from "../AppIconTile";

const DOCK_APPS: AppId[] = ["messages", "mail", "gallery", "settings"];

interface PhoneHomeScreenProps {
  deviceType: DeviceType;
  onOpenApp: (appId: AppId) => void;
}

export default function PhoneHomeScreen({ deviceType, onOpenApp }: PhoneHomeScreenProps) {
  const isIOS = deviceType === "ios";
  // Task Manager / Recycle Bin stay off the phone grid too — they're
  // desktop-metaphor apps (Ctrl+Alt+Del, a literal bin icon) that don't
  // make sense as touchable mobile apps.
  const gridApps = APPS.filter((a) => !DOCK_APPS.includes(a.id) && a.pinned !== false);
  const dockApps = DOCK_APPS.map((id) => APPS.find((a) => a.id === id)!);

  return (
    <div className="flex h-full flex-col justify-between px-6 pb-4 pt-6">
      {/* App grid */}
      <div className="grid grid-cols-4 gap-x-2 gap-y-5">
        {gridApps.map((app) => (
          <button
            key={app.id}
            onClick={() => onOpenApp(app.id)}
            aria-label={`Open ${app.name}`}
            className="flex flex-col items-center gap-1.5 active:opacity-70"
          >
            <div className={isIOS ? "rounded-[18px] overflow-hidden" : "rounded-2xl overflow-hidden"}>
              <AppIconTile icon={app.icon} accent={app.accent} size={58} />
            </div>
            <span className="text-[11px] font-medium text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.9)]">
              {app.name}
            </span>
          </button>
        ))}
      </div>

      {/* Dock */}
      <div
        className={`flex items-center justify-around px-3 py-3 ${
          isIOS
            ? "rounded-[28px] bg-white/15 backdrop-blur-2xl"
            : "rounded-2xl bg-black/25 backdrop-blur-xl"
        }`}
      >
        {dockApps.map((app) => (
          <button
            key={app.id}
            onClick={() => onOpenApp(app.id)}
            className="active:opacity-70"
            aria-label={`Open ${app.name}`}
          >
            <div className={isIOS ? "rounded-[16px] overflow-hidden" : "rounded-2xl overflow-hidden"}>
              <AppIconTile icon={app.icon} accent={app.accent} size={54} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
