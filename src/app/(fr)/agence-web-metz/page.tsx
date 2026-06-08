import type { Metadata } from "next";
import { LocalSeoPageContent, CITY_PAGES } from "@/components/pages/local-seo-page-content";

export const metadata: Metadata = {
  title: "Cr�ation site web Metz � KAH Digital | Devis personnalis�",
  description: "Studio digital pour Metz et le Grand Est. Sites web, apps et solutions digitales pour PME, ind�pendants et entreprises transfrontali�res. Devis personnalis� sous 24h, adapt� au besoin r�el.",
  keywords: ["cr�ation site web Metz", "agence web Metz", "site internet Metz", "d�veloppeur web Grand Est", "agence digitale Metz"],
  openGraph: {
    title: "Cr�ation site web Metz � KAH Digital",
    description: "Studio digital pour PME et entreprises messinnes. Sites multilingues, apps, solutions digitales. Devis personnalis�.",
  },
  alternates: { canonical: "https://kah-digital.ch/agence-web-metz" },
};

export default function AgenceWebMetzPage() {
  return <LocalSeoPageContent data={CITY_PAGES["agence-web-metz"]!} />;
}

