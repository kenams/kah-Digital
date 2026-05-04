"use client";

import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { TurnstileWidget, type TurnstileWidgetHandle } from "@/components/turnstile-widget";
import { companyConfig } from "@/config/company";
import { trackEvent } from "@/lib/analytics";
import { useLocale } from "@/lib/locale";

type ContactStatus = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const router = useRouter();
  const { locale, prefix } = useLocale();
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
  const copy = {
    fr: {
      verificationFailed: "Vérification impossible. Réessaie.",
      captchaMissing: "Captcha non configuré. Écris-nous sur",
      captchaBeforeSend: "Valide le captcha avant d'envoyer.",
      sendError: "Impossible d'envoyer le message. Réessaie dans un instant.",
      success: "Merci, message envoyé. Redirection en cours...",
      response: "Réponse",
      responseDetail: "Sous 24h avec retour concret.",
      channel: "Canal",
      channelDetail: "Email direct, sans tunnel inutile.",
      scoping: "Cadrage",
      scopingDetail: "Sujet clair, demande exploitable.",
      firstName: "Prénom *",
      firstNamePlaceholder: "Ex : Alex",
      lastName: "Nom *",
      lastNamePlaceholder: "Ex : Martin",
      company: "Société",
      companyPlaceholder: "Ex : Studio Nova",
      subject: "Sujet *",
      subjectPlaceholder: "Sélectionnez un sujet",
      quote: "Demande de devis",
      info: "Demande d'information",
      support: "Support technique",
      other: "Autre",
      message: "Message *",
      messagePlaceholder: "Décris ta demande, ton contexte et ce que tu attends.",
      antiSpam: "Vérification anti-spam",
      privacyIntro: "J'accepte que mes données soient utilisées pour répondre à ma demande. Consultez notre ",
      privacyLink: "politique de confidentialité",
      sending: "Envoi en cours...",
      send: "Envoyer le message",
      captchaNotConfigured: "Captcha non configuré.",
    },
    en: {
      verificationFailed: "Verification failed. Try again.",
      captchaMissing: "Captcha is not configured. Write to us at",
      captchaBeforeSend: "Validate the captcha before sending.",
      sendError: "Unable to send the message. Try again in a moment.",
      success: "Thanks, message sent. Redirecting...",
      response: "Response",
      responseDetail: "Within 24h with a concrete reply.",
      channel: "Channel",
      channelDetail: "Direct email, no useless funnel.",
      scoping: "Scoping",
      scopingDetail: "Clear subject, actionable request.",
      firstName: "First name *",
      firstNamePlaceholder: "Ex: Alex",
      lastName: "Last name *",
      lastNamePlaceholder: "Ex: Martin",
      company: "Company",
      companyPlaceholder: "Ex: Studio Nova",
      subject: "Subject *",
      subjectPlaceholder: "Select a subject",
      quote: "Quote request",
      info: "Information request",
      support: "Technical support",
      other: "Other",
      message: "Message *",
      messagePlaceholder: "Describe your request, your context, and what you expect.",
      antiSpam: "Anti-spam verification",
      privacyIntro: "I agree that my data may be used to answer my request. Read our ",
      privacyLink: "privacy policy",
      sending: "Sending...",
      send: "Send message",
      captchaNotConfigured: "Captcha is not configured.",
    },
    de: {
      verificationFailed: "Verifizierung fehlgeschlagen. Bitte erneut versuchen.",
      captchaMissing: "Captcha ist nicht konfiguriert. Schreibe uns an",
      captchaBeforeSend: "Bitte das Captcha vor dem Senden bestätigen.",
      sendError: "Die Nachricht konnte nicht gesendet werden. Bitte gleich erneut versuchen.",
      success: "Danke, Nachricht gesendet. Weiterleitung läuft...",
      response: "Antwort",
      responseDetail: "Innerhalb von 24 Stunden mit klarer Rückmeldung.",
      channel: "Kanal",
      channelDetail: "Direkte E-Mail, ohne unnötigen Funnel.",
      scoping: "Briefing",
      scopingDetail: "Klares Thema, direkt nutzbare Anfrage.",
      firstName: "Vorname *",
      firstNamePlaceholder: "Bsp.: Alex",
      lastName: "Nachname *",
      lastNamePlaceholder: "Bsp.: Martin",
      company: "Unternehmen",
      companyPlaceholder: "Bsp.: Studio Nova",
      subject: "Betreff *",
      subjectPlaceholder: "Bitte Thema waehlen",
      quote: "Projektanfrage",
      info: "Informationsanfrage",
      support: "Technischer Support",
      other: "Anderes",
      message: "Nachricht *",
      messagePlaceholder: "Beschreibe dein Anliegen, den Kontext und was du erwartest.",
      antiSpam: "Anti-Spam-Verifizierung",
      privacyIntro: "Ich stimme zu, dass meine Daten zur Beantwortung meiner Anfrage verwendet werden. Zur ",
      privacyLink: "Datenschutzerklaerung",
      sending: "Wird gesendet...",
      send: "Nachricht senden",
      captchaNotConfigured: "Captcha ist nicht konfiguriert.",
    },
  }[locale];
  const [status, setStatus] = useState<ContactStatus>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaReset, setCaptchaReset] = useState(0);
  const [captchaError, setCaptchaError] = useState("");
  const widgetRef = useRef<TurnstileWidgetHandle | null>(null);
  const pendingFormRef = useRef<HTMLFormElement | null>(null);

  const submitContactRequest = useCallback(async (form: HTMLFormElement, token: string) => {
    const formData = new FormData(form);

    if (!siteKey) {
      setStatus("error");
      setServerMessage(`${copy.captchaMissing} ${companyConfig.email}.`);
      return;
    }

    if (!token) {
      setStatus("error");
      setServerMessage(copy.captchaBeforeSend);
      return;
    }

    const payload = {
      firstName: String(formData.get("firstName") ?? "").trim(),
      lastName: String(formData.get("lastName") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      company: String(formData.get("company") ?? "").trim() || undefined,
      subject: String(formData.get("subject") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
      website: String(formData.get("website") ?? "").trim() || undefined,
      turnstileToken: token,
    };

    setStatus("loading");
    setServerMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => null);
      if (!response.ok) {
        const errorMessage =
          typeof data?.error === "string" ? data.error : copy.sendError;
        setCaptchaToken("");
        setCaptchaReset((prev) => prev + 1);
        setStatus("error");
        setServerMessage(errorMessage);
        return;
      }

      setStatus("success");
      setServerMessage(copy.success);
      trackEvent("generate_lead", {
        form_name: "contact",
        destination: "contact",
        subject: payload.subject,
      });
      form.reset();
      setCaptchaToken("");
      setCaptchaReset((prev) => prev + 1);
      window.setTimeout(() => {
        router.push(prefix ? `${prefix}/merci` : "/merci");
      }, 800);
    } catch (error) {
      console.error(error);
      setStatus("error");
      setServerMessage(copy.sendError);
    }
  }, [copy, prefix, router, siteKey]);

  const handleCaptchaVerify = useCallback((token: string) => {
    setCaptchaToken(token);
    setCaptchaError("");
    const pendingForm = pendingFormRef.current;
    if (pendingForm) {
      pendingFormRef.current = null;
      void submitContactRequest(pendingForm, token);
    }
  }, [submitContactRequest]);

  const handleCaptchaExpire = useCallback(() => {
    setCaptchaToken("");
    pendingFormRef.current = null;
  }, []);

  const handleCaptchaFailure = useCallback(() => {
    setCaptchaToken("");
    setCaptchaError(copy.verificationFailed);
    pendingFormRef.current = null;
  }, [copy.verificationFailed]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!siteKey) {
      setStatus("error");
      setServerMessage(`${copy.captchaMissing} ${companyConfig.email}.`);
      return;
    }

    if (!captchaToken) {
      pendingFormRef.current = form;
      setServerMessage("");
      setCaptchaError("");
      widgetRef.current?.execute();
      return;
    }

    void submitContactRequest(form, captchaToken);
  }

  const isSubmitting = status === "loading";
  const fieldClassName =
    "w-full rounded-2xl border border-white/20 bg-slate-950/55 px-4 py-3 text-white placeholder:text-white/55 focus:border-sky-300 focus:outline-none";

  return (
    <form
      className="premium-card rounded-[32px] border border-white/10 bg-white/5 p-6 text-white shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur"
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
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">{copy.response}</p>
          <p className="mt-2 text-sm text-white/75">{copy.responseDetail}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">{copy.channel}</p>
          <p className="mt-2 text-sm text-white/75">{copy.channelDetail}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">{copy.scoping}</p>
          <p className="mt-2 text-sm text-white/75">{copy.scopingDetail}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="firstName" className="text-sm font-medium text-white/90">
            {copy.firstName}
          </label>
          <input id="firstName" name="firstName" required className={fieldClassName} placeholder={copy.firstNamePlaceholder} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="lastName" className="text-sm font-medium text-white/90">
            {copy.lastName}
          </label>
          <input id="lastName" name="lastName" required className={fieldClassName} placeholder={copy.lastNamePlaceholder} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-white/90">
            Email *
          </label>
          <input id="email" type="email" name="email" required className={fieldClassName} placeholder="contact@entreprise.com" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="company" className="text-sm font-medium text-white/90">
            {copy.company}
          </label>
          <input id="company" name="company" className={fieldClassName} placeholder={copy.companyPlaceholder} />
        </div>
        <div className="md:col-span-2 flex flex-col gap-3 rounded-2xl border border-white/12 bg-white/5 p-4">
          <label htmlFor="subject" className="text-sm font-medium text-white/95">
            {copy.subject}
          </label>
          <select id="subject" name="subject" required className={`${fieldClassName} text-white`} defaultValue="">
            <option value="" disabled>
              {copy.subjectPlaceholder}
            </option>
            <option value="devis">{copy.quote}</option>
            <option value="information">{copy.info}</option>
            <option value="support">{copy.support}</option>
            <option value="autre">{copy.other}</option>
          </select>
        </div>
        <div className="md:col-span-2 flex flex-col gap-3 rounded-2xl border border-white/12 bg-white/5 p-4">
          <label htmlFor="message" className="text-sm font-medium text-white/95">
            {copy.message}
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            placeholder={copy.messagePlaceholder}
            className={`${fieldClassName} min-h-[180px]`}
          />
        </div>
      </div>

      <div className="mt-6 space-y-3 rounded-2xl border border-white/12 bg-white/5 p-4">
        <p className="text-sm font-medium text-white/95">{copy.antiSpam}</p>
        {siteKey ? (
          <div className="min-h-[96px] rounded-2xl border border-white/15 bg-slate-950/45 p-4 flex items-center">
            <TurnstileWidget
              ref={widgetRef}
              siteKey={siteKey}
              onVerify={handleCaptchaVerify}
              onExpire={handleCaptchaExpire}
              onError={handleCaptchaFailure}
              resetKey={String(captchaReset)}
            />
          </div>
        ) : (
          <p className="text-sm text-amber-200">{copy.captchaNotConfigured}</p>
        )}
        {captchaError ? <p className="text-sm text-rose-200">{captchaError}</p> : null}
      </div>

      <div className="mt-6 flex items-start gap-3 rounded-2xl border border-white/10 bg-black/15 p-4">
        <input type="checkbox" id="privacy" name="privacy" required className="mt-1 h-4 w-4 rounded border-white/30 bg-transparent" />
        <label htmlFor="privacy" className="text-sm text-white/75">
          {copy.privacyIntro}
          <a
            href={locale === "en" ? "/en/politique-de-confidentialite" : "/confidentialite"}
            className="underline hover:text-white"
          >
            {copy.privacyLink}
          </a>
          .
        </label>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 font-semibold text-black transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? copy.sending : copy.send}
        </button>

        {serverMessage ? (
          <p className={`text-sm ${status === "error" ? "text-rose-200" : "text-emerald-200"}`}>{serverMessage}</p>
        ) : null}
      </div>
    </form>
  );
}
