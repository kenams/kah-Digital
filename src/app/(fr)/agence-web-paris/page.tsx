import type { Metadata } from "next";
import { LocalSeoPageContent, CITY_PAGES } from "@/components/pages/local-seo-page-content";

export const metadata: Metadata = {
  title: "Création site web Paris — KAH-Digital | Dès € 300",
  description: "Studio digital franco-suisse. Création de sites web, apps et solutions IA pour freelances, PME et startups parisiennes. Devis gratuit sous 24h, dès € 300.",
  keywords: ["création site web Paris", "agence web Paris", "site internet Paris", "développeur web Paris freelance"],
  openGraph: {
    title: "Création site web Paris — KAH-Digital",
    description: "Studio digital pour entreprises parisiennes. Sites, apps, IA. Process clair. Dès € 300.",
  },
  alternates: { canonical: "https://kah-digital.ch/agence-web-paris" },
};

export default function AgenceWebParisPage() {
  return <LocalSeoPageContent data={CITY_PAGES["agence-web-paris"]!} />;
}
