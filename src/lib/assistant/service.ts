import { Resend } from "resend";
import { pricingRules, type PricingFeature, type PricingProjectType } from "@/config/pricing-rules";
import { brandContact } from "@/config/brand";
import { assistantKnowledge } from "@/lib/assistant/knowledge";
import { saveAssistantRecord } from "@/lib/assistant-store";
import { buildAssistantRecord } from "@/lib/assistant/scoring";
import { generateOpenAIJson } from "@/lib/assistant/openai";
import {
  assistantSessionSchema,
  assistantStructuredOutputSchema,
  type AssistantIntent,
  type AssistantProjectType,
  type AssistantSession,
  type AssistantStructuredOutput,
  type AssistantTranscriptItem,
} from "@/lib/assistant/schema";

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

const localeCopy = {
  fr: {
    summaryReady: "Voici la premiere synthese exploitable.",
    humanEscalation: "Je prepare un resume exploitable et je passe la suite a un humain.",
    startProject: "On va cadrer ca proprement.",
    startSupport: "On va qualifier ca rapidement.",
    nextStepQuote: "Devis structure avec reprise humaine conseillee.",
    nextStepSupport: "Resume support pret pour ticket ou reprise humaine.",
    nextStepInfo: "Orientation vers le bon service KAH-Digital.",
    projectFlowLabel: "Qualification projet",
    supportFlowLabel: "Qualification support",
    generalFlowLabel: "Orientation",
    faqFollowUp: "Si tu veux une fourchette utile ou une suite concrete, je passe au cadrage.",
    invalidConsent: "J'ai besoin de ton consentement pour stocker ou envoyer le resume.",
    summarySent: "Le resume a ete envoye par email.",
    leadSent: "Le resume a ete transmis a KAH-Digital pour reprise humaine.",
    glpiCreated: "Le ticket support a ete prepare et transmis.",
    glpiFallback: "GLPI n'est pas configure ici. Je transmets plutot vers un humain avec resume.",
    fallbackAnswer:
      "Pour avancer, choisis un axe : site, application, support, GLPI ou besoin de cadrage. Ensuite je pose seulement les questions utiles.",
    recadrageBudget:
      "Je prefere etre transparent : sans perimetre clair, je peux donner une fourchette, pas un prix ferme.",
    recadrageTimeline: "Je peux tester la faisabilite, pas promettre un delai ferme sans cadrage.",
    recadrageMvp:
      "Pour eviter de partir sur quelque chose d'irrealisable, il faut definir les fonctions indispensables au depart.",
    recapIntro: "Voici ce que j'ai compris :",
    faqAnswers: {
      delai: assistantKnowledge.faq[0].answerFr,
      services: assistantKnowledge.faq[1].answerFr,
      maintenance: assistantKnowledge.faq[2].answerFr,
      method: assistantKnowledge.faq[3].answerFr,
    },
    questions: {
      type: "Quel type de projet veux-tu lancer ? Site, application, outil metier, GLPI, autre ?",
      objective: "Quel est l'objectif principal du projet ?",
      features: "Quelles fonctionnalites ou blocs sont indispensables ?",
      timeline: "Quel delai vises-tu ?",
      budget: "As-tu deja une fourchette de budget ?",
      users: "Combien d'utilisateurs ou quel volume prevois-tu ?",
      countriesLanguages: "Quels pays ou quelles langues sont concernes ?",
      technicalNeeds: "Y a-t-il des besoins specifiques : admin, paiement, API, design premium, autre ?",
      problem: "Quel est le probleme principal a resoudre ?",
      urgency: "Quel est le niveau d'urgence ?",
      impact: "Quel est l'impact sur l'activite ou les utilisateurs ?",
      affectedUsers: "Combien d'utilisateurs sont touches ?",
      sinceWhen: "Depuis quand le probleme existe-t-il ?",
      actionsTried: "Quelles actions ont deja ete tentees ?",
    },
  },
  en: {
    summaryReady: "Here is the first usable summary.",
    humanEscalation: "I am preparing a usable summary and handing this to a human expert.",
    startProject: "Let's frame this properly.",
    startSupport: "Let's qualify this quickly.",
    nextStepQuote: "Structured quote with human follow-up recommended.",
    nextStepSupport: "Support summary ready for ticket creation or human follow-up.",
    nextStepInfo: "Route toward the right KAH-Digital service.",
    projectFlowLabel: "Project qualification",
    supportFlowLabel: "Support qualification",
    generalFlowLabel: "Routing",
    faqFollowUp: "If you want a useful range or next step, I can switch to qualification.",
    invalidConsent: "I need your consent before storing or sending the summary.",
    summarySent: "The summary was sent by email.",
    leadSent: "The summary was forwarded to KAH-Digital for human follow-up.",
    glpiCreated: "The support ticket was prepared and sent.",
    glpiFallback: "GLPI is not configured here. I am routing the summary to a human instead.",
    fallbackAnswer:
      "Pick one lane: website, application, support, GLPI, or discovery. Then I will ask only what is needed.",
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
      type: "What type of project do you want to launch? Website, app, business tool, GLPI, other?",
      objective: "What is the main goal of the project?",
      features: "Which features or blocks are essential?",
      timeline: "What timeline are you targeting?",
      budget: "Do you already have a budget range in mind?",
      users: "How many users or what scale do you expect?",
      countriesLanguages: "Which countries or languages are involved?",
      technicalNeeds: "Any specific needs: admin area, payment, API, premium design, other?",
      problem: "What is the main issue to solve?",
      urgency: "How urgent is it?",
      impact: "What is the impact on the business or users?",
      affectedUsers: "How many users are affected?",
      sinceWhen: "How long has the issue existed?",
      actionsTried: "What has already been tried?",
    },
  },
  de: {
    summaryReady: "Hier ist die erste brauchbare Zusammenfassung.",
    humanEscalation: "Ich bereite eine brauchbare Zusammenfassung vor und uebergebe an einen Experten.",
    startProject: "Wir grenzen das jetzt sauber ein.",
    startSupport: "Wir qualifizieren das jetzt schnell.",
    nextStepQuote: "Strukturiertes Angebot mit menschlicher Rueckmeldung empfohlen.",
    nextStepSupport: "Support-Zusammenfassung bereit fuer Ticket oder menschliche Uebernahme.",
    nextStepInfo: "Weiterleitung zum passenden KAH-Digital Service.",
    projectFlowLabel: "Projektqualifizierung",
    supportFlowLabel: "Supportqualifizierung",
    generalFlowLabel: "Orientierung",
    faqFollowUp: "Wenn du eine belastbare Spanne oder den naechsten Schritt willst, gehe ich direkt ins Cadrage.",
    invalidConsent: "Ich brauche deine Zustimmung, bevor ich die Zusammenfassung speichere oder versende.",
    summarySent: "Die Zusammenfassung wurde per E-Mail versendet.",
    leadSent: "Die Zusammenfassung wurde an KAH-Digital fuer eine menschliche Rueckmeldung weitergeleitet.",
    glpiCreated: "Das Support-Ticket wurde vorbereitet und uebermittelt.",
    glpiFallback: "GLPI ist hier nicht konfiguriert. Ich leite die Zusammenfassung stattdessen an einen Menschen weiter.",
    fallbackAnswer:
      "Waehle zuerst eine Richtung: Website, Anwendung, Support, GLPI oder Cadrage. Danach frage ich nur das Noetige.",
    recadrageBudget:
      "Ich bin lieber direkt: Ohne klaren Umfang kann ich eine Spanne nennen, aber keinen festen Preis.",
    recadrageTimeline: "Ich kann die Machbarkeit pruefen, aber keinen festen Termin ohne Cadrage versprechen.",
    recadrageMvp: "Damit das nicht unrealistisch wird, muessen zuerst die Pflichtfunktionen festgelegt werden.",
    recapIntro: "Das habe ich verstanden:",
    faqAnswers: {
      delai: assistantKnowledge.faq[0].answerDe,
      services: assistantKnowledge.faq[1].answerDe,
      maintenance: assistantKnowledge.faq[2].answerDe,
      method: assistantKnowledge.faq[3].answerDe,
    },
    questions: {
      type: "Welche Art Projekt willst du starten? Website, App, Business-Tool, GLPI, anderes?",
      objective: "Was ist das Hauptziel des Projekts?",
      features: "Welche Funktionen oder Bloecke sind unverzichtbar?",
      timeline: "Welchen Zeitrahmen peilst du an?",
      budget: "Gibt es bereits eine Budgetspanne?",
      users: "Wie viele Nutzer oder welches Volumen erwartest du?",
      countriesLanguages: "Welche Laender oder Sprachen sind betroffen?",
      technicalNeeds: "Gibt es besondere Anforderungen: Admin, Zahlung, API, Premium-Design, anderes?",
      problem: "Was ist das Hauptproblem, das geloest werden muss?",
      urgency: "Wie dringend ist das Thema?",
      impact: "Wie stark ist der Einfluss auf Betrieb oder Nutzer?",
      affectedUsers: "Wie viele Nutzer sind betroffen?",
      sinceWhen: "Seit wann besteht das Problem?",
      actionsTried: "Welche Schritte wurden bereits versucht?",
    },
  },
} as const;

