/**
 * Agent 3 : Email Composer
 * Génère l'email de prospection personnalisé dans la bonne langue.
 * Inclut : screenshot du site actuel, mockup du futur site, devis, CTA.
 */

import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";

async function callLLMFast(prompt: string): Promise<string> {
  if (process.env.OPENAI_API_KEY) {
    try {
      const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      const resp = await client.chat.completions.create({
        model: "gpt-4o-mini",
        max_tokens: 400,
        messages: [{ role: "user", content: prompt }],
      });
      return resp.choices[0]?.message?.content ?? "";
    } catch {
      // fall through to Anthropic
    }
  }
  if (process.env.ANTHROPIC_API_KEY) {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const msg = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 400,
      messages: [{ role: "user", content: prompt }],
    });
    return msg.content[0].type === "text" ? msg.content[0].text : "";
  }
  throw new Error("No AI provider");
}
import type { SiteAudit } from "./website-auditor";
import type { DiscoveredLead } from "./lead-discovery";

export type ComposedEmail = {
  subject: string;
  html: string;
  textFallback: string;
};

// Textes statiques par langue
const COPY: Record<string, {
  currentSite: string; futureSite: string; problems: string; quote: string;
  ctaLabel: string; ctaAlt: string; ctaPrimary: string; greeting: string; footer: string;
  from: string; signoff: string; scoreBanner: string; analysisBadge: string;
  mockupFeatures: string; unsubscribeLink: string;
}> = {
  fr: {
    greeting: "Bonjour",
    currentSite: "Votre site actuel",
    futureSite: "Ce que KAH-Digital créerait pour vous",
    problems: "Ce qu'on a détecté",
    quote: "Notre proposition",
    ctaLabel: "Répondre à cet email",
    ctaAlt: "Demander un devis gratuit",
    ctaPrimary: "📊 Voir votre analyse complète →",
    from: "Kénan — KAH-Digital",
    signoff: "Cordialement",
    footer: "Vous recevez cet email car votre site est publiquement accessible.",
    unsubscribeLink: "Se désabonner",
    scoreBanner: "Score digital",
    analysisBadge: "ANALYSE GRATUITE",
    mockupFeatures: "📱 MOBILE · ⚡ RAPIDE · 🔍 SEO",
  },
  en: {
    greeting: "Hello",
    currentSite: "Your current website",
    futureSite: "What KAH-Digital would build for you",
    problems: "What we found",
    quote: "Our proposal",
    ctaLabel: "Reply to this email",
    ctaAlt: "Request a free quote",
    ctaPrimary: "📊 See your full analysis →",
    from: "Kenan — KAH-Digital",
    signoff: "Best regards",
    footer: "You received this email because your website is publicly accessible.",
    unsubscribeLink: "Unsubscribe",
    scoreBanner: "Digital score",
    analysisBadge: "FREE ANALYSIS",
    mockupFeatures: "📱 MOBILE · ⚡ FAST · 🔍 SEO",
  },
  es: {
    greeting: "Hola",
    currentSite: "Su sitio web actual",
    futureSite: "Lo que KAH-Digital crearía para usted",
    problems: "Lo que encontramos",
    quote: "Nuestra propuesta",
    ctaLabel: "Responder a este email",
    ctaAlt: "Solicitar presupuesto gratuito",
    ctaPrimary: "📊 Ver mi análisis completo →",
    from: "Kenan — KAH-Digital",
    signoff: "Saludos cordiales",
    footer: "Recibió este email porque su sitio web es accesible públicamente.",
    unsubscribeLink: "Darse de baja",
    scoreBanner: "Puntuación digital",
    analysisBadge: "ANÁLISIS GRATUITO",
    mockupFeatures: "📱 MÓVIL · ⚡ RÁPIDO · 🔍 SEO",
  },
  de: {
    greeting: "Guten Tag",
    currentSite: "Ihre aktuelle Website",
    futureSite: "Was KAH-Digital für Sie erstellen würde",
    problems: "Was wir gefunden haben",
    quote: "Unser Angebot",
    ctaLabel: "Diese E-Mail beantworten",
    ctaAlt: "Kostenloses Angebot anfordern",
    ctaPrimary: "📊 Vollständige Analyse ansehen →",
    from: "Kenan — KAH-Digital",
    signoff: "Mit freundlichen Grüßen",
    footer: "Sie erhalten diese E-Mail, weil Ihre Website öffentlich zugänglich ist.",
    unsubscribeLink: "Abmelden",
    scoreBanner: "Digital-Score",
    analysisBadge: "KOSTENLOSE ANALYSE",
    mockupFeatures: "📱 MOBIL · ⚡ SCHNELL · 🔍 SEO",
  },
  it: {
    greeting: "Buongiorno",
    currentSite: "Il tuo sito attuale",
    futureSite: "Cosa creerebbe KAH-Digital per te",
    problems: "Cosa abbiamo trovato",
    quote: "La nostra proposta",
    ctaLabel: "Rispondi a questa email",
    ctaAlt: "Richiedi un preventivo gratuito",
    ctaPrimary: "📊 Vedi la mia analisi completa →",
    from: "Kenan — KAH-Digital",
    signoff: "Cordiali saluti",
    footer: "Hai ricevuto questa email perché il tuo sito è accessibile pubblicamente.",
    unsubscribeLink: "Annulla iscrizione",
    scoreBanner: "Punteggio digitale",
    analysisBadge: "ANALISI GRATUITA",
    mockupFeatures: "📱 MOBILE · ⚡ VELOCE · 🔍 SEO",
  },
  nl: {
    greeting: "Goedendag",
    currentSite: "Uw huidige website",
    futureSite: "Wat KAH-Digital voor u zou maken",
    problems: "Wat we hebben gevonden",
    quote: "Ons voorstel",
    ctaLabel: "Reageer op deze e-mail",
    ctaAlt: "Vraag een gratis offerte aan",
    ctaPrimary: "📊 Bekijk mijn volledige analyse →",
    from: "Kenan — KAH-Digital",
    signoff: "Met vriendelijke groet",
    footer: "U ontvangt deze e-mail omdat uw website openbaar toegankelijk is.",
    unsubscribeLink: "Afmelden",
    scoreBanner: "Digitale score",
    analysisBadge: "GRATIS ANALYSE",
    mockupFeatures: "📱 MOBIEL · ⚡ SNEL · 🔍 SEO",
  },
};

