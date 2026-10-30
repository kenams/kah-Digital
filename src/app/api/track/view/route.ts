import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { classifyPath, isTrackablePath } from "@/lib/page-view";
import { getRequestIp, rateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase =
  supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } }) : null;

const BOT = /bot|crawl|spider|slurp|headless|lighthouse|pagespeed|preview|monitor|uptime|curl|wget|python|axios|node-fetch/i;

// Mesure d'audience sans cookie ni adresse IP stockée : chemin, langue, rubrique, site d'origine, type d'appareil.
export async function POST(request: Request) {
  const rate = rateLimit(`pv:${getRequestIp(request)}`, { windowMs: 60 * 1000, max: 90 });
  if (!rate.allowed) return new NextResponse(null, { status: 429 });

  const ua = request.headers.get("user-agent") ?? "";
  if (!ua || BOT.test(ua) || !supabase) return new NextResponse(null, { status: 204 });

  let body: { path?: unknown; service?: unknown; referrer?: unknown };
  try {
    const text = await request.text();
    if (text.length > 1000) return new NextResponse(null, { status: 413 });
    body = JSON.parse(text);
  } catch {
    return new NextResponse(null, { status: 400 });
  }

  const path = typeof body.path === "string" ? body.path.split("?")[0].split("#")[0] : "";
  if (!isTrackablePath(path)) return new NextResponse(null, { status: 204 });

  const { locale, section } = classifyPath(path);
  const cyberCta = section === "devis" && body.service === "cyber";

  let referrerHost: string | null = null;
  if (typeof body.referrer === "string" && body.referrer) {
    try {
      const host = new URL(body.referrer).hostname.replace(/^www\./, "");
      if (host && host !== "kah-digital.ch" && !host.endsWith(".vercel.app")) referrerHost = host.slice(0, 80);
    } catch {
      /* référent illisible : ignoré */
    }
  }

  const { error } = await supabase.from("site_page_views").insert({
    path,
    locale,
    section,
    referrer_host: referrerHost,
    cyber_cta: cyberCta,
    device: /mobile|iphone|android/i.test(ua) ? "mobile" : "desktop",
  });
  if (error) console.warn("[track/view]", error.message);
  return new NextResponse(null, { status: 204 });
}
