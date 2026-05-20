import type { Metadata } from "next";
import { LocalSeoEnPageContent, EN_CITY_PAGES } from "@/components/pages/local-seo-en-page-content";

export const metadata: Metadata = {
  title: "Web Development Geneva — Premium Next.js Sites for Swiss Businesses | KAH Digital",
  description: "Web development Geneva: Next.js 15, multilingual (FR/EN/DE), Lighthouse 95+. Business website in 14 days, fixed price from CHF 149. Local studio, 40 min from Geneva. Free quote.",
  keywords: ["web development Geneva", "website Geneva", "web agency Geneva", "Next.js developer Geneva", "création site web Genève", "agence web Genève"],
  alternates: { canonical: "https://kah-digital.ch/en/site-web-geneve" },
};

export default function WebDevelopmentGenevaPage() {
  return <LocalSeoEnPageContent data={EN_CITY_PAGES["web-development-geneva"]!} />;
}
