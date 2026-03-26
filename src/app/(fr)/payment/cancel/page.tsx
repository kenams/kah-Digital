import type { Metadata } from "next";
import { PaymentResultPageContent } from "@/components/pages/payment-result-page-content";

export const metadata: Metadata = {
  title: "Paiement interrompu",
  robots: { index: false, follow: false },
};

export default function PaymentCancelPage() {
  return <PaymentResultPageContent locale="fr" status="cancel" />;
}
