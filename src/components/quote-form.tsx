"use client";

import { jsPDF } from "jspdf";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { TurnstileWidget, type TurnstileWidgetHandle } from "@/components/turnstile-widget";
import { trackEvent } from "@/lib/analytics";
import { getUtm } from "@/lib/utm";
import { useLocale } from "@/lib/locale";
import { drawKahDigitalPdfLogo } from "@/lib/pdf-branding";
import { countryDialCodesSorted } from "@/data/country-dial-codes";

type QuotePayload = {
  name: string;
  email: string;
  phone?: string;
  projectType: string;
  goal: string;
  pages: string[];
  aiModules?: string[];
  inspirations?: string;
  budget: string;
  timeline: string;
  message?: string;
  clientType?: "entreprise" | "particulier";
  companyName?: string;
  mobilePlatforms?: string[];
  mobileFeatures?: string[];
  storeSupport?: string;
  techPreferences?: string;
  projectFocus?: "web" | "mobile";
  website?: string;
  turnstileToken?: string;
};

export function QuoteForm() {
  const router = useRouter();
  const { isEnglish, prefix } = useLocale();
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
  const formRef = useRef<HTMLFormElement | null>(null);
  const widgetRef = useRef<TurnstileWidgetHandle | null>(null);
  const pendingFormRef = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaReset, setCaptchaReset] = useState(0);
  const [captchaError, setCaptchaError] = useState("");

  const pageOptions = isEnglish
    ? ["Home", "About", "Services", "Portfolio", "Blog", "Contact"]
    : ["Accueil", "A propos", "Services", "Portfolio", "Blog", "Contact"];

  const aiModuleOptions = isEnglish
    ? [
        "Client automation layer",
        "Industry chatbot & support",
        "Lead qualification & scoring",
        "AI content & assets pack",
        "Custom AI micro-tool",
      ]
    : [
        "Automatisation relation client",
        "Chatbot metier & support",
        "Qualification & lead scoring",
        "Contenu & assets IA",
        "Micro-outil IA sur-mesure",
      ];

  const budgetOptions = isEnglish
    ? ["To be discussed", "Limited budget", "Comfortable budget", "Investment planned", "I need advice"]
    : ["À discuter", "Budget limité", "Budget confortable", "Investissement prévu", "J'ai besoin de conseil"];

  const timelineOptions = isEnglish
    ? ["ASAP", "2-4 weeks", "1-2 months", "3 months +"]
    : ["ASAP", "2-4 semaines", "1-2 mois", "3 mois et +"];

  const trustItems = isEnglish
    ? [
        { title: "Reply in 24h", detail: "Scope + timeline + next step" },
        { title: "No commitment", detail: "Free estimate" },
        { title: "Confidential", detail: "NDA on request" },
      ]
    : [
        { title: "Reponse 24h", detail: "Périmètre + planning + prochaine étape" },
        { title: "Sans engagement", detail: "Devis gratuit" },
        { title: "Confidentiel", detail: "NDA sur demande" },
      ];

  const exportPdf = () => {
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    const selectedPages = formData.getAll("pages").map((value) => String(value)).filter(Boolean);
    const selectedAiModules = formData.getAll("aiModules").map((value) => String(value)).filter(Boolean);
    const phoneCountry = String(formData.get("phoneCountry") ?? "").trim();
    const phoneRaw = String(formData.get("phone") ?? "").trim();
    const phoneValue = phoneRaw ? `${phoneCountry} ${phoneRaw}`.trim() : "";
    const values: Array<[string, string]> = [
      [isEnglish ? "Client type" : "Type de client", String(formData.get("clientType") ?? "")],
      [isEnglish ? "Company name" : "Nom de société", String(formData.get("companyName") ?? "")],
      [isEnglish ? "Full name" : "Nom complet", String(formData.get("name") ?? "")],
      ["Email", String(formData.get("email") ?? "")],
      [isEnglish ? "Phone" : "Téléphone", phoneValue],
      [isEnglish ? "Project type" : "Type de projet", String(formData.get("projectType") ?? "")],
      [isEnglish ? "Goal" : "Objectif", String(formData.get("goal") ?? "")],
      ["Pages", selectedPages.join(", ")],
      [isEnglish ? "AI modules" : "Modules IA", selectedAiModules.join(", ")],
      [isEnglish ? "Inspirations" : "Inspirations", String(formData.get("inspirations") ?? "")],
      ["Budget", String(formData.get("budget") ?? "")],
      [isEnglish ? "Timeline" : "Délai", String(formData.get("timeline") ?? "")],
      [isEnglish ? "Message" : "Message", String(formData.get("message") ?? "")],
    ];

    const doc = new jsPDF();
    drawKahDigitalPdfLogo(doc, 16, 10);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text(isEnglish ? "Quote request" : "Demande de devis", 16, 42);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(
      isEnglish ? "Generated from the online form" : "Généré depuis le formulaire en ligne",
      16,
      49
    );
    doc.setDrawColor(210);
    doc.line(16, 53, 194, 53);

    let y = 61;
    doc.setFontSize(11);
    values.forEach(([label, value]) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
      doc.setFont("helvetica", "bold");
      doc.text(label || "-", 16, y);
      doc.setFont("helvetica", "normal");
      const textValue = value && value.trim() ? value.trim() : "-";
      const lines = doc.splitTextToSize(textValue, 170);
      y += 6;
      lines.forEach((line: string) => {
        if (y > 280) {
          doc.addPage();
          y = 20;
        }
        doc.text(line, 16, y);
        y += 6;
      });
      y += 4;
    });

    doc.save(isEnglish ? "kah-digital-quote.pdf" : "devis-kah-digital.pdf");
  };

  const submitQuoteRequest = useCallback(async (formElement: HTMLFormElement, token: string) => {
    const formData = new FormData(formElement);

    const rawClientType = String(formData.get("clientType") ?? "").trim();
    const selectedPages = formData.getAll("pages").map((value) => String(value));
    const selectedAiModules = formData.getAll("aiModules").map((value) => String(value)).filter(Boolean);
    const website = String(formData.get("website") ?? "").trim();
    const phoneCountry = String(formData.get("phoneCountry") ?? "").trim();
    const phoneRaw = String(formData.get("phone") ?? "").trim();
    const phoneValue = phoneRaw ? `${phoneCountry} ${phoneRaw}`.trim() : "";

    if (selectedPages.length === 0) {
      setServerMessage(
        isEnglish ? "Select at least one page." : "Sélectionne au moins une page pour ton site."
      );
      setStatus("error");
      return;
    }

    // Captcha désactivé — widget non chargé sur kah-digital.ch (domaine non whitelisté Cloudflare)

    const payload: QuotePayload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      phone: phoneValue || undefined,
      clientType: rawClientType === "entreprise" ? "entreprise" : rawClientType === "particulier" ? "particulier" : undefined,
      companyName: String(formData.get("companyName") ?? "").trim() || undefined,
      projectType: String(formData.get("projectType") ?? (isEnglish ? "Showcase website" : "Site vitrine")),
      goal: String(formData.get("goal") ?? ""),
      pages: selectedPages,
      aiModules: selectedAiModules,
      inspirations: String(formData.get("inspirations") ?? "").trim() || undefined,
      budget: String(formData.get("budget") ?? ""),
      timeline: String(formData.get("timeline") ?? ""),
      message: String(formData.get("message") ?? "").trim() || undefined,
      mobilePlatforms: [],
      mobileFeatures: [],
      storeSupport: undefined,
      techPreferences: undefined,
      projectFocus: "web",
      website: website || undefined,
      turnstileToken: token,
      ...getUtm(),
    };

    setStatus("loading");
    setServerMessage("");

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorPayload = await response.json().catch(() => null);
        const fallbackMessage = isEnglish
          ? "Unable to send the request. Please try again."
          : "Impossible d'envoyer la demande. Réessaie dans un instant.";
        const errorMessage = errorPayload?.error ?? fallbackMessage;
        setCaptchaToken("");
        setCaptchaReset((prev) => prev + 1);
        setStatus("error");
        setServerMessage(errorMessage);
        return;
      }

      setStatus("success");
      setServerMessage(
        isEnglish ? "Thanks, request sent. Redirecting..." : "Merci, demande envoyée. Redirection en cours..."
      );
      trackEvent("generate_lead", { form_name: "devis", destination: "devis" });
      formElement.reset();
      setCaptchaToken("");
      setCaptchaReset((prev) => prev + 1);
      window.setTimeout(() => {
        router.push(prefix ? `${prefix}/merci` : "/merci");
      }, 800);
    } catch (error) {
      console.error(error);
      setStatus("error");
      setServerMessage(
        isEnglish ? "Unable to send the request. Please try again." : "Impossible d'envoyer la demande. Réessaie dans un instant."
      );
    }
  }, [isEnglish, prefix, router, siteKey]);

  const handleCaptchaVerify = useCallback((token: string) => {
    setCaptchaToken(token);
    setCaptchaError("");
    const pendingForm = pendingFormRef.current;
    if (pendingForm) {
      pendingFormRef.current = null;
      void submitQuoteRequest(pendingForm, token);
    }
  }, [submitQuoteRequest]);
  const handleCaptchaExpire = useCallback(() => {
    setCaptchaToken("");
    pendingFormRef.current = null;
  }, []);
  const handleCaptchaError = useCallback(() => {
    setCaptchaToken("");
    setCaptchaError(
      isEnglish ? "Verification failed. Try again." : "Vérification impossible. Réessaie."
    );
    pendingFormRef.current = null;
  }, [isEnglish]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;

    const formData = new FormData(formElement);
    const selectedPages = formData.getAll("pages").map((value) => String(value));

    if (selectedPages.length === 0) {
      setServerMessage(
        isEnglish ? "Select at least one page." : "Sélectionne au moins une page pour ton site."
      );
      setStatus("error");
      return;
    }

    void submitQuoteRequest(formElement, captchaToken);
  }

  const isSubmitting = status === "loading";

  return (
    <form
      ref={formRef}
      className="quote-form premium-card relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-6 text-white shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur sm:p-8"
      onSubmit={handleSubmit}
    >
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl" />
      <input
        type="text"
        name="website"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        defaultValue=""
      />
      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        {trustItems.map((item) => (
          <div key={item.title} className="rounded-2xl border border-white/10 bg-black/30 p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">{item.title}</p>
            <p className="mt-2 text-sm text-white/70">{item.detail}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="clientType" className="text-sm text-white/70">
            {isEnglish ? "You are *" : "Tu es *"}
          </label>
          <select
            id="clientType"
            name="clientType"
            className="w-full rounded-xl border border-white/12 bg-slate-950/60 px-4 py-3 text-white [color-scheme:dark] transition-all duration-150 focus:border-sky-400/60 focus:bg-slate-950/80 focus:outline-none focus:ring-2 focus:ring-sky-500/20 hover:border-white/20"
            required
            defaultValue=""
          >
            <option value="" disabled>{isEnglish ? "Select" : "Choisir"}</option>
            <option value="entreprise">{isEnglish ? "Company" : "Entreprise"}</option>
            <option value="particulier">{isEnglish ? "Individual" : "Particulier"}</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="companyName" className="text-sm text-white/70">
            {isEnglish ? "Company name (if company)" : "Nom de société (si entreprise)"}
          </label>
          <input
            id="companyName"
            name="companyName"
            className="w-full rounded-xl border border-white/12 bg-slate-950/60 px-4 py-3 text-white placeholder:text-white/40 transition-all duration-150 focus:border-sky-400/60 focus:bg-slate-950/80 focus:outline-none focus:ring-2 focus:ring-sky-500/20 hover:border-white/20"
            placeholder={isEnglish ? "e.g. Kah-Digital LLC" : "Ex : Kah-Digital SAS"}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm text-white/70">{isEnglish ? "Full name *" : "Nom complet *"}</label>
          <input
            id="name"
            name="name"
            required
            className="w-full rounded-xl border border-white/12 bg-slate-950/60 px-4 py-3 text-white placeholder:text-white/40 transition-all duration-150 focus:border-sky-400/60 focus:bg-slate-950/80 focus:outline-none focus:ring-2 focus:ring-sky-500/20 hover:border-white/20"
            placeholder={isEnglish ? "e.g. Alex Martin" : "Ex : Alex Martin"}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm text-white/70">Email *</label>
          <input
            id="email"
            type="email"
            name="email"
            required
            className="w-full rounded-xl border border-white/12 bg-slate-950/60 px-4 py-3 text-white placeholder:text-white/40 transition-all duration-150 focus:border-sky-400/60 focus:bg-slate-950/80 focus:outline-none focus:ring-2 focus:ring-sky-500/20 hover:border-white/20"
            placeholder="contact@company.com"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="text-sm text-white/70">
            {isEnglish ? "Phone (optional)" : "Téléphone (optionnel)"}
          </label>
          <div className="flex flex-wrap gap-3">
            <select
              id="phoneCountry"
              name="phoneCountry"
              defaultValue="+41"
              className="min-w-[170px] rounded-xl border border-white/12 bg-slate-950/60 px-4 py-3 text-white [color-scheme:dark] transition-all duration-150 focus:border-sky-400/60 focus:bg-slate-950/80 focus:outline-none focus:ring-2 focus:ring-sky-500/20 hover:border-white/20"
            >
              {countryDialCodesSorted.map((entry) => (
                <option key={entry.iso} value={entry.code}>
                  {entry.country} ({entry.code})
                </option>
              ))}
            </select>
            <input
              id="phone"
              name="phone"
              inputMode="tel"
              className="min-w-[200px] flex-1 rounded-xl border border-white/12 bg-slate-950/60 px-4 py-3 text-white placeholder:text-white/40 transition-all duration-150 focus:border-sky-400/60 focus:bg-slate-950/80 focus:outline-none focus:ring-2 focus:ring-sky-500/20 hover:border-white/20"
              placeholder="00 00 00 00 00"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="projectType" className="text-sm text-white/70">{isEnglish ? "Project type *" : "Type de projet *"}</label>
          <select
            id="projectType"
            name="projectType"
            required
            className="w-full rounded-xl border border-white/12 bg-slate-950/60 px-4 py-3 text-white [color-scheme:dark] transition-all duration-150 focus:border-sky-400/60 focus:bg-slate-950/80 focus:outline-none focus:ring-2 focus:ring-sky-500/20 hover:border-white/20"
          >
            <option value={isEnglish ? "Showcase website" : "Site vitrine"}>{isEnglish ? "Showcase website" : "Site vitrine"}</option>
            <option value="E-commerce">{isEnglish ? "E-commerce" : "E-commerce"}</option>
            <option value={isEnglish ? "Web application" : "Application web"}>{isEnglish ? "Web application" : "Application web"}</option>
            <option value={isEnglish ? "Other" : "Autre"}>{isEnglish ? "Other" : "Autre"}</option>
          </select>
        </div>
        <div className="md:col-span-2 flex flex-col gap-2">
          <label htmlFor="goal" className="text-sm text-white/70">{isEnglish ? "Project goal *" : "Objectif du site *"}</label>
          <textarea
            id="goal"
            name="goal"
            required
            rows={3}
            className="w-full rounded-xl border border-white/12 bg-slate-950/60 px-4 py-3 text-white placeholder:text-white/40 transition-all duration-150 focus:border-sky-400/60 focus:bg-slate-950/80 focus:outline-none focus:ring-2 focus:ring-sky-500/20 hover:border-white/20"
            placeholder={
              isEnglish
                ? "e.g. Present the company and generate qualified leads."
                : "Ex : Présenter l'agence et générer des demandes qualifiées."
            }
          />
        </div>
        <div className="md:col-span-2 flex flex-col gap-2">
          <p className="text-sm text-white/70">{isEnglish ? "Pages needed *" : "Pages souhaitees *"}</p>
          <div className="grid gap-3 md:grid-cols-3">
            {pageOptions.map((page) => (
              <label key={page} className="flex items-center gap-2 text-sm text-white/80">
                <input
                  type="checkbox"
                  name="pages"
                  value={page}
                  className="h-4 w-4 rounded border-white/20 bg-transparent accent-sky-500 focus:ring-sky-500/60"
                />
                {page}
              </label>
            ))}
          </div>
        </div>
        <div className="md:col-span-2 flex flex-col gap-2">
          <p className="text-sm text-white/70">{isEnglish ? "AI modules (optional)" : "Modules IA (optionnel)"}</p>
          <div className="grid gap-3 md:grid-cols-2">
            {aiModuleOptions.map((module) => (
              <label key={module} className="flex items-center gap-2 text-sm text-white/80">
                <input
                  type="checkbox"
                  name="aiModules"
                  value={module}
                  className="h-4 w-4 rounded border-white/20 bg-transparent accent-sky-500 focus:ring-sky-500/60"
                />
                {module}
              </label>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="inspirations" className="text-sm text-white/70">
            {isEnglish ? "Inspirations (links)" : "Inspirations (liens)"}
          </label>
          <input
            id="inspirations"
            name="inspirations"
            className="w-full rounded-xl border border-white/12 bg-slate-950/60 px-4 py-3 text-white placeholder:text-white/40 transition-all duration-150 focus:border-sky-400/60 focus:bg-slate-950/80 focus:outline-none focus:ring-2 focus:ring-sky-500/20 hover:border-white/20"
            placeholder="https://site-you-like.com"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="budget" className="text-sm text-white/70">Budget *</label>
          <select
            id="budget"
            name="budget"
            required
            className="w-full rounded-xl border border-white/12 bg-slate-950/60 px-4 py-3 text-white [color-scheme:dark] transition-all duration-150 focus:border-sky-400/60 focus:bg-slate-950/80 focus:outline-none focus:ring-2 focus:ring-sky-500/20 hover:border-white/20"
          >
            <option value="" disabled>{isEnglish ? "Select" : "Sélectionne"}</option>
            {budgetOptions.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="timeline" className="text-sm text-white/70">{isEnglish ? "Timeline *" : "Délai *"}</label>
          <select
            id="timeline"
            name="timeline"
            required
            className="w-full rounded-xl border border-white/12 bg-slate-950/60 px-4 py-3 text-white [color-scheme:dark] transition-all duration-150 focus:border-sky-400/60 focus:bg-slate-950/80 focus:outline-none focus:ring-2 focus:ring-sky-500/20 hover:border-white/20"
          >
            <option value="" disabled>{isEnglish ? "Choose" : "Choisis"}</option>
            {timelineOptions.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2 flex flex-col gap-2">
          <label htmlFor="message" className="text-sm text-white/70">
            {isEnglish ? "Your vision (free text)" : "Ta vision (message libre)"}
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="w-full rounded-xl border border-white/12 bg-slate-950/60 px-4 py-3 text-white placeholder:text-white/40 transition-all duration-150 focus:border-sky-400/60 focus:bg-slate-950/80 focus:outline-none focus:ring-2 focus:ring-sky-500/20 hover:border-white/20"
            placeholder={
              isEnglish
                ? "Share your universe, what matters most..."
                : "Parle-nous de ton univers, de ce qui compte vraiment..."
            }
          />
        </div>
      </div>
      <div className="mt-6 space-y-2 text-sm text-white/70">
        <p>{isEnglish ? "Anti-spam verification" : "Vérification anti-spam"}</p>
        {siteKey ? (
          <div className="flex min-h-[80px] items-center rounded-xl border border-white/10 bg-slate-950/50 p-3">
            <TurnstileWidget
              ref={widgetRef}
              siteKey={siteKey}
              onVerify={handleCaptchaVerify}
              onExpire={handleCaptchaExpire}
              onError={handleCaptchaError}
              resetKey={String(captchaReset)}
            />
          </div>
        ) : (
          <p className="text-amber-200">{isEnglish ? "Captcha not configured." : "Captcha non configuré."}</p>
        )}
        {captchaError && <p className="text-rose-200">{captchaError}</p>}
      </div>
      <div className="mt-6 flex flex-col gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-400 to-blue-500 px-6 py-3.5 font-bold text-slate-950 shadow-lg shadow-sky-500/25 transition-all hover:gap-3 hover:shadow-sky-500/40 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:gap-2"
        >
          {isSubmitting ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950/30 border-t-slate-950" />
              {isEnglish ? "Sending..." : "Envoi en cours..."}
            </>
          ) : isEnglish ? "Send my request" : "Envoyer ma demande"}
        </button>
        <button
          type="button"
          onClick={exportPdf}
          className="inline-flex w-full items-center justify-center rounded-full border border-white/15 px-6 py-3 text-white/80 transition hover:border-white/30 hover:text-white"
        >
          {isEnglish ? "Export to PDF" : "Exporter en PDF"}
        </button>
        <p className="text-xs text-white/60">
          {isEnglish
            ? "Free estimate, reply within 24h. No commitment."
            : "Devis gratuit, réponse sous 24h. Aucun engagement."}
        </p>
        <p className="text-xs text-white/55">
          {isEnglish
            ? "The proposal is adjusted to the real scope, your priorities and the level of support you need."
            : "La proposition est ajustée au périmètre réel, à vos priorités et au niveau d'accompagnement souhaité."}
        </p>
        {serverMessage && (
          <p
            role="status"
            className={`rounded-xl border px-4 py-3 text-sm ${
              status === "error"
                ? "border-rose-500/25 bg-rose-500/10 text-rose-200"
                : "border-emerald-500/25 bg-emerald-500/10 text-emerald-200"
            }`}
          >
            {serverMessage}
          </p>
        )}
      </div>
    </form>
  );
}
