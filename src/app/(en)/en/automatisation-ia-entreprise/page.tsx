import type { Metadata } from "next";
import { GlobalAcquisitionPageContent } from "@/components/pages/global-acquisition-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  path: "/automatisation-ia-entreprise",
  title: "AI automation for business · Custom agents & workflows | KAH Digital",
  description:
    "AI automation: lead qualification, customer support, smart routing, custom GPT-4 agents. Cut operational costs by 40–70%. Free audit within 24h. No lock-in.",
});

export default function AutomatisationIaEntreprisePageEn() {
  return <GlobalAcquisitionPageContent locale="en" page="automatisation-ia-entreprise" />;
}
