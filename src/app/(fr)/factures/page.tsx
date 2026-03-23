import type { Metadata } from "next";
import { InvoicesPageContent } from "@/components/pages/invoices-page-content";

export const metadata: Metadata = {
  title: "Factures",
  description: "Decouvrez nos factures professionnelles et notre processus de facturation transparent.",
};

export default function FacturesPage() {
  return <InvoicesPageContent locale="fr" />;
}
