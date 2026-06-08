import type { Metadata } from "next";
import { LocalSeoPageContent, CITY_PAGES } from "@/components/pages/local-seo-page-content";

export const metadata: Metadata = {
  title: "Création site web Bâle — KAH Digital | Devis personnalisé",
  description: "Studio digital trilingue pour Bâle. Sites web FR/DE/EN pour pharma, PME transfrontalières et entreprises culturelles. Devis gratuit sous 24h.",
  keywords: ["création site web Bâle", "agence web Basel", "Webseite erstellen Basel", "studio digital Bâle"],
  openGraph: { title: "Création site web Bâle — KAH Digital", description: "Studio digital trilingue pour entreprises bâloises. Pharma, PME. Devis personnalisé." },
  alternates: { canonical: "https://KAH Digital.ch/agence-web-basel" },
};

export default function Page() {
  return <LocalSeoPageContent data={CITY_PAGES["agence-web-basel"]!} />;
}

