import { NextRequest, NextResponse } from "next/server";
import { isAdminUser } from "@/lib/auth";
import { applySupabaseCookies, createSupabaseRouteClient } from "@/lib/supabase/route-client";

export async function GET(request: NextRequest) {
  const response = NextResponse.next();
  const supabase = createSupabaseRouteClient(request, response);
  if (!supabase) {
    return NextResponse.json({ isAdmin: false, mfaActive: false }, { status: 200 });
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    const json = NextResponse.json({ isAdmin: false, mfaActive: false }, { status: 200 });
    applySupabaseCookies(response, json);
    return json;
  }

  const isAdmin = isAdminUser(user);
  if (!isAdmin) {
    const json = NextResponse.json({ isAdmin: false, mfaActive: false }, { status: 200 });
    applySupabaseCookies(response, json);
    return json;
  }

  const { data: mfaData, error: mfaError } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
  const mfaActive = !mfaError && mfaData?.currentLevel === "aal2";

  const json = NextResponse.json({ isAdmin: true, mfaActive }, { status: 200 });
  applySupabaseCookies(response, json);
  return json;
}
