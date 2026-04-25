import type { Metadata } from "next";
import { ContactPageContent } from "@/components/pages/contact-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = buildPageMetadata({
  locale: "de",
  path: "/contact",
  title: "Kontakt",
  description: "Beschreibe dein Website-, App-, KI- oder Support-Projekt. Klare Rückmeldung innerhalb von 24 Stunden.",
});

export default function ContactPageDe() {
  return <ContactPageContent locale="de" />;
}
