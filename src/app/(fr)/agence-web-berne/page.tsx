import type { Metadata } from "next";
import { LocalSeoPageContent, CITY_PAGES } from "@/components/pages/local-seo-page-content";

export const metadata: Metadata = {
  title: "Création site web Berne — KAH-Digital | Devis personnalisé",
  description: "Studio digital pour Berne et la Suisse. Sites web bilingues FR/DE, apps et solutions IA pour entreprises et institutions. Devis gratuit sous 24h.",
  keywords: ["création site web Berne", "agence web Berne", "site internet Berne", "développeur web Suisse"],
  openGraph: {
    title: "Création site web Berne — KAH-Digital",
    description: "Studio digital pour entreprises bernoises. Bilingue FR/DE. Devis personnalisé.",
  },
  alternates: { canonical: "https://kah-digital.ch/agence-web-berne" },
};

export default function AgenceWebBernePage() {
  return <LocalSeoPageContent data={CITY_PAGES["agence-web-berne"]!} />;
}

