export const dynamic = "force-dynamic";
import { cleanUrl } from "@/lib/clean-url";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { notifyNewLead } from "@/lib/notify";
import { UUID_RE, clip, isHttpUrl, isValidEmail } from "@/lib/html-escape";
import { getRequestIp, rateLimit } from "@/lib/rate-limit";

const SITE_URL = cleanUrl(process.env.NEXT_PUBLIC_SITE_URL) ?? "https://kah-digital.ch";

export async function POST(req: NextRequest) {
  try {
    const { prospectId, name, email, phone, businessName, siteUrl } = await req.json() as {
      prospectId?: string; name?: string; email?: string;
      phone?: string; businessName?: string; siteUrl?: string;
    };

    const rate = rateLimit(`prospect-interest:${getRequestIp(req)}`, { windowMs: 60 * 60 * 1000, max: 10 });
    if (!rate.allowed) {
      return NextResponse.json({ ok: false, error: "Trop de demandes" }, { status: 429, headers: { "Retry-After": String(rate.retryAfter) } });
    }

    const safeName = clip(name, 80);
    const safeEmail = clip(email, 200).toLowerCase();
    const safePhone = clip(phone, 30);
    const safeBusiness = clip(businessName ?? siteUrl ?? "?", 120) || "?";
    const safeSite = isHttpUrl(siteUrl) ? siteUrl.trim() : "";

    if (!safeName || !isValidEmail(safeEmail)) {
      return NextResponse.json({ ok: false, error: "name + email requis" }, { status: 400 });
    }
    if (prospectId && !UUID_RE.test(prospectId)) {
      return NextResponse.json({ ok: false, error: "prospectId invalide" }, { status: 400 });
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
