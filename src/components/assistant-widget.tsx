"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { FiArrowUpRight, FiRotateCcw, FiSend, FiX } from "react-icons/fi";
import { trackEvent } from "@/lib/analytics";
import { useLocale } from "@/lib/locale";
import { withLocalePrefix } from "@/lib/locales";
import {
  assistantSessionSchema,
  assistantStructuredOutputSchema,
  type AssistantSession,
  type AssistantStructuredOutput,
} from "@/lib/assistant/schema";

type AssistantProgress = {
  current: number;
  total: number;
  label: string;
};

type AssistantMessageResponse = {
  reply: string;
  progress: AssistantProgress;
  session: AssistantSession;
  summary: AssistantStructuredOutput | null;
  humanNeeded: boolean;
};

type AssistantStreamEvent =
  | { type: "text"; payload: { delta: string } }
  | { type: "done"; payload: AssistantMessageResponse }
  | { type: "error"; payload: { error?: string } };

const storagePrefix = "kah-assistant-session";
const ASSISTANT_SESSION_TTL_MS = 60 * 60 * 1000;

const widgetCopy = {
  fr: {
    button: "Parler à Kayla",
    title: "Kayla · KAH Digital",
    subtitle: "Devis en 24h · Projet · Support",
    introTitle: "Juste quelques infos",
    introBody: "Prénom, nom et email pour démarrer. Kayla s'occupe du reste — c'est rapide.",
    firstName: "Prénom *",
    lastName: "Nom *",
    phone: "Téléphone (optionnel)",
    company: "Société (optionnel)",
    firstNamePlaceholder: "Prénom",
    lastNamePlaceholder: "Nom",
    phonePlaceholder: "+41 79 000 00 00",
    companyPlaceholder: "Nom de ta société",
    startChat: "Démarrer la conversation",
    identityRequired: "Prénom, nom et email requis pour commencer.",
    welcome: "Bonjour ! 👋 Je suis Kayla, de KAH Digital. Dis-moi ce que tu veux créer ou améliorer — même si c'est encore flou, j'aide à y voir clair.",
    suggestions: ["Je veux un site web", "Besoin d'une appli", "Refaire mon site", "Automatisation IA"],
    placeholder: "Écris ton message...",
    send: "Envoyer",
    progress: "Progression",
    summary: "Résumé de ton projet",
    missing: "Infos manquantes",
    budget: "Budget estimé",
    days: "Délai estimé",
    roles: "Ressources",
    ctaEmail: "Recevoir le résumé par email",
    ctaHuman: "Parler à quelqu'un",
    ctaGlpi: "Ouvrir un ticket",
    ctaQuote: "Obtenir un devis personnalisé",
    ctaOffers: "Voir les offres",
    purchaseHint: "Projet bien cadré. Prochaine étape : devis personnalisé ou échange de 15 min.",
    consent: "J'accepte que KAH Digital conserve ce résumé pour me recontacter.",
    email: "Email",
    name: "Nom",
    reset: "Nouveau chat",
    resetConfirm: "Effacer cette conversation ?",
    retention: "Session conservée 1h",
    sessionExpired: "Session expirée. Tu peux repartir à zéro.",
    close: "Fermer",
    open: "Ouvrir",
    contact: "Contact direct",
    helper: "Entrée pour envoyer",
    qualStarted: "Démarrage",
    qualCollecting: "Qualification",
    qualReady: "Résumé prêt",
  },
  en: {
    button: "Chat with Kayla",
    title: "Kayla · KAH Digital",
    subtitle: "Quote in 24h · Project · Support",
    introTitle: "Quick intro",
    introBody: "First name, last name and email to start. Kayla handles the rest — it's fast.",
    firstName: "First name *",
    lastName: "Last name *",
    phone: "Phone (optional)",
    company: "Company (optional)",
    firstNamePlaceholder: "First name",
    lastNamePlaceholder: "Last name",
    phonePlaceholder: "+41 79 000 00 00",
    companyPlaceholder: "Your company",
    startChat: "Start conversation",
    identityRequired: "First name, last name and email required.",
    welcome: "Hey! 👋 I'm Kayla from KAH Digital. Tell me what you want to build or improve — even if it's still rough, I'll help you shape it.",
    suggestions: ["I need a website", "Build an app", "Redesign my site", "AI automation"],
    placeholder: "Type your message...",
    send: "Send",
    progress: "Progress",
    summary: "Project summary",
    missing: "Missing info",
    budget: "Estimated budget",
    days: "Estimated days",
    roles: "Resources",
    ctaEmail: "Email me the summary",
    ctaHuman: "Talk to someone",
    ctaGlpi: "Open a ticket",
    ctaQuote: "Get a custom quote",
    ctaOffers: "Browse offers",
    purchaseHint: "Project well scoped. Next step: custom quote or a 15-min discovery call.",
    consent: "I agree KAH Digital can keep this summary to follow up.",
    email: "Email",
    name: "Name",
    reset: "New chat",
    resetConfirm: "Clear this conversation?",
    retention: "Session kept for 1h",
    sessionExpired: "Session expired. Start fresh.",
    close: "Close",
    open: "Open",
    contact: "Direct contact",
    helper: "Enter to send",
    qualStarted: "Getting started",
    qualCollecting: "Qualifying",
    qualReady: "Summary ready",
  },
  de: {
    button: "Mit Kayla sprechen",
    title: "Kayla · KAH Digital",
    subtitle: "Angebot in 24h · Projekt · Support",
    introTitle: "Kurze Vorstellung",
    introBody: "Vorname, Nachname und E-Mail zum Start. Kayla übernimmt den Rest — geht schnell.",
    firstName: "Vorname *",
    lastName: "Nachname *",
    phone: "Telefon (optional)",
    company: "Unternehmen (optional)",
    firstNamePlaceholder: "Vorname",
    lastNamePlaceholder: "Nachname",
    phonePlaceholder: "+41 79 000 00 00",
    companyPlaceholder: "Unternehmen",
    startChat: "Gespräch starten",
    identityRequired: "Vorname, Nachname und E-Mail erforderlich.",
    welcome: "Hallo! 👋 Ich bin Kayla von KAH Digital. Erzähl mir, was du aufbauen oder verbessern möchtest — auch wenn es noch nicht klar ist, ich helfe dir dabei.",
    suggestions: ["Ich brauche eine Website", "App entwickeln", "Website neu machen", "KI-Automatisierung"],
    placeholder: "Schreib eine Nachricht...",
    send: "Senden",
    progress: "Fortschritt",
    summary: "Projekt-Zusammenfassung",
    missing: "Fehlende Infos",
    budget: "Geschätztes Budget",
    days: "Geschätzte Tage",
    roles: "Ressourcen",
    ctaEmail: "Zusammenfassung per E-Mail",
    ctaHuman: "Mit jemandem sprechen",
    ctaGlpi: "Ticket öffnen",
    ctaQuote: "Individuelles Angebot anfragen",
    ctaOffers: "Angebote ansehen",
    purchaseHint: "Projekt gut eingegrenzt. Nächster Schritt: Angebot oder 15-min Gespräch.",
    consent: "Ich stimme zu, dass KAH Digital die Zusammenfassung speichert.",
    email: "E-Mail",
    name: "Name",
    reset: "Neues Gespräch",
    resetConfirm: "Dieses Gespräch löschen?",
    retention: "Session für 1h gespeichert",
    sessionExpired: "Session abgelaufen. Neu starten.",
    close: "Schließen",
    open: "Öffnen",
    contact: "Direktkontakt",
    helper: "Enter zum Senden",
    qualStarted: "Start",
    qualCollecting: "Qualifizierung",
    qualReady: "Zusammenfassung bereit",
  },
} as const;

