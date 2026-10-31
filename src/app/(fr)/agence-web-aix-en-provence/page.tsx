import type { Metadata } from "next";
import { LocalSeoPageContent, CITY_PAGES } from "@/components/pages/local-seo-page-content";

export const metadata: Metadata = {
  title: "Création site web Aix-en-Provence — KAH Digital Studio | Devis personnalisé",
  description: "Studio digital pour Aix-en-Provence et la région PACA. Sites web pour cabinets, vignobles, boutiques et professions libérales. Devis personnalisé sous 24h, adapté au besoin réel.",
  keywords: ["création site web Aix-en-Provence", "agence web Aix", "site internet Aix-en-Provence", "développeur web PACA", "agence digitale Aix"],
  openGraph: {
    images: [{ url: "/og-kah-studio.png", width: 1200, height: 630 }],
    title: "Création site web Aix-en-Provence — KAH Digital Studio",
    description: "Studio digital pour entreprises aixoises. Sites élégants, apps, solutions digitales. Devis personnalisé.",
  },
  alternates: { canonical: "https://kah-digital.ch/agence-web-aix-en-provence" },
};

export default function AgenceWebAixEnProvencePage() {
  return <LocalSeoPageContent data={CITY_PAGES["agence-web-aix-en-provence"]!} />;
}

