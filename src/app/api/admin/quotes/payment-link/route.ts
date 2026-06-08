import { NextRequest, NextResponse } from "next/server";
import { appendQuoteActivity } from "@/lib/admin-activity-store";
import { isAdminUser } from "@/lib/auth";
import { type Locale } from "@/lib/locales";
import { computeAmountToCharge, computeNextPaymentStatus, parseChfAmountToCents } from "@/lib/quote-payments";
import { getQuoteRecord, isSupabaseConfigured, updateQuoteRecord } from "@/lib/quote-store";
import { getPaymentResultUrls, getSiteOrigin, getStripeClient, isStripeConfigured } from "@/lib/stripe";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

function authNotConfiguredResponse() {
  return NextResponse.json({ error: "Configuration Supabase Auth manquante" }, { status: 503 });
}

function unauthorizedResponse() {
  return NextResponse.json({ error: "Non autorise" }, { status: 401 });
}

function forbiddenResponse() {
  return NextResponse.json({ error: "Acces interdit" }, { status: 403 });
}

function mfaRequiredResponse() {
  return NextResponse.json({ error: "MFA requise" }, { status: 403 });
}

function logAdminApiEvent(status: string) {
  console.warn(`[api/admin/payment-link] ${status}`);
}

async function requireAdmin() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    logAdminApiEvent("auth-config-missing");
    return { status: "missing" } as const;
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    logAdminApiEvent("unauthorized");
    return { status: "unauthorized" } as const;
  }

  if (!isAdminUser(user)) {
    logAdminApiEvent("forbidden");
    return { status: "forbidden" } as const;
  }

  const { data: mfaData, error: mfaError } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
  if (mfaError || mfaData?.currentLevel !== "aal2") {
    logAdminApiEvent("mfa-required");
    return { status: "mfa" } as const;
  }

  return { status: "ok", user } as const;
}

function getLocale(value: unknown): Locale {
  return value === "en" ? value : "fr";
}

