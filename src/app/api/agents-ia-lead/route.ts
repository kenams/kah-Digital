import { NextResponse } from "next/server";
import { sendTelegramAlert } from "@/lib/notify";
import { sendAdminNotification } from "@/lib/gmail";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

const CALENDLY = "https://calendly.com/kahdigital42";
const SITE = "https://kah-digital.ch";
const DEVIS = `${SITE}/devis`;
const WHATSAPP = "https://wa.me/33759558414";

// ─── Templates par agent ────────────────────────────────────────────────────

type AgentTemplate = {
  subject: string;
  headline: string;
  pitch: string;
  benefits: string[];
  proof: string;
  price: string;
  guarantee: string;
  ctaLabel: string;
};

const AGENT_TEMPLATES: Record<string, AgentTemplate> = {
  "Prospection automatique": {
    subject: "Votre agent de prospection — tout est là",
    headline: "120 prospects contactés chaque matin. Sans vous.",
    pitch: "L'Agent Prospection KAH Digital identifie vos cibles idéales, rédige un message personnalisé selon leur secteur, envoie, relance J+3 et J+7 — et vous livre uniquement les réponses positives dans votre boîte mail.",
    benefits: [
      "120 emails ciblés envoyés automatiquement chaque jour",
      "Relances J+3 et J+7 intégrées — zéro suivi manuel",
      "Messages adaptés au secteur de chaque prospect",
      "+8 RDV qualifiés par mois en moyenne (dès J+30)",
      "Vous ne traitez que les réponses positives",
    ],
    proof: "\"6 RDV qualifiés la première semaine. Avant j'envoyais 5 emails par jour à la main.\" — T.K., commercial indépendant",
    price: "490€ — prix fixe, tout inclus. Développement, intégration, formation, code source, 1 mois de support.",
    guarantee: "Résultats mesurables à J+30 ou on corrige gratuitement.",
    ctaLabel: "Démarrer mon agent prospection",
  },
  "Support client IA": {
    subject: "Votre agent support — 70% des tickets résolus sans vous",
    headline: "Vos clients répondus en 5 secondes. 24h/24, 7j/7.",
    pitch: "L'Agent Support KAH Digital est formé sur votre base de connaissance, répond instantanément à vos clients sur votre site, WhatsApp ou Slack — et escalade proprement les cas complexes vers vous.",
    benefits: [
      "70% des tickets résolus sans intervention humaine",
      "Réponse en moins de 5 secondes, même la nuit",
      "Compatible site web, WhatsApp, Slack, widget",
      "-65% de charge support en moyenne",
      "Base de connaissance mise à jour en continu",
    ],
    proof: "\"On a économisé 15h/semaine. L'agent répond mieux que ce qu'on faisait à la main.\" — M.A., fondateur SaaS",
    price: "1 690€ — prix fixe, tout inclus. Développement, intégration, formation, code source, 1 mois de support.",
    guarantee: "Résultats mesurables à J+30 ou on corrige gratuitement.",
    ctaLabel: "Démarrer mon agent support",
  },
  "Devis automatique": {
    subject: "Votre agent devis — un devis en 30 secondes, automatiquement",
    headline: "Un devis structuré envoyé en 30 secondes. La nuit incluse.",
    pitch: "L'Agent Devis KAH Digital analyse la demande de votre prospect, génère un devis professionnel personnalisé et l'envoie par email en moins d'une minute. Vous recevez une notification — vous validez quand vous voulez.",
    benefits: [
      "Devis généré et envoyé en 30 secondes",
      "Format professionnel signable directement",
      "+40% de devis envoyés sans effort supplémentaire",
      "Disponible 24h/24 — même les week-ends",
      "Vous validez, vous signez — l'agent fait le reste",
    ],
    proof: "\"Nos devis partent en 30 secondes. Avant on perdait des clients parce qu'on répondait le lendemain.\" — S.B., architecte d'intérieur",
    price: "690€ — prix fixe, tout inclus. Développement, intégration, formation, code source, 1 mois de support.",
    guarantee: "Résultats mesurables à J+30 ou on corrige gratuitement.",
    ctaLabel: "Démarrer mon agent devis",
  },
  "Casting IA": {
    subject: "Votre agent casting — les 5 meilleurs profils en moins d'une minute",
    headline: "Brief → 5 profils parfaits. En moins d'une minute.",
    pitch: "L'Agent Castly KAH Digital analyse votre brief de casting, parcourt votre base d'artistes ou de talents, et vous propose les 5 meilleurs profils avec scoring automatique multi-critères. Fini les heures de tri.",
    benefits: [
      "Brief → profils en moins d'une minute",
      "Scoring multi-critères automatique",
      "-80% du temps de présélection",
      "Adapté à votre base de talents existante",
      "Résultats exportables et partageables",
    ],
    proof: "\"Ce qui prenait 3 heures prend maintenant 45 secondes. Et les profils proposés sont meilleurs.\" — Label musical, Paris",
    price: "1 490€ — prix fixe, tout inclus. Développement, intégration, formation, code source, 1 mois de support.",
    guarantee: "Résultats mesurables à J+30 ou on corrige gratuitement.",
    ctaLabel: "Démarrer mon agent casting",
  },
};

