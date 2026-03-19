import { NextResponse } from "next/server";
import { getRecentAssistantRecords } from "@/lib/assistant-store";
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

async function requireAdmin() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return { status: "missing" } as const;
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return { status: "unauthorized" } as const;
  }

  if (!isAdminUser(user)) {
    return { status: "forbidden" } as const;
  }

  const { data: mfaData, error: mfaError } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
  if (mfaError || mfaData?.currentLevel !== "aal2") {
    return { status: "mfa" } as const;
  }

  return { status: "ok", user } as const;
}

export async function GET() {
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
    const items = await getRecentAssistantRecords();
    return NextResponse.json({ items });
  } catch (error) {
    console.error("[api/admin/assistant] Failed to fetch assistant items", error);
    return NextResponse.json({ error: "Erreur de lecture des demandes assistant" }, { status: 500 });
  }
}
