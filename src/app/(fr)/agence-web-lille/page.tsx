import type { Metadata } from "next";
import { LocalSeoPageContent, CITY_PAGES } from "@/components/pages/local-seo-page-content";

export const metadata: Metadata = {
  title: "Création site web Lille — KAH Digital | Devis personnalisé",
  description: "Studio digital pour Lille et les Hauts-de-France. Sites web, apps et solutions IA pour PME, commerces et startups. Devis gratuit sous 24h.",
  keywords: ["création site web Lille", "agence web Lille", "site internet Nord", "développeur web Lille"],
  openGraph: { title: "Création site web Lille — KAH Digital", description: "Studio digital pour entreprises lilloises. Sites, apps, IA. Devis personnalisé." },
  alternates: { canonical: "https://KAH Digital.ch/agence-web-lille" },
};

export default function Page() {
  return <LocalSeoPageContent data={CITY_PAGES["agence-web-lille"]!} />;
}

