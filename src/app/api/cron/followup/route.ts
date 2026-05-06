/**
 * Cron Relance — J+2 (pas ouvert), J+5 (ouvert, pas répondu), J+10 (dernier contact)
 * Schedule : 09h00 et 14h00 UTC (vercel.json)
 */

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { getResendFromAddress } from "@/lib/mail";
import { isAdminUser } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

const FOLLOWUP_COPY: Record<string, {
  j1Subject: (name: string) => string;
  j1Body: (name: string, website: string, siteUrl: string, id: string) => string;
  j3Subject: (name: string) => string;
  j3Body: (name: string, website: string, siteUrl: string, id: string) => string;
  j7Subject: (name: string) => string;
  j7Body: (name: string, website: string, siteUrl: string, id: string) => string;
  j10Subject: (name: string) => string;
  j10Body: (name: string, website: string, siteUrl: string, id: string) => string;
  signoff: string;
  from: string;
  unsubscribe: string;
}> = {
  fr: {
    j1Subject: (n) => `Avez-vous eu le temps de voir ? — ${n}`,
    j1Body: (n, w, s, id) => `Bonjour,<br><br>
Je vois que vous avez ouvert mon email concernant <strong>${n}</strong>.<br><br>
J'ai préparé une <strong>page d'analyse personnalisée</strong> pour votre site — elle contient le rapport complet, les problèmes détectés, et notre proposition chiffrée.<br><br>
C'est gratuit, sans engagement, et ça prend 2 minutes à consulter :<br><br>
<a href="${s}/api/tracking/click/${id}?target=prospect_page&redirect=${encodeURIComponent(s + '/p/' + id)}" style="display:inline-block;background:linear-gradient(135deg,#1e3a8a,#7c3aed);color:#fff;padding:12px 28px;border-radius:9999px;text-decoration:none;font-weight:700;">📊 Voir mon analyse →</a><br><br>
Si vous avez une question, répondez directement à cet email — je réponds le jour même.`,
    j3Subject: (n) => `Un mot rapide — ${n}`,
    j3Body: (n, w, s, id) => `Bonjour,<br><br>
Je voulais m'assurer que mon message de l'autre jour vous est bien parvenu concernant <strong>${w}</strong>.<br><br>
En résumé : votre site présente des points d'amélioration concrets qui freinent probablement l'acquisition de nouveaux clients.<br><br>
Si vous souhaitez qu'on en parle, répondez simplement à cet email — je suis disponible cette semaine.<br><br>
<a href="${s}/api/tracking/click/${id}?target=quote&redirect=${encodeURIComponent(s + '/devis')}" style="display:inline-block;background:linear-gradient(135deg,#1e3a8a,#7c3aed);color:#fff;padding:12px 28px;border-radius:9999px;text-decoration:none;font-weight:700;">Demander un devis gratuit →</a>`,
    j7Subject: (n) => `Re: ${n} — votre site web`,
    j7Body: (n, w, s, id) => `Bonjour,<br><br>
Je vois que vous avez consulté mon analyse concernant <strong>${n}</strong>. Je comprends que c'est une décision qui mérite réflexion.<br><br>
Si vous avez des questions ou souhaitez voir des exemples de nos réalisations, je suis là.<br><br>
Cette semaine seulement, nous offrons un <strong>audit vidéo personnalisé de 15 min</strong> — entièrement gratuit, sans engagement.<br><br>
<a href="${s}/api/tracking/click/${id}?target=quote&redirect=${encodeURIComponent(s + '/devis')}" style="display:inline-block;background:linear-gradient(135deg,#1e3a8a,#7c3aed);color:#fff;padding:12px 28px;border-radius:9999px;text-decoration:none;font-weight:700;">Réserver mon audit gratuit →</a>`,
    j10Subject: (n) => `Dernier message — ${n}`,
    j10Body: (n, w, s, id) => `Bonjour,<br><br>
C'est mon dernier message concernant <strong>${w}</strong>.<br><br>
Je comprends que le timing n'est peut-être pas le bon. Si vous changez d'avis dans les prochains mois, je serai là.<br><br>
En attendant, voici notre page dédiée avec notre offre complète — peut-être utile pour référence :<br><br>
<a href="${s}/api/tracking/click/${id}?target=quote&redirect=${encodeURIComponent(s + '/offres')}" style="display:inline-block;background:#1f2937;color:#fff;padding:12px 28px;border-radius:9999px;text-decoration:none;font-weight:700;">Voir nos offres →</a><br><br>
Bonne continuation !`,
    signoff: "Cordialement,",
    from: "Kénan — KAH-Digital",
    unsubscribe: "Répondez STOP pour ne plus recevoir de messages.",
  },
  en: {
    j1Subject: (n) => `Did you get a chance to look? — ${n}`,
    j1Body: (n, w, s, id) => `Hi,<br><br>
I can see you opened my email about <strong>${n}</strong>.<br><br>
I've prepared a <strong>personalised analysis page</strong> for your website — it contains the full report, detected issues, and our detailed proposal.<br><br>
Free, no commitment, takes 2 minutes to read:<br><br>
<a href="${s}/api/tracking/click/${id}?target=prospect_page&redirect=${encodeURIComponent(s + '/p/' + id)}" style="display:inline-block;background:linear-gradient(135deg,#1e3a8a,#7c3aed);color:#fff;padding:12px 28px;border-radius:9999px;text-decoration:none;font-weight:700;">📊 See my analysis →</a><br><br>
If you have any questions, just reply — I respond the same day.`,
    j3Subject: (n) => `Quick follow-up — ${n}`,
    j3Body: (n, w, s, id) => `Hi,<br><br>
I wanted to make sure my recent message about <strong>${w}</strong> reached you.<br><br>
In short: your website has specific issues that are likely costing you new customers every week.<br><br>
If you'd like to discuss it, just reply to this email — I'm available this week.<br><br>
<a href="${s}/api/tracking/click/${id}?target=quote&redirect=${encodeURIComponent(s + '/en/devis')}" style="display:inline-block;background:linear-gradient(135deg,#1e3a8a,#7c3aed);color:#fff;padding:12px 28px;border-radius:9999px;text-decoration:none;font-weight:700;">Get a free quote →</a>`,
    j7Subject: (n) => `Re: ${n} — your website`,
    j7Body: (n, w, s, id) => `Hi,<br><br>
I noticed you had a look at my analysis for <strong>${n}</strong>. I understand it's a decision worth thinking through.<br><br>
If you have any questions or want to see examples of our work, I'm happy to chat.<br><br>
This week only: free <strong>15-min personalised video audit</strong> — no commitment needed.<br><br>
<a href="${s}/api/tracking/click/${id}?target=quote&redirect=${encodeURIComponent(s + '/en/devis')}" style="display:inline-block;background:linear-gradient(135deg,#1e3a8a,#7c3aed);color:#fff;padding:12px 28px;border-radius:9999px;text-decoration:none;font-weight:700;">Book my free audit →</a>`,
    j10Subject: (n) => `Last message — ${n}`,
    j10Body: (n, w, s, id) => `Hi,<br><br>
This is my last message regarding <strong>${w}</strong>.<br><br>
I understand the timing might not be right. If you ever change your mind, feel free to reach out — I'll be here.<br><br>
In the meantime, here's our full offer page for future reference:<br><br>
<a href="${s}/api/tracking/click/${id}?target=quote&redirect=${encodeURIComponent(s + '/en/offres')}" style="display:inline-block;background:#1f2937;color:#fff;padding:12px 28px;border-radius:9999px;text-decoration:none;font-weight:700;">See our offers →</a><br><br>
All the best!`,
    signoff: "Best regards,",
    from: "Kenan — KAH-Digital",
    unsubscribe: "Reply STOP to unsubscribe.",
  },
  es: {
    j1Subject: (n) => `¿Tuvo ocasión de verlo? — ${n}`,
    j1Body: (n, w, s, id) => `Hola,<br><br>
Veo que abrió mi email sobre <strong>${n}</strong>.<br><br>
He preparado una <strong>página de análisis personalizada</strong> para su sitio — contiene el informe completo, los problemas detectados y nuestra propuesta detallada.<br><br>
Gratuito, sin compromiso, 2 minutos de lectura:<br><br>
<a href="${s}/api/tracking/click/${id}?target=prospect_page&redirect=${encodeURIComponent(s + '/p/' + id)}" style="display:inline-block;background:linear-gradient(135deg,#1e3a8a,#7c3aed);color:#fff;padding:12px 28px;border-radius:9999px;text-decoration:none;font-weight:700;">📊 Ver mi análisis →</a><br><br>
Si tiene alguna pregunta, responda a este email — contesto el mismo día.`,
    j3Subject: (n) => `Un mensaje rápido — ${n}`,
    j3Body: (n, w, s, id) => `Hola,<br><br>
Quería asegurarme de que mi mensaje anterior sobre <strong>${w}</strong> le llegó correctamente.<br><br>
En resumen: su sitio web tiene puntos de mejora concretos que probablemente están frenando la captación de nuevos clientes.<br><br>
Si desea hablar sobre ello, responda a este email — estoy disponible esta semana.<br><br>
<a href="${s}/api/tracking/click/${id}?target=quote&redirect=${encodeURIComponent(s + '/devis')}" style="display:inline-block;background:linear-gradient(135deg,#1e3a8a,#7c3aed);color:#fff;padding:12px 28px;border-radius:9999px;text-decoration:none;font-weight:700;">Solicitar presupuesto gratuito →</a>`,
    j7Subject: (n) => `Re: ${n} — su sitio web`,
    j7Body: (n, w, s, id) => `Hola,<br><br>
Veo que tuvo ocasión de consultar mi análisis de <strong>${n}</strong>. Entiendo que es una decisión que merece reflexión.<br><br>
Si tiene preguntas o quiere ver ejemplos de nuestro trabajo, estoy disponible.<br><br>
Esta semana: <strong>auditoría en vídeo gratuita de 15 min</strong> — sin compromiso.<br><br>
<a href="${s}/api/tracking/click/${id}?target=quote&redirect=${encodeURIComponent(s + '/devis')}" style="display:inline-block;background:linear-gradient(135deg,#1e3a8a,#7c3aed);color:#fff;padding:12px 28px;border-radius:9999px;text-decoration:none;font-weight:700;">Reservar mi auditoría →</a>`,
    j10Subject: (n) => `Último mensaje — ${n}`,
    j10Body: (n, w, s, id) => `Hola,<br><br>
Este es mi último mensaje sobre <strong>${w}</strong>.<br><br>
Entiendo que el momento quizás no es el adecuado. Si cambia de opinión, no dude en contactarme.<br><br>
<a href="${s}/api/tracking/click/${id}?target=quote&redirect=${encodeURIComponent(s + '/offres')}" style="display:inline-block;background:#1f2937;color:#fff;padding:12px 28px;border-radius:9999px;text-decoration:none;font-weight:700;">Ver nuestras ofertas →</a><br><br>
¡Mucho éxito!`,
    signoff: "Saludos,",
    from: "Kenan — KAH-Digital",
    unsubscribe: "Responda STOP para darse de baja.",
  },
  de: {
    j1Subject: (n) => `Hatten Sie Zeit, es sich anzusehen? — ${n}`,
    j1Body: (n, w, s, id) => `Hallo,<br><br>
ich sehe, dass Sie meine E-Mail über <strong>${n}</strong> geöffnet haben.<br><br>
Ich habe eine <strong>persönliche Analyseseite</strong> für Ihre Website erstellt — sie enthält den vollständigen Bericht, erkannte Probleme und unser detailliertes Angebot.<br><br>
Kostenlos, unverbindlich, 2 Minuten Lesezeit:<br><br>
<a href="${s}/api/tracking/click/${id}?target=prospect_page&redirect=${encodeURIComponent(s + '/p/' + id)}" style="display:inline-block;background:linear-gradient(135deg,#1e3a8a,#7c3aed);color:#fff;padding:12px 28px;border-radius:9999px;text-decoration:none;font-weight:700;">📊 Meine Analyse ansehen →</a><br><br>
Bei Fragen antworten Sie einfach auf diese E-Mail — ich antworte noch am selben Tag.`,
    j3Subject: (n) => `Kurze Nachfrage — ${n}`,
    j3Body: (n, w, s, id) => `Hallo,<br><br>
ich wollte sicherstellen, dass meine Nachricht über <strong>${w}</strong> Sie erreicht hat.<br><br>
Kurz gesagt: Ihre Website hat konkrete Verbesserungspotenziale, die wahrscheinlich neue Kunden kosten.<br><br>
Falls Sie darüber sprechen möchten, antworten Sie einfach auf diese E-Mail — ich bin diese Woche verfügbar.<br><br>
<a href="${s}/api/tracking/click/${id}?target=quote&redirect=${encodeURIComponent(s + '/de/devis')}" style="display:inline-block;background:linear-gradient(135deg,#1e3a8a,#7c3aed);color:#fff;padding:12px 28px;border-radius:9999px;text-decoration:none;font-weight:700;">Kostenloses Angebot anfordern →</a>`,
    j7Subject: (n) => `Re: ${n} — Ihre Website`,
    j7Body: (n, w, s, id) => `Hallo,<br><br>
ich sehe, dass Sie meine Analyse für <strong>${n}</strong> gesehen haben. Ich verstehe, dass das eine Entscheidung ist, die Überlegung verdient.<br><br>
Bei Fragen oder wenn Sie Beispiele unserer Arbeit sehen möchten, stehe ich gerne zur Verfügung.<br><br>
Diese Woche: kostenloses <strong>15-minütiges Video-Audit</strong> — ohne Verpflichtung.<br><br>
<a href="${s}/api/tracking/click/${id}?target=quote&redirect=${encodeURIComponent(s + '/de/devis')}" style="display:inline-block;background:linear-gradient(135deg,#1e3a8a,#7c3aed);color:#fff;padding:12px 28px;border-radius:9999px;text-decoration:none;font-weight:700;">Mein kostenloses Audit buchen →</a>`,
    j10Subject: (n) => `Letzte Nachricht — ${n}`,
    j10Body: (n, w, s, id) => `Hallo,<br><br>
dies ist meine letzte Nachricht bezüglich <strong>${w}</strong>.<br><br>
Ich verstehe, dass der Zeitpunkt vielleicht nicht passt. Falls Sie Ihre Meinung ändern, bin ich jederzeit erreichbar.<br><br>
<a href="${s}/api/tracking/click/${id}?target=quote&redirect=${encodeURIComponent(s + '/de/offres')}" style="display:inline-block;background:#1f2937;color:#fff;padding:12px 28px;border-radius:9999px;text-decoration:none;font-weight:700;">Unsere Angebote ansehen →</a><br><br>
Alles Gute!`,
    signoff: "Mit freundlichen Grüßen,",
    from: "Kenan — KAH-Digital",
    unsubscribe: "Antworten Sie mit STOP, um sich abzumelden.",
  },
  it: {
    j1Subject: (n) => `Ha avuto modo di vederlo? — ${n}`,
    j1Body: (n, w, s, id) => `Buongiorno,<br><br>
vedo che ha aperto la mia email su <strong>${n}</strong>.<br><br>
Ho preparato una <strong>pagina di analisi personalizzata</strong> per il suo sito — contiene il report completo, i problemi rilevati e la nostra proposta dettagliata.<br><br>
Gratuito, senza impegno, 2 minuti di lettura:<br><br>
<a href="${s}/api/tracking/click/${id}?target=prospect_page&redirect=${encodeURIComponent(s + '/p/' + id)}" style="display:inline-block;background:linear-gradient(135deg,#1e3a8a,#7c3aed);color:#fff;padding:12px 28px;border-radius:9999px;text-decoration:none;font-weight:700;">📊 Vedi la mia analisi →</a><br><br>
Se ha domande, risponda a questa email — rispondo in giornata.`,
    j3Subject: (n) => `Un breve messaggio — ${n}`,
    j3Body: (n, w, s, id) => `Buongiorno,<br><br>
volevo assicurarmi che il mio messaggio su <strong>${w}</strong> le fosse arrivato.<br><br>
In sintesi: il suo sito presenta miglioramenti concreti che probabilmente frenano l'acquisizione di nuovi clienti.<br><br>
Se desidera parlarne, risponda a questa email — sono disponibile questa settimana.<br><br>
<a href="${s}/api/tracking/click/${id}?target=quote&redirect=${encodeURIComponent(s + '/devis')}" style="display:inline-block;background:linear-gradient(135deg,#1e3a8a,#7c3aed);color:#fff;padding:12px 28px;border-radius:9999px;text-decoration:none;font-weight:700;">Richiedere un preventivo gratuito →</a>`,
    j7Subject: (n) => `Re: ${n} — il suo sito web`,
    j7Body: (n, w, s, id) => `Buongiorno,<br><br>
vedo che ha avuto modo di consultare la mia analisi per <strong>${n}</strong>. Capisco che sia una decisione che merita riflessione.<br><br>
Se ha domande o vuole vedere esempi del nostro lavoro, sono a disposizione.<br><br>
Questa settimana: <strong>audit video gratuito di 15 min</strong> — senza impegno.<br><br>
<a href="${s}/api/tracking/click/${id}?target=quote&redirect=${encodeURIComponent(s + '/devis')}" style="display:inline-block;background:linear-gradient(135deg,#1e3a8a,#7c3aed);color:#fff;padding:12px 28px;border-radius:9999px;text-decoration:none;font-weight:700;">Prenota il mio audit gratuito →</a>`,
    j10Subject: (n) => `Ultimo messaggio — ${n}`,
    j10Body: (n, w, s, id) => `Buongiorno,<br><br>
questo è il mio ultimo messaggio riguardo a <strong>${w}</strong>.<br><br>
Capisco che i tempi potrebbero non essere favorevoli. Se dovesse cambiare idea, sono qui.<br><br>
<a href="${s}/api/tracking/click/${id}?target=quote&redirect=${encodeURIComponent(s + '/offres')}" style="display:inline-block;background:#1f2937;color:#fff;padding:12px 28px;border-radius:9999px;text-decoration:none;font-weight:700;">Vedi le nostre offerte →</a><br><br>
In bocca al lupo!`,
    signoff: "Cordiali saluti,",
    from: "Kenan — KAH-Digital",
    unsubscribe: "Rispondi STOP per annullare l'iscrizione.",
  },
};

