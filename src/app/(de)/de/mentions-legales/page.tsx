import type { Metadata } from "next";
import { LegalNoticePageContent } from "@/components/pages/legal-notice-page-content";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Rechtliche Informationen zu KAH-Digital und zur Herausgabe der Website.",
};

export default function MentionsLegalesPageDe() {
  return <LegalNoticePageContent locale="de" />;
}
