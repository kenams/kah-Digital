import { NextRequest, NextResponse } from "next/server";
import { appendQuoteActivity } from "@/lib/admin-activity-store";
import { computeNextPaymentStatus, getQuotePaymentStatusLabel } from "@/lib/quote-payments";
import { getQuoteRecord, isSupabaseConfigured, updateQuoteRecord } from "@/lib/quote-store";
import { getStripeClient, getStripeWebhookSecret, isStripeConfigured } from "@/lib/stripe";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Configuration Supabase manquante" }, { status: 503 });
  }

  if (!isStripeConfigured()) {
    return NextResponse.json({ error: "Stripe non configure" }, { status: 503 });
  }

  const signature = request.headers.get("stripe-signature");
  const webhookSecret = getStripeWebhookSecret();

  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: "Signature Stripe manquante" }, { status: 400 });
  }

  try {
    const payload = await request.text();
    const stripe = getStripeClient();
    const event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const quoteId = typeof session.metadata?.quoteId === "string" ? session.metadata.quoteId.trim() : "";
      const submittedAt =
        typeof session.metadata?.submittedAt === "string" ? session.metadata.submittedAt.trim() : "";

      if (!quoteId && !submittedAt) {
        return NextResponse.json({ ok: true });
      }

      const quote = await getQuoteRecord({
        id: quoteId || null,
        submittedAt,
      });

      if (!quote) {
        return NextResponse.json({ ok: true });
      }

      const processedSessions = quote.paymentProcessedSessions ?? [];
      if (processedSessions.includes(session.id)) {
        return NextResponse.json({ ok: true });
      }

      const paidAmount = Math.max(0, quote.paymentPaidAmount ?? 0);
      const receivedAmount = Math.max(0, session.amount_total ?? 0);
      const nextPaidAmount = paidAmount + receivedAmount;
      const totalAmount = quote.paymentTotalAmount ?? receivedAmount;
      const targetQuoteId = quote.id ?? (quoteId || null);
      const nextStatus = computeNextPaymentStatus({
        totalAmount,
        paidAmount: nextPaidAmount,
        fallback: "pending",
      });

      await updateQuoteRecord({
        id: targetQuoteId,
        submittedAt: quote.submittedAt,
        patch: {
          paymentStatus: nextStatus,
          paymentCurrency: (session.currency ?? "chf").toUpperCase(),
          paymentPaidAmount: nextPaidAmount,
          paymentPaidAt: new Date().toISOString(),
          paymentProcessedSessions: [...processedSessions, session.id],
        },
      });

      try {
        await appendQuoteActivity({
          quoteId: targetQuoteId,
          quoteSubmittedAt: quote.submittedAt,
          action: "payment_received",
          summary: `Paiement reçu de ${(receivedAmount / 100).toFixed(2).replace(".", ",")} CHF. Statut : ${getQuotePaymentStatusLabel(nextStatus)}.`,
          payload: {
            sessionId: session.id,
            receivedAmount,
            totalAmount,
            nextPaidAmount,
            nextStatus,
          },
        });
      } catch (activityError) {
        console.warn("[api/stripe/webhook] Failed to append payment received activity", activityError);
      }

      return NextResponse.json({ ok: true });
    }

    if (event.type === "checkout.session.expired") {
      const session = event.data.object;
      const quoteId = typeof session.metadata?.quoteId === "string" ? session.metadata.quoteId.trim() : "";
      const submittedAt =
        typeof session.metadata?.submittedAt === "string" ? session.metadata.submittedAt.trim() : "";

      if (!quoteId && !submittedAt) {
        return NextResponse.json({ ok: true });
      }

      const quote = await getQuoteRecord({
        id: quoteId || null,
        submittedAt,
      });

      if (!quote) {
        return NextResponse.json({ ok: true });
      }

      if ((quote.paymentPaidAmount ?? 0) <= 0 && quote.paymentLastSessionId === session.id) {
        const targetQuoteId = quote.id ?? (quoteId || null);
        await updateQuoteRecord({
          id: targetQuoteId,
          submittedAt: quote.submittedAt,
          patch: {
            paymentStatus: "expired",
          },
        });

        try {
          await appendQuoteActivity({
            quoteId: targetQuoteId,
            quoteSubmittedAt: quote.submittedAt,
            action: "payment_link_expired",
            summary: "Le dernier lien Stripe a expiré sans paiement.",
            payload: {
              sessionId: session.id,
            },
          });
        } catch (activityError) {
          console.warn("[api/stripe/webhook] Failed to append payment expired activity", activityError);
        }
      }

      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[api/stripe/webhook] Stripe webhook failed", error);
    return NextResponse.json({ error: "Webhook Stripe invalide" }, { status: 400 });
  }
}
