"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { isImmersiveRoute } from "@/lib/isImmersiveRoute";

export default function ScrollProgress() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  if (isImmersiveRoute(pathname)) return null;

  return (
    <div className="pointer-events-none fixed left-0 top-0 z-[60] h-[2px] w-full bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-link-blue via-link-blue-hover to-accent-green transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
