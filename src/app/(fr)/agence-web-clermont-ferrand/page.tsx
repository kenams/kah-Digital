import type { Metadata } from "next";
import { LocalSeoPageContent, CITY_PAGES } from "@/components/pages/local-seo-page-content";

export const metadata: Metadata = {
  title: "Création site web Clermont-Ferrand — KAH-Digital | Dès € 300",
  description: "Studio digital pour Clermont-Ferrand et l'Auvergne. Sites web, apps et solutions digitales pour PME, startups et indépendants. Devis gratuit sous 24h, dès € 300.",
  keywords: ["création site web Clermont-Ferrand", "agence web Clermont", "site internet Clermont-Ferrand", "développeur web Auvergne", "agence digitale Clermont"],
  openGraph: {
    title: "Création site web Clermont-Ferrand — KAH-Digital",
    description: "Studio digital pour PME et startups de Clermont-Ferrand. Sites, apps, solutions digitales. Dès € 300.",
  },
  alternates: { canonical: "https://kah-digital.ch/agence-web-clermont-ferrand" },
};

export default function AgenceWebClermontFerrandPage() {
  return <LocalSeoPageContent data={CITY_PAGES["agence-web-clermont-ferrand"]!} />;
}
