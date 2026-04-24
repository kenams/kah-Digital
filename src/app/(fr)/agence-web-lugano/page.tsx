import type { Metadata } from "next";
import { LocalSeoPageContent, CITY_PAGES } from "@/components/pages/local-seo-page-content";

export const metadata: Metadata = {
  title: "Creazione sito web Lugano — KAH-Digital | Da CHF 300",
  description: "Studio digitale per Lugano e il Ticino. Siti web IT/FR/DE/EN, app e soluzioni IA per aziende, finance e turismo. Preventivo gratuito in 24h.",
  keywords: ["creazione sito web Lugano", "agenzia web Lugano", "sito internet Ticino", "studio digitale Lugano"],
  openGraph: { title: "Creazione sito web Lugano — KAH-Digital", description: "Studio digitale multilingue per aziende di Lugano. IT/FR/DE/EN. Da CHF 300." },
  alternates: { canonical: "https://kah-digital.ch/agence-web-lugano" },
};

export default function Page() {
  return <LocalSeoPageContent data={CITY_PAGES["agence-web-lugano"]!} />;
}
