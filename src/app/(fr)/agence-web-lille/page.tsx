import type { Metadata } from "next";
import { LocalSeoPageContent, CITY_PAGES } from "@/components/pages/local-seo-page-content";

export const metadata: Metadata = {
  title: "Création site web Lille — KAH Digital Studio | Devis personnalisé",
  description: "Studio digital pour Lille et les Hauts-de-France. Sites web, apps et solutions IA pour PME, commerces et startups. Devis gratuit sous 24h.",
  keywords: ["création site web Lille", "agence web Lille", "site internet Nord", "développeur web Lille"],
  openGraph: { images: [{ url: "/og-kah-digital.png", width: 1200, height: 630 }],  title: "Création site web Lille — KAH Digital Studio", description: "Studio digital pour entreprises lilloises. Sites, apps, IA. Devis personnalisé." },
  alternates: { canonical: "https://kah-digital.ch/agence-web-lille" },
};

export default function Page() {
  return <LocalSeoPageContent data={CITY_PAGES["agence-web-lille"]!} />;
}

