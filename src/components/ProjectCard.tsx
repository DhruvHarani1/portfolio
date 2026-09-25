import Link from "next/link";
import SpotlightCard from "@/components/SpotlightCard";

interface ProjectCardProps {
  name: string;
  description: string | null;
  techStack: string[];
  stars: number;
  liveUrl: string | null;
  githubUrl: string;
  language: string | null;
  slug?: string | null;
  variant?: "featured" | "compact";
  gradient?: string;
  tagline?: string;
}

export default function ProjectCard({
  name,
  description,
  techStack,
  stars,
  liveUrl,
  githubUrl,
  language,
  slug,
  variant = "compact",
  gradient,
  tagline,
}: ProjectCardProps) {
  const isFeatured = variant === "featured";

  return (
    <SpotlightCard
      className={`group relative overflow-hidden rounded-[var(--radius-card)] border border-white/5 bg-bg-elevated transition-all duration-500 hover:border-white/10 hover:-translate-y-1 hover:shadow-[var(--shadow-hover)] ${
        isFeatured ? "p-0" : "p-6"
      }`}
    >
      {/* Featured card gradient header */}
      {isFeatured && (
        <div
          className="relative h-48 overflow-hidden"
          style={{ background: gradient || "linear-gradient(135deg, #1a1a2e, #0f3460)" }}
        >
          {/* Decorative grid pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
              backgroundSize: "24px 24px",
            }}
          />
          {/* Project wordmark */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold tracking-tight text-white/20 transition-all duration-500 group-hover:text-white/30 group-hover:scale-105">
              {name}
            </span>
          </div>
          {/* Live badge */}
          {liveUrl && <LiveBadge url={liveUrl} />}
        </div>
      )}

      <div className={isFeatured ? "p-[var(--card-padding)]" : ""}>
        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3
              className={`font-semibold text-text-primary ${
                isFeatured ? "text-xl" : "text-base"
              }`}
            >
              {name}
            </h3>
            {tagline && (
              <p className="mt-1 text-sm text-text-secondary">{tagline}</p>
            )}
          </div>
          {!isFeatured && liveUrl && <LiveBadge url={liveUrl} small />}
        </div>

        {/* Description */}
        <p
          className={`mt-3 text-text-secondary ${
            isFeatured ? "text-[15px] leading-relaxed" : "text-sm line-clamp-3"
          }`}
        >
          {description || "No description available."}
        </p>

        {/* Tech pills */}
        <div className="mt-4 flex flex-wrap gap-2">
          {(isFeatured ? techStack : techStack.slice(0, 4)).map((tech) => (
            <span
              key={tech}
              className="rounded-[var(--radius-badge)] bg-white/5 px-2.5 py-1 text-xs font-medium text-text-secondary transition-colors group-hover:bg-white/8 group-hover:text-text-primary"
            >
              {tech}
            </span>
          ))}
          {!isFeatured && techStack.length > 4 && (
            <span className="rounded-[var(--radius-badge)] bg-white/5 px-2.5 py-1 text-xs text-text-tertiary">
              +{techStack.length - 4}
            </span>
          )}
        </div>

        {/* Footer row */}
        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-text-tertiary">
            {language && (
              <span className="flex items-center gap-1.5">
                <span
                  className="inline-block h-2.5 w-2.5 rounded-full"
                  style={{ background: getLanguageColor(language) }}
                />
                {language}
              </span>
            )}
            {stars > 0 && (
              <span className="flex items-center gap-1">
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
                </svg>
                {stars}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-tertiary transition-colors hover:text-text-primary"
              aria-label={`View ${name} on GitHub`}
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            {slug && (
              <Link
                href={`/projects/${slug}`}
                className="inline-flex items-center gap-1 text-sm font-medium text-link-blue transition-all hover:text-link-blue-hover hover:gap-2"
              >
                View case study
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}

function LiveBadge({ url, small }: { url: string; small?: boolean }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 rounded-full bg-accent-green/10 font-medium text-accent-green transition-all hover:bg-accent-green/20 ${
        small ? "px-2 py-0.5 text-xs" : "absolute top-4 right-4 px-3 py-1 text-xs"
      }`}
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-green opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-green" />
      </span>
      Live
    </a>
  );
}

function getLanguageColor(language: string): string {
  const colors: Record<string, string> = {
    TypeScript: "#3178c6",
    JavaScript: "#f1e05a",
    Python: "#3572A5",
    Java: "#b07219",
    HTML: "#e34c26",
    CSS: "#563d7c",
    Dart: "#00B4AB",
    Kotlin: "#A97BFF",
    Swift: "#F05138",
    Go: "#00ADD8",
    Rust: "#dea584",
    Shell: "#89e051",
  };
  return colors[language] || "#8b949e";
}
