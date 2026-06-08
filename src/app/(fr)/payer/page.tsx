import type { Metadata } from "next";
import { PaymentPageContent } from "@/components/pages/payment-page-content";
import { buildNoIndexMetadata } from "@/lib/shared-metadata";

export const metadata: Metadata = buildNoIndexMetadata({
  locale: "fr",
  path: "/payer",
  title: "Paiement en ligne",
  description: "Payez une facture, un acompte ou un solde KAH Digital par carte bancaire.",
});

export default function PayPage() {
  return <PaymentPageContent locale="fr" />;
}