const DEFAULT_TEMPLATE: AgentTemplate = {
  subject: "Votre agent IA KAH Digital — proposition complète",
  headline: "Un agent IA opérationnel en 10 jours. Adapté à votre activité.",
  pitch: "KAH Digital conçoit des agents IA sur mesure pour automatiser ce qui vous prend du temps : prospection, support client, devis, casting. Chaque agent est livré avec le code source, la documentation et 1 mois de support inclus.",
  benefits: [
    "Opérationnel en 10 jours — pas 3 mois",
    "Prix fixe tout inclus — aucun abonnement",
    "Code source livré — vous êtes propriétaire à 100%",
    "ROI mesurable à J+30 ou correction gratuite",
    "Support fondateur direct pendant le premier mois",
  ],
  proof: "\"En 10 jours on avait un agent qui travaillait à notre place. Le ROI a été immédiat.\" — Client KAH Digital",
  price: "À partir de 490€ selon l'agent — prix fixe, tout inclus.",
  guarantee: "Résultats mesurables à J+30 ou on corrige gratuitement.",
  ctaLabel: "Réserver ma démo gratuite",
};

function getTemplate(agent: string | undefined): AgentTemplate {
  if (!agent) return DEFAULT_TEMPLATE;
  return AGENT_TEMPLATES[agent] ?? DEFAULT_TEMPLATE;
}

// ─── HTML email ──────────────────────────────────────────────────────────────

