import type { Metadata } from "next";
import { LocalSeoPageContent, CITY_PAGES } from "@/components/pages/local-seo-page-content";

export const metadata: Metadata = {
  title: "Cr�ation site web Lyon � KAH Digital | Devis personnalis�",
  description: "Studio digital pour Lyon et la r�gion Auvergne-Rh�ne-Alpes. Sites web, apps et solutions IA pour PME et ind�pendants. Devis gratuit sous 24h.",
  keywords: ["cr�ation site web Lyon", "agence web Lyon", "site internet Lyon", "d�veloppeur web Lyon"],
  openGraph: {
    title: "Cr�ation site web Lyon � KAH Digital",
    description: "Studio digital pour entreprises lyonnaises. Sites, apps, IA. Devis personnalis�.",
  },
  alternates: { canonical: "https://kah-digital.ch/agence-web-lyon" },
};

export default function AgenceWebLyonPage() {
  return <LocalSeoPageContent data={CITY_PAGES["agence-web-lyon"]!} />;
}

