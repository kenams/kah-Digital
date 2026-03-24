import type { Metadata } from "next";
import { SwissAcquisitionPageContent } from "@/components/pages/swiss-acquisition-page-content";

export const metadata: Metadata = {
  title: "AI automation in Switzerland",
  description:
    "AI automation in Switzerland for lead qualification, support, and operations. Simple, useful, measurable automation connected to real workflows.",
};

export default function AutomatisationIaSuissePageEn() {
  return <SwissAcquisitionPageContent locale="en" page="automatisation-ia-suisse" />;
}
