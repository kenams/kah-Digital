import type { Metadata } from "next";
import { LocalSeoPageContent, CITY_PAGES } from "@/components/pages/local-seo-page-content";

export const metadata: Metadata = {
  title: "Création site web Angers — KAH-Digital | Dès € 300",
  description: "Studio digital pour Angers et la Maine-et-Loire. Sites web, apps et solutions digitales pour startups, PME et indépendants angevins. Devis gratuit sous 24h, dès € 300.",
  keywords: ["création site web Angers", "agence web Angers", "site internet Angers", "développeur web Maine-et-Loire", "agence digitale Angers"],
  openGraph: {
    title: "Création site web Angers — KAH-Digital",
    description: "Studio digital pour entreprises angevines. Sites, apps, solutions digitales. Dès € 300.",
  },
  alternates: { canonical: "https://kah-digital.ch/agence-web-angers" },
};

export default function AgenceWebAngersPage() {
  return <LocalSeoPageContent data={CITY_PAGES["agence-web-angers"]!} />;
}