function getCopy(lang: string) {
  return FOLLOWUP_COPY[lang] ?? FOLLOWUP_COPY.fr;
}

function buildFollowupHtml(body: string, signoff: string, fromName: string, unsubscribe: string, unsubscribeUrl?: string): string {
  const unsubscribeHtml = unsubscribeUrl
    ? `${unsubscribe} &mdash; <a href="${unsubscribeUrl}" style="color:#9ca3af;text-decoration:underline;">Se désabonner</a>`
    : unsubscribe;
  return `<!DOCTYPE html>
<html><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#f4f6f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9;padding:24px 12px;">
<tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);max-width:560px;">
  <tr><td style="background:linear-gradient(135deg,#1e3a8a,#7c3aed);padding:18px 28px;">
    <div style="color:#fff;font-size:18px;font-weight:800;">KAH-Digital</div>
    <div style="color:rgba(255,255,255,0.6);font-size:11px;">Studio digital — sites, apps & IA</div>
  </td></tr>
  <tr><td style="padding:28px 28px 20px;">
    <div style="font-size:15px;color:#374151;line-height:1.7;">${body}</div>
    <div style="margin-top:24px;font-size:14px;color:#374151;">${signoff}<br/>
    <strong>${fromName}</strong><br/>
    <span style="color:#6b7280;font-size:12px;">kahdigital42@gmail.com</span></div>
  </td></tr>
  <tr><td style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:12px 28px;">
    <p style="margin:0;font-size:11px;color:#9ca3af;">${unsubscribeHtml}</p>
  </td></tr>
</table>
</td></tr>
</table>
</body></html>`;
}

