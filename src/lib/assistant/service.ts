import { Resend } from "resend";
import { pricingRules, type PricingFeature, type PricingProjectType } from "@/config/pricing-rules";
import { brandContact } from "@/config/brand";
import { assistantKnowledge } from "@/lib/assistant/knowledge";
import { sendAdminWhatsAppNotification } from "@/lib/admin-alerts";
import { getSiteUrl, renderBrandedEmail } from "@/lib/email-template";
import { getResendFromAddress } from "@/lib/mail";
import { saveAssistantRecord } from "@/lib/assistant-store";
import { buildAssistantRecord } from "@/lib/assistant/scoring";
import { generateOpenAIJson } from "@/lib/assistant/openai";
import type { QuoteRecord } from "@/lib/quote";
import {
  assistantSessionSchema,
  assistantStructuredOutputSchema,
  type AssistantIntent,
  type AssistantProjectType,
  type AssistantSession,
  type AssistantStructuredOutput,
  type AssistantTranscriptItem,
} from "@/lib/assistant/schema";
import { saveQuoteRecord } from "@/lib/quote-store";

type Locale = "fr" | "en" | "de";

type AssistantProgress = {
  current: number;
  total: number;
  label: string;
};

type AssistantTurnResponse = {
  reply: string;
  progress: AssistantProgress;
  session: AssistantSession;
  summary: AssistantStructuredOutput | null;
  humanNeeded: boolean;
};

const resendClient = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const notificationEmail = process.env.QUOTE_NOTIFICATION_EMAIL ?? brandContact.email;
const adminAssistantUrl = `${getSiteUrl()}/admin/assistant`;

const localeCopy = {
  fr: {
    summaryReady: "Base solide. Je peux maintenant sortir un résumé exploitable.",
    humanEscalation: "La base est suffisante. Je prépare un résumé net et je passe la suite à un expert KAH-Digital.",
    startProject: "On cadre ça proprement.",
    startSupport: "On va qualifier ça vite et bien.",
    nextStepQuote: "Demander un devis clair sous 24h.",
    nextStepSupport: "Résumé support prêt pour ticket ou reprise humaine.",
    nextStepInfo: "Orientation vers le bon service KAH-Digital.",
    projectFlowLabel: "Qualification projet",
    supportFlowLabel: "Qualification support",
    generalFlowLabel: "Orientation",
    faqFollowUp: "Si tu veux une fourchette utile ou une suite claire, on peut cadrer maintenant.",
    invalidConsent: "J'ai besoin de ton consentement pour stocker ou envoyer le résumé.",
    summarySent: "Le résumé a été envoyé par email.",
    leadSent: "Le résumé a été transmis à KAH-Digital pour reprise humaine.",
    glpiCreated: "Le ticket support a été préparé et transmis.",
    glpiFallback: "GLPI n'est pas configuré ici. Je transmets plutôt vers un humain avec résumé.",
    fallbackAnswer:
      "Dis-moi simplement si on parle d'un site, d'une application, de support, de GLPI ou d'un besoin de cadrage. Je prends ensuite le relais avec les bonnes questions.",
    recadrageBudget:
      "Je préfère être transparent : sans périmètre clair, je peux donner une fourchette, pas un prix ferme.",
    recadrageTimeline: "Je peux tester la faisabilité, pas promettre un délai ferme sans cadrage.",
    recadrageMvp:
      "Pour éviter de partir sur quelque chose d'irréaliste, il faut définir les fonctions indispensables au départ.",
    recapIntro: "Voici ce que j'ai compris :",
    faqAnswers: {
      delai: assistantKnowledge.faq[0].answerFr,
      services: assistantKnowledge.faq[1].answerFr,
      maintenance: assistantKnowledge.faq[2].answerFr,
      method: assistantKnowledge.faq[3].answerFr,
    },
    questions: {
      type: "Quel type de projet veux-tu lancer : landing, site vitrine, site corporate, e-commerce, SaaS / app web, automatisation IA, mobile ou GLPI ?",
      objective: "Quel résultat tu veux obtenir avec ce projet : visibilité, demandes clients, vente, automatisation ou support ?",
      features: "Quelles fonctionnalités ou quels blocs sont indispensables pour acheter la bonne offre ?",
      timeline: "Quel délai vises-tu ?",
      budget: "As-tu déjà une fourchette de budget ?",
      users: "Qui va utiliser ou acheter via ce projet : toi, ton équipe, des clients, ou un volume plus large ?",
      countriesLanguages: "Quels pays ou quelles langues sont concernés ?",
      technicalNeeds: "Y a-t-il des besoins spécifiques : admin, paiement, API, design premium, autre ?",
      decisionStage: "Si la fourchette est cohérente, tu préfères recevoir un devis sous 24h, parler à quelqu'un, ou comparer les offres d'abord ?",
      problem: "Quel est le problème principal à résoudre ?",
      urgency: "Quel est le niveau d'urgence ?",
      impact: "Quel est l'impact sur l'activité ou les utilisateurs ?",
      affectedUsers: "Combien d'utilisateurs sont touchés ?",
      sinceWhen: "Depuis quand le problème existe-t-il ?",
      actionsTried: "Quelles actions ont déjà été tentées ?",
      supportPlan: "Après correction, tu cherches juste une intervention ponctuelle ou aussi une maintenance mensuelle ?",
    },
  },
  en: {
    summaryReady: "The base is solid. I can now turn this into a usable summary.",
    humanEscalation: "The base is strong enough. I am preparing a clean summary and handing it to a KAH-Digital expert.",
    startProject: "Let's frame this properly.",
    startSupport: "Let's qualify this quickly and cleanly.",
    nextStepQuote: "Request a clear quote within 24h.",
    nextStepSupport: "Support summary ready for ticket creation or human follow-up.",
    nextStepInfo: "Route toward the right KAH-Digital service.",
    projectFlowLabel: "Project qualification",
    supportFlowLabel: "Support qualification",
    generalFlowLabel: "Routing",
    faqFollowUp: "If you want a useful range or a clear next step, we can frame it now.",
    invalidConsent: "I need your consent before storing or sending the summary.",
    summarySent: "The summary was sent by email.",
    leadSent: "The summary was forwarded to KAH-Digital for human follow-up.",
    glpiCreated: "The support ticket was prepared and sent.",
    glpiFallback: "GLPI is not configured here. I am routing the summary to a human instead.",
    fallbackAnswer:
      "Tell me whether this is about a website, an application, support, GLPI, or general framing. I will take it from there with the right questions.",
    recadrageBudget:
      "To be transparent, without a clear scope I can give you a range, not a fixed price.",
    recadrageTimeline: "I can test feasibility, but not promise a fixed timeline without framing.",
    recadrageMvp: "To avoid an unrealistic scope, we need to define the must-have features first.",
    recapIntro: "Here is what I understood:",
    faqAnswers: {
      delai: assistantKnowledge.faq[0].answerEn,
      services: assistantKnowledge.faq[1].answerEn,
      maintenance: assistantKnowledge.faq[2].answerEn,
      method: assistantKnowledge.faq[3].answerEn,
    },
    questions: {
      type: "What type of project do you want to launch: landing, showcase site, corporate site, e-commerce, SaaS / web app, AI automation, mobile, or GLPI?",
      objective: "What result do you want from this project: visibility, leads, sales, automation, or support?",
      features: "Which features or blocks are essential to choose the right offer?",
      timeline: "What timeline are you targeting?",
      budget: "Do you already have a budget range in mind?",
      users: "Who will use or buy through this project: you, your team, clients, or a larger volume?",
      countriesLanguages: "Which countries or languages are involved?",
      technicalNeeds: "Any specific needs: admin area, payment, API, premium design, other?",
      decisionStage: "If the range makes sense, would you rather receive a quote within 24h, talk to someone, or compare offers first?",
      problem: "What is the main issue to solve?",
      urgency: "How urgent is it?",
      impact: "What is the impact on the business or users?",
      affectedUsers: "How many users are affected?",
      sinceWhen: "How long has the issue existed?",
      actionsTried: "What has already been tried?",
      supportPlan: "After the fix, do you only need a one-off intervention, or also monthly maintenance?",
    },
  },
  de: {
    summaryReady: "Die Basis ist solide. Ich kann daraus jetzt eine brauchbare Zusammenfassung machen.",
    humanEscalation: "Die Basis ist ausreichend. Ich bereite eine klare Zusammenfassung vor und übergebe an einen KAH-Digital Experten.",
    startProject: "Wir grenzen das jetzt sauber ein.",
    startSupport: "Wir qualifizieren das jetzt schnell und sauber.",
    nextStepQuote: "Klares Angebot innerhalb von 24h anfragen.",
    nextStepSupport: "Support-Zusammenfassung bereit für Ticket oder menschliche Übernahme.",
    nextStepInfo: "Weiterleitung zum passenden KAH-Digital Service.",
    projectFlowLabel: "Projektqualifizierung",
    supportFlowLabel: "Supportqualifizierung",
    generalFlowLabel: "Orientierung",
    faqFollowUp: "Wenn du eine belastbare Spanne oder den nächsten klaren Schritt willst, können wir jetzt sauber eingrenzen.",
    invalidConsent: "Ich brauche deine Zustimmung, bevor ich die Zusammenfassung speichere oder versende.",
    summarySent: "Die Zusammenfassung wurde per E-Mail versendet.",
    leadSent: "Die Zusammenfassung wurde an KAH-Digital für eine menschliche Rückmeldung weitergeleitet.",
    glpiCreated: "Das Support-Ticket wurde vorbereitet und übermittelt.",
    glpiFallback: "GLPI ist hier nicht konfiguriert. Ich leite die Zusammenfassung stattdessen an einen Menschen weiter.",
    fallbackAnswer:
      "Sag mir einfach, ob es um eine Website, eine Anwendung, Support, GLPI oder um erstes Cadrage geht. Danach stelle ich nur die wirklich nötigen Fragen.",
    recadrageBudget:
      "Ich bin lieber direkt: Ohne klaren Umfang kann ich eine Spanne nennen, aber keinen festen Preis.",
    recadrageTimeline: "Ich kann die Machbarkeit prüfen, aber keinen festen Termin ohne Cadrage versprechen.",
    recadrageMvp: "Damit das nicht unrealistisch wird, müssen zuerst die Pflichtfunktionen festgelegt werden.",
    recapIntro: "Das habe ich verstanden:",
    faqAnswers: {
      delai: assistantKnowledge.faq[0].answerDe,
      services: assistantKnowledge.faq[1].answerDe,
      maintenance: assistantKnowledge.faq[2].answerDe,
      method: assistantKnowledge.faq[3].answerDe,
    },
    questions: {
      type: "Welche Art Projekt willst du starten: Landing, Unternehmenswebsite, Corporate-Site, E-Commerce, SaaS / Web-App, KI-Automatisierung, Mobile oder GLPI?",
      objective: "Welches Ergebnis soll das Projekt bringen: Sichtbarkeit, Anfragen, Verkauf, Automatisierung oder Support?",
      features: "Welche Funktionen oder Bloecke sind unverzichtbar, um das richtige Angebot zu waehlen?",
      timeline: "Welchen Zeitrahmen peilst du an?",
      budget: "Gibt es bereits eine Budgetspanne?",
      users: "Wer nutzt oder kauft ueber das Projekt: du, dein Team, Kunden oder ein groesseres Volumen?",
      countriesLanguages: "Welche Laender oder Sprachen sind betroffen?",
      technicalNeeds: "Gibt es besondere Anforderungen: Admin, Zahlung, API, Premium-Design, anderes?",
      decisionStage: "Wenn die Spanne passt: willst du ein Angebot innerhalb von 24h, mit jemandem sprechen oder zuerst Angebote vergleichen?",
      problem: "Was ist das Hauptproblem, das geloest werden muss?",
      urgency: "Wie dringend ist das Thema?",
      impact: "Wie stark ist der Einfluss auf Betrieb oder Nutzer?",
      affectedUsers: "Wie viele Nutzer sind betroffen?",
      sinceWhen: "Seit wann besteht das Problem?",
      actionsTried: "Welche Schritte wurden bereits versucht?",
      supportPlan: "Nach der Korrektur: brauchst du nur einen einmaligen Eingriff oder auch monatliche Wartung?",
    },
  },
} as const;

