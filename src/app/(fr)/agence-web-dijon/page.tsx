import type { Metadata } from "next";
import { LocalSeoPageContent, CITY_PAGES } from "@/components/pages/local-seo-page-content";

export const metadata: Metadata = {
  title: "Cr�ation site web Dijon � KAH Digital | Devis personnalis�",
  description: "Studio digital pour Dijon et la Bourgogne. Sites web pour vignobles, restaurants gastronomiques, cabinets et PME. Devis personnalis� sous 24h, adapt� au besoin r�el.",
  keywords: ["cr�ation site web Dijon", "agence web Dijon", "site internet Dijon", "d�veloppeur web Bourgogne", "agence digitale Dijon"],
  openGraph: {
    title: "Cr�ation site web Dijon � KAH Digital",
    description: "Studio digital pour vignobles et entreprises dijonnaises. Sites, apps, e-commerce. Devis personnalis�.",
  },
  alternates: { canonical: "https://kah-digital.ch/agence-web-dijon" },
};

export default function AgenceWebDijonPage() {
  return <LocalSeoPageContent data={CITY_PAGES["agence-web-dijon"]!} />;
}

