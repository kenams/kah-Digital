import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";
import { Resend } from "resend";
import { sendAdminNotification } from "@/lib/gmail";
import { getResendFromAddress } from "@/lib/mail";

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// Prompt par langue pour la réponse auto
const REPLY_PROMPT: Record<string, (name: string, sector: string, isQuote: boolean) => string> = {
  fr: (name, sector, isQuote) => `Tu es Kénan, fondateur de KAH Digital (studio digital).
Un prospect "${name}" (${sector}) vient de ${isQuote ? "demander un devis" : "cliquer sur ton email de prospection"}.
Écris un email de suivi court et chaleureux (5-6 phrases) — personnel, direct, sans template.
${isQuote ? "Remercie-les, confirme un devis sous 24h, demande leur budget et délai." : "Engager la conversation, mentionner leur secteur, proposer un appel de 15 min cette semaine."}
Texte simple, pas de HTML, pas de listes. Termine par: Kénan — KAH Digital | contact@kah-digital.ch`,

  en: (name, sector, isQuote) => `You are Kenan, founder of KAH Digital (digital studio).
A prospect "${name}" (${sector}) just ${isQuote ? "requested a quote" : "clicked your prospecting email"}.
Write a short, warm follow-up email (5-6 sentences) — personal, direct, no template.
${isQuote ? "Thank them, confirm a quote within 24h, ask about budget and timeline." : "Start the conversation, mention their sector, suggest a quick 15-min call this week."}
Plain text only, no HTML, no bullet points. End with: Kenan — KAH Digital | contact@kah-digital.ch`,

  es: (name, sector, isQuote) => `Eres Kenan, fundador de KAH Digital (estudio digital).
Un prospecto "${name}" (${sector}) acaba de ${isQuote ? "solicitar un presupuesto" : "hacer clic en tu email de prospección"}.
Escribe un email de seguimiento corto y cálido (5-6 frases) — personal, directo, sin plantilla.
${isQuote ? "Agradéceles, confirma un presupuesto en 24h, pregunta por su presupuesto y plazos." : "Inicia la conversación, menciona su sector, propón una llamada rápida de 15 min."}
Solo texto, sin HTML. Termina con: Kenan — KAH Digital | contact@kah-digital.ch`,

  de: (name, sector, isQuote) => `Du bist Kenan, Gründer von KAH Digital (digitales Studio).
Ein Interessent "${name}" (${sector}) hat gerade ${isQuote ? "ein Angebot angefordert" : "auf deine Prospektions-E-Mail geklickt"}.
Schreibe eine kurze, herzliche Folge-E-Mail (5-6 Sätze) — persönlich, direkt, kein Template.
${isQuote ? "Bedanke dich, bestätige ein Angebot innerhalb von 24h, frage nach Budget und Zeitplan." : "Beginne das Gespräch, erwähne ihre Branche, schlage einen kurzen 15-Minuten-Anruf vor."}
Nur Text, kein HTML. Ende mit: Kenan — KAH Digital | contact@kah-digital.ch`,

  it: (name, sector, isQuote) => `Sei Kenan, fondatore di KAH Digital (studio digitale).
Un potenziale cliente "${name}" (${sector}) ha appena ${isQuote ? "richiesto un preventivo" : "cliccato sulla tua email di prospezione"}.
Scrivi un'email di follow-up breve e calorosa (5-6 frasi) — personale, diretta, senza template.
${isQuote ? "Ringraziali, conferma un preventivo entro 24h, chiedi del budget e delle tempistiche." : "Inizia la conversazione, menziona il loro settore, proponi una breve chiamata di 15 min."}
Solo testo, nessun HTML. Termina con: Kenan — KAH Digital | contact@kah-digital.ch`,
};

