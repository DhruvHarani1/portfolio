"use client";

import { useEffect, useState } from "react";
import { useBattery } from "@/lib/desktop/useBattery";
import { useSettingsStore } from "@/lib/desktop/settingsStore";

export default function SystemTray() {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const battery = useBattery();
  const { soundEnabled, toggleSound } = useSettingsStore();

  useEffect(() => {
    function tick() {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }));
      setDate(now.toLocaleDateString("en-US", { month: "numeric", day: "numeric", year: "numeric" }));
    }
    tick();
    const interval = setInterval(tick, 1000 * 15);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-3 px-3 text-white">
      {/* Network — decorative, browsers can't read real connectivity detail */}
      <svg className="h-4 w-4 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12 18.75h.008v.008H12v-.008z" />
      </svg>

      {/* Volume — toggles the boot chime / any future desktop sounds */}
      <button
        onClick={toggleSound}
        aria-label={soundEnabled ? "Mute sound" : "Unmute sound"}
        className="opacity-80 transition-opacity hover:opacity-100"
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.757 3.63 8.25 4.51 8.25H6.75z" />
          {soundEnabled ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75l4.5 4.5m0-4.5l-4.5 4.5" />
          )}
        </svg>
      </button>

      {/* Battery — only rendered when the real Battery Status API is available */}
      {battery.supported && battery.level !== null && (
        <div className="flex items-center gap-1" title={battery.charging ? "Charging" : "On battery"}>
          <div className="relative flex h-3.5 w-6 items-center rounded-[3px] border border-white/70 px-[2px]">
            <div
              className="h-2 rounded-[1px] bg-white"
              style={{ width: `${Math.max(6, battery.level)}%` }}
            />
            <div className="absolute -right-[3px] h-1.5 w-[2px] rounded-r-sm bg-white/70" />
          </div>
          <span className="text-xs tabular-nums opacity-90">{battery.level}%</span>
        </div>
      )}

      <div className="text-right text-xs leading-tight">
        <div suppressHydrationWarning>{time}</div>
        <div suppressHydrationWarning className="opacity-70">{date}</div>
      </div>
    </div>
  );
}
