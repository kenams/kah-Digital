import type { Metadata } from "next";
import { GlobalAcquisitionPageContent } from "@/components/pages/global-acquisition-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  path: "/automatisation-ia-entreprise",
  title: "AI automation for business",
  description:
    "AI automation for businesses: lead qualification, intelligent support, request routing, and reduced repetitive work.",
  keywords: ["AI automation for business", "AI assistant for website", "lead qualification automation"],
});

export default function AutomatisationIaEntreprisePageEn() {
  return <GlobalAcquisitionPageContent locale="en" page="automatisation-ia-entreprise" />;
}
