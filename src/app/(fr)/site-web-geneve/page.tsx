import type { Metadata } from "next";
import { LocalSeoPageContent, CITY_PAGES } from "@/components/pages/local-seo-page-content";

export const metadata: Metadata = {
  title: "Création site web Genève — KAH-Digital | Devis personnalisé",
  description: "Studio digital proche de Genève. Sites web professionnels, apps et solutions IA pour entreprises et indépendants genevois. Devis personnalisé sous 24h, adapté au besoin réel.",
  keywords: ["création site web Genève", "agence web Genève", "site internet Genève", "développeur web Genève"],
  openGraph: {
    title: "Création site web Genève — KAH-Digital",
    description: "Studio digital romand pour entreprises genevoise. Sites, apps, IA. Devis personnalisé.",
  },
  alternates: { canonical: "https://kah-digital.ch/site-web-geneve" },
};

export default function SiteWebGenevePage() {
  return <LocalSeoPageContent data={CITY_PAGES["site-web-geneve"]!} />;
}

