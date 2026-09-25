import type { Metadata } from "next";
import DesktopOS from "@/components/desktop/DesktopOS";
import { fetchAllRepos } from "@/lib/github";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Desktop",
  description: "An interactive desktop — explore Dhruv Harani's work as apps.",
};

export default async function DesktopPage() {
  const repos = await fetchAllRepos();
  return <DesktopOS repos={repos} />;
}
