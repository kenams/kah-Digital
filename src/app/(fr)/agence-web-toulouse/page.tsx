import type { Metadata } from "next";
import { LocalSeoPageContent, CITY_PAGES } from "@/components/pages/local-seo-page-content";

export const metadata: Metadata = {
  title: "Cr�ation site web Toulouse � KAH Digital | Devis personnalis�",
  description: "Studio digital pour Toulouse et l'Occitanie. Sites web, apps et solutions IA pour PME, a�ronautique et startups. Devis gratuit sous 24h.",
  keywords: ["cr�ation site web Toulouse", "agence web Toulouse", "site internet Toulouse", "d�veloppeur web Occitanie"],
  openGraph: { title: "Cr�ation site web Toulouse � KAH Digital", description: "Studio digital pour entreprises toulousaines. Sites, apps, IA. Devis personnalis�." },
  alternates: { canonical: "https://kah-digital.ch/agence-web-toulouse" },
};

export default function Page() {
  return <LocalSeoPageContent data={CITY_PAGES["agence-web-toulouse"]!} />;
}

