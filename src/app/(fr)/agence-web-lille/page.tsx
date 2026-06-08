import type { Metadata } from "next";
import { LocalSeoPageContent, CITY_PAGES } from "@/components/pages/local-seo-page-content";

export const metadata: Metadata = {
  title: "Cr�ation site web Lille � KAH Digital | Devis personnalis�",
  description: "Studio digital pour Lille et les Hauts-de-France. Sites web, apps et solutions IA pour PME, commerces et startups. Devis gratuit sous 24h.",
  keywords: ["cr�ation site web Lille", "agence web Lille", "site internet Nord", "d�veloppeur web Lille"],
  openGraph: { title: "Cr�ation site web Lille � KAH Digital", description: "Studio digital pour entreprises lilloises. Sites, apps, IA. Devis personnalis�." },
  alternates: { canonical: "https://kah-digital.ch/agence-web-lille" },
};

export default function Page() {
  return <LocalSeoPageContent data={CITY_PAGES["agence-web-lille"]!} />;
}