const projectQuestionOrder = ["type", "objective", "features", "timeline", "budget", "decisionStage"] as const;
const supportQuestionOrder = ["problem", "urgency", "impact", "affectedUsers", "sinceWhen", "actionsTried", "supportPlan"] as const;

const faqIntentKeywords = ["faq", "comment", "combien", "how", "what", "do you", "wie", "was", "wann"];
const projectIntentKeywords = [
  "site",
  "website",
  "landing",
  "portfolio",
  "ecommerce",
  "e-commerce",
  "application",
  "app",
  "mvp",
  "dashboard",
  "portail",
  "portal",
  "plateforme",
  "platform",
  "saas",
  "logiciel",
  "software",
  "produit web",
  "web product",
  "ia",
  "ai",
  "automatisation",
  "automation",
  "chatbot",
  "llm",
  "refonte",
  "outil",
  "tool",
  "devis",
];
const supportIntentKeywords = ["support", "ticket", "incident", "bug", "probleme", "problem", "erreur", "glpi", "panne", "issue"];
const projectBuildPhrases = [
  "je veux",
  "je souhaite",
  "je voudrais",
  "j'aimerais",
  "j'ai besoin",
  "besoin de",
  "lancer",
  "creer",
  "développer",
  "developper",
  "build",
  "refonte",
  "mettre en place",
  "connecte a glpi",
  "connecté à glpi",
  "connecte au glpi",
  "workflow support",
];
const activeIssuePhrases = ["ne fonctionne", "ne marche", "bloque", "bloqué", "down", "incident", "erreur", "panne", "ticket"];
const unrealisticKeywords = ["uber", "airbnb", "amazon", "doctolib", "booking", "uber eats"];
const lowBudgetKeywords = ["petit budget", "pas cher", "100", "200", "300", "500", "1000"];
const urgentKeywords = ["vite", "urgent", "rapidement", "demain", "cette semaine", "asap"];

function getCopy(locale: Locale) {
  return localeCopy[locale];
}

function normalizeSession(session?: Partial<AssistantSession>, locale: Locale = "fr") {
  return assistantSessionSchema.parse({
    ...session,
    locale: session?.locale ?? locale,
  });
}

function nowIso() {
  return new Date().toISOString();
}

function appendTranscript(transcript: AssistantTranscriptItem[], role: "user" | "assistant", content: string) {
  return [...transcript, { role, content, at: nowIso() }];
}

function keywordMatch(input: string, words: string[]) {
  const normalized = input.toLowerCase();
  return words.some((word) => normalized.includes(word));
}

function inferProjectType(input: string): AssistantProjectType {
  const text = input.toLowerCase();
  if (text.includes("glpi")) return "glpi_assistant";
  if (/(landing|portfolio|page unique|one page|one-page)/.test(text)) return "landing_portfolio";
  if (/(automatisation|automation|chatbot|llm|assistant ia|ai assistant|intelligence artificielle|\bia\b|\bai\b)/.test(text)) return "automation_ai";
  if (text.includes("mobile")) return "mobile_app";
  if (/(saas|logiciel|software|produit web|web product)/.test(text)) return "web_app";
  if (text.includes("dashboard") || text.includes("portail") || text.includes("portal") || text.includes("plateforme") || text.includes("platform")) return "dashboard_portal";
  if (text.includes("app") || text.includes("application")) return "web_app";
  if (text.includes("ecommerce") || text.includes("e-commerce") || text.includes("boutique") || text.includes("shop")) return "ecommerce";
  if (text.includes("corporate") || text.includes("premium")) return "corporate_website";
  if (text.includes("site") || text.includes("landing") || text.includes("vitrine")) return "showcase_website";
  return "unknown";
}

function inferIntent(input: string): AssistantIntent {
  const text = input.toLowerCase();
  const looksLikeProject = keywordMatch(text, projectIntentKeywords) || keywordMatch(text, projectBuildPhrases);
  const looksLikeIssue = keywordMatch(text, activeIssuePhrases);
  const looksLikeSupport = keywordMatch(text, supportIntentKeywords) || looksLikeIssue;
  const looksLikeOperationalGlpi =
    text.includes("glpi") &&
    looksLikeIssue &&
    /(ticket|probleme|problem|incident|bug|erreur|panne)/.test(text) &&
    !/(assistant|connecte|connecté|mettre en place|workflow|parcours|solution|outil|integr)/.test(text);
  const looksLikeGlpiBuild = text.includes("glpi") && (looksLikeProject || text.includes("assistant") || text.includes("parcours"));

  if (looksLikeOperationalGlpi) return "support_glpi";
  if (looksLikeGlpiBuild) return "project_quote";
  if (looksLikeProject && !looksLikeIssue) return "project_quote";
  if (looksLikeSupport) return "support_glpi";
  if (keywordMatch(text, faqIntentKeywords)) return "faq";
  return "unknown";
}

function findFaqAnswer(input: string, locale: Locale) {
  const text = input.toLowerCase();
  for (const entry of assistantKnowledge.faq) {
    if (entry.keywords.some((keyword) => text.includes(keyword))) {
      if (locale === "en") return entry.answerEn;
      if (locale === "de") return entry.answerDe;
      return entry.answerFr;
    }
  }
  return null;
}

function inferFeatures(collected: AssistantSession["collected"]) {
  const fullText = Object.values(collected).filter(Boolean).join(" ").toLowerCase();
  const features = new Set<PricingFeature>();

  if (/(auth|login|connexion|compte|account|role|roles)/.test(fullText)) features.add("auth");
  if (/(paiement|payment|stripe|checkout|subscription|abonnement)/.test(fullText)) features.add("payment");
  if (/(api|integration|crm|webhook|erp)/.test(fullText)) features.add("api");
  if (/(dashboard|admin|back-office|portal|portail)/.test(fullText)) features.add("dashboard");
  if (/(geoloc|map|gps|localisation|geolocation)/.test(fullText)) features.add("geolocation");
  if (/(multilingue|multi-language|multilingual|language|langue|langues)/.test(fullText)) features.add("multilingual");

  return Array.from(features);
}

function projectTypeToPricingType(projectType: AssistantProjectType): PricingProjectType {
  switch (projectType) {
    case "landing_portfolio":
      return "landing_portfolio";
    case "showcase_website":
      return "showcase_website";
    case "corporate_website":
      return "corporate_website";
    case "ecommerce":
      return "ecommerce";
    case "web_app":
      return "web_app";
    case "mobile_app":
      return "mobile_app";
    case "dashboard_portal":
      return "dashboard_portal";
    case "glpi_assistant":
      return "glpi_assistant";
    case "automation_ai":
      return "automation_ai";
    default:
      return "unknown";
  }
}

