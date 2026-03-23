import { Metadata } from "next";
import { QuotePageContent } from "@/components/pages/quote-page-content";

export const metadata: Metadata = {
  title: "Demande de devis",
  description: "Demande un devis clair pour ton site web, ton application ou ton projet IA. Retour structuré sous 24h.",
};

export default function DevisPage() {
  return <QuotePageContent locale="fr" />;
}
