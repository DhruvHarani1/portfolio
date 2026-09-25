"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "Invalid passcode");
        setLoading(false);
        return;
      }
      router.refresh();
    } catch {
      setError("Something went wrong. Try again.");
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-[var(--radius-card)] border border-white/5 bg-bg-elevated p-8"
      >
        <h1 className="text-xl font-semibold text-text-primary">Inbox</h1>
        <p className="mt-1 text-sm text-text-secondary">
          Enter your passcode to view messages.
        </p>

        <input
          type="password"
          value={passcode}
          onChange={(e) => setPasscode(e.target.value)}
          placeholder="Passcode"
          autoFocus
          className="mt-6 w-full rounded-lg border border-white/10 bg-bg-primary px-4 py-2.5 text-sm text-text-primary placeholder:text-text-tertiary focus:border-link-blue/40 focus:outline-none"
        />

        {error && <p className="mt-2 text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading || !passcode}
          className="mt-4 w-full rounded-full bg-link-blue px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-link-blue-hover disabled:opacity-50"
        >
          {loading ? "Checking…" : "Unlock"}
        </button>
      </form>
    </div>
  );
}
