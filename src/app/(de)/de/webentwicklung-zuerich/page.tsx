import type { Metadata } from "next";
import { LocalSeoDePageContent, DE_CITY_PAGES } from "@/components/pages/local-seo-de-page-content";

export const metadata: Metadata = {
  title: "Webentwicklung Zürich — Premium Next.js Websites in 14 Tagen | KAH Digital",
  description: "Webentwicklung Zürich: Next.js 15, SaaS-Level Design, Core Web Vitals 95+. Business-Website in 14 Tagen, 100% Ihr Eigentum, kein Lock-in. Kostenlose Offerte in 24h.",
  keywords: ["Webentwicklung Zürich", "Website erstellen Zürich", "Webdesign Zürich", "Next.js Entwickler Zürich", "Website KMU Zürich", "professionelle Website Zürich"],
  alternates: { canonical: "https://kah-digital.ch/de/webentwicklung-zuerich" },
};

export default function WebentwicklungZuerichPage() {
  return <LocalSeoDePageContent data={DE_CITY_PAGES["webentwicklung-zuerich"]!} />;
}
