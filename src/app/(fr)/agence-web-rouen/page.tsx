import type { Metadata } from "next";
import { LocalSeoPageContent, CITY_PAGES } from "@/components/pages/local-seo-page-content";

export const metadata: Metadata = {
  title: "Création site web Rouen — KAH-Digital | Dès € 300",
  description: "Studio digital pour Rouen et la Normandie. Sites web professionnels pour PME, artisans et commerces normands. Devis gratuit sous 24h, dès € 300.",
  keywords: ["création site web Rouen", "agence web Rouen", "site internet Rouen", "développeur web Rouen", "agence digitale Normandie"],
  openGraph: {
    title: "Création site web Rouen — KAH-Digital",
    description: "Studio digital pour PME et artisans rouennais. Sites, apps, solutions digitales. Process clair. Dès € 300.",
  },
  alternates: { canonical: "https://kah-digital.ch/agence-web-rouen" },
};

export default function AgenceWebRouenPage() {
  return <LocalSeoPageContent data={CITY_PAGES["agence-web-rouen"]!} />;
}
