import type { Metadata } from "next";
import { LocalSeoDePageContent, DE_CITY_PAGES } from "@/components/pages/local-seo-de-page-content";

export const metadata: Metadata = {
  title: "Webentwicklung Berlin — Startup-Level Websites schnell geliefert | KAH Digital",
  description: "Webentwicklung Berlin: Next.js 15 für Startups & Scale-ups. SaaS-Level Design, Core Web Vitals 95+, kein Lock-in. Starter ab €142, 5-Tage-Lieferung. Kostenlose Offerte.",
  keywords: ["Webentwicklung Berlin", "Website Startup Berlin", "Webdesign Berlin", "Next.js Berlin", "Website erstellen Berlin", "Web App Berlin"],
  alternates: { canonical: "https://kah-digital.ch/de/webentwicklung-berlin" },
};

export default function WebentwicklungBerlinPage() {
  return <LocalSeoDePageContent data={DE_CITY_PAGES["webentwicklung-berlin"]!} />;
}