function buildEmail(firstName: string, tpl: AgentTemplate): string {
  const benefitsHtml = tpl.benefits.map(b => `
    <tr>
      <td style="padding:7px 0;vertical-align:top;">
        <table cellpadding="0" cellspacing="0"><tr>
          <td style="width:22px;vertical-align:top;padding-top:1px;">
            <div style="width:18px;height:18px;background:#7c3aed;border-radius:50%;text-align:center;line-height:18px;font-size:11px;color:#fff;font-weight:700;">✓</div>
          </td>
          <td style="padding-left:10px;font-size:14px;color:#374151;line-height:1.5;">${b}</td>
        </tr></table>
      </td>
    </tr>`).join("");

  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#f4f6f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9;padding:32px 12px;">
<tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 4px 32px rgba(0,0,0,0.08);">

  <!-- HEADER -->
  <tr>
    <td style="background:linear-gradient(135deg,#1e1b4b 0%,#4c1d95 50%,#1e3a8a 100%);padding:32px;">
      <p style="margin:0 0 6px;font-size:12px;font-weight:700;letter-spacing:3px;color:rgba(255,255,255,0.5);text-transform:uppercase;">KAH Digital · Agents IA</p>
      <h1 style="margin:0;font-size:22px;font-weight:800;color:#ffffff;line-height:1.3;">${tpl.headline}</h1>
    </td>
  </tr>

  <!-- BODY -->
  <tr>
    <td style="padding:32px;">

      <p style="margin:0 0 20px;font-size:15px;color:#374151;line-height:1.7;">Bonjour ${firstName},</p>
      <p style="margin:0 0 28px;font-size:15px;color:#374151;line-height:1.7;">${tpl.pitch}</p>

      <!-- BÉNÉFICES -->
      <div style="background:#fafafa;border-radius:12px;padding:20px 20px 12px;margin-bottom:28px;border:1px solid #f3f4f6;">
        <p style="margin:0 0 14px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:#7c3aed;">Ce que vous gagnez concrètement</p>
        <table cellpadding="0" cellspacing="0" width="100%">
          ${benefitsHtml}
        </table>
      </div>

      <!-- PREUVE SOCIALE -->
      <div style="background:#f5f3ff;border-left:4px solid #7c3aed;border-radius:0 10px 10px 0;padding:16px 18px;margin-bottom:28px;">
        <p style="margin:0;font-size:13px;color:#4c1d95;line-height:1.6;font-style:italic;">${tpl.proof}</p>
      </div>

      <!-- PRIX -->
      <div style="background:linear-gradient(135deg,#f5f3ff,#eff6ff);border-radius:12px;padding:20px;margin-bottom:28px;border:1px solid #e0e7ff;">
        <p style="margin:0 0 6px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:#6b7280;">Investissement</p>
        <p style="margin:0 0 8px;font-size:20px;font-weight:800;color:#111827;">${tpl.price}</p>
        <p style="margin:0;font-size:13px;color:#059669;font-weight:600;">✓ ${tpl.guarantee}</p>
      </div>

      <!-- PROCESS -->
      <div style="margin-bottom:32px;">
        <p style="margin:0 0 14px;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:2px;color:#6b7280;">Comment ça se passe</p>
        <table cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td style="padding:8px 0;font-size:13px;color:#374151;"><span style="font-weight:700;color:#7c3aed;">J+0</span> — Démo 20 min : on valide votre cas et on cadre l'agent</td>
          </tr>
          <tr>
            <td style="padding:8px 0;font-size:13px;color:#374151;"><span style="font-weight:700;color:#7c3aed;">J+1 à J+5</span> — Configuration, formation sur votre métier, tests</td>
          </tr>
          <tr>
            <td style="padding:8px 0;font-size:13px;color:#374151;"><span style="font-weight:700;color:#7c3aed;">J+10</span> — L'agent est en production. Vous ne faites plus rien.</td>
          </tr>
        </table>
      </div>

      <!-- CTA PRINCIPAL -->
      <table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:14px;">
        <tr>
          <td align="center">
            <a href="${CALENDLY}" style="display:inline-block;background:linear-gradient(135deg,#7c3aed,#3b82f6);color:#ffffff;font-size:16px;font-weight:800;text-decoration:none;padding:16px 40px;border-radius:9999px;letter-spacing:-0.3px;">
              📅 ${tpl.ctaLabel}
            </a>
          </td>
        </tr>
      </table>
      <p style="text-align:center;margin:0 0 28px;font-size:12px;color:#9ca3af;">Démo gratuite · 20 min · Sans engagement</p>

      <!-- CTA SECONDAIRES -->
      <table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:32px;">
        <tr>
          <td width="50%" style="padding-right:6px;">
            <a href="${DEVIS}" style="display:block;text-align:center;background:#f9fafb;border:1.5px solid #e5e7eb;color:#374151;font-size:13px;font-weight:700;text-decoration:none;padding:12px 16px;border-radius:10px;">
              📋 Demander un devis
            </a>
          </td>
          <td width="50%" style="padding-left:6px;">
            <a href="${WHATSAPP}" style="display:block;text-align:center;background:#f9fafb;border:1.5px solid #e5e7eb;color:#374151;font-size:13px;font-weight:700;text-decoration:none;padding:12px 16px;border-radius:10px;">
              💬 WhatsApp direct
            </a>
          </td>
        </tr>
      </table>

      <!-- TRUST -->
      <table cellpadding="0" cellspacing="0" width="100%" style="border-top:1px solid #f3f4f6;padding-top:20px;">
        <tr>
          <td style="text-align:center;padding:0 4px;">
            <p style="margin:0 0 4px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;color:#9ca3af;">KAH Digital</p>
            <p style="margin:0;font-size:11px;color:#d1d5db;">
              <a href="${SITE}" style="color:#7c3aed;text-decoration:none;">kah-digital.ch</a>
              &nbsp;·&nbsp;contact@kah-digital.ch
              &nbsp;·&nbsp;Lausanne, Suisse
            </p>
          </td>
        </tr>
      </table>

    </td>
  </tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

// ─── API Route ───────────────────────────────────────────────────────────────

export async function POST(req: Request) {
  try {
    const body = await req.json() as {
      name?: string;
      email?: string;
      agent?: string;
      message?: string;
    };

    const { name, email, agent, message } = body;

    if (!email) {
      return NextResponse.json({ error: "Email requis" }, { status: 400 });
    }

    const firstName = name?.split(" ")[0] ?? "là";
    const tpl = getTemplate(agent);

    // Telegram — alerte immédiate
    void sendTelegramAlert(
      `🤖 <b>NOUVEAU LEAD AGENTS IA !</b>\n\n` +
      `👤 <b>${name ?? "Anonyme"}</b>\n` +
      `📧 ${email}\n` +
      `🎯 Agent : ${agent ?? "Non précisé"}\n` +
      `${message ? `💬 ${message}\n` : ""}` +
      `\n<a href="${SITE}/admin/prospection">📊 Admin</a>`
    ).catch(console.error);

    // Email admin
    void sendAdminNotification({
      subject: `🤖 LEAD AGENTS IA — ${name ?? email} · ${agent ?? "?"}`,
      body: `<strong style="color:#7c3aed;font-size:17px;">Nouveau lead page Agents IA !</strong><br/><br/>
<strong>Nom :</strong> ${name ?? "?"}<br/>
<strong>Email :</strong> <a href="mailto:${email}">${email}</a><br/>
<strong>Agent demandé :</strong> ${agent ?? "Non précisé"}<br/>
${message ? `<br/><strong>Message :</strong><br/><div style="background:#f9fafb;border-left:3px solid #7c3aed;padding:12px;margin-top:6px;border-radius:0 6px 6px 0;">${message}</div>` : ""}
<br/><br/><a href="${CALENDLY}" style="background:#7c3aed;color:#fff;padding:8px 16px;border-radius:6px;text-decoration:none;font-weight:700;">📅 Voir Calendly</a>`,
    }).catch(console.error);

    // Email proposition complète au prospect
    const resend = new Resend(process.env.RESEND_API_KEY!);
    await resend.emails.send({
      from: "KAH Digital <contact@kah-digital.ch>",
      to: email,
      replyTo: "kahdigital42@gmail.com",
      subject: tpl.subject,
      html: buildEmail(firstName, tpl),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
