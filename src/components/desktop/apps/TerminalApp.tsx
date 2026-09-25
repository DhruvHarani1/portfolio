"use client";

import { useEffect, useRef, useState } from "react";

interface Line {
  type: "input" | "output";
  text: string;
}

const NEOFETCH = `dhruv@dhruv-os
---------------
OS: Dhruv OS (Next.js Edition)
Host: dhruvharani.dev
Kernel: React 19.2.8
Shell: TypeScript
DE: Windows 11-style
Role: Full-stack engineer @ FloIndex Ventures
Projects: 5+ shipped, 2 live in production
Languages: Python, TypeScript, Java, JavaScript
Uptime: since 2026 (this desktop, anyway)`;

const ABOUT_MD = `# About Dhruv

Full-stack engineer building products people actually use.
Backend-leaning, product-minded — comfortable owning a feature
from database schema to shipped UI.

Currently: Software Developer Intern @ FloIndex Ventures,
working on Clarityy AI (Python/FastAPI + React/Vite).

B.Tech Computer Engineering @ LJ University, expected 2028.`;

const PROJECT_FILES = [
  "clarityy-ai/",
  "hms/",
  "nexus/",
  "pg-manager/",
  "devpain-ai/",
];

const COMMANDS: Record<string, string> = {
  whoami:
    "Dhruv Harani — Full-stack engineer. Backend-leaning, product-minded.",
  skills:
    "Python · TypeScript · React · Next.js · FastAPI · NestJS · Flask · PostgreSQL · Supabase · Docker",
  projects:
    "Clarityy AI · HMS (Hostel Management System) · Nexus · PG-Manager · DevPain-AI — run 'open gallery' or check the Gallery app.",
  contact:
    "Email: dhruvharani5@gmail.com · GitHub: github.com/DhruvHarani1 · LinkedIn: linkedin.com/in/dhruv-harani",
  resume: "Open the Resume app from the dock, or run 'download resume'.",
  sudo: "Nice try. Permission denied — you're not root here. 😉",
  neofetch: NEOFETCH,
  "cat about.md": ABOUT_MD,
  "cat about": ABOUT_MD,
  ls: PROJECT_FILES.join("  "),
  "ls projects": PROJECT_FILES.join("  "),
  "ls projects/": PROJECT_FILES.join("  "),
  help: "Available commands: neofetch, whoami, skills, projects, contact, resume, ls, cat about.md, date, clear, help",
};

export default function TerminalApp() {
  const [lines, setLines] = useState<Line[]>([
    { type: "output", text: "Dhruv OS Terminal — type 'help' to get started." },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines]);

  function run(cmd: string) {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    if (trimmed === "clear") {
      setLines([]);
      return;
    }

    if (trimmed === "date") {
      setLines((prev) => [
        ...prev,
        { type: "input", text: trimmed },
        { type: "output", text: new Date().toString() },
      ]);
      return;
    }

    if (trimmed === "download resume") {
      window.open("/resume.pdf", "_blank");
      setLines((prev) => [
        ...prev,
        { type: "input", text: trimmed },
        { type: "output", text: "Opening resume.pdf…" },
      ]);
      return;
    }

    const output =
      COMMANDS[trimmed.toLowerCase()] ??
      `command not found: ${trimmed} — try 'help'`;

    setLines((prev) => [
      ...prev,
      { type: "input", text: trimmed },
      { type: "output", text: output },
    ]);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    run(input);
    setInput("");
  }

  return (
    <div
      className="flex h-full flex-col bg-black p-3 font-mono text-[13px] text-[#7dff7d]"
      onClick={() => inputRef.current?.focus()}
    >
      <div ref={scrollRef} className="flex-1 space-y-1 overflow-y-auto">
        {lines.map((line, i) =>
          line.type === "input" ? (
            <div key={i} className="text-white">
              <span className="text-[#7dff7d]">visitor@dhruv-os</span>:~${" "}
              {line.text}
            </div>
          ) : (
            <div key={i} className="whitespace-pre-wrap text-[#a0a0a0]">
              {line.text}
            </div>
          )
        )}
      </div>
      <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-1">
        <span className="text-[#7dff7d]">visitor@dhruv-os</span>
        <span className="text-white">:~$</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoFocus
          spellCheck={false}
          className="flex-1 bg-transparent text-white focus:outline-none"
        />
      </form>
    </div>
  );
}
