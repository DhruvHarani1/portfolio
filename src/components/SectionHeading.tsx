"use client";

import { useEffect, useRef, ReactNode } from "react";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-12 text-center md:text-left">
      <h2 className="text-3xl font-bold tracking-tight text-text-primary md:text-4xl"
          style={{ letterSpacing: "var(--tracking-title)", lineHeight: "var(--leading-title)" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-lg text-text-secondary">{subtitle}</p>
      )}
    </div>
  );
}

/**
 * Intersection Observer-based scroll animation wrapper
 */
export function AnimateOnScroll({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.animationDelay = `${delay}s`;
          el.classList.add("animate-fade-in-up");
          el.style.opacity = "1";
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ opacity: 0 }}
    >
      {children}
    </div>
  );
}
