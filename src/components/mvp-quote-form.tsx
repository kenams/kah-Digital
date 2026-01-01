"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { TurnstileWidget } from "@/components/turnstile-widget";

type MvpQuotePayload = {
  name: string;
  email: string;
  phone?: string;
  projectType: string;
  goal: string;
  pages: string[];
  mobilePlatforms: string[];
  mobileFeatures: string[];
  storeSupport?: string;
  techPreferences?: string;
  inspirations?: string;
  budget: string;
  timeline: string;
  message?: string;
  clientType?: "entreprise" | "particulier";
  companyName?: string;
  projectFocus: "web" | "mobile";
  website?: string;
  turnstileToken?: string;
};

const mobilePlatformOptions = ["iOS", "Android", "Les deux"];
const mobileFeatureOptions = [
  "Authentification / rôles",
  "Paiement in-app",
  "Réservation / planning",
  "Chat / communauté",
  "Notifications push",
  "Mode offline",
  "Suivi analytics",
  "Intégration capteurs (GPS, caméra)",
];

const budgetOptions = [
  "Moins de 10 000 EUR",
  "10 000 EUR - 20 000 EUR",
  "20 000 EUR - 30 000 EUR",
  "30 000 EUR +",
];
const timelineOptions = ["ASAP", "4-6 semaines", "6-10 semaines", "3 mois et +"];
const storeSupportOptions = [
  "Prototype TestFlight / Android Beta",
  "Publication App Store + Play Store",
  "Je ne sais pas encore",
];