const REPLY_SUBJECT: Record<string, (name: string, isQuote: boolean) => string> = {
  fr: (n, q) => q ? `Re: Devis pour ${n} — sous 24h` : `Re: ${n} — suite à votre intérêt`,
  en: (n, q) => q ? `Re: Quote for ${n} — within 24h` : `Re: ${n} — following your interest`,
  es: (n, q) => q ? `Re: Presupuesto para ${n} — en 24h` : `Re: ${n} — tras su interés`,
  de: (n, q) => q ? `Re: Angebot für ${n} — innerhalb 24h` : `Re: ${n} — nach Ihrem Interesse`,
  it: (n, q) => q ? `Re: Preventivo per ${n} — entro 24h` : `Re: ${n} — a seguito del suo interesse`,
};

async function generateAndSendAutoReply(prospect: {
  id: string; businessName: string | null; website: string; email: string;
  sector: string | null; language: string | null;
}, target: string): Promise<string> {
  const lang = prospect.language ?? "fr";
  const name = prospect.businessName ?? prospect.website;
  const sector = prospect.sector ?? "PME";
  const isQuote = target === "quote";

  let draft = "";

  // Générer le brouillon — Anthropic puis OpenAI en fallback
  const promptFn = REPLY_PROMPT[lang] ?? REPLY_PROMPT.fr;
  if (process.env.OPENAI_API_KEY) {
    try {
      const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      const resp = await client.chat.completions.create({
        model: "gpt-4o-mini",
        max_tokens: 300,
        messages: [{ role: "user", content: promptFn(name, sector, isQuote) }],
      });
      draft = resp.choices[0]?.message?.content?.trim() ?? "";
    } catch { /* fall through to Anthropic */ }
  }
  if (!draft && process.env.ANTHROPIC_API_KEY) {
    try {
      const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
      const msg = await client.messages.create({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 300,
        messages: [{ role: "user", content: promptFn(name, sector, isQuote) }],
      });
      draft = msg.content[0].type === "text" ? msg.content[0].text.trim() : "";
    } catch { /* fall through to static template */ }
  }

  // Fallback statique si aucune IA
  if (!draft) {
    const fallbacks: Record<string, string> = {
      fr: `Bonjour,\n\nMerci pour votre intérêt pour KAH Digital ! J'ai bien noté votre demande concernant ${name}.\n\nJe vous prépare une proposition personnalisée et reviens vers vous dans les 24 heures avec tous les détails.\n\nÀ très bientôt,\nKénan — KAH Digital | contact@kah-digital.ch`,
      en: `Hello,\n\nThank you for your interest in KAH Digital! I've noted your request regarding ${name}.\n\nI'm preparing a personalised proposal and will get back to you within 24 hours with full details.\n\nBest regards,\nKenan — KAH Digital | contact@kah-digital.ch`,
      es: `Hola,\n\nGracias por su interés en KAH Digital. He recibido su solicitud sobre ${name}.\n\nLe prepararé una propuesta personalizada y le responderé en las próximas 24 horas.\n\nSaludos,\nKenan — KAH Digital | contact@kah-digital.ch`,
      de: `Hallo,\n\nVielen Dank für Ihr Interesse an KAH Digital! Ich habe Ihre Anfrage bezüglich ${name} erhalten.\n\nIch bereite ein persönliches Angebot vor und melde mich innerhalb von 24 Stunden bei Ihnen.\n\nMit freundlichen Grüßen,\nKenan — KAH Digital | contact@kah-digital.ch`,
      it: `Buongiorno,\n\nGrazie per il suo interesse per KAH Digital! Ho ricevuto la sua richiesta riguardo a ${name}.\n\nSto preparando una proposta personalizzata e la ricontatterò entro 24 ore.\n\nCordiali saluti,\nKenan — KAH Digital | contact@kah-digital.ch`,
    };
    draft = fallbacks[lang] ?? fallbacks.fr;
  }

  // Envoyer la réponse auto via Resend
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const subjectFn = REPLY_SUBJECT[lang] ?? REPLY_SUBJECT.fr;
      const htmlBody = `<div style="font-family:-apple-system,Arial,sans-serif;font-size:15px;line-height:1.7;color:#374151;max-width:560px;">${draft.replace(/\n/g, "<br/>")}</div>`;
      await resend.emails.send({
        from: getResendFromAddress(),
        to: prospect.email,
        replyTo: "kahdigital42@gmail.com",
        subject: subjectFn(name, isQuote),
        html: htmlBody,
        text: draft,
      });
    } catch (err) {
      console.error("[auto-reply] Erreur envoi:", err);
    }
  }

  return draft;
}

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { searchParams } = new URL(req.url);
  const target = searchParams.get("target") ?? "reply";
  const redirect = searchParams.get("redirect");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kah-digital.ch";

  let prospect: {
    id: string; businessName: string | null; website: string; email: string | null;
    sector: string | null; language: string | null; clickedAt: string | null;
  } | null = null;

  try {
    const supabase = getSupabase();
    const { data } = await supabase
      .from("prospects")
      .select("id, businessName, website, email, sector, language, clickedAt")
      .eq("id", id)
      .single();
    prospect = data;

    if (prospect && !prospect.clickedAt) {
      // Marquer "clicked" seulement — pas "replied" (réservé aux vrais formulaires soumis)
      await supabase
        .from("prospects")
        .update({ clickedAt: new Date().toISOString(), status: "clicked" })
        .eq("id", id);

      // Générer un brouillon en local (sans l'envoyer) — Kenams choisit d'envoyer ou non
      let draft = "";
      if (prospect.email) {
        try {
          draft = await generateAndSendAutoReply(
            { ...prospect, email: prospect.email },
            target
          );
        } catch { /* silent */ }
        if (draft) {
          await supabase.from("prospects").update({ draftReply: draft }).eq("id", id);
        }
      }

      // Notification admin uniquement — pas d'envoi auto
      const name = prospect.businessName ?? prospect.website;
      const gmailSearchUrl = `https://mail.google.com/mail/u/0/#search/${encodeURIComponent(prospect.email ?? name)}`;
      const prospectPageUrl = `${siteUrl}/p/${id}`;
      void sendAdminNotification({
        subject: `👁️ CLIC — ${name} (${prospect.language?.toUpperCase() ?? "FR"})`,
        body: `<strong style="font-size:15px;">Prospect a vu ta page d'analyse</strong><br/><br/>
<strong>${name}</strong> a cliqué sur le lien de l'email.<br/>
Secteur : ${prospect.sector ?? "?"} | Email : ${prospect.email ?? "inconnu"}<br/><br/>
${draft ? `<p style="margin:4px 0 8px;font-size:12px;color:#6b7280;">Brouillon prêt à envoyer :</p><div style="background:#f0f9ff;border-left:4px solid #3b82f6;padding:14px;border-radius:0 8px 8px 0;margin:4px 0 12px;white-space:pre-wrap;font-size:13px;color:#374151;">${draft}</div>` : ""}
<a href="${gmailSearchUrl}" style="display:inline-block;background:#1a73e8;color:#fff;padding:8px 16px;border-radius:6px;text-decoration:none;font-weight:700;margin-right:8px;">📧 Gmail</a>
<a href="${prospectPageUrl}" style="display:inline-block;background:#059669;color:#fff;padding:8px 16px;border-radius:6px;text-decoration:none;font-weight:700;">👁️ Sa page</a>
<br/><small style="color:#9ca3af;margin-top:8px;display:block;">Site: ${prospect.website}</small>`,
      }).catch(console.error);
    }
  } catch (err) {
    console.error("[tracking:click]", err);
  }

  // Destination — page personnalisée prospect
  let destination = redirect
    ? decodeURIComponent(redirect)
    : `${siteUrl}/p/${id}`;

  if (destination.includes("/devis") && prospect) {
    try {
      const base = destination.startsWith("http") ? destination : `${siteUrl}${destination}`;
      const devisUrl = new URL(base);
      if (prospect.businessName) devisUrl.searchParams.set("company", prospect.businessName);
      if (prospect.sector) devisUrl.searchParams.set("sector", prospect.sector);
      if (prospect.website) devisUrl.searchParams.set("site", prospect.website);
      devisUrl.searchParams.set("ref", "email");
      destination = devisUrl.toString();
    } catch { /* redirect as-is */ }
  }

  return NextResponse.redirect(destination);
}
