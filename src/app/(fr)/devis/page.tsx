import { QuotePageContent } from "@/components/pages/quote-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata = buildPageMetadata({
  locale: "fr",
  path: "/devis",
  title: "Devis personnalisé — Site web, application ou IA | KAH-Digital",
  description: "Décrivez votre besoin même sans cahier des charges complet. KAH-Digital prépare une proposition claire, ajustable et sans engagement sous 24h.",
  keywords: ["devis personnalisé site web", "devis agence web Lausanne", "demande devis application", "solution digitale sur mesure"],
});

export default function DevisPage() {
  return <QuotePageContent locale="fr" />;
}
