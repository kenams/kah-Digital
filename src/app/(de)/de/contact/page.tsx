import type { Metadata } from "next";
import { ContactPageContent } from "@/components/pages/contact-page-content";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Kontaktieren Sie KAH-Digital fuer Websites, Anwendungen und digitale Projekte.",
};

export default function ContactPageDe() {
  return <ContactPageContent locale="de" />;
}
