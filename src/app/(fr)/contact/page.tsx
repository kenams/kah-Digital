import { ContactPageContent } from "@/components/pages/contact-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata = buildPageMetadata({
  locale: "fr",
  path: "/contact",
  title: "Contact",
  description: "Parle-nous de ton besoin digital. Réponse claire sous 24h pour site web, application, IA ou support.",
});

export default function ContactPage() {
  return <ContactPageContent locale="fr" />;
}
