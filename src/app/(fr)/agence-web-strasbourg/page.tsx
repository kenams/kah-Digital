import type { Metadata } from "next";
import { LocalSeoPageContent, CITY_PAGES } from "@/components/pages/local-seo-page-content";

export const metadata: Metadata = {
  title: "Création site web Strasbourg — KAH-Digital | Devis personnalisé",
  description: "Studio digital pour Strasbourg et l'Alsace. Sites web trilingues FR/DE/EN, apps et solutions IA. Idéal pour entreprises transfrontalières. Devis sous 24h.",
  keywords: ["création site web Strasbourg", "agence web Strasbourg", "site internet Strasbourg", "développeur web Alsace"],
  openGraph: {
    title: "Création site web Strasbourg — KAH-Digital",
    description: "Studio digital pour entreprises alsaciennes et transfrontalières. FR/DE/EN. Devis personnalisé.",
  },
  alternates: { canonical: "https://kah-digital.ch/agence-web-strasbourg" },
};

export default function AgenceWebStrasbourgPage() {
  return <LocalSeoPageContent data={CITY_PAGES["agence-web-strasbourg"]!} />;
}

