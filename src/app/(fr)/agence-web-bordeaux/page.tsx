import type { Metadata } from "next";
import { LocalSeoPageContent, CITY_PAGES } from "@/components/pages/local-seo-page-content";

export const metadata: Metadata = {
  title: "Cr�ation site web Bordeaux � KAH Digital | Devis personnalis�",
  description: "Studio digital pour Bordeaux et la Nouvelle-Aquitaine. Sites web, apps et solutions IA pour PME, vignobles et commerces. Devis gratuit sous 24h.",
  keywords: ["cr�ation site web Bordeaux", "agence web Bordeaux", "site internet Bordeaux", "d�veloppeur web Bordeaux"],
  openGraph: {
    title: "Cr�ation site web Bordeaux � KAH Digital",
    description: "Studio digital pour entreprises bordelaises. Sites, apps, IA. Devis personnalis�.",
  },
  alternates: { canonical: "https://kah-digital.ch/agence-web-bordeaux" },
};

export default function AgenceWebBordeauxPage() {
  return <LocalSeoPageContent data={CITY_PAGES["agence-web-bordeaux"]!} />;
}

