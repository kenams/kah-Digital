import { ContactPageContent } from "@/components/pages/contact-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata = buildPageMetadata({
  locale: "de",
  path: "/contact",
  title: "Kontakt — Kostenlose Offerte innerhalb von 24h | KAH Digital Lausanne",
  description: "Kontaktieren Sie KAH Digital für eine kostenlose Offerte. Antwort garantiert innerhalb von 24h für Ihre Website, App oder KI-Automatisierung. Studio in Lausanne, Schweiz.",
  keywords: ["Kontakt KAH Digital", "Webentwicklung Schweiz Kontakt", "digitale Agentur Lausanne"],
});

export default function ContactPageDe() {
  return <ContactPageContent locale="de" />;
}
