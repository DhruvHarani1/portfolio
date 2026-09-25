"use client";

import type { DeviceType } from "@/lib/desktop/useDeviceType";

interface PhoneNavBarProps {
  deviceType: DeviceType;
  onHome: () => void;
}

export default function PhoneNavBar({ deviceType, onHome }: PhoneNavBarProps) {
  if (deviceType === "ios") {
    return (
      <button
        onClick={onHome}
        aria-label="Go home"
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
      <button onClick={onHome} aria-label="Recent apps" className="text-white/80 active:text-white">
        <div className="h-3.5 w-3.5 rounded-[3px] border-2 border-current" />
      </button>
    </div>
  );
}
