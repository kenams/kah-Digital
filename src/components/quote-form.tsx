"use client";

import { jsPDF } from "jspdf";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { TurnstileWidget, type TurnstileWidgetHandle } from "@/components/turnstile-widget";
import { trackEvent } from "@/lib/analytics";
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
  const isGerman = false;
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
    : isGerman
      ? ["Start", "Über uns", "Leistungen", "Projekte", "Blog", "Kontakt"]
      : ["Accueil", "A propos", "Services", "Portfolio", "Blog", "Contact"];
  const aiModuleOptions = isEnglish
    ? [
        "Client automation layer",
        "Industry chatbot & support",
        "Lead qualification & scoring",
        "AI content & assets pack",
        "Custom AI micro-tool",
      ]
    : isGerman
      ? [
          "Kundenautomatisierung",
          "Branchen-Chatbot & Support",
          "Lead-Qualifizierung & Scoring",
          "KI-Inhalte & Assets",
          "Individuelles KI-Mikro-Tool",
        ]
    : [
        "Automatisation relation client",
        "Chatbot metier & support",
        "Qualification & lead scoring",
        "Contenu & assets IA",
        "Micro-outil IA sur-mesure",
      ];

  const budgetOptions = isEnglish
    ? ["Under € 2,000", "€ 2,000 - 6,000", "€ 6,000 - 12,000", "€ 12,000 +"]
    : isGerman
      ? ["Unter € 2.000", "€ 2.000 – 6.000", "€ 6.000 – 12.000", "€ 12.000 +"]
      : ["Moins de 2 000 €", "2 000 € - 6 000 €", "6 000 € - 12 000 €", "12 000 € +"];

  const timelineOptions = isEnglish
    ? ["ASAP", "2-4 weeks", "1-2 months", "3 months +"]
    : isGerman
      ? ["So schnell wie möglich", "2–4 Wochen", "1–2 Monate", "3 Monate +"]
      : ["ASAP", "2-4 semaines", "1-2 mois", "3 mois et +"];
  const trustItems = isEnglish
    ? [
        { title: "Reply in 24h", detail: "Clear budget + timeline" },
        { title: "No commitment", detail: "Free estimate" },
        { title: "Confidential", detail: "NDA on request" },
      ]
    : isGerman
      ? [
          { title: "Antwort in 24h", detail: "Budget + Zeitplan" },
          { title: "Unverbindlich", detail: "Kostenlose Offerte" },
          { title: "Vertraulich", detail: "NDA auf Wunsch" },
        ]
      : [
        { title: "Reponse 24h", detail: "Budget + planning" },
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
      [isEnglish ? "Client type" : isGerman ? "Kundentyp" : "Type de client", String(formData.get("clientType") ?? "")],
      [isEnglish ? "Company name" : isGerman ? "Firmenname" : "Nom de société", String(formData.get("companyName") ?? "")],
      [isEnglish ? "Full name" : isGerman ? "Vollständiger Name" : "Nom complet", String(formData.get("name") ?? "")],
      ["Email", String(formData.get("email") ?? "")],
      [isEnglish ? "Phone" : isGerman ? "Telefon" : "Téléphone", phoneValue],
      [isEnglish ? "Project type" : isGerman ? "Projekttyp" : "Type de projet", String(formData.get("projectType") ?? "")],
      [isEnglish ? "Goal" : isGerman ? "Ziel" : "Objectif", String(formData.get("goal") ?? "")],
      [isEnglish ? "Pages" : "Pages", selectedPages.join(", ")],
      [isEnglish ? "AI modules" : isGerman ? "AI-Module" : "Modules IA", selectedAiModules.join(", ")],
      [isEnglish ? "Inspirations" : isGerman ? "Referenzen" : "Inspirations", String(formData.get("inspirations") ?? "")],
      [isEnglish ? "Budget" : "Budget", String(formData.get("budget") ?? "")],
      [isEnglish ? "Timeline" : isGerman ? "Zeitplan" : "Délai", String(formData.get("timeline") ?? "")],
      [isEnglish ? "Message" : isGerman ? "Nachricht" : "Message", String(formData.get("message") ?? "")],
    ];

    const doc = new jsPDF();
    drawKahDigitalPdfLogo(doc, 16, 10);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text(isEnglish ? "Quote request" : isGerman ? "Projektanfrage" : "Demande de devis", 16, 42);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(
      isEnglish ? "Generated from the online form" : isGerman ? "Erstellt aus dem Online-Formular" : "Généré depuis le formulaire en ligne",
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

    doc.save(isEnglish ? "kah-digital-quote.pdf" : isGerman ? "kah-digital-offerte.pdf" : "devis-kah-digital.pdf");
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
        isEnglish ? "Select at least one page." : isGerman ? "Wähle mindestens eine Seite für deine Website." : "Sélectionne au moins une page pour ton site."
      );
      setStatus("error");
      return;
    }

    if (!siteKey) {
      setServerMessage(
        isEnglish ? "Captcha not configured. Contact us directly." : isGerman ? "Captcha nicht konfiguriert. Bitte kontaktiere uns direkt." : "Captcha non configuré. Contacte-nous directement."
      );
      setStatus("error");
      return;
    }

    if (!token) {
      setServerMessage(
        isEnglish ? "Validate the captcha before sending." : isGerman ? "Bitte bestätige das Captcha vor dem Senden." : "Valide le captcha avant d'envoyer."
      );
      setStatus("error");
      return;
    }

    const payload: QuotePayload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      phone: phoneValue || undefined,
      clientType: rawClientType === "entreprise" ? "entreprise" : rawClientType === "particulier" ? "particulier" : undefined,
      companyName: String(formData.get("companyName") ?? "").trim() || undefined,
      projectType: String(formData.get("projectType") ?? (isEnglish ? "Showcase website" : isGerman ? "Unternehmenswebsite" : "Site vitrine")),
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
          : isGerman
            ? "Die Anfrage konnte nicht gesendet werden. Bitte gleich erneut versuchen."
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
        isEnglish ? "Thanks, request sent. Redirecting..." : isGerman ? "Danke, Anfrage gesendet. Weiterleitung läuft..." : "Merci, demande envoyée. Redirection en cours..."
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
        isEnglish ? "Unable to send the request. Please try again." : isGerman ? "Die Anfrage konnte nicht gesendet werden. Bitte gleich erneut versuchen." : "Impossible d'envoyer la demande. Réessaie dans un instant."
      );
    }
  }, [isEnglish, isGerman, prefix, router, siteKey]);

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
      isEnglish ? "Verification failed. Try again." : isGerman ? "Verifizierung fehlgeschlagen. Bitte erneut versuchen." : "Vérification impossible. Réessaie."
    );
    pendingFormRef.current = null;
  }, [isEnglish, isGerman]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;

    const formData = new FormData(formElement);
    const selectedPages = formData.getAll("pages").map((value) => String(value));

    if (selectedPages.length === 0) {
      setServerMessage(
        isEnglish ? "Select at least one page." : isGerman ? "Wähle mindestens eine Seite für deine Website." : "Sélectionne au moins une page pour ton site."
      );
      setStatus("error");
      return;
    }

    if (!siteKey) {
      setServerMessage(
        isEnglish ? "Captcha not configured. Contact us directly." : isGerman ? "Captcha nicht konfiguriert. Bitte kontaktiere uns direkt." : "Captcha non configuré. Contacte-nous directement."
      );
      setStatus("error");
      return;
    }

    if (!captchaToken) {
      pendingFormRef.current = formElement;
      setServerMessage("");
      setCaptchaError("");
      widgetRef.current?.execute();
      return;
    }

    void submitQuoteRequest(formElement, captchaToken);
  }

  const isSubmitting = status === "loading";

  return (
    <form
      ref={formRef}
      className="quote-form premium-card rounded-3xl border border-white/10 bg-white/5 p-6 text-white shadow-2xl shadow-black/30 backdrop-blur"
      onSubmit={handleSubmit}
    >
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
            {isEnglish ? "You are *" : isGerman ? "Du bist *" : "Tu es *"}
          </label>
          <select
            id="clientType"
            name="clientType"
            className="rounded-2xl border border-white/10 bg-gray-900 px-4 py-3 text-white [color-scheme:dark] focus:border-white/40 focus:outline-none"
            required
            defaultValue=""
          >
            <option value="" disabled>{isEnglish ? "Select" : isGerman ? "Wählen" : "Choisir"}</option>
            <option value="entreprise">{isEnglish ? "Company" : isGerman ? "Unternehmen" : "Entreprise"}</option>
            <option value="particulier">{isEnglish ? "Individual" : isGerman ? "Privatperson" : "Particulier"}</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="companyName" className="text-sm text-white/70">
            {isEnglish ? "Company name (if company)" : isGerman ? "Firmenname (falls Unternehmen)" : "Nom de société (si entreprise)"}
          </label>
          <input
            id="companyName"
            name="companyName"
            className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/60 focus:outline-none"
            placeholder={isEnglish ? "e.g. Kah-Digital LLC" : isGerman ? "Bsp.: Kah-Digital GmbH" : "Ex : Kah-Digital SAS"}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm text-white/70">{isEnglish ? "Full name *" : isGerman ? "Vollständiger Name *" : "Nom complet *"}</label>
          <input
            id="name"
            name="name"
            required
            className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/60 focus:outline-none"
            placeholder={isEnglish ? "e.g. Alex Martin" : isGerman ? "z. B. Alex Martin" : "Ex : Alex Martin"}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm text-white/70">Email *</label>
          <input
            id="email"
            type="email"
            name="email"
            required
            className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/60 focus:outline-none"
            placeholder="contact@company.com"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="text-sm text-white/70">
            {isEnglish ? "Phone (optional)" : isGerman ? "Telefon (optional)" : "Téléphone (optionnel)"}
          </label>
          <div className="flex flex-wrap gap-3">
            <select
              id="phoneCountry"
              name="phoneCountry"
              defaultValue="+41"
              className="min-w-[170px] rounded-2xl border border-white/10 bg-gray-900 px-3 py-3 text-white [color-scheme:dark] focus:border-white/40 focus:outline-none"
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
              className="min-w-[200px] flex-1 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/60 focus:outline-none"
              placeholder="00 00 00 00 00"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="projectType" className="text-sm text-white/70">{isEnglish ? "Project type *" : isGerman ? "Projekttyp *" : "Type de projet *"}</label>
          <select
            id="projectType"
            name="projectType"
            required
            className="rounded-2xl border border-white/10 bg-gray-900 px-4 py-3 text-white [color-scheme:dark] focus:border-white/40 focus:outline-none"
          >
            <option value={isEnglish ? "Showcase website" : isGerman ? "Unternehmenswebsite" : "Site vitrine"}>{isEnglish ? "Showcase website" : isGerman ? "Unternehmenswebsite" : "Site vitrine"}</option>
            <option value="E-commerce">{isEnglish ? "E-commerce" : isGerman ? "E-Commerce" : "E-commerce"}</option>
            <option value={isEnglish ? "Web application" : isGerman ? "Web-Anwendung" : "Application web"}>{isEnglish ? "Web application" : isGerman ? "Web-Anwendung" : "Application web"}</option>
            <option value={isEnglish ? "Other" : isGerman ? "Sonstiges" : "Autre"}>{isEnglish ? "Other" : isGerman ? "Sonstiges" : "Autre"}</option>
          </select>
        </div>
        <div className="md:col-span-2 flex flex-col gap-2">
          <label htmlFor="goal" className="text-sm text-white/70">{isEnglish ? "Project goal *" : isGerman ? "Projektziel *" : "Objectif du site *"}</label>
          <textarea
            id="goal"
            name="goal"
            required
            rows={3}
            className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/60 focus:outline-none"
            placeholder={
              isEnglish
                ? "e.g. Present the company and generate qualified leads."
                : isGerman
                  ? "z. B. Unternehmen klar praesentieren und qualifizierte Anfragen gewinnen."
                  : "Ex : Présenter l'agence et générer des demandes qualifiées."
            }
          />
        </div>
        <div className="md:col-span-2 flex flex-col gap-2">
          <p className="text-sm text-white/70">{isEnglish ? "Pages needed *" : isGerman ? "Gewuenschte Seiten *" : "Pages souhaitees *"}</p>
          <div className="grid gap-3 md:grid-cols-3">
            {pageOptions.map((page) => (
              <label key={page} className="flex items-center gap-2 text-sm text-white/80">
                <input
                  type="checkbox"
                  name="pages"
                  value={page}
                  className="h-4 w-4 rounded border-white/20 bg-transparent text-black focus:ring-white/60"
                />
                {page}
              </label>
            ))}
          </div>
        </div>
        <div className="md:col-span-2 flex flex-col gap-2">
          <p className="text-sm text-white/70">{isEnglish ? "AI modules (optional)" : isGerman ? "AI-Module (optional)" : "Modules IA (optionnel)"}</p>
          <div className="grid gap-3 md:grid-cols-2">
            {aiModuleOptions.map((module) => (
              <label key={module} className="flex items-center gap-2 text-sm text-white/80">
                <input
                  type="checkbox"
                  name="aiModules"
                  value={module}
                  className="h-4 w-4 rounded border-white/20 bg-transparent text-black focus:ring-white/60"
                />
                {module}
              </label>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="inspirations" className="text-sm text-white/70">
            {isEnglish ? "Inspirations (links)" : isGerman ? "Referenzen (Links)" : "Inspirations (liens)"}
          </label>
          <input
            id="inspirations"
            name="inspirations"
            className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/60 focus:outline-none"
            placeholder="https://site-you-like.com"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="budget" className="text-sm text-white/70">Budget *</label>
          <select
            id="budget"
            name="budget"
            required
            className="rounded-2xl border border-white/10 bg-gray-900 px-4 py-3 text-white [color-scheme:dark] focus:border-white/40 focus:outline-none"
          >
            <option value="" disabled>{isEnglish ? "Select" : isGerman ? "Wählen" : "Sélectionne"}</option>
            {budgetOptions.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="timeline" className="text-sm text-white/70">{isEnglish ? "Timeline *" : isGerman ? "Zeitplan *" : "Délai *"}</label>
          <select
            id="timeline"
            name="timeline"
            required
            className="rounded-2xl border border-white/10 bg-gray-900 px-4 py-3 text-white [color-scheme:dark] focus:border-white/40 focus:outline-none"
          >
            <option value="" disabled>{isEnglish ? "Choose" : isGerman ? "Wählen" : "Choisis"}</option>
            {timelineOptions.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2 flex flex-col gap-2">
          <label htmlFor="message" className="text-sm text-white/70">
            {isEnglish ? "Your vision (free text)" : isGerman ? "Deine Vision (Freitext)" : "Ta vision (message libre)"}
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/60 focus:outline-none"
            placeholder={
              isEnglish
                ? "Share your universe, what matters most..."
                : isGerman
                  ? "Erzaehl uns mehr ueber dein Unternehmen, deine Prioritaeten und was wirklich zaehlt..."
                  : "Parle-nous de ton univers, de ce qui compte vraiment..."
            }
          />
        </div>
      </div>
      <div className="mt-6 space-y-2 text-sm text-white/70">
        <p>{isEnglish ? "Anti-spam verification" : isGerman ? "Anti-Spam-Überprüfung" : "Vérification anti-spam"}</p>
        {siteKey ? (
          <div className="min-h-[96px] rounded-2xl border border-white/10 bg-white/5 p-4 flex items-center">
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
          <p className="text-amber-200">{isEnglish ? "Captcha not configured." : isGerman ? "Captcha nicht konfiguriert." : "Captcha non configuré."}</p>
        )}
        {captchaError && <p className="text-rose-200">{captchaError}</p>}
      </div>
      <div className="mt-6 flex flex-col gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-black transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? (isEnglish ? "Sending..." : isGerman ? "Wird gesendet..." : "Envoi en cours...") : isEnglish ? "Send my request" : isGerman ? "Anfrage absenden" : "Envoyer ma demande"}
        </button>
        <button
          type="button"
          onClick={exportPdf}
          className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-white/80 transition hover:border-white hover:text-white"
        >
          {isEnglish ? "Export to PDF" : isGerman ? "Als PDF exportieren" : "Exporter en PDF"}
        </button>
        <p className="text-xs text-white/60">
          {isEnglish
            ? "Free estimate, reply within 24h. No commitment."
            : isGerman
              ? "Kostenlose Anfrage, Rückmeldung in 24h. Unverbindlich."
              : "Devis gratuit, réponse sous 24h. Aucun engagement."}
        </p>
        <p className="text-xs text-white/55">
          {isEnglish
            ? "Quotes and invoices are issued in €. Payment is usually made by bank transfer, with secure Stripe payment possible when the project requires it."
            : isGerman
              ? "Angebote und Rechnungen werden in € erstellt. Zahlung per Banküberweisung, bei Bedarf mit Stripe-Zahlungslink."
              : "Les devis et factures sont émis en €. Le paiement se fait en général par virement bancaire, avec lien Stripe sécurisé possible si le projet le demande."}
        </p>
        {serverMessage && (
          <p
            className={`text-sm ${
              status === "error" ? "text-rose-200" : "text-emerald-200"
            }`}
          >
            {serverMessage}
          </p>
        )}
      </div>
    </form>
  );
}
