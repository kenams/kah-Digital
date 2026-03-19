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
    summaryReady:
      "J'ai prepare un resume structure. Si tu veux, je peux te l'envoyer par email ou te mettre en relation avec un humain.",
    humanEscalation: "Je prepare un resume et je te mets en relation avec un expert.",
    startProject: "Je peux t'aider a cadrer un projet.",
    startSupport: "Je peux qualifier un sujet support.",
    nextStepQuote: "Devis structure avec reprise humaine conseillee.",
    nextStepSupport: "Resume support pret pour ticket ou reprise humaine.",
    nextStepInfo: "Orientation vers le bon service KAH-Digital.",
    projectFlowLabel: "Qualification projet",
    supportFlowLabel: "Qualification support",
    generalFlowLabel: "Orientation",
    faqFollowUp: "Si tu veux, je peux aussi t'aider a transformer ca en demande concrete.",
    invalidConsent: "J'ai besoin de ton consentement pour stocker ou envoyer le resume.",
    summarySent: "Le resume a ete envoye par email.",
    leadSent: "Le resume a ete transmis a KAH-Digital pour reprise humaine.",
    glpiCreated: "Le ticket support a ete prepare et transmis.",
    glpiFallback: "GLPI n'est pas configure ici. Je transmets plutot vers un humain avec resume.",
    fallbackAnswer:
      "Je peux t'aider a cadrer un projet, qualifier un sujet support, ou te repondre sur les services KAH-Digital.",
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
    summaryReady:
      "I have prepared a structured summary. If you want, I can email it to you or route you to a human expert.",
    humanEscalation: "I am preparing a summary and routing you to an expert.",
    startProject: "I can help frame a project.",
    startSupport: "I can qualify a support issue.",
    nextStepQuote: "Structured quote with human follow-up recommended.",
    nextStepSupport: "Support summary ready for ticket creation or human follow-up.",
    nextStepInfo: "Route toward the right KAH-Digital service.",
    projectFlowLabel: "Project qualification",
    supportFlowLabel: "Support qualification",
    generalFlowLabel: "Routing",
    faqFollowUp: "If you want, I can also turn that into a concrete request.",
    invalidConsent: "I need your consent before storing or sending the summary.",
    summarySent: "The summary was sent by email.",
    leadSent: "The summary was forwarded to KAH-Digital for human follow-up.",
    glpiCreated: "The support ticket was prepared and sent.",
    glpiFallback: "GLPI is not configured here. I am routing the summary to a human instead.",
    fallbackAnswer:
      "I can help frame a project, qualify a support issue, or answer questions about KAH-Digital services.",
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
    summaryReady:
      "Ich habe eine strukturierte Zusammenfassung vorbereitet. Wenn du willst, kann ich sie per E-Mail senden oder an einen Experten uebergeben.",
    humanEscalation: "Ich bereite eine Zusammenfassung vor und verbinde dich mit einem Experten.",
    startProject: "Ich kann helfen, ein Projekt sauber zu qualifizieren.",
    startSupport: "Ich kann ein Support-Thema qualifizieren.",
    nextStepQuote: "Strukturiertes Angebot mit menschlicher Rueckmeldung empfohlen.",
    nextStepSupport: "Support-Zusammenfassung bereit fuer Ticket oder menschliche Uebernahme.",
    nextStepInfo: "Weiterleitung zum passenden KAH-Digital Service.",
    projectFlowLabel: "Projektqualifizierung",
    supportFlowLabel: "Supportqualifizierung",
    generalFlowLabel: "Orientierung",
    faqFollowUp: "Wenn du willst, mache ich daraus direkt eine konkrete Anfrage.",
    invalidConsent: "Ich brauche deine Zustimmung, bevor ich die Zusammenfassung speichere oder versende.",
    summarySent: "Die Zusammenfassung wurde per E-Mail versendet.",
    leadSent: "Die Zusammenfassung wurde an KAH-Digital fuer eine menschliche Rueckmeldung weitergeleitet.",
    glpiCreated: "Das Support-Ticket wurde vorbereitet und uebermittelt.",
    glpiFallback: "GLPI ist hier nicht konfiguriert. Ich leite die Zusammenfassung stattdessen an einen Menschen weiter.",
    fallbackAnswer:
      "Ich kann ein Projekt qualifizieren, ein Support-Thema einordnen oder Fragen zu den Leistungen von KAH-Digital beantworten.",
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
const projectIntentKeywords = ["site", "website", "landing", "ecommerce", "application", "app", "mvp", "dashboard", "portail", "portal", "refonte", "outil", "tool"];
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
  if (text.includes("dashboard") || text.includes("portail") || text.includes("portal")) return "dashboard_portal";
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
  if (locale === "en") return `Noted. ${question}`;
  if (locale === "de") return `Verstanden. ${question}`;
  return `C'est note. ${question}`;
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
    }

    if (inferredIntent === "support_glpi" && !session.collected.problem) {
      session.collected.problem = message;
    }

    if (inferredIntent === "faq" || inferredIntent === "general_info" || inferredIntent === "unknown") {
      const faqAnswer = findFaqAnswer(message, params.locale);
      const reply = faqAnswer ? `${faqAnswer} ${copy.faqFollowUp}` : copy.fallbackAnswer;
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
    const question = copy.questions[nextMissing];
    const previousAssistantMessages = session.transcript.filter((item) => item.role === "assistant").length;
    const reply =
      previousAssistantMessages === 0 && session.intent === "project_quote"
        ? `${copy.startProject} ${question}`
        : previousAssistantMessages === 0 && session.intent === "support_glpi"
          ? `${copy.startSupport} ${question}`
          : acknowledgeAndAsk(params.locale, question);

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

  const reply = humanNeeded ? copy.humanEscalation : copy.summaryReady;
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
