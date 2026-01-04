import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isAdminUser } from "@/lib/auth";
import { brandContact } from "@/config/brand";

export const dynamic = "force-dynamic";

const resendClient = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const replyFrom = "Kah-Digital <notifications@kah-digital.io>";
const replyTo = brandContact.email;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const maxSubjectLength = 200;
const maxBodyLength = 10000;
const maxEmailLength = 320;
const rateLimitWindowMs = 10 * 60 * 1000;
const rateLimitMax = 10;
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function authNotConfiguredResponse() {
  return NextResponse.json({ error: "Configuration Supabase Auth manquante" }, { status: 503 });
}

function unauthorizedResponse() {
  return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
}

function forbiddenResponse() {
  return NextResponse.json({ error: "Accès interdit" }, { status: 403 });
}

function mfaRequiredResponse() {
  return NextResponse.json({ error: "MFA requise" }, { status: 403 });
}

function logAdminApiEvent(status: string) {
  console.warn(`[api/admin] ${status}`);
}

function getClientIp(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for") ?? "";
  const ip = forwarded.split(",")[0]?.trim();
  return ip || "unknown";
}

function consumeRateLimit(key: string) {
  const now = Date.now();
  const current = rateLimitStore.get(key);
  if (!current || now > current.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + rateLimitWindowMs });
    return { ok: true, retryAfter: 0 };
  }

  if (current.count >= rateLimitMax) {
    return { ok: false, retryAfter: Math.max(1, Math.ceil((current.resetAt - now) / 1000)) };
  }

  current.count += 1;
  return { ok: true, retryAfter: 0 };
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

export async function POST(request: NextRequest) {
  const rateLimit = consumeRateLimit(getClientIp(request));
  if (!rateLimit.ok) {
    return NextResponse.json(
      { error: `Trop de requêtes. Réessaie dans ${rateLimit.retryAfter}s.` },
      { status: 429 }
    );
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

  if (!resendClient) {
    return NextResponse.json({ error: "Service email indisponible" }, { status: 503 });
  }

  try {
    const body = await request.json();
    const to = typeof body?.to === "string" ? body.to.trim() : "";
    const subject = typeof body?.subject === "string" ? body.subject.trim() : "";
    const message = typeof body?.body === "string" ? body.body.trim() : "";

    if (!to || !subject || !message) {
      return NextResponse.json({ error: "Paramètres invalides" }, { status: 400 });
    }

    if (!emailRegex.test(to) || to.length > maxEmailLength) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }

    if (subject.length > maxSubjectLength || message.length > maxBodyLength) {
      return NextResponse.json({ error: "Message trop long" }, { status: 400 });
    }

    await resendClient.emails.send({
      from: replyFrom,
      to,
      subject,
      text: message,
      replyTo,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[api/admin/replies] Failed to send reply", error);
    return NextResponse.json({ error: "Erreur d'envoi" }, { status: 500 });
  }
}