async function postJson<T>(url: string, body: unknown) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const payload = (await response.json().catch(() => ({}))) as T & { error?: string };
  if (!response.ok) {
    throw new Error(payload.error || "Request failed");
  }
  return payload;
}

function parseStreamBlocks(buffer: string) {
  const parts = buffer.split("\n\n");
  return {
    blocks: parts.slice(0, -1),
    rest: parts[parts.length - 1] ?? "",
  };
}

function parseStreamEvent(block: string): AssistantStreamEvent | null {
  const lines = block
    .split("\n")
    .map((line) => line.trimEnd())
    .filter(Boolean);

  const eventLine = lines.find((line) => line.startsWith("event:"));
  const dataLines = lines.filter((line) => line.startsWith("data:"));

  if (!eventLine || dataLines.length === 0) {
    return null;
  }

  const event = eventLine.slice(6).trim();
  const raw = dataLines.map((line) => line.slice(5).trim()).join("\n");

  try {
    const payload = JSON.parse(raw) as AssistantStreamEvent["payload"];
    if (event === "text" || event === "done" || event === "error") {
      return { type: event, payload } as AssistantStreamEvent;
    }
  } catch {
    return null;
  }

  return null;
}

async function streamAssistantMessage(body: {
  message: string;
  locale: "fr" | "en" | "de";
  session?: AssistantSession;
  onText: (delta: string) => void;
}) {
  const response = await fetch("/api/assistant/message/stream", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: body.message,
      locale: body.locale,
      session: body.session,
    }),
  });

  if (!response.ok || !response.body) {
    const fallback = await postJson<AssistantMessageResponse>("/api/assistant/message", {
      message: body.message,
      locale: body.locale,
      session: body.session,
    });
    body.onText(fallback.reply);
    return fallback;
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let donePayload: AssistantMessageResponse | null = null;

  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      buffer += decoder.decode();
      break;
    }

    buffer += decoder.decode(value, { stream: true });
    const parsed = parseStreamBlocks(buffer);
    buffer = parsed.rest;

    for (const block of parsed.blocks) {
      const event = parseStreamEvent(block);
      if (!event) continue;

      if (event.type === "text") {
        body.onText(event.payload.delta ?? "");
      } else if (event.type === "done") {
        donePayload = event.payload;
      } else if (event.type === "error") {
        throw new Error(event.payload.error || "Erreur serveur");
      }
    }
  }

  if (!donePayload && buffer.trim()) {
    const trailing = parseStreamEvent(buffer);
    if (trailing?.type === "done") {
      donePayload = trailing.payload;
    } else if (trailing?.type === "error") {
      throw new Error(trailing.payload.error || "Erreur serveur");
    }
  }

  if (!donePayload) {
    throw new Error("Reponse incomplete");
  }

  return donePayload;
}

function splitStoredName(value?: string) {
  const trimmed = value?.trim() ?? "";
  if (!trimmed) {
    return { firstName: "", lastName: "" };
  }

  const parts = trimmed.split(/\s+/);
  if (parts.length === 1) {
    return { firstName: parts[0], lastName: "" };
  }

  return {
    firstName: parts[0] ?? "",
    lastName: parts.slice(1).join(" "),
  };
}

function joinName(firstName: string, lastName: string) {
  return [firstName.trim(), lastName.trim()].filter(Boolean).join(" ").trim();
}

function clearStoredState(storageKey: string) {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(storageKey);
}

export function AssistantWidget() {
  const { locale } = useLocale();
  return <AssistantWidgetInner key={locale} locale={locale} />;
}

