import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}

export async function POST(req: NextRequest) {
  const supabase = getSupabase();

  try {
    const body = await req.json() as { type?: string; data?: { tags?: Record<string, string>; to?: string[] } };
    const { type, data } = body;

    const prospectId = data?.tags?.prospect_id;
    if (!prospectId) return NextResponse.json({ ok: true });

    if (type === "email.bounced" || type === "email.complained") {
      await supabase.from("prospects").update({ status: "rejected" }).eq("id", prospectId);
    }

    if (type === "email.opened") {
      const { data: existing } = await supabase
        .from("prospects")
        .select("openedAt")
        .eq("id", prospectId)
        .single();
      if (!existing?.openedAt) {
        await supabase
          .from("prospects")
          .update({ openedAt: new Date().toISOString() })
          .eq("id", prospectId);
      }
    }

    if (type === "email.clicked") {
      const { data: existing } = await supabase
        .from("prospects")
        .select("clickedAt")
        .eq("id", prospectId)
        .single();
      if (!existing?.clickedAt) {
        await supabase
          .from("prospects")
          .update({ clickedAt: new Date().toISOString(), status: "replied" })
          .eq("id", prospectId);
      }
    }

    return NextResponse.json({ ok: true, type });
  } catch (err) {
    console.error("Resend webhook error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
