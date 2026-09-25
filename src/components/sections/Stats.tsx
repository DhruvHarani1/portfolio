"use client";

import { AnimateOnScroll } from "@/components/SectionHeading";
import CountUp from "@/components/CountUp";

const STATS = [
  { label: "Shipped Projects", value: 5, suffix: "+" },
  { label: "Live Products in Production", value: 2 },
  { label: "Daily Active Users on HMS", value: 53 },
  { label: "Current CGPA", value: 8, suffix: ".5+/10" },
];

export default function Stats() {
  return (
    <section className="relative border-y border-white/5 bg-bg-secondary">
      <div className="mx-auto grid max-w-[var(--content-max-width)] grid-cols-2 gap-8 px-6 py-14 md:grid-cols-4">
        {STATS.map((stat, i) => (
          <AnimateOnScroll key={stat.label} delay={i * 0.08}>
            <div className="text-center">
              <p
                className="text-3xl font-bold text-gradient-shimmer md:text-4xl"
                style={{ letterSpacing: "var(--tracking-title)" }}
              >
                <CountUp end={stat.value} suffix={stat.suffix ?? ""} />
              </p>
              <p className="mt-2 text-xs font-medium uppercase tracking-wide text-text-tertiary md:text-sm">
                {stat.label}
              </p>
            </div>
          </AnimateOnScroll>
        ))}
      </div>
    </section>
  );
}
