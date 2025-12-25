import { NextResponse } from "next/server";
import { getRecentQuotes } from "@/lib/quote-store";

export const dynamic = "force-dynamic";

export async function GET() {
  const items = await getRecentQuotes();
  return NextResponse.json({ items });
}
