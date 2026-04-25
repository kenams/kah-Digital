import { QuotePageContent } from "@/components/pages/quote-page-content";
import { buildPageMetadata } from "@/lib/shared-metadata";

export const metadata = buildPageMetadata({
  locale: "fr",
  path: "/devis",
  title: "Devis gratuit — Site web, application ou IA | KAH-Digital",
  description: "Demande un devis gratuit pour ton projet digital. Retour clair avec budget, délai et recommandations sous 24h. Sans engagement.",
  keywords: ["devis site web gratuit", "devis agence web Lausanne", "demande devis application", "tarif création site web"],
});

export default function DevisPage() {
  return <QuotePageContent locale="fr" />;
}
