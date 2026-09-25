export default function ResumeApp() {
  return (
    <div className="flex h-full flex-col bg-[#525659]">
      <div className="flex shrink-0 justify-end p-2">
        <a
          href="/resume.pdf"
          download
          className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/20"
        >
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download
        </a>
      </div>
      <iframe src="/resume.pdf" title="Resume" className="flex-1 border-none" />
    </div>
  );
}
