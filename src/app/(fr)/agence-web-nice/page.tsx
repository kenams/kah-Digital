import type { Metadata } from "next";
import { LocalSeoPageContent, CITY_PAGES } from "@/components/pages/local-seo-page-content";

export const metadata: Metadata = {
  title: "Cr�ation site web Nice � KAH Digital | Devis personnalis�",
  description: "Studio digital pour Nice et la C�te d'Azur. Sites web multilingues pour h�tels, restaurants gastronomiques et professions lib�rales. Devis sous 24h.",
  keywords: ["cr�ation site web Nice", "agence web Nice", "site internet C�te d'Azur", "d�veloppeur web Nice"],
  openGraph: { title: "Cr�ation site web Nice � KAH Digital", description: "Studio digital pour entreprises ni�oises. Sites multilingues, apps. Devis personnalis�." },
  alternates: { canonical: "https://kah-digital.ch/agence-web-nice" },
};

export default function Page() {
  return <LocalSeoPageContent data={CITY_PAGES["agence-web-nice"]!} />;
}

