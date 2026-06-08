import type { Metadata } from "next";
import { LocalSeoPageContent, CITY_PAGES } from "@/components/pages/local-seo-page-content";

export const metadata: Metadata = {
  title: "Cr�ation site web Angers � KAH Digital | Devis personnalis�",
  description: "Studio digital pour Angers et la Maine-et-Loire. Sites web, apps et solutions digitales pour startups, PME et ind�pendants angevins. Devis personnalis� sous 24h, adapt� au besoin r�el.",
  keywords: ["cr�ation site web Angers", "agence web Angers", "site internet Angers", "d�veloppeur web Maine-et-Loire", "agence digitale Angers"],
  openGraph: {
    title: "Cr�ation site web Angers � KAH Digital",
    description: "Studio digital pour entreprises angevines. Sites, apps, solutions digitales. Devis personnalis�.",
  },
  alternates: { canonical: "https://kah-digital.ch/agence-web-angers" },
};

export default function AgenceWebAngersPage() {
  return <LocalSeoPageContent data={CITY_PAGES["agence-web-angers"]!} />;
}

