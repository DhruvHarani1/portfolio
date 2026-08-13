"use client";

import { SectionHeading, AnimateOnScroll } from "@/components/SectionHeading";

export default function Experience() {
  return (
    <section
      id="experience"
      className="bg-bg-secondary"
      style={{ paddingTop: "var(--section-gap)", paddingBottom: "var(--section-gap)" }}
    >
      <div className="mx-auto max-w-[var(--content-max-width)] px-6">
        <AnimateOnScroll>
          <SectionHeading title="Experience" />
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.1}>
          <div className="relative rounded-[var(--radius-card)] border border-white/5 bg-bg-elevated p-8 transition-all duration-300 hover:border-white/10 hover:shadow-[var(--shadow-hover)]">
            {/* Timeline dot */}
            <div className="absolute -left-px top-10 hidden h-3 w-3 -translate-x-1/2 rounded-full border-2 border-link-blue bg-bg-primary md:block" />

            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-text-primary">
                  Software Developer Intern
                </h3>
                <p className="mt-1 text-text-secondary">
                  <a
                    href="https://clarityy.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link-blue transition-colors hover:text-link-blue-hover"
                  >
                    FloIndex Ventures LLP
                  </a>
                  {" · Ahmedabad"}
                </p>
              </div>
              <span className="shrink-0 rounded-full border border-accent-green/20 bg-accent-green/10 px-3 py-1 text-xs font-medium text-accent-green">
                Jan 2026 – Present
              </span>
            </div>

            <ul className="mt-6 space-y-4">
              {[
                "Designed and built the backend for Clarityy AI (clarityy.ai), a live portfolio-analytics platform, using Python/FastAPI serving a React/Vite frontend",
                "Built a data-processing pipeline that auto-detects and normalizes multiple Indian broker tradebook formats, computing Weighted-Average-Cost (WAC) based P&L benchmarked against the Nifty 50 index",
                "Implemented Supabase-based OAuth authentication and deployed backend infrastructure on Render",
              ].map((item, i) => (
                <li key={i} className="flex gap-3 text-text-secondary" style={{ lineHeight: "var(--leading-body)" }}>
                  <span className="mt-2 flex h-1.5 w-1.5 shrink-0 rounded-full bg-link-blue" />
                  {item}
                </li>
              ))}
            </ul>

            {/* Tech used */}
            <div className="mt-6 flex flex-wrap gap-2">
              {["Python", "FastAPI", "React", "Vite", "Supabase", "Render"].map((tech) => (
                <span
                  key={tech}
                  className="rounded-[var(--radius-badge)] bg-white/5 px-2.5 py-1 text-xs font-medium text-text-secondary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </AnimateOnScroll>

        {/* Education */}
        <AnimateOnScroll delay={0.2}>
          <div className="mt-6 rounded-[var(--radius-card)] border border-white/5 bg-bg-elevated p-8 transition-all duration-300 hover:border-white/10 hover:shadow-[var(--shadow-hover)]">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-text-primary">
                  B.Tech, Computer Engineering
                </h3>
                <p className="mt-1 text-text-secondary">
                  LJ University
                </p>
              </div>
              <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-text-secondary">
                Expected 2028
              </span>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-text-secondary">
              <span className="flex items-center gap-1.5">
                <span className="text-text-primary font-medium">CGPA:</span> 8.5+/10
              </span>
              <span className="text-text-tertiary">•</span>
              <span>Data Structures & Algorithms</span>
              <span className="text-text-tertiary">•</span>
              <span>DBMS</span>
              <span className="text-text-tertiary">•</span>
              <span>Operating Systems</span>
              <span className="text-text-tertiary">•</span>
              <span>Signals & Systems</span>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
