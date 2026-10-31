import type { Metadata } from "next";
import { LegalNoticePageContent } from "@/components/pages/legal-notice-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "de",
  path: "/mentions-legales",
  title: "Impressum",
  description: "Rechtliche Angaben zu KAH Digital Studio und zum Herausgeber der Website.",
});

export default function MentionsLegalesPageDe() {
  return <LegalNoticePageContent locale="de" />;
}
