import type { ReactNode } from "react";
import type { Wallpaper } from "@/lib/desktop/settingsStore";

interface WallpaperBackgroundProps {
  wallpaper: Wallpaper;
  className?: string;
  children?: ReactNode;
}

/**
 * Renders a wallpaper so the full image is always visible, never
 * cropped — a blurred, scaled-up copy of the same image fills the
 * edges behind it instead of letterbox bars (the same trick Instagram
 * Stories and Windows' "Fit" wallpaper mode use).
 */
export default function WallpaperBackground({
  wallpaper,
  className = "",
  children,
}: WallpaperBackgroundProps) {
  if (!wallpaper.image) {
    return (
      <div className={className} style={{ background: wallpaper.css }}>
        {children}
      </div>
    );
  }

  // Callers always pass a `fixed` (or otherwise non-static) position class,
  // which already gives the absolutely-positioned layers below a valid
  // containing block — adding `relative` here would fight `fixed` in
  // Tailwind's cascade and collapse this box to zero height.
  return (
    <div className={className} style={{ background: wallpaper.css }}>
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center opacity-70 blur-2xl scale-110"
        style={{ backgroundImage: `url(${wallpaper.image})` }}
      />
      <div
        className="absolute inset-0 bg-no-repeat bg-center bg-contain"
        style={{ backgroundImage: `url(${wallpaper.image})` }}
      />
      {children}
    </div>
  );
}
