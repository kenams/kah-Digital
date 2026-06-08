import type { Metadata } from "next";
import { LocalSeoPageContent, CITY_PAGES } from "@/components/pages/local-seo-page-content";

export const metadata: Metadata = {
  title: "Cr�ation site web Clermont-Ferrand � KAH Digital | Devis personnalis�",
  description: "Studio digital pour Clermont-Ferrand et l'Auvergne. Sites web, apps et solutions digitales pour PME, startups et ind�pendants. Devis personnalis� sous 24h, adapt� au besoin r�el.",
  keywords: ["cr�ation site web Clermont-Ferrand", "agence web Clermont", "site internet Clermont-Ferrand", "d�veloppeur web Auvergne", "agence digitale Clermont"],
  openGraph: {
    title: "Cr�ation site web Clermont-Ferrand � KAH Digital",
    description: "Studio digital pour PME et startups de Clermont-Ferrand. Sites, apps, solutions digitales. Devis personnalis�.",
  },
  alternates: { canonical: "https://kah-digital.ch/agence-web-clermont-ferrand" },
};

export default function AgenceWebClermontFerrandPage() {
  return <LocalSeoPageContent data={CITY_PAGES["agence-web-clermont-ferrand"]!} />;
}