async function sendFollowup(to: string, subject: string, html: string): Promise<void> {
  const resend = new Resend(process.env.RESEND_API_KEY!);
  const { error } = await resend.emails.send({
    from: getResendFromAddress(),
    to,
    replyTo: "kahdigital42@gmail.com",
    subject,
    html,
  });
  if (error) throw new Error(error.message);
}

export async function POST(req: Request) {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = req.headers.get("authorization");
  const hasCronAuth = cronSecret && authHeader === `Bearer ${cronSecret}`;
  if (!hasCronAuth) {
    try {
      const supabaseAuth = await createSupabaseServerClient();
      if (!supabaseAuth) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      const { data: { user } } = await supabaseAuth.auth.getUser();
      if (!user || !isAdminUser(user)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    } catch {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const supabase = getSupabase();
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://kah-digital.ch").trim();
  const now = new Date();
  const j1Cutoff  = new Date(now.getTime() - 20 * 3600000).toISOString();  // ouvert il y a 20h+
  const j2Cutoff  = new Date(now.getTime() - 48 * 3600000).toISOString();  // limite J+1 (48h)
  const j3Cutoff  = new Date(now.getTime() - 2 * 86400000).toISOString();
  const j7Cutoff  = new Date(now.getTime() - 5 * 86400000).toISOString();
  const j10Cutoff = new Date(now.getTime() - 10 * 86400000).toISOString();
  const j15Cutoff = new Date(now.getTime() - 15 * 86400000).toISOString();

  let j1Sent = 0, j3Sent = 0, j7Sent = 0, j10Sent = 0, errors = 0;

  // ── J+1 FAST-TRACK : a ouvert il y a 20-48h, n'a pas cliqué, pas encore relancé ──
  const { data: j1Prospects } = await supabase
    .from("prospects")
    .select("id, businessName, website, email, language")
    .eq("status", "sent")
    .not("openedAt", "is", null)
    .is("clickedAt", null)
    .is("followup1SentAt", null)
    .lte("openedAt", j1Cutoff)
    .gte("openedAt", j2Cutoff)
    .not("email", "is", null)
    .limit(8);

  for (const p of (j1Prospects ?? [])) {
    try {
      const lang = p.language ?? "fr";
      const c = getCopy(lang);
      const name = p.businessName ?? p.website;
      const body = c.j1Body(name, p.website, siteUrl, p.id);
      const html = buildFollowupHtml(body, c.signoff, c.from, c.unsubscribe, `${siteUrl}/api/unsubscribe?id=${p.id}`);
      await sendFollowup(p.email!, c.j1Subject(name), html);
      await supabase.from("prospects").update({ followup1SentAt: now.toISOString() }).eq("id", p.id);
      j1Sent++;
      await new Promise((r) => setTimeout(r, 1000));
    } catch {
      errors++;
    }
  }

  // J+3 : envoyé il y a 3-6 jours, pas ouvert, pas déjà relancé
  const { data: j3Prospects } = await supabase
    .from("prospects")
    .select("id, businessName, website, email, language")
    .eq("status", "sent")
    .is("openedAt", null)
    .is("followup1SentAt", null)
    .lte("sentAt", j3Cutoff)
    .gte("sentAt", j7Cutoff)
    .not("email", "is", null)
    .limit(10);

  for (const p of (j3Prospects ?? [])) {
    try {
      const lang = p.language ?? "fr";
      const c = getCopy(lang);
      const name = p.businessName ?? p.website;
      const body = c.j3Body(name, p.website, siteUrl, p.id);
      const html = buildFollowupHtml(body, c.signoff, c.from, c.unsubscribe, `${siteUrl}/api/unsubscribe?id=${p.id}`);
      await sendFollowup(p.email!, c.j3Subject(name), html);
      await supabase.from("prospects").update({ followup1SentAt: now.toISOString() }).eq("id", p.id);
      j3Sent++;
      await new Promise((r) => setTimeout(r, 1500));
    } catch {
      errors++;
    }
  }

  // J+5 : ouvert il y a 5-10 jours, pas répondu, pas déjà relancé J+5
  const { data: j7Prospects } = await supabase
    .from("prospects")
    .select("id, businessName, website, email, language")
    .eq("status", "sent")
    .not("openedAt", "is", null)
    .is("followup2SentAt", null)
    .lte("sentAt", j7Cutoff)
    .gte("sentAt", j10Cutoff)
    .not("email", "is", null)
    .limit(10);

  for (const p of (j7Prospects ?? [])) {
    try {
      const lang = p.language ?? "fr";
      const c = getCopy(lang);
      const name = p.businessName ?? p.website;
      const body = c.j7Body(name, p.website, siteUrl, p.id);
      const html = buildFollowupHtml(body, c.signoff, c.from, c.unsubscribe, `${siteUrl}/api/unsubscribe?id=${p.id}`);
      await sendFollowup(p.email!, c.j7Subject(name), html);
      await supabase.from("prospects").update({ followup2SentAt: now.toISOString() }).eq("id", p.id);
      j7Sent++;
      await new Promise((r) => setTimeout(r, 1500));
    } catch {
      errors++;
    }
  }

  // J+10 : dernier contact — tous prospects envoyés il y a 10-15 jours sans conversion
  const { data: j10Prospects } = await supabase
    .from("prospects")
    .select("id, businessName, website, email, language")
    .eq("status", "sent")
    .is("followup3SentAt", null)
    .lte("sentAt", j10Cutoff)
    .gte("sentAt", j15Cutoff)
    .not("email", "is", null)
    .limit(10);

  for (const p of (j10Prospects ?? [])) {
    try {
      const lang = p.language ?? "fr";
      const c = getCopy(lang);
      const name = p.businessName ?? p.website;
      const body = c.j10Body(name, p.website, siteUrl, p.id);
      const html = buildFollowupHtml(body, c.signoff, c.from, c.unsubscribe, `${siteUrl}/api/unsubscribe?id=${p.id}`);
      await sendFollowup(p.email!, c.j10Subject(name), html);
      await supabase.from("prospects").update({ followup3SentAt: now.toISOString() }).eq("id", p.id);
      j10Sent++;
      await new Promise((r) => setTimeout(r, 1500));
    } catch {
      errors++;
    }
  }

  return NextResponse.json({ ok: true, j1Sent, j3Sent, j7Sent, j10Sent, errors });
}

export async function GET(req: Request) {
  return POST(req);
}
