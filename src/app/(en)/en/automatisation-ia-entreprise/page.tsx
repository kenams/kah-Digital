import type { Metadata } from "next";
import { GlobalAcquisitionPageContent } from "@/components/pages/global-acquisition-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  path: "/automatisation-ia-entreprise",
  title: "AI automation for business | KAH-Digital",
  description:
    "AI automation for lead qualification, support, routing, summaries, and operational time savings.",
});

export default function AutomatisationIaEntreprisePageEn() {
  return <GlobalAcquisitionPageContent locale="en" page="automatisation-ia-entreprise" />;
}