function getRequiredFields(intent: AssistantIntent) {
  if (intent === "support_glpi") return supportQuestionOrder;
  if (intent === "project_quote") return projectQuestionOrder;
  return [] as const;
}

function getProjectRoles(projectType: AssistantProjectType, features: PricingFeature[]) {
  const roles = new Set<string>(["Project lead"]);

  if (projectType === "landing_portfolio" || projectType === "showcase_website" || projectType === "corporate_website" || projectType === "ecommerce") {
    roles.add("Designer");
    roles.add("Front-end developer");
  }

  if (projectType === "web_app" || projectType === "mobile_app" || projectType === "dashboard_portal" || projectType === "glpi_assistant") {
    roles.add("Product designer");
    roles.add("Front-end developer");
    roles.add("Back-end developer");
  }

  if (projectType === "automation_ai") {
    roles.add("Automation specialist");
    roles.add("AI integration");
  }

  if (projectType === "mobile_app") {
    roles.add("Mobile developer");
  }

  if (projectType === "glpi_assistant") {
    roles.add("Integration specialist");
  }

  if (features.includes("payment")) roles.add("Payment integration");
  if (features.includes("api")) roles.add("API integration");
  if (features.includes("dashboard")) roles.add("QA");

  return Array.from(roles);
}

function computeComplexity(totalDays: number) {
  if (totalDays <= 10) return "low";
  if (totalDays <= 30) return "medium";
  return "high";
}

function resolveEffectiveProjectType(projectType: AssistantProjectType, features: PricingFeature[]): AssistantProjectType {
  if (
    features.includes("payment") &&
    (projectType === "landing_portfolio" || projectType === "showcase_website" || projectType === "corporate_website")
  ) {
    return "ecommerce";
  }

  if (
    (features.includes("auth") || features.includes("dashboard") || features.includes("api")) &&
    projectType === "landing_portfolio"
  ) {
    return "web_app";
  }

  if (features.includes("dashboard") && projectType === "showcase_website") {
    return "dashboard_portal";
  }

  return projectType;
}

function getProgress(intent: AssistantIntent, collected: AssistantSession["collected"], locale: Locale): AssistantProgress {
  const requiredFields = getRequiredFields(intent);
  const answered = requiredFields.filter((field) => Boolean(collected[field])).length;
  const total = requiredFields.length || 1;
  const copy = getCopy(locale);

  let label: string = copy.generalFlowLabel;
  if (intent === "project_quote") label = copy.projectFlowLabel;
  if (intent === "support_glpi") label = copy.supportFlowLabel;

  return {
    current: Math.min(total, answered + (answered === total ? 0 : 1)),
    total,
    label,
  };
}

function buildStructuredSummary(session: AssistantSession): AssistantStructuredOutput {
  const requiredFields = getRequiredFields(session.intent);
  const missingInfo = requiredFields.filter((field) => !session.collected[field]).map((field) => String(field));
  const clarityScore = requiredFields.length === 0 ? 60 : Math.round(((requiredFields.length - missingInfo.length) / requiredFields.length) * 100);

  if (session.intent === "support_glpi") {
    const urgency = session.collected.urgency?.toLowerCase() ?? "";
    const impact = session.collected.impact?.toLowerCase() ?? "";
    const complexity =
      /(bloque|blocked|critique|critical|plusieurs|multiple|many)/.test(`${urgency} ${impact}`) ? "high" : missingInfo.length > 2 ? "medium" : "low";

    return assistantStructuredOutputSchema.parse({
      intent: "support_glpi",
      project_type: "glpi_assistant",
      clarity_score: clarityScore,
      complexity,
      budget_range: { min: 0, max: 0 },
      estimated_days: complexity === "high" ? 3 : complexity === "medium" ? 2 : 1,
      roles: ["Support lead", "Technical contact"],
      missing_info: missingInfo,
      next_step: missingInfo.length
        ? "Clarifier le contexte avant ticket."
        : "Resume support pret pour ticket, reprise humaine ou maintenance.",
    });
  }

  const detectedFeatures = inferFeatures(session.collected);
  const effectiveProjectType = resolveEffectiveProjectType(session.projectType, detectedFeatures);
  const pricingType = projectTypeToPricingType(effectiveProjectType);
  const baseDays = Number(pricingRules.baseDays[pricingType]);
  const featureDays = detectedFeatures.reduce<number>(
    (sum, feature) => sum + Number(pricingRules.featureWeights[feature]),
    0
  );
  const weightedDays = baseDays + featureDays;
  const publicRange = pricingRules.catalogRanges[pricingType];
  const scopeMultiplier = featureDays > 4 ? 1 + Math.min(0.35, (featureDays - 4) / 30) : 1;
  const budgetMin = publicRange.min;
  const budgetMax = Math.round((publicRange.max * scopeMultiplier) / 100) * 100;
  const complexity = computeComplexity(weightedDays);

  return assistantStructuredOutputSchema.parse({
    intent: "project_quote",
    project_type: effectiveProjectType,
    clarity_score: clarityScore,
    complexity,
    budget_range: { min: budgetMin, max: budgetMax },
    estimated_days: weightedDays,
    roles: getProjectRoles(effectiveProjectType, detectedFeatures),
    missing_info: missingInfo,
    next_step: missingInfo.length
      ? "Completer les informations manquantes avant devis."
      : "Demander un devis clair sous 24h avec le bon perimetre.",
  });
}

async function refineSummaryWithOpenAI(session: AssistantSession, locale: Locale) {
  const instructions = `
You are a business qualification assistant for KAH-Digital.
Return only valid JSON.
Classify the request, structure the output, and keep uncertainty explicit.
Never promise fixed prices or fixed delivery.
Allowed intents: project_quote, support_glpi, faq, general_info, unknown.
Allowed project types: landing_portfolio, showcase_website, corporate_website, ecommerce, web_app, mobile_app, dashboard_portal, glpi_assistant, automation_ai, unknown.
Classify SaaS, software, produit web, and web product as web_app.
Allowed complexity: low, medium, high.
Act like a pre-project lead, not a generic chatbot.
Be direct, concise, structured, and commercially useful.
Flag vague requests, unrealistic expectations, and missing essentials clearly.
Use the current public offers and maintenance plans as the pricing source. Push toward quote submission only when scope, timing, and budget are coherent enough.
`;

  const output = await generateOpenAIJson<AssistantStructuredOutput>({
    instructions,
    input: JSON.stringify({
      locale,
      positioning: assistantKnowledge.positioning,
      process: assistantKnowledge.process,
      services: assistantKnowledge.services,
      offers: assistantKnowledge.offers,
      maintenancePlans: assistantKnowledge.maintenancePlans,
      referenceProjects: assistantKnowledge.referenceProjects,
      session,
    }),
  });

  if (!output) return null;

  const parsed = assistantStructuredOutputSchema.safeParse(output);
  return parsed.success ? parsed.data : null;
}

function detectEscalation(summary: AssistantStructuredOutput, session: AssistantSession) {
  if (summary.complexity === "high") return true;
  if (summary.budget_range.max >= 8000) return true;
  if (summary.clarity_score < 55) return true;
  if (summary.missing_info.length >= 3) return true;
  if (session.intent === "support_glpi" && /(critique|critical|bloque|blocked)/i.test(JSON.stringify(session.collected))) return true;
  return false;
}

const ACK_VARIANTS: Record<Locale, string[]> = {
  fr: ["Compris.", "Noté.", "OK.", "C'est clair.", "Bien vu.", "Bien reçu.", "Je vois.", "Clair.", "Ça marche.", "Parfait."],
  en: ["Got it.", "Understood.", "Makes sense.", "Clear.", "Noted.", "Perfect.", "OK.", "Alright."],
  de: ["Verstanden.", "Klar.", "Alles klar.", "Notiert.", "OK.", "Gut.", "Prima."],
};

function pickAck(locale: Locale): string {
  const list = ACK_VARIANTS[locale];
  return list[Math.floor(Math.random() * list.length)] ?? list[0] ?? "OK.";
}

function acknowledgeAndAsk(locale: Locale, question: string) {
  return `${pickAck(locale)} ${question}`;
}

function detectUnrealisticRequest(message: string) {
  const text = message.toLowerCase();
  return keywordMatch(text, unrealisticKeywords) && keywordMatch(text, lowBudgetKeywords);
}

function detectUrgentRequest(message: string) {
  return keywordMatch(message.toLowerCase(), urgentKeywords);
}

function formatProjectTypeLabel(projectType: AssistantProjectType, locale: Locale) {
  const labels = {
    fr: {
      landing_portfolio: "landing / portfolio",
      showcase_website: "site vitrine",
      corporate_website: "site corporate",
      ecommerce: "e-commerce",
      web_app: "application web / SaaS",
      mobile_app: "application mobile",
      dashboard_portal: "dashboard ou portail",
      glpi_assistant: "solution connectee a GLPI",
      automation_ai: "automatisation IA",
      unknown: "projet digital",
    },
    en: {
      landing_portfolio: "landing / portfolio",
      showcase_website: "showcase website",
      corporate_website: "corporate website",
      ecommerce: "e-commerce",
      web_app: "web application / SaaS",
      mobile_app: "mobile application",
      dashboard_portal: "dashboard or portal",
      glpi_assistant: "GLPI-connected solution",
      automation_ai: "AI automation",
      unknown: "digital project",
    },
    de: {
      landing_portfolio: "Landing / Portfolio",
      showcase_website: "Unternehmenswebsite",
      corporate_website: "Corporate-Website",
      ecommerce: "E-Commerce",
      web_app: "Web-Anwendung / SaaS",
      mobile_app: "Mobile-App",
      dashboard_portal: "Dashboard oder Portal",
      glpi_assistant: "GLPI-nahe Lösung",
      automation_ai: "KI-Automatisierung",
      unknown: "Digitalprojekt",
    },
  } as const;

  return labels[locale][projectType];
}

