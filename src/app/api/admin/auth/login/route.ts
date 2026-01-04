import { NextRequest, NextResponse } from "next/server";
import { isAdminUser } from "@/lib/auth";
import { getRequestIp, rateLimit } from "@/lib/rate-limit";
import { applySupabaseCookies, createSupabaseRouteClient } from "@/lib/supabase/route-client";

const LOGIN_RATE_LIMIT = { windowMs: 10 * 60 * 1000, max: 6 };

export async function POST(request: NextRequest) {
  const response = NextResponse.next();
  const supabase = createSupabaseRouteClient(request, response);
  if (!supabase) {
    return NextResponse.json({ error: "Configuration Supabase Auth manquante" }, { status: 503 });
  }

  const body = await request.json().catch(() => ({}));
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!email || !password) {
    return NextResponse.json({ error: "Parametres invalides" }, { status: 400 });
  }

  const ip = getRequestIp(request);
  const limit = rateLimit(`admin-login:${ip}:${email.toLowerCase()}`, LOGIN_RATE_LIMIT);
  if (!limit.allowed) {
    const json = NextResponse.json(
      { error: "Trop de tentatives. Reessaie plus tard.", retryAfter: limit.retryAfter },
      { status: 429 },
    );
    json.headers.set("Retry-After", String(limit.retryAfter));
    applySupabaseCookies(response, json);
    return json;
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    const json = NextResponse.json({ error: "Identifiants invalides" }, { status: 401 });
    applySupabaseCookies(response, json);
    return json;
  }

  if (!isAdminUser(data?.user ?? null)) {
    await supabase.auth.signOut();
    const json = NextResponse.json({ error: "Compte non autorise." }, { status: 403 });
    applySupabaseCookies(response, json);
    return json;
  }

  const json = NextResponse.json({ ok: true });
  applySupabaseCookies(response, json);
  return json;
}
