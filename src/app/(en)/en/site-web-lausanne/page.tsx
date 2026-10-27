import type { Metadata } from "next";
import { LocalSeoEnPageContent, EN_CITY_PAGES } from "@/components/pages/local-seo-en-page-content";

export const metadata: Metadata = {
  title: "Web Development Lausanne — Remote Studio, Premium Next.js Sites | KAH Digital",
  description: "Web development Lausanne: KAH Digital works remotely with Lausanne businesses. Next.js 15, SaaS-level design, Lighthouse 95+. From CHF 290, delivered in 5 business days. Free quote within 24h.",
  keywords: ["web development Lausanne", "website Lausanne", "web agency Lausanne", "Next.js developer Lausanne", "création site web Lausanne", "agence web Lausanne"],
  alternates: { canonical: "https://kah-digital.ch/en/site-web-lausanne" },
};

export default function WebDevelopmentLausannePage() {
  return <LocalSeoEnPageContent data={EN_CITY_PAGES["web-development-lausanne"]!} />;
}
