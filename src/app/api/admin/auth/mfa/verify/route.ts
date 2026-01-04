import { NextRequest, NextResponse } from "next/server";
import { isAdminUser } from "@/lib/auth";
import { applySupabaseCookies, createSupabaseRouteClient } from "@/lib/supabase/route-client";

export async function POST(request: NextRequest) {
  const response = NextResponse.next();
  const supabase = createSupabaseRouteClient(request, response);
  if (!supabase) {
    return NextResponse.json({ error: "Configuration Supabase Auth manquante" }, { status: 503 });
  }

  const body = await request.json().catch(() => ({}));
  const factorId = typeof body?.factorId === "string" ? body.factorId.trim() : "";
  const code = typeof body?.code === "string" ? body.code.trim() : "";

  if (!factorId || !code) {
    return NextResponse.json({ error: "Parametres invalides" }, { status: 400 });
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    const json = NextResponse.json({ error: "Non autorise" }, { status: 401 });
    applySupabaseCookies(response, json);
    return json;
  }

  if (!isAdminUser(user)) {
    const json = NextResponse.json({ error: "Acces interdit" }, { status: 403 });
    applySupabaseCookies(response, json);
    return json;
  }

  const { error: verifyError } = await supabase.auth.mfa.challengeAndVerify({
    factorId,
    code,
  });

  if (verifyError) {
    const json = NextResponse.json({ error: "Code MFA invalide" }, { status: 400 });
    applySupabaseCookies(response, json);
    return json;
  }

  const json = NextResponse.json({ ok: true }, { status: 200 });
  applySupabaseCookies(response, json);
  return json;
}
