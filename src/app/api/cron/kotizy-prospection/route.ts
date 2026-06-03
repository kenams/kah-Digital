export const dynamic = "force-dynamic";
export const maxDuration = 300;

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const TARGETS = [
  // Associations tontine / diaspora africaine en France
  { query: "association tontine africaine paris site web contact", country: "FR", lang: "fr" },
  { query: "association diaspora africaine lyon site web contact", country: "FR", lang: "fr" },
  { query: "tontine africaine marseille association contact", country: "FR", lang: "fr" },
  { query: "association communauté africaine bordeaux contact", country: "FR", lang: "fr" },
  { query: "groupe tontine nantaise diaspora contact email", country: "FR", lang: "fr" },
  { query: "association ivoirienne france site web contact", country: "FR", lang: "fr" },
  { query: "association sénégalaise france contact email", country: "FR", lang: "fr" },
  { query: "association camerounaise france paris contact", country: "FR", lang: "fr" },
  { query: "association malienne france site web contact", country: "FR", lang: "fr" },
  { query: "mutuelle africaine solidarité france contact", country: "FR", lang: "fr" },
  // Suisse
  { query: "association africaine lausanne geneve contact", country: "CH", lang: "fr" },
  { query: "diaspora africaine suisse association tontine", country: "CH", lang: "fr" },
  { query: "communauté ivoirienne suisse contact association", country: "CH", lang: "fr" },
  // Belgique
  { query: "association tontine africaine bruxelles contact", country: "BE", lang: "fr" },
  { query: "diaspora africaine belgique association contact email", country: "BE", lang: "fr" },
  // Côte d'Ivoire
  { query: "tontine digitale application epargne groupe côte d'ivoire", country: "CI", lang: "fr" },
  { query: "association tontine abidjan contact fintech", country: "CI", lang: "fr" },
  // Sénégal
  { query: "tontine sénégal groupement épargne contact email", country: "SN", lang: "fr" },
  // Cameroun
  { query: "njangi cameroun application épargne groupe contact", country: "CM", lang: "fr" },
];

const EMAIL_TEMPLATE = (target: string) => `
<p>Bonjour,</p>
<p>Je me permets de vous contacter au sujet de <strong>Kotizy</strong>, une application de <strong>tontine digitale</strong> qui permet à votre communauté de gérer ses épargnes collectives simplement et en toute sécurité.</p>
<p>Avec Kotizy, votre groupe peut :</p>
<ul>
  <li>💰 Gérer les cycles de tontine en ligne (paiements automatiques)</li>
  <li>📊 Suivre les soldes en temps réel depuis le téléphone</li>
  <li>🔒 Sécuriser les fonds avec paiement intégré</li>
  <li>📱 Fonctionner sur iOS et Android</li>
</ul>
<p>Kotizy est déjà utilisé par des associations en France, Suisse et Belgique.</p>
<p><strong>Essai gratuit disponible</strong> — je vous propose une démonstration de 15 minutes à votre convenance.</p>
<p>Intéressé(e) ? Répondez à cet email ou écrivez-nous sur WhatsApp : <a href="https://wa.me/33759558414?text=Bonjour, je suis intéressé par Kotizy pour notre association">+33 7 59 55 84 14</a></p>
<p>Cordialement,<br/>L'équipe Kotizy<br/><a href="https://tontineapp-web.vercel.app">tontineapp-web.vercel.app</a></p>
`;

export async function GET(req: NextRequest) {
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  const resend = new Resend(process.env.RESEND_API_KEY);

  let sent = 0;
  const errors: string[] = [];

  for (const target of TARGETS.slice(0, 8)) {
    try {
      // Chercher des prospects via DuckDuckGo
      const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(target.query)}&format=json&no_redirect=1`;
      const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (compatible; Kotizy-Scout/1.0)" } });
      const data = await res.json().catch(() => null);
      if (!data?.RelatedTopics?.length) continue;

      for (const topic of data.RelatedTopics.slice(0, 2)) {
        const text = topic.Text ?? "";
        const emailMatch = text.match(/[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}/);
        if (!emailMatch) continue;
        const email = emailMatch[0];

        // Vérifier si déjà contacté
        const { data: existing } = await supabase
          .from("kah_support_prospects")
          .select("id")
          .eq("email", email)
          .single();
        if (existing) continue;

        await resend.emails.send({
          from: "Kotizy <noreply@kah-digital.ch>",
          to: email,
          subject: "Gérez votre tontine en ligne — Kotizy",
          html: EMAIL_TEMPLATE(text.slice(0, 50)),
        });

        await supabase.from("kah_support_prospects").insert({
          email,
          businessName: text.slice(0, 80),
          country: target.country,
          language: target.lang,
          sentAt: new Date().toISOString(),
          service: "kotizy",
        });

        sent++;
        await new Promise(r => setTimeout(r, 500));
        if (sent >= 8) break;
      }
      if (sent >= 8) break;
    } catch (err: any) {
      errors.push(err.message);
    }
  }

  return NextResponse.json({ ok: true, sent, errors: errors.length });
}
