"use client";

import { useEffect, useState } from "react";
import WallpaperBackground from "./WallpaperBackground";
import type { Wallpaper } from "@/lib/desktop/settingsStore";

interface LockScreenProps {
  wallpaper: Wallpaper;
  onUnlock: () => void;
}

export default function LockScreen({ wallpaper, onUnlock }: LockScreenProps) {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [unlocking, setUnlocking] = useState(false);

  useEffect(() => {
    function tick() {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }));
      setDate(now.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }));
    }
    tick();
    const interval = setInterval(tick, 1000 * 15);
    return () => clearInterval(interval);
  }, []);

  function handleUnlock() {
    if (unlocking) return;
    setUnlocking(true);
    setTimeout(onUnlock, 350);
  }

  useEffect(() => {
    function handleKey() {
      handleUnlock();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unlocking]);

  return (
    <button
      onClick={handleUnlock}
      aria-label="Click to unlock"
      className={`fixed inset-0 z-[90] cursor-pointer transition-opacity duration-300 ${
        unlocking ? "opacity-0" : "opacity-100"
      }`}
    >
      <WallpaperBackground wallpaper={wallpaper} className="fixed inset-0">
        <div className="absolute inset-0 bg-black/25" />
        <div className="relative flex h-full flex-col items-center justify-center text-white">
          <p suppressHydrationWarning className="text-8xl font-semibold [text-shadow:0_4px_20px_rgba(0,0,0,0.5)]">
            {time}
          </p>
          <p suppressHydrationWarning className="mt-2 text-lg [text-shadow:0_2px_10px_rgba(0,0,0,0.5)]">
            {date}
          </p>
          <p className="absolute bottom-14 text-sm text-white/70 animate-[float_3s_ease-in-out_infinite]">
            Click or press any key to unlock
          </p>
        </div>
      </WallpaperBackground>
    </button>
  );
}
