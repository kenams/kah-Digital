"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { FiArrowUpRight, FiMessageSquare, FiRotateCcw, FiSend } from "react-icons/fi";
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
    button: "Assistant projet & support",
    title: "Assistant projet & support",
    subtitle: "Orientation, budget, devis 24h et reprise humaine si nécessaire.",
    introTitle: "Avant de commencer",
    introBody: "Prénom, nom et email suffisent pour démarrer. Tu peux compléter les autres infos en cours de conversation.",
    firstName: "Prénom *",
    lastName: "Nom *",
    phone: "Téléphone (optionnel)",
    company: "Société (optionnel)",
    firstNamePlaceholder: "Ex : Alex",
    lastNamePlaceholder: "Ex : Martin",
    phonePlaceholder: "Ex : +41 79 000 00 00",
    companyPlaceholder: "Ex : Studio Nova",
    startChat: "Commencer le chat",
    identityRequired: "Ajoute ton prénom, ton nom et ton email pour commencer.",
    welcome: "Bonjour ! Je suis Kah, conseiller KAH-Digital. Je peux répondre à tes questions sur les prix, les délais et les services — et cadrer ton projet pour un devis sous 24h si tu le souhaites.",
    suggestions: ["Combien coûte un site ?", "Je veux créer une app", "Refaire mon site", "Automatisation IA"],
    placeholder: "Pose ta question ou décris ton projet...",
    send: "Envoyer",
    progress: "Progression",
    summary: "Résumé structuré",
    missing: "Informations manquantes",
    budget: "Budget estimé",
    days: "Jours estimés",
    roles: "Ressources",
    ctaEmail: "Recevoir le résumé",
    ctaHuman: "Parler à un humain",
    ctaGlpi: "Créer un ticket",
    ctaQuote: "Demander un devis 24h",
    ctaOffers: "Voir les offres",
    purchaseHint: "Résumé prêt. Le plus propre est de transformer ça en demande de devis ou de comparer l'offre correspondante.",
    consent: "J'accepte l'enregistrement de mon résumé pour être recontacté.",
    email: "Email",
    name: "Nom",
    reset: "Nouveau chat",
    resetConfirm: "Effacer l'historique de cette conversation ?",
    retention: "Historique conservé 1h",
    sessionExpired: "La conversation précédente a expiré après inactivité. Tu peux repartir de zéro.",
    close: "Fermer",
    open: "Ouvrir",
    contact: "Contact KAH",
    helper: "Une question à la fois. Prix cohérents. Suite claire.",
    qualStarted: "Démarrage",
    qualCollecting: "Qualification",
    qualReady: "Résumé en cours",
  },
  en: {
    button: "Project & support assistant",
    title: "Project & support assistant",
    subtitle: "Routing, budget, 24h quote and human handoff when needed.",
    introTitle: "Before we start",
    introBody: "First name, last name and email are enough to start. You can add other details during the conversation.",
    firstName: "First name *",
    lastName: "Last name *",
    phone: "Phone (optional)",
    company: "Company (optional)",
    firstNamePlaceholder: "e.g. Alex",
    lastNamePlaceholder: "e.g. Martin",
    phonePlaceholder: "e.g. +41 79 000 00 00",
    companyPlaceholder: "e.g. Studio Nova",
    startChat: "Start chat",
    identityRequired: "Add your first name, last name and email to start.",
    welcome: "Hi! I'm Kah, KAH-Digital advisor. Ask me anything about pricing, timelines, or services — and I can frame your project for a 24h quote if you'd like.",
    suggestions: ["How much does a site cost?", "I want to build an app", "Redo my website", "AI automation"],
    placeholder: "Ask a question or describe your project...",
    send: "Send",
    progress: "Progress",
    summary: "Structured summary",
    missing: "Missing info",
    budget: "Estimated budget",
    days: "Estimated days",
    roles: "Resources",
    ctaEmail: "Get the summary",
    ctaHuman: "Talk to a human",
    ctaGlpi: "Create a ticket",
    ctaQuote: "Request a 24h quote",
    ctaOffers: "See offers",
    purchaseHint: "Summary ready. The clean next step is to turn this into a quote request or compare the matching offer.",
    consent: "I agree to store the summary so KAH-Digital can follow up.",
    email: "Email",
    name: "Name",
    reset: "New chat",
    resetConfirm: "Clear this conversation history?",
    retention: "History kept for 1h",
    sessionExpired: "The previous conversation expired after inactivity. You can start again from zero.",
    close: "Close",
    open: "Open",
    contact: "Contact KAH",
    helper: "One question at a time. Coherent prices. Clear next step.",
    qualStarted: "Getting started",
    qualCollecting: "Qualification",
    qualReady: "Summary in progress",
  },
  de: {
    button: "Projekt- & Support-Assistent",
    title: "Projekt- & Support-Assistent",
    subtitle: "Orientierung, Budget, 24h-Angebot und menschliche Übergabe bei Bedarf.",
    introTitle: "Bevor es losgeht",
    introBody: "Vorname, Nachname und E-Mail reichen aus, um zu starten. Weitere Angaben können während der Unterhaltung ergänzt werden.",
    firstName: "Vorname *",
    lastName: "Nachname *",
    phone: "Telefon (optional)",
    company: "Unternehmen (optional)",
    firstNamePlaceholder: "z. B. Alex",
    lastNamePlaceholder: "z. B. Martin",
    phonePlaceholder: "z. B. +41 79 000 00 00",
    companyPlaceholder: "z. B. Studio Nova",
    startChat: "Chat starten",
    identityRequired: "Bitte Vorname, Nachname und E-Mail angeben, um zu starten.",
    welcome: "Hallo! Ich bin Kah, KAH-Digital Berater. Stell mir Fragen zu Preisen, Zeitrahmen oder Leistungen — und ich kann dein Projekt für ein 24h-Angebot eingrenzen.",
    suggestions: ["Was kostet eine Website?", "Ich will eine App bauen", "Website neu machen", "KI-Automatisierung"],
    placeholder: "Stell eine Frage oder beschreibe dein Projekt...",
    send: "Senden",
    progress: "Fortschritt",
    summary: "Strukturierte Zusammenfassung",
    missing: "Fehlende Infos",
    budget: "Geschätztes Budget",
    days: "Geschätzte Tage",
    roles: "Ressourcen",
    ctaEmail: "Zusammenfassung erhalten",
    ctaHuman: "Mit einem Menschen sprechen",
    ctaGlpi: "Ticket erstellen",
    ctaQuote: "24h-Angebot anfragen",
    ctaOffers: "Angebote sehen",
    purchaseHint: "Zusammenfassung bereit. Der saubere nächste Schritt ist eine Angebotsanfrage oder der Vergleich des passenden Angebots.",
    consent: "Ich stimme der Speicherung der Zusammenfassung für eine Rückmeldung zu.",
    email: "E-Mail",
    name: "Name",
    reset: "Neuer Chat",
    resetConfirm: "Den Verlauf dieser Unterhaltung löschen?",
    retention: "Verlauf für 1h gespeichert",
    sessionExpired: "Die vorherige Unterhaltung ist nach Inaktivität abgelaufen. Du kannst sauber neu starten.",
    close: "Schließen",
    open: "Öffnen",
    contact: "Kontakt KAH",
    helper: "Immer eine Frage. Stimmige Preise. Klarer nächster Schritt.",
    qualStarted: "Start",
    qualCollecting: "Qualifizierung",
    qualReady: "Zusammenfassung läuft",
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

function formatBudgetNumber(value: number, locale: string) {
  const resolvedLocale = locale === "de" ? "de-DE" : locale === "en" ? "en-US" : "fr-FR";
  return new Intl.NumberFormat(resolvedLocale).format(value);
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
        ? ["300 - 600 €", "900 - 1 500 €", "2 200 - 4 500 €", "4 000 € et plus"]
        : locale === "en"
          ? ["€300 - 600", "€900 - 1,500", "€2,200 - 4,500", "€4,000+"]
          : ["300 - 600 €", "900 - 1.500 €", "2.200 - 4.500 €", "4.000 €+"];
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
        ? ["Lancer un projet", "Voir les tarifs", "Parler à quelqu'un"]
        : locale === "en"
          ? ["Start a project", "See pricing", "Talk to someone"]
          : ["Projekt starten", "Preise sehen", "Mit jemandem sprechen"];
    }
    return [];
  }, [hasStartedChat, transcript.length, summary, isStreaming, messagePending, session?.intent, session?.lastAskedField, locale]);

  const summaryCards = useMemo(() => {
    if (!summary) return [];
    return [
      {
        label: copy.budget,
        value:
          summary.budget_range.max > 0
            ? `€ ${formatBudgetNumber(summary.budget_range.min, locale)} – ${formatBudgetNumber(summary.budget_range.max, locale)}`
            : "n/a",
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
      <div className="pointer-events-auto w-full max-w-[26rem]">
        {open ? (
          <div className="overflow-hidden rounded-[2rem] border border-white/12 bg-[linear-gradient(180deg,rgba(10,9,8,0.98),rgba(8,16,28,0.98))] shadow-[0_30px_90px_rgba(0,0,0,0.55)] backdrop-blur-2xl">
            <div className="border-b border-white/8 bg-[radial-gradient(circle_at_top_left,rgba(214,179,106,0.24),transparent_40%),radial-gradient(circle_at_top_right,rgba(127,184,199,0.22),transparent_38%)] p-5">
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <p className="text-[0.72rem] uppercase tracking-[0.35em] text-white/55">{copy.progress}</p>
                  <h3 className="mt-2 text-xl font-semibold text-white">{copy.title}</h3>
                  <p className="mt-2 max-w-xs text-sm text-white/68">{copy.subtitle}</p>
                  <p className="mt-3 text-[0.68rem] uppercase tracking-[0.28em] text-white/42">{copy.retention}</p>
                </div>
                <div className="flex flex-wrap items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => resetConversation()}
                    disabled={!canReset}
                    className="inline-flex items-center gap-2 rounded-full border border-white/12 px-3 py-2 text-xs font-medium text-white/70 transition hover:border-white/25 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <FiRotateCcw />
                    {copy.reset}
                  </button>
                  <button
                    type="button"
                    onClick={() => { setOpen(false); trackEvent("assistant_closed", { assistant_locale: locale }); }}
                    className="rounded-full border border-white/12 px-3 py-2 text-xs font-medium text-white/70 transition hover:border-white/25 hover:text-white"
                  >
                    {copy.close}
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/25 p-3">
                <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.28em] text-white/50">
                  <span>{qualScore.label}</span>
                  <span>{qualScore.pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-white/8">
                  <div
                    className="h-full rounded-full bg-[linear-gradient(90deg,rgba(214,179,106,0.95),rgba(127,184,199,0.95))] transition-all duration-700 ease-out"
                    style={{ width: `${qualScore.pct}%` }}
                  />
                </div>
                <div className="mt-2 flex gap-1">
                  {Array.from({ length: qualScore.total }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-0.5 flex-1 rounded-full transition-all duration-500 ${i < qualScore.current ? "bg-[rgba(214,179,106,0.7)]" : "bg-white/10"}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="max-h-[28rem] space-y-4 overflow-y-auto px-5 py-4" role="log" aria-live="polite" aria-atomic="false" aria-label={copy.title}>
              {!hasStartedChat ? (
                <div className="space-y-4 rounded-[1.8rem] border border-white/12 bg-white/[0.03] p-4">
                  <div>
                    <p className="text-[0.72rem] uppercase tracking-[0.32em] text-white/45">{copy.open}</p>
                    <h4 className="mt-2 text-lg font-semibold text-white">{copy.introTitle}</h4>
                    <p className="mt-2 text-sm text-white/68">{copy.introBody}</p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input
                      type="text"
                      value={firstName}
                      onChange={(event) => setFirstName(event.target.value)}
                      placeholder={copy.firstNamePlaceholder}
                      className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
                      aria-label={copy.firstName}
                    />
                    <input
                      type="text"
                      value={lastName}
                      onChange={(event) => setLastName(event.target.value)}
                      placeholder={copy.lastNamePlaceholder}
                      className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
                      aria-label={copy.lastName}
                    />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder={copy.email}
                    className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
                    aria-label={copy.email}
                  />
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input
                      type="text"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      placeholder={copy.phonePlaceholder}
                      className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
                      aria-label={copy.phone}
                    />
                    <input
                      type="text"
                      value={company}
                      onChange={(event) => setCompany(event.target.value)}
                      placeholder={copy.companyPlaceholder}
                      className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
                      aria-label={copy.company}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleStartChat}
                    disabled={!canStartChat}
                    className="inline-flex items-center justify-center rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-[#11131b] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {copy.startChat}
                  </button>
                </div>
              ) : transcript.length === 0 && !pendingUserMessage && !isStreaming ? (
                <div className="space-y-3">
                  <div className="pr-8">
                    <div className="rounded-[1.6rem] rounded-bl-md border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/86">
                      {copy.welcome}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 pr-8">
                    {copy.suggestions.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => sendQuickReply(s)}
                        className="rounded-full border border-white/14 px-3 py-1.5 text-xs text-white/68 transition hover:border-[#d6b36a]/50 hover:text-white"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}

              {hasStartedChat ? transcript.map((item, index) => (
                <div key={`${item.role}-${index}`} className={item.role === "assistant" ? "pr-8" : "pl-8"}>
                  <div
                    className={
                      item.role === "assistant"
                        ? "rounded-[1.6rem] rounded-bl-md border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/86"
                        : "rounded-[1.6rem] rounded-br-md bg-[linear-gradient(135deg,rgba(214,179,106,0.18),rgba(127,184,199,0.18))] px-4 py-3 text-sm text-white"
                    }
                  >
                    {item.content}
                  </div>
                </div>
              )) : null}

              {hasStartedChat && pendingUserMessage ? (
                <div className="pl-8">
                  <div className="rounded-[1.6rem] rounded-br-md bg-[linear-gradient(135deg,rgba(214,179,106,0.18),rgba(127,184,199,0.18))] px-4 py-3 text-sm text-white">
                    {pendingUserMessage}
                  </div>
                </div>
              ) : null}

              {hasStartedChat && isStreaming ? (
                <div className="pr-8">
                  <div className="rounded-[1.6rem] rounded-bl-md border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/86">
                    {streamingReply || (
                      <span className="flex items-center gap-1">
                        {[0, 1, 2].map((i) => (
                          <span
                            key={i}
                            className="inline-block h-1.5 w-1.5 rounded-full bg-white/50 animate-bounce"
                            style={{ animationDelay: `${i * 0.18}s`, animationDuration: "0.9s" }}
                          />
                        ))}
                      </span>
                    )}
                  </div>
                </div>
              ) : null}

              {dynamicSuggestions.length > 0 ? (
                <div className="flex flex-wrap gap-2 pr-8">
                  {dynamicSuggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => sendQuickReply(s)}
                      className="rounded-full border border-white/14 px-3 py-1.5 text-xs text-white/68 transition hover:border-[#d6b36a]/50 hover:text-white"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              ) : null}

              {summary ? (
                <div className="rounded-[1.8rem] border border-[#d6b36a]/28 bg-[linear-gradient(135deg,rgba(214,179,106,0.14),rgba(18,22,38,0.82))] p-4">
                  <div className="mb-3 flex items-center gap-2 text-[0.72rem] uppercase tracking-[0.34em] text-[#f1d9a4]">
                    <FiMessageSquare />
                    <span>{copy.summary}</span>
                  </div>

                  <div className="grid gap-3">
                    {summaryCards.map((card) => (
                      <div key={card.label} className="rounded-2xl border border-white/8 bg-black/20 p-3">
                        <p className="text-[0.68rem] uppercase tracking-[0.28em] text-white/45">{card.label}</p>
                        <p className="mt-2 text-sm font-medium text-white">{card.value}</p>
                      </div>
                    ))}
                  </div>

                  {summary.missing_info.length ? (
                    <div className="mt-3 rounded-2xl border border-white/8 bg-black/20 p-3">
                      <p className="text-[0.68rem] uppercase tracking-[0.28em] text-white/45">{copy.missing}</p>
                      <p className="mt-2 text-sm text-white/82">{summary.missing_info.join(", ")}</p>
                    </div>
                  ) : null}

                  {summary.intent === "project_quote" ? (
                    <div className="mt-3 rounded-2xl border border-white/8 bg-black/20 p-3">
                      <p className="text-sm text-white/78">{copy.purchaseHint}</p>
                      <div className="mt-3 grid gap-2">
                        <Link
                          href={quoteHref}
                          onClick={() => trackEvent("assistant_quote_cta", {
                            assistant_locale: locale,
                            assistant_project_type: summary.project_type,
                          })}
                          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-[#11131b] transition hover:brightness-105"
                        >
                          {copy.ctaQuote}
                          <FiArrowUpRight />
                        </Link>
                        <Link
                          href={offersHref}
                          onClick={() => trackEvent("assistant_offers_cta", {
                            assistant_locale: locale,
                            assistant_project_type: summary.project_type,
                          })}
                          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/12 px-4 py-3 text-sm font-semibold text-white transition hover:border-white/25"
                        >
                          {copy.ctaOffers}
                          <FiArrowUpRight />
                        </Link>
                      </div>
                    </div>
                  ) : null}

                  <div className="mt-4 grid gap-2">
                    <input
                      type="text"
                      value={firstName}
                      onChange={(event) => setFirstName(event.target.value)}
                      placeholder={copy.firstName}
                      className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
                    />
                    <input
                      type="text"
                      value={lastName}
                      onChange={(event) => setLastName(event.target.value)}
                      placeholder={copy.lastName}
                      className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder={copy.email}
                      className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
                    />
                    <input
                      type="text"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      placeholder={copy.phone}
                      className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
                    />
                    <input
                      type="text"
                      value={company}
                      onChange={(event) => setCompany(event.target.value)}
                      placeholder={copy.company}
                      className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
                    />
                    <label className="flex items-start gap-3 rounded-2xl border border-white/8 bg-black/15 px-4 py-3 text-sm text-white/76">
                      <input
                        type="checkbox"
                        checked={consent}
                        onChange={(event) => setConsent(event.target.checked)}
                        className="mt-1 h-4 w-4 rounded border-white/20 bg-transparent"
                      />
                      <span>{copy.consent}</span>
                    </label>
                  </div>

                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => handleAction("email")}
                      disabled={!canTriggerActions || !email}
                      className="rounded-2xl bg-[#d6b36a] px-4 py-3 text-sm font-semibold text-[#17120a] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {copy.ctaEmail}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAction("lead")}
                      disabled={!canTriggerActions}
                      className="rounded-2xl border border-white/12 px-4 py-3 text-sm font-semibold text-white transition hover:border-white/25 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {copy.ctaHuman}
                    </button>
                    {session?.intent === "support_glpi" ? (
                      <button
                        type="button"
                        onClick={() => handleAction("glpi")}
                        disabled={!canTriggerActions}
                        className="rounded-2xl border border-[#7fb8c7]/35 bg-[#7fb8c7]/12 px-4 py-3 text-sm font-semibold text-white transition hover:border-[#7fb8c7]/55 disabled:cursor-not-allowed disabled:opacity-50 sm:col-span-2"
                      >
                        {copy.ctaGlpi}
                      </button>
                    ) : null}
                  </div>
                </div>
              ) : null}

              {statusMessage ? (
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/80">
                  {statusMessage}
                </div>
              ) : null}
              <div ref={endRef} />
            </div>

            <div className="border-t border-white/8 p-4">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={message}
                  onChange={(event) => {
                    const val = event.target.value;
                    if (val.length <= 500) setMessage(val);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder={copy.placeholder}
                  maxLength={500}
                  className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
                  disabled={!hasStartedChat}
                />
                <button
                  type="button"
                  onClick={handleSend}
                  disabled={!canSend || !hasStartedChat}
                  className="inline-flex h-[3.2rem] w-[3.2rem] items-center justify-center rounded-2xl bg-white text-[#11131b] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label={copy.send}
                >
                  <FiSend />
                </button>
              </div>
              <div className="mt-3 flex items-center justify-between gap-3 text-xs text-white/42">
                <span className={message.length > 450 ? "text-amber-400" : ""}>
                  {message.length > 400 ? `${500 - message.length}` : copy.helper}
                </span>
                <Link href={contactHref} className="inline-flex items-center gap-1 text-white/62 hover:text-white">
                  {copy.contact}
                  <FiArrowUpRight />
                </Link>
              </div>
            </div>
          </div>
        ) : null}

        {!open ? (
          <button
            type="button"
            onClick={() => { setOpen(true); trackEvent("assistant_opened", { assistant_locale: locale }); }}
            className="group ml-auto flex items-center gap-3 rounded-full border border-white/10 bg-[linear-gradient(135deg,rgba(9,9,8,0.92),rgba(10,23,38,0.92))] px-4 py-3 text-left shadow-[0_20px_60px_rgba(0,0,0,0.45)] transition hover:border-[#d6b36a]/40"
            aria-label={copy.button}
          >
            <span className="relative inline-flex h-11 w-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,rgba(214,179,106,0.92),rgba(127,184,199,0.92))] text-[#11131b] shadow-[0_10px_30px_rgba(214,179,106,0.28)]">
              <FiMessageSquare className="text-lg" />
              <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
              </span>
            </span>
            <span className="hidden min-w-0 sm:block">
              <span className="block text-[0.68rem] uppercase tracking-[0.32em] text-white/45">{copy.open}</span>
              <span className="mt-1 block text-sm font-semibold text-white">{copy.button}</span>
            </span>
          </button>
        ) : null}
      </div>
    </div>
  );
}
