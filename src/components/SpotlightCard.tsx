"use client";

import { useRef, ReactNode, HTMLAttributes } from "react";

interface SpotlightCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

/**
 * Wraps content with a cursor-tracking radial highlight — a subtle
 * "spotlight" that follows the pointer across the card surface.
 */
export default function SpotlightCard({
  children,
  className = "",
  ...rest
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`spotlight-card ${className}`}
      {...rest}
    >
      <div className="spotlight-card-glow" aria-hidden="true" />
      {children}
    </div>
  );
}
