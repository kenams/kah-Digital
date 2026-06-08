import type { Metadata } from "next";
import { LocalSeoPageContent, CITY_PAGES } from "@/components/pages/local-seo-page-content";

export const metadata: Metadata = {
  title: "Cr�ation site web Aix-en-Provence � KAH Digital | Devis personnalis�",
  description: "Studio digital pour Aix-en-Provence et la r�gion PACA. Sites web pour cabinets, vignobles, boutiques et professions lib�rales. Devis personnalis� sous 24h, adapt� au besoin r�el.",
  keywords: ["cr�ation site web Aix-en-Provence", "agence web Aix", "site internet Aix-en-Provence", "d�veloppeur web PACA", "agence digitale Aix"],
  openGraph: {
    title: "Cr�ation site web Aix-en-Provence � KAH Digital",
    description: "Studio digital pour entreprises aixoises. Sites �l�gants, apps, solutions digitales. Devis personnalis�.",
  },
  alternates: { canonical: "https://kah-digital.ch/agence-web-aix-en-provence" },
};

export default function AgenceWebAixEnProvencePage() {
  return <LocalSeoPageContent data={CITY_PAGES["agence-web-aix-en-provence"]!} />;
}

