import type { Metadata } from "next";
import { LocalSeoPageContent, CITY_PAGES } from "@/components/pages/local-seo-page-content";

export const metadata: Metadata = {
  title: "Cr�ation site web Caen � KAH Digital | Devis personnalis�",
  description: "Studio digital pour Caen et le Calvados. Sites web professionnels pour PME, artisans et ind�pendants normands. Devis personnalis� sous 24h, adapt� au besoin r�el.",
  keywords: ["cr�ation site web Caen", "agence web Caen", "site internet Caen", "d�veloppeur web Calvados", "agence digitale Normandie Caen"],
  openGraph: {
    title: "Cr�ation site web Caen � KAH Digital",
    description: "Studio digital pour PME et artisans caennais. Sites, apps, solutions digitales. Devis personnalis�.",
  },
  alternates: { canonical: "https://kah-digital.ch/agence-web-caen" },
};

export default function AgenceWebCaenPage() {
  return <LocalSeoPageContent data={CITY_PAGES["agence-web-caen"]!} />;
}

