"use client";

import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { TurnstileWidget, type TurnstileWidgetHandle } from "@/components/turnstile-widget";
import { companyConfig } from "@/config/company";
import { trackEvent } from "@/lib/analytics";

type FormStatus = "idle" | "loading" | "success" | "error";

export function CreationEntrepriseForm() {
  const router = useRouter();
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
  const [status, setStatus] = useState<FormStatus>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaReset, setCaptchaReset] = useState(0);
  const [captchaError, setCaptchaError] = useState("");
  const widgetRef = useRef<TurnstileWidgetHandle | null>(null);
  const pendingFormRef = useRef<HTMLFormElement | null>(null);

  const submitRequest = useCallback(async (form: HTMLFormElement, token: string) => {
    const formData = new FormData(form);

    if (!siteKey) {
      setStatus("error");
      setServerMessage(`Captcha non configuré. Écris-nous sur ${companyConfig.email}.`);
      return;
    }

    if (!token) {
      setStatus("error");
      setServerMessage("Valide le captcha avant d'envoyer.");
      return;
    }

    const payload = {
      lastName: String(formData.get("lastName") ?? "").trim(),
      firstName: String(formData.get("firstName") ?? "").trim(),
      birthDate: String(formData.get("birthDate") ?? "").trim(),
      birthPlace: String(formData.get("birthPlace") ?? "").trim(),
      address: String(formData.get("address") ?? "").trim(),
      nationality: String(formData.get("nationality") ?? "").trim(),
      activity: String(formData.get("activity") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      website: String(formData.get("website") ?? "").trim() || undefined,
      turnstileToken: token,
    };

    setStatus("loading");
    setServerMessage("");

    try {
      const response = await fetch("/api/creation-entreprise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => null);
      if (!response.ok) {
        const errorMessage = typeof data?.error === "string" ? data.error : "Impossible d'envoyer la demande. Réessaie dans un instant.";
        setCaptchaToken("");
        setCaptchaReset((prev) => prev + 1);
        setStatus("error");
        setServerMessage(errorMessage);
        return;
      }

      setStatus("success");
      setServerMessage("Merci, demande envoyée. Redirection en cours...");
      trackEvent("generate_lead", {
        form_name: "creation_entreprise",
        destination: "creation-entreprise",
      });
      form.reset();
      setCaptchaToken("");
      setCaptchaReset((prev) => prev + 1);
      window.setTimeout(() => {
        router.push("/merci");
      }, 800);
    } catch (error) {
      console.error(error);
      setStatus("error");
      setServerMessage("Impossible d'envoyer la demande. Réessaie dans un instant.");
    }
  }, [router, siteKey]);

  const handleCaptchaVerify = useCallback((token: string) => {
    setCaptchaToken(token);
    setCaptchaError("");
    const pendingForm = pendingFormRef.current;
    if (pendingForm) {
      pendingFormRef.current = null;
      void submitRequest(pendingForm, token);
    }
  }, [submitRequest]);

  const handleCaptchaExpire = useCallback(() => {
    setCaptchaToken("");
    pendingFormRef.current = null;
  }, []);

  const handleCaptchaFailure = useCallback(() => {
    setCaptchaToken("");
    setCaptchaError("Vérification impossible. Réessaie.");
    pendingFormRef.current = null;
  }, []);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!siteKey) {
      setStatus("error");
      setServerMessage(`Captcha non configuré. Écris-nous sur ${companyConfig.email}.`);
      return;
    }

    if (!captchaToken) {
      pendingFormRef.current = form;
      setServerMessage("");
      setCaptchaError("");
      widgetRef.current?.execute();
      return;
    }

    void submitRequest(form, captchaToken);
  }

  const isSubmitting = status === "loading";
  const fieldClassName =
    "w-full rounded-xl border border-white/12 bg-slate-950/60 px-4 py-3 text-white placeholder:text-white/40 transition-all duration-150 focus:border-sky-400/60 focus:bg-slate-950/80 focus:outline-none focus:ring-2 focus:ring-sky-500/20 hover:border-white/20";
  const labelClassName = "text-sm font-medium text-white/85";

  return (
    <form
      className="premium-card relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-6 text-white shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur sm:p-8"
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

      <div className="relative mb-8">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 text-xs font-semibold text-sky-300">
          3 minutes chrono
        </span>
        <h2 className="mt-3 text-xl font-bold text-white sm:text-2xl">Ta demande de création</h2>
        <p className="mt-1.5 text-sm text-white/60">Réponse sous 24h, dossier vérifié par un humain.</p>
      </div>

      <div className="relative space-y-8">
        <fieldset className="space-y-4">
          <legend className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-sky-300/80">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sky-500/15 text-[10px] text-sky-300">1</span>
            État civil
          </legend>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="lastName" className={labelClassName}>Nom *</label>
              <input id="lastName" name="lastName" required className={fieldClassName} placeholder="Ex : Martin" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="firstName" className={labelClassName}>Prénom *</label>
              <input id="firstName" name="firstName" required className={fieldClassName} placeholder="Ex : Alex" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="birthDate" className={labelClassName}>Date de naissance *</label>
              <input id="birthDate" type="date" name="birthDate" required className={`${fieldClassName} [color-scheme:dark]`} />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="birthPlace" className={labelClassName}>Lieu de naissance *</label>
              <input id="birthPlace" name="birthPlace" required className={fieldClassName} placeholder="Ex : Toulouse" />
            </div>
            <div className="md:col-span-2 flex flex-col gap-2">
              <label htmlFor="address" className={labelClassName}>Adresse du domicile *</label>
              <input id="address" name="address" required className={fieldClassName} placeholder="Numéro, rue, code postal, ville" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="nationality" className={labelClassName}>Nationalité *</label>
              <input id="nationality" name="nationality" required className={fieldClassName} placeholder="Ex : Française" />
            </div>
          </div>
        </fieldset>

        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <fieldset className="space-y-4">
          <legend className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-sky-300/80">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sky-500/15 text-[10px] text-sky-300">2</span>
            Contact
          </legend>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className={labelClassName}>Téléphone *</label>
              <input id="phone" type="tel" name="phone" required className={fieldClassName} placeholder="+33 6 12 34 56 78" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className={labelClassName}>Email *</label>
              <input id="email" type="email" name="email" required className={fieldClassName} placeholder="toi@email.com" />
            </div>
          </div>
        </fieldset>

        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <fieldset className="space-y-4">
          <legend className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-sky-300/80">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sky-500/15 text-[10px] text-sky-300">3</span>
            Activité
          </legend>
          <div className="flex flex-col gap-2">
            <label htmlFor="activity" className={labelClassName}>Activité envisagée *</label>
            <textarea
              id="activity"
              name="activity"
              required
              rows={5}
              placeholder="Décris l'activité que tu veux exercer en auto-entreprise."
              className={`${fieldClassName} min-h-[140px] resize-none`}
            />
          </div>
        </fieldset>
      </div>

      <div className="relative mt-6 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/65">
        Pas besoin de joindre ta pièce d&apos;identité maintenant : on te la demandera par email (recto/verso) après le premier contact.
      </div>

      <div className="relative mt-6 space-y-3 rounded-2xl border border-white/10 bg-black/20 p-4">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/60">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-sky-500/15 text-[10px] text-sky-300">4</span>
          Vérification anti-spam
        </p>
        {siteKey ? (
          <div className="flex min-h-[80px] items-center rounded-xl border border-white/10 bg-slate-950/50 p-3">
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
          <p className="text-sm text-amber-200">Captcha non configuré.</p>
        )}
        {captchaError ? <p className="text-sm text-rose-200">{captchaError}</p> : null}
      </div>

      <div className="relative mt-6 flex items-start gap-3 rounded-2xl border border-white/10 bg-black/15 p-4">
        <input type="checkbox" id="privacy" name="privacy" required className="mt-1 h-4 w-4 shrink-0 rounded border-white/30 bg-transparent accent-sky-500" />
        <label htmlFor="privacy" className="text-sm text-white/70">
          J&apos;accepte que mes données soient utilisées pour traiter ma demande de création d&apos;auto-entreprise. Consultez notre{" "}
          <a href="/confidentialite" className="underline underline-offset-2 hover:text-white">politique de confidentialité</a>.
        </label>
      </div>

      <div className="relative mt-6 flex flex-col gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-400 to-blue-500 px-6 py-3.5 font-bold text-slate-950 shadow-lg shadow-sky-500/25 transition-all hover:gap-3 hover:shadow-sky-500/40 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:gap-2"
        >
          {isSubmitting ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950/30 border-t-slate-950" />
              Envoi en cours...
            </>
          ) : (
            "Envoyer ma demande"
          )}
        </button>

        {serverMessage ? (
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
        ) : null}
      </div>
    </form>
  );
}
