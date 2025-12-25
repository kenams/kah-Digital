import { NextResponse } from "next/server";
import { quoteSchema, type QuoteRecord } from "@/lib/quote";
import { notifyQuote } from "@/lib/notifications";

const submissions: QuoteRecord[] = [];

export async function GET() {
  return NextResponse.json({ items: submissions });
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
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
    submissions.push(quote);

    await notifyQuote(quote);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
