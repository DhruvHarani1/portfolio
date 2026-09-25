// GitHub API data layer
// Fetches repos, READMEs, and languages from the GitHub REST API
// Uses GITHUB_TOKEN env var when available for higher rate limits

const GITHUB_USER = "DhruvHarani1";
const API_BASE = "https://api.github.com";

// Repos to exclude from all views (personal/non-professional)
const EXCLUDED_REPOS = new Set(
  [
    "love-in-every-frame",
    "our-universe",
    "goodbye",
    "FORYOU",
    "SurpriseThem",
    "darkfantasy",
    "client1",
    "SocialAI",
    "Testing",
    "practise",
    "balaji",
  ].map((r) => r.toLowerCase())
);

function getHeaders(): HeadersInit {
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}

export interface GitHubRepo {
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
  fork: boolean;
  topics: string[];
  has_readme: boolean;
  readme_excerpt: string | null;
  languages: Record<string, number> | null;
}

interface GitHubApiRepo {
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
  fork: boolean;
  topics?: string[];
}

/**
 * Fetch all public repos for DhruvHarani1, filtered and sorted
 */
export async function fetchAllRepos(): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(
      `${API_BASE}/users/${GITHUB_USER}/repos?sort=updated&per_page=100`,
      {
        headers: getHeaders(),
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      console.error(`GitHub API error: ${res.status} ${res.statusText}`);
      return [];
    }

    const repos: GitHubApiRepo[] = await res.json();

    // Filter out excluded repos, forks (unless whitelisted), and empty repos
    const filtered = repos.filter((repo) => {
      const nameLower = repo.name.toLowerCase();
      if (EXCLUDED_REPOS.has(nameLower)) return false;
      if (repo.fork) return false;
      return true;
    });

    // Enrich with README excerpts and languages in parallel
    const enriched = await Promise.all(
      filtered.map(async (repo) => {
        const [readmeExcerpt, languages] = await Promise.all([
          fetchReadmeExcerpt(repo.name),
          fetchRepoLanguages(repo.name),
        ]);

        // Skip repos with no description AND no README
        const hasContent =
          repo.description || readmeExcerpt;

        return {
          name: repo.name,
          full_name: repo.full_name,
          description: repo.description,
          html_url: repo.html_url,
          homepage: repo.homepage || null,
          stargazers_count: repo.stargazers_count,
          language: repo.language,
          updated_at: repo.updated_at,
          fork: repo.fork,
          topics: repo.topics || [],
          has_readme: !!readmeExcerpt,
          readme_excerpt: readmeExcerpt,
          languages,
          _hasContent: hasContent,
        };
      })
    );

    // Filter out repos with no content at all
    return enriched
      .filter((r) => (r as GitHubRepo & { _hasContent: string | null })._hasContent)
      .map((repo) => {
        const clean = repo as GitHubRepo & { _hasContent?: string | null };
        delete clean._hasContent;
        return clean as GitHubRepo;
      });
  } catch (error) {
    console.error("Failed to fetch repos:", error);
    return [];
  }
}

/**
 * Fetch and parse README for a repo, returning a clean excerpt
 */
export async function fetchReadmeExcerpt(
  repoName: string
): Promise<string | null> {
  try {
    const res = await fetch(
      `${API_BASE}/repos/${GITHUB_USER}/${repoName}/readme`,
      {
        headers: getHeaders(),
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) return null;

    const data = await res.json();
    const content = Buffer.from(data.content, "base64").toString("utf-8");
    return extractReadmeExcerpt(content);
  } catch {
    return null;
  }
}

/**
 * Fetch full README content (raw markdown) for case study pages
 */
export async function fetchFullReadme(
  repoName: string
): Promise<string | null> {
  try {
    const res = await fetch(
      `${API_BASE}/repos/${GITHUB_USER}/${repoName}/readme`,
      {
        headers: getHeaders(),
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) return null;

    const data = await res.json();
    const content = Buffer.from(data.content, "base64").toString("utf-8");
    return stripReadmeBadges(content);
  } catch {
    return null;
  }
}

/**
 * Fetch language breakdown for a repo
 */
export async function fetchRepoLanguages(
  repoName: string
): Promise<Record<string, number> | null> {
  try {
    const res = await fetch(
      `${API_BASE}/repos/${GITHUB_USER}/${repoName}/languages`,
      {
        headers: getHeaders(),
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

/**
 * Strip badges, shields, install instructions, and license boilerplate from README
 */
function stripReadmeBadges(content: string): string {
  return content
    // Remove badge images (shields.io, etc.)
    .replace(/\[!\[.*?\]\(.*?\)\]\(.*?\)/g, "")
    .replace(/!\[.*?badge.*?\]\(.*?\)/gi, "")
    .replace(/!\[.*?shield.*?\]\(.*?\)/gi, "")
    // Remove shields.io URLs
    .replace(/https?:\/\/img\.shields\.io\/[^\s)]+/g, "")
    // Remove empty image references
    .replace(/!\[\]\(.*?\)/g, "")
    // Clean up multiple blank lines
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/**
 * Extract the first substantive paragraph from README content
 * Looks for ## About / ## Overview sections first, then falls back to first paragraph
 */
function extractReadmeExcerpt(content: string): string | null {
  const stripped = stripReadmeBadges(content);
  const lines = stripped.split("\n");

  // Try to find "About" or "Overview" section
  let inSection = false;
  const sectionContent: string[] = [];

  for (const line of lines) {
    if (/^#{1,3}\s*(About|Overview|Description|What is)/i.test(line)) {
      inSection = true;
      continue;
    }
    if (inSection) {
      if (/^#{1,3}\s/.test(line)) break; // Next section header
      if (line.trim()) sectionContent.push(line.trim());
    }
  }

  if (sectionContent.length > 0) {
    return sectionContent.slice(0, 3).join(" ").slice(0, 300);
  }

  // Fall back to first substantive paragraph after the title
  let foundTitle = false;
  const paragraphLines: string[] = [];

  for (const line of lines) {
    if (!foundTitle && /^#\s/.test(line)) {
      foundTitle = true;
      continue;
    }
    if (foundTitle || !line.startsWith("#")) {
      const trimmed = line.trim();
      // Skip empty lines, badges, links-only lines
      if (!trimmed) {
        if (paragraphLines.length > 0) break; // End of first paragraph
        continue;
      }
      if (/^[!\[<]/.test(trimmed)) continue; // Skip images/HTML/badges
      if (/^#{1,6}\s/.test(trimmed)) {
        if (paragraphLines.length > 0) break;
        continue;
      }
      paragraphLines.push(trimmed);
    }
  }

  if (paragraphLines.length === 0) return null;

  const excerpt = paragraphLines.slice(0, 3).join(" ");
  return excerpt.length > 300 ? excerpt.slice(0, 297) + "..." : excerpt;
}
