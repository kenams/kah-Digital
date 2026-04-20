import type { Metadata } from "next";
import { BriefPageContent } from "@/components/pages/brief-page-content";
import { buildNoIndexMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = buildNoIndexMetadata({
  locale: "de",
  path: "/cahier-des-charges",
  title: "Projektbriefing",
  description: "Interaktives Briefing und PDF-Export, um ein digitales Projekt sauber zu strukturieren.",
});

export default function CahierDesChargesPageDe() {
  return <BriefPageContent locale="de" />;
}
