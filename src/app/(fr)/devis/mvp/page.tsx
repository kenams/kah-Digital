import { MvpQuotePageContent } from "@/components/pages/mvp-quote-page-content";
import { buildNoIndexMetadata } from "@/lib/shared-metadata";

export const metadata = buildNoIndexMetadata({
  locale: "fr",
  path: "/devis/mvp",
  title: "Devis MVP mobile",
  description: "Formulaire express pour cadrer un MVP mobile iOS ou Android.",
});

export default function DevisMvpPage() {
  return <MvpQuotePageContent locale="fr" />;
}
