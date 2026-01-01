"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { TurnstileWidget } from "@/components/turnstile-widget";

type QuotePayload = {
  name: string;
  email: string;
  phone?: string;
  projectType: string;
  goal: string;
  pages: string[];
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

const pageOptions = [
  "Accueil",
  "? propos",
  "Services",
  "Portfolio",
  "Blog",
  "Contact",
];

const budgetOptions = [
  "Moins de 2 000 EUR",
  "2 000 EUR - 6 000 EUR",
  "6 000 EUR - 12 000 EUR",
  "12 000 EUR +",
];

const timelineOptions = [
  "ASAP",
  "2-4 semaines",
  "1-2 mois",
  "3 mois et +",
];

export function QuoteForm() {
  const router = useRouter();
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaReset, setCaptchaReset] = useState(0);
  const [captchaError, setCaptchaError] = useState("");

  const handleCaptchaVerify = useCallback((token: string) => {
    setCaptchaToken(token);
    setCaptchaError("");
  }, []);
  const handleCaptchaExpire = useCallback(() => {
    setCaptchaToken("");
  }, []);
  const handleCaptchaError = useCallback(() => {
    setCaptchaToken("");
    setCaptchaError("Verification impossible. Reessaye.");
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const formData = new FormData(formElement);

    const rawClientType = String(formData.get("clientType") ?? "").trim();
    const selectedPages = formData.getAll("pages").map((value) => String(value));
    const website = String(formData.get("website") ?? "").trim();

    if (selectedPages.length === 0) {
      setServerMessage("Sélectionne au moins une page pour ton site.");
      setStatus("error");
      return;
    }

    if (!siteKey) {
      setServerMessage("Captcha non configuré. Contacte-nous directement.");
      setStatus("error");
      return;
    }

    if (!captchaToken) {
      setServerMessage("Valide le captcha avant d'envoyer.");
      setStatus("error");
      return;
    }

    const payload: QuotePayload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim() || undefined,
      clientType: rawClientType === "entreprise" ? "entreprise" : rawClientType === "particulier" ? "particulier" : undefined,
      companyName: String(formData.get("companyName") ?? "").trim() || undefined,
      projectType: String(formData.get("projectType") ?? "Site vitrine"),
      goal: String(formData.get("goal") ?? ""),
      pages: selectedPages,
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
      turnstileToken: captchaToken,
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
        const fallbackMessage = "Impossible d'envoyer la demande. Réessaie dans un instant.";
        const errorMessage = errorPayload?.error ?? fallbackMessage;
        if (typeof errorMessage === "string" && errorMessage.toLowerCase().includes("captcha")) {
          setCaptchaToken("");
          setCaptchaReset((prev) => prev + 1);
        }
        setStatus("error");
        setServerMessage(errorMessage);
        return;
      }

      setStatus("success");
      setServerMessage("Merci, demande envoyee. Redirection en cours...");
      formElement.reset();
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
  }

  const isSubmitting = status === "loading";

  return (
    <form
      className="quote-form rounded-3xl border border-white/10 bg-white/5 p-6 text-white shadow-2xl shadow-black/30 backdrop-blur"
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
      <div className="grid gap-5 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="clientType" className="text-sm text-white/70">
            Tu es *
          </label>
          <select
            id="clientType"
            name="clientType"
            className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-black"
            required
            defaultValue=""
          >
            <option value="" disabled>Choisir</option>
            <option value="entreprise">Entreprise</option>
            <option value="particulier">Particulier</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="companyName" className="text-sm text-white/70">
            Nom de société (si entreprise)
          </label>
          <input
            id="companyName"
            name="companyName"
            className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/60 focus:outline-none"
            placeholder="Ex : Kah-Digital SAS"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm text-white/70">Nom complet *</label>
          <input
            id="name"
            name="name"
            required
            className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/60 focus:outline-none"
            placeholder="Ex : Karim Haddad"
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
            placeholder="contact@entreprise.com"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="text-sm text-white/70">Téléphone (optionnel)</label>
          <input
            id="phone"
            name="phone"
            className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/60 focus:outline-none"
            placeholder="+33 6 00 00 00 00"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="projectType" className="text-sm text-white/70">Type de projet *</label>
          <select
            id="projectType"
            name="projectType"
            required
            className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-black"
          >
            <option value="Site vitrine">Site vitrine</option>
            <option value="E-commerce">E-commerce</option>
            <option value="Application web">Application web</option>
            <option value="Autre">Autre</option>
          </select>
        </div>
        <div className="md:col-span-2 flex flex-col gap-2">
          <label htmlFor="goal" className="text-sm text-white/70">Objectif du site *</label>
          <textarea
            id="goal"
            name="goal"
            required
            rows={3}
            className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/60 focus:outline-none"
            placeholder="Ex : Présenter l'agence et générer des demandes qualifiées."
          />
        </div>
        <div className="md:col-span-2 flex flex-col gap-2">
          <p className="text-sm text-white/70">Pages souhaitées *</p>
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
        <div className="flex flex-col gap-2">
          <label htmlFor="inspirations" className="text-sm text-white/70">Inspirations (liens)</label>
          <input
            id="inspirations"
            name="inspirations"
            className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/60 focus:outline-none"
            placeholder="https://site-que-tu-aimes.com"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="budget" className="text-sm text-white/70">Budget *</label>
          <select
            id="budget"
            name="budget"
            required
            className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-black"
          >
            <option value="" disabled>Sélectionne</option>
            {budgetOptions.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="timeline" className="text-sm text-white/70">Délai *</label>
          <select
            id="timeline"
            name="timeline"
            required
            className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-black"
          >
            <option value="" disabled>Choisis</option>
            {timelineOptions.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2 flex flex-col gap-2">
          <label htmlFor="message" className="text-sm text-white/70">Ta vision (message libre)</label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/60 focus:outline-none"
            placeholder="Parle-nous de ton univers, de ce qui compte vraiment..."
          />
        </div>
      </div>
      <div className="mt-6 space-y-2 text-sm text-white/70">
        <p>Verification anti-spam</p>
        {siteKey ? (
          <div className="min-h-[96px] rounded-2xl border border-white/10 bg-white/5 p-4 flex items-center">
            <TurnstileWidget
              siteKey={siteKey}
              onVerify={handleCaptchaVerify}
              onExpire={handleCaptchaExpire}
              onError={handleCaptchaError}
              resetKey={String(captchaReset)}
            />
          </div>
        ) : (
          <p className="text-amber-200">Captcha non configure.</p>
        )}
        {captchaError && <p className="text-rose-200">{captchaError}</p>}
      </div>
      <div className="mt-6 flex flex-col gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-black transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande"}
        </button>
        <p className="text-xs text-white/60">Devis gratuit, reponse sous 24h. Aucun engagement.</p>
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