function getOfferHint(projectType: AssistantProjectType, locale: Locale) {
  const offer = assistantKnowledge.offers.find((item) => item.projectType === projectType);
  if (!offer) return null;

  if (locale === "en") {
    return `${offer.nameEn} usually fits here: ${offer.price}, ${offer.timelineEn}.`;
  }

  if (locale === "de") {
    return `${offer.nameDe} passt hier meist: ${offer.price}, ${offer.timelineDe}.`;
  }

  return `L'offre la plus proche est ${offer.nameFr} : ${offer.price}, ${offer.timelineFr}.`;
}

function estimateCalendarRange(days: number, locale: Locale) {
  if (locale === "en") {
    if (days <= 5) return "about 1 week";
    if (days <= 15) return "about 2 to 4 weeks";
    return "several weeks with validation checkpoints";
  }

  if (locale === "de") {
    if (days <= 5) return "etwa 1 Woche";
    if (days <= 15) return "etwa 2 bis 4 Wochen";
    return "mehrere Wochen mit Abstimmungsschritten";
  }

  if (days <= 5) return "environ 1 semaine";
  if (days <= 15) return "environ 2 a 4 semaines";
  return "plusieurs semaines avec validations intermediaires";
}

function buildProjectQuestion(session: AssistantSession, locale: Locale, nextMissing: string) {
  const copy = getCopy(locale);
  const projectType = session.projectType;
  const objective = session.collected.objective?.toLowerCase() ?? "";

  if (nextMissing === "features") {
    if (projectType === "landing_portfolio") {
      return locale === "en"
        ? "For a landing, what must be on the page: offer, proof, contact form, booking link, portfolio, or payment?"
        : locale === "de"
          ? "Für eine Landing: was muss auf die Seite - Angebot, Nachweis, Kontaktformular, Buchungslink, Portfolio oder Zahlung?"
          : "Pour une landing, qu'est-ce qui doit être sur la page : offre, preuves, formulaire, lien de réservation, portfolio ou paiement ?";
    }

    if (projectType === "showcase_website" || projectType === "corporate_website") {
      return locale === "en"
        ? "To answer seriously, I need the minimum useful scope: roughly how many pages, and do you need lead capture, SEO, multilingual content, or a premium visual direction?"
        : locale === "de"
          ? "Damit ich seriös antworten kann, brauche ich den minimal nötigen Scope: ungefähr wie viele Seiten, und brauchst du Lead-Erfassung, SEO, Mehrsprachigkeit oder eine hochwertige visuelle Richtung?"
          : "Pour te repondre serieusement, il me faut le minimum utile : combien de pages environ, et est-ce qu'il faut capture de contacts, SEO, multilingue ou une direction visuelle premium ?";
    }

    if (projectType === "web_app" || projectType === "mobile_app") {
      return locale === "en"
        ? "Let's frame the useful scope: do you need user accounts, payments, a dashboard, API integrations, or geolocation?"
        : locale === "de"
          ? "Lass uns den scope eingrenzen: brauchst du Benutzerkonten, Zahlung, Dashboard, API-Integrationen oder Geolokalisierung?"
          : "On cadre le scope utile : il faut des comptes utilisateurs, du paiement, un dashboard, des intégrations API ou de la géolocalisation ?";
    }

    if (projectType === "automation_ai") {
      return locale === "en"
        ? "For the AI automation, what should be automated first: customer replies, document processing, internal workflow, CRM/email sync, or a site assistant?"
        : locale === "de"
          ? "Für die KI-Automatisierung: was soll zuerst automatisiert werden - Kundenantworten, Dokumente, interner Workflow, CRM/E-Mail-Sync oder Site-Assistent?"
          : "Pour l'automatisation IA, qu'est-ce qu'on automatise en premier : réponses clients, documents, workflow interne, synchro CRM/email ou assistant sur le site ?";
    }

    if (projectType === "glpi_assistant") {
      return locale === "en"
        ? "For version 1 around GLPI, what must exist from day one: user guidance, request qualification, automatic ticket creation, knowledge base, or dashboard?"
        : locale === "de"
          ? "Für eine Version 1 rund um GLPI: was ist zwingend nötig - Nutzerhilfe, Qualifizierung, automatische Ticketerstellung, Wissensbasis oder Dashboard?"
          : "Pour une version 1 autour de GLPI, qu'est-ce qui doit exister des le depart : aide utilisateur, qualification des demandes, creation automatique de ticket, base de connaissance ou dashboard ?";
    }
  }

  if (nextMissing === "timeline") {
    if (detectUrgentRequest(objective)) {
      return locale === "en"
        ? `${copy.recadrageTimeline} What is the hard deadline, and what is strictly required for launch?`
        : locale === "de"
          ? `${copy.recadrageTimeline} Was ist die echte Deadline, und was ist für den Start wirklich unverzichtbar?`
          : `${copy.recadrageTimeline} Quelle est la vraie date limite, et qu'est-ce qui est strictement indispensable au lancement ?`;
    }
    return copy.questions.timeline;
  }

  if (nextMissing === "budget") {
    return locale === "en"
      ? `${copy.recadrageBudget} What range do you have in mind, even roughly?`
      : locale === "de"
        ? `${copy.recadrageBudget} Welche Spanne hast du im Kopf, selbst grob?`
        : `${copy.recadrageBudget} Quelle fourchette tu envisages, meme approximative ?`;
  }

  if (nextMissing === "decisionStage") {
    return copy.questions.decisionStage;
  }

  if (nextMissing === "objective" && (projectType === "landing_portfolio" || projectType === "showcase_website" || projectType === "corporate_website")) {
    return locale === "en"
      ? "Key point first: is the site meant to present the business, generate leads, or sell?"
      : locale === "de"
        ? "Der Schluesselpunkt zuerst: soll die Seite das Unternehmen praesentieren, Kontakte erzeugen oder verkaufen?"
        : "Le point cle d'abord : le site sert a presenter l'activite, generer des contacts ou vendre ?";
  }

  return copy.questions[nextMissing as keyof typeof copy.questions];
}

function buildDiscoveryReply(message: string, locale: Locale) {
  const text = message.toLowerCase();

  if (/(devis|quote)/.test(text)) {
    return locale === "en"
      ? "Yes, but for a usable quote I need the minimum useful scope: project type, objective, main features, and target timeline. Start with the project type."
      : locale === "de"
        ? "Ja, aber für ein brauchbares Angebot brauche ich den minimal nötigen Rahmen: Projekttyp, Ziel, Hauptfunktionen und Zieltermin. Starte mit dem Projekttyp."
        : "Oui, mais pour qu'un devis soit exploitable, il me faut le minimum utile : type de projet, objectif, fonctionnalites principales et delai vise. Commence par le type de projet.";
  }

  if (/(digitaliser|digitalize|digitalisieren)/.test(text)) {
    return locale === "en"
      ? "Good. Let's make it concrete: what is your current activity, is the goal to get clients, automate work, sell online, or improve internal follow-up, and do you already have tools in place?"
      : locale === "de"
        ? "Gut. Jetzt machen wir es konkret: was ist deine aktuelle Aktivitaet, ist das Ziel mehr Kunden, Automatisierung, Online-Verkauf oder besseres internes Follow-up, und gibt es schon Tools?"
        : "Tres bien. Maintenant on rend ca concret : ton activite actuelle, ton objectif principal - plus de clients, automatisation, vente en ligne ou meilleur suivi interne - et est-ce que tu as deja des outils en place ?";
  }

  if (/(voir ce que vous proposez|voir ce que tu proposes|vos services|vos offres|what do you offer|leistungen)/.test(text)) {
    return locale === "en"
      ? "I can orient you quickly, but let's avoid the generic catalog answer: are you looking for a website, an application, support, or a GLPI-related workflow, and is your need already defined or are you still exploring?"
      : locale === "de"
        ? "Ich kann dich schnell orientieren, aber ohne Standardkatalog: suchst du eher eine Website, eine Anwendung, Support oder einen GLPI-nahen Workflow, und ist der Bedarf schon definiert oder noch offen?"
        : "Je peux t'orienter rapidement, mais sans réponse catalogue : tu cherches plutôt un site, une application, du support ou un parcours type GLPI, et ton besoin est déjà défini ou tu explores encore ?";
  }

  if (/(budget)/.test(text)) {
    return locale === "en"
      ? "No problem. I can give you a first range, but I need to place the scope first: simple website or more advanced project, which features are must-have, and are you aiming for a quick base or something more complete from the start?"
      : locale === "de"
        ? "Kein Problem. Ich kann eine erste Spanne geben, aber zuerst muss der Umfang klar sein: einfache Website oder avanciertes Projekt, welche Funktionen sind Pflicht, und willst du eine schnelle Basis oder direkt etwas Vollstaendigeres?"
        : "Pas de souci. Je peux te donner une premiere fourchette, mais il faut d'abord situer le perimetre : site simple ou projet plus avance, quelles fonctions sont indispensables, et tu veux une base rapide ou quelque chose de plus complet des le depart ?";
  }

  if (detectUrgentRequest(text)) {
    return locale === "en"
      ? "Understood. To know if the timeline is realistic, I need three things: what exactly has to be delivered, what is the hard deadline, and what is strictly required for launch?"
      : locale === "de"
        ? "Verstanden. Um zu sehen, ob der Zeitrahmen realistisch ist, brauche ich drei Punkte: was genau geliefert werden muss, was die feste Deadline ist, und was zum Start wirklich unverzichtbar ist."
        : "C'est noté. Pour savoir si le délai est réaliste, il me faut trois points : ce qu'il faut livrer exactement, la date limite ferme, et ce qui est strictement indispensable au lancement.";
  }

  if (/(bonjour|salut|hello|coucou|hallo|guten\s+tag|hi\b)/i.test(text)) {
    return locale === "en"
      ? "Hello! I'm here to help you frame a project or handle a support request. Tell me what you want to build, sell, or improve — and I'll route you to the right offer."
      : locale === "de"
        ? "Hallo! Ich helfe dir, ein Projekt einzugrenzen oder eine Support-Anfrage zu bearbeiten. Sag mir, was du bauen, verkaufen oder verbessern willst — ich leite dich zum richtigen Angebot."
        : "Bonjour ! Je suis là pour cadrer un projet ou traiter une demande de support. Dis-moi ce que tu veux créer, vendre ou améliorer — je t'oriente vers la bonne offre.";
  }

  if (/(merci|thank|danke)/i.test(text)) {
    return locale === "en"
      ? "You're welcome. If you have a project in mind or a support issue, just describe it and I'll take it from there."
      : locale === "de"
        ? "Gerne. Wenn du ein Projekt oder ein Support-Anliegen hast, beschreib es einfach und ich übernehme."
        : "Avec plaisir. Si tu as un projet en tête ou un problème de support, décris-le simplement et je prends le relais.";
  }

  return getCopy(locale).fallbackAnswer;
}

