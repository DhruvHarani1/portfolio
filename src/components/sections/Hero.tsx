"use client";

import Image from "next/image";
import { AnimateOnScroll } from "@/components/SectionHeading";
import MagneticButton from "@/components/MagneticButton";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-bg-secondary"
    >
      {/* Background gradient orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-link-blue/5 blur-[120px] animate-pulse-glow" />
        <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-link-blue/3 blur-[150px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
        <div className="absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-accent-green/3 blur-[100px] animate-pulse-glow" style={{ animationDelay: "3s" }} />
      </div>

      {/* Subtle grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[var(--content-max-width)] px-6 py-32 text-center">
        <AnimateOnScroll>
          {/* Avatar */}
          <div className="mx-auto mb-8 h-28 w-28 overflow-hidden rounded-full border-2 border-white/10 shadow-lg shadow-link-blue/10 transition-all duration-500 hover:border-link-blue/30 hover:shadow-xl hover:shadow-link-blue/20">
            <Image
              src="/avatar.png"
              alt="Dhruv Harani — illustrated avatar"
              width={112}
              height={112}
              className="h-full w-full object-cover"
              priority
            />
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.1}>
          {/* Headline */}
          <h1
            className="mx-auto max-w-4xl font-bold text-gradient-shimmer"
            style={{
              fontSize: "var(--font-size-hero)",
              lineHeight: "var(--leading-title)",
              letterSpacing: "var(--tracking-title)",
            }}
          >
            Dhruv Harani
          </h1>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.2}>
          <p
            className="mx-auto mt-6 max-w-2xl text-text-secondary"
            style={{ fontSize: "var(--font-size-subtitle)" }}
          >
            Full-stack engineer building products people actually use.
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.3}>
          {/* CTAs */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <MagneticButton
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-link-blue px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-link-blue-hover hover:shadow-lg hover:shadow-link-blue/25 active:scale-[0.98]"
              id="cta-view-projects"
            >
              View Projects
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-y-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </MagneticButton>

            <MagneticButton
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-3.5 text-sm font-semibold text-text-primary transition-all hover:border-white/20 hover:bg-white/10 active:scale-[0.98]"
              id="cta-download-resume"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download Resume
            </MagneticButton>
          </div>
        </AnimateOnScroll>

        {/* Scroll indicator */}
        <AnimateOnScroll delay={0.6}>
          <div className="mt-20 flex justify-center">
            <div className="flex h-10 w-6 items-start justify-center rounded-full border border-white/20 p-1.5">
              <div className="h-2 w-1 animate-bounce rounded-full bg-text-secondary" />
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
