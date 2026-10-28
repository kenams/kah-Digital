import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { withLocalePrefix, type Locale } from "@/lib/locales";
import { ORDER_COPY } from "@/lib/order-copy";
import {
  PACKS,
  SUBSCRIPTIONS,
  SUBSCRIPTION_TRIAL_DAYS,
  isCurrency,
  isOrderLocale,
  isPackId,
  isSubscriptionId,
  type PackOrderMeta,
} from "@/lib/pack-orders";
import { getRateLimitHeaders, getRequestIp, rateLimit } from "@/lib/rate-limit";
import { getSiteOrigin, getStripeClient, isStripeConfigured } from "@/lib/stripe";

export const dynamic = "force-dynamic";

const checkoutRateLimit = { windowMs: 10 * 60 * 1000, max: 8 };

const MESSAGES: Record<Locale, { unavailable: string; tooMany: (s: number) => string; pack: string; plan: string; name: string; email: string; accept: string; currency: string }> = {
  fr: {
    unavailable: "Paiement indisponible pour le moment.",
    tooMany: (s) => `Trop de tentatives. Réessayez dans ${s}s.`,
    pack: "Pack inconnu.", plan: "Formule d'abonnement inconnue.", name: "Indiquez votre nom.",
    email: "Adresse e-mail invalide.", accept: "Vous devez accepter les conditions pour continuer.", currency: "Devise inconnue.",
  },
  en: {
    unavailable: "Payment is temporarily unavailable.",
    tooMany: (s) => `Too many attempts. Try again in ${s}s.`,
    pack: "Unknown pack.", plan: "Unknown subscription plan.", name: "Please enter your name.",
    email: "Invalid email address.", accept: "You must accept the terms to continue.", currency: "Unknown currency.",
  },
  de: {
    unavailable: "Die Zahlung ist vorübergehend nicht verfügbar.",
    tooMany: (s) => `Zu viele Versuche. Bitte in ${s}s erneut versuchen.`,
    pack: "Unbekanntes Paket.", plan: "Unbekanntes Abonnement.", name: "Bitte geben Sie Ihren Namen an.",
    email: "Ungültige E-Mail-Adresse.", accept: "Sie müssen die Bedingungen akzeptieren, um fortzufahren.", currency: "Unbekannte Währung.",
  },
};

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: NextRequest) {
  let locale: Locale = "fr";

  if (!isStripeConfigured()) {
    return NextResponse.json({ error: MESSAGES.fr.unavailable }, { status: 503 });
  }

  try {
    const body = await request.json();
    locale = isOrderLocale(body?.locale) ? body.locale : "fr";
    const msg = MESSAGES[locale];
    const copy = ORDER_COPY[locale];

    const rate = rateLimit(`commander:${getRequestIp(request)}`, checkoutRateLimit);
    const rateHeaders = getRateLimitHeaders(rate, checkoutRateLimit.max);
    if (!rate.allowed) {
      return NextResponse.json(
        { error: msg.tooMany(rate.retryAfter) },
        { status: 429, headers: { ...rateHeaders, "Retry-After": String(rate.retryAfter) } },
      );
    }

    const email = clean(body?.email, 160).toLowerCase();
    const name = clean(body?.name, 120);
    const company = clean(body?.company, 120);
    const phone = clean(body?.phone, 40);

    const packId: unknown = body?.pack;
    const planId: unknown = body?.plan;
    const currencyId: unknown = body?.currency;
    if (!isPackId(packId)) return NextResponse.json({ error: msg.pack }, { status: 400 });
    if (!isSubscriptionId(planId)) return NextResponse.json({ error: msg.plan }, { status: 400 });
    if (!isCurrency(currencyId)) return NextResponse.json({ error: msg.currency }, { status: 400 });
    if (name.length < 2) return NextResponse.json({ error: msg.name }, { status: 400 });
    if (!isValidEmail(email)) return NextResponse.json({ error: msg.email }, { status: 400 });
    if (body?.accept !== true) return NextResponse.json({ error: msg.accept }, { status: 400 });

    const pack = PACKS[packId];
    const plan = SUBSCRIPTIONS[planId];
    const packCopy = copy.packs[packId];
    const planCopy = copy.plans[planId];
    const origin = getSiteOrigin(request);
    const stripe = getStripeClient();

    const meta: PackOrderMeta = {
      paymentType: "pack_order",
      pack: pack.id,
      plan: plan.id,
      currency: currencyId,
      locale,
      name,
      company,
      phone,
    };

    const packLine: Stripe.Checkout.SessionCreateParams.LineItem = {
      quantity: 1,
      price_data: {
        currency: currencyId,
        unit_amount: pack.price * 100,
        product_data: {
          name: `KAH Digital Studio — Pack ${packCopy.name}`,
          description: packCopy.summary,
        },
      },
    };

    const common: Stripe.Checkout.SessionCreateParams = {
      customer_email: email,
      locale,
      success_url: `${origin}${withLocalePrefix("/commander/merci", locale)}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}${withLocalePrefix("/commander", locale)}?pack=${pack.id}&devise=${currencyId}&annule=1`,
      billing_address_collection: "auto",
      phone_number_collection: { enabled: true },
      metadata: { ...meta },
      custom_text: { submit: { message: copy.checkoutVat } },
    };

    let session: Stripe.Checkout.Session;

    if (plan.stripeProductId) {
      const recurringLine: Stripe.Checkout.SessionCreateParams.LineItem =
        currencyId === "eur" && plan.stripePriceIdEur
          ? { price: plan.stripePriceIdEur, quantity: 1 }
          : {
              quantity: 1,
              price_data: {
                currency: currencyId,
                product: plan.stripeProductId,
                unit_amount: plan.price * 100,
                recurring: { interval: "month" },
              },
            };

      session = await stripe.checkout.sessions.create({
        ...common,
        mode: "subscription",
        line_items: [recurringLine, packLine],
        subscription_data: {
          // Le pack est facturé tout de suite ; le 1er mois d'abonnement démarre à la livraison.
          trial_period_days: SUBSCRIPTION_TRIAL_DAYS,
          description: `${planCopy.name} — KAH Digital Studio`,
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
            description: `Pack ${packCopy.name} — KAH Digital Studio`,
            footer: copy.checkoutVat,
            metadata: { ...meta },
          },
        },
      });
    }

    if (!session.url) throw new Error("URL de paiement manquante.");
    return NextResponse.json({ ok: true, url: session.url }, { headers: rateHeaders });
  } catch (error) {
    console.error("[api/commander/checkout]", error);
    return NextResponse.json({ error: ORDER_COPY[locale].errorGeneric }, { status: 400 });
  }
}
