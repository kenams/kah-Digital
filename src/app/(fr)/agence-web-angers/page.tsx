import type { Metadata } from "next";
import { LocalSeoPageContent, CITY_PAGES } from "@/components/pages/local-seo-page-content";

export const metadata: Metadata = {
  title: "Création site web Angers — KAH Digital | Devis personnalisé",
  description: "Studio digital pour Angers et la Maine-et-Loire. Sites web, apps et solutions digitales pour startups, PME et indépendants angevins. Devis personnalisé sous 24h, adapté au besoin réel.",
  keywords: ["création site web Angers", "agence web Angers", "site internet Angers", "développeur web Maine-et-Loire", "agence digitale Angers"],
  openGraph: {
    title: "Création site web Angers — KAH Digital",
    description: "Studio digital pour entreprises angevines. Sites, apps, solutions digitales. Devis personnalisé.",
  },
  alternates: { canonical: "https://KAH Digital.ch/agence-web-angers" },
};

export default function AgenceWebAngersPage() {
  return <LocalSeoPageContent data={CITY_PAGES["agence-web-angers"]!} />;
}

