"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { usePathname } from "next/navigation";
import { isImmersiveRoute } from "@/lib/isImmersiveRoute";

interface Command {
  label: string;
  hint: string;
  action: () => void;
}

interface LenisLike {
  scrollTo: (target: string | HTMLElement, opts?: { offset?: number; duration?: number }) => void;
}

export default function CommandPalette() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands = useMemo<Command[]>(() => {
    function goTo(hash: string) {
      const el = document.querySelector(hash);
      if (!el) return;
      const lenis = (window as unknown as { __lenis?: LenisLike }).__lenis;
      if (lenis) lenis.scrollTo(hash, { offset: -72, duration: 1.2 });
      else el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.pushState(null, "", hash);
    }
    function openLink(url: string) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
    return [
      { label: "Go to About", hint: "Section", action: () => goTo("#about") },
      { label: "Go to Projects", hint: "Section", action: () => goTo("#projects") },
      { label: "Go to Experience", hint: "Section", action: () => goTo("#experience") },
      { label: "Go to Skills", hint: "Section", action: () => goTo("#skills") },
      { label: "Go to Contact", hint: "Section", action: () => goTo("#contact") },
      { label: "Open GitHub", hint: "External", action: () => openLink("https://github.com/DhruvHarani1") },
      { label: "Open LinkedIn", hint: "External", action: () => openLink("https://linkedin.com/in/dhruv-harani") },
      { label: "Email Dhruv", hint: "Contact", action: () => openLink("mailto:dhruvharani5@gmail.com") },
      { label: "Download Resume", hint: "File", action: () => openLink("/resume.pdf") },
    ];
  }, []);

  const filtered = useMemo(
    () =>
      commands.filter((c) =>
        c.label.toLowerCase().includes(query.toLowerCase())
      ),
    [commands, query]
  );

  function openPalette() {
    setQuery("");
    setActiveIndex(0);
    setOpen(true);
    requestAnimationFrame(() => inputRef.current?.focus());
  }

  function closePalette() {
    setOpen(false);
  }

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const isMod = e.metaKey || e.ctrlKey;
      if (isMod && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => {
          if (!o) {
            setQuery("");
            setActiveIndex(0);
            requestAnimationFrame(() => inputRef.current?.focus());
          }
          return !o;
        });
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function handleQueryChange(next: string) {
    setQuery(next);
    setActiveIndex(0);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const cmd = filtered[activeIndex];
      if (cmd) {
        cmd.action();
        setOpen(false);
      }
    }
  }

  if (isImmersiveRoute(pathname)) return null;

  return (
    <>
      {/* Trigger hint, desktop only */}
      <button
        onClick={openPalette}
        className="fixed bottom-6 left-6 z-50 hidden items-center gap-2 rounded-full border border-white/10 bg-bg-elevated/90 px-4 py-2.5 text-xs font-medium text-text-secondary shadow-[var(--shadow-card)] backdrop-blur-xl transition-all hover:border-white/20 hover:text-text-primary md:flex"
        aria-label="Open command palette"
      >
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        Quick nav
        <kbd className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] font-semibold">
          ⌘K
        </kbd>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[70] flex items-start justify-center bg-black/60 px-4 pt-[15vh] backdrop-blur-sm"
          onClick={closePalette}
        >
          <div
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-bg-elevated shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center gap-3 border-b border-white/5 px-4 py-3">
              <svg className="h-4 w-4 shrink-0 text-text-tertiary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Jump to a section or link…"
                className="w-full bg-transparent text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none"
              />
              <kbd className="shrink-0 rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] font-semibold text-text-tertiary">
                ESC
              </kbd>
            </div>

            <ul className="max-h-72 overflow-y-auto py-2">
              {filtered.length === 0 && (
                <li className="px-4 py-6 text-center text-sm text-text-tertiary">
                  No matches.
                </li>
              )}
              {filtered.map((cmd, i) => (
                <li key={cmd.label}>
                  <button
                    onClick={() => {
                      cmd.action();
                      setOpen(false);
                    }}
                    onMouseEnter={() => setActiveIndex(i)}
                    className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors ${
                      i === activeIndex
                        ? "bg-link-blue/10 text-text-primary"
                        : "text-text-secondary"
                    }`}
                  >
                    {cmd.label}
                    <span className="text-xs text-text-tertiary">{cmd.hint}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
