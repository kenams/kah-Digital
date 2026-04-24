import type { Metadata } from "next";
import { LocalSeoPageContent, CITY_PAGES } from "@/components/pages/local-seo-page-content";

export const metadata: Metadata = {
  title: "Création site web Bordeaux — KAH-Digital | Dès € 300",
  description: "Studio digital pour Bordeaux et la Nouvelle-Aquitaine. Sites web, apps et solutions IA pour PME, vignobles et commerces. Devis gratuit sous 24h.",
  keywords: ["création site web Bordeaux", "agence web Bordeaux", "site internet Bordeaux", "développeur web Bordeaux"],
  openGraph: {
    title: "Création site web Bordeaux — KAH-Digital",
    description: "Studio digital pour entreprises bordelaises. Sites, apps, IA. Dès € 300.",
  },
  alternates: { canonical: "https://kah-digital.ch/agence-web-bordeaux" },
};

export default function AgenceWebBordeauxPage() {
  return <LocalSeoPageContent data={CITY_PAGES["agence-web-bordeaux"]!} />;
}
