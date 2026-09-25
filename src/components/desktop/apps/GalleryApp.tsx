"use client";

import { useState } from "react";
import { FEATURED_PROJECTS, type FeaturedProject } from "@/lib/featured-projects";
import type { GitHubRepo } from "@/lib/github";

interface GalleryAppProps {
  repos: GitHubRepo[];
}

export default function GalleryApp({ repos }: GalleryAppProps) {
  const [selected, setSelected] = useState<FeaturedProject | null>(null);

  if (selected) {
    const repo = repos.find(
      (r) => r.name.toLowerCase() === selected.repoName.toLowerCase()
    );

    return (
      <div className="flex h-full flex-col overflow-y-auto">
        <button
          onClick={() => setSelected(null)}
          className="flex shrink-0 items-center gap-1.5 border-b border-white/5 px-4 py-3 text-sm text-link-blue"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          All Projects
        </button>
        <div className="p-6">
          <div
            className="flex h-32 items-center justify-center rounded-xl text-lg font-bold text-white/30"
            style={{ background: selected.gradient }}
          >
            {selected.name}
          </div>
          <h2 className="mt-4 text-lg font-semibold text-text-primary">
            {selected.name}
          </h2>
          <p className="text-sm text-text-secondary">{selected.tagline}</p>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">
            {selected.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {selected.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-md bg-white/5 px-2.5 py-1 text-xs font-medium text-text-secondary"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="mt-5 flex gap-3">
            {selected.liveUrl && (
              <a
                href={selected.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-link-blue px-4 py-2 text-xs font-semibold text-white"
              >
                Open Live
              </a>
            )}
            <a
              href={repo?.html_url ?? `https://github.com/DhruvHarani1/${selected.repoName}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-text-primary"
            >
              View Code
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-5 overflow-y-auto p-6 sm:grid-cols-3">
      {FEATURED_PROJECTS.map((project) => (
        <button
          key={project.slug}
          onDoubleClick={() => setSelected(project)}
          onClick={() => setSelected(project)}
          className="group flex flex-col items-center gap-2 rounded-lg p-2 text-center transition-colors hover:bg-white/5"
        >
          <div
            className="flex h-16 w-16 items-center justify-center rounded-xl text-xl shadow-lg transition-transform group-hover:scale-105"
            style={{ background: project.gradient }}
          >
            📁
          </div>
          <span className="line-clamp-2 text-xs font-medium text-text-primary">
            {project.name}
          </span>
        </button>
      ))}
    </div>
  );
}
