import type { Metadata } from "next";
import { InvoicesPageContent } from "@/components/pages/invoices-page-content";
import { buildNoIndexMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = buildNoIndexMetadata({
  locale: "fr",
  path: "/factures",
  title: "Factures",
  description: "Decouvrez nos factures professionnelles et notre processus de facturation transparent.",
});

export default function FacturesPage() {
  return <InvoicesPageContent locale="fr" />;
}
