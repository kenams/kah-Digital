import type { Metadata } from "next";
import { LocalSeoPageContent, CITY_PAGES } from "@/components/pages/local-seo-page-content";

export const metadata: Metadata = {
  title: "Cr�ation site web Montpellier � KAH Digital | Devis personnalis�",
  description: "Studio digital pour Montpellier. Sites web pour m�decins, startups, restaurants et entreprises m�diterran�ennes. Devis gratuit sous 24h.",
  keywords: ["cr�ation site web Montpellier", "agence web Montpellier", "site internet Montpellier", "d�veloppeur web H�rault"],
  openGraph: { title: "Cr�ation site web Montpellier � KAH Digital", description: "Studio digital pour entreprises montpelli�raines. Sites, apps. Devis personnalis�." },
  alternates: { canonical: "https://kah-digital.ch/agence-web-montpellier" },
};

export default function Page() {
  return <LocalSeoPageContent data={CITY_PAGES["agence-web-montpellier"]!} />;
}

