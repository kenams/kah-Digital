import { Metadata } from "next";
import { QuotePageContent } from "@/components/pages/quote-page-content";

export const metadata: Metadata = {
  title: "Demande de devis",
  description: "Demandez un devis gratuit pour votre projet digital. Reponse detaillee sous 24h.",
};

export default function DevisPage() {
  return <QuotePageContent locale="fr" />;
}
