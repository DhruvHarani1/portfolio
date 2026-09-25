"use client";

import { useState } from "react";

interface Note {
  title: string;
  date: string;
  body: string[];
}

const NOTES: Note[] = [
  {
    title: "About Me",
    date: "Pinned",
    body: [
      "I'm a full-stack engineer currently working as a Software Developer Intern at FloIndex Ventures in Ahmedabad, where I own real backend and frontend work on Clarityy AI, a live fintech product.",
      "I'm pursuing a B.Tech in Computer Engineering at LJ University (expected 2028, CGPA 8.5+/10). My coursework in data structures, DBMS, and operating systems gives me the foundations, but what I care about most is building and shipping complete products.",
      "I'm backend-leaning but product-minded. Comfortable owning a feature from database schema to shipped UI — Python/FastAPI, NestJS, Flask on the backend, React and React Native on the frontend.",
    ],
  },
  {
    title: "Now",
    date: "2026",
    body: [
      "Building the backend for Clarityy AI — a data pipeline that auto-detects and normalizes tradebook formats from different Indian brokers, then computes WAC-based P&L benchmarked against the Nifty 50.",
      "Also handling auth (Supabase OAuth) and deployment (Render) for the same product — the full slice, not just the fun part.",
    ],
  },
  {
    title: "How I Work",
    date: "Notes to self",
    body: [
      "Ship real things, not demos. HMS runs in daily production use by 53 actual people — a warden, kitchen staff, students. That's the bar I hold my side projects to.",
      "Pick the right tool, not the trendy one. Flask for PG-Manager, NestJS for HMS, FastAPI for Clarityy — the stack follows the problem.",
      "Debugging is the job. Nexus exists because I'd rather fix a subtle FCF/ROIC calculation bug than write another CRUD app.",
    ],
  },
  {
    title: "Fun Fact",
    date: "First year",
    body: [
      "Presented TextIt as lead developer at a hackathon hosted by Royal Technologies — during my first year of university, before I really knew what I was doing yet.",
    ],
  },
];

export default function NotesApp() {
  const [selected, setSelected] = useState(0);
  const note = NOTES[selected];

  return (
    <div className="flex h-full bg-[#f5f0dc] text-[#2b2b2b]">
      <div className="w-36 shrink-0 overflow-y-auto border-r border-black/10 bg-[#ede6c9]">
        {NOTES.map((n, i) => (
          <button
            key={n.title}
            onClick={() => setSelected(i)}
            className={`block w-full border-b border-black/5 px-3 py-2.5 text-left ${
              i === selected ? "bg-[#f5f0dc]" : "hover:bg-black/5"
            }`}
          >
            <p className="truncate text-xs font-semibold text-[#2b2b2b]">{n.title}</p>
            <p className="mt-0.5 truncate text-[10px] text-[#8a7f5e]">{n.date}</p>
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-8 py-6">
        <p className="mb-1 text-xs text-[#8a7f5e]">{note.date}</p>
        <h2 className="mb-3 text-lg font-semibold">{note.title}</h2>
        <div className="space-y-4 text-[15px] leading-relaxed">
          {note.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
