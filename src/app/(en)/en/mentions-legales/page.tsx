import type { Metadata } from "next";
import { LegalNoticePageContent } from "@/components/pages/legal-notice-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "en",
  path: "/mentions-legales",
  title: "Legal notice",
  description: "Legal information about KAH Digital Studio and site publishing details.",
});

export default function MentionsLegalesPageEn() {
  return <LegalNoticePageContent locale="en" />;
}
