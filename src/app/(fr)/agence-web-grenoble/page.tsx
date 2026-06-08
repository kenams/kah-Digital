import type { Metadata } from "next";
import { LocalSeoPageContent, CITY_PAGES } from "@/components/pages/local-seo-page-content";

export const metadata: Metadata = {
  title: "Cr�ation site web Grenoble � KAH Digital | Devis personnalis�",
  description: "Studio digital pour Grenoble et l'Is�re. Sites web, apps et solutions digitales pour startups deeptech, PME et ind�pendants. Devis personnalis� sous 24h, adapt� au besoin r�el.",
  keywords: ["cr�ation site web Grenoble", "agence web Grenoble", "site internet Grenoble", "d�veloppeur web Grenoble", "agence digitale Is�re"],
  openGraph: {
    title: "Cr�ation site web Grenoble � KAH Digital",
    description: "Studio digital pour startups et PME grenobloises. Sites, apps, SaaS. Process clair. Devis personnalis�.",
  },
  alternates: { canonical: "https://kah-digital.ch/agence-web-grenoble" },
};

export default function AgenceWebGrenoblePage() {
  return <LocalSeoPageContent data={CITY_PAGES["agence-web-grenoble"]!} />;
}

