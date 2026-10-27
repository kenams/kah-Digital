import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { isScannerClick } from "@/lib/prospection-safety";
import { createHmac, timingSafeEqual } from "crypto";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}

async function verifySignature(req: NextRequest, rawBody: string): Promise<boolean> {
  const secret = process.env.RESEND_WEBHOOK_SECRET;
  if (!secret) return false; // échec fermé : sans secret configuré, aucun webhook n'est accepté

  const svixId        = req.headers.get("svix-id");
  const svixTimestamp = req.headers.get("svix-timestamp");
  const svixSignature = req.headers.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) return false;

  // Rejette les webhooks de plus de 5 minutes
  const ts = parseInt(svixTimestamp, 10);
  if (Math.abs(Date.now() / 1000 - ts) > 300) return false;

  const signedContent = `${svixId}.${svixTimestamp}.${rawBody}`;
  const secretBytes = Buffer.from(secret.replace(/^whsec_/, ""), "base64");
  const computed = createHmac("sha256", secretBytes).update(signedContent).digest("base64");

  // svix-signature peut contenir plusieurs sigs "v1,xxx v1,yyy"
  const signatures = svixSignature.split(" ").map((s) => s.replace(/^v1,/, ""));
  return signatures.some((sig) => {
    try {
      return timingSafeEqual(Buffer.from(computed), Buffer.from(sig));
    } catch {
      return false;
    }
  });
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text();

  if (!(await verifySignature(req, rawBody))) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  const supabase = getSupabase();

  try {
    const body = JSON.parse(rawBody) as { type?: string; data?: { tags?: Record<string, string>; to?: string[] } };
    const { type, data } = body;

    const prospectId = data?.tags?.prospect_id;
    if (!prospectId || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(prospectId)) return NextResponse.json({ ok: true });

    if (type === "email.bounced" || type === "email.complained") {
      await supabase.from("prospects").update({ status: "rejected", bouncedAt: new Date().toISOString() }).eq("id", prospectId);
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
        .select("clickedAt, sentAt, followup1SentAt, followup2SentAt, followup3SentAt")
        .eq("id", prospectId)
        .single();
      // Les filtres anti-spam cliquent dans les secondes qui suivent la réception : pas un humain.
      const tooFast = isScannerClick(Date.now(), [existing?.sentAt, existing?.followup1SentAt, existing?.followup2SentAt, existing?.followup3SentAt]);
      if (!existing?.clickedAt && !tooFast) {
        await supabase
          .from("prospects")
          .update({ clickedAt: new Date().toISOString() })
          .eq("id", prospectId);
      }
    }

    return NextResponse.json({ ok: true, type });
  } catch (err) {
    console.error("Resend webhook error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
