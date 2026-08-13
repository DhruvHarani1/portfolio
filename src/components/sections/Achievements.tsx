"use client";

import { SectionHeading, AnimateOnScroll } from "@/components/SectionHeading";

const ACHIEVEMENTS = [
  {
    title: "TextIt — Hackathon Presentation",
    description:
      "Presented TextIt as leading developer at a hackathon hosted by Royal Technologies during first year of university.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.023 6.023 0 01-2.77.984m-2.77-.984a6.023 6.023 0 002.77.984m0 0a6.02 6.02 0 002.77-.984" />
      </svg>
    ),
  },
  {
    title: "HMS — Production System",
    description:
      "HMS (Hostel Management System) is in daily active production use by 50 students, 1 warden, and 2 kitchen staff — a real deployed system, not a demo.",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
  },
];

export default function Achievements() {
  return (
    <section
      id="achievements"
      className="bg-bg-secondary"
      style={{ paddingTop: "var(--section-gap)", paddingBottom: "var(--section-gap)" }}
    >
      <div className="mx-auto max-w-[var(--content-max-width)] px-6">
        <AnimateOnScroll>
          <SectionHeading title="Achievements" />
        </AnimateOnScroll>

        <div className="grid gap-6 md:grid-cols-2">
          {ACHIEVEMENTS.map((achievement, i) => (
            <AnimateOnScroll key={achievement.title} delay={i * 0.1}>
              <div className="group rounded-[var(--radius-card)] border border-white/5 bg-bg-elevated p-6 transition-all duration-300 hover:border-white/10 hover:shadow-[var(--shadow-hover)]">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-link-blue/10 text-link-blue transition-colors group-hover:bg-link-blue/20">
                  {achievement.icon}
                </div>
                <h3 className="text-lg font-semibold text-text-primary">
                  {achievement.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {achievement.description}
                </p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
