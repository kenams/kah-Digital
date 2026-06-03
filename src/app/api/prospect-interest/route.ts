export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  try {
    const { prospectId, name, phone, businessName, siteUrl } = await req.json();

    // Notif email à Kenams
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "KAH Digital <noreply@kah-digital.ch>",
      to: "kahdigital42@gmail.com",
      subject: `🔥 Nouveau lead : ${businessName || siteUrl}`,
      html: `
        <h2>Nouveau prospect intéressé</h2>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Téléphone :</strong> ${phone}</p>
        <p><strong>Entreprise :</strong> ${businessName || "—"}</p>
        <p><strong>Site :</strong> <a href="${siteUrl}">${siteUrl}</a></p>
        <p><strong>ID prospect :</strong> ${prospectId}</p>
        <hr/>
        <p><a href="https://wa.me/${phone?.replace(/[^0-9]/g, "")}">Ouvrir WhatsApp →</a></p>
      `,
    });

    // Mise à jour Supabase
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    await supabase.from("prospects").update({
      status: "hot_lead",
      draftReply: `Contact express: ${name} — ${phone}`,
    }).eq("id", prospectId);

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("[prospect-interest]", err.message);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
