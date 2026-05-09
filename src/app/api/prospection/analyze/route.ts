import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { auditWebsite } from "@/lib/prospection";
import { isAdminUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(url, key);
}

async function requireAdmin(): Promise<boolean> {
  try {
    const supabaseAuth = await createSupabaseServerClient();
    if (!supabaseAuth) return false;
    const { data: { user } } = await supabaseAuth.auth.getUser();
    return Boolean(user && isAdminUser(user));
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json() as { website?: string; email?: string; businessName?: string; sector?: string };
    const { website, email, businessName, sector } = body;

    if (!website) {
      return NextResponse.json({ error: "website requis" }, { status: 400 });
    }

    const supabase = getSupabase();

    // Create prospect record
    const { data: prospect, error: insertError } = await supabase
      .from("prospects")
      .insert({
        website,
        email: email ?? null,
        businessName: businessName ?? null,
        sector: sector ?? null,
        status: "analyzing",
      })
      .select()
      .single();

    if (insertError || !prospect) {
      return NextResponse.json({ error: "Erreur création prospect" }, { status: 500 });
    }

    // Run Claude audit
    const audit = await auditWebsite(website);

    if (!audit) {
      await supabase.from("prospects").update({ status: "pending" }).eq("id", prospect.id);
      return NextResponse.json({ error: "Audit échoué" }, { status: 500 });
    }

    // Save audit + generated email
    const { data: updated } = await supabase
      .from("prospects")
      .update({
        status: "analyzed",
        businessName: businessName ?? audit.businessName,
        sector: sector ?? audit.sector,
        audit: {
          problems: audit.problems,
          recommendations: audit.recommendations,
          estimatedPrice: audit.estimatedPrice,
          priceRange: audit.priceRange,
        },
        emailSubject: audit.emailSubject,
        emailBody: audit.emailBody,
      })
      .eq("id", prospect.id)
      .select()
      .single();

    return NextResponse.json({ success: true, prospect: updated });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur inconnue";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
