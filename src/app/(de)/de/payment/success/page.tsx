import type { Metadata } from "next";
import { PaymentResultPageContent } from "@/components/pages/payment-result-page-content";

export const metadata: Metadata = {
  title: "Zahlung bestaetigt",
  robots: { index: false, follow: false },
};

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function PaymentSuccessPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const sessionId = typeof params.session_id === "string" ? params.session_id : undefined;

  return <PaymentResultPageContent locale="de" status="success" sessionId={sessionId} />;
}