export async function POST(request: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Configuration Supabase manquante" }, { status: 503 });
  }

  if (!isStripeConfigured()) {
    return NextResponse.json({ error: "Stripe non configure" }, { status: 503 });
  }

  const adminUser = await requireAdmin();
  if (adminUser.status === "missing") {
    return authNotConfiguredResponse();
  }
  if (adminUser.status === "unauthorized") {
    return unauthorizedResponse();
  }
  if (adminUser.status === "forbidden") {
    return forbiddenResponse();
  }
  if (adminUser.status === "mfa") {
    return mfaRequiredResponse();
  }

  try {
    const body = await request.json();
    const id = typeof body?.id === "string" && body.id.trim() ? body.id.trim() : null;
    const submittedAt = typeof body?.submittedAt === "string" ? body.submittedAt.trim() : "";
    const paymentMode = body?.paymentMode === "deposit" ? "deposit" : body?.paymentMode === "full" ? "full" : null;
    const locale = getLocale(body?.locale);

    if (!submittedAt || !paymentMode) {
      return NextResponse.json({ error: "Parametres invalides" }, { status: 400 });
    }

    const totalAmount = parseChfAmountToCents(body?.paymentTotalAmount);
    const depositAmount =
      body?.paymentDepositAmount === null || body?.paymentDepositAmount === undefined || body?.paymentDepositAmount === ""
        ? null
        : parseChfAmountToCents(body.paymentDepositAmount);

    if (totalAmount <= 0) {
      return NextResponse.json({ error: "Le montant total doit etre superieur a zero." }, { status: 400 });
    }

    if (depositAmount !== null && depositAmount > totalAmount) {
      return NextResponse.json({ error: "L'acompte ne peut pas depasser le total." }, { status: 400 });
    }

    if (paymentMode === "deposit" && (!depositAmount || depositAmount <= 0)) {
      return NextResponse.json({ error: "Un acompte est requis pour ce lien." }, { status: 400 });
    }

    const quote = await getQuoteRecord({ id, submittedAt });
    if (!quote) {
      return NextResponse.json({ error: "Demande introuvable" }, { status: 404 });
    }

    if (!quote.email?.trim()) {
      return NextResponse.json({ error: "Email client manquant." }, { status: 400 });
    }

    const paidAmount = quote.paymentPaidAmount ?? 0;
    const amountToCharge = computeAmountToCharge({
      mode: paymentMode,
      totalAmount,
      depositAmount,
      paidAmount,
    });

    if (amountToCharge <= 0) {
      return NextResponse.json({ error: "Aucun montant restant a encaisser pour ce lien." }, { status: 400 });
    }

    const stripe = getStripeClient();
    const origin = getSiteOrigin(request);
    const urls = getPaymentResultUrls({ locale, origin });
    const projectLabel = quote.projectType?.trim() || "Projet KAH Digital";
    const paymentTitle =
      paymentMode === "deposit"
        ? `Acompte KAH Digital - ${projectLabel}`
        : paidAmount > 0
          ? `Solde KAH Digital - ${projectLabel}`
          : `Paiement KAH Digital - ${projectLabel}`;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: quote.email.trim(),
      client_reference_id: quote.id ?? quote.submittedAt,
      success_url: urls.successUrl,
      cancel_url: urls.cancelUrl,
      locale,
      metadata: {
        quoteId: quote.id ?? "",
        submittedAt: quote.submittedAt,
        paymentMode,
        paymentTotalAmount: String(totalAmount),
        paymentDepositAmount: String(depositAmount ?? 0),
        locale,
      },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "chf",
            unit_amount: amountToCharge,
            product_data: {
              name: paymentTitle,
              description: quote.goal?.trim() || undefined,
            },
          },
        },
      ],
    });

    if (!session.url) {
      throw new Error("Checkout URL missing");
    }

    await updateQuoteRecord({
      id: quote.id ?? id,
      submittedAt: quote.submittedAt,
      patch: {
        paymentStatus: computeNextPaymentStatus({
          totalAmount,
          paidAmount,
          fallback: paidAmount > 0 ? "partial" : "pending",
        }),
        paymentCurrency: "CHF",
        paymentTotalAmount: totalAmount,
        paymentDepositAmount: depositAmount ?? undefined,
        paymentPaidAmount: paidAmount,
        paymentLastSessionId: session.id,
        paymentLastSessionUrl: session.url,
        paymentLastSessionMode: paymentMode,
        paymentLastSessionCreatedAt: new Date().toISOString(),
        paymentLastSessionExpiresAt: session.expires_at
          ? new Date(session.expires_at * 1000).toISOString()
          : undefined,
      },
    });

    let activity = null;
    try {
      activity = await appendQuoteActivity({
        quoteId: quote.id ?? id,
        quoteSubmittedAt: quote.submittedAt,
        actorUserId: adminUser.user.id,
        actorEmail: adminUser.user.email ?? null,
        action: "payment_link_created",
        summary:
          paymentMode === "deposit"
            ? `Lien Stripe d'acompte créé pour ${(amountToCharge / 100).toFixed(2).replace(".", ",")} CHF.`
            : `Lien Stripe de paiement créé pour ${(amountToCharge / 100).toFixed(2).replace(".", ",")} CHF.`,
        payload: {
          mode: paymentMode,
          amountToCharge,
          totalAmount,
          depositAmount,
          sessionId: session.id,
          expiresAt: session.expires_at ? new Date(session.expires_at * 1000).toISOString() : null,
        },
      });
    } catch (activityError) {
      console.warn("[api/admin/payment-link] Failed to append payment activity", activityError);
    }

    return NextResponse.json({
      ok: true,
      url: session.url,
      paymentStatus: paidAmount > 0 ? "partial" : "pending",
      amountToCharge,
      activity,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erreur Stripe";
    console.error("[api/admin/payment-link] Failed to create payment link", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
