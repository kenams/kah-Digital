import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import {
  PACKS,
  SUBSCRIPTIONS,
  SUBSCRIPTION_TRIAL_DAYS,
  isPackId,
  isSubscriptionId,
  type PackOrderMeta,
} from "@/lib/pack-orders";
import { getRateLimitHeaders, getRequestIp, rateLimit } from "@/lib/rate-limit";
import { getSiteOrigin, getStripeClient, isStripeConfigured } from "@/lib/stripe";

export const dynamic = "force-dynamic";

const checkoutRateLimit = { windowMs: 10 * 60 * 1000, max: 8 };

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: NextRequest) {
  if (!isStripeConfigured()) {
    return NextResponse.json({ error: "Paiement indisponible pour le moment." }, { status: 503 });
  }

  const rate = rateLimit(`commander:${getRequestIp(request)}`, checkoutRateLimit);
  const rateHeaders = getRateLimitHeaders(rate, checkoutRateLimit.max);
  if (!rate.allowed) {
    return NextResponse.json(
      { error: `Trop de tentatives. Réessayez dans ${rate.retryAfter}s.` },
      { status: 429, headers: { ...rateHeaders, "Retry-After": String(rate.retryAfter) } },
    );
  }

  try {
    const body = await request.json();
    const email = clean(body?.email, 160).toLowerCase();
    const name = clean(body?.name, 120);
    const company = clean(body?.company, 120);
    const phone = clean(body?.phone, 40);

    const packId: unknown = body?.pack;
    const planId: unknown = body?.plan;
    if (!isPackId(packId)) return NextResponse.json({ error: "Pack inconnu." }, { status: 400 });
    if (!isSubscriptionId(planId)) return NextResponse.json({ error: "Formule d'abonnement inconnue." }, { status: 400 });
    if (name.length < 2) return NextResponse.json({ error: "Indiquez votre nom." }, { status: 400 });
    if (!isValidEmail(email)) return NextResponse.json({ error: "Adresse e-mail invalide." }, { status: 400 });
    if (body?.accept !== true) {
      return NextResponse.json({ error: "Vous devez accepter les conditions pour continuer." }, { status: 400 });
    }

    const pack = PACKS[packId];
    const plan = SUBSCRIPTIONS[planId];
    const origin = getSiteOrigin(request);
    const stripe = getStripeClient();

    const meta: PackOrderMeta = {
      paymentType: "pack_order",
      pack: pack.id,
      plan: plan.id,
      name,
      company,
      phone,
    };

    const packLine: Stripe.Checkout.SessionCreateParams.LineItem = {
      quantity: 1,
      price_data: {
        currency: "eur",
        unit_amount: pack.price * 100,
        product_data: {
          name: `KAH Digital Studio — Pack ${pack.name}`,
          description: pack.summary,
        },
      },
    };

    const common: Stripe.Checkout.SessionCreateParams = {
      customer_email: email,
      locale: "fr",
      success_url: `${origin}/commander/merci?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/commander?pack=${pack.id}&annule=1`,
      billing_address_collection: "auto",
      phone_number_collection: { enabled: true },
      metadata: { ...meta },
      custom_text: {
        submit: {
          message:
            "TVA non applicable, art. 293 B du CGI. Livraison sous 5 jours ouvrés après réception de vos contenus.",
        },
      },
    };

    let session: Stripe.Checkout.Session;

    if (plan.stripePriceId) {
      session = await stripe.checkout.sessions.create({
        ...common,
        mode: "subscription",
        line_items: [{ price: plan.stripePriceId, quantity: 1 }, packLine],
        subscription_data: {
          // Le pack est facturé tout de suite ; le 1er mois d'abonnement démarre à la livraison.
          trial_period_days: SUBSCRIPTION_TRIAL_DAYS,
          description: `Abonnement ${plan.name} — KAH Digital Studio`,
          metadata: { ...meta },
        },
      });
    } else {
      session = await stripe.checkout.sessions.create({
        ...common,
        mode: "payment",
        customer_creation: "always",
        line_items: [packLine],
        invoice_creation: {
          enabled: true,
          invoice_data: {
            description: `Pack ${pack.name} — KAH Digital Studio`,
            footer: "TVA non applicable, art. 293 B du CGI.",
            metadata: { ...meta },
          },
        },
      });
    }

    if (!session.url) throw new Error("URL de paiement manquante.");
    return NextResponse.json({ ok: true, url: session.url }, { headers: rateHeaders });
  } catch (error) {
    console.error("[api/commander/checkout]", error);
    return NextResponse.json({ error: "Impossible d'ouvrir le paiement. Réessayez ou contactez-nous." }, { status: 400 });
  }
}
