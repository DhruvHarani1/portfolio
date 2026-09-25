import type { ReactNode } from "react";

interface AppIconTileProps {
  icon: ReactNode;
  accent: string;
  size?: number;
}

/**
 * Fluent-style icon tile: gradient fill, soft inner highlight along the
 * top edge, and a subtle drop shadow — used everywhere an app icon
 * appears (taskbar, Start menu, desktop icons).
 */
export default function AppIconTile({ icon, accent, size = 44 }: AppIconTileProps) {
  return (
    <div
      className="relative flex shrink-0 items-center justify-center overflow-hidden rounded-[11px] text-white shadow-[0_2px_6px_rgba(0,0,0,0.35)]"
      style={{ width: size, height: size, background: accent }}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-[11px]"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 35%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 rounded-[11px] border border-white/10"
      />
      <div className="relative" style={{ width: size * 0.56, height: size * 0.56 }}>
        {icon}
      </div>
    </div>
  );
}