const projectQuestionOrder = ["type", "objective", "features", "timeline", "budget", "users", "countriesLanguages", "technicalNeeds"] as const;
const supportQuestionOrder = ["problem", "urgency", "impact", "affectedUsers", "sinceWhen", "actionsTried"] as const;

const faqIntentKeywords = ["faq", "comment", "combien", "how", "what", "do you", "wie", "was", "wann"];
const projectIntentKeywords = [
  "site",
  "website",
  "landing",
  "ecommerce",
  "application",
  "app",
  "mvp",
  "dashboard",
  "portail",
  "portal",
  "plateforme",
  "platform",
  "refonte",
  "outil",
  "tool",
  "devis",
];
const supportIntentKeywords = ["support", "ticket", "incident", "bug", "probleme", "problem", "erreur", "glpi", "panne", "issue"];
const projectBuildPhrases = [
  "je veux",
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
  if (text.includes("mobile")) return "mobile_app";
  if (text.includes("dashboard") || text.includes("portail") || text.includes("portal") || text.includes("plateforme") || text.includes("platform")) return "dashboard_portal";
  if (text.includes("app") || text.includes("application")) return "web_app";
  if (text.includes("ecommerce") || text.includes("boutique") || text.includes("shop")) return "ecommerce";
  if (text.includes("corporate")) return "corporate_website";
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

  if (projectType === "showcase_website" || projectType === "corporate_website" || projectType === "ecommerce") {
    roles.add("Designer");
    roles.add("Front-end developer");
  }

  if (projectType === "web_app" || projectType === "mobile_app" || projectType === "dashboard_portal" || projectType === "glpi_assistant") {
    roles.add("Product designer");
    roles.add("Front-end developer");
    roles.add("Back-end developer");
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
  if (totalDays <= 8) return "low";
  if (totalDays <= 20) return "medium";
  return "high";
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
        : "Resume support pret pour humain ou ticket GLPI.",
    });
  }

  const pricingType = projectTypeToPricingType(session.projectType);
  const detectedFeatures = inferFeatures(session.collected);
  const baseDays = Number(pricingRules.baseDays[pricingType]);
  const weightedDays = detectedFeatures.reduce<number>(
    (sum, feature) => sum + Number(pricingRules.featureWeights[feature]),
    baseDays
  );
  const budgetMin = Math.max(pricingRules.minimums[pricingType], weightedDays * pricingRules.dailyRate.min);
  const budgetMax = Math.max(
    budgetMin + pricingRules.dailyRate.max,
    Math.round((weightedDays + Math.max(2, Math.ceil(weightedDays * 0.35))) * pricingRules.dailyRate.max)
  );
  const complexity = computeComplexity(weightedDays);

  return assistantStructuredOutputSchema.parse({
    intent: "project_quote",
    project_type: session.projectType,
    clarity_score: clarityScore,
    complexity,
    budget_range: { min: budgetMin, max: budgetMax },
    estimated_days: weightedDays,
    roles: getProjectRoles(session.projectType, detectedFeatures),
    missing_info: missingInfo,
    next_step: missingInfo.length
      ? "Completer les informations manquantes avant devis."
      : "Preparer un devis structure avec reprise humaine.",
  });
}

