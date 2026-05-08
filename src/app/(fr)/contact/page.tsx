import { ContactPageContent } from "@/components/pages/contact-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata = buildPageMetadata({
  locale: "fr",
  path: "/contact",
  title: "Contact — Devis gratuit sous 24h | KAH-Digital Lausanne",
  description: "Contactez KAH-Digital pour un devis gratuit. Réponse garantie sous 24h pour votre site web, application ou automatisation IA. Studio digital à Lausanne, disponible en France et Suisse.",
});

export default function ContactPage() {
  return <ContactPageContent locale="fr" />;
}
