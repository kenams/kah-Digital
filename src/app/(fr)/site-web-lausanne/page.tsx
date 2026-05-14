import type { Metadata } from "next";
import { LocalSeoPageContent, CITY_PAGES } from "@/components/pages/local-seo-page-content";

export const metadata: Metadata = {
  title: "Création site web Lausanne — KAH-Digital | Devis personnalisé",
  description: "Studio digital à Lausanne. Création de sites web, apps et solutions IA pour indépendants, PME et startups vaudoises. Devis personnalisé sous 24h, adapté au besoin réel.",
  keywords: ["création site web Lausanne", "agence web Lausanne", "site internet Lausanne", "développeur web Lausanne"],
  openGraph: {
    title: "Création site web Lausanne — KAH-Digital",
    description: "Studio digital basé à Lausanne. Sites, apps et IA pour PME et indépendants vaudois. Devis personnalisé.",
  },
  alternates: { canonical: "https://kah-digital.ch/site-web-lausanne" },
};

export default function SiteWebLausannePage() {
  return <LocalSeoPageContent data={CITY_PAGES["site-web-lausanne"]!} />;
}

