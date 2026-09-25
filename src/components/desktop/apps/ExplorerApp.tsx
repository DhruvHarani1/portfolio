"use client";

import { useState } from "react";
import { FEATURED_PROJECTS } from "@/lib/featured-projects";
import { useWindowStore } from "@/lib/desktop/windowStore";

type Crumb = "root" | "projects" | string; // string = project slug

const FolderIcon = () => (
  <svg viewBox="0 0 24 24" className="h-full w-full" fill="none">
    <path d="M2 6.5A1.5 1.5 0 013.5 5H9l2 2.25h9.5A1.5 1.5 0 0122 8.75v9.75A1.5 1.5 0 0120.5 20h-17A1.5 1.5 0 012 18.5v-12z" fill="#FFE9B3" />
    <path d="M2 9.5A1.5 1.5 0 013.5 8h17A1.5 1.5 0 0122 9.5v9a1.5 1.5 0 01-1.5 1.5h-17A1.5 1.5 0 012 18.5v-9z" fill="#FFC64B" />
  </svg>
);

const FileIcon = () => (
  <svg viewBox="0 0 24 24" className="h-full w-full" fill="none">
    <path d="M6 2.5h8l5 5V21a1 1 0 01-1 1H6a1 1 0 01-1-1V3.5a1 1 0 011-1z" fill="#E7ECF3" />
    <path d="M14 2.5l5 5h-4a1 1 0 01-1-1v-4z" fill="#C7D2E0" />
  </svg>
);

export default function ExplorerApp() {
  const [path, setPath] = useState<Crumb[]>(["root"]);
  const { openAppCentered } = useWindowStore();
  const current = path[path.length - 1];

  function go(crumb: Crumb) {
    setPath((p) => [...p, crumb]);
  }

  function goTo(index: number) {
    setPath((p) => p.slice(0, index + 1));
  }

  const project = FEATURED_PROJECTS.find((p) => p.slug === current);

  return (
    <div className="flex h-full flex-col bg-[#1e1e1e] text-sm text-white/90">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-1 border-b border-white/10 bg-[#252525] px-3 py-2 text-xs">
        {path.map((crumb, i) => {
          const label =
            crumb === "root" ? "This PC" : crumb === "projects" ? "Projects" : project?.name ?? crumb;
          return (
            <span key={i} className="flex items-center gap-1">
              {i > 0 && <span className="text-white/30">/</span>}
              <button
                onClick={() => goTo(i)}
                className={i === path.length - 1 ? "text-white" : "text-white/60 hover:text-white"}
              >
                {label}
              </button>
            </span>
          );
        })}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {current === "root" && (
          <div className="grid grid-cols-4 gap-4 sm:grid-cols-5">
            <Item label="Projects" icon={<FolderIcon />} onOpen={() => go("projects")} />
            <Item label="Resume.pdf" icon={<FileIcon />} onOpen={() => openAppCentered("resume")} />
            <Item label="About.txt" icon={<FileIcon />} onOpen={() => openAppCentered("notes")} />
          </div>
        )}

        {current === "projects" && (
          <div className="grid grid-cols-4 gap-4 sm:grid-cols-5">
            {FEATURED_PROJECTS.map((p) => (
              <Item key={p.slug} label={p.name} icon={<FolderIcon />} onOpen={() => go(p.slug)} />
            ))}
          </div>
        )}

        {project && (
          <div className="max-w-lg">
            <div className="flex items-center gap-2 border-b border-white/10 pb-3">
              <div className="h-8 w-8"><FileIcon /></div>
              <div>
                <p className="font-medium text-white">README.md</p>
                <p className="text-xs text-white/50">{project.name}</p>
              </div>
            </div>
            <div className="mt-3 space-y-3 text-[13px] leading-relaxed text-white/75">
              <p>{project.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((t) => (
                  <span key={t} className="rounded bg-white/10 px-2 py-0.5 text-[11px]">{t}</span>
                ))}
              </div>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-link-blue hover:underline"
                >
                  {project.liveUrl} ↗
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Item({ label, icon, onOpen }: { label: string; icon: React.ReactNode; onOpen: () => void }) {
  return (
    <button
      onDoubleClick={onOpen}
      onClick={onOpen}
      className="flex flex-col items-center gap-1.5 rounded-lg p-2 text-center transition-colors hover:bg-white/10"
    >
      <div className="h-10 w-10">{icon}</div>
      <span className="line-clamp-2 text-[11px] text-white/85">{label}</span>
    </button>
  );
}
