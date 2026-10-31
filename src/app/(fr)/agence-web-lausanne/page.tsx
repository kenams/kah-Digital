import type { Metadata } from "next";
import { LocalSeoPageContent, CITY_PAGES } from "@/components/pages/local-seo-page-content";

export const metadata: Metadata = {
  title: "Agence web Lausanne — KAH Digital Studio | Création site web dès CHF 290",
  description: "Agence web à distance pour Lausanne et le Vaud. Création de sites web, apps et solutions IA pour PME, indépendants et startups vaudoises. Prix fixe CHF 290, livré en 5 jours. Devis gratuit sous 24h.",
  keywords: ["agence web Lausanne", "création site web Lausanne", "site internet Lausanne", "développeur web Lausanne", "agence digitale Lausanne"],
  openGraph: {
    images: [{ url: "/og-kah-studio.png", width: 1200, height: 630 }],
    title: "Agence web Lausanne — KAH Digital Studio",
    description: "Studio digital à distance. Sites web, apps et IA pour PME vaudoises. Prix fixe CHF 290, réponse 24h.",
  },
  alternates: { canonical: "https://kah-digital.ch/agence-web-lausanne" },
};

export default function AgenceWebLausannePage() {
  return <LocalSeoPageContent data={CITY_PAGES["agence-web-lausanne"]!} />;
}
