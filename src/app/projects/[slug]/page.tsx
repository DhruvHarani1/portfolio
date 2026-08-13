import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FEATURED_PROJECTS, getFeaturedProject } from "@/lib/featured-projects";
import { fetchFullReadme, fetchRepoLanguages } from "@/lib/github";

// Revalidate every hour
export const revalidate = 3600;

// Pre-generate pages for all 5 featured projects
export async function generateStaticParams() {
  return FEATURED_PROJECTS.map((p) => ({ slug: p.slug }));
}

// Dynamic metadata per project
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getFeaturedProject(slug);
  if (!project) return {};

  return {
    title: project.name,
    description: project.tagline,
    openGraph: {
      title: `${project.name} | Dhruv Harani`,
      description: project.description,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getFeaturedProject(slug);
  if (!project) notFound();

  const [readme, languages] = await Promise.all([
    fetchFullReadme(project.repoName),
    fetchRepoLanguages(project.repoName),
  ]);

  const languageList = languages ? Object.keys(languages) : [];

  return (
    <>
      <Header />
      <main className="pt-20">
        {/* Hero */}
        <section
          className="relative overflow-hidden"
          style={{ background: project.gradient }}
        >
          {/* Decorative grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)`,
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative z-10 mx-auto max-w-[var(--content-max-width)] px-6 py-20 md:py-28">
            {/* Back link */}
            <Link
              href="/#projects"
              className="group mb-8 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-text-primary"
            >
              <svg
                className="h-4 w-4 transition-transform group-hover:-translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Back to projects
            </Link>

            <h1
              className="text-4xl font-bold text-text-primary md:text-5xl"
              style={{
                lineHeight: "var(--leading-title)",
                letterSpacing: "var(--tracking-title)",
              }}
            >
              {project.name}
            </h1>

            <p className="mt-4 max-w-2xl text-lg text-text-secondary">
              {project.tagline}
            </p>

            {/* Links */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-accent-green/10 px-5 py-2.5 text-sm font-semibold text-accent-green transition-all hover:bg-accent-green/20"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-green opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-green" />
                  </span>
                  View Live
                </a>
              )}
              <a
                href={`https://github.com/DhruvHarani1/${project.repoName}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-text-primary transition-all hover:border-white/20 hover:bg-white/10"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                View Source
              </a>
            </div>

            {/* Tech stack */}
            <div className="mt-6 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-[var(--radius-badge)] bg-white/10 px-3 py-1 text-xs font-medium text-text-primary"
                >
                  {tech}
                </span>
              ))}
              {languageList
                .filter((l) => !project.techStack.includes(l))
                .slice(0, 3)
                .map((lang) => (
                  <span
                    key={lang}
                    className="rounded-[var(--radius-badge)] bg-white/5 px-3 py-1 text-xs font-medium text-text-secondary"
                  >
                    {lang}
                  </span>
                ))}
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="bg-bg-primary" style={{ paddingTop: "var(--section-gap)", paddingBottom: "var(--section-gap)" }}>
          <div className="mx-auto max-w-[var(--content-max-width)] px-6">
            {/* Highlights callout */}
            <div className="mb-12 rounded-[var(--radius-card)] border border-link-blue/20 bg-link-blue/5 p-6 md:p-8">
              <h2 className="mb-4 text-lg font-semibold text-text-primary">
                ✦ Key Highlights
              </h2>
              <ul className="space-y-3">
                {project.highlights.map((highlight, i) => (
                  <li key={i} className="flex gap-3 text-text-secondary">
                    <span className="mt-2 flex h-1.5 w-1.5 shrink-0 rounded-full bg-link-blue" />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>

            {/* Full description */}
            <div className="mb-12">
              <h2 className="mb-4 text-2xl font-bold text-text-primary">Overview</h2>
              <p className="text-text-secondary leading-relaxed">{project.description}</p>
            </div>

            {/* README content */}
            {readme && (
              <div className="prose-dark">
                <h2 className="mb-6 text-2xl font-bold text-text-primary">Documentation</h2>
                <ReadmeContent content={readme} />
              </div>
            )}

            {/* Back to projects */}
            <div className="mt-16 border-t border-white/5 pt-8">
              <Link
                href="/#projects"
                className="group inline-flex items-center gap-2 text-sm font-medium text-link-blue transition-all hover:text-link-blue-hover hover:gap-3"
              >
                <svg
                  className="h-4 w-4 transition-transform group-hover:-translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Back to all projects
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

/**
 * Simple README markdown renderer
 * Converts basic markdown to HTML with proper styling
 */
function ReadmeContent({ content }: { content: string }) {
  // Simple markdown to HTML conversion
  const html = content
    // Headers
    .replace(/^#### (.+)$/gm, '<h4>$1</h4>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    // Bold and italic
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    // Unordered lists
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    // Horizontal rules
    .replace(/^---$/gm, '<hr />')
    // Paragraphs (double newlines)
    .replace(/\n\n/g, '</p><p>')
    // Single newlines within paragraphs
    .replace(/\n/g, '<br />');

  return (
    <div
      dangerouslySetInnerHTML={{ __html: `<p>${html}</p>` }}
    />
  );
}
