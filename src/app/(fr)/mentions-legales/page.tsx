import type { Metadata } from "next";
import { LegalNoticePageContent } from "@/components/pages/legal-notice-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "fr",
  path: "/mentions-legales",
  title: "Mentions légales",
  description: "Mentions légales de KAH Digital Studio. Informations juridiques et administratives.",
});

export default function MentionsLegalesPage() {
  return <LegalNoticePageContent locale="fr" />;
}
