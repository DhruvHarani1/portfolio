"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { isImmersiveRoute } from "@/lib/isImmersiveRoute";

interface LenisLike {
  scrollTo: (target: number, opts?: { duration?: number }) => void;
}

export default function BackToTop() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 600);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToTop() {
    const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  if (isImmersiveRoute(pathname)) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-bg-elevated/90 text-text-primary shadow-[var(--shadow-card)] backdrop-blur-xl transition-all duration-300 hover:border-link-blue/30 hover:bg-bg-elevated hover:-translate-y-1 hover:shadow-[var(--shadow-hover)] ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <svg
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
      </svg>
    </button>
  );
}
