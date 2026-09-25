"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useWindowStore } from "@/lib/desktop/windowStore";
import { getApp } from "@/lib/desktop/apps";

export default function MenuBar() {
  const { windows } = useWindowStore();
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    function tick() {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        })
      );
    }
    tick();
    const interval = setInterval(tick, 1000 * 30);
    return () => clearInterval(interval);
  }, []);

  const focused = windows.reduce<typeof windows[number] | null>((top, w) => {
    if (w.minimized) return top;
    if (!top || w.zIndex > top.zIndex) return w;
    return top;
  }, null);

  return (
    <div className="fixed left-0 right-0 top-0 z-50 flex h-7 items-center justify-between bg-black/40 px-4 text-xs text-white backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <Link href="/" className="font-semibold">
          DH
        </Link>
        <span className="hidden sm:inline">
          {focused ? getApp(focused.appId).name : "Desktop"}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <Link href="/" className="text-white/70 transition-colors hover:text-white">
          Exit
        </Link>
        <span suppressHydrationWarning>{time}</span>
      </div>
    </div>
  );
}
