import type { Metadata } from "next";
import { LocalSeoPageContent, CITY_PAGES } from "@/components/pages/local-seo-page-content";

export const metadata: Metadata = {
  title: "Création site web Zurich — KAH Digital Studio | Devis personnalisé",
  description: "Studio digital multilingue pour Zurich. Sites web FR/DE/EN, apps et solutions IA pour entreprises, fintech et PME zurichoises. Devis sous 24h.",
  keywords: ["création site web Zurich", "agence web Zurich", "Webseite erstellen Zürich", "digital studio Zurich"],
  openGraph: { images: [{ url: "/og-kah-studio.png", width: 1200, height: 630 }],  title: "Création site web Zurich — KAH Digital Studio", description: "Studio digital multilingue pour entreprises zurichoises. FR/DE/EN. Devis personnalisé." },
  alternates: { canonical: "https://kah-digital.ch/agence-web-zurich" },
};

export default function Page() {
  return <LocalSeoPageContent data={CITY_PAGES["agence-web-zurich"]!} />;
}

