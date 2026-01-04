import { NextRequest, NextResponse } from "next/server";
import { applySupabaseCookies, createSupabaseRouteClient } from "@/lib/supabase/route-client";

export async function POST(request: NextRequest) {
  const response = NextResponse.next();
  const supabase = createSupabaseRouteClient(request, response);
  if (!supabase) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  await supabase.auth.signOut();

  const json = NextResponse.json({ ok: true }, { status: 200 });
  applySupabaseCookies(response, json);
  return json;
}
