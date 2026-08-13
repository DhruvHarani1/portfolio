"use client";

import ProjectCard from "@/components/ProjectCard";
import { SectionHeading, AnimateOnScroll } from "@/components/SectionHeading";
import type { FeaturedProject } from "@/lib/featured-projects";
import type { GitHubRepo } from "@/lib/github";

interface FeaturedProjectsProps {
  projects: FeaturedProject[];
  repos: GitHubRepo[];
}

export default function FeaturedProjects({ projects, repos }: FeaturedProjectsProps) {
  return (
    <section
      id="projects"
      className="bg-bg-secondary"
      style={{ paddingTop: "var(--section-gap)", paddingBottom: "var(--section-gap)" }}
    >
      <div className="mx-auto max-w-[var(--content-max-width)] px-6">
        <AnimateOnScroll>
          <SectionHeading
            title="Featured Projects"
            subtitle="Hand-picked work that demonstrates real impact — not just code, but products."
          />
        </AnimateOnScroll>

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, i) => {
            // Find matching GitHub repo for live stats
            const repo = repos.find(
              (r) => r.name.toLowerCase() === project.repoName.toLowerCase()
            );

            return (
              <AnimateOnScroll key={project.slug} delay={i * 0.1}>
                <ProjectCard
                  name={project.name}
                  description={project.description}
                  techStack={project.techStack}
                  stars={repo?.stargazers_count ?? 0}
                  liveUrl={project.liveUrl}
                  githubUrl={repo?.html_url ?? `https://github.com/DhruvHarani1/${project.repoName}`}
                  language={repo?.language ?? null}
                  slug={project.slug}
                  variant="featured"
                  gradient={project.gradient}
                  tagline={project.tagline}
                />
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
