import { NextRequest, NextResponse } from "next/server";
import { quoteSchema, type QuoteRecord } from "@/lib/quote";
import { notifyQuote } from "@/lib/notifications";
import { getRecentQuotes, saveQuoteRecord } from "@/lib/quote-store";

const adminToken = process.env.ADMIN_API_TOKEN;

export async function GET(request: NextRequest) {
  if (!adminToken) {
    return NextResponse.json({ error: "Admin token absent" }, { status: 503 });
  }

  const header = request.headers.get("authorization");
  if (!header || header !== `Bearer ${adminToken}`) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const items = await getRecentQuotes();
  return NextResponse.json({ items });
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const websiteField = typeof payload?.website === "string" ? payload.website.trim() : "";
    if (websiteField) {
      return NextResponse.json({ ok: true });
    }
    const parsed = quoteSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Données invalides", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const quote: QuoteRecord = {
      ...parsed.data,
      submittedAt: new Date().toISOString(),
    };
    await saveQuoteRecord(quote);

    await notifyQuote(quote);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
