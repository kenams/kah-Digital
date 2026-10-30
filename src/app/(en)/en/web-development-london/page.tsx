import type { Metadata } from "next";
import { LocalSeoEnPageContent, EN_CITY_PAGES } from "@/components/pages/local-seo-en-page-content";

export const metadata: Metadata = {
  title: "Web Development London — Premium Next.js Sites in 14 Days",
  description: "Web development London: Next.js 15, SaaS-level design, Lighthouse 95+. Business website in 5 business days, 100% yours, no lock-in. Fixed price from $290. Free quote within 24h.",
  keywords: ["web development London", "website development London", "Next.js developer London", "web agency London", "business website London", "web app development London"],
  alternates: { canonical: "https://kah-digital.ch/en/web-development-london" },
};

export default function WebDevelopmentLondonPage() {
  return <LocalSeoEnPageContent data={EN_CITY_PAGES["web-development-london"]!} />;
}