function readStoredState(storageKey: string) {
  if (typeof window === "undefined") {
    return { session: null, summary: null, lastActivityAt: null };
  }

  const raw = window.localStorage.getItem(storageKey);
  if (!raw) {
    return { session: null, summary: null, lastActivityAt: null };
  }

  try {
    const parsed = JSON.parse(raw) as {
      session?: AssistantSession | null;
      summary?: AssistantStructuredOutput | null;
      lastActivityAt?: number | null;
    };
    const lastActivityAt =
      typeof parsed.lastActivityAt === "number" && Number.isFinite(parsed.lastActivityAt)
        ? parsed.lastActivityAt
        : parsed.session || parsed.summary
          ? Date.now()
          : null;

    if (lastActivityAt && Date.now() - lastActivityAt > ASSISTANT_SESSION_TTL_MS) {
      clearStoredState(storageKey);
      return { session: null, summary: null, lastActivityAt: null };
    }

    const session = parsed.session ? assistantSessionSchema.safeParse(parsed.session) : null;
    const summary = parsed.summary
      ? assistantStructuredOutputSchema.safeParse(parsed.summary)
      : parsed.session?.summary
        ? assistantStructuredOutputSchema.safeParse(parsed.session.summary)
        : null;

    if ((parsed.session && !session?.success) || ((parsed.summary || parsed.session?.summary) && !summary?.success)) {
      clearStoredState(storageKey);
      return { session: null, summary: null, lastActivityAt: null };
    }

    return {
      session: session?.success ? session.data : null,
      summary: summary?.success ? summary.data : null,
      lastActivityAt,
    };
  } catch {
    clearStoredState(storageKey);
    return { session: null, summary: null, lastActivityAt: null };
  }
}

