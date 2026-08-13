"use client";

import { SectionHeading, AnimateOnScroll } from "@/components/SectionHeading";

export default function About() {
  return (
    <section id="about" className="bg-bg-primary" style={{ paddingTop: "var(--section-gap)", paddingBottom: "var(--section-gap)" }}>
      <div className="mx-auto max-w-[var(--content-max-width)] px-6">
        <AnimateOnScroll>
          <SectionHeading title="About" />
        </AnimateOnScroll>

        <AnimateOnScroll delay={0.1}>
          <div className="max-w-3xl space-y-5 text-text-secondary" style={{ fontSize: "var(--font-size-body)", lineHeight: "var(--leading-body)" }}>
            <p>
              I&apos;m a full-stack engineer currently working as a Software Developer Intern at{" "}
              <span className="text-text-primary font-medium">FloIndex Ventures</span> in Ahmedabad,
              where I own real backend and frontend work on{" "}
              <a href="https://clarityy.ai" target="_blank" rel="noopener noreferrer" className="text-link-blue hover:text-link-blue-hover transition-colors">
                Clarityy AI
              </a>
              , a live fintech product. My work there spans building data-processing pipelines,
              designing API architecture, and implementing authentication — the full picture,
              not just one slice.
            </p>

            <p>
              I&apos;m pursuing a B.Tech in Computer Engineering at{" "}
              <span className="text-text-primary font-medium">LJ University</span>{" "}
              (expected 2028, CGPA 8.5+/10). My coursework in data structures, DBMS, and operating
              systems gives me the foundations, but what I care about most is building and shipping
              complete products — several of mine are in daily real-world use, not just portfolio demos.
            </p>

            <p>
              I&apos;m backend-leaning but product-minded. I&apos;m comfortable owning a feature from
              database schema to shipped UI. Whether it&apos;s Python/FastAPI, NestJS, or Flask on the
              backend, or React and React Native on the frontend — I pick the right tool for the job
              and make sure it actually ships.
            </p>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
