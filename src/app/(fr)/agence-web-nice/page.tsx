import type { Metadata } from "next";
import { LocalSeoPageContent, CITY_PAGES } from "@/components/pages/local-seo-page-content";

export const metadata: Metadata = {
  title: "Création site web Nice — KAH-Digital | Dès € 300",
  description: "Studio digital pour Nice et la Côte d'Azur. Sites web multilingues pour hôtels, restaurants gastronomiques et professions libérales. Devis sous 24h.",
  keywords: ["création site web Nice", "agence web Nice", "site internet Côte d'Azur", "développeur web Nice"],
  openGraph: { title: "Création site web Nice — KAH-Digital", description: "Studio digital pour entreprises niçoises. Sites multilingues, apps. Dès € 300." },
  alternates: { canonical: "https://kah-digital.ch/agence-web-nice" },
};

export default function Page() {
  return <LocalSeoPageContent data={CITY_PAGES["agence-web-nice"]!} />;
}
