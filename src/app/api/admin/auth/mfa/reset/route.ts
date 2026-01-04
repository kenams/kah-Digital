import { NextRequest, NextResponse } from "next/server";
import { isAdminUser } from "@/lib/auth";
import { applySupabaseCookies, createSupabaseRouteClient } from "@/lib/supabase/route-client";

export async function POST(request: NextRequest) {
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

  const { data, error: listError } = await supabase.auth.mfa.listFactors();
  if (listError) {
    const json = NextResponse.json({ error: "Impossible de charger les facteurs MFA." }, { status: 500 });
    applySupabaseCookies(response, json);
    return json;
  }

  const factors = data?.totp ?? [];
  for (const factor of factors) {
    const { error: unenrollError } = await supabase.auth.mfa.unenroll({ factorId: factor.id });
    if (unenrollError) {
      const json = NextResponse.json({ error: "Erreur pendant la reinitialisation MFA." }, { status: 500 });
      applySupabaseCookies(response, json);
      return json;
    }
  }

  await supabase.auth.signOut();

  const json = NextResponse.json({ ok: true }, { status: 200 });
  applySupabaseCookies(response, json);
  return json;
}
