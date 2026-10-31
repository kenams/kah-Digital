import type { Metadata } from "next";
import { LocalSeoPageContent, CITY_PAGES } from "@/components/pages/local-seo-page-content";

export const metadata: Metadata = {
  title: "Création site web Strasbourg — KAH Digital Studio | Devis personnalisé",
  description: "Studio digital pour Strasbourg et l'Alsace. Sites web trilingues FR/DE/EN, apps et solutions IA. Idéal pour entreprises transfrontalières. Devis sous 24h.",
  keywords: ["création site web Strasbourg", "agence web Strasbourg", "site internet Strasbourg", "développeur web Alsace"],
  openGraph: {
    images: [{ url: "/og-kah-digital.png", width: 1200, height: 630 }],
    title: "Création site web Strasbourg — KAH Digital Studio",
    description: "Studio digital pour entreprises alsaciennes et transfrontalières. FR/DE/EN. Devis personnalisé.",
  },
  alternates: { canonical: "https://kah-digital.ch/agence-web-strasbourg" },
};

export default function AgenceWebStrasbourgPage() {
  return <LocalSeoPageContent data={CITY_PAGES["agence-web-strasbourg"]!} />;
}

