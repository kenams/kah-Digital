import type { Metadata } from "next";
import { PaymentResultPageContent } from "@/components/pages/payment-result-page-content";

export const metadata: Metadata = {
  title: "Payment interrupted",
  robots: { index: false, follow: false },
};

export default function PaymentCancelPage() {
  return <PaymentResultPageContent locale="en" status="cancel" />;
}
