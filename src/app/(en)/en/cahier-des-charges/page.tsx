import type { Metadata } from "next";
import { BriefPageContent } from "@/components/pages/brief-page-content";
import { buildNoIndexMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = buildNoIndexMetadata({
  locale: "en",
  path: "/cahier-des-charges",
  title: "Project brief",
  description: "Interactive brief and PDF export to scope a digital project.",
});

export default function CahierDesChargesPageEn() {
  return <BriefPageContent locale="en" />;
}
