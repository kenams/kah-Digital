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
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">Délai</p>
          <p className="mt-2 text-sm text-white/75">Réponse sous 24h, dossier finalisé rapidement.</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">Sans erreur</p>
          <p className="mt-2 text-sm text-white/75">Dossier vérifié par un humain avant envoi.</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">Simple</p>
          <p className="mt-2 text-sm text-white/75">Un seul interlocuteur, zéro paperasse pour toi.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="lastName" className="text-sm font-medium text-white/90">Nom *</label>
          <input id="lastName" name="lastName" required className={fieldClassName} placeholder="Ex : Martin" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="firstName" className="text-sm font-medium text-white/90">Prénom *</label>
          <input id="firstName" name="firstName" required className={fieldClassName} placeholder="Ex : Alex" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="birthDate" className="text-sm font-medium text-white/90">Date de naissance *</label>
          <input id="birthDate" type="date" name="birthDate" required className={fieldClassName} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="birthPlace" className="text-sm font-medium text-white/90">Lieu de naissance *</label>
          <input id="birthPlace" name="birthPlace" required className={fieldClassName} placeholder="Ex : Toulouse" />
        </div>
        <div className="md:col-span-2 flex flex-col gap-2">
          <label htmlFor="address" className="text-sm font-medium text-white/90">Adresse du domicile *</label>
          <input id="address" name="address" required className={fieldClassName} placeholder="Numéro, rue, code postal, ville" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="nationality" className="text-sm font-medium text-white/90">Nationalité *</label>
          <input id="nationality" name="nationality" required className={fieldClassName} placeholder="Ex : Française" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="text-sm font-medium text-white/90">Téléphone *</label>
          <input id="phone" type="tel" name="phone" required className={fieldClassName} placeholder="+33 6 12 34 56 78" />
        </div>
        <div className="md:col-span-2 flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-white/90">Email *</label>
          <input id="email" type="email" name="email" required className={fieldClassName} placeholder="toi@email.com" />
        </div>
        <div className="md:col-span-2 flex flex-col gap-3 rounded-2xl border border-white/12 bg-white/5 p-4">
          <label htmlFor="activity" className="text-sm font-medium text-white/95">Activité envisagée *</label>
          <textarea
            id="activity"
            name="activity"
            required
            rows={5}
            placeholder="Décris l'activité que tu veux exercer en auto-entreprise."
            className={`${fieldClassName} min-h-[140px]`}
          />
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-white/12 bg-black/15 p-4 text-sm text-white/75">
        Pas besoin de joindre ta pièce d'identité maintenant : on te la demandera par email (recto/verso) après le premier contact.
      </div>

      <div className="mt-6 space-y-3 rounded-2xl border border-white/12 bg-white/5 p-4">
        <p className="text-sm font-medium text-white/95">Vérification anti-spam</p>
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
          <p className="text-sm text-amber-200">Captcha non configuré.</p>
        )}
        {captchaError ? <p className="text-sm text-rose-200">{captchaError}</p> : null}
      </div>

      <div className="mt-6 flex items-start gap-3 rounded-2xl border border-white/10 bg-black/15 p-4">
        <input type="checkbox" id="privacy" name="privacy" required className="mt-1 h-4 w-4 rounded border-white/30 bg-transparent" />
        <label htmlFor="privacy" className="text-sm text-white/75">
          J'accepte que mes données soient utilisées pour traiter ma demande de création d'auto-entreprise. Consultez notre{" "}
          <a href="/confidentialite" className="underline hover:text-white">politique de confidentialité</a>.
        </label>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 font-semibold text-black transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande"}
        </button>

        {serverMessage ? (
          <p className={`text-sm ${status === "error" ? "text-rose-200" : "text-emerald-200"}`}>{serverMessage}</p>
        ) : null}
      </div>
    </form>
  );
}
