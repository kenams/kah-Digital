import { NextRequest, NextResponse } from "next/server";
import { isAdminUser } from "@/lib/auth";
import { applySupabaseCookies, createSupabaseRouteClient } from "@/lib/supabase/route-client";

export async function GET(request: NextRequest) {
  const response = NextResponse.next();
  const supabase = createSupabaseRouteClient(request, response);
  if (!supabase) {
    return NextResponse.json({ error: "Configuration Supabase Auth manquante" }, { status: 503 });
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

  const { data: mfaData, error: mfaError } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
  if (!mfaError && mfaData?.currentLevel === "aal2") {
    const json = NextResponse.json({ status: "active" }, { status: 200 });
    applySupabaseCookies(response, json);
    return json;
  }

  const { data: factorsData, error: factorsError } = await supabase.auth.mfa.listFactors();
  if (factorsError) {
    const json = NextResponse.json({ error: "Impossible de charger les facteurs MFA." }, { status: 500 });
    applySupabaseCookies(response, json);
    return json;
  }

  const totpFactor = factorsData?.totp?.[0] ?? null;
  if (totpFactor) {
    const json = NextResponse.json({ status: "verify", factorId: totpFactor.id }, { status: 200 });
    applySupabaseCookies(response, json);
    return json;
  }

  // No MFA factor enrolled — accept AAL1, admin can re-enroll MFA from the dashboard
  const json = NextResponse.json({ status: "active" }, { status: 200 });
  applySupabaseCookies(response, json);
  return json;
}
