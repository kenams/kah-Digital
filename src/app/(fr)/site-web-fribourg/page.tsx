import type { Metadata } from "next";
import { LocalSeoPageContent, CITY_PAGES } from "@/components/pages/local-seo-page-content";

export const metadata: Metadata = {
  title: "Création site web Fribourg — KAH Digital | Devis personnalisé",
  description: "Studio digital romand bilingue FR/DE. Sites web, apps et solutions pour entreprises et indépendants de Fribourg. Devis gratuit sous 24h.",
  keywords: ["création site web Fribourg", "agence web Fribourg", "site internet Fribourg", "Webseite Freiburg"],
  openGraph: {
    title: "Création site web Fribourg — KAH Digital",
    description: "Studio digital bilingue pour Fribourg. Sites, apps, IA. Devis personnalisé.",
  },
  alternates: { canonical: "https://KAH Digital.ch/site-web-fribourg" },
};

export default function SiteWebFribourgPage() {
  return <LocalSeoPageContent data={CITY_PAGES["site-web-fribourg"]!} />;
}

