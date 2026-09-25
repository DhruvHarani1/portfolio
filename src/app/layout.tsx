import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import BackToTop from "@/components/BackToTop";
import CommandPalette from "@/components/CommandPalette";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dhruvharani.dev";

export const metadata: Metadata = {
  title: {
    default: "Dhruv Harani — Full-Stack Engineer",
    template: "%s | Dhruv Harani",
  },
  description:
    "Full-stack engineer building products people actually use. Backend-leaning, product-minded — comfortable owning a feature from database schema to shipped UI.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "Dhruv Harani — Full-Stack Engineer",
    description:
      "Full-stack engineer building products people actually use. Backend-leaning, product-minded.",
    url: siteUrl,
    siteName: "Dhruv Harani",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dhruv Harani — Full-Stack Engineer",
    description:
      "Full-stack engineer building products people actually use.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#1D1D1F",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} antialiased`}>
      <body className="min-h-screen bg-bg-primary text-text-primary font-[var(--font-display)]">
        <SmoothScroll />
        <ScrollProgress />
        {children}
        <BackToTop />
        <CommandPalette />
      </body>
    </html>
  );
}
