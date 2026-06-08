import type { AssistantLeadScore, AssistantRecord, AssistantSession, AssistantStructuredOutput } from "@/lib/assistant/schema";

type ScoreResult = {
  score: AssistantLeadScore;
  label: string;
  reason: string;
};

export function scoreAssistantSummary(summary: AssistantStructuredOutput, session?: Partial<AssistantSession>): ScoreResult {
  if (summary.intent !== "project_quote" && summary.intent !== "support_glpi") {
    return {
      score: "out_of_scope",
      label: "Hors perimetre",
      reason: "Demande informative ou hors offre directe KAH Digital.",
    };
  }

  if (summary.intent === "support_glpi") {
    const transcriptText = (session?.transcript ?? []).map((item) => item.content).join(" ").toLowerCase();
    const blocked = /(bloque|blocked|critique|critical|down|incident majeur)/.test(transcriptText);
    if (summary.complexity === "high" || blocked) {
      return {
        score: "support_urgent",
        label: "Support urgent",
        reason: "Impact fort ou blocage detecte sur le support.",
      };
    }

    return {
      score: "medium",
      label: "Support a traiter",
      reason: "Sujet support qualifie, sans urgence critique detectee.",
    };
  }

  if (summary.project_type === "unknown" || summary.clarity_score < 35) {
    return {
      score: "low",
      label: "Lead faible",
      reason: "Projet trop flou ou hors cadre exploitable.",
    };
  }

  if (summary.clarity_score >= 70 && summary.missing_info.length <= 2 && summary.budget_range.max >= 3000) {
    return {
      score: "hot",
      label: "Lead chaud",
      reason: "Besoin clair, scope dans le coeur d'offre, budget exploitable.",
    };
  }

  if (summary.clarity_score >= 50) {
    return {
      score: "medium",
      label: "Lead moyen",
      reason: "Projet interessant mais informations encore incomplètes.",
    };
  }

  return {
    score: "low",
    label: "Lead faible",
    reason: "Demande encore trop vague ou budget non qualifie.",
  };
}

export function buildAssistantRecord(input: {
  locale: AssistantRecord["locale"];
  action: AssistantRecord["action"];
  summary: AssistantStructuredOutput;
  transcript: AssistantRecord["transcript"];
  consent: boolean;
  email?: string;
  name?: string;
  phone?: string;
  company?: string;
  humanNeeded?: boolean;
  session?: Partial<AssistantSession>;
}): AssistantRecord {
  const scored = scoreAssistantSummary(input.summary, input.session);

  return {
    submittedAt: new Date().toISOString(),
    locale: input.locale,
    action: input.action,
    intent: input.summary.intent === "support_glpi" ? "support_glpi" : input.summary.intent === "project_quote" ? "project_quote" : "unknown",
    projectType:
      input.summary.project_type === "landing_portfolio" ||
      input.summary.project_type === "showcase_website" ||
      input.summary.project_type === "corporate_website" ||
      input.summary.project_type === "ecommerce" ||
      input.summary.project_type === "web_app" ||
      input.summary.project_type === "mobile_app" ||
      input.summary.project_type === "dashboard_portal" ||
      input.summary.project_type === "glpi_assistant" ||
      input.summary.project_type === "automation_ai"
        ? input.summary.project_type
        : "unknown",
    score: scored.score,
    scoreLabel: scored.label,
    scoreReason: scored.reason,
    humanNeeded: input.humanNeeded ?? false,
    email: input.email,
    name: input.name,
    phone: input.phone,
    company: input.company,
    consent: input.consent,
    summary: input.summary,
    transcript: input.transcript,
    status: "new",
  };
}
