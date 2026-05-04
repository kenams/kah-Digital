import type { Metadata } from "next";
import { LocalSeoPageContent, CITY_PAGES } from "@/components/pages/local-seo-page-content";

export const metadata: Metadata = {
  title: "Création site web Dijon — KAH-Digital | Dès € 300",
  description: "Studio digital pour Dijon et la Bourgogne. Sites web pour vignobles, restaurants gastronomiques, cabinets et PME. Devis gratuit sous 24h, dès € 300.",
  keywords: ["création site web Dijon", "agence web Dijon", "site internet Dijon", "développeur web Bourgogne", "agence digitale Dijon"],
  openGraph: {
    title: "Création site web Dijon — KAH-Digital",
    description: "Studio digital pour vignobles et entreprises dijonnaises. Sites, apps, e-commerce. Dès € 300.",
  },
  alternates: { canonical: "https://kah-digital.ch/agence-web-dijon" },
};

export default function AgenceWebDijonPage() {
  return <LocalSeoPageContent data={CITY_PAGES["agence-web-dijon"]!} />;
}
