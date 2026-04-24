import type { Metadata } from "next";
import { LocalSeoPageContent, CITY_PAGES } from "@/components/pages/local-seo-page-content";

export const metadata: Metadata = {
  title: "Création site web Genève — KAH-Digital | Dès € 300",
  description: "Studio digital proche de Genève. Sites web professionnels, apps et solutions IA pour entreprises et indépendants genevois. Devis gratuit 24h, dès € 300.",
  keywords: ["création site web Genève", "agence web Genève", "site internet Genève", "développeur web Genève"],
  openGraph: {
    title: "Création site web Genève — KAH-Digital",
    description: "Studio digital romand pour entreprises genevoise. Sites, apps, IA. Dès € 300.",
  },
  alternates: { canonical: "https://kah-digital.ch/site-web-geneve" },
};

export default function SiteWebGenevePage() {
  return <LocalSeoPageContent data={CITY_PAGES["site-web-geneve"]!} />;
}
