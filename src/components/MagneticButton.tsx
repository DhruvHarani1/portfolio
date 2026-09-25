"use client";

import { useRef, ReactNode, AnchorHTMLAttributes } from "react";

interface MagneticButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  strength?: number;
}

/**
 * A button that gently pulls toward the cursor when hovered, and
 * snaps back on leave. Desktop-only feel — CSS media query below
 * keeps touch devices unaffected.
 */
export default function MagneticButton({
  children,
  strength = 0.35,
  className = "",
  ...rest
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  }

  function handleMouseLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0, 0)";
  }

  return (
    <a
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-200 ease-out ${className}`}
      {...rest}
    >
      {children}
    </a>
  );
}
