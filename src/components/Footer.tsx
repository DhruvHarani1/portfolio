import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-bg-secondary">
      <div className="mx-auto max-w-[var(--content-max-width)] px-6 py-12">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          {/* Left — branding */}
          <div className="text-center md:text-left">
            <Link
              href="/"
              className="text-lg font-semibold text-text-primary transition-colors hover:text-link-blue"
            >
              Dhruv Harani
            </Link>
            <p className="mt-1 text-sm text-text-tertiary">
              Full-stack engineer building products people actually use.
            </p>
          </div>

          {/* Center — links */}
          <div className="flex items-center gap-6">
            <a
              href="mailto:dhruvharani5@gmail.com"
              className="text-sm text-text-secondary transition-colors hover:text-link-blue"
              aria-label="Email"
            >
              Email
            </a>
            <a
              href="https://github.com/DhruvHarani1"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-secondary transition-colors hover:text-link-blue"
              aria-label="GitHub"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/dhruv-harani"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-secondary transition-colors hover:text-link-blue"
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>
          </div>

          {/* Right — resume */}
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-bg-elevated px-6 py-2.5 text-sm font-medium text-text-primary transition-all hover:border-link-blue/30 hover:bg-bg-elevated/80 hover:shadow-lg hover:shadow-link-blue/5"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Download Resume
          </a>
        </div>

        <div className="mt-8 border-t border-white/5 pt-8 text-center">
          <p className="text-xs text-text-tertiary">
            © {new Date().getFullYear()} Dhruv Harani. Built with Next.js.
          </p>
        </div>
      </div>
    </footer>
  );
}
