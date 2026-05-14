import type { Metadata } from "next";
import { LocalSeoPageContent, CITY_PAGES } from "@/components/pages/local-seo-page-content";

export const metadata: Metadata = {
  title: "Création site web Lyon — KAH-Digital | Devis personnalisé",
  description: "Studio digital pour Lyon et la région Auvergne-Rhône-Alpes. Sites web, apps et solutions IA pour PME et indépendants. Devis gratuit sous 24h.",
  keywords: ["création site web Lyon", "agence web Lyon", "site internet Lyon", "développeur web Lyon"],
  openGraph: {
    title: "Création site web Lyon — KAH-Digital",
    description: "Studio digital pour entreprises lyonnaises. Sites, apps, IA. Devis personnalisé.",
  },
  alternates: { canonical: "https://kah-digital.ch/agence-web-lyon" },
};

export default function AgenceWebLyonPage() {
  return <LocalSeoPageContent data={CITY_PAGES["agence-web-lyon"]!} />;
}

