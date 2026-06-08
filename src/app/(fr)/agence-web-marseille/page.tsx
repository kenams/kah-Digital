import type { Metadata } from "next";
import { LocalSeoPageContent, CITY_PAGES } from "@/components/pages/local-seo-page-content";

export const metadata: Metadata = {
  title: "Cr�ation site web Marseille � KAH Digital | Devis personnalis�",
  description: "Studio digital pour Marseille et la r�gion PACA. Sites web, apps et solutions IA pour PME, restaurateurs et artisans. Devis gratuit sous 24h.",
  keywords: ["cr�ation site web Marseille", "agence web Marseille", "site internet Marseille", "d�veloppeur web Marseille"],
  openGraph: {
    title: "Cr�ation site web Marseille � KAH Digital",
    description: "Studio digital pour entreprises marseillaises. Sites, apps, IA. Devis personnalis�.",
  },
  alternates: { canonical: "https://kah-digital.ch/agence-web-marseille" },
};

export default function AgenceWebMarseillePage() {
  return <LocalSeoPageContent data={CITY_PAGES["agence-web-marseille"]!} />;
}

