import type { Metadata } from "next";
import { LocalSeoPageContent, CITY_PAGES } from "@/components/pages/local-seo-page-content";

export const metadata: Metadata = {
  title: "Cr�ation site web Nantes � KAH Digital | Devis personnalis�",
  description: "Studio digital pour Nantes et les Pays de la Loire. Sites web, apps et solutions IA pour startups, tech et PME. Devis gratuit sous 24h.",
  keywords: ["cr�ation site web Nantes", "agence web Nantes", "site internet Nantes", "d�veloppeur web Nantes"],
  openGraph: {
    title: "Cr�ation site web Nantes � KAH Digital",
    description: "Studio digital pour entreprises nantaises. Sites, apps, IA. Devis personnalis�.",
  },
  alternates: { canonical: "https://kah-digital.ch/agence-web-nantes" },
};

export default function AgenceWebNantesPage() {
  return <LocalSeoPageContent data={CITY_PAGES["agence-web-nantes"]!} />;
}

