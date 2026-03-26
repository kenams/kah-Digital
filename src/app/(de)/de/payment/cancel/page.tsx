import type { Metadata } from "next";
import { PaymentResultPageContent } from "@/components/pages/payment-result-page-content";

export const metadata: Metadata = {
  title: "Zahlung unterbrochen",
  robots: { index: false, follow: false },
};

export default function PaymentCancelPage() {
  return <PaymentResultPageContent locale="de" status="cancel" />;
}
