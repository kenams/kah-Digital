import type { Metadata } from "next";
import { LocalSeoPageContent, CITY_PAGES } from "@/components/pages/local-seo-page-content";

export const metadata: Metadata = {
  title: "Cr�ation site web B�le � KAH Digital | Devis personnalis�",
  description: "Studio digital trilingue pour B�le. Sites web FR/DE/EN pour pharma, PME transfrontali�res et entreprises culturelles. Devis gratuit sous 24h.",
  keywords: ["cr�ation site web B�le", "agence web Basel", "Webseite erstellen Basel", "studio digital B�le"],
  openGraph: { title: "Cr�ation site web B�le � KAH Digital", description: "Studio digital trilingue pour entreprises b�loises. Pharma, PME. Devis personnalis�." },
  alternates: { canonical: "https://kah-digital.ch/agence-web-basel" },
};

export default function Page() {
  return <LocalSeoPageContent data={CITY_PAGES["agence-web-basel"]!} />;
}

