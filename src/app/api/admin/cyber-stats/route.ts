import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isAdminUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const db = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey, { auth: { persistSession: false } }) : null;

type ViewRow = { created_at: string; path: string; locale: string; section: string; referrer_host: string | null; cyber_cta: boolean; device: string | null };

async function requireAdmin() {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return "missing" as const;
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) return "unauthorized" as const;
  if (!isAdminUser(user)) return "forbidden" as const;
  const { data: mfa, error: mfaError } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
  if (mfaError || mfa?.currentLevel !== "aal2") return "mfa" as const;
  return "ok" as const;
}

async function fetchViews(sinceIso: string): Promise<ViewRow[]> {
  if (!db) return [];
  const rows: ViewRow[] = [];
  for (let page = 0; page < 60; page += 1) {
    const { data, error } = await db
      .from("site_page_views")
      .select("created_at,path,locale,section,referrer_host,cyber_cta,device")
      .gte("created_at", sinceIso)
      .order("created_at", { ascending: true })
      .range(page * 1000, page * 1000 + 999);
    if (error || !data) break;
    rows.push(...(data as ViewRow[]));
    if (data.length < 1000) break;
  }
  return rows;
}

function top(map: Map<string, number>, n: number) {
  return [...map.entries()].sort((a, b) => b[1] - a[1]).slice(0, n);
}

export async function GET(request: NextRequest) {
  const access = await requireAdmin();
  if (access === "missing") return NextResponse.json({ error: "Configuration Supabase Auth manquante" }, { status: 503 });
  if (access === "unauthorized") return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  if (access === "forbidden") return NextResponse.json({ error: "Accès interdit" }, { status: 403 });
  if (access === "mfa") return NextResponse.json({ error: "MFA requise" }, { status: 403 });
  if (!db) return NextResponse.json({ error: "Base de données non configurée" }, { status: 503 });

  const daysParam = Number(request.nextUrl.searchParams.get("days") ?? "30");
  const days = [7, 30, 90].includes(daysParam) ? daysParam : 30;
  const now = Date.now();
  const since = new Date(now - days * 86400000);
  const prevSince = new Date(now - 2 * days * 86400000);

  const all = await fetchViews(prevSince.toISOString());
  const current = all.filter((r) => new Date(r.created_at) >= since);
  const previous = all.filter((r) => new Date(r.created_at) < since);

  const cyber = current.filter((r) => r.section === "cyber");
  const cyberPrev = previous.filter((r) => r.section === "cyber");
  const ctaArrivals = current.filter((r) => r.cyber_cta).length;

  const byLocale = { fr: 0, en: 0, de: 0 } as Record<string, number>;
  const pages = new Map<string, number>();
  const referrers = new Map<string, number>();
  const devices = { mobile: 0, desktop: 0 } as Record<string, number>;
  for (const r of cyber) {
    byLocale[r.locale] = (byLocale[r.locale] ?? 0) + 1;
    pages.set(r.path, (pages.get(r.path) ?? 0) + 1);
    referrers.set(r.referrer_host ?? "Accès direct / inconnu", (referrers.get(r.referrer_host ?? "Accès direct / inconnu") ?? 0) + 1);
    if (r.device) devices[r.device] = (devices[r.device] ?? 0) + 1;
  }

  const daily: Array<{ date: string; cyber: number; site: number }> = [];
  const dayIndex = new Map<string, number>();
  for (let i = days - 1; i >= 0; i -= 1) {
    const date = new Date(now - i * 86400000).toISOString().slice(0, 10);
    dayIndex.set(date, daily.length);
    daily.push({ date, cyber: 0, site: 0 });
  }
  for (const r of current) {
    const idx = dayIndex.get(r.created_at.slice(0, 10));
    if (idx === undefined) continue;
    daily[idx].site += 1;
    if (r.section === "cyber") daily[idx].cyber += 1;
  }

  // Demandes de devis cyber (hors tests internes) et prospects web déjà en base dans les métiers visés par l'offre cyber.
  const { data: leadRows } = await db
    .from("quotes")
    .select("submittedAt,name,companyName,projectType")
    .ilike("projectType", "%cyber%")
    .not("name", "ilike", "TEST%")
    .gte("submittedAt", since.toISOString())
    .order("submittedAt", { ascending: false })
    .limit(50);

  const crossSell: Record<string, number> = {};
  for (const sector of ["avocat", "notaire", "comptable"]) {
    const { count } = await db.from("prospects").select("id", { count: "exact", head: true }).eq("sector", sector);
    crossSell[sector] = count ?? 0;
  }

  return NextResponse.json({
    days,
    totals: {
      cyberViews: cyber.length,
      cyberViewsPrevious: cyberPrev.length,
      siteViews: current.length,
      ctaArrivals,
      leads: leadRows?.length ?? 0,
    },
    byLocale,
    devices,
    daily,
    topPages: top(pages, 8).map(([path, count]) => ({ path, count })),
    referrers: top(referrers, 8).map(([host, count]) => ({ host, count })),
    leads: (leadRows ?? []).slice(0, 5),
    crossSell,
    trackingStartedAt: all[0]?.created_at ?? null,
  });
}
