"use client";

import { useEffect, useState } from "react";

export default function BootScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    const start = performance.now();
    const duration = 1400;

    function tick(now: number) {
      const elapsed = now - start;
      const pct = Math.min(100, (elapsed / duration) * 100);
      setProgress(pct);
      if (pct < 100) {
        requestAnimationFrame(tick);
      } else {
        setFadingOut(true);
        setTimeout(onDone, 300);
      }
    }
    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black transition-opacity duration-300 ${
        fadingOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-link-blue to-accent-green text-2xl font-bold text-white shadow-lg shadow-link-blue/20">
        DH
      </div>
      <p className="mt-6 text-sm text-white/60">Starting Dhruv OS…</p>
      <div className="mt-4 h-1 w-48 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-white transition-[width] duration-75 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
