import type { NextRequest } from "next/server";
import Stripe from "stripe";
import type { Locale } from "@/lib/locales";
import { withLocalePrefix } from "@/lib/locales";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || process.env.SITE_URL?.trim();

let stripeClient: Stripe | null = null;

export function isStripeConfigured() {
  return Boolean(stripeSecretKey);
}

export function getStripeWebhookSecret() {
  return stripeWebhookSecret;
}

export function getStripeClient() {
  if (!stripeSecretKey) {
    throw new Error("Stripe non configure (STRIPE_SECRET_KEY manquante).");
  }

  if (!stripeClient) {
    stripeClient = new Stripe(stripeSecretKey);
  }

  return stripeClient;
}

export function getSiteOrigin(request?: NextRequest) {
  if (siteUrl) {
    return siteUrl.replace(/\/$/, "");
  }

  if (!request) {
    return "https://kah-digital.ch";
  }

  const proto = request.headers.get("x-forwarded-proto") ?? "https";
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? "kah-digital.ch";
  return `${proto}://${host}`;
}

export function getPaymentResultUrls(params: { locale: Locale; origin: string }) {
  const successPath = withLocalePrefix("/payment/success", params.locale);
  const cancelPath = withLocalePrefix("/payment/cancel", params.locale);

  return {
    successUrl: `${params.origin}${successPath}?session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: `${params.origin}${cancelPath}`,
  };
}
