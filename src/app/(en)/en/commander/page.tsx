import { OrderRoute, orderMetadata, type OrderSearchParams } from "@/components/pages/order-routes";

export const metadata = orderMetadata("en");

export default function CommanderPage({ searchParams }: { searchParams: OrderSearchParams }) {
  return <OrderRoute locale="en" searchParams={searchParams} />;
}
