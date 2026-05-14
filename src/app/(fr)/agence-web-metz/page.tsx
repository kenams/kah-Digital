import type { Metadata } from "next";
import { LocalSeoPageContent, CITY_PAGES } from "@/components/pages/local-seo-page-content";

export const metadata: Metadata = {
  title: "Création site web Metz — KAH-Digital | Devis personnalisé",
  description: "Studio digital pour Metz et le Grand Est. Sites web, apps et solutions digitales pour PME, indépendants et entreprises transfrontalières. Devis personnalisé sous 24h, adapté au besoin réel.",
  keywords: ["création site web Metz", "agence web Metz", "site internet Metz", "développeur web Grand Est", "agence digitale Metz"],
  openGraph: {
    title: "Création site web Metz — KAH-Digital",
    description: "Studio digital pour PME et entreprises messinnes. Sites multilingues, apps, solutions digitales. Devis personnalisé.",
  },
  alternates: { canonical: "https://kah-digital.ch/agence-web-metz" },
};

export default function AgenceWebMetzPage() {
  return <LocalSeoPageContent data={CITY_PAGES["agence-web-metz"]!} />;
}