async function refineSummaryWithOpenAI(session: AssistantSession, locale: Locale) {
  const instructions = `
You are a business qualification assistant for KAH-Digital.
Return only valid JSON.
Classify the request, structure the output, and keep uncertainty explicit.
Never promise fixed prices or fixed delivery.
Allowed intents: project_quote, support_glpi, faq, general_info, unknown.
Allowed project types: showcase_website, corporate_website, ecommerce, web_app, mobile_app, dashboard_portal, glpi_assistant, unknown.
Allowed complexity: low, medium, high.
Act like a pre-project lead, not a generic chatbot.
Be direct, concise, structured, and commercially useful.
Flag vague requests, unrealistic expectations, and missing essentials clearly.
`;

  const output = await generateOpenAIJson<AssistantStructuredOutput>({
    instructions,
    input: JSON.stringify({
      locale,
      positioning: assistantKnowledge.positioning,
      process: assistantKnowledge.process,
      services: assistantKnowledge.services,
      session,
    }),
  });

  if (!output) return null;

  const parsed = assistantStructuredOutputSchema.safeParse(output);
  return parsed.success ? parsed.data : null;
}

function detectEscalation(summary: AssistantStructuredOutput, session: AssistantSession) {
  if (summary.complexity === "high") return true;
  if (summary.budget_range.max >= 12000) return true;
  if (summary.clarity_score < 55) return true;
  if (summary.missing_info.length >= 3) return true;
  if (session.intent === "support_glpi" && /(critique|critical|bloque|blocked)/i.test(JSON.stringify(session.collected))) return true;
  return false;
}

