import type { Metadata } from "next";
import { MvpQuotePageContent } from "@/components/pages/mvp-quote-page-content";

export const metadata: Metadata = {
  title: "Devis MVP mobile",
  description: "Formulaire express pour cadrer un MVP mobile iOS ou Android.",
};

export default function DevisMvpPage() {
  return <MvpQuotePageContent locale="fr" />;
}
