import type { Metadata } from "next";
import { LocalSeoDePageContent, DE_CITY_PAGES } from "@/components/pages/local-seo-de-page-content";

export const metadata: Metadata = {
  title: "Webentwicklung München — Premium Websites in 14 Tagen | KAH Digital",
  description: "Webentwicklung München: Next.js 15, SaaS-Level Design, Lighthouse 95+. Startup bis Mittelstand. Fester Preis ab €142, 14-Tage-Lieferung, 100% Ihr Code. Kostenlose Offerte.",
  keywords: ["Webentwicklung München", "Website erstellen München", "Webdesign München", "Next.js Entwickler München", "Website Startup München", "Webseite Bayern"],
  alternates: { canonical: "https://kah-digital.ch/de/webentwicklung-muenchen" },
};

export default function WebentwicklungMuenchenPage() {
  return <LocalSeoDePageContent data={DE_CITY_PAGES["webentwicklung-muenchen"]!} />;
}
