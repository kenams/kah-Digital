import { ContactPageContent } from "@/components/pages/contact-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata = buildPageMetadata({
  locale: "de",
  path: "/contact",
  title: "Kontakt — Kostenlose Offerte innerhalb von 24h | KAH Digital",
  description: "Kontaktieren Sie KAH Digital für eine kostenlose Offerte. Antwort garantiert innerhalb von 24h für Ihre Website, App oder KI-Automatisierung. Studio in Toulouse, remote für Frankreich und die Schweiz.",
  keywords: ["Kontakt KAH Digital", "Webentwicklung Schweiz Kontakt", "digitale Agentur Schweiz"],
});

export default function ContactPageDe() {
  return <ContactPageContent locale="de" />;
}
