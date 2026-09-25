import type { Metadata } from "next";
import { isAdminAuthed } from "@/lib/admin/auth";
import AdminLogin from "@/components/inbox/AdminLogin";
import InboxClient from "@/components/inbox/InboxClient";

export const metadata: Metadata = {
  title: "Inbox",
  robots: { index: false, follow: false },
};

export default async function InboxPage() {
  const authed = await isAdminAuthed();

  return (
    <div className="min-h-screen bg-bg-secondary">
      {authed ? <InboxClient /> : <AdminLogin />}
    </div>
  );
}
