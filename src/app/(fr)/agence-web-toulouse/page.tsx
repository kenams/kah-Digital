import type { Metadata } from "next";
import { LocalSeoPageContent, CITY_PAGES } from "@/components/pages/local-seo-page-content";

export const metadata: Metadata = {
  title: "Création site web Toulouse — KAH-Digital | Devis personnalisé",
  description: "Studio digital pour Toulouse et l'Occitanie. Sites web, apps et solutions IA pour PME, aéronautique et startups. Devis gratuit sous 24h.",
  keywords: ["création site web Toulouse", "agence web Toulouse", "site internet Toulouse", "développeur web Occitanie"],
  openGraph: { title: "Création site web Toulouse — KAH-Digital", description: "Studio digital pour entreprises toulousaines. Sites, apps, IA. Devis personnalisé." },
  alternates: { canonical: "https://kah-digital.ch/agence-web-toulouse" },
};

export default function Page() {
  return <LocalSeoPageContent data={CITY_PAGES["agence-web-toulouse"]!} />;
}

