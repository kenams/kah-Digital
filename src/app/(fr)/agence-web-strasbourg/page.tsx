import type { Metadata } from "next";
import { LocalSeoPageContent, CITY_PAGES } from "@/components/pages/local-seo-page-content";

export const metadata: Metadata = {
  title: "Cr�ation site web Strasbourg � KAH Digital | Devis personnalis�",
  description: "Studio digital pour Strasbourg et l'Alsace. Sites web trilingues FR/DE/EN, apps et solutions IA. Id�al pour entreprises transfrontali�res. Devis sous 24h.",
  keywords: ["cr�ation site web Strasbourg", "agence web Strasbourg", "site internet Strasbourg", "d�veloppeur web Alsace"],
  openGraph: {
    title: "Cr�ation site web Strasbourg � KAH Digital",
    description: "Studio digital pour entreprises alsaciennes et transfrontali�res. FR/DE/EN. Devis personnalis�.",
  },
  alternates: { canonical: "https://kah-digital.ch/agence-web-strasbourg" },
};

export default function AgenceWebStrasbourgPage() {
  return <LocalSeoPageContent data={CITY_PAGES["agence-web-strasbourg"]!} />;
}

