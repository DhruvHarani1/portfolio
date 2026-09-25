"use client";

import { SectionHeading, AnimateOnScroll } from "@/components/SectionHeading";
import SpotlightCard from "@/components/SpotlightCard";

const SKILL_GROUPS = [
  {
    category: "Languages",
    skills: ["Python", "Java", "JavaScript", "TypeScript"],
    icon: "💻",
  },
  {
    category: "Frontend",
    skills: ["React", "Next.js", "React Native", "Tailwind CSS"],
    icon: "🎨",
  },
  {
    category: "Backend",
    skills: ["FastAPI", "Node.js/Express", "NestJS", "Flask"],
    icon: "⚙️",
  },
  {
    category: "Databases",
    skills: ["PostgreSQL", "Supabase"],
    icon: "🗄️",
  },
  {
    category: "AI / APIs",
    skills: ["AI Model Integration", "Prompt Engineering", "API Integration"],
    icon: "🤖",
  },
  {
    category: "Core CS",
    skills: ["Data Structures & Algorithms", "REST API Design", "Database Design"],
    icon: "📐",
  },
  {
    category: "Tools",
    skills: ["Docker", "Git", "Netlify", "Render", "VS Code"],
    icon: "🛠️",
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="bg-bg-primary"
      style={{ paddingTop: "var(--section-gap)", paddingBottom: "var(--section-gap)" }}
    >
      <div className="mx-auto max-w-[var(--content-max-width)] px-6">
        <AnimateOnScroll>
          <SectionHeading title="Skills" subtitle="Technologies and tools I work with." />
        </AnimateOnScroll>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SKILL_GROUPS.map((group, i) => (
            <AnimateOnScroll key={group.category} delay={i * 0.05}>
              <SpotlightCard className="rounded-[var(--radius-card)] border border-white/5 bg-bg-elevated p-6 transition-all duration-300 hover:border-white/10 hover:-translate-y-1 hover:shadow-[var(--shadow-hover)]">
                <div className="mb-4 flex items-center gap-3">
                  <span className="text-xl">{group.icon}</span>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-text-tertiary">
                    {group.category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-white/5 px-3 py-1.5 text-sm font-medium text-text-secondary transition-colors hover:bg-link-blue/10 hover:text-link-blue"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
