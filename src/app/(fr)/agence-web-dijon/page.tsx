import type { Metadata } from "next";
import { LocalSeoPageContent, CITY_PAGES } from "@/components/pages/local-seo-page-content";

export const metadata: Metadata = {
  title: "Création site web Dijon — KAH Digital Studio | Devis personnalisé",
  description: "Studio digital pour Dijon et la Bourgogne. Sites web pour vignobles, restaurants gastronomiques, cabinets et PME. Devis personnalisé sous 24h, adapté au besoin réel.",
  keywords: ["création site web Dijon", "agence web Dijon", "site internet Dijon", "développeur web Bourgogne", "agence digitale Dijon"],
  openGraph: {
    images: [{ url: "/og-kah-studio.png", width: 1200, height: 630 }],
    title: "Création site web Dijon — KAH Digital Studio",
    description: "Studio digital pour vignobles et entreprises dijonnaises. Sites, apps, e-commerce. Devis personnalisé.",
  },
  alternates: { canonical: "https://kah-digital.ch/agence-web-dijon" },
};

export default function AgenceWebDijonPage() {
  return <LocalSeoPageContent data={CITY_PAGES["agence-web-dijon"]!} />;
}

