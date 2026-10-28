import { OrderRoute, orderMetadata, type OrderSearchParams } from "@/components/pages/order-routes";

export const metadata = orderMetadata("de");

export default function CommanderPage({ searchParams }: { searchParams: OrderSearchParams }) {
  return <OrderRoute locale="de" searchParams={searchParams} />;
}
