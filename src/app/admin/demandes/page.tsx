import { AdminDemandesBoard } from "@/components/admin-demandes-board";
import { getRecentQuotes } from "@/lib/quote-store";

export const dynamic = "force-dynamic";

export default async function AdminDemandesPage() {
  const items = await getRecentQuotes();
  return <AdminDemandesBoard initialItems={items} />;
}
