import { NextRequest, NextResponse } from "next/server";
import { appendQuoteActivity } from "@/lib/admin-activity-store";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isAdminUser } from "@/lib/auth";
import type { QuotePipelineStatus } from "@/lib/quote";
import { getQuoteRecord, getRecentQuotes, isSupabaseConfigured, updateQuoteStatus } from "@/lib/quote-store";

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
const pipelineValues = new Set(["new", "qualified", "quote", "negotiation", "won", "lost"]);

const feasibilityLabels = {
  pending: "À qualifier",
  feasible: "Faisable",
  blocked: "Non faisable",
} as const;

const depositLabels = {
  none: "Non défini",
  deposit: "Acompte validé",
  servers: "Serveurs / outils réglés",
} as const;

const pipelineLabels = {
  new: "Nouveau",
  qualified: "Qualifié",
  quote: "Devis envoyé",
  negotiation: "Négociation",
  won: "Gagné",
  lost: "Perdu",
} as const;

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
    const pipeline = typeof body?.pipeline === "string" ? body.pipeline.trim() : "";

    if ((!submittedAt && !id) || !feasibilityValues.has(feasibility) || !depositValues.has(deposit)) {
      return NextResponse.json({ error: "Parametres invalides" }, { status: 400 });
    }

    if (pipeline && !pipelineValues.has(pipeline)) {
      return NextResponse.json({ error: "Pipeline invalide" }, { status: 400 });
    }

    const existing = await getQuoteRecord({ id, submittedAt });
    if (!existing) {
      return NextResponse.json({ error: "Demande introuvable" }, { status: 404 });
    }

    await updateQuoteStatus({
      id,
      submittedAt,
      feasibility: feasibility as "pending" | "feasible" | "blocked",
      deposit: deposit as "none" | "deposit" | "servers",
      pipeline: pipeline ? (pipeline as QuotePipelineStatus) : undefined,
    });

    const activities = [];

    if ((existing.feasibility ?? "pending") !== feasibility || (existing.deposit ?? "none") !== deposit) {
      try {
        const activity = await appendQuoteActivity({
          quoteId: existing.id ?? id,
          quoteSubmittedAt: existing.submittedAt,
          actorUserId: adminUser.user.id,
          actorEmail: adminUser.user.email ?? null,
          action: "qualification_updated",
          summary: `Qualification mise à jour : faisabilité ${feasibilityLabels[existing.feasibility ?? "pending"]} → ${feasibilityLabels[feasibility as "pending" | "feasible" | "blocked"]}, avance ${depositLabels[existing.deposit ?? "none"]} → ${depositLabels[deposit as "none" | "deposit" | "servers"]}.`,
          payload: {
            previousFeasibility: existing.feasibility ?? "pending",
            nextFeasibility: feasibility,
            previousDeposit: existing.deposit ?? "none",
            nextDeposit: deposit,
          },
        });
        activities.push(activity);
      } catch (activityError) {
        console.warn("[api/admin/quotes] Failed to append qualification activity", activityError);
      }
    }

    if (pipeline && (existing.pipeline ?? "new") !== pipeline) {
      try {
        const activity = await appendQuoteActivity({
          quoteId: existing.id ?? id,
          quoteSubmittedAt: existing.submittedAt,
          actorUserId: adminUser.user.id,
          actorEmail: adminUser.user.email ?? null,
          action: "pipeline_updated",
          summary: `Pipeline déplacé de ${pipelineLabels[existing.pipeline ?? "new"]} vers ${pipelineLabels[pipeline as QuotePipelineStatus]}.`,
          payload: {
            previousPipeline: existing.pipeline ?? "new",
            nextPipeline: pipeline,
          },
        });
        activities.push(activity);
      } catch (activityError) {
        console.warn("[api/admin/quotes] Failed to append pipeline activity", activityError);
      }
    }

    return NextResponse.json({ ok: true, activities });
  } catch (error) {
    console.error("[api/admin/quotes] Failed to update status", error);
    return NextResponse.json({ error: "Erreur de mise à jour" }, { status: 500 });
  }
}