function buildSupportQuestion(session: AssistantSession, locale: Locale, nextMissing: string) {
  const copy = getCopy(locale);

  if (nextMissing === "urgency") {
    return locale === "en"
      ? "Go straight to the point: is the activity blocked, degraded, or just inconvenient?"
      : locale === "de"
        ? "Direkt zur Dringlichkeit: ist der Betrieb blockiert, eingeschraenkt oder nur gestoert?"
        : "Allons droit au but : l'activite est bloquee, degradee ou simplement genante ?";
  }

  if (nextMissing === "impact") {
    return locale === "en"
      ? "What is the exact impact: no access, errors, data issue, payment blocked, or something else?"
      : locale === "de"
        ? "Was ist der genaue Impact: kein Zugriff, Fehlermeldungen, Datenproblem, Zahlung blockiert oder etwas anderes?"
        : "Quel est l'impact exact : plus d'acces, erreurs, probleme de donnees, paiement bloque ou autre chose ?";
  }

  if (nextMissing === "supportPlan") {
    return copy.questions.supportPlan;
  }

  return copy.questions[nextMissing as keyof typeof copy.questions];
}

function buildProjectTypeOpener(session: AssistantSession, locale: Locale): string {
  if (session.projectType === "unknown") return "";
  const label = formatProjectTypeLabel(session.projectType, locale);
  if (locale === "en") return `${label.charAt(0).toUpperCase()}${label.slice(1)} — noted.`;
  if (locale === "de") return `${label} — verstanden.`;
  return `${label.charAt(0).toUpperCase()}${label.slice(1)} — noté.`;
}

function buildFirstReply(session: AssistantSession, locale: Locale, message: string) {
  const copy = getCopy(locale);
  const text = message.toLowerCase();

  if (session.intent === "project_quote") {
    if (detectUnrealisticRequest(message)) {
      return locale === "en"
        ? `${copy.recadrageMvp} A project like that implies real-time logic, user accounts, and a solid backend. Let's start with version 1: what is strictly essential, and what budget is actually in play?`
        : locale === "de"
          ? `${copy.recadrageMvp} So ein Projekt braucht Echtzeitlogik, Benutzerkonten und ein solides Backend. Version 1 zuerst: was ist wirklich unverzichtbar, und welches Budget steht zur Verfuegung?`
          : `${copy.recadrageMvp} Un projet de ce niveau implique temps réel, comptes utilisateurs et backend solide. On part sur une version 1 : qu'est-ce qui est vraiment indispensable, et quel budget est réalistement disponible ?`;
    }

    const nextMissing = getRequiredFields(session.intent).find((field) => !session.collected[field]);
    if (!nextMissing) return copy.summaryReady;

    const opener = buildProjectTypeOpener(session, locale);

    if (!opener && session.projectType === "unknown") {
      if (/(devis|quote)/.test(text)) {
        return locale === "en"
          ? "Sure. For a quote to be useful I need the basics: project type, goal, main features, and timeline. What kind of project is it?"
          : locale === "de"
            ? "Klar. Für ein brauchbares Angebot brauche ich das Wesentliche: Projekttyp, Ziel, Hauptfunktionen und Zeitrahmen. Welche Art Projekt ist das?"
            : "Bien sûr. Pour qu'un devis soit exploitable j'ai besoin des bases : type de projet, objectif, fonctionnalités clés et délai. C'est quel type de projet ?";
      }
      if (/(digitaliser|digitalize|digitalisieren)/.test(text)) {
        return locale === "en"
          ? "Good start. To make it concrete: what's your current activity, is the goal more clients, automation, online sales, or better internal tracking, and do you have tools already in place?"
          : locale === "de"
            ? "Guter Einstieg. Konkret: was ist deine aktuelle Aktivitaet, mehr Kunden, Automatisierung, Online-Verkauf oder besseres internes Tracking — und gibt es schon Tools?"
            : "Bon point de départ. Pour rendre ça concret : ton activité actuelle, ton objectif principal — plus de clients, automatisation, vente en ligne ou meilleur suivi interne — et est-ce qu'il y a déjà des outils en place ?";
      }
      if (detectUrgentRequest(text)) {
        return locale === "en"
          ? "Noted, it's urgent. To check if the timeline holds, I need three things: what exactly gets delivered, the hard deadline, and what's strictly required for launch."
          : locale === "de"
            ? "Notiert, es ist dringend. Um zu pruefen ob der Zeitrahmen haelt: was genau geliefert wird, die feste Deadline, und was zum Start wirklich unbedingt noetig ist."
            : "Noté, c'est urgent. Pour voir si le délai tient, j'ai besoin de trois choses : ce qui est livré exactement, la date butoir ferme, et ce qui est strictement indispensable au lancement.";
      }
    }

    const question = buildProjectQuestion(session, locale, nextMissing);
    return opener ? `${opener} ${question}` : question;
  }

  if (session.intent === "support_glpi") {
    const nextMissing = getRequiredFields(session.intent).find((field) => !session.collected[field]);
    if (!nextMissing) return copy.summaryReady;
    return `${copy.startSupport} ${buildSupportQuestion(session, locale, nextMissing)}`;
  }

  return copy.fallbackAnswer;
}

function buildFollowUpReply(session: AssistantSession, locale: Locale, nextMissing: string) {
  if (session.intent === "project_quote") {
    return acknowledgeAndAsk(locale, buildProjectQuestion(session, locale, nextMissing));
  }

  if (session.intent === "support_glpi") {
    return acknowledgeAndAsk(locale, buildSupportQuestion(session, locale, nextMissing));
  }

  const copy = getCopy(locale);
  return acknowledgeAndAsk(locale, copy.questions[nextMissing as keyof typeof copy.questions]);
}

function buildReadyReply(summary: AssistantStructuredOutput, locale: Locale, humanNeeded: boolean) {
  const budget = summary.budget_range.max > 0 ? formatBudgetRange(summary, locale) : null;
  const type = formatProjectTypeLabel(summary.project_type as AssistantProjectType, locale);
  const timeline = estimateCalendarRange(summary.estimated_days, locale);
  const offerHint = getOfferHint(summary.project_type as AssistantProjectType, locale);

  if (locale === "en") {
    const budgetStr = budget ? ` Budget range: ${budget} €.` : "";
    const timelineStr = ` Timeline: ${timeline}.`;
    const offerStr = offerHint ? ` ${offerHint}` : "";
    const next = humanNeeded
      ? " Given the scope, request a human quote review before committing."
      : " The next clean step is to request the 24h quote with this summary.";
    return `Here's what I have: ${type}, ${summary.complexity} complexity.${budgetStr}${timelineStr}${offerStr}${next}`;
  }

  if (locale === "de") {
    const budgetStr = budget ? ` Budgetspanne: ${budget} €.` : "";
    const timelineStr = ` Zeitrahmen: ${timeline}.`;
    const offerStr = offerHint ? ` ${offerHint}` : "";
    const next = humanNeeded
      ? " Bei diesem Umfang sollte ein Mensch das Angebot prüfen, bevor du dich festlegst."
      : " Der nächste saubere Schritt ist die 24h-Angebotsanfrage mit dieser Zusammenfassung.";
    return `Das habe ich: ${type}, Komplexität ${summary.complexity}.${budgetStr}${timelineStr}${offerStr}${next}`;
  }

  const budgetStr = budget ? ` Fourchette budget : ${budget} €.` : "";
  const timelineStr = ` Délai probable : ${timeline}.`;
  const offerStr = offerHint ? ` ${offerHint}` : "";
  const next = humanNeeded
    ? " Vu le scope, il faut une validation humaine du devis avant de s'engager."
    : " La suite propre, c'est de demander le devis sous 24h avec ce résumé.";
  return `Voici ce que j'ai : ${type}, complexité ${summary.complexity}.${budgetStr}${timelineStr}${offerStr}${next}`;
}

