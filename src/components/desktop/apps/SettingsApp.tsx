"use client";

import { WALLPAPERS, useSettingsStore } from "@/lib/desktop/settingsStore";

export default function SettingsApp() {
  const { wallpaperId, setWallpaper } = useSettingsStore();

  return (
    <div className="h-full overflow-y-auto p-5">
      <h3 className="text-sm font-semibold text-text-primary">Wallpaper</h3>
      <div className="mt-3 grid grid-cols-2 gap-3">
        {WALLPAPERS.map((wp) => (
          <button
            key={wp.id}
            onClick={() => setWallpaper(wp.id)}
            className={`h-20 rounded-lg border-2 bg-cover bg-center transition-all ${
              wallpaperId === wp.id
                ? "border-link-blue"
                : "border-transparent hover:border-white/20"
            }`}
            style={
              wp.image
                ? { backgroundImage: `url(${wp.image})` }
                : { background: wp.css }
            }
            aria-label={wp.label}
          />
        ))}
      </div>

      <h3 className="mt-6 text-sm font-semibold text-text-primary">About this Desktop</h3>
      <p className="mt-2 text-xs leading-relaxed text-text-secondary">
        This is a playful, interactive corner of Dhruv&apos;s portfolio — a
        little desktop OS with real apps: live chat, a project gallery, and
        a terminal easter egg. Everything here is built with Next.js, React,
        and Supabase Realtime.
      </p>
    </div>
  );
}
