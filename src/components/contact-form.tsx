"use client";

import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { TurnstileWidget, type TurnstileWidgetHandle } from "@/components/turnstile-widget";
import { companyConfig } from "@/config/company";
import { useLocale } from "@/lib/locale";

type ContactStatus = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const router = useRouter();
  const { isEnglish, prefix } = useLocale();
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
  const [status, setStatus] = useState<ContactStatus>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaReset, setCaptchaReset] = useState(0);
  const [captchaError, setCaptchaError] = useState("");
  const widgetRef = useRef<TurnstileWidgetHandle | null>(null);
  const pendingFormRef = useRef<HTMLFormElement | null>(null);

  const handleCaptchaVerify = useCallback((token: string) => {
    setCaptchaToken(token);
    setCaptchaError("");
    const pendingForm = pendingFormRef.current;
    if (pendingForm) {
      pendingFormRef.current = null;
      void submitContactRequest(pendingForm, token);
    }
  }, []);

  const handleCaptchaExpire = useCallback(() => {
    setCaptchaToken("");
    pendingFormRef.current = null;
  }, []);

  const handleCaptchaFailure = useCallback(() => {
    setCaptchaToken("");
    setCaptchaError(isEnglish ? "Verification failed. Try again." : "Verification impossible. Reessaie.");
    pendingFormRef.current = null;
  }, [isEnglish]);

  async function submitContactRequest(form: HTMLFormElement, token: string) {
    const formData = new FormData(form);

    if (!siteKey) {
      setStatus("error");
      setServerMessage(
        isEnglish ? `Captcha is not configured. Write to us at ${companyConfig.email}.` : `Captcha non configure. Ecris-nous sur ${companyConfig.email}.`,
      );
      return;
    }

    if (!captchaToken) {
      setStatus("error");
      setServerMessage(isEnglish ? "Validate the captcha before sending." : "Valide le captcha avant d'envoyer.");
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
          typeof data?.error === "string"
            ? data.error
            : isEnglish
              ? "Unable to send the message. Try again in a moment."
              : "Impossible d'envoyer le message. Reessaie dans un instant.";
        setCaptchaToken("");
        setCaptchaReset((prev) => prev + 1);
        setStatus("error");
        setServerMessage(errorMessage);
        return;
      }

      setStatus("success");
      setServerMessage(isEnglish ? "Thanks, message sent. Redirecting..." : "Merci, message envoye. Redirection en cours...");
      form.reset();
      setCaptchaToken("");
      setCaptchaReset((prev) => prev + 1);
      window.setTimeout(() => {
        router.push(prefix ? `${prefix}/merci` : "/merci");
      }, 800);
    } catch (error) {
      console.error(error);
      setStatus("error");
      setServerMessage(
        isEnglish ? "Unable to send the message. Try again in a moment." : "Impossible d'envoyer le message. Reessaie dans un instant.",
      );
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!siteKey) {
      setStatus("error");
      setServerMessage(
        isEnglish ? `Captcha is not configured. Write to us at ${companyConfig.email}.` : `Captcha non configure. Ecris-nous sur ${companyConfig.email}.`,
      );
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
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">{isEnglish ? "Response" : "Reponse"}</p>
          <p className="mt-2 text-sm text-white/75">{isEnglish ? "Within 24h with a concrete reply." : "Sous 24h avec retour concret."}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">{isEnglish ? "Channel" : "Canal"}</p>
          <p className="mt-2 text-sm text-white/75">{isEnglish ? "Direct email, no useless funnel." : "Email direct, sans tunnel inutile."}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">{isEnglish ? "Scoping" : "Cadrage"}</p>
          <p className="mt-2 text-sm text-white/75">{isEnglish ? "Clear subject, actionable request." : "Sujet clair, demande exploitable."}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="firstName" className="text-sm font-medium text-white/90">
            {isEnglish ? "First name *" : "Prenom *"}
          </label>
          <input id="firstName" name="firstName" required className={fieldClassName} placeholder={isEnglish ? "Ex: Alex" : "Ex : Alex"} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="lastName" className="text-sm font-medium text-white/90">
            {isEnglish ? "Last name *" : "Nom *"}
          </label>
          <input id="lastName" name="lastName" required className={fieldClassName} placeholder={isEnglish ? "Ex: Martin" : "Ex : Martin"} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-white/90">
            Email *
          </label>
          <input id="email" type="email" name="email" required className={fieldClassName} placeholder="contact@entreprise.com" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="company" className="text-sm font-medium text-white/90">
            {isEnglish ? "Company" : "Societe"}
          </label>
          <input id="company" name="company" className={fieldClassName} placeholder={isEnglish ? "Ex: Studio Nova" : "Ex : Studio Nova"} />
        </div>
        <div className="md:col-span-2 flex flex-col gap-3 rounded-2xl border border-white/12 bg-white/5 p-4">
          <label htmlFor="subject" className="text-sm font-medium text-white/95">
            {isEnglish ? "Subject *" : "Sujet *"}
          </label>
          <select id="subject" name="subject" required className={`${fieldClassName} text-white`} defaultValue="">
            <option value="" disabled>
              {isEnglish ? "Select a subject" : "Selectionnez un sujet"}
            </option>
            <option value="devis">{isEnglish ? "Quote request" : "Demande de devis"}</option>
            <option value="information">{isEnglish ? "Information request" : "Demande d'information"}</option>
            <option value="support">{isEnglish ? "Technical support" : "Support technique"}</option>
            <option value="autre">{isEnglish ? "Other" : "Autre"}</option>
          </select>
        </div>
        <div className="md:col-span-2 flex flex-col gap-3 rounded-2xl border border-white/12 bg-white/5 p-4">
          <label htmlFor="message" className="text-sm font-medium text-white/95">
            {isEnglish ? "Message *" : "Message *"}
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            placeholder={
              isEnglish
                ? "Describe your request, your context, and what you expect."
                : "Decris ta demande, ton contexte et ce que tu attends."
            }
            className={`${fieldClassName} min-h-[180px]`}
          />
        </div>
      </div>

      <div className="mt-6 space-y-3 rounded-2xl border border-white/12 bg-white/5 p-4">
        <p className="text-sm font-medium text-white/95">{isEnglish ? "Anti-spam verification" : "Verification anti-spam"}</p>
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
          <p className="text-sm text-amber-200">{isEnglish ? "Captcha is not configured." : "Captcha non configure."}</p>
        )}
        {captchaError ? <p className="text-sm text-rose-200">{captchaError}</p> : null}
      </div>

      <div className="mt-6 flex items-start gap-3 rounded-2xl border border-white/10 bg-black/15 p-4">
        <input type="checkbox" id="privacy" name="privacy" required className="mt-1 h-4 w-4 rounded border-white/30 bg-transparent" />
        <label htmlFor="privacy" className="text-sm text-white/75">
          {isEnglish
            ? "I agree that my data may be used to answer my request. Read our "
            : "J'accepte que mes donnees soient utilisees pour repondre a ma demande. Consultez notre "}
          <a href={isEnglish ? "/en/politique-de-confidentialite" : "/confidentialite"} className="underline hover:text-white">
            {isEnglish ? "privacy policy" : "politique de confidentialite"}
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
          {isSubmitting ? (isEnglish ? "Sending..." : "Envoi en cours...") : isEnglish ? "Send message" : "Envoyer le message"}
        </button>

        {serverMessage ? (
          <p className={`text-sm ${status === "error" ? "text-rose-200" : "text-emerald-200"}`}>{serverMessage}</p>
        ) : null}
      </div>
    </form>
  );
}
