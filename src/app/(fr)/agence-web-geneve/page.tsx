import type { Metadata } from "next";
import { LocalSeoPageContent, CITY_PAGES } from "@/components/pages/local-seo-page-content";

export const metadata: Metadata = {
  title: "Agence web Genève — KAH Digital | Création site web dès CHF 149",
  description: "Agence web pour entreprises genevoises. Sites web multilingues FR/EN/DE, apps et solutions IA. Cabinets d'avocats, ONG, fiduciaires, hôtels. Prix fixe CHF 149, devis sous 24h.",
  keywords: ["agence web Genève", "création site web Genève", "site internet Genève", "développeur web Genève", "agence digitale Genève"],
  openGraph: {
    title: "Agence web Genève — KAH Digital",
    description: "Studio digital romand pour entreprises genevoises. Sites web multilingues, apps et IA. Prix fixe CHF 149.",
  },
  alternates: { canonical: "https://kah-digital.ch/agence-web-geneve" },
};

export default function AgenceWebGenevePage() {
  return <LocalSeoPageContent data={CITY_PAGES["agence-web-geneve"]!} />;
}
