import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isAdminUser } from "@/lib/auth";
import { auditWebsite } from "@/lib/agents/website-auditor";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

async function requireAdmin(): Promise<boolean> {
  try {
    const supabase = await createSupabaseServerClient();
    if (!supabase) return false;
    const { data: { user } } = await supabase.auth.getUser();
    return Boolean(user && isAdminUser(user));
  } catch { return false; }
}

export async function POST(req: NextRequest) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  if (!url || !key) {
    return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
  }

  const body = await req.json().catch(() => ({})) as { limit?: number; status?: string };
  const limit = Math.min(body.limit ?? 5, 20);
  const filterStatus = body.status ?? "replied";

  const supabase = createClient(url, key);

  const { data: prospects, error } = await supabase
    .from("prospects")
    .select("id, website, businessName, language, email")
    .eq("status", filterStatus)
    .filter("audit->>'score'", "eq", "10")
    .limit(limit);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!prospects || prospects.length === 0) {
    return NextResponse.json({ message: "No prospects to re-audit", updated: 0 });
  }

  let updated = 0;
  const results: Array<{ id: string; website: string; oldScore: number; newScore: number | null; error?: string }> = [];

  for (const p of prospects) {
    try {
      const lead = {
        businessName: p.businessName ?? "",
        website: p.website ?? "",
        address: "",
        country: "",
        language: p.language ?? "fr",
        sector: "",
        placeId: "",
        email: p.email ?? null,
        phone: null,
      };

      const audit = await auditWebsite(lead);
      if (!audit) {
        results.push({ id: p.id, website: p.website, oldScore: 10, newScore: null, error: "audit returned null" });
        continue;
      }

      await supabase
        .from("prospects")
        .update({
          audit: {
            score: audit.score,
            problems: audit.problems,
            recommendations: audit.recommendations,
            estimatedPrice: audit.estimatedPrice,
            priceRange: audit.priceRange,
            language: audit.language,
            summary: (audit as Record<string, unknown>).summary,
          },
          screenshotUrl: audit.screenshotUrl ?? null,
        })
        .eq("id", p.id);

      results.push({ id: p.id, website: p.website, oldScore: 10, newScore: audit.score });
      updated++;
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      results.push({ id: p.id, website: p.website, oldScore: 10, newScore: null, error: msg.slice(0, 100) });
    }
  }

  return NextResponse.json({ updated, total: prospects.length, results });
}
