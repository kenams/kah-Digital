import type { Metadata } from "next";
import { GlobalAcquisitionPageContent } from "@/components/pages/global-acquisition-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  path: "/refonte-site-web",
  title: "Website redesign · +40% conversions guaranteed | KAH Digital",
  description:
    "Website redesign on Next.js 15: premium UX, sub-2s load time, conversion-optimised. Your old site is losing you clients — we turn it into a lead machine. Free audit.",
});

export default function RefonteSiteWebPageEn() {
  return <GlobalAcquisitionPageContent locale="en" page="refonte-site-web" />;
}
