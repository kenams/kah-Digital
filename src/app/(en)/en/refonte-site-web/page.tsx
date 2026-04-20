import type { Metadata } from "next";
import { GlobalAcquisitionPageContent } from "@/components/pages/global-acquisition-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  path: "/refonte-site-web",
  title: "Website redesign | KAH-Digital",
  description:
    "Website redesign for companies that need a cleaner, stronger, more convincing digital base.",
});

export default function RefonteSiteWebPageEn() {
  return <GlobalAcquisitionPageContent locale="en" page="refonte-site-web" />;
}
