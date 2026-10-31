import { ContactPageContent } from "@/components/pages/contact-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata = buildPageMetadata({
  locale: "fr",
  path: "/contact",
  title: "Contact — Devis gratuit sous 24h | KAH Digital Studio",
  description: "Contactez KAH Digital Studio pour un devis gratuit. Réponse garantie sous 24h pour votre site web, application ou automatisation IA. Studio digital 100 % à distance, pour la France et la Suisse.",
});

export default function ContactPage() {
  return <ContactPageContent locale="fr" />;
}