function resolveProjectTypeFromAnswer(answer: string): AssistantProjectType {
  const inferred = inferProjectType(answer);
  return inferred === "unknown" ? "unknown" : inferred;
}

function isGenericProjectTypeAnswer(message: string) {
  const text = message.toLowerCase().trim();
  const compact = text.replace(/[.!?]/g, "").trim();
  const genericType =
    "(landing|landing page|portfolio|site|site web|site vitrine|website|showcase site|application|application web|web app|app mobile|mobile app|dashboard|tableau de bord|e-?commerce|boutique en ligne|saas|logiciel|software|produit web|web product|automatisation ia|automation ai|chatbot|assistant ia)";

  return (
    new RegExp(`^${genericType}$`).test(compact) ||
    new RegExp(`^(je\\s+)?(veux|souhaite|voudrais|aimerais|cherche|need|want|build|creer|créer|faire|lancer)\\s+(un\\s+|une\\s+|a\\s+|an\\s+)?${genericType}$`).test(compact) ||
    /^(demander un devis|get a quote|angebot anfordern)$/.test(compact)
  );
}

const assistantIntentValues = new Set<AssistantIntent>([
  "project_quote",
  "support_glpi",
  "faq",
  "general_info",
  "unknown",
]);

const assistantProjectTypeValues = new Set<AssistantProjectType>([
  "landing_portfolio",
  "showcase_website",
  "corporate_website",
  "ecommerce",
  "web_app",
  "mobile_app",
  "dashboard_portal",
  "glpi_assistant",
  "automation_ai",
  "unknown",
]);

function normalizeOpenAiClassification(
  value: { intent: AssistantIntent; project_type: AssistantProjectType } | null
) {
  if (!value) return null;
  const intent = assistantIntentValues.has(value.intent) ? value.intent : "unknown";
  const projectType = assistantProjectTypeValues.has(value.project_type) ? value.project_type : "unknown";
  return { intent, project_type: projectType };
}

function resolveClassification(input: string, openAiClassification: { intent: AssistantIntent; project_type: AssistantProjectType } | null) {
  const normalizedOpenAi = normalizeOpenAiClassification(openAiClassification);
  const heuristicIntent = inferIntent(input);
  const heuristicProjectType = inferProjectType(input);

  return {
    intent:
      normalizedOpenAi?.intent && normalizedOpenAi.intent !== "unknown"
        ? normalizedOpenAi.intent
        : heuristicIntent,
    project_type:
      normalizedOpenAi?.project_type && normalizedOpenAi.project_type !== "unknown"
        ? normalizedOpenAi.project_type
        : heuristicProjectType,
  };
}

function setCollectedValue(session: AssistantSession, key: string, value: string) {
  if (!value.trim()) return session;

  const next = {
    ...session,
    collected: {
      ...session.collected,
      [key]: value.trim(),
    },
  };

  if (key === "type") {
    next.projectType = resolveProjectTypeFromAnswer(value);
  }

  return next;
}

async function classifyWithOpenAI(input: string, locale: Locale) {
  const instructions = `
You classify KAH-Digital inbound messages.
Return only JSON with keys: intent, project_type.
Allowed intents: project_quote, support_glpi, faq, general_info, unknown.
Allowed project types: landing_portfolio, showcase_website, corporate_website, ecommerce, web_app, mobile_app, dashboard_portal, glpi_assistant, automation_ai, unknown.
Classify SaaS, software, produit web, and web product as web_app.
If the user wants to build, frame, connect, redesign, or implement a solution around GLPI, classify as project_quote.
Use support_glpi only for active incidents, bugs, blocked users, ticket handling, or operational support issues.
`;

  return generateOpenAIJson<{ intent: AssistantIntent; project_type: AssistantProjectType }>({
    instructions,
    input: JSON.stringify({ locale, text: input, services: assistantKnowledge.services, offers: assistantKnowledge.offers }),
  });
}

function extractEmail(message: string) {
  const match = message.match(/[^\s@]+@[^\s@]+\.[^\s@]+/);
  return match?.[0];
}

