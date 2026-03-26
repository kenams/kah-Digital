import type { Metadata } from "next";
import { GlobalAcquisitionPageContent } from "@/components/pages/global-acquisition-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  path: "/refonte-site-web",
  title: "Website redesign",
  description:
    "Website redesign for companies that need a cleaner, stronger, more convincing digital base.",
  keywords: ["website redesign", "company website redesign", "website relaunch"],
});

export default function RefonteSiteWebPageEn() {
  return <GlobalAcquisitionPageContent locale="en" page="refonte-site-web" />;
}
