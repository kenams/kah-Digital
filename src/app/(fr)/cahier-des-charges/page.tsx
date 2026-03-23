import type { Metadata } from "next";
import { BriefPageContent } from "@/components/pages/brief-page-content";

export const metadata: Metadata = {
  title: "Cahier des charges",
  description: "Brief interactif et export PDF pour cadrer un projet digital.",
  alternates: {
    canonical: "/cahier-des-charges",
    languages: {
      en: "/en/cahier-des-charges",
      de: "/de/cahier-des-charges",
    },
  },
};

export default function CahierDesChargesPage() {
  return <BriefPageContent locale="fr" />;
}
