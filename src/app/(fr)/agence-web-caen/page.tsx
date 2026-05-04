import type { Metadata } from "next";
import { LocalSeoPageContent, CITY_PAGES } from "@/components/pages/local-seo-page-content";

export const metadata: Metadata = {
  title: "Création site web Caen — KAH-Digital | Dès € 300",
  description: "Studio digital pour Caen et le Calvados. Sites web professionnels pour PME, artisans et indépendants normands. Devis gratuit sous 24h, dès € 300.",
  keywords: ["création site web Caen", "agence web Caen", "site internet Caen", "développeur web Calvados", "agence digitale Normandie Caen"],
  openGraph: {
    title: "Création site web Caen — KAH-Digital",
    description: "Studio digital pour PME et artisans caennais. Sites, apps, solutions digitales. Dès € 300.",
  },
  alternates: { canonical: "https://kah-digital.ch/agence-web-caen" },
};

export default function AgenceWebCaenPage() {
  return <LocalSeoPageContent data={CITY_PAGES["agence-web-caen"]!} />;
}
