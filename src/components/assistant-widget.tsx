"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { FiArrowUpRight, FiMessageSquare, FiSend } from "react-icons/fi";
import { useLocale } from "@/lib/locale";
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

const storagePrefix = "kah-assistant-session";

const widgetCopy = {
  fr: {
    button: "Assistant projet & support",
    title: "Assistant projet & support",
    subtitle: "Qualification rapide, resume structure, reprise humaine si necessaire.",
    placeholder: "Decris ton besoin, ton projet ou ton probleme...",
    send: "Envoyer",
    progress: "Progression",
    summary: "Resume structure",
    missing: "Informations manquantes",
    budget: "Budget estime",
    days: "Jours estimes",
    roles: "Ressources",
    ctaEmail: "Recevoir le resume",
    ctaHuman: "Parler a un humain",
    ctaGlpi: "Creer un ticket",
    consent: "J'accepte l'enregistrement de mon resume pour etre recontacte.",
    email: "Email",
    name: "Nom",
    close: "Fermer",
    open: "Ouvrir",
    contact: "Contacter KAH-Digital",
    helper: "Une question a la fois. Reponse claire. Fallback humain prevu.",
  },
  en: {
    button: "Project & support assistant",
    title: "Project & support assistant",
    subtitle: "Fast qualification, structured summary, human handoff when needed.",
    placeholder: "Describe your need, project, or issue...",
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
    consent: "I agree to store the summary so KAH-Digital can follow up.",
    email: "Email",
    name: "Name",
    close: "Close",
    open: "Open",
    contact: "Contact KAH-Digital",
    helper: "One question at a time. Clear reply. Human fallback included.",
  },
  de: {
    button: "Projekt- & Support-Assistent",
    title: "Projekt- & Support-Assistent",
    subtitle: "Schnelle Qualifizierung, strukturierte Zusammenfassung, menschliche Uebergabe bei Bedarf.",
    placeholder: "Beschreibe dein Anliegen, Projekt oder Problem...",
    send: "Senden",
    progress: "Fortschritt",
    summary: "Strukturierte Zusammenfassung",
    missing: "Fehlende Infos",
    budget: "Geschaetztes Budget",
    days: "Geschaetzte Tage",
    roles: "Ressourcen",
    ctaEmail: "Zusammenfassung erhalten",
    ctaHuman: "Mit einem Menschen sprechen",
    ctaGlpi: "Ticket erstellen",
    consent: "Ich stimme der Speicherung der Zusammenfassung fuer eine Rueckmeldung zu.",
    email: "E-Mail",
    name: "Name",
    close: "Schliessen",
    open: "Oeffnen",
    contact: "KAH-Digital kontaktieren",
    helper: "Immer nur eine Frage. Klare Antworten. Menschlicher Fallback inklusive.",
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

function formatCurrency(value: number) {
  return new Intl.NumberFormat("fr-CH").format(value);
}

export function AssistantWidget() {
  const { locale } = useLocale();
  return <AssistantWidgetInner key={locale} locale={locale} />;
}

function readStoredState(storageKey: string) {
  if (typeof window === "undefined") {
    return { session: null, summary: null };
  }

  const raw = window.localStorage.getItem(storageKey);
  if (!raw) {
    return { session: null, summary: null };
  }

  try {
    const parsed = JSON.parse(raw) as { session?: AssistantSession | null; summary?: AssistantStructuredOutput | null };
    const session = parsed.session ? assistantSessionSchema.safeParse(parsed.session) : null;
    const summary = parsed.summary
      ? assistantStructuredOutputSchema.safeParse(parsed.summary)
      : parsed.session?.summary
        ? assistantStructuredOutputSchema.safeParse(parsed.session.summary)
        : null;

    if ((parsed.session && !session?.success) || ((parsed.summary || parsed.session?.summary) && !summary?.success)) {
      window.localStorage.removeItem(storageKey);
      return { session: null, summary: null };
    }

    return {
      session: session?.success ? session.data : null,
      summary: summary?.success ? summary.data : null,
    };
  } catch {
    window.localStorage.removeItem(storageKey);
    return { session: null, summary: null };
  }
}

function AssistantWidgetInner({ locale }: { locale: "fr" | "en" | "de" }) {
  const copy = widgetCopy[locale];
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const storageKey = `${storagePrefix}:${locale}`;
  const initialState = readStoredState(storageKey);
  const [session, setSession] = useState<AssistantSession | null>(() => initialState.session);
  const [summary, setSummary] = useState<AssistantStructuredOutput | null>(() => initialState.summary);
  const [progress, setProgress] = useState<AssistantProgress>(() =>
    initialState.summary
      ? { current: 1, total: 1, label: copy.summary }
      : { current: 1, total: 1, label: copy.progress }
  );
  const [name, setName] = useState(() => initialState.session?.collected.name ?? "");
  const [email, setEmail] = useState(() => initialState.session?.collected.email ?? "");
  const [consent, setConsent] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [messagePending, startMessageTransition] = useTransition();
  const [actionPending, startActionTransition] = useTransition();
  const endRef = useRef<HTMLDivElement | null>(null);
  const transcript = useMemo(() => session?.transcript ?? [], [session?.transcript]);

  useEffect(() => {
    if (!session && !summary) {
      window.localStorage.removeItem(storageKey);
      return;
    }

    window.localStorage.setItem(storageKey, JSON.stringify({ session, summary }));
  }, [session, summary, storageKey]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [transcript, open, summary]);

  const canSend = message.trim().length > 0 && !messagePending;
  const canTriggerActions = Boolean(summary) && consent && !actionPending;

  const summaryCards = useMemo(() => {
    if (!summary) return [];
    return [
      {
        label: copy.budget,
        value:
          summary.budget_range.max > 0
            ? `${formatCurrency(summary.budget_range.min)} - ${formatCurrency(summary.budget_range.max)} CHF`
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
  }, [summary, copy.budget, copy.days, copy.roles]);

  const handleSend = () => {
    if (!canSend) return;
    const nextMessage = message.trim();
    setMessage("");
    setStatusMessage("");

    startMessageTransition(async () => {
      try {
        const result = await postJson<AssistantMessageResponse>("/api/assistant/message", {
          message: nextMessage,
          locale,
          session: session ? assistantSessionSchema.parse(session) : undefined,
        });

        setSession(result.session);
        setSummary(result.summary);
        setProgress(result.progress);

        if (result.session.collected.email) {
          setEmail(result.session.collected.email);
        }
        if (result.session.collected.name) {
          setName(result.session.collected.name);
        }
      } catch (error) {
        setStatusMessage(error instanceof Error ? error.message : "Erreur reseau");
      }
    });
  };

  const handleAction = (mode: "email" | "lead" | "glpi") => {
    if (!summary) return;
    setStatusMessage("");

    startActionTransition(async () => {
      try {
        const body = {
          locale,
          consent,
          email: email || undefined,
          name: name || undefined,
          summary,
          transcript,
        };

        const url =
          mode === "email" ? "/api/assistant/email" : mode === "glpi" ? "/api/assistant/glpi" : "/api/assistant/lead";

        const result = await postJson<{ message?: string }>(url, body);
        setStatusMessage(result.message || "OK");
      } catch (error) {
        setStatusMessage(error instanceof Error ? error.message : "Erreur reseau");
      }
    });
  };

  return (
    <div className="pointer-events-none fixed inset-x-4 bottom-4 z-[80] flex justify-end sm:inset-x-6 sm:bottom-6">
      <div className="pointer-events-auto w-full max-w-[24rem]">
        {open ? (
          <div className="overflow-hidden rounded-[2rem] border border-white/12 bg-[linear-gradient(180deg,rgba(10,9,8,0.98),rgba(8,16,28,0.98))] shadow-[0_30px_90px_rgba(0,0,0,0.55)] backdrop-blur-2xl">
            <div className="border-b border-white/8 bg-[radial-gradient(circle_at_top_left,rgba(214,179,106,0.24),transparent_40%),radial-gradient(circle_at_top_right,rgba(127,184,199,0.22),transparent_38%)] p-5">
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <p className="text-[0.72rem] uppercase tracking-[0.35em] text-white/55">{copy.progress}</p>
                  <h3 className="mt-2 text-xl font-semibold text-white">{copy.title}</h3>
                  <p className="mt-2 max-w-xs text-sm text-white/68">{copy.subtitle}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-white/12 px-3 py-2 text-xs font-medium text-white/70 transition hover:border-white/25 hover:text-white"
                >
                  {copy.close}
                </button>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/25 p-3">
                <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.28em] text-white/50">
                  <span>{progress.label}</span>
                  <span>
                    {progress.current}/{progress.total}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-white/8">
                  <div
                    className="h-full rounded-full bg-[linear-gradient(90deg,rgba(214,179,106,0.95),rgba(127,184,199,0.95))]"
                    style={{ width: `${Math.min(100, (progress.current / progress.total) * 100)}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="max-h-[28rem] space-y-4 overflow-y-auto px-5 py-4">
              {transcript.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-white/12 bg-white/[0.03] p-4 text-sm text-white/65">
                  {copy.helper}
                </div>
              ) : null}

              {transcript.map((item, index) => (
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
              ))}

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

                  <div className="mt-4 grid gap-2">
                    <input
                      type="text"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder={copy.name}
                      className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder={copy.email}
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
                  type="text"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder={copy.placeholder}
                  className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-white/35"
                />
                <button
                  type="button"
                  onClick={handleSend}
                  disabled={!canSend}
                  className="inline-flex h-[3.2rem] w-[3.2rem] items-center justify-center rounded-2xl bg-white text-[#11131b] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label={copy.send}
                >
                  <FiSend />
                </button>
              </div>
              <div className="mt-3 flex items-center justify-between gap-3 text-xs text-white/42">
                <span>{copy.helper}</span>
                <Link href={`/${locale === "fr" ? "" : locale}/contact`.replace("//", "/")} className="inline-flex items-center gap-1 text-white/62 hover:text-white">
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
            onClick={() => setOpen(true)}
            className="group ml-auto flex items-center gap-3 rounded-full border border-white/10 bg-[linear-gradient(135deg,rgba(9,9,8,0.92),rgba(10,23,38,0.92))] px-4 py-3 text-left shadow-[0_20px_60px_rgba(0,0,0,0.45)] transition hover:border-[#d6b36a]/40"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[linear-gradient(135deg,rgba(214,179,106,0.92),rgba(127,184,199,0.92))] text-[#11131b] shadow-[0_10px_30px_rgba(214,179,106,0.28)]">
              <FiMessageSquare className="text-lg" />
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
