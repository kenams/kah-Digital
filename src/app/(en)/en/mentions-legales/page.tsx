import type { Metadata } from "next";
import { LegalNoticePageContent } from "@/components/pages/legal-notice-page-content";

export const metadata: Metadata = {
  title: "Legal notice",
  description: "Legal information about KAH-Digital and site publishing details.",
};

export default function MentionsLegalesPageEn() {
  return <LegalNoticePageContent locale="en" />;
}
