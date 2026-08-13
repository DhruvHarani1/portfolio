"use client";

import { useState, useMemo } from "react";
import ProjectCard from "@/components/ProjectCard";
import { SectionHeading, AnimateOnScroll } from "@/components/SectionHeading";
import { isFeaturedRepo, getFeaturedSlug } from "@/lib/featured-projects";
import type { GitHubRepo } from "@/lib/github";

interface AllProjectsProps {
  repos: GitHubRepo[];
}

type SortKey = "updated" | "stars";

export default function AllProjects({ repos }: AllProjectsProps) {
  const [sortBy, setSortBy] = useState<SortKey>("updated");

  const sorted = useMemo(() => {
    const copy = [...repos];
    if (sortBy === "stars") {
      copy.sort((a, b) => b.stargazers_count - a.stargazers_count);
    } else {
      copy.sort(
        (a, b) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
      );
    }
    return copy;
  }, [repos, sortBy]);

  return (
    <section
      id="all-projects"
      className="bg-bg-primary"
      style={{ paddingTop: "var(--section-gap)", paddingBottom: "var(--section-gap)" }}
    >
      <div className="mx-auto max-w-[var(--content-max-width)] px-6">
        <AnimateOnScroll>
          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              title="All Projects"
              subtitle="Everything on GitHub — auto-updated, no manual maintenance."
            />

            {/* Sort controls */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-text-tertiary">Sort by:</span>
              <div className="flex rounded-full border border-white/10 bg-bg-elevated p-0.5">
                <button
                  onClick={() => setSortBy("updated")}
                  className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                    sortBy === "updated"
                      ? "bg-link-blue text-white shadow-sm"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                  id="sort-updated"
                >
                  Recently Updated
                </button>
                <button
                  onClick={() => setSortBy("stars")}
                  className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                    sortBy === "stars"
                      ? "bg-link-blue text-white shadow-sm"
                      : "text-text-secondary hover:text-text-primary"
                  }`}
                  id="sort-stars"
                >
                  Stars
                </button>
              </div>
            </div>
          </div>
        </AnimateOnScroll>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((repo, i) => {
            const techStack = repo.languages
              ? Object.keys(repo.languages).slice(0, 5)
              : repo.language
              ? [repo.language]
              : [];

            return (
              <AnimateOnScroll key={repo.name} delay={Math.min(i * 0.05, 0.3)}>
                <ProjectCard
                  name={repo.name}
                  description={repo.readme_excerpt || repo.description}
                  techStack={techStack}
                  stars={repo.stargazers_count}
                  liveUrl={repo.homepage}
                  githubUrl={repo.html_url}
                  language={repo.language}
                  slug={isFeaturedRepo(repo.name) ? getFeaturedSlug(repo.name) : null}
                  variant="compact"
                />
              </AnimateOnScroll>
            );
          })}
        </div>

        {sorted.length === 0 && (
          <p className="py-12 text-center text-text-tertiary">
            Loading projects from GitHub...
          </p>
        )}
      </div>
    </section>
  );
}
