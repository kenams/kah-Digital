import type { Metadata } from "next";
import { LegalNoticePageContent } from "@/components/pages/legal-notice-page-content";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Rechtliche Angaben zu KAH Digital Studio und zum Herausgeber der Website.",
};

export default function MentionsLegalesPageDe() {
  return <LegalNoticePageContent locale="de" />;
}
