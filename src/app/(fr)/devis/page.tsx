import { QuotePageContent } from "@/components/pages/quote-page-content";
import { buildNoIndexMetadata } from "@/lib/shared-metadata";

export const metadata = buildNoIndexMetadata({
  locale: "fr",
  path: "/devis",
  title: "Demande de devis",
  description: "Demande un devis clair pour ton site web, ton application ou ton projet IA. Retour structuré sous 24h.",
});

export default function DevisPage() {
  return <QuotePageContent locale="fr" />;
}
