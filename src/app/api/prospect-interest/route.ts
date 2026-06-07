export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { notifyNewLead } from "@/lib/notify";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kah-digital.ch";

export async function POST(req: NextRequest) {
  try {
    const { prospectId, name, email, phone, businessName, siteUrl } = await req.json() as {
      prospectId?: string; name?: string; email?: string;
      phone?: string; businessName?: string; siteUrl?: string;
    };

    const safeName = (name ?? "").trim();
    const safeEmail = (email ?? "").trim();
    const safePhone = (phone ?? "").trim();
    const safeBusiness = (businessName ?? siteUrl ?? "?").trim();
    const safeSite = (siteUrl ?? "").trim();

    if (!safeName || !safeEmail) {
      return NextResponse.json({ ok: false, error: "name + email requis" }, { status: 400 });
    }

    // Notif Telegram + Email (centralisé)
    await notifyNewLead({
      businessName: safeBusiness,
      name: safeName,
      email: safeEmail,
      phone: safePhone || undefined,
      siteUrl: safeSite || undefined,
      prospectPageUrl: prospectId ? `${SITE_URL}/p/${prospectId}` : undefined,
    });

    // Supabase — marquer hot_lead + repliedAt
    if (prospectId) {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      );
      await supabase.from("prospects").update({
        status: "replied",
        repliedAt: new Date().toISOString(),
        draftReply: `HOT LEAD: ${safeName} — ${safeEmail}${safePhone ? ` / ${safePhone}` : ""}`,
      }).eq("id", prospectId);
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    console.error("[prospect-interest]", err instanceof Error ? err.message : String(err));
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
