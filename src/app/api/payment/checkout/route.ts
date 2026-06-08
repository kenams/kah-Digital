import { NextRequest, NextResponse } from "next/server";
import { type Locale } from "@/lib/locales";
import { parseChfAmountToCents } from "@/lib/quote-payments";
import { getPaymentResultUrls, getSiteOrigin, getStripeClient, isStripeConfigured } from "@/lib/stripe";

export const dynamic = "force-dynamic";

function getLocale(value: unknown): Locale {
  return value === "en" ? value : "fr";
}

function cleanString(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: NextRequest) {
  if (!isStripeConfigured()) {
    return NextResponse.json({ error: "Stripe non configure" }, { status: 503 });
  }

  try {
    const body = await request.json();
    const locale = getLocale(body?.locale);
    const email = cleanString(body?.email, 160).toLowerCase();
    const reference = cleanString(body?.reference, 120);
    const note = cleanString(body?.note, 240);
    const amount = parseChfAmountToCents(body?.amount);

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: "Email client invalide." }, { status: 400 });
    }

    if (amount < 100) {
      return NextResponse.json({ error: "Le montant minimum est de 1 CHF." }, { status: 400 });
    }

    if (amount > 10000000) {
      return NextResponse.json({ error: "Le montant maximum est de 100'000 CHF." }, { status: 400 });
    }

    const origin = getSiteOrigin(request);
    const urls = getPaymentResultUrls({ locale, origin });
    const stripe = getStripeClient();
    const label = reference ? `Paiement KAH Digital - ${reference}` : "Paiement KAH Digital";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: email,
      success_url: urls.successUrl,
      cancel_url: urls.cancelUrl,
      locale,
      metadata: {
        paymentType: "public_site",
        reference,
        note,
        email,
      },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "chf",
            unit_amount: amount,
            product_data: {
              name: label,
              description: note || "Paiement en ligne via KAH Digital.ch",
            },
          },
        },
      ],
    });

    if (!session.url) {
      throw new Error("Checkout URL missing");
    }

    return NextResponse.json({ ok: true, url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Impossible de creer le paiement.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
