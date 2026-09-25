import "server-only";
import { createHash, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "dh_admin_session";

function expectedToken(): string | null {
  const passcode = process.env.ADMIN_PASSCODE;
  if (!passcode) return null;
  return createHash("sha256").update(passcode).digest("hex");
}

export function checkPasscode(input: string): string | null {
  const expected = expectedToken();
  if (!expected) return null;
  const candidate = createHash("sha256").update(input).digest("hex");
  const a = Buffer.from(candidate);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  return expected;
}

export async function setAdminSession(token: string) {
  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 14, // 14 days
  });
}

export async function clearAdminSession() {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

export async function isAdminAuthed(): Promise<boolean> {
  const expected = expectedToken();
  if (!expected) return false;
  const store = await cookies();
  const value = store.get(COOKIE_NAME)?.value;
  if (!value) return false;
  const a = Buffer.from(value);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}
