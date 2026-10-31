import type { Metadata } from "next";
import { LocalSeoPageContent, CITY_PAGES } from "@/components/pages/local-seo-page-content";

export const metadata: Metadata = {
  title: "Création site web Caen — KAH Digital Studio | Devis personnalisé",
  description: "Studio digital pour Caen et le Calvados. Sites web professionnels pour PME, artisans et indépendants normands. Devis personnalisé sous 24h, adapté au besoin réel.",
  keywords: ["création site web Caen", "agence web Caen", "site internet Caen", "développeur web Calvados", "agence digitale Normandie Caen"],
  openGraph: {
    images: [{ url: "/og-kah-digital.png", width: 1200, height: 630 }],
    title: "Création site web Caen — KAH Digital Studio",
    description: "Studio digital pour PME et artisans caennais. Sites, apps, solutions digitales. Devis personnalisé.",
  },
  alternates: { canonical: "https://kah-digital.ch/agence-web-caen" },
};

export default function AgenceWebCaenPage() {
  return <LocalSeoPageContent data={CITY_PAGES["agence-web-caen"]!} />;
}

