"use client";

import { useEffect, useState } from "react";
import { useBattery } from "@/lib/desktop/useBattery";
import type { DeviceType } from "@/lib/desktop/useDeviceType";

export default function PhoneStatusBar({ deviceType }: { deviceType: DeviceType }) {
  const [time, setTime] = useState("");
  const battery = useBattery();

  useEffect(() => {
    function tick() {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: deviceType === "ios",
        })
      );
    }
    tick();
    const interval = setInterval(tick, 1000 * 15);
    return () => clearInterval(interval);
  }, [deviceType]);

  const isIOS = deviceType === "ios";

  return (
    <div
      className={`relative z-10 flex h-11 shrink-0 items-center justify-between px-5 text-white ${
        isIOS ? "pt-1 text-[15px] font-semibold" : "text-[13px] font-medium"
      }`}
    >
      <span suppressHydrationWarning>{time}</span>

      {isIOS && (
        <div className="pointer-events-none absolute left-1/2 top-1.5 h-5 w-24 -translate-x-1/2 rounded-full bg-black" />
      )}

      <div className="flex items-center gap-1.5">
        {/* Signal */}
        <svg width="16" height="11" viewBox="0 0 16 11" fill="white">
          <rect x="0" y="7" width="3" height="4" rx="0.5" />
          <rect x="4.5" y="5" width="3" height="6" rx="0.5" />
          <rect x="9" y="3" width="3" height="8" rx="0.5" />
          <rect x="13" y="0" width="3" height="11" rx="0.5" />
        </svg>
        {/* Wifi */}
        <svg width="15" height="11" viewBox="0 0 24 18" fill="none" stroke="white" strokeWidth="2">
          <path strokeLinecap="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0" />
          <circle cx="12" cy="17" r="1" fill="white" stroke="none" />
        </svg>
        {/* Battery */}
        {battery.supported && battery.level !== null ? (
          <div className="flex items-center gap-1">
            <span className="text-[13px] tabular-nums">{battery.level}%</span>
            <div className="relative flex h-3.5 w-6 items-center rounded-[3px] border border-white/80 px-[2px]">
              <div
                className="h-2 rounded-[1px] bg-white"
                style={{ width: `${Math.max(6, battery.level)}%` }}
              />
              <div className="absolute -right-[3px] h-1.5 w-[2px] rounded-r-sm bg-white/80" />
            </div>
          </div>
        ) : (
          <div className="relative flex h-3.5 w-6 items-center rounded-[3px] border border-white/80 px-[2px]">
            <div className="absolute -right-[3px] h-1.5 w-[2px] rounded-r-sm bg-white/80" />
          </div>
        )}
      </div>
    </div>
  );
}
