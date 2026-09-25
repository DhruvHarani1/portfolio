"use client";

import { useEffect, useState } from "react";
import { useWindowStore } from "@/lib/desktop/windowStore";
import { getApp } from "@/lib/desktop/apps";

// Fixed, seeded "usage" numbers so they don't jitter randomly on every
// render — just enough motion to feel alive via a slow sine wave.
const PROCESSES = [
  { name: "Python", baseCpu: 12, baseMem: 340 },
  { name: "TypeScript", baseCpu: 18, baseMem: 512 },
  { name: "React", baseCpu: 9, baseMem: 280 },
  { name: "Next.js", baseCpu: 14, baseMem: 410 },
  { name: "FastAPI", baseCpu: 6, baseMem: 190 },
  { name: "PostgreSQL", baseCpu: 4, baseMem: 260 },
  { name: "Docker Desktop", baseCpu: 22, baseMem: 890 },
];

export default function TaskManagerApp() {
  const { windows, closeWindow, focusWindow } = useWindowStore();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-full flex-col bg-[#1e1e1e] text-white/90">
      <div className="border-b border-white/10 px-4 py-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-white/50">Apps</p>
      </div>
      <div className="max-h-[45%] overflow-y-auto border-b border-white/10">
        {windows.length === 0 && (
          <p className="px-4 py-3 text-xs text-white/40">No apps running.</p>
        )}
        {windows.map((w) => (
          <div
            key={w.id}
            className="flex items-center justify-between px-4 py-2 text-sm hover:bg-white/5"
          >
            <button onClick={() => focusWindow(w.id)} className="text-left text-white/85 hover:text-white">
              {getApp(w.appId).name}
              {w.minimized && <span className="ml-2 text-[10px] text-white/40">(minimized)</span>}
            </button>
            <button
              onClick={() => closeWindow(w.id)}
              className="rounded border border-white/15 px-2.5 py-1 text-[11px] text-white/70 transition-colors hover:border-red-400/50 hover:text-red-400"
            >
              End task
            </button>
          </div>
        ))}
      </div>

      <div className="border-b border-white/10 px-4 py-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-white/50">Processes</p>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-[1fr_60px_70px] gap-2 px-4 py-1.5 text-[10px] uppercase text-white/40">
          <span>Name</span>
          <span className="text-right">CPU</span>
          <span className="text-right">Memory</span>
        </div>
        {PROCESSES.map((p, i) => {
          const wave = Math.sin(tick / 3 + i) * 4;
          const cpu = Math.max(1, Math.round(p.baseCpu + wave));
          const mem = Math.round(p.baseMem + wave * 6);
          return (
            <div
              key={p.name}
              className="grid grid-cols-[1fr_60px_70px] gap-2 px-4 py-1.5 text-[12px] text-white/75 hover:bg-white/5"
            >
              <span>{p.name}</span>
              <span className="text-right tabular-nums">{cpu}%</span>
              <span className="text-right tabular-nums">{mem} MB</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
