import type { Metadata } from "next";
import { BriefPageContent } from "@/components/pages/brief-page-content";

export const metadata: Metadata = {
  title: "Projektbriefing",
  description: "Interaktives Briefing und PDF-Export, um ein digitales Projekt sauber zu strukturieren.",
  alternates: {
    canonical: "/de/cahier-des-charges",
    languages: {
      fr: "/cahier-des-charges",
      en: "/en/cahier-des-charges",
    },
  },
};

export default function CahierDesChargesPageDe() {
  return <BriefPageContent locale="de" />;
}
