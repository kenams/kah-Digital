import type { Metadata } from "next";
import { LocalSeoEnPageContent, EN_CITY_PAGES } from "@/components/pages/local-seo-en-page-content";

export const metadata: Metadata = {
  title: "Web Development Dubai — Premium Next.js Sites for UAE | KAH Digital",
  description: "Web development Dubai: Next.js 15, SaaS-level design, Lighthouse 95+. Business website in 14 days, 100% yours, no lock-in. Fixed price from $142. Free quote within 24h.",
  keywords: ["web development Dubai", "website development UAE", "Next.js developer Dubai", "web agency Dubai", "business website Dubai", "web app development UAE"],
  alternates: { canonical: "https://kah-digital.ch/en/web-development-dubai" },
};

export default function WebDevelopmentDubaiPage() {
  return <LocalSeoEnPageContent data={EN_CITY_PAGES["web-development-dubai"]!} />;
}
