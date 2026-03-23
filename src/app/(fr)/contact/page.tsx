import { Metadata } from "next";
import { ContactPageContent } from "@/components/pages/contact-page-content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Parle-nous de ton besoin digital. Réponse claire sous 24h pour site web, application, IA ou support.",
};

export default function ContactPage() {
  return <ContactPageContent locale="fr" />;
}
