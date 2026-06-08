import type { Metadata } from "next";
import { LocalSeoPageContent, CITY_PAGES } from "@/components/pages/local-seo-page-content";

export const metadata: Metadata = {
  title: "Cr�ation site web Fribourg � KAH Digital | Devis personnalis�",
  description: "Studio digital romand bilingue FR/DE. Sites web, apps et solutions pour entreprises et ind�pendants de Fribourg. Devis gratuit sous 24h.",
  keywords: ["cr�ation site web Fribourg", "agence web Fribourg", "site internet Fribourg", "Webseite Freiburg"],
  openGraph: {
    title: "Cr�ation site web Fribourg � KAH Digital",
    description: "Studio digital bilingue pour Fribourg. Sites, apps, IA. Devis personnalis�.",
  },
  alternates: { canonical: "https://kah-digital.ch/site-web-fribourg" },
};

export default function SiteWebFribourgPage() {
  return <LocalSeoPageContent data={CITY_PAGES["site-web-fribourg"]!} />;
}

