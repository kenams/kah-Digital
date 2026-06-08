import { NextResponse } from "next/server";
import { sendAdminNotification } from "@/lib/gmail";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json() as {
      company?: string; site?: string; ref?: string;
      email?: string; phone?: string; budget?: string; message?: string;
    };

    const { company, site, ref, email, phone, budget, message } = body;

    if (!email && !phone) {
      return NextResponse.json({ error: "Email ou téléphone requis" }, { status: 400 });
    }

    void sendAdminNotification({
      subject: `💰 DEVIS — ${company ?? "Prospect direct"}`,
      body: `<strong style="color:#16a34a;font-size:17px;">Nouvelle demande de devis !</strong><br/><br/>
<strong>Entreprise :</strong> ${company ?? "?"}<br/>
<strong>Site :</strong> ${site ? `<a href="${site}">${site}</a>` : "?"}<br/>
<strong>Source :</strong> ${ref ?? "direct"}<br/>
<strong>Email :</strong> ${email ? `<a href="mailto:${email}">${email}</a>` : "non renseigné"}<br/>
<strong>Téléphone :</strong> ${phone ?? "non renseigné"}<br/>
<strong>Budget :</strong> ${budget || "Non précisé"}<br/>
${message ? `<br/><strong>Message :</strong><br/><div style="background:#f9fafb;border-left:3px solid #6366f1;padding:12px;margin-top:6px;border-radius:0 6px 6px 0;">${message}</div>` : ""}`,
    }).catch(console.error);

    if (email && process.env.RESEND_API_KEY) {
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "KAH Digital <contact@KAH Digital.ch>",
          to: [email],
          reply_to: ["kahdigital42@gmail.com"],
          subject: `Votre demande reçue${company ? ` — ${company}` : ""} · Réponse sous 24h`,
          html: `<div style="font-family:Arial,sans-serif;max-width:520px;color:#374151;font-size:15px;line-height:1.8;">
<p>Bonjour,</p>
<p>J'ai bien reçu votre demande concernant <strong>${company ?? "votre projet"}</strong>.</p>
<p>Je vous prépare une proposition personnalisée et reviens vers vous dans les <strong>24 heures</strong> avec tous les détails.</p>
<p>En attendant, si vous avez des questions, répondez directement à cet email — je lis tous les messages.</p>
<p style="margin-top:24px;color:#6b7280;">À très bientôt,<br/><strong style="color:#111827;">Kénan</strong><br/>KAH Digital · <a href="https://kah-digital.ch" style="color:#6366f1;">KAH Digital.ch</a></p>
</div>`,
        }),
      }).catch(console.error);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
