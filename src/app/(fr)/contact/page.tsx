import { Metadata } from "next";
import { ContactPageContent } from "@/components/pages/contact-page-content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez KAH-Digital pour vos projets digitaux. Reponse sous 24h.",
};

export default function ContactPage() {
  return <ContactPageContent locale="fr" />;
}
