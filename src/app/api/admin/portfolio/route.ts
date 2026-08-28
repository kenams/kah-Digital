import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isAdminUser } from "@/lib/auth";
import {
  isPortfolioCategory,
  isPortfolioStatus,
  parseEurAmount,
  type PortfolioProject,
} from "@/lib/portfolio";
import {
  createPortfolioProject,
  deletePortfolioProject,
  isPortfolioStoreConfigured,
  listPortfolioProjects,
  updatePortfolioProject,
} from "@/lib/portfolio-store";

export const dynamic = "force-dynamic";

async function requireAdmin() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return { status: "missing" } as const;

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) return { status: "unauthorized" } as const;
  if (!isAdminUser(user)) return { status: "forbidden" } as const;

  const { data: mfaData, error: mfaError } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
  if (mfaError || mfaData?.currentLevel !== "aal2") return { status: "mfa" } as const;

  return { status: "ok", user } as const;
}

function guard(status: string) {
  if (status === "missing") {
    return NextResponse.json({ error: "Configuration Supabase Auth manquante" }, { status: 503 });
  }
  if (status === "unauthorized") {
    return NextResponse.json({ error: "Non autorise" }, { status: 401 });
  }
  if (status === "forbidden") {
    return NextResponse.json({ error: "Acces interdit" }, { status: 403 });
  }
  if (status === "mfa") {
    return NextResponse.json({ error: "MFA requise" }, { status: 403 });
  }
  return null;
}

function cleanText(value: unknown, max = 2000): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, max);
}

function cleanDate(value: unknown): string | null {
  if (typeof value !== "string" || !value.trim()) return null;
  return /^\d{4}-\d{2}-\d{2}$/.test(value.trim()) ? value.trim() : null;
}

export async function GET() {
  if (!isPortfolioStoreConfigured()) {
    return NextResponse.json({ error: "Configuration Supabase manquante" }, { status: 503 });
  }
  const admin = await requireAdmin();
  const blocked = guard(admin.status);
  if (blocked) return blocked;

  try {
    const items = await listPortfolioProjects();
    return NextResponse.json({ items });
  } catch (error) {
    console.error("[api/admin/portfolio] GET failed", error);
    return NextResponse.json({ error: "Erreur de lecture" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!isPortfolioStoreConfigured()) {
    return NextResponse.json({ error: "Configuration Supabase manquante" }, { status: 503 });
  }
  const admin = await requireAdmin();
  const blocked = guard(admin.status);
  if (blocked) return blocked;

  try {
    const body = await request.json().catch(() => ({}));
    const client = cleanText(body?.client, 200);
    if (!client) {
      return NextResponse.json({ error: "Nom du client requis" }, { status: 400 });
    }

    const category = isPortfolioCategory(body?.category) ? body.category : "site";
    const status = isPortfolioStatus(body?.status) ? body.status : "livre";

    const project: Omit<PortfolioProject, "id" | "createdAt" | "updatedAt"> = {
      client,
      url: cleanText(body?.url, 500),
      category,
      summary: cleanText(body?.summary, 2000),
      priceEur: parseEurAmount(body?.priceEur),
      status,
      deliveredOn: cleanDate(body?.deliveredOn),
      paidOn: cleanDate(body?.paidOn),
      notes: cleanText(body?.notes, 2000),
    };

    const created = await createPortfolioProject(project);
    return NextResponse.json({ item: created }, { status: 201 });
  } catch (error) {
    console.error("[api/admin/portfolio] POST failed", error);
    return NextResponse.json({ error: "Erreur d'enregistrement" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  if (!isPortfolioStoreConfigured()) {
    return NextResponse.json({ error: "Configuration Supabase manquante" }, { status: 503 });
  }
  const admin = await requireAdmin();
  const blocked = guard(admin.status);
  if (blocked) return blocked;

  try {
    const body = await request.json().catch(() => ({}));
    const id = cleanText(body?.id, 64);
    if (!id) {
      return NextResponse.json({ error: "Identifiant requis" }, { status: 400 });
    }

    const patch: Partial<PortfolioProject> = {};
    if ("client" in body) {
      const client = cleanText(body.client, 200);
      if (!client) return NextResponse.json({ error: "Nom du client invalide" }, { status: 400 });
      patch.client = client;
    }
    if ("url" in body) patch.url = cleanText(body.url, 500);
    if ("summary" in body) patch.summary = cleanText(body.summary, 2000);
    if ("notes" in body) patch.notes = cleanText(body.notes, 2000);
    if ("deliveredOn" in body) patch.deliveredOn = cleanDate(body.deliveredOn);
    if ("paidOn" in body) patch.paidOn = cleanDate(body.paidOn);
    if ("priceEur" in body) patch.priceEur = parseEurAmount(body.priceEur);
    if ("category" in body) {
      if (!isPortfolioCategory(body.category)) {
        return NextResponse.json({ error: "Catégorie invalide" }, { status: 400 });
      }
      patch.category = body.category;
    }
    if ("status" in body) {
      if (!isPortfolioStatus(body.status)) {
        return NextResponse.json({ error: "Statut invalide" }, { status: 400 });
      }
      patch.status = body.status;
    }

    if (Object.keys(patch).length === 0) {
      return NextResponse.json({ error: "Aucune modification" }, { status: 400 });
    }

    const updated = await updatePortfolioProject(id, patch);
    return NextResponse.json({ item: updated });
  } catch (error) {
    console.error("[api/admin/portfolio] PATCH failed", error);
    return NextResponse.json({ error: "Erreur de mise à jour" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!isPortfolioStoreConfigured()) {
    return NextResponse.json({ error: "Configuration Supabase manquante" }, { status: 503 });
  }
  const admin = await requireAdmin();
  const blocked = guard(admin.status);
  if (blocked) return blocked;

  try {
    const body = await request.json().catch(() => ({}));
    const id = cleanText(body?.id, 64);
    if (!id) {
      return NextResponse.json({ error: "Identifiant requis" }, { status: 400 });
    }
    await deletePortfolioProject(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[api/admin/portfolio] DELETE failed", error);
    return NextResponse.json({ error: "Erreur de suppression" }, { status: 500 });
  }
}
