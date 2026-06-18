import type { Metadata } from "next";
import { LocalSeoPageContent, CITY_PAGES } from "@/components/pages/local-seo-page-content";

export const metadata: Metadata = {
  title: "Agence web Lausanne — KAH Digital | Création site web dès CHF 149",
  description: "Agence web basée à Lausanne. Création de sites web, apps et solutions IA pour PME, indépendants et startups vaudoises. Prix fixe CHF 149, livré en 5 jours. Devis gratuit sous 24h.",
  keywords: ["agence web Lausanne", "création site web Lausanne", "site internet Lausanne", "développeur web Lausanne", "agence digitale Lausanne"],
  openGraph: {
    title: "Agence web Lausanne — KAH Digital",
    description: "Studio digital basé à Lausanne. Sites web, apps et IA pour PME vaudoises. Prix fixe CHF 149, réponse 24h.",
  },
  alternates: { canonical: "https://kah-digital.ch/agence-web-lausanne" },
};

export default function AgenceWebLausannePage() {
  return <LocalSeoPageContent data={CITY_PAGES["agence-web-lausanne"]!} />;
}
