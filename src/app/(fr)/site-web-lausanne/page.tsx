import type { Metadata } from "next";
import { LocalSeoPageContent, CITY_PAGES } from "@/components/pages/local-seo-page-content";

export const metadata: Metadata = {
  title: "Cr�ation site web Lausanne � KAH Digital | Devis personnalis�",
  description: "Studio digital � Lausanne. Cr�ation de sites web, apps et solutions IA pour ind�pendants, PME et startups vaudoises. Devis personnalis� sous 24h, adapt� au besoin r�el.",
  keywords: ["cr�ation site web Lausanne", "agence web Lausanne", "site internet Lausanne", "d�veloppeur web Lausanne"],
  openGraph: {
    title: "Cr�ation site web Lausanne � KAH Digital",
    description: "Studio digital bas� � Lausanne. Sites, apps et IA pour PME et ind�pendants vaudois. Devis personnalis�.",
  },
  alternates: { canonical: "https://kah-digital.ch/site-web-lausanne" },
};

export default function SiteWebLausannePage() {
  return <LocalSeoPageContent data={CITY_PAGES["site-web-lausanne"]!} />;
}

