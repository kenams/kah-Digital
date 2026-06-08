import type { Metadata } from "next";
import { LegalNoticePageContent } from "@/components/pages/legal-notice-page-content";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales de KAH Digital. Informations juridiques et administratives.",
};

export default function MentionsLegalesPage() {
  return <LegalNoticePageContent locale="fr" />;
}
