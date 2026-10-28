import { OrderThanksRoute, orderThanksMetadata, type OrderSearchParams } from "@/components/pages/order-routes";

export const metadata = orderThanksMetadata("de");
export const dynamic = "force-dynamic";

export default function OrderThanksPage({ searchParams }: { searchParams: OrderSearchParams }) {
  return <OrderThanksRoute locale="de" searchParams={searchParams} />;
}
