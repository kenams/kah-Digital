import type { Metadata } from "next";
import { LocalSeoPageContent, CITY_PAGES } from "@/components/pages/local-seo-page-content";

export const metadata: Metadata = {
  title: "Création site web Rouen — KAH-Digital | Devis personnalisé",
  description: "Studio digital pour Rouen et la Normandie. Sites web professionnels pour PME, artisans et commerces normands. Devis personnalisé sous 24h, adapté au besoin réel.",
  keywords: ["création site web Rouen", "agence web Rouen", "site internet Rouen", "développeur web Rouen", "agence digitale Normandie"],
  openGraph: {
    title: "Création site web Rouen — KAH-Digital",
    description: "Studio digital pour PME et artisans rouennais. Sites, apps, solutions digitales. Process clair. Devis personnalisé.",
  },
  alternates: { canonical: "https://kah-digital.ch/agence-web-rouen" },
};

export default function AgenceWebRouenPage() {
  return <LocalSeoPageContent data={CITY_PAGES["agence-web-rouen"]!} />;
}

