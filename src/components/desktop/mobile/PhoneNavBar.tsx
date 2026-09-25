"use client";

import { useRef } from "react";
import type { DeviceType } from "@/lib/desktop/useDeviceType";

interface PhoneNavBarProps {
  deviceType: DeviceType;
  onHome: () => void;
  onRecents: () => void;
}

const LONG_PRESS_MS = 450;

export default function PhoneNavBar({ deviceType, onHome, onRecents }: PhoneNavBarProps) {
  const pressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const longPressed = useRef(false);

  function startPress() {
    longPressed.current = false;
    pressTimer.current = setTimeout(() => {
      longPressed.current = true;
      onRecents();
    }, LONG_PRESS_MS);
  }

  function endPress() {
    if (pressTimer.current) clearTimeout(pressTimer.current);
    if (!longPressed.current) onHome();
  }

  if (deviceType === "ios") {
    return (
      <button
        onMouseDown={startPress}
        onMouseUp={endPress}
        onMouseLeave={() => pressTimer.current && clearTimeout(pressTimer.current)}
        onTouchStart={startPress}
        onTouchEnd={endPress}
        aria-label="Go home (hold for recent apps)"
        className="flex h-8 shrink-0 items-center justify-center bg-black"
      >
        <div className="h-1.5 w-32 rounded-full bg-white" />
      </button>
    );
  }

  return (
    <div className="flex h-12 shrink-0 items-center justify-around bg-black px-10">
      <button onClick={onHome} aria-label="Back" className="text-white/80 active:text-white">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button onClick={onHome} aria-label="Home" className="text-white/80 active:text-white">
        <div className="h-4 w-4 rounded-full border-2 border-current" />
      </button>
      <button onClick={onRecents} aria-label="Recent apps" className="text-white/80 active:text-white">
        <div className="h-3.5 w-3.5 rounded-[3px] border-2 border-current" />
      </button>
    </div>
  );
}
