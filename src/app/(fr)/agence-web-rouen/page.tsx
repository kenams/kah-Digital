import type { Metadata } from "next";
import { LocalSeoPageContent, CITY_PAGES } from "@/components/pages/local-seo-page-content";

export const metadata: Metadata = {
  title: "Cr�ation site web Rouen � KAH Digital | Devis personnalis�",
  description: "Studio digital pour Rouen et la Normandie. Sites web professionnels pour PME, artisans et commerces normands. Devis personnalis� sous 24h, adapt� au besoin r�el.",
  keywords: ["cr�ation site web Rouen", "agence web Rouen", "site internet Rouen", "d�veloppeur web Rouen", "agence digitale Normandie"],
  openGraph: {
    title: "Cr�ation site web Rouen � KAH Digital",
    description: "Studio digital pour PME et artisans rouennais. Sites, apps, solutions digitales. Process clair. Devis personnalis�.",
  },
  alternates: { canonical: "https://kah-digital.ch/agence-web-rouen" },
};

export default function AgenceWebRouenPage() {
  return <LocalSeoPageContent data={CITY_PAGES["agence-web-rouen"]!} />;
}

