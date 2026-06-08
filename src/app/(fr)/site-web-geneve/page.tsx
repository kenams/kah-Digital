import type { Metadata } from "next";
import { LocalSeoPageContent, CITY_PAGES } from "@/components/pages/local-seo-page-content";

export const metadata: Metadata = {
  title: "Cr�ation site web Gen�ve � KAH Digital | Devis personnalis�",
  description: "Studio digital proche de Gen�ve. Sites web professionnels, apps et solutions IA pour entreprises et ind�pendants genevois. Devis personnalis� sous 24h, adapt� au besoin r�el.",
  keywords: ["cr�ation site web Gen�ve", "agence web Gen�ve", "site internet Gen�ve", "d�veloppeur web Gen�ve"],
  openGraph: {
    title: "Cr�ation site web Gen�ve � KAH Digital",
    description: "Studio digital romand pour entreprises genevoise. Sites, apps, IA. Devis personnalis�.",
  },
  alternates: { canonical: "https://kah-digital.ch/site-web-geneve" },
};

export default function SiteWebGenevePage() {
  return <LocalSeoPageContent data={CITY_PAGES["site-web-geneve"]!} />;
}

