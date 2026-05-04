/**
 * Agent 3 : Email Composer
 * Génère l'email de prospection personnalisé dans la bonne langue.
 * Inclut : screenshot du site actuel, mockup du futur site, devis, CTA.
 */

import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";

async function callLLMFast(prompt: string): Promise<string> {
  if (process.env.ANTHROPIC_API_KEY) {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const msg = await client.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 400,
      messages: [{ role: "user", content: prompt }],
    });
    return msg.content[0].type === "text" ? msg.content[0].text : "";
  }
  if (process.env.OPENAI_API_KEY) {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const resp = await client.chat.completions.create({
      model: "gpt-4o-mini",
      max_tokens: 400,
      messages: [{ role: "user", content: prompt }],
    });
    return resp.choices[0]?.message?.content ?? "";
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
  ctaLabel: string; ctaAlt: string; greeting: string; footer: string;
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
    from: "Kenan — KAH-Digital",
    signoff: "Mit freundlichen Gruessen",
    footer: "Sie erhalten diese E-Mail, weil Ihre Website oeffentlich zugaenglich ist.",
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
  // URL devis avec données prospect pour prefill (traitées côté tracking/click)
  const quoteUrl = `${trackingBaseUrl}/devis?utm_source=email&utm_campaign=prospection&utm_medium=email`;

  // Claude génère l'intro et la conclusion personnalisées
  const introConclusionPrompt = `Tu es Kenan, fondateur de KAH-Digital (studio digital — sites web, apps mobiles, SaaS, automatisations IA).
Offres KAH-Digital : landing / portfolio 300–600€, site vitrine 900–1500€, site corporate 2200–4500€, automatisation IA 1500–8000€, application web / dashboard 4000–12000€, application mobile MVP 6000–20000€.
Écris en "${audit.language}" :
1. Une accroche d'intro (2-3 phrases) pour ${audit.businessName}, un commerce dans le secteur ${audit.sector}.
   Score actuel de leur site : ${audit.score}/100. Sois direct et bienveillant, mentionne le site (${lead.website}).
   Si pertinent, ancre le prix estimé (${audit.priceRange}) dans l'intro.
2. Une conclusion courte (1-2 phrases) qui incite à répondre ou demander un devis.
Format JSON : { "intro": "...", "conclusion": "..." }`;

  let intro = `Nous avons analysé votre site ${lead.website} et identifié plusieurs points d'amélioration concrets.`;
  let conclusion = `N'hésitez pas à répondre directement à cet email — je vous prépare un devis détaillé sous 24h.`;

  try {
    const raw = await callLLMFast(introConclusionPrompt);
    const start = raw.indexOf("{"); const end = raw.lastIndexOf("}");
    if (start !== -1 && end !== -1) {
      const parsed = JSON.parse(raw.slice(start, end + 1)) as { intro?: string; conclusion?: string };
      intro = parsed.intro ?? intro;
      conclusion = parsed.conclusion ?? conclusion;
    }
  } catch { /* keep defaults */ }

  // A/B test sujets — 5 variantes, rotation par jour
  const abVariant = Math.floor(Date.now() / 86400000) % 5;
  const SUBJECTS: Record<string, string[]> = {
    fr: [
      `${audit.businessName} — votre site web perd des clients (analyse gratuite)`,
      `J'ai analysé le site de ${audit.businessName} — voici ce que j'ai trouvé`,
      `${audit.businessName} : 3 problèmes qui coûtent des clients chaque semaine`,
      `Score ${audit.score}/100 pour ${audit.businessName} — rapport complet inclus`,
      `Une question rapide sur ${audit.businessName}`,
    ],
    en: [
      `${audit.businessName} — your website is losing customers (free analysis)`,
      `I analysed ${audit.businessName}'s website — here's what I found`,
      `${audit.businessName}: 3 issues costing you customers every week`,
      `Score ${audit.score}/100 for ${audit.businessName} — full report inside`,
      `Quick question about ${audit.businessName}`,
    ],
    es: [
      `${audit.businessName} — su sitio web está perdiendo clientes (análisis gratuito)`,
      `Analicé el sitio de ${audit.businessName} — esto es lo que encontré`,
      `${audit.businessName}: 3 problemas que le cuestan clientes cada semana`,
      `Puntuación ${audit.score}/100 para ${audit.businessName} — informe incluido`,
      `Una pregunta rápida sobre ${audit.businessName}`,
    ],
    de: [
      `${audit.businessName} — Ihre Website verliert Kunden (kostenlose Analyse)`,
      `Ich habe die Website von ${audit.businessName} analysiert — das habe ich gefunden`,
      `${audit.businessName}: 3 Probleme, die jede Woche Kunden kosten`,
      `Score ${audit.score}/100 für ${audit.businessName} — vollständiger Bericht`,
      `Kurze Frage zu ${audit.businessName}`,
    ],
    it: [
      `${audit.businessName} — il tuo sito perde clienti (analisi gratuita)`,
      `Ho analizzato il sito di ${audit.businessName} — ecco cosa ho trovato`,
      `${audit.businessName}: 3 problemi che ti costano clienti ogni settimana`,
      `Punteggio ${audit.score}/100 per ${audit.businessName} — report completo`,
      `Una domanda rapida su ${audit.businessName}`,
    ],
    nl: [
      `${audit.businessName} — uw website verliest klanten (gratis analyse)`,
      `Ik analyseerde de website van ${audit.businessName} — dit vond ik`,
      `${audit.businessName}: 3 problemen die u elke week klanten kosten`,
      `Score ${audit.score}/100 voor ${audit.businessName} — volledig rapport`,
      `Korte vraag over ${audit.businessName}`,
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
            <a href="${clickUrl}?target=reply" style="display:inline-block;background:linear-gradient(135deg,#1e3a8a,#7c3aed);color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;padding:14px 36px;border-radius:9999px;">
              ${c.ctaLabel} →
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
  const colors = ["#1e3a8a", "#7c3aed", "#059669", "#d97706", "#dc2626"];
  const accentColor = colors[Math.abs(audit.businessName.charCodeAt(0)) % colors.length];

  return `<div style="background:#111827;border-radius:8px;overflow:hidden;border:2px solid ${accentColor};font-size:0;">
  <!-- Browser bar -->
  <div style="background:#1f2937;padding:6px 10px;display:flex;align-items:center;gap:6px;">
    <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#ef4444;"></span>
    <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#f59e0b;"></span>
    <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#22c55e;"></span>
    <span style="display:inline-block;margin-left:6px;background:#374151;border-radius:4px;padding:2px 8px;color:#9ca3af;font-size:10px;font-family:monospace;">✨ NEW ${audit.businessName.slice(0,16)}</span>
  </div>
  <!-- Hero -->
  <div style="background:linear-gradient(135deg,${accentColor}22,#000);padding:18px 14px;text-align:center;">
    <div style="font-size:14px;font-weight:800;color:#ffffff;margin-bottom:4px;">${audit.businessName}</div>
    <div style="font-size:10px;color:rgba(255,255,255,0.6);margin-bottom:10px;">${audit.sector}</div>
    <div style="display:inline-block;background:${accentColor};color:#fff;font-size:10px;font-weight:700;padding:5px 14px;border-radius:9999px;">CTA →</div>
  </div>
  <!-- Content blocks -->
  <div style="padding:10px 12px;background:#1a1a2e;">
    <div style="display:flex;gap:6px;margin-bottom:6px;">
      <div style="flex:1;background:${accentColor}33;border-radius:4px;height:28px;"></div>
      <div style="flex:1;background:#ffffff11;border-radius:4px;height:28px;"></div>
      <div style="flex:1;background:#ffffff11;border-radius:4px;height:28px;"></div>
    </div>
    <div style="background:#ffffff08;border-radius:4px;height:14px;margin-bottom:5px;"></div>
    <div style="background:#ffffff08;border-radius:4px;height:14px;width:70%;"></div>
  </div>
  <!-- Footer hint -->
  <div style="background:${accentColor};padding:6px;text-align:center;">
    <span style="color:#fff;font-size:9px;font-weight:700;">${c.mockupFeatures}</span>
  </div>
</div>`;
}
