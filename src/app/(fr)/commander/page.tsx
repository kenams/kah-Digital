import { OrderRoute, orderMetadata, type OrderSearchParams } from "@/components/pages/order-routes";

export const metadata = orderMetadata("fr");

export default function CommanderPage({ searchParams }: { searchParams: OrderSearchParams }) {
  return <OrderRoute locale="fr" searchParams={searchParams} />;
}
