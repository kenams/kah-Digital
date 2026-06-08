import type { Metadata } from "next";
import { LocalSeoPageContent, CITY_PAGES } from "@/components/pages/local-seo-page-content";

export const metadata: Metadata = {
  title: "Cr�ation site web Zurich � KAH Digital | Devis personnalis�",
  description: "Studio digital multilingue pour Zurich. Sites web FR/DE/EN, apps et solutions IA pour entreprises, fintech et PME zurichoises. Devis sous 24h.",
  keywords: ["cr�ation site web Zurich", "agence web Zurich", "Webseite erstellen Z�rich", "digital studio Zurich"],
  openGraph: { title: "Cr�ation site web Zurich � KAH Digital", description: "Studio digital multilingue pour entreprises zurichoises. FR/DE/EN. Devis personnalis�." },
  alternates: { canonical: "https://kah-digital.ch/agence-web-zurich" },
};

export default function Page() {
  return <LocalSeoPageContent data={CITY_PAGES["agence-web-zurich"]!} />;
}

