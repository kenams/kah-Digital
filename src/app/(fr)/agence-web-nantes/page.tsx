import type { Metadata } from "next";
import { LocalSeoPageContent, CITY_PAGES } from "@/components/pages/local-seo-page-content";

export const metadata: Metadata = {
  title: "Création site web Nantes — KAH-Digital | Dès € 300",
  description: "Studio digital pour Nantes et les Pays de la Loire. Sites web, apps et solutions IA pour startups, tech et PME. Devis gratuit sous 24h.",
  keywords: ["création site web Nantes", "agence web Nantes", "site internet Nantes", "développeur web Nantes"],
  openGraph: {
    title: "Création site web Nantes — KAH-Digital",
    description: "Studio digital pour entreprises nantaises. Sites, apps, IA. Dès € 300.",
  },
  alternates: { canonical: "https://kah-digital.ch/agence-web-nantes" },
};

export default function AgenceWebNantesPage() {
  return <LocalSeoPageContent data={CITY_PAGES["agence-web-nantes"]!} />;
}
