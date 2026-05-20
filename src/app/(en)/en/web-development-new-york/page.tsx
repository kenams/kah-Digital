import type { Metadata } from "next";
import { LocalSeoEnPageContent, EN_CITY_PAGES } from "@/components/pages/local-seo-en-page-content";

export const metadata: Metadata = {
  title: "Web Development New York — Startup-Grade Sites Fast | KAH Digital",
  description: "Web development New York: Next.js 15 for startups & businesses. SaaS-level design, Core Web Vitals 95+, no lock-in. Starter from $142, 5-day delivery. Free quote within 24h.",
  keywords: ["web development New York", "website development NYC", "Next.js developer New York", "startup website NYC", "web agency New York", "web app development NYC"],
  alternates: { canonical: "https://kah-digital.ch/en/web-development-new-york" },
};

export default function WebDevelopmentNewYorkPage() {
  return <LocalSeoEnPageContent data={EN_CITY_PAGES["web-development-new-york"]!} />;
}
