import { NextRequest, NextResponse } from "next/server";
import { getRecentQuotes, isSupabaseConfigured, updateQuoteStatus } from "@/lib/quote-store";

export const dynamic = "force-dynamic";

const adminUser = process.env.ADMIN_BASIC_USER;
const adminPass = process.env.ADMIN_BASIC_PASSWORD;

function missingConfigResponse() {
  return NextResponse.json({ error: "Configuration admin manquante" }, { status: 503 });
}

function unauthorizedResponse() {
  return NextResponse.json({ error: "Non autorise" }, { status: 401 });
}

function parseBasicAuth(authHeader: string | null) {
  if (!authHeader || !authHeader.startsWith("Basic ")) {
    return null;
  }

  try {
    const decoded = Buffer.from(authHeader.replace("Basic ", ""), "base64").toString("utf-8");
    const separatorIndex = decoded.indexOf(":");
    if (separatorIndex === -1) {
      return null;
    }
    return {
      user: decoded.slice(0, separatorIndex),
      pass: decoded.slice(separatorIndex + 1),
    };
  } catch (error) {
    console.error("[api/admin/quotes] Failed to decode Basic auth header", error);
    return null;
  }
}

const feasibilityValues = new Set(["pending", "feasible", "blocked"]);
const depositValues = new Set(["none", "deposit", "servers"]);

export async function GET(request: NextRequest) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "Configuration Supabase manquante" }, { status: 503 });
  }

  if (!adminUser || !adminPass) {
    return missingConfigResponse();
  }

  const credentials = parseBasicAuth(request.headers.get("authorization"));
  if (!credentials || credentials.user !== adminUser || credentials.pass !== adminPass) {
    return unauthorizedResponse();
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

  if (!adminUser || !adminPass) {
    return missingConfigResponse();
  }

  const credentials = parseBasicAuth(request.headers.get("authorization"));
  if (!credentials || credentials.user !== adminUser || credentials.pass !== adminPass) {
    return unauthorizedResponse();
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