export function MvpQuoteForm() {
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
    const form = event.currentTarget;
    const formData = new FormData(form);
    const selectedPlatforms = formData.getAll("mobilePlatforms").map((value) => String(value));
    const website = String(formData.get("website") ?? "").trim();

    if (selectedPlatforms.length === 0) {
      setServerMessage("Sélectionne au moins une plateforme.");
      setStatus("error");
      return;
    }

    if (!siteKey) {
      setServerMessage("Captcha non configure. Contacte-nous directement.");
      setStatus("error");
      return;
    }

    if (!captchaToken) {
      setServerMessage("Valide le captcha avant d'envoyer.");
      setStatus("error");
      return;
    }

    const payload: MvpQuotePayload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim() || undefined,
      clientType: String(formData.get("clientType") ?? "").trim() as "entreprise" | "particulier" | undefined,
      companyName: String(formData.get("companyName") ?? "").trim() || undefined,
      projectType: "Application mobile MVP",
      goal: String(formData.get("idea") ?? "").trim(),
      pages: [],
      mobilePlatforms: selectedPlatforms,
      mobileFeatures: formData.getAll("mobileFeatures").map((value) => String(value)),
      storeSupport: String(formData.get("storeSupport") ?? "").trim() || undefined,
      techPreferences: String(formData.get("techStack") ?? "").trim() || undefined,
      inspirations: String(formData.get("inspirations") ?? "").trim() || undefined,
      budget: String(formData.get("budget") ?? ""),
      timeline: String(formData.get("timeline") ?? ""),
      message: [
        `Fonctionnement : ${String(formData.get("flows") ?? "").trim() || "-"}`,
        `Univers visuel : ${String(formData.get("visualMood") ?? "").trim() || "-"}`,
        `Notes : ${String(formData.get("notes") ?? "").trim() || "-"}`,
      ]
        .filter(Boolean)
        .join("\n"),
      projectFocus: "mobile",
      website: website || undefined,
      turnstileToken: captchaToken,
    };

    if (!payload.goal || payload.goal.length < 5) {
      setServerMessage("Décris rapidement ton idée pour que l'on puisse te répondre.");
      setStatus("error");
      return;
    }

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
        const fallbackMessage = "Impossible d'envoyer la demande. Vérifie ta connexion ou écris-nous.";
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
      form.reset();
      setCaptchaToken("");
      setCaptchaReset((prev) => prev + 1);
      window.setTimeout(() => {
        router.push("/merci");
      }, 800);
    } catch (error) {
      console.error(error);
      setStatus("error");
      setServerMessage("Impossible d'envoyer la demande. Vérifie ta connexion ou écris-nous.");
    }
  }

  const isSubmitting = status === "loading";

  return (
    <form
      className="rounded-[36px] border border-white/15 bg-gradient-to-br from-[#0b0c23] via-[#170f32] to-[#2a1854] p-6 text-white shadow-[0_35px_120px_rgba(72,33,128,0.45)]"
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
          <label htmlFor="clientType" className="text-sm text-white/70">Tu es *</label>
          <select
            id="clientType"
            name="clientType"
            required
            className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-black"
            defaultValue=""
          >
            <option value="" disabled>Choisir</option>
            <option value="entreprise">Entreprise</option>
            <option value="particulier">Particulier</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="companyName" className="text-sm text-white/70">Nom de société (si entreprise)</label>
          <input
            id="companyName"
            name="companyName"
            className="rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/60 focus:outline-none"
            placeholder="Ex : Studio Nova"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm text-white/70">Nom complet *</label>
          <input
            id="name"
            name="name"
            required
            className="rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/60 focus:outline-none"
            placeholder="Ex : Aya Benali"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm text-white/70">Email *</label>
          <input
            id="email"
            type="email"
            name="email"
            required
            className="rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/60 focus:outline-none"
            placeholder="contact@entreprise.com"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="text-sm text-white/70">Téléphone</label>
          <input
            id="phone"
            name="phone"
            className="rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/60 focus:outline-none"
            placeholder="+33 6 00 00 00 00"
          />
        </div>
        <div className="md:col-span-2 flex flex-col gap-2">
          <label htmlFor="idea" className="text-sm text-white/70">Ton idée / la promesse *</label>
          <textarea
            id="idea"
            name="idea"
            required
            rows={3}
            className="rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/60 focus:outline-none"
            placeholder="Ex : app de coaching nutrition avec suivi hebdo et contenus audio."
          />
        </div>
        <div className="md:col-span-2 space-y-3 rounded-3xl border border-white/15 bg-white/5 p-4 text-sm text-white/80">
          <p className="text-xs uppercase tracking-[0.4em] text-white/60">Plateformes ciblées *</p>
          <div className="flex flex-wrap gap-3">
            {mobilePlatformOptions.map((platform) => (
              <label key={platform} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="mobilePlatforms"
                  value={platform}
                  className="h-4 w-4 rounded border-white/40 bg-transparent text-white focus:ring-white/70"
                />
                {platform}
              </label>
            ))}
          </div>
        </div>
        <div className="md:col-span-2 space-y-3 rounded-3xl border border-white/15 bg-white/5 p-4 text-sm text-white/80">
          <p className="text-xs uppercase tracking-[0.4em] text-white/60">Fonctionnalités clés</p>
          <div className="grid gap-3 md:grid-cols-2">
            {mobileFeatureOptions.map((feature) => (
              <label key={feature} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="mobileFeatures"
                  value={feature}
                  className="h-4 w-4 rounded border-white/40 bg-transparent text-white focus:ring-white/70"
                />
                {feature}
              </label>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="flows" className="text-sm text-white/70">Comment ça fonctionne ? *</label>
          <textarea
            id="flows"
            name="flows"
            required
            rows={3}
            className="rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/60 focus:outline-none"
            placeholder="Ex : onboarding 3 étapes, feed personnalisé, réservation coach."
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="visualMood" className="text-sm text-white/70">Couleurs / univers visuel *</label>
          <input
            id="visualMood"
            name="visualMood"
            required
            className="rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/60 focus:outline-none"
            placeholder="Ex : sombre luxe, touches or & violet."
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="techStack" className="text-sm text-white/70">Technologies ou APIs souhaitées</label>
          <input
            id="techStack"
            name="techStack"
            className="rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/60 focus:outline-none"
            placeholder="Ex : Supabase, Stripe, Notion, API interne..."
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="storeSupport" className="text-sm text-white/70">Publication / stores *</label>
          <select
            id="storeSupport"
            name="storeSupport"
            required
            className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-black"
            defaultValue=""
          >
            <option value="" disabled>Choisir</option>
            {storeSupportOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="inspirations" className="text-sm text-white/70">Apps de référence</label>
          <input
            id="inspirations"
            name="inspirations"
            className="rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/60 focus:outline-none"
            placeholder="Headspace, Uber, Notion..."
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="budget" className="text-sm text-white/70">Budget *</label>
          <select
            id="budget"
            name="budget"
            required
            className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-black"
            defaultValue=""
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
            className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-black"
            defaultValue=""
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
          <label htmlFor="notes" className="text-sm text-white/70">Notes libres</label>
          <textarea
            id="notes"
            name="notes"
            rows={4}
            className="rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/60 focus:outline-none"
            placeholder="Contraintes, équipe, roadmap, etc."
          />
        </div>
      </div>
      <div className="mt-6 space-y-2 text-sm text-white/70">
        <p>Verification anti-spam</p>
        {siteKey ? (
          <div className="min-h-[96px] rounded-2xl border border-white/15 bg-white/5 p-4 flex items-center">
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
          {isSubmitting ? "Envoi en cours..." : "Envoyer ma demande MVP"}
        </button>
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