function AssistantWidgetInner({ locale }: { locale: "fr" | "en" | "de" }) {
  const copy = widgetCopy[locale];
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const storageKey = `${storagePrefix}:${locale}`;
  const initialState = readStoredState(storageKey);
  const storedName = splitStoredName(initialState.session?.collected.name);
  const [session, setSession] = useState<AssistantSession | null>(() => initialState.session);
  const [summary, setSummary] = useState<AssistantStructuredOutput | null>(() => initialState.summary);
  const [lastActivityAt, setLastActivityAt] = useState<number | null>(() => initialState.lastActivityAt);
  const [_progress, setProgress] = useState<AssistantProgress>(() =>
    initialState.summary
      ? { current: 1, total: 1, label: copy.summary }
      : { current: 1, total: 1, label: copy.progress }
  );
  const [firstName, setFirstName] = useState(() => storedName.firstName);
  const [lastName, setLastName] = useState(() => storedName.lastName);
  const [email, setEmail] = useState(() => initialState.session?.collected.email ?? "");
  const [phone, setPhone] = useState(() => initialState.session?.collected.phone ?? "");
  const [company, setCompany] = useState(() => initialState.session?.collected.company ?? "");
  const [consent, setConsent] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [messagePending, startMessageTransition] = useTransition();
  const [actionPending, startActionTransition] = useTransition();
  const [streamingReply, setStreamingReply] = useState("");
  const [pendingUserMessage, setPendingUserMessage] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const transcript = useMemo(() => session?.transcript ?? [], [session?.transcript]);
  const hasConversation = transcript.length > 0 || Boolean(summary) || Boolean(pendingUserMessage) || Boolean(streamingReply);
  const fullName = joinName(firstName, lastName);
  const hasStartedChat = Boolean(session);
  const quoteHref = withLocalePrefix("/devis", locale);
  const offersHref = withLocalePrefix("/offres", locale);
  const contactHref = withLocalePrefix("/contact", locale);

  const qualScore = useMemo(() => {
    const c = session?.collected ?? {};
    const checks = [
      !!(c.name || (firstName && lastName)),
      !!(c.email || email),
      !!(c.objective || c.problem || c.type),
      !!(c.features || c.urgency || c.timeline),
      !!(c.budget || c.impact || c.affectedUsers),
      !!summary,
    ];
    const current = checks.filter(Boolean).length;
    const total = checks.length;
    const pct = Math.round((current / total) * 100);
    let label: string = copy.qualStarted;
    if (summary) label = copy.summary;
    else if (current >= 4) label = copy.qualReady;
    else if (current >= 2) label = copy.qualCollecting;
    return { current, total, pct, label };
  }, [session, firstName, lastName, email, summary, copy]);

  useEffect(() => {
    if (!session && !summary) {
      clearStoredState(storageKey);
      return;
    }

    window.localStorage.setItem(
      storageKey,
      JSON.stringify({ session, summary, lastActivityAt: lastActivityAt ?? Date.now() })
    );
  }, [lastActivityAt, session, summary, storageKey]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [transcript, open, summary]);

  const resetConversation = useMemo(
    () =>
      (options?: { force?: boolean; preserveContact?: boolean; statusMessage?: string }) => {
        if (!options?.force && hasConversation && typeof window !== "undefined") {
          const confirmed = window.confirm(copy.resetConfirm);
          if (!confirmed) return;
        }

        setSession(null);
        setSummary(null);
        setProgress({ current: 1, total: 1, label: copy.progress });
        if (!options?.preserveContact) {
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhone("");
          setCompany("");
          setConsent(false);
        }
        setMessage("");
        setPendingUserMessage("");
        setStreamingReply("");
        setIsStreaming(false);
        setLastActivityAt(null);
        setStatusMessage(options?.statusMessage ?? "");
        clearStoredState(storageKey);
      },
    [copy.progress, copy.resetConfirm, hasConversation, storageKey]
  );

  useEffect(() => {
    if (!lastActivityAt) return;

    const checkExpiration = () => {
      if (Date.now() - lastActivityAt <= ASSISTANT_SESSION_TTL_MS) return;
      resetConversation({
        force: true,
        statusMessage: copy.sessionExpired,
      });
    };

    checkExpiration();
    const interval = window.setInterval(checkExpiration, 60_000);
    window.addEventListener("focus", checkExpiration);
    document.addEventListener("visibilitychange", checkExpiration);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener("focus", checkExpiration);
      document.removeEventListener("visibilitychange", checkExpiration);
    };
  }, [copy.sessionExpired, lastActivityAt, resetConversation]);

  useEffect(() => {
    if (hasStartedChat && open) {
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [hasStartedChat, open]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        trackEvent("assistant_closed", { assistant_locale: locale });
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, locale]);

  const sendQuickReply = (text: string) => {
    if (!hasStartedChat || messagePending || isStreaming) return;
    setLastActivityAt(Date.now());
    setMessage("");
    setStatusMessage("");
    setPendingUserMessage(text);
    setStreamingReply("");
    setIsStreaming(true);
    startMessageTransition(async () => {
      try {
        const result = await streamAssistantMessage({
          message: text,
          locale,
          session: session ? assistantSessionSchema.parse(session) : undefined,
          onText(delta) { setStreamingReply((c) => `${c}${delta}`); },
        });
        setSession(result.session);
        setSummary(result.summary);
        setProgress(result.progress);
        setLastActivityAt(Date.now());
        if (result.session.collected.email) setEmail(result.session.collected.email);
        if (result.session.collected.name) {
          const n = splitStoredName(result.session.collected.name);
          setFirstName(n.firstName);
          setLastName(n.lastName);
        }
        if (result.session.collected.phone) setPhone(result.session.collected.phone);
        if (result.session.collected.company) setCompany(result.session.collected.company);
      } catch (error) {
        setStatusMessage(error instanceof Error ? error.message : "Erreur reseau");
      } finally {
        setPendingUserMessage("");
        setStreamingReply("");
        setIsStreaming(false);
      }
    });
  };

  const canSend = message.trim().length > 0 && !messagePending && !isStreaming;
  const canTriggerActions = Boolean(summary) && consent && !actionPending;
  const canReset = !messagePending && !actionPending && !isStreaming;
  const canStartChat =
    fullName.length > 0 &&
    email.trim().length > 0 &&
    !messagePending &&
    !actionPending &&
    !isStreaming;

  const dynamicSuggestions = useMemo<string[]>(() => {
    if (!hasStartedChat || transcript.length === 0 || summary || isStreaming || messagePending) return [];
    const intent = session?.intent;
    const activeField = session?.lastAskedField;
    if (intent === "project_quote" && activeField === "type") {
      return locale === "fr"
        ? ["Landing / portfolio", "Site vitrine", "SaaS / produit web", "Automatisation IA"]
        : locale === "en"
          ? ["Landing / portfolio", "Showcase site", "SaaS / web product", "AI automation"]
          : ["Landing / Portfolio", "Unternehmenswebsite", "SaaS / Web-Produkt", "KI-Automatisierung"];
    }
    if (intent === "project_quote" && activeField === "objective") {
      return locale === "fr"
        ? ["Presenter mon activite", "Generer des demandes", "Vendre en ligne", "Automatiser un process"]
        : locale === "en"
          ? ["Present my business", "Generate leads", "Sell online", "Automate a process"]
          : ["Unternehmen vorstellen", "Anfragen generieren", "Online verkaufen", "Prozess automatisieren"];
    }
    if (intent === "project_quote" && activeField === "features") {
      return locale === "fr"
        ? ["Pages + formulaire", "Paiement Stripe", "Espace client", "Admin + API"]
        : locale === "en"
          ? ["Pages + form", "Stripe payment", "Client area", "Admin + API"]
          : ["Seiten + Formular", "Stripe-Zahlung", "Kundenbereich", "Admin + API"];
    }
    if (intent === "project_quote" && activeField === "timeline") {
      return locale === "fr"
        ? ["Des que possible", "Sous 2 semaines", "1 a 2 mois", "Pas urgent"]
        : locale === "en"
          ? ["As soon as possible", "Within 2 weeks", "1 to 2 months", "Not urgent"]
          : ["So bald wie moeglich", "Innerhalb 2 Wochen", "1 bis 2 Monate", "Nicht dringend"];
    }
    if (intent === "project_quote" && activeField === "budget") {
      return locale === "fr"
        ? ["Budget à définir", "Budget limité", "Budget évolutif", "Priorité au périmètre"]
        : locale === "en"
          ? ["Budget to define", "Limited budget", "Scalable budget", "Scope first"]
          : ["Budget offen", "Begrenztes Budget", "Skalierbares Budget", "Umfang zuerst"];
    }
    if (intent === "project_quote" && activeField === "decisionStage") {
      return locale === "fr"
        ? ["Devis sous 24h", "Parler à quelqu'un", "Comparer les offres", "Je réfléchis encore"]
        : locale === "en"
          ? ["24h quote", "Talk to someone", "Compare offers", "Still thinking"]
          : ["24h-Angebot", "Mit jemandem sprechen", "Angebote vergleichen", "Ich überlege noch"];
    }
    if (intent === "project_quote" && activeField === "users") {
      return locale === "fr"
        ? ["1 admin", "Petite equipe", "Clients externes", "Grand volume"]
        : locale === "en"
          ? ["1 admin", "Small team", "External clients", "High volume"]
          : ["1 Admin", "Kleines Team", "Externe Kunden", "Grosses Volumen"];
    }
    if (intent === "project_quote" && activeField === "countriesLanguages") {
      return locale === "fr"
        ? ["France", "Suisse", "FR + EN", "Multilingue"]
        : locale === "en"
          ? ["France", "Switzerland", "EN + FR", "Multilingual"]
          : ["Frankreich", "Schweiz", "DE + FR", "Mehrsprachig"];
    }
    if (intent === "project_quote" && activeField === "technicalNeeds") {
      return locale === "fr"
        ? ["Design premium", "SEO", "API / CRM", "Hebergement inclus"]
        : locale === "en"
          ? ["Premium design", "SEO", "API / CRM", "Hosting included"]
          : ["Premium Design", "SEO", "API / CRM", "Hosting inklusive"];
    }
    if (intent === "support_glpi" && activeField === "problem") {
      return locale === "fr"
        ? ["Incident critique", "Demande de service", "Accès bloqué", "Autre problème"]
        : locale === "en"
          ? ["Critical incident", "Service request", "Blocked access", "Other issue"]
          : ["Kritischer Vorfall", "Serviceanfrage", "Gesperrter Zugang", "Anderes Problem"];
    }
    if (intent === "support_glpi" && activeField === "urgency") {
      return locale === "fr"
        ? ["Bloquant", "Degrade", "Gene mineure", "A planifier"]
        : locale === "en"
          ? ["Blocked", "Degraded", "Minor issue", "Can be planned"]
          : ["Blockiert", "Eingeschraenkt", "Kleines Problem", "Planbar"];
    }
    if (intent === "support_glpi" && activeField === "impact") {
      return locale === "fr"
        ? ["Plus d'acces", "Erreurs", "Donnees touchees", "Paiement bloque"]
        : locale === "en"
          ? ["No access", "Errors", "Data affected", "Payment blocked"]
          : ["Kein Zugriff", "Fehler", "Daten betroffen", "Zahlung blockiert"];
    }
    if (intent === "support_glpi" && activeField === "supportPlan") {
      return locale === "fr"
        ? ["Intervention ponctuelle", "Maintenance Essentiel", "Maintenance Confort", "Maintenance Pro"]
        : locale === "en"
          ? ["One-off intervention", "Essential maintenance", "Comfort maintenance", "Pro maintenance"]
          : ["Einmaliger Eingriff", "Basis-Wartung", "Komfort-Wartung", "Pro-Wartung"];
    }
    if (intent === "faq") {
      return locale === "fr"
        ? ["Lancer un projet", "Recevoir une proposition", "Parler à quelqu'un"]
        : locale === "en"
          ? ["Start a project", "Get a proposal", "Talk to someone"]
          : ["Projekt starten", "Vorschlag erhalten", "Mit jemandem sprechen"];
    }
    return [];
  }, [hasStartedChat, transcript.length, summary, isStreaming, messagePending, session?.intent, session?.lastAskedField, locale]);

  const summaryCards = useMemo(() => {
    if (!summary) return [];
    return [
      {
        label: copy.budget,
        value:
          locale === "en"
            ? "Adapted after scoping"
            : "Ajusté après cadrage",
      },
      {
        label: copy.days,
        value: `${summary.estimated_days}`,
      },
      {
        label: copy.roles,
        value: summary.roles.join(", ") || "-",
      },
    ];
  }, [summary, copy.budget, copy.days, copy.roles, locale]);

  const handleSend = () => {
    if (!canSend) return;
    const nextMessage = message.trim();
    setLastActivityAt(Date.now());
    setMessage("");
    setStatusMessage("");
    setPendingUserMessage(nextMessage);
    setStreamingReply("");
    setIsStreaming(true);

    startMessageTransition(async () => {
      try {
        const result = await streamAssistantMessage({
          message: nextMessage,
          locale,
          session: session ? assistantSessionSchema.parse(session) : undefined,
          onText(delta) {
            setStreamingReply((current) => `${current}${delta}`);
          },
        });

        setSession(result.session);
        setSummary(result.summary);
        setProgress(result.progress);
        setLastActivityAt(Date.now());

        if (result.session.collected.email) {
          setEmail(result.session.collected.email);
        }
        if (result.session.collected.name) {
          const nextName = splitStoredName(result.session.collected.name);
          setFirstName(nextName.firstName);
          setLastName(nextName.lastName);
        }
        if (result.session.collected.phone) {
          setPhone(result.session.collected.phone);
        }
        if (result.session.collected.company) {
          setCompany(result.session.collected.company);
        }
      } catch (error) {
        setStatusMessage(error instanceof Error ? error.message : "Erreur reseau");
      } finally {
        setPendingUserMessage("");
        setStreamingReply("");
        setIsStreaming(false);
      }
    });
  };

    const handleAction = (mode: "email" | "lead" | "glpi") => {
      if (!summary) return;
      setStatusMessage("");
    setLastActivityAt(Date.now());

    startActionTransition(async () => {
      try {
        const body = {
          locale,
          consent,
          email: email || undefined,
          name: fullName || undefined,
          phone: phone || undefined,
          company: company || undefined,
          summary,
          transcript,
        };

        const url =
          mode === "email" ? "/api/assistant/email" : mode === "glpi" ? "/api/assistant/glpi" : "/api/assistant/lead";

          const result = await postJson<{ message?: string }>(url, body);
          setLastActivityAt(Date.now());
          setStatusMessage(result.message || "OK");
          trackEvent("assistant_handoff", {
            handoff_mode: mode,
            assistant_intent: summary.intent,
            assistant_project_type: summary.project_type,
            assistant_locale: locale,
          });
        } catch (error) {
          setStatusMessage(error instanceof Error ? error.message : "Erreur reseau");
        }
    });
  };

  const handleStartChat = () => {
    if (!canStartChat) {
      setStatusMessage(copy.identityRequired);
      return;
    }

    const seededSession = assistantSessionSchema.parse({
      locale,
      status: "idle",
      collected: {
        name: fullName,
        email: email.trim(),
        phone: phone.trim() || undefined,
        company: company.trim() || undefined,
      },
      transcript: [],
    });

    setSession(seededSession);
      setSummary(null);
      setProgress({ current: 1, total: 1, label: copy.progress });
      setLastActivityAt(Date.now());
      setStatusMessage("");
      trackEvent("assistant_start", { assistant_locale: locale });
    };

  return (
    <div className="pointer-events-none fixed inset-x-4 bottom-4 z-[80] flex justify-end sm:inset-x-6 sm:bottom-6">
      <div className="pointer-events-auto w-full max-w-[22rem]">

        {/* ── Widget panel ── */}
        {open ? (
          <div
            className="flex flex-col overflow-hidden rounded-[1.25rem] border border-white/[0.09] bg-[#0d0e12] shadow-[0_32px_80px_rgba(0,0,0,0.8),0_0_0_0.5px_rgba(255,255,255,0.06)]"
            style={{ maxHeight: "min(90dvh, 640px)" }}
          >
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/[0.07] bg-[#13141a] px-4 py-3">
              <div className="flex items-center gap-2.5">
                <div className="relative shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-600 text-xs font-bold text-white shadow-lg shadow-blue-500/40">
                    K
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5" aria-hidden="true">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 ring-[1.5px] ring-[#13141a]" />
                  </span>
                </div>
                <div>
                  <p className="text-[13px] font-semibold leading-none text-white">Kayla</p>
                  <p className="mt-[3px] text-[10px] leading-none text-emerald-500">
                    {locale === "de" ? "Online · Antwortet in 2 Min." : locale === "en" ? "Online · Replies in 2 min" : "En ligne · Répond en 2 min"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-0.5">
                <button
                  type="button"
                  onClick={() => resetConversation()}
                  disabled={!canReset}
                  className="rounded-full p-2 text-gray-600 transition hover:bg-white/[0.06] hover:text-gray-300 disabled:opacity-30"
                  title={copy.reset}
                >
                  <FiRotateCcw size={13} />
                </button>
                <button
                  type="button"
                  onClick={() => { setOpen(false); trackEvent("assistant_closed", { assistant_locale: locale }); }}
                  className="rounded-full p-2 text-gray-600 transition hover:bg-white/[0.06] hover:text-gray-300"
                  title={copy.close}
                >
                  <FiX size={15} />
                </button>
              </div>
            </div>

            {/* Progress bar (conversation only) */}
            {hasStartedChat ? (
              <div className="shrink-0 border-b border-white/[0.05] bg-[#0d0e12] px-4 pb-2 pt-1.5">
                <div className="mb-1 flex items-center justify-between gap-2">
                  <span className="text-[9px] font-medium uppercase tracking-widest text-gray-700">{qualScore.label}</span>
                  <span className="text-[9px] text-gray-700">{qualScore.pct}%</span>
                </div>
                <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/[0.06]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500 transition-all duration-700 ease-out"
                    style={{ width: `${qualScore.pct}%` }}
                  />
                </div>
              </div>
            ) : null}

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto overscroll-contain px-4 py-4"
              role="log"
              aria-live="polite"
              aria-atomic="false"
              aria-label={copy.title}
            >
              <div className="space-y-3">

                {/* Onboarding form */}
                {!hasStartedChat ? (
                  <div className="space-y-3">
                    <div className="flex items-end gap-2">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-600 text-[10px] font-bold text-white">K</div>
                      <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-[#1c1d24] px-3.5 py-2.5 text-[13px] leading-relaxed text-gray-300">
                        {copy.introBody}
                      </div>
                    </div>
                    <div className="rounded-2xl border border-white/[0.08] bg-[#13141a] p-3.5 space-y-2.5">
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={firstName}
                          onChange={(event) => setFirstName(event.target.value)}
                          placeholder={copy.firstNamePlaceholder}
                          className="rounded-xl border border-white/[0.08] bg-black/30 px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-blue-500/50 focus:bg-black/40"
                          aria-label={copy.firstName}
                        />
                        <input
                          type="text"
                          value={lastName}
                          onChange={(event) => setLastName(event.target.value)}
                          placeholder={copy.lastNamePlaceholder}
                          className="rounded-xl border border-white/[0.08] bg-black/30 px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-blue-500/50 focus:bg-black/40"
                          aria-label={copy.lastName}
                        />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder={copy.email}
                        className="w-full rounded-xl border border-white/[0.08] bg-black/30 px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-blue-500/50 focus:bg-black/40"
                        aria-label={copy.email}
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={phone}
                          onChange={(event) => setPhone(event.target.value)}
                          placeholder={copy.phonePlaceholder}
                          className="rounded-xl border border-white/[0.06] bg-black/20 px-3 py-2 text-sm text-white outline-none transition placeholder:text-gray-700 focus:border-blue-500/40"
                          aria-label={copy.phone}
                        />
                        <input
                          type="text"
                          value={company}
                          onChange={(event) => setCompany(event.target.value)}
                          placeholder={copy.companyPlaceholder}
                          className="rounded-xl border border-white/[0.06] bg-black/20 px-3 py-2 text-sm text-white outline-none transition placeholder:text-gray-700 focus:border-blue-500/40"
                          aria-label={copy.company}
                        />
                      </div>
                      {statusMessage ? (
                        <p className="text-[11px] text-red-400">{statusMessage}</p>
                      ) : null}
                      <button
                        type="button"
                        onClick={handleStartChat}
                        disabled={!canStartChat}
                        className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:shadow-blue-500/35 disabled:cursor-not-allowed disabled:opacity-45"
                      >
                        {copy.startChat}
                      </button>
                    </div>
                  </div>
                ) : null}

                {/* Welcome + initial suggestions */}
                {hasStartedChat && transcript.length === 0 && !pendingUserMessage && !isStreaming ? (
                  <div className="space-y-3">
                    <div className="flex items-end gap-2">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-600 text-[10px] font-bold text-white">K</div>
                      <div className="max-w-[85%] rounded-2xl rounded-bl-sm bg-[#1c1d24] px-3.5 py-2.5 text-[13px] leading-relaxed text-gray-200">
                        {copy.welcome}
                      </div>
                    </div>
                    <div className="ml-9 flex flex-wrap gap-1.5">
                      {copy.suggestions.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => sendQuickReply(s)}
                          className="rounded-full border border-white/[0.09] bg-[#13141a] px-3 py-1.5 text-[11px] text-gray-400 transition hover:border-blue-500/40 hover:text-white"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}

                {/* Transcript */}
                {hasStartedChat
                  ? transcript.map((item, index) =>
                      item.role === "assistant" ? (
                        <div key={`${item.role}-${index}`} className="flex items-end gap-2">
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-600 text-[10px] font-bold text-white">K</div>
                          <div className="max-w-[84%] rounded-2xl rounded-bl-sm bg-[#1c1d24] px-3.5 py-2.5 text-[13px] leading-relaxed text-gray-200">
                            {item.content}
                          </div>
                        </div>
                      ) : (
                        <div key={`${item.role}-${index}`} className="flex justify-end">
                          <div className="max-w-[84%] rounded-2xl rounded-br-sm bg-gradient-to-br from-blue-600 to-violet-600 px-3.5 py-2.5 text-[13px] leading-relaxed text-white shadow-md shadow-blue-600/25">
                            {item.content}
                          </div>
                        </div>
                      )
                    )
                  : null}

                {/* Pending user bubble */}
                {hasStartedChat && pendingUserMessage ? (
                  <div className="flex justify-end">
                    <div className="max-w-[84%] rounded-2xl rounded-br-sm bg-gradient-to-br from-blue-600 to-violet-600 px-3.5 py-2.5 text-[13px] leading-relaxed text-white shadow-md shadow-blue-600/25">
                      {pendingUserMessage}
                    </div>
                  </div>
                ) : null}

                {/* Typing / streaming */}
                {hasStartedChat && isStreaming ? (
                  <div className="flex items-end gap-2">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-600 text-[10px] font-bold text-white">K</div>
                    <div className="max-w-[84%] rounded-2xl rounded-bl-sm bg-[#1c1d24] px-3.5 py-2.5 text-[13px] leading-relaxed text-gray-200">
                      {streamingReply || (
                        <span className="flex items-center gap-1.5 py-0.5">
                          {[0, 1, 2].map((i) => (
                            <span
                              key={i}
                              className="inline-block h-[7px] w-[7px] rounded-full bg-gray-500 animate-bounce"
                              style={{ animationDelay: `${i * 0.16}s`, animationDuration: "0.75s" }}
                            />
                          ))}
                        </span>
                      )}
                    </div>
                  </div>
                ) : null}

                {/* Dynamic suggestions */}
                {dynamicSuggestions.length > 0 ? (
                  <div className="ml-9 flex flex-wrap gap-1.5">
                    {dynamicSuggestions.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => sendQuickReply(s)}
                        className="rounded-full border border-white/[0.09] bg-[#13141a] px-3 py-1.5 text-[11px] text-gray-400 transition hover:border-blue-500/40 hover:text-white"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                ) : null}

                {/* Summary card */}
                {summary ? (
                  <div className="rounded-2xl border border-blue-500/20 bg-[linear-gradient(135deg,rgba(59,130,246,0.07),rgba(124,58,237,0.05))] p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-blue-400">{copy.summary}</span>
                    </div>

                    <div className="space-y-2">
                      {summaryCards.map((card) => (
                        <div key={card.label} className="rounded-xl border border-white/[0.06] bg-black/20 px-3 py-2">
                          <p className="text-[9px] uppercase tracking-widest text-gray-600">{card.label}</p>
                          <p className="mt-0.5 text-sm font-medium text-gray-200">{card.value}</p>
                        </div>
                      ))}
                    </div>

                    {summary.missing_info.length ? (
                      <div className="mt-2 rounded-xl border border-white/[0.06] bg-black/20 px-3 py-2">
                        <p className="text-[9px] uppercase tracking-widest text-gray-600">{copy.missing}</p>
                        <p className="mt-0.5 text-sm text-gray-400">{summary.missing_info.join(", ")}</p>
                      </div>
                    ) : null}

                    {summary.intent === "project_quote" ? (
                      <div className="mt-3 rounded-xl border border-white/[0.06] bg-black/20 p-3">
                        <p className="mb-3 text-[11px] leading-relaxed text-gray-400">{copy.purchaseHint}</p>
                        <div className="flex flex-col gap-2">
                          <Link
                            href={quoteHref}
                            onClick={() => trackEvent("assistant_quote_cta", { assistant_locale: locale, assistant_project_type: summary.project_type })}
                            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition hover:shadow-blue-600/40"
                          >
                            {copy.ctaQuote} <FiArrowUpRight size={13} />
                          </Link>
                          <Link
                            href={offersHref}
                            onClick={() => trackEvent("assistant_offers_cta", { assistant_locale: locale, assistant_project_type: summary.project_type })}
                            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/[0.1] py-2.5 text-sm font-semibold text-gray-300 transition hover:border-white/20 hover:text-white"
                          >
                            {copy.ctaOffers} <FiArrowUpRight size={13} />
                          </Link>
                        </div>
                      </div>
                    ) : null}

                    <div className="mt-3 space-y-2">
                      <div className="grid grid-cols-2 gap-2">
                        <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder={copy.firstName}
                          className="rounded-xl border border-white/[0.07] bg-black/20 px-3 py-2 text-sm text-white outline-none placeholder:text-gray-700 focus:border-blue-500/40" />
                        <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder={copy.lastName}
                          className="rounded-xl border border-white/[0.07] bg-black/20 px-3 py-2 text-sm text-white outline-none placeholder:text-gray-700 focus:border-blue-500/40" />
                      </div>
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={copy.email}
                        className="w-full rounded-xl border border-white/[0.07] bg-black/20 px-3 py-2 text-sm text-white outline-none placeholder:text-gray-700 focus:border-blue-500/40" />
                      <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={copy.phone}
                        className="w-full rounded-xl border border-white/[0.07] bg-black/20 px-3 py-2 text-sm text-white outline-none placeholder:text-gray-700 focus:border-blue-500/40" />
                      <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder={copy.company}
                        className="w-full rounded-xl border border-white/[0.07] bg-black/20 px-3 py-2 text-sm text-white outline-none placeholder:text-gray-700 focus:border-blue-500/40" />
                      <label className="flex items-start gap-2.5 rounded-xl border border-white/[0.06] bg-black/10 px-3 py-2.5 text-[11px] text-gray-500">
                        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)}
                          className="mt-0.5 h-3.5 w-3.5 accent-blue-500" />
                        <span>{copy.consent}</span>
                      </label>
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <button type="button" onClick={() => handleAction("email")} disabled={!canTriggerActions || !email}
                        className="rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 py-2.5 text-[12px] font-semibold text-white transition hover:shadow-md hover:shadow-blue-600/25 disabled:cursor-not-allowed disabled:opacity-45">
                        {copy.ctaEmail}
                      </button>
                      <button type="button" onClick={() => handleAction("lead")} disabled={!canTriggerActions}
                        className="rounded-xl border border-white/[0.1] py-2.5 text-[12px] font-semibold text-gray-300 transition hover:border-white/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-45">
                        {copy.ctaHuman}
                      </button>
                      {session?.intent === "support_glpi" ? (
                        <button type="button" onClick={() => handleAction("glpi")} disabled={!canTriggerActions}
                          className="col-span-2 rounded-xl border border-blue-500/20 bg-blue-500/[0.07] py-2.5 text-[12px] font-semibold text-blue-300 transition hover:border-blue-500/40 disabled:cursor-not-allowed disabled:opacity-45">
                          {copy.ctaGlpi}
                        </button>
                      ) : null}
                    </div>
                  </div>
                ) : null}

                {/* Status message */}
                {statusMessage ? (
                  <div className="flex items-end gap-2">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-600 text-[10px] font-bold text-white">K</div>
                    <div className="max-w-[84%] rounded-2xl rounded-bl-sm bg-[#1c1d24] px-3.5 py-2.5 text-[13px] text-gray-400">
                      {statusMessage}
                    </div>
                  </div>
                ) : null}

                <div ref={endRef} />
              </div>
            </div>

            {/* Input area */}
            <div className="shrink-0 border-t border-white/[0.07] bg-[#0d0e12] p-3">
              <div className="flex items-center gap-2 rounded-xl border border-white/[0.09] bg-[#13141a] px-3 py-2 transition focus-within:border-blue-500/40 focus-within:ring-1 focus-within:ring-blue-500/10">
                <input
                  ref={inputRef}
                  type="text"
                  value={message}
                  onChange={(event) => { if (event.target.value.length <= 500) setMessage(event.target.value); }}
                  onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); handleSend(); } }}
                  placeholder={copy.placeholder}
                  maxLength={500}
                  className="min-w-0 flex-1 bg-transparent py-0.5 text-sm text-white outline-none placeholder:text-gray-600"
                  disabled={!hasStartedChat}
                />
                <button
                  type="button"
                  onClick={handleSend}
                  disabled={!canSend || !hasStartedChat}
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 text-white shadow-md shadow-blue-600/30 transition hover:shadow-blue-600/50 disabled:opacity-30"
                  aria-label={copy.send}
                >
                  <FiSend size={12} />
                </button>
              </div>
              <div className="mt-1.5 flex items-center justify-between gap-2 px-0.5 text-[10px] text-gray-700">
                <span className={message.length > 450 ? "text-amber-500" : ""}>
                  {message.length > 400 ? `${500 - message.length}` : copy.helper}
                </span>
                <Link href={contactHref} className="flex items-center gap-0.5 transition hover:text-gray-500">
                  {copy.contact} <FiArrowUpRight size={10} />
                </Link>
              </div>
            </div>
          </div>
        ) : null}

        {/* ── Launcher button ── */}
        {!open ? (
          <button
            type="button"
            onClick={() => { setOpen(true); trackEvent("assistant_opened", { assistant_locale: locale }); }}
            className="group ml-auto flex items-center gap-3 rounded-full border border-white/[0.09] bg-[#0d0e12] px-4 py-2.5 shadow-[0_16px_48px_rgba(0,0,0,0.6)] transition hover:border-blue-500/25 hover:shadow-[0_16px_48px_rgba(59,130,246,0.12)]"
            aria-label={copy.button}
          >
            <div className="relative shrink-0">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-600 text-[13px] font-bold text-white shadow-lg shadow-blue-500/35">
                K
              </div>
              <span className="absolute -right-0.5 -top-0.5 flex h-2.5 w-2.5" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 ring-[1.5px] ring-[#0d0e12]" />
              </span>
            </div>
            <div className="hidden sm:block">
              <span className="block text-[10px] uppercase tracking-[0.18em] text-gray-600">KAH Digital</span>
              <span className="mt-0.5 block text-[13px] font-semibold text-white">{copy.button}</span>
            </div>
          </button>
        ) : null}
      </div>
    </div>
  );
}