function getCopy(lang: string) {
  return COPY[lang] ?? COPY.fr;
}

// Severity → couleur
const SEV_COLOR: Record<string, string> = {
  critical: "#ef4444",
  medium: "#f59e0b",
  low: "#3b82f6",
};

const CAT_ICON: Record<string, string> = {
  design: "🎨", seo: "🔍", mobile: "📱", speed: "⚡", ux: "🧭", conversion: "💰", security: "🔒",
};

export async function composeProspectingEmail(
  lead: DiscoveredLead,
  audit: SiteAudit,
  trackingBaseUrl: string,
  prospectId: string
): Promise<ComposedEmail> {
  const c = getCopy(audit.language);
  const pixelUrl = `${trackingBaseUrl}/api/tracking/open/${prospectId}`;
  const clickUrl = `${trackingBaseUrl}/api/tracking/click/${prospectId}`;
  const prospectPageUrl = `${trackingBaseUrl}/p/${prospectId}`;
  // URL devis avec données prospect pour prefill (traitées côté tracking/click)
  const quoteUrl = `${trackingBaseUrl}/devis?utm_source=email&utm_campaign=prospection&utm_medium=email`;

  // Claude génère l'intro et la conclusion personnalisées
  const introConclusionPrompt = `Tu es Kenan, fondateur de KAH-Digital (studio digital — sites web, apps mobiles, SaaS, automatisations IA).
Approche KAH-Digital : pas de prix public fixe ni formule rigide. Chaque proposition est ajustée après échange selon le besoin réel, les fonctionnalités utiles, les délais, le niveau d'accompagnement, le budget disponible et les priorités business.
Écris en "${audit.language}" :
1. Une accroche d'intro (2-3 phrases) pour ${audit.businessName}, un commerce dans le secteur ${audit.sector}.
   Score actuel de leur site : ${audit.score}/100. Sois direct et bienveillant, mentionne le site (${lead.website}).
   Si pertinent, ancre l'idée d'une proposition personnalisée après cadrage, sans montant.
2. Une conclusion courte (1-2 phrases) qui incite à répondre, demander un devis personnalisé ou planifier un échange.
Format JSON : { "intro": "...", "conclusion": "..." }`;

  let intro = `Nous avons analysé votre site ${lead.website} et identifié plusieurs points d'amélioration concrets.`;
  let conclusion = `N'hésitez pas à répondre directement à cet email — je vous prépare une proposition claire et adaptée après un court échange.`;

  try {
    const raw = await callLLMFast(introConclusionPrompt);
    const start = raw.indexOf("{"); const end = raw.lastIndexOf("}");
    if (start !== -1 && end !== -1) {
      const parsed = JSON.parse(raw.slice(start, end + 1)) as { intro?: string; conclusion?: string };
      intro = parsed.intro ?? intro;
      conclusion = parsed.conclusion ?? conclusion;
    }
  } catch { /* keep defaults */ }

  // A/B test sujets — 7 variantes, rotation par jour
  const abVariant = Math.floor(Date.now() / 86400000) % 7;
  const bName = audit.businessName.trim() || lead.website.replace(/https?:\/\/(www\.)?/, "").split(/[/?#]/)[0];
  const SUBJECTS: Record<string, string[]> = {
    fr: [
      `${bName} — votre site web perd des clients (analyse gratuite)`,
      `J'ai analysé le site de ${bName} — voici ce que j'ai trouvé`,
      `${bName} : 3 problèmes qui coûtent des clients chaque semaine`,
      `Score ${audit.score}/100 pour ${bName} — rapport complet inclus`,
      `Une question rapide sur ${bName}`,
      `${bName} — votre site coûte des clients chaque jour`,
      `Kénan de KAH-Digital — j'ai une proposition pour ${bName}`,
    ],
    en: [
      `${bName} — your website is losing customers (free analysis)`,
      `I analysed ${bName}'s website — here's what I found`,
      `${bName}: 3 issues costing you customers every week`,
      `Score ${audit.score}/100 for ${bName} — full report inside`,
      `Quick question about ${bName}`,
      `${bName} — your website is costing you clients every day`,
      `Kenan from KAH-Digital — I have a proposal for ${bName}`,
    ],
    es: [
      `${bName} — su sitio web está perdiendo clientes (análisis gratuito)`,
      `Analicé el sitio de ${bName} — esto es lo que encontré`,
      `${bName}: 3 problemas que le cuestan clientes cada semana`,
      `Puntuación ${audit.score}/100 para ${bName} — informe incluido`,
      `Una pregunta rápida sobre ${bName}`,
      `${bName} — su web le cuesta clientes cada día`,
      `Kenan de KAH-Digital — tengo una propuesta para ${bName}`,
    ],
    de: [
      `${bName} — Ihre Website verliert Kunden (kostenlose Analyse)`,
      `Ich habe die Website von ${bName} analysiert — das habe ich gefunden`,
      `${bName}: 3 Probleme, die jede Woche Kunden kosten`,
      `Score ${audit.score}/100 für ${bName} — vollständiger Bericht`,
      `Kurze Frage zu ${bName}`,
      `${bName} — Ihre Website kostet täglich Kunden`,
      `Kenan von KAH-Digital — ich habe ein Angebot für ${bName}`,
    ],
    it: [
      `${bName} — il tuo sito perde clienti (analisi gratuita)`,
      `Ho analizzato il sito di ${bName} — ecco cosa ho trovato`,
      `${bName}: 3 problemi che ti costano clienti ogni settimana`,
      `Punteggio ${audit.score}/100 per ${bName} — report completo`,
      `Una domanda rapida su ${bName}`,
      `${bName} — il tuo sito ti costa clienti ogni giorno`,
      `Kenan di KAH-Digital — ho una proposta per ${bName}`,
    ],
    nl: [
      `${bName} — uw website verliest klanten (gratis analyse)`,
      `Ik analyseerde de website van ${bName} — dit vond ik`,
      `${bName}: 3 problemen die u elke week klanten kosten`,
      `Score ${audit.score}/100 voor ${bName} — volledig rapport`,
      `Korte vraag over ${bName}`,
      `${bName} — uw website kost u dagelijks klanten`,
      `Kenan van KAH-Digital — ik heb een voorstel voor ${bName}`,
    ],
  };
  const langSubjects = SUBJECTS[audit.language] ?? SUBJECTS.fr;
  const subject = langSubjects[abVariant]!

  // HTML des problèmes
  const problemsHtml = audit.problems.map((p) => `
    <tr>
      <td style="padding:12px 16px;border-bottom:1px solid #f3f4f6;">
        <table cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td style="width:28px;vertical-align:top;">
              <span style="font-size:16px;">${CAT_ICON[p.category] ?? "⚠️"}</span>
            </td>
            <td style="vertical-align:top;padding-left:8px;">
              <div style="font-weight:700;color:#111827;font-size:14px;">${p.title}
                <span style="margin-left:8px;padding:2px 8px;border-radius:9999px;font-size:11px;font-weight:600;background:${SEV_COLOR[p.severity]}20;color:${SEV_COLOR[p.severity]};">${p.severity.toUpperCase()}</span>
              </div>
              <div style="color:#6b7280;font-size:13px;margin-top:3px;">${p.detail}</div>
            </td>
          </tr>
        </table>
      </td>
    </tr>`).join("");

  // HTML des recommandations
  const recoHtml = audit.recommendations.map((r) => `
    <tr>
      <td style="padding:10px 16px;border-bottom:1px solid #f3f4f6;">
        <div style="font-weight:700;color:#059669;font-size:14px;">✓ ${r.title}</div>
        <div style="color:#6b7280;font-size:13px;margin-top:3px;">${r.detail}</div>
      </td>
    </tr>`).join("");

  // Mockup HTML (visuel "futur site")
  const mockupHtml = buildMockupHtml(audit, audit.language);

  // Screenshot du site actuel (si dispo)
  const screenshotBlock = audit.screenshotUrl ? `
    <div style="margin-bottom:8px;font-size:12px;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;font-weight:600;">${c.currentSite}</div>
    <img src="${audit.screenshotUrl}" alt="Votre site actuel" width="540" style="width:100%;max-width:540px;border-radius:8px;border:2px solid #e5e7eb;display:block;" />
  ` : `
    <div style="margin-bottom:8px;font-size:12px;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;font-weight:600;">${c.currentSite}</div>
    <div style="background:#f9fafb;border:2px dashed #e5e7eb;border-radius:8px;padding:24px;text-align:center;color:#9ca3af;font-size:13px;">
      ${lead.website}
    </div>
  `;

  const psScarcity: Record<string, string> = {
    fr: "Je ne contacte que 3 entreprises par secteur et par ville — si un concurrent répond en premier, le créneau est pris. Répondez pour bloquer votre place.",
    en: "I only contact 3 businesses per sector per city — if a competitor responds first, the slot is taken. Reply to secure yours.",
    de: "Ich kontaktiere nur 3 Unternehmen pro Branche und Stadt — antwortet ein Konkurrent zuerst, ist der Platz vergeben.",
    es: "Solo contacto a 3 empresas por sector y ciudad — si un competidor responde primero, el cupo está tomado.",
    it: "Contatto solo 3 aziende per settore e città — se un concorrente risponde prima, il posto è preso.",
    nl: "Ik neem alleen contact op met 3 bedrijven per sector en stad — als een concurrent als eerste reageert, is de plek bezet.",
  };
  const psText = psScarcity[audit.language] ?? psScarcity.fr;

  const html = `<!DOCTYPE html>
<html lang="${audit.language}">
<head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background:#f4f6f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6f9;padding:24px 12px;">
<tr><td align="center">
<table width="580" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);max-width:580px;">

  <!-- HEADER -->
  <tr>
    <td style="background:linear-gradient(135deg,#1e3a8a 0%,#7c3aed 100%);padding:24px 32px;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td>
            <div style="color:#ffffff;font-size:20px;font-weight:800;letter-spacing:-0.5px;">KAH-Digital</div>
            <div style="color:rgba(255,255,255,0.7);font-size:12px;margin-top:2px;">Studio digital — sites, apps &amp; SaaS</div>
          </td>
          <td align="right">
            <div style="background:rgba(255,255,255,0.15);border-radius:9999px;padding:4px 12px;color:#ffffff;font-size:11px;font-weight:600;">${c.analysisBadge}</div>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- SCORE BANNER -->
  <tr>
    <td style="background:#fef9c3;border-bottom:1px solid #fef08a;padding:12px 32px;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="font-size:13px;color:#854d0e;">
            <strong>${c.scoreBanner} — ${audit.businessName} :</strong>
            <strong style="color:${audit.score < 40 ? '#dc2626' : audit.score < 60 ? '#d97706' : '#16a34a'};font-size:18px;margin-left:8px;">${audit.score}/100</strong>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- BODY -->
  <tr>
    <td style="padding:28px 32px;">

      <!-- Greeting -->
      <p style="margin:0 0 6px;font-size:15px;color:#374151;font-weight:600;">${c.greeting},</p>
      <p style="margin:0 0 24px;font-size:15px;color:#4b5563;line-height:1.6;">${intro}</p>

      <!-- Screenshots + Mockup -->
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
        <tr>
          <td width="48%" style="vertical-align:top;padding-right:8px;">
            ${screenshotBlock}
          </td>
          <td width="4%"></td>
          <td width="48%" style="vertical-align:top;padding-left:8px;">
            <div style="margin-bottom:8px;font-size:12px;color:#7c3aed;text-transform:uppercase;letter-spacing:1px;font-weight:600;">${c.futureSite}</div>
            ${mockupHtml}
          </td>
        </tr>
      </table>

      <!-- Problems -->
      <div style="margin-bottom:6px;font-size:12px;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;font-weight:600;">${c.problems}</div>
      <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #f3f4f6;border-radius:10px;overflow:hidden;margin-bottom:24px;">
        ${problemsHtml}
      </table>

      <!-- Recommendations / Quote -->
      <div style="background:linear-gradient(135deg,#f0fdf4,#ecfdf5);border:1px solid #bbf7d0;border-radius:12px;padding:20px;margin-bottom:24px;">
        <div style="font-size:12px;color:#166534;text-transform:uppercase;letter-spacing:1px;font-weight:700;margin-bottom:12px;">${c.quote}</div>
        <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:14px;">
          ${recoHtml}
        </table>
        <div style="text-align:center;margin-top:12px;">
          <span style="font-size:26px;font-weight:800;color:#111827;">${audit.priceRange}</span>
          <div style="font-size:12px;color:#6b7280;margin-top:4px;">${audit.mockupDescription.slice(0, 80)}...</div>
        </div>
      </div>

      <!-- Mockup description -->
      <div style="background:#f8faff;border-left:4px solid #7c3aed;border-radius:0 8px 8px 0;padding:14px 16px;margin-bottom:24px;">
        <p style="margin:0;font-size:13px;color:#4b5563;line-height:1.6;font-style:italic;">"${audit.mockupDescription}"</p>
      </div>

      <!-- CTA -->
      <p style="margin:0 0 20px;font-size:14px;color:#4b5563;line-height:1.6;">${conclusion}</p>

      <table cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td align="center" style="padding-bottom:12px;">
            <a href="${clickUrl}?target=prospect_page&redirect=${encodeURIComponent(prospectPageUrl)}" style="display:inline-block;background:linear-gradient(135deg,#1e3a8a,#7c3aed);color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;padding:14px 36px;border-radius:9999px;">
              ${c.ctaPrimary}
            </a>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding-bottom:10px;">
            <a href="${clickUrl}?target=reply" style="display:inline-block;color:#1e3a8a;font-size:14px;font-weight:600;text-decoration:underline;">
              ${c.ctaLabel}
            </a>
          </td>
        </tr>
        <tr>
          <td align="center">
            <a href="${clickUrl}?target=quote&redirect=${encodeURIComponent(quoteUrl)}" style="display:inline-block;color:#7c3aed;font-size:13px;text-decoration:underline;">
              ${c.ctaAlt}
            </a>
          </td>
        </tr>
      </table>

    </td>
  </tr>

  <!-- P.S. urgence -->
  <tr>
    <td style="background:#fef9c3;border-top:1px solid #fef08a;padding:14px 32px;">
      <p style="margin:0;font-size:13px;color:#78350f;line-height:1.6;">
        <strong>P.S.</strong> ${psText}
      </p>
    </td>
  </tr>

  <!-- SIGNATURE -->
  <tr>
    <td style="border-top:1px solid #f3f4f6;padding:20px 32px;">
      <table cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td style="width:42px;height:42px;background:linear-gradient(135deg,#1e3a8a,#7c3aed);border-radius:50%;text-align:center;vertical-align:middle;color:#fff;font-size:16px;font-weight:800;">K</td>
          <td style="padding-left:12px;">
            <div style="font-weight:700;color:#111827;font-size:14px;">${c.from}</div>
            <div style="color:#6b7280;font-size:12px;">kahdigital42@gmail.com &bull; kah-digital.ch</div>
          </td>
          <td align="right">
            <a href="https://wa.me/33759558414" style="display:inline-flex;align-items:center;gap:6px;background:#25D366;color:#fff;font-size:12px;font-weight:700;text-decoration:none;padding:8px 14px;border-radius:9999px;">
              💬 WhatsApp
            </a>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- FOOTER -->
  <tr>
    <td style="background:#f9fafb;border-top:1px solid #f3f4f6;padding:14px 32px;">
      <p style="margin:0;font-size:11px;color:#9ca3af;line-height:1.5;">${c.footer} &nbsp;&mdash;&nbsp; <a href="${trackingBaseUrl}/api/unsubscribe?id=${prospectId}" style="color:#9ca3af;text-decoration:underline;">${c.unsubscribeLink}</a></p>
    </td>
  </tr>

</table>
</td></tr>
</table>

<!-- Pixel de tracking invisible -->
<img src="${pixelUrl}" width="1" height="1" style="display:none;visibility:hidden;" alt="" />
</body>
</html>`;

  const textFallback = `${c.greeting},\n\n${intro}\n\nProblèmes détectés sur ${lead.website}:\n${audit.problems.map((p) => `- ${p.title}: ${p.detail}`).join("\n")}\n\nProposition: ${audit.priceRange}\n\n${conclusion}\n\n${c.signoff},\n${c.from}`;

  return { subject, html, textFallback };
}

// Mockup HTML simulant le futur site (pure HTML, compatible email)
function buildMockupHtml(audit: SiteAudit, lang: string): string {
  const c = getCopy(lang);
  const mockupName = audit.businessName.trim() || audit.sector;
  const colors = ["#1e3a8a", "#7c3aed", "#059669", "#d97706", "#dc2626"];
  const accentColor = colors[Math.abs((mockupName.charCodeAt(0) || 75)) % colors.length];

  return `<table cellpadding="0" cellspacing="0" width="100%" style="background:#111827;border-radius:8px;overflow:hidden;border:2px solid ${accentColor};">
  <!-- Browser bar -->
  <tr><td style="background:#1f2937;padding:6px 10px;">
    <table cellpadding="0" cellspacing="0"><tr>
      <td style="width:8px;height:8px;border-radius:50%;background:#ef4444;font-size:0;">&nbsp;</td>
      <td style="width:6px;font-size:0;">&nbsp;</td>
      <td style="width:8px;height:8px;border-radius:50%;background:#f59e0b;font-size:0;">&nbsp;</td>
      <td style="width:6px;font-size:0;">&nbsp;</td>
      <td style="width:8px;height:8px;border-radius:50%;background:#22c55e;font-size:0;">&nbsp;</td>
      <td style="padding-left:8px;"><span style="background:#374151;border-radius:4px;padding:2px 8px;color:#9ca3af;font-size:10px;font-family:monospace;">&#10024; NEW ${mockupName.slice(0,16)}</span></td>
    </tr></table>
  </td></tr>
  <!-- Hero -->
  <tr><td style="background:linear-gradient(135deg,${accentColor}22,#000000);padding:18px 14px;text-align:center;">
    <div style="font-size:14px;font-weight:800;color:#ffffff;margin-bottom:4px;">${mockupName}</div>
    <div style="font-size:10px;color:rgba(255,255,255,0.6);margin-bottom:10px;">${audit.sector}</div>
    <span style="background:${accentColor};color:#ffffff;font-size:10px;font-weight:700;padding:5px 14px;border-radius:9999px;">CTA &#8594;</span>
  </td></tr>
  <!-- Content blocks -->
  <tr><td style="padding:10px 12px;background:#1a1a2e;">
    <table cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:6px;"><tr>
      <td width="33%" style="padding-right:3px;"><div style="background:${accentColor}33;border-radius:4px;height:28px;font-size:0;">&nbsp;</div></td>
      <td width="33%" style="padding:0 3px;"><div style="background:#ffffff11;border-radius:4px;height:28px;font-size:0;">&nbsp;</div></td>
      <td width="33%" style="padding-left:3px;"><div style="background:#ffffff11;border-radius:4px;height:28px;font-size:0;">&nbsp;</div></td>
    </tr></table>
    <div style="background:#ffffff11;border-radius:4px;height:12px;margin-bottom:5px;font-size:0;">&nbsp;</div>
    <div style="background:#ffffff08;border-radius:4px;height:12px;width:70%;font-size:0;">&nbsp;</div>
  </td></tr>
  <!-- Footer hint -->
  <tr><td style="background:${accentColor};padding:6px;text-align:center;">
    <span style="color:#ffffff;font-size:9px;font-weight:700;">${c.mockupFeatures}</span>
  </td></tr>
</table>`;
}
