import type { Metadata } from "next";
import { GlobalAcquisitionPageContent } from "@/components/pages/global-acquisition-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  path: "/site-web-entreprise",
  title: "Business website development | KAH-Digital",
  description:
    "Business website development for SMBs, consultancies, agencies, and service firms that need clearer positioning and cleaner conversion.",
});

export default function SiteWebEntreprisePageEn() {
  return <GlobalAcquisitionPageContent locale="en" page="site-web-entreprise" />;
}