function acknowledgeAndAsk(locale: Locale, question: string) {
  if (locale === "en") return `Next point: ${question}`;
  if (locale === "de") return `Naechster Punkt: ${question}`;
  return `Point suivant : ${question}`;
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
      showcase_website: "site vitrine",
      corporate_website: "site corporate",
      ecommerce: "e-commerce",
      web_app: "application web",
      mobile_app: "application mobile",
      dashboard_portal: "dashboard ou portail",
      glpi_assistant: "solution connectee a GLPI",
      unknown: "projet digital",
    },
    en: {
      showcase_website: "showcase website",
      corporate_website: "corporate website",
      ecommerce: "e-commerce",
      web_app: "web application",
      mobile_app: "mobile application",
      dashboard_portal: "dashboard or portal",
      glpi_assistant: "GLPI-connected solution",
      unknown: "digital project",
    },
    de: {
      showcase_website: "Unternehmenswebsite",
      corporate_website: "Corporate-Website",
      ecommerce: "E-Commerce",
      web_app: "Web-Anwendung",
      mobile_app: "Mobile-App",
      dashboard_portal: "Dashboard oder Portal",
      glpi_assistant: "GLPI-nahe Loesung",
      unknown: "Digitalprojekt",
    },
  } as const;

  return labels[locale][projectType];
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
    if (projectType === "showcase_website" || projectType === "corporate_website") {
      return locale === "en"
        ? "To answer seriously, I need the minimum useful scope: roughly how many pages, and do you need lead capture, SEO, multilingual content, or a premium visual direction?"
        : locale === "de"
          ? "Damit ich serioes antworten kann, brauche ich den minimal noetigen Scope: ungefaehr wie viele Seiten, und brauchst du Lead-Erfassung, SEO, Mehrsprachigkeit oder eine hochwertige visuelle Richtung?"
          : "Pour te repondre serieusement, il me faut le minimum utile : combien de pages environ, et est-ce qu'il faut capture de contacts, SEO, multilingue ou une direction visuelle premium ?";
    }

    if (projectType === "web_app" || projectType === "mobile_app") {
      return locale === "en"
        ? "Let's frame the useful scope: do you need user accounts, payments, a dashboard, API integrations, or geolocation?"
        : locale === "de"
          ? "Lass uns den scope eingrenzen: brauchst du Benutzerkonten, Zahlung, Dashboard, API-Integrationen oder Geolokalisierung?"
          : "On cadre le scope utile : il faut des comptes utilisateurs, du paiement, un dashboard, des integrations API ou de la geolocalisation ?";
    }

    if (projectType === "glpi_assistant") {
      return locale === "en"
        ? "For version 1 around GLPI, what must exist from day one: user guidance, request qualification, automatic ticket creation, knowledge base, or dashboard?"
        : locale === "de"
          ? "Fuer eine Version 1 autour de GLPI: was ist zwingend noetig - Nutzerhilfe, Qualifizierung, automatische Ticketerstellung, Wissensbasis oder Dashboard?"
          : "Pour une version 1 autour de GLPI, qu'est-ce qui doit exister des le depart : aide utilisateur, qualification des demandes, creation automatique de ticket, base de connaissance ou dashboard ?";
    }
  }

  if (nextMissing === "timeline") {
    if (detectUrgentRequest(objective)) {
      return locale === "en"
        ? `${copy.recadrageTimeline} What is the hard deadline, and what is strictly required for launch?`
        : locale === "de"
          ? `${copy.recadrageTimeline} Was ist die vraie deadline, und was ist fuer den Start wirklich unverzichtbar?`
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

  if (nextMissing === "objective" && (projectType === "showcase_website" || projectType === "corporate_website")) {
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
        ? "Ja, aber fuer ein brauchbares Angebot brauche ich den minimal noetigen Rahmen: Projekttyp, Ziel, Hauptfunktionen und Zieltermin. Starte mit dem Projekttyp."
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
        : "Je peux t'orienter rapidement, mais sans reponse catalogue : tu cherches plutot un site, une application, du support ou un parcours type GLPI, et ton besoin est deja defini ou tu explores encore ?";
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
        : "C'est note. Pour savoir si le delai est realiste, il me faut trois points : ce qu'il faut livrer exactement, la date limite ferme, et ce qui est strictement indispensable au lancement.";
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

  return copy.questions[nextMissing as keyof typeof copy.questions];
}

function buildFirstReply(session: AssistantSession, locale: Locale, message: string) {
  const copy = getCopy(locale);

  if (session.intent === "project_quote") {
    if (detectUnrealisticRequest(message)) {
      return locale === "en"
        ? `${copy.recadrageMvp} A project like that implies real-time logic, user accounts, and a solid backend. Start with version 1: what is strictly essential, and what budget is actually possible?`
        : locale === "de"
          ? `${copy.recadrageMvp} So ein Projekt braucht Echtzeitlogik, Benutzerkonten und ein solides Backend. Starten wir mit Version 1: was ist wirklich unverzichtbar, und welches Budget ist realistisch?`
          : `${copy.recadrageMvp} Un projet de ce niveau implique temps reel, comptes utilisateurs et backend solide. On part sur une version 1 : qu'est-ce qui est vraiment indispensable, et quel budget est realistement possible ?`;
    }

    const nextMissing = getRequiredFields(session.intent).find((field) => !session.collected[field]);
    if (!nextMissing) return copy.summaryReady;
    return `${copy.startProject} ${buildProjectQuestion(session, locale, nextMissing)}`;
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
  const copy = getCopy(locale);
  const budget = summary.budget_range.max > 0 ? formatBudgetRange(summary) : "n/a";

  const lines =
    locale === "en"
      ? [
          copy.recapIntro,
          `- project: ${formatProjectTypeLabel(summary.project_type as AssistantProjectType, locale)}`,
          `- complexity: ${summary.complexity}`,
          `- budget range: ${budget}`,
          `- likely timeline: ${estimateCalendarRange(summary.estimated_days, locale)}`,
          humanNeeded ? "Next step: human review recommended." : "Next step: summary ready for follow-up.",
        ]
      : locale === "de"
        ? [
            copy.recapIntro,
            `- Projekt: ${formatProjectTypeLabel(summary.project_type as AssistantProjectType, locale)}`,
            `- Komplexitaet: ${summary.complexity}`,
            `- Budgetspanne: ${budget}`,
            `- wahrscheinlicher Zeitrahmen: ${estimateCalendarRange(summary.estimated_days, locale)}`,
            humanNeeded ? "Naechster Schritt: menschliche Rueckmeldung empfohlen." : "Naechster Schritt: Zusammenfassung bereit zur Weitergabe.",
          ]
        : [
            copy.recapIntro,
            `- type de projet : ${formatProjectTypeLabel(summary.project_type as AssistantProjectType, locale)}`,
            `- complexite estimee : ${summary.complexity}`,
            `- fourchette budget : ${budget}`,
            `- delai probable : ${estimateCalendarRange(summary.estimated_days, locale)}`,
            humanNeeded ? "Suite : reprise humaine recommandee." : "Suite : resume pret a transmettre.",
          ];

  return lines.join("\n");
}

function resolveProjectTypeFromAnswer(answer: string): AssistantProjectType {
  const inferred = inferProjectType(answer);
  return inferred === "unknown" ? "unknown" : inferred;
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
Allowed project types: showcase_website, corporate_website, ecommerce, web_app, mobile_app, dashboard_portal, glpi_assistant, unknown.
If the user wants to build, frame, connect, redesign, or implement a solution around GLPI, classify as project_quote.
Use support_glpi only for active incidents, bugs, blocked users, ticket handling, or operational support issues.
`;

  return generateOpenAIJson<{ intent: AssistantIntent; project_type: AssistantProjectType }>({
    instructions,
    input: JSON.stringify({ locale, text: input, services: assistantKnowledge.services }),
  });
}

function extractEmail(message: string) {
  const match = message.match(/[^\s@]+@[^\s@]+\.[^\s@]+/);
  return match?.[0];
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

  if (session.intent === "unknown" || session.status === "idle") {
    const openAiClassification = await classifyWithOpenAI(message, params.locale).catch(() => null);
    const inferredIntent = openAiClassification?.intent ?? inferIntent(message);
    const inferredProjectType = openAiClassification?.project_type ?? inferProjectType(message);

    session.intent = inferredIntent;
    session.projectType = inferredProjectType;
    session.status = "collecting";

    if (inferredIntent === "project_quote") {
      if (!session.collected.type && inferredProjectType !== "unknown") {
        session.collected.type = inferredProjectType;
      }
      if (!session.collected.objective) {
        session.collected.objective = message;
      }
      if (!session.collected.features && inferFeatures({ objective: message }).length > 0) {
        session.collected.features = message;
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
    budget_range:
      refinedSummary.budget_range.max >= refinedSummary.budget_range.min
        ? refinedSummary.budget_range
        : fallbackSummary.budget_range,
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
  return {
    intent: openAiClassification?.intent ?? inferIntent(input),
    project_type: openAiClassification?.project_type ?? inferProjectType(input),
  };
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

function formatBudgetRange(summary: AssistantStructuredOutput) {
  if (!summary.budget_range.max) return "n/a";
  return `${summary.budget_range.min.toLocaleString("fr-CH")} - ${summary.budget_range.max.toLocaleString("fr-CH")} ${pricingRules.dailyRate.currency}`;
}

function formatSummaryText(summary: AssistantStructuredOutput, locale: Locale) {
  const budget = formatBudgetRange(summary);
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

export async function sendEmail(input: {
  locale: Locale;
  email: string;
  name?: string;
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

  await resendClient.emails.send({
    from: "Kah-Digital <notifications@kah-digital.io>",
    to: input.email,
    subject:
      input.locale === "en"
        ? "Your KAH-Digital assistant summary"
        : input.locale === "de"
          ? "Deine KAH-Digital Zusammenfassung"
          : "Votre resume assistant KAH-Digital",
    text: formatSummaryText(input.summary, input.locale),
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

  await resendClient.emails.send({
    from: "Kah-Digital <notifications@kah-digital.io>",
    to: notificationEmail.split(",").map((item) => item.trim()),
    replyTo: input.email,
    subject: `Assistant lead - ${input.summary.project_type}`,
    text: `Contact: ${input.name ?? "-"} / ${input.email ?? "-"}

${formatSummaryText(input.summary, input.locale)}

Transcript:
${transcript}`,
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
  summary: AssistantStructuredOutput;
  transcript: AssistantTranscriptItem[];
}) {
  const copy = getCopy(input.locale);
  if (!input.consent) {
    return { ok: false, error: copy.invalidConsent };
  }

  const transcript = input.transcript.map((item) => `${item.role}: ${item.content}`).join("\n");
  const content = `Contact: ${input.name ?? "-"} / ${input.email ?? "-"}

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
