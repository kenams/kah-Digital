import type { Metadata } from "next";
import { LocalSeoPageContent, CITY_PAGES } from "@/components/pages/local-seo-page-content";

export const metadata: Metadata = {
  title: "Création site web Montpellier — KAH Digital | Devis personnalisé",
  description: "Studio digital pour Montpellier. Sites web pour médecins, startups, restaurants et entreprises méditerranéennes. Devis gratuit sous 24h.",
  keywords: ["création site web Montpellier", "agence web Montpellier", "site internet Montpellier", "développeur web Hérault"],
  openGraph: { title: "Création site web Montpellier — KAH Digital", description: "Studio digital pour entreprises montpelliéraines. Sites, apps. Devis personnalisé." },
  alternates: { canonical: "https://KAH Digital.ch/agence-web-montpellier" },
};

export default function Page() {
  return <LocalSeoPageContent data={CITY_PAGES["agence-web-montpellier"]!} />;
}

