import type { Metadata } from "next";
import { LocalSeoPageContent, CITY_PAGES } from "@/components/pages/local-seo-page-content";

export const metadata: Metadata = {
  title: "Création site web Zurich — KAH-Digital | Dès CHF 300",
  description: "Studio digital multilingue pour Zurich. Sites web FR/DE/EN, apps et solutions IA pour entreprises, fintech et PME zurichoises. Devis sous 24h.",
  keywords: ["création site web Zurich", "agence web Zurich", "Webseite erstellen Zürich", "digital studio Zurich"],
  openGraph: { title: "Création site web Zurich — KAH-Digital", description: "Studio digital multilingue pour entreprises zurichoises. FR/DE/EN. Dès CHF 300." },
  alternates: { canonical: "https://kah-digital.ch/agence-web-zurich" },
};

export default function Page() {
  return <LocalSeoPageContent data={CITY_PAGES["agence-web-zurich"]!} />;
}
