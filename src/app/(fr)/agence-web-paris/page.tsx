import type { Metadata } from "next";
import { LocalSeoPageContent, CITY_PAGES } from "@/components/pages/local-seo-page-content";

export const metadata: Metadata = {
  title: "Cr�ation site web Paris � KAH Digital | Devis personnalis�",
  description: "Studio digital franco-suisse. Cr�ation de sites web, apps et solutions IA pour freelances, PME et startups parisiennes. Devis personnalis� sous 24h, adapt� au besoin r�el.",
  keywords: ["cr�ation site web Paris", "agence web Paris", "site internet Paris", "d�veloppeur web Paris freelance"],
  openGraph: {
    title: "Cr�ation site web Paris � KAH Digital",
    description: "Studio digital pour entreprises parisiennes. Sites, apps, IA. Process clair. Devis personnalis�.",
  },
  alternates: { canonical: "https://kah-digital.ch/agence-web-paris" },
};

export default function AgenceWebParisPage() {
  return <LocalSeoPageContent data={CITY_PAGES["agence-web-paris"]!} />;
}

