import type { ReactNode } from "react";
import type { Wallpaper } from "@/lib/desktop/settingsStore";

interface WallpaperBackgroundProps {
  wallpaper: Wallpaper;
  className?: string;
  children?: ReactNode;
}

/**
 * Fills the container edge-to-edge with the wallpaper image (or the
 * gradient fallback) as a real CSS background — never a layered
 * absolutely-positioned element, which would otherwise fight normal-flow
 * content for paint order. Backgrounds always paint behind an element's
 * own content, so there's no z-index bookkeeping needed here.
 */
export default function WallpaperBackground({
  wallpaper,
  className = "",
  children,
}: WallpaperBackgroundProps) {
  return (
    <div
      className={`bg-cover bg-center bg-no-repeat ${className}`}
      style={
        wallpaper.image
          ? { backgroundImage: `url(${wallpaper.image})` }
          : { background: wallpaper.css }
      }
    >
      {children}
    </div>
  );
}
