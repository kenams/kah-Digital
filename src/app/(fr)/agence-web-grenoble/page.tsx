import type { Metadata } from "next";
import { LocalSeoPageContent, CITY_PAGES } from "@/components/pages/local-seo-page-content";

export const metadata: Metadata = {
  title: "Création site web Grenoble — KAH-Digital | Dès € 300",
  description: "Studio digital pour Grenoble et l'Isère. Sites web, apps et solutions digitales pour startups deeptech, PME et indépendants. Devis gratuit sous 24h, dès € 300.",
  keywords: ["création site web Grenoble", "agence web Grenoble", "site internet Grenoble", "développeur web Grenoble", "agence digitale Isère"],
  openGraph: {
    title: "Création site web Grenoble — KAH-Digital",
    description: "Studio digital pour startups et PME grenobloises. Sites, apps, SaaS. Process clair. Dès € 300.",
  },
  alternates: { canonical: "https://kah-digital.ch/agence-web-grenoble" },
};

export default function AgenceWebGrenoblePage() {
  return <LocalSeoPageContent data={CITY_PAGES["agence-web-grenoble"]!} />;
}
