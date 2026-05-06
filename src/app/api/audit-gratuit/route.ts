import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { auditWebsite } from "@/lib/agents/website-auditor";
import { composeProspectingEmail } from "@/lib/agents/email-composer";
import { Resend } from "resend";
import { getResendFromAddress } from "@/lib/mail";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export async function POST(req: Request) {
  try {
    const { businessName, website, email, phone } = await req.json() as {
      businessName?: string; website?: string; email: string; phone?: string;
    };

    if (!email) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://kah-digital.ch").trim();
    const supabase = getSupabase();

    // Vérifie si déjà prospecté
    const { data: existing } = await supabase
      .from("prospects")
      .select("id")
      .eq("email", email)
      .single();

    if (existing) {
      return NextResponse.json({ ok: true, message: "Already queued" });
    }

    const siteWebsite = website?.trim() || null;

    // Insert prospect avec statut "inbound"
    const { data: inserted } = await supabase
      .from("prospects")
      .insert({
        businessName: businessName || null,
        website: siteWebsite,
        email,
        phone: phone || null,
        status: siteWebsite ? "inbound" : "no-website",
        language: "fr",
        country: "FR",
        sentAt: new Date().toISOString(),
      })
      .select("id")
      .single();

    if (!inserted) {
      return NextResponse.json({ error: "DB error" }, { status: 500 });
    }

    const prospectId = inserted.id;

    // Si pas de site web, on stocke juste le lead et on notifie
    if (!siteWebsite) {
      return NextResponse.json({ ok: true });
    }

    // Lance l'audit en background (fire & forget)
    void (async () => {
      try {
        const lead = {
          businessName: businessName || siteWebsite,
          website: siteWebsite,
          address: "FR",
          country: "FR",
          language: "fr",
          sector: "inbound",
          placeId: prospectId,
          email,
          phone: phone || null,
          emailGuessed: false,
        };

        const audit = await auditWebsite(lead);
        if (!audit) return;

        await supabase.from("prospects").update({ audit, sector: audit.sector }).eq("id", prospectId);

        const composed = await composeProspectingEmail(lead, audit, siteUrl, prospectId);

        const resend = new Resend(process.env.RESEND_API_KEY!);
        await resend.emails.send({
          from: getResendFromAddress(),
          to: email,
          replyTo: "kahdigital42@gmail.com",
          subject: composed.subject,
          html: composed.html,
          text: composed.textFallback,
          tags: [{ name: "prospect_id", value: prospectId }],
        });

        await supabase.from("prospects").update({ status: "sent", emailSubject: composed.subject }).eq("id", prospectId);
      } catch (err) {
        console.error("[audit-gratuit:background]", err);
      }
    })();

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
