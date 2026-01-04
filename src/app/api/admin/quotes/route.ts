import { NextRequest, NextResponse } from "next/server";
import { getRecentQuotes, isSupabaseConfigured, updateQuoteStatus } from "@/lib/quote-store";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isAdminUser } from "@/lib/auth";

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
  console.warn(`[api/admin] ${status}`);
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

const feasibilityValues = new Set(["pending", "feasible", "blocked"]);
const depositValues = new Set(["none", "deposit", "servers"]);

export async function GET() {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Configuration Supabase manquante" }, { status: 503 });
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
    const items = await getRecentQuotes();
    return NextResponse.json({ items });
  } catch (error) {
    console.error("[api/admin/quotes] Failed to fetch quotes", error);
    return NextResponse.json({ error: "Erreur de lecture des demandes" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Configuration Supabase manquante" }, { status: 503 });
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
    const feasibility = typeof body?.feasibility === "string" ? body.feasibility.trim() : "";
    const deposit = typeof body?.deposit === "string" ? body.deposit.trim() : "";

    if (!submittedAt || !feasibilityValues.has(feasibility) || !depositValues.has(deposit)) {
      return NextResponse.json({ error: "Parametres invalides" }, { status: 400 });
    }

    await updateQuoteStatus({
      id,
      submittedAt,
      feasibility: feasibility as "pending" | "feasible" | "blocked",
      deposit: deposit as "none" | "deposit" | "servers",
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[api/admin/quotes] Failed to update status", error);
    return NextResponse.json({ error: "Erreur de mise a jour" }, { status: 500 });
  }
}
