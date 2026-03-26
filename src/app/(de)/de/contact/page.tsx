import type { Metadata } from "next";
import { ContactPageContent } from "@/components/pages/contact-page-content";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Beschreibe dein Website-, App-, KI- oder Support-Projekt. Klare Rueckmeldung innerhalb von 24 Stunden.",
};

export default function ContactPageDe() {
  return <ContactPageContent locale="de" />;
}
