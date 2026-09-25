"use client";

import { useState } from "react";

const DELETED_ITEMS = [
  {
    name: "resume_v1_DO_NOT_USE.pdf",
    deleted: "a long time ago",
    note: "Comic Sans. We don't talk about it.",
  },
  {
    name: "my_first_react_app.zip",
    deleted: "2022",
    note: "Everything was a <div>. Everything.",
  },
  {
    name: "should_i_learn_php.txt",
    deleted: "before I knew better",
    note: "The answer was no.",
  },
];

export default function BinApp() {
  const [emptied, setEmptied] = useState(false);
  const [toast, setToast] = useState(false);

  function handleEmpty() {
    setEmptied(true);
    setToast(true);
    setTimeout(() => setToast(false), 2200);
  }

  return (
    <div className="relative flex h-full flex-col bg-[#1e1e1e] text-white/90">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <p className="text-xs text-white/50">
          {emptied ? "0 items" : `${DELETED_ITEMS.length} items`}
        </p>
        <button
          onClick={handleEmpty}
          disabled={emptied}
          className="rounded border border-white/15 px-2.5 py-1 text-[11px] text-white/70 transition-colors hover:border-white/30 hover:text-white disabled:opacity-30"
        >
          Empty Recycle Bin
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {emptied ? (
          <p className="mt-12 text-center text-sm text-white/40">Recycle Bin is empty.</p>
        ) : (
          <div className="space-y-2">
            {DELETED_ITEMS.map((item) => (
              <div
                key={item.name}
                className="rounded-lg border border-white/10 bg-white/[0.03] p-3"
              >
                <p className="text-sm text-white/85">{item.name}</p>
                <p className="mt-0.5 text-[11px] text-white/40">
                  Deleted {item.deleted} — {item.note}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {toast && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/90 px-4 py-2 text-xs text-white shadow-lg">
          Some things can&apos;t be undeleted. 😉
        </div>
      )}
    </div>
  );
}
