import { PaymentResultPageContent } from "@/components/pages/payment-result-page-content";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function PaymentSuccessPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const sessionId = typeof params.session_id === "string" ? params.session_id : undefined;

  return <PaymentResultPageContent locale="en" status="success" sessionId={sessionId} />;
}
