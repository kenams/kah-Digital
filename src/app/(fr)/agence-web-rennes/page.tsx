import type { Metadata } from "next";
import { LocalSeoPageContent, CITY_PAGES } from "@/components/pages/local-seo-page-content";

export const metadata: Metadata = {
  title: "Création site web Rennes — KAH Digital | Devis personnalisé",
  description: "Studio digital pour Rennes et la Bretagne. Sites web, apps et solutions IA pour startups, PME et artisans. Devis gratuit sous 24h.",
  keywords: ["création site web Rennes", "agence web Rennes", "site internet Bretagne", "développeur web Rennes"],
  openGraph: { title: "Création site web Rennes — KAH Digital", description: "Studio digital pour entreprises rennaises. Sites, apps, IA. Devis personnalisé." },
  alternates: { canonical: "https://KAH Digital.ch/agence-web-rennes" },
};

export default function Page() {
  return <LocalSeoPageContent data={CITY_PAGES["agence-web-rennes"]!} />;
}

