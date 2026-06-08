import type { Metadata } from "next";
import { LocalSeoPageContent, CITY_PAGES } from "@/components/pages/local-seo-page-content";

export const metadata: Metadata = {
  title: "Création site web Paris — KAH Digital | Devis personnalisé",
  description: "Studio digital franco-suisse. Création de sites web, apps et solutions IA pour freelances, PME et startups parisiennes. Devis personnalisé sous 24h, adapté au besoin réel.",
  keywords: ["création site web Paris", "agence web Paris", "site internet Paris", "développeur web Paris freelance"],
  openGraph: {
    title: "Création site web Paris — KAH Digital",
    description: "Studio digital pour entreprises parisiennes. Sites, apps, IA. Process clair. Devis personnalisé.",
  },
  alternates: { canonical: "https://KAH Digital.ch/agence-web-paris" },
};

export default function AgenceWebParisPage() {
  return <LocalSeoPageContent data={CITY_PAGES["agence-web-paris"]!} />;
}

