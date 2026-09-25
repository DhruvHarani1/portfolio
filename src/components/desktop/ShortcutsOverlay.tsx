"use client";

const SHORTCUTS = [
  { keys: "Ctrl + Alt + Delete", desc: "Open Task Manager" },
  { keys: "Drag to screen edge", desc: "Snap window left / right / maximize" },
  { keys: "Double-click title bar", desc: "Maximize / restore a window" },
  { keys: "Right-click", desc: "Context menu (desktop, icons, taskbar, windows)" },
  { keys: "?", desc: "Show this list" },
  { keys: "Esc", desc: "Close a menu" },
];

export default function ShortcutsOverlay({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm overflow-hidden rounded-xl border border-white/10 bg-[#1e1e1e] shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <p className="text-sm font-semibold text-white">Keyboard &amp; mouse shortcuts</p>
          <button onClick={onClose} aria-label="Close" className="text-white/50 hover:text-white">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="divide-y divide-white/5">
          {SHORTCUTS.map((s) => (
            <div key={s.keys} className="flex items-center justify-between gap-4 px-4 py-2.5">
              <span className="text-xs text-white/60">{s.desc}</span>
              <kbd className="shrink-0 whitespace-nowrap rounded border border-white/15 bg-white/5 px-2 py-1 text-[11px] font-medium text-white/80">
                {s.keys}
              </kbd>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
