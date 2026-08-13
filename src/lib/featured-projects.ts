// Featured project metadata — verified facts from the prompt library
// These are layered on top of auto-extracted README data

export interface FeaturedProject {
  slug: string;
  repoName: string;
  name: string;
  tagline: string;
  description: string;
  liveUrl: string | null;
  techStack: string[];
  highlights: string[];
  gradient: string; // CSS gradient for placeholder cards
}

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    slug: "clarityy-ai",
    repoName: "Clarityy-AI",
    name: "Clarityy AI",
    tagline: "Live portfolio-analytics platform for Indian investors",
    description:
      "Flagship fintech product built during internship at FloIndex Ventures. A live portfolio-analytics platform using Python/FastAPI serving a React/Vite frontend. Features a data-processing pipeline that auto-detects and normalizes multiple Indian broker tradebook formats, computing Weighted-Average-Cost (WAC) based P&L benchmarked against the Nifty 50 index.",
    liveUrl: "https://clarityy.ai",
    techStack: ["Python", "FastAPI", "React", "Vite", "Supabase", "Render"],
    highlights: [
      "Live fintech product with real users",
      "Auto-detects and normalizes multiple Indian broker tradebook formats",
      "Computes WAC-based P&L benchmarked against Nifty 50",
      "Supabase-based OAuth authentication",
      "Backend infrastructure deployed on Render",
    ],
    gradient: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
  },
  {
    slug: "hms",
    repoName: "HMS",
    name: "HMS (Hostel Management System)",
    tagline: "Real-world deployed system with 53 active daily users",
    description:
      "A full-stack hostel management system in daily active production use by 50 students, 1 warden, and 2 kitchen staff. Built with NestJS, Prisma, and PostgreSQL on the backend, with a React Native mobile frontend. A real deployed system, not a demo.",
    liveUrl: null,
    techStack: ["NestJS", "Prisma", "PostgreSQL", "React Native"],
    highlights: [
      "In daily active production use by 53 users",
      "Serves 50 students, 1 warden, and 2 kitchen staff",
      "Full-stack: NestJS/Prisma/Postgres backend + React Native mobile app",
      "Real deployed system, not a portfolio demo",
    ],
    gradient: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
  },
  {
    slug: "nexus",
    repoName: "Nexus",
    name: "Nexus",
    tagline: "Financial data engineering with debugging rigor",
    description:
      "Financial data engineering project demonstrating depth in FCF/ROIC bug-fixing and API migration. Shows debugging rigor and data integrity focus beyond typical CRUD applications.",
    liveUrl: null,
    techStack: ["Python", "API Integration", "Financial Data"],
    highlights: [
      "FCF/ROIC calculation bug-fixing and validation",
      "API migration with data integrity preservation",
      "Demonstrates debugging rigor beyond CRUD",
      "Financial data engineering depth",
    ],
    gradient: "linear-gradient(135deg, #0d1117 0%, #161b22 50%, #21262d 100%)",
  },
  {
    slug: "pg-manager",
    repoName: "PG-Manager",
    name: "PG-Manager",
    tagline: "Full product ownership with UPI payment integration",
    description:
      "A complete paying-guest management system demonstrating full product ownership. Built with Flask and PostgreSQL, featuring integrated UPI payments. Rounds out backend breadth with a different stack from the other projects.",
    liveUrl: null,
    techStack: ["Flask", "PostgreSQL", "UPI Payments", "Python"],
    highlights: [
      "Full product ownership from concept to deployment",
      "Integrated UPI payment processing",
      "Flask + PostgreSQL backend",
      "Complete PG management workflow",
    ],
    gradient: "linear-gradient(135deg, #1a0a2e 0%, #2d1b69 50%, #4a2c8a 100%)",
  },
  {
    slug: "devpain-ai",
    repoName: "DevPain-AI",
    name: "DevPain-AI",
    tagline: "AI-powered developer pain-point analyzer",
    description:
      "A live AI-powered tool that analyzes developer pain points. The only project that directly demonstrates AI Model Integration and Prompt Engineering skills through real Gemini API integration — not just a wrapper, but thoughtful prompt engineering for meaningful output.",
    liveUrl: "https://dev-pain-ai.netlify.app",
    techStack: ["Gemini API", "AI Integration", "Prompt Engineering", "Netlify"],
    highlights: [
      "Live and deployed on Netlify",
      "Real Gemini API integration",
      "Demonstrates AI Model Integration & Prompt Engineering",
      "Thoughtful prompt engineering for meaningful AI output",
    ],
    gradient: "linear-gradient(135deg, #0a1628 0%, #1a2744 50%, #2a3860 100%)",
  },
];

/**
 * Get a featured project by its slug
 */
export function getFeaturedProject(slug: string): FeaturedProject | undefined {
  return FEATURED_PROJECTS.find((p) => p.slug === slug);
}

/**
 * Check if a repo name matches a featured project
 */
export function isFeaturedRepo(repoName: string): boolean {
  return FEATURED_PROJECTS.some(
    (p) => p.repoName.toLowerCase() === repoName.toLowerCase()
  );
}

/**
 * Get the slug for a featured repo by its name
 */
export function getFeaturedSlug(repoName: string): string | null {
  const project = FEATURED_PROJECTS.find(
    (p) => p.repoName.toLowerCase() === repoName.toLowerCase()
  );
  return project?.slug ?? null;
}