function extractAllFieldsFromMessage(message: string, session: AssistantSession): AssistantSession {
  const updates: Partial<AssistantSession["collected"]> = {};
  let projectType = session.projectType;
  const text = message;

  if (!session.collected.type) {
    const t = inferProjectType(text);
    if (t !== "unknown") {
      updates.type = t;
      projectType = t;
    }
  }

  if (!session.collected.budget) {
    const bm =
      text.match(/(?:budget\s*(?:de|autour(?:\s+de)?|environ|~|d'environ)?\s*)?(\d[\d\s]*(?:[.,]\d+)?)\s*(€|eur(?:os?)?|chf|fr\.?\b|k€|keur|\$)/i) ??
      text.match(/\b(\d+)\s*k\b(?!\w)/i);
    if (bm) updates.budget = bm[0].replace(/\s{2,}/g, " ").trim();
  }

  if (!session.collected.timeline) {
    if (detectUrgentRequest(text)) {
      updates.timeline = text;
    } else {
      const tm =
        text.match(/\b(?:dans|en|sous|d['']ici)\s+\d+\s*(?:semaines?|mois|jours?)\b/i) ??
        text.match(/\b\d+\s*(?:semaines?|mois|jours?|weeks?|months?)\b/i);
      if (tm) updates.timeline = tm[0];
    }
  }

  if (!session.collected.objective && text.length > 30) {
    if (/\b(client|vente|vendre|r[eé]serv|contact|visibilit[eé]|leads?|notori[eé]t[eé]|pr[eé]sence|attirer|recruter|automatiser|digitali|gagner|prise\s+de\s+rdv)\b/i.test(text)) {
      updates.objective = text;
    }
  }

  if (!session.collected.features) {
    const inferred = inferFeatures({ objective: text, type: session.collected.type });
    const featureKw = /\b(r[eé]serv|reservation|booking|catalogue|catalog|blog|galerie|gallery|formulaire|paiement|payment|login|connexion|espace\s+client|multilingue|multilingual|carte\s+interactive|avis\s+google|google\s+maps)\b/i;
    if (inferred.length > 0 || featureKw.test(text)) updates.features = text;
  }

  if (!session.collected.decisionStage) {
    if (/\b(devis|quote)\b/i.test(text)) updates.decisionStage = "devis";
    else if (/\b(appel|call|t[eé]l[eé]phone|parler\s+[àa]\s+quelqu)\b/i.test(text)) updates.decisionStage = "call";
  }

  if (Object.keys(updates).length === 0 && projectType === session.projectType) return session;
  return { ...session, projectType, collected: { ...session.collected, ...updates } };
}

export async function runAssistantTurn(params: {
  message: string;
  locale: Locale;
  session?: Partial<AssistantSession>;
}): Promise<AssistantTurnResponse> {
  const copy = getCopy(params.locale);
  let session = normalizeSession(params.session, params.locale);
  const message = params.message.trim();

  session = {
    ...session,
    transcript: appendTranscript(session.transcript, "user", message),
  };

  const extractedEmail = extractEmail(message);
  if (extractedEmail) {
    session.collected.email = extractedEmail;
  }

  if (session.lastAskedField) {
    session = setCollectedValue(session, session.lastAskedField, message);
    session.lastAskedField = null;
  }

  // Extract all recognizable fields from every message (budget, timeline, type, features…)
  session = extractAllFieldsFromMessage(message, session);

  if (session.intent === "unknown" || session.status === "idle") {
    const openAiClassification = await classifyWithOpenAI(message, params.locale).catch(() => null);
    const classification = resolveClassification(message, openAiClassification);
    const inferredIntent = classification.intent;
    const inferredProjectType = classification.project_type;

    session.intent = inferredIntent;
    session.projectType = inferredProjectType;
    session.status = inferredIntent === "project_quote" || inferredIntent === "support_glpi" ? "collecting" : "idle";

    if (inferredIntent === "project_quote") {
      if (!session.collected.type && inferredProjectType !== "unknown") {
        session.collected.type = inferredProjectType;
      }
      if (!session.collected.objective && !isGenericProjectTypeAnswer(message)) {
        session.collected.objective = message;
      }
      if (!session.collected.features && inferFeatures({ objective: message }).length > 0) {
        session.collected.features = message;
      }
      // Extract budget hint from first message (e.g. "3000 CHF", "budget 5k")
      if (!session.collected.budget) {
        const budgetMatch = message.match(/(\d[\d\s.]*)\s*(eur|euros?|chf|fr\b|k€|kchf|\$)/i);
        if (budgetMatch) session.collected.budget = budgetMatch[0].trim();
      }
      // Extract timeline hint from urgent keywords
      if (!session.collected.timeline && detectUrgentRequest(message)) {
        session.collected.timeline = message;
      }
    }

    if (inferredIntent === "support_glpi" && !session.collected.problem) {
      session.collected.problem = message;
    }

    if (inferredIntent === "faq" || inferredIntent === "general_info" || inferredIntent === "unknown") {
      const faqAnswer = findFaqAnswer(message, params.locale);
      const reply = faqAnswer ? `${faqAnswer} ${copy.faqFollowUp}` : buildDiscoveryReply(message, params.locale);
      session.transcript = appendTranscript(session.transcript, "assistant", reply);

      return {
        reply,
        progress: getProgress(inferredIntent, session.collected, params.locale),
        session,
        summary: null,
        humanNeeded: false,
      };
    }
  }

  const requiredFields = getRequiredFields(session.intent);
  const nextMissing = requiredFields.find((field) => !session.collected[field]);

  if (nextMissing) {
    session.lastAskedField = nextMissing;
    const previousAssistantMessages = session.transcript.filter((item) => item.role === "assistant").length;
    const reply =
      previousAssistantMessages === 0
        ? buildFirstReply(session, params.locale, message)
        : buildFollowUpReply(session, params.locale, nextMissing);

    session.transcript = appendTranscript(session.transcript, "assistant", reply);

    return {
      reply,
      progress: getProgress(session.intent, session.collected, params.locale),
      session,
      summary: null,
      humanNeeded: false,
    };
  }

  const fallbackSummary = buildStructuredSummary(session);
  const refinedSummary = (await refineSummaryWithOpenAI(session, params.locale).catch(() => null)) ?? fallbackSummary;
  const summary = assistantStructuredOutputSchema.parse({
    ...refinedSummary,
    project_type: fallbackSummary.project_type,
    complexity: fallbackSummary.complexity,
    budget_range: fallbackSummary.budget_range,
    estimated_days: fallbackSummary.estimated_days,
    roles: fallbackSummary.roles,
    missing_info: fallbackSummary.missing_info,
  });
  const humanNeeded = detectEscalation(summary, session);

  session = {
    ...session,
    status: "ready",
    summary,
    humanNeeded,
  };

  const reply = `${buildReadyReply(summary, params.locale, humanNeeded)}\n\n${humanNeeded ? copy.humanEscalation : copy.summaryReady}`;
  session.transcript = appendTranscript(session.transcript, "assistant", reply);

  return {
    reply,
    progress: getProgress(session.intent, session.collected, params.locale),
    session,
    summary,
    humanNeeded,
  };
}

export async function classifyRequest(input: string, locale: Locale) {
  const openAiClassification = await classifyWithOpenAI(input, locale).catch(() => null);
  return resolveClassification(input, openAiClassification);
}

export async function extractRequirements(input: string, locale: Locale) {
  const classified = await classifyRequest(input, locale);
  const session = normalizeSession(
    {
      locale,
      intent: classified.intent,
      projectType: classified.project_type,
      collected: {
        type: classified.project_type === "unknown" ? undefined : classified.project_type,
        objective: input,
      },
    },
    locale
  );

  return buildStructuredSummary(session);
}

export async function estimateProject(input: string, locale: Locale) {
  return extractRequirements(input, locale);
}

export async function estimateResources(input: string, locale: Locale) {
  const summary = await extractRequirements(input, locale);
  return {
    roles: summary.roles,
    estimated_days: summary.estimated_days,
    complexity: summary.complexity,
  };
}

function getNumberLocale(locale: Locale) {
  if (locale === "en") return "en-US";
  if (locale === "de") return "de-DE";
  return "fr-FR";
}

function formatBudgetRange(summary: AssistantStructuredOutput, locale: Locale) {
  if (!summary.budget_range.max) return "n/a";
  const numberLocale = getNumberLocale(locale);
  return `${summary.budget_range.min.toLocaleString(numberLocale)} - ${summary.budget_range.max.toLocaleString(numberLocale)}`;
}

function formatSummaryText(summary: AssistantStructuredOutput, locale: Locale) {
  const budget = formatBudgetRange(summary, locale);
  if (locale === "en") {
    return `Intent: ${summary.intent}
Project type: ${summary.project_type}
Clarity score: ${summary.clarity_score}/100
Complexity: ${summary.complexity}
Budget range: ${budget}
Estimated days: ${summary.estimated_days}
Roles: ${summary.roles.join(", ") || "-"}
Missing info: ${summary.missing_info.join(", ") || "-"}
Next step: ${summary.next_step}`;
  }
  if (locale === "de") {
    return `Intent: ${summary.intent}
Projekttyp: ${summary.project_type}
Klarheitsgrad: ${summary.clarity_score}/100
Komplexitaet: ${summary.complexity}
Budgetspanne: ${budget}
Geschaetzte Tage: ${summary.estimated_days}
Rollen: ${summary.roles.join(", ") || "-"}
Fehlende Infos: ${summary.missing_info.join(", ") || "-"}
Naechster Schritt: ${summary.next_step}`;
  }

  return `Intent: ${summary.intent}
Type de projet: ${summary.project_type}
Clarte: ${summary.clarity_score}/100
Complexite: ${summary.complexity}
Fourchette budget: ${budget}
Jours estimes: ${summary.estimated_days}
Roles: ${summary.roles.join(", ") || "-"}
Infos manquantes: ${summary.missing_info.join(", ") || "-"}
Next step: ${summary.next_step}`;
}

function formatAssistantBudget(summary: AssistantStructuredOutput) {
  if (summary.budget_range.max > 0) {
    return `${summary.budget_range.min.toLocaleString("fr-FR")} - ${summary.budget_range.max.toLocaleString("fr-FR")}`;
  }

  return "A definir";
}

function formatAssistantTimeline(summary: AssistantStructuredOutput) {
  if (summary.estimated_days > 0) {
    return `${summary.estimated_days} jours estimes`;
  }

  return "A confirmer";
}

function mapAssistantProjectType(projectType: AssistantStructuredOutput["project_type"]) {
  switch (projectType) {
    case "landing_portfolio":
      return "Landing / portfolio";
    case "showcase_website":
      return "Site vitrine";
    case "corporate_website":
      return "Site corporate";
    case "ecommerce":
      return "E-commerce";
    case "web_app":
      return "Application web / SaaS";
    case "mobile_app":
      return "Application mobile";
    case "dashboard_portal":
      return "Dashboard / portail";
    case "glpi_assistant":
      return "Workflow GLPI";
    case "automation_ai":
      return "Automatisation IA";
    default:
      return "Projet assistant";
  }
}

function buildAssistantQuote(input: {
  email?: string;
  name?: string;
  phone?: string;
  company?: string;
  summary: AssistantStructuredOutput;
  transcript: AssistantTranscriptItem[];
}): QuoteRecord | null {
  if (input.summary.intent !== "project_quote") {
    return null;
  }

  const email = input.email?.trim();
  if (!email) {
    return null;
  }

  const userMessages = input.transcript
    .filter((entry) => entry.role === "user")
    .map((entry) => entry.content.trim())
    .filter(Boolean);
  const primaryNeed = userMessages[0] ?? input.summary.next_step;
  const transcriptPreview = userMessages.slice(0, 4).join("\n\n");

  return {
    submittedAt: new Date().toISOString(),
    name: input.name?.trim() || input.company?.trim() || "Lead assistant",
    email,
    phone: input.phone?.trim() || undefined,
    projectType: mapAssistantProjectType(input.summary.project_type),
    goal: primaryNeed,
    pages: [],
    aiModules: [],
    mobilePlatforms: [],
    mobileFeatures: [],
    storeSupport: undefined,
    techPreferences: undefined,
    inspirations: undefined,
    budget: formatAssistantBudget(input.summary),
    timeline: formatAssistantTimeline(input.summary),
    message:
      transcriptPreview ||
      `Lead assistant.\n\n${formatSummaryText(input.summary, "fr")}`,
    clientType: input.company?.trim() ? "entreprise" : "particulier",
    companyName: input.company?.trim() || undefined,
    projectFocus: input.summary.project_type === "mobile_app" ? "mobile" : "web",
    configurator: undefined,
    feasibility: "pending",
    deposit: "none",
    pipeline: "new",
  };
}

export async function sendEmail(input: {
  locale: Locale;
  email: string;
  name?: string;
  phone?: string;
  company?: string;
  summary: AssistantStructuredOutput;
  consent: boolean;
  transcript?: AssistantTranscriptItem[];
}) {
  const copy = getCopy(input.locale);
  if (!input.consent) {
    return { ok: false, error: copy.invalidConsent };
  }

  if (!resendClient) {
    return { ok: false, error: "Service email indisponible" };
  }

  const html = renderBrandedEmail({
    eyebrow:
      input.locale === "en"
        ? "Assistant summary"
        : input.locale === "de"
          ? "Assistent Zusammenfassung"
          : "Resume assistant",
    title:
      input.locale === "en"
        ? "Your project summary is ready"
        : input.locale === "de"
          ? "Deine Zusammenfassung ist bereit"
          : "Votre résumé projet est prêt",
    intro:
      input.locale === "en"
        ? "Here is the structured summary produced from your exchange with the KAH-Digital assistant."
        : input.locale === "de"
          ? "Hier ist die strukturierte Zusammenfassung aus deinem Austausch mit dem KAH-Digital Assistenten."
          : "Voici le résumé structuré produit à partir de votre échange avec l'assistant KAH-Digital.",
    metrics: [
      { label: "Projet", value: input.summary.project_type },
      { label: "Budget", value: formatAssistantBudget(input.summary) },
      { label: "Complexite", value: input.summary.complexity },
    ],
    sections: [
      {
        title: input.locale === "en" ? "Contact" : input.locale === "de" ? "Kontakt" : "Contact",
        items: [
          { label: "Nom", value: input.name ?? "-" },
          { label: "Email", value: input.email },
          { label: "Telephone", value: input.phone ?? "-" },
          { label: "Entreprise", value: input.company ?? "-" },
        ],
      },
      {
        title: input.locale === "en" ? "Summary" : input.locale === "de" ? "Zusammenfassung" : "Synthese",
        items: [
          { label: "Intent", value: input.summary.intent },
          { label: "Type de projet", value: input.summary.project_type },
          { label: "Clarte", value: `${input.summary.clarity_score}/100` },
          { label: "Budget", value: formatAssistantBudget(input.summary) },
          { label: "Jours estimes", value: String(input.summary.estimated_days) },
          { label: "Roles", value: input.summary.roles.join(", ") || "-" },
          { label: "Infos manquantes", value: input.summary.missing_info.join(", ") || "-" },
          { label: "Suite", value: input.summary.next_step },
        ],
      },
    ],
    footer:
      input.locale === "en"
        ? "A KAH-Digital expert can take over from this summary."
        : input.locale === "de"
          ? "Ein KAH-Digital Experte kann auf Basis dieser Zusammenfassung übernehmen."
          : "Un expert KAH-Digital peut reprendre à partir de ce résumé.",
  });

  await resendClient.emails.send({
    from: getResendFromAddress(),
    to: input.email,
    subject:
      input.locale === "en"
        ? "Your KAH-Digital assistant summary"
        : input.locale === "de"
          ? "Deine KAH-Digital Zusammenfassung"
          : "Votre résumé assistant KAH-Digital",
    html,
    text: `Contact: ${input.name ?? "-"} / ${input.email}
Phone: ${input.phone ?? "-"}
Company: ${input.company ?? "-"}

${formatSummaryText(input.summary, input.locale)}`,
  });

  await saveAssistantRecord(
    buildAssistantRecord({
      locale: input.locale,
      action: "summary_email",
      summary: input.summary,
      transcript: input.transcript ?? [],
      consent: input.consent,
      email: input.email,
      name: input.name,
      humanNeeded: false,
    })
  ).catch((error) => {
    console.warn("[assistant] Email summary not persisted", error);
  });

  return { ok: true, message: copy.summarySent };
}

export async function createLead(input: {
  locale: Locale;
  consent: boolean;
  email?: string;
  name?: string;
  phone?: string;
  company?: string;
  summary: AssistantStructuredOutput;
  transcript: AssistantTranscriptItem[];
}) {
  const copy = getCopy(input.locale);
  if (!input.consent) {
    return { ok: false, error: copy.invalidConsent };
  }

  if (!resendClient || !notificationEmail) {
    return { ok: false, error: "Service email indisponible" };
  }

  const transcript = input.transcript.map((item) => `${item.role}: ${item.content}`).join("\n");
  const html = renderBrandedEmail({
    eyebrow: "Lead assistant",
    title: `${input.name ?? input.company ?? "Nouveau lead"} demande une reprise humaine`,
    intro: "Le chatbot a produit un lead qualifié. Les informations structurées et le transcript utile sont résumés ci-dessous.",
    metrics: [
      { label: "Projet", value: input.summary.project_type },
      { label: "Budget", value: formatAssistantBudget(input.summary) },
      { label: "Jours estimes", value: String(input.summary.estimated_days) },
    ],
    sections: [
      {
        title: "Contact",
        items: [
          { label: "Nom", value: input.name ?? "-" },
          { label: "Email", value: input.email ?? "-" },
          { label: "Telephone", value: input.phone ?? "-" },
          { label: "Entreprise", value: input.company ?? "-" },
        ],
      },
      {
        title: "Qualification",
        items: [
          { label: "Intent", value: input.summary.intent },
          { label: "Type de projet", value: input.summary.project_type },
          { label: "Clarte", value: `${input.summary.clarity_score}/100` },
          { label: "Complexite", value: input.summary.complexity },
          { label: "Roles", value: input.summary.roles.join(", ") || "-" },
          { label: "Infos manquantes", value: input.summary.missing_info.join(", ") || "-" },
          { label: "Suite", value: input.summary.next_step },
        ],
      },
      {
        title: "Transcript",
        items: [{ label: "Echange", value: transcript || "-" }],
      },
    ],
    ctaLabel: "Ouvrir l'admin assistant",
    ctaUrl: adminAssistantUrl,
    footer: `Reply-to configure sur ${input.email ?? "l'email du lead"}.`,
  });

  await resendClient.emails.send({
    from: getResendFromAddress(),
    to: notificationEmail.split(",").map((item) => item.trim()),
    replyTo: input.email,
    subject: `Assistant lead - ${input.summary.project_type}`,
    html,
    text: `Contact: ${input.name ?? "-"} / ${input.email ?? "-"}
Phone: ${input.phone ?? "-"}
Company: ${input.company ?? "-"}

${formatSummaryText(input.summary, input.locale)}

Transcript:
${transcript}`,
  });

  await sendAdminWhatsAppNotification({
    title: `Nouveau lead assistant - ${input.name ?? input.company ?? input.summary.project_type}`,
    source: "assistant",
    summary: `${input.summary.project_type} | Budget ${formatAssistantBudget(input.summary)} | ${input.summary.next_step}`,
    email: input.email,
    phone: input.phone,
    company: input.company,
    adminPath: "/admin/assistant",
  });

  await saveAssistantRecord(
    buildAssistantRecord({
      locale: input.locale,
      action: "human_followup",
      summary: input.summary,
      transcript: input.transcript,
      consent: input.consent,
      email: input.email,
      name: input.name,
      humanNeeded: true,
    })
  ).catch((error) => {
    console.warn("[assistant] Lead not persisted", error);
  });

  const quote = buildAssistantQuote(input);
  if (quote) {
    await saveQuoteRecord(quote).catch((error) => {
      console.warn("[assistant] Lead quote not persisted", error);
    });
  }

  return { ok: true, message: copy.leadSent };
}

type GlpiSessionInitResponse = {
  session_token?: string;
};

async function withGlpiSession<T>(
  fn: (params: { baseUrl: string; sessionToken: string; appToken: string }) => Promise<T>
) {
  const baseUrl = process.env.GLPI_BASE_URL?.trim().replace(/\/+$/, "");
  const appToken = process.env.GLPI_APP_TOKEN?.trim();
  const userToken = process.env.GLPI_USER_TOKEN?.trim();

  if (!baseUrl || !appToken || !userToken) {
    return null;
  }

  const initResponse = await fetch(`${baseUrl}/apirest.php/initSession`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "App-Token": appToken,
      Authorization: `user_token ${userToken}`,
    },
    cache: "no-store",
  });

  if (!initResponse.ok) {
    const body = await initResponse.text().catch(() => "");
    throw new Error(`[glpi] initSession failed ${initResponse.status} ${body}`.trim());
  }

  const initPayload = (await initResponse.json()) as GlpiSessionInitResponse;
  const sessionToken = initPayload.session_token;
  if (!sessionToken) {
    throw new Error("[glpi] Missing session token");
  }

  try {
    return await fn({ baseUrl, sessionToken, appToken });
  } finally {
    await fetch(`${baseUrl}/apirest.php/killSession`, {
      method: "GET",
      headers: {
        "App-Token": appToken,
        "Session-Token": sessionToken,
      },
      cache: "no-store",
    }).catch(() => null);
  }
}

export async function createGlpiTicket(input: {
  locale: Locale;
  consent: boolean;
  email?: string;
  name?: string;
  phone?: string;
  company?: string;
  summary: AssistantStructuredOutput;
  transcript: AssistantTranscriptItem[];
}) {
  const copy = getCopy(input.locale);
  if (!input.consent) {
    return { ok: false, error: copy.invalidConsent };
  }

  const transcript = input.transcript.map((item) => `${item.role}: ${item.content}`).join("\n");
  const content = `Contact: ${input.name ?? "-"} / ${input.email ?? "-"}
Phone: ${input.phone ?? "-"}
Company: ${input.company ?? "-"}

${formatSummaryText(input.summary, input.locale)}

Transcript:
${transcript}`;

  try {
    const result = await withGlpiSession(async ({ baseUrl, sessionToken, appToken }) => {
      const response = await fetch(`${baseUrl}/apirest.php/Ticket`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "App-Token": appToken,
          "Session-Token": sessionToken,
        },
        body: JSON.stringify({
          input: {
            name:
              input.locale === "en"
                ? `Support request - ${input.summary.project_type}`
                : input.locale === "de"
                  ? `Support-Anfrage - ${input.summary.project_type}`
                  : `Demande support - ${input.summary.project_type}`,
            content,
            urgency: input.summary.complexity === "high" ? 5 : input.summary.complexity === "medium" ? 3 : 2,
            impact: input.summary.complexity === "high" ? 5 : input.summary.complexity === "medium" ? 3 : 2,
          },
        }),
        cache: "no-store",
      });

      if (!response.ok) {
        const body = await response.text().catch(() => "");
        throw new Error(`[glpi] Ticket creation failed ${response.status} ${body}`.trim());
      }

      return response.json().catch(() => ({ ok: true }));
    });

    if (!result) {
      const fallback = await createLead(input);
      if (!fallback.ok) {
        return fallback;
      }
      return { ok: true, message: copy.glpiFallback };
    }

    await saveAssistantRecord(
      buildAssistantRecord({
        locale: input.locale,
        action: "glpi_ticket",
        summary: input.summary,
        transcript: input.transcript,
        consent: input.consent,
        email: input.email,
        name: input.name,
        humanNeeded: true,
      })
    ).catch((error) => {
      console.warn("[assistant] GLPI ticket not persisted", error);
    });

    return { ok: true, message: copy.glpiCreated };
  } catch (error) {
    console.error("[assistant] Failed to create GLPI ticket", error);
    const fallback = await createLead(input);
    if (!fallback.ok) {
      return fallback;
    }
    return { ok: true, message: copy.glpiFallback };
  }
}

export function markHumanNeeded(summary: AssistantStructuredOutput) {
  return {
    ok: true,
    human_needed: true,
    next_step: summary.next_step,
  };
}
