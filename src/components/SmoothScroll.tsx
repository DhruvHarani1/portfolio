"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Buttery inertia-based smooth scrolling, wired to native anchor links.
 * Disabled automatically when the user prefers reduced motion.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    let rafId = requestAnimationFrame(raf);

    // Intercept in-page anchor clicks for a smooth, offset-aware scroll.
    function onClick(e: MouseEvent) {
      const target = (e.target as HTMLElement)?.closest("a[href^='#']");
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href || href === "#") return;
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -72, duration: 1.2 });
      history.pushState(null, "", href);
    }
    document.addEventListener("click", onClick);

    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
