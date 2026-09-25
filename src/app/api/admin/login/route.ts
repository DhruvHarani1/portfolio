import { NextRequest, NextResponse } from "next/server";
import { checkPasscode, setAdminSession } from "@/lib/admin/auth";

export async function POST(req: NextRequest) {
  const { passcode } = await req.json().catch(() => ({ passcode: "" }));
  if (typeof passcode !== "string" || !passcode) {
    return NextResponse.json({ error: "Missing passcode" }, { status: 400 });
  }

  const token = checkPasscode(passcode);
  if (!token) {
    return NextResponse.json({ error: "Invalid passcode" }, { status: 401 });
  }

  await setAdminSession(token);
  return NextResponse.json({ ok: true });
}
