import type { Metadata } from "next";
import { LocalSeoPageContent, CITY_PAGES } from "@/components/pages/local-seo-page-content";

export const metadata: Metadata = {
  title: "Création site web Marseille — KAH Digital | Devis personnalisé",
  description: "Studio digital pour Marseille et la région PACA. Sites web, apps et solutions IA pour PME, restaurateurs et artisans. Devis gratuit sous 24h.",
  keywords: ["création site web Marseille", "agence web Marseille", "site internet Marseille", "développeur web Marseille"],
  openGraph: {
    title: "Création site web Marseille — KAH Digital",
    description: "Studio digital pour entreprises marseillaises. Sites, apps, IA. Devis personnalisé.",
  },
  alternates: { canonical: "https://KAH Digital.ch/agence-web-marseille" },
};

export default function AgenceWebMarseillePage() {
  return <LocalSeoPageContent data={CITY_PAGES["agence-web-marseille"]!} />;
}

