"use client";

import { jsPDF } from "jspdf";
import { useRouter } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { TurnstileWidget } from "@/components/turnstile-widget";
import { trackEvent } from "@/lib/analytics";
import { useLocale } from "@/lib/locale";
import { countryDialCodesSorted } from "@/data/country-dial-codes";

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

export function MvpQuoteForm() {
  const router = useRouter();
  const { isEnglish, prefix } = useLocale();
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
  const formRef = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaReset, setCaptchaReset] = useState(0);
  const [captchaError, setCaptchaError] = useState("");

  const mobilePlatformOptions = isEnglish ? ["iOS", "Android", "Both"] : ["iOS", "Android", "Les deux"];
  const mobileFeatureOptions = isEnglish
    ? [
        "Authentication / roles",
        "In-app payment",
        "Booking / scheduling",
        "Chat / community",
        "Push notifications",
        "Offline mode",
        "Analytics tracking",
        "Sensor integration (GPS, camera)",
      ]
    : [
        "Authentification / roles",
        "Paiement in-app",
        "Reservation / planning",
        "Chat / communaute",
        "Notifications push",
        "Mode offline",
        "Suivi analytics",
        "Integration capteurs (GPS, camera)",
      ];

  const budgetOptions = isEnglish
    ? ["Under 10,000 EUR", "10,000 EUR - 20,000 EUR", "20,000 EUR - 30,000 EUR", "30,000 EUR +"]
    : ["Moins de 10 000 EUR", "10 000 EUR - 20 000 EUR", "20 000 EUR - 30 000 EUR", "30 000 EUR +"];

  const timelineOptions = isEnglish ? ["ASAP", "4-6 weeks", "6-10 weeks", "3 months +"] : ["ASAP", "4-6 semaines", "6-10 semaines", "3 mois et +"];

  const storeSupportOptions = isEnglish
    ? ["Prototype TestFlight / Android Beta", "Publish on App Store + Play Store", "Not sure yet"]
    : ["Prototype TestFlight / Android Beta", "Publication App Store + Play Store", "Je ne sais pas encore"];
  const trustItems = isEnglish
    ? [
        { title: "Reply in 24h", detail: "Budget + MVP scope" },
        { title: "Senior team", detail: "Design + build in one sprint" },
        { title: "Confidential", detail: "NDA on request" },
      ]
    : [
        { title: "Reponse 24h", detail: "Budget + scope MVP" },
        { title: "Equipe senior", detail: "Design + build en un sprint" },
        { title: "Confidentiel", detail: "NDA sur demande" },
      ];

  const handleCaptchaVerify = useCallback((token: string) => {
    setCaptchaToken(token);
    setCaptchaError("");
  }, []);
  const handleCaptchaExpire = useCallback(() => {
    setCaptchaToken("");
  }, []);
  const handleCaptchaError = useCallback(() => {
    setCaptchaToken("");
    setCaptchaError(isEnglish ? "Verification failed. Try again." : "Verification impossible. Reessaye.");
  }, [isEnglish]);

  const exportPdf = () => {
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    const selectedPlatforms = formData.getAll("mobilePlatforms").map((value) => String(value)).filter(Boolean);
    const selectedFeatures = formData.getAll("mobileFeatures").map((value) => String(value)).filter(Boolean);
    const phoneCountry = String(formData.get("phoneCountry") ?? "").trim();
    const phoneRaw = String(formData.get("phone") ?? "").trim();
    const phoneValue = phoneRaw ? `${phoneCountry} ${phoneRaw}`.trim() : "";
    const values: Array<[string, string]> = [
      [isEnglish ? "Client type" : "Type de client", String(formData.get("clientType") ?? "")],
      [isEnglish ? "Company name" : "Nom de societe", String(formData.get("companyName") ?? "")],
      [isEnglish ? "Full name" : "Nom complet", String(formData.get("name") ?? "")],
      ["Email", String(formData.get("email") ?? "")],
      [isEnglish ? "Phone" : "Telephone", phoneValue],
      [isEnglish ? "Idea / promise" : "Idee / promesse", String(formData.get("idea") ?? "")],
      [isEnglish ? "Platforms" : "Plateformes", selectedPlatforms.join(", ")],
      [isEnglish ? "Key features" : "Fonctionnalites cles", selectedFeatures.join(", ")],
      [isEnglish ? "How it works" : "Fonctionnement", String(formData.get("flows") ?? "")],
      [isEnglish ? "Visual mood" : "Univers visuel", String(formData.get("visualMood") ?? "")],
      [isEnglish ? "Tech / APIs" : "Technos / APIs", String(formData.get("techStack") ?? "")],
      [isEnglish ? "Store release" : "Publication / stores", String(formData.get("storeSupport") ?? "")],
      [isEnglish ? "References" : "References", String(formData.get("inspirations") ?? "")],
      [isEnglish ? "Budget" : "Budget", String(formData.get("budget") ?? "")],
      [isEnglish ? "Timeline" : "Delai", String(formData.get("timeline") ?? "")],
      [isEnglish ? "Notes" : "Notes", String(formData.get("notes") ?? "")],
    ];

    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text(isEnglish ? "Kah-Digital - MVP request" : "Kah-Digital - Demande MVP", 16, 18);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(isEnglish ? "Generated from the MVP form" : "Genere depuis le formulaire MVP", 16, 26);
    doc.setDrawColor(210);
    doc.line(16, 30, 194, 30);

    let y = 38;
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

    doc.save(isEnglish ? "kah-digital-mvp.pdf" : "devis-mvp-kah-digital.pdf");
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const selectedPlatforms = formData.getAll("mobilePlatforms").map((value) => String(value));
    const website = String(formData.get("website") ?? "").trim();
    const phoneCountry = String(formData.get("phoneCountry") ?? "").trim();
    const phoneRaw = String(formData.get("phone") ?? "").trim();
    const phoneValue = phoneRaw ? `${phoneCountry} ${phoneRaw}`.trim() : "";

    if (selectedPlatforms.length === 0) {
      setServerMessage(isEnglish ? "Select at least one platform." : "Selectionne au moins une plateforme.");
      setStatus("error");
      return;
    }

    if (!siteKey) {
      setServerMessage(isEnglish ? "Captcha not configured. Contact us directly." : "Captcha non configure. Contacte-nous directement.");
      setStatus("error");
      return;
    }

    if (!captchaToken) {
      setServerMessage(isEnglish ? "Please validate the captcha." : "Valide le captcha avant d'envoyer.");
      setStatus("error");
      return;
    }

    const payload: MvpQuotePayload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      phone: phoneValue || undefined,
      clientType: String(formData.get("clientType") ?? "").trim() as "entreprise" | "particulier" | undefined,
      companyName: String(formData.get("companyName") ?? "").trim() || undefined,
      projectType: isEnglish ? "Mobile MVP app" : "Application mobile MVP",
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
        `${isEnglish ? "Flow" : "Fonctionnement"} : ${String(formData.get("flows") ?? "").trim() || "-"}`,
        `${isEnglish ? "Visual mood" : "Univers visuel"} : ${String(formData.get("visualMood") ?? "").trim() || "-"}`,
        `${isEnglish ? "Notes" : "Notes"} : ${String(formData.get("notes") ?? "").trim() || "-"}`,
      ]
        .filter(Boolean)
        .join("\n"),
      projectFocus: "mobile",
      website: website || undefined,
      turnstileToken: captchaToken,
    };

    if (!payload.goal || payload.goal.length < 5) {
      setServerMessage(isEnglish ? "Describe your idea briefly so we can reply." : "Decris rapidement ton idee pour que l'on puisse te repondre.");
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
        const fallbackMessage = isEnglish
          ? "Unable to send the request. Check your connection or contact us."
          : "Impossible d'envoyer la demande. Verifie ta connexion ou ecris-nous.";
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
      setServerMessage(isEnglish ? "Thanks, request sent. Redirecting..." : "Merci, demande envoyee. Redirection en cours...");
      trackEvent("generate_lead", { form_name: "mvp", destination: "devis_mvp" });
      form.reset();
      setCaptchaToken("");
      setCaptchaReset((prev) => prev + 1);
      window.setTimeout(() => {
        router.push(prefix ? `${prefix}/merci` : "/merci");
      }, 800);
    } catch (error) {
      console.error(error);
      setStatus("error");
      setServerMessage(isEnglish ? "Unable to send the request. Check your connection or contact us." : "Impossible d'envoyer la demande. Verifie ta connexion ou ecris-nous.");
    }
  }

  const isSubmitting = status === "loading";

  return (
    <form
      ref={formRef}
      className="premium-card rounded-[36px] border border-white/15 bg-gradient-to-br from-[#0b0c23] via-[#170f32] to-[#2a1854] p-6 text-white shadow-[0_35px_120px_rgba(72,33,128,0.45)]"
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
          <div key={item.title} className="rounded-2xl border border-white/15 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">{item.title}</p>
            <p className="mt-2 text-sm text-white/70">{item.detail}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="clientType" className="text-sm text-white/70">{isEnglish ? "You are *" : "Tu es *"}</label>
          <select
            id="clientType"
            name="clientType"
            required
            className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-black"
            defaultValue=""
          >
            <option value="" disabled>{isEnglish ? "Select" : "Choisir"}</option>
            <option value="entreprise">{isEnglish ? "Company" : "Entreprise"}</option>
            <option value="particulier">{isEnglish ? "Individual" : "Particulier"}</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="companyName" className="text-sm text-white/70">
            {isEnglish ? "Company name (if company)" : "Nom de societe (si entreprise)"}
          </label>
          <input
            id="companyName"
            name="companyName"
            className="rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/60 focus:outline-none"
            placeholder={isEnglish ? "e.g. Studio Nova" : "Ex : Studio Nova"}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm text-white/70">{isEnglish ? "Full name *" : "Nom complet *"}</label>
          <input
            id="name"
            name="name"
            required
            className="rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/60 focus:outline-none"
            placeholder={isEnglish ? "e.g. Kenams KEITA" : "Ex : Kenams KEITA"}
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
            placeholder="contact@company.com"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="text-sm text-white/70">{isEnglish ? "Phone" : "Telephone"}</label>
          <div className="flex flex-wrap gap-3">
            <select
              id="phoneCountry"
              name="phoneCountry"
              defaultValue="+41"
              className="min-w-[170px] rounded-2xl border border-white/20 bg-white/5 px-3 py-3 text-white focus:border-white/60 focus:outline-none"
            >
              {countryDialCodesSorted.map((entry) => (
                <option key={entry.iso} value={entry.code} className="text-black">
                  {entry.country} ({entry.code})
                </option>
              ))}
            </select>
            <input
              id="phone"
              name="phone"
              inputMode="tel"
              className="min-w-[200px] flex-1 rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/60 focus:outline-none"
              placeholder="00 00 00 00 00"
            />
          </div>
        </div>
        <div className="md:col-span-2 flex flex-col gap-2">
          <label htmlFor="idea" className="text-sm text-white/70">{isEnglish ? "Your idea / promise *" : "Ton idee / la promesse *"}</label>
          <textarea
            id="idea"
            name="idea"
            required
            rows={3}
            className="rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/60 focus:outline-none"
            placeholder={
              isEnglish
                ? "e.g. Nutrition coaching app with weekly tracking and audio content."
                : "Ex : app de coaching nutrition avec suivi hebdo et contenus audio."
            }
          />
        </div>
        <div className="premium-card md:col-span-2 space-y-3 rounded-3xl border border-white/15 bg-white/5 p-4 text-sm text-white/80">
          <p className="text-xs uppercase tracking-[0.4em] text-white/60">
            {isEnglish ? "Target platforms *" : "Plateformes ciblees *"}
          </p>
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
        <div className="premium-card md:col-span-2 space-y-3 rounded-3xl border border-white/15 bg-white/5 p-4 text-sm text-white/80">
          <p className="text-xs uppercase tracking-[0.4em] text-white/60">
            {isEnglish ? "Key features" : "Fonctionnalites cles"}
          </p>
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
          <label htmlFor="flows" className="text-sm text-white/70">{isEnglish ? "How does it work? *" : "Comment ca fonctionne ? *"}</label>
          <textarea
            id="flows"
            name="flows"
            required
            rows={3}
            className="rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/60 focus:outline-none"
            placeholder={
              isEnglish
                ? "e.g. 3-step onboarding, personalized feed, coach booking."
                : "Ex : onboarding 3 etapes, feed personnalise, reservation coach."
            }
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="visualMood" className="text-sm text-white/70">{isEnglish ? "Colors / visual mood *" : "Couleurs / univers visuel *"}</label>
          <input
            id="visualMood"
            name="visualMood"
            required
            className="rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/60 focus:outline-none"
            placeholder={isEnglish ? "e.g. dark luxury, gold accents." : "Ex : sombre luxe, touches or & violet."}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="techStack" className="text-sm text-white/70">{isEnglish ? "Tech or APIs you want" : "Technologies ou APIs souhaitees"}</label>
          <input
            id="techStack"
            name="techStack"
            className="rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/60 focus:outline-none"
            placeholder={isEnglish ? "e.g. Supabase, Stripe, Notion, internal API..." : "Ex : Supabase, Stripe, Notion, API interne..."}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="storeSupport" className="text-sm text-white/70">{isEnglish ? "Store release *" : "Publication / stores *"}</label>
          <select
            id="storeSupport"
            name="storeSupport"
            required
            className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-black"
            defaultValue=""
          >
            <option value="" disabled>{isEnglish ? "Select" : "Choisir"}</option>
            {storeSupportOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="inspirations" className="text-sm text-white/70">{isEnglish ? "Reference apps" : "Apps de reference"}</label>
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
            <option value="" disabled>{isEnglish ? "Select" : "Selectionne"}</option>
            {budgetOptions.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="timeline" className="text-sm text-white/70">{isEnglish ? "Timeline *" : "Delai *"}</label>
          <select
            id="timeline"
            name="timeline"
            required
            className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-black"
            defaultValue=""
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
          <label htmlFor="notes" className="text-sm text-white/70">{isEnglish ? "Notes" : "Notes libres"}</label>
          <textarea
            id="notes"
            name="notes"
            rows={4}
            className="rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/60 focus:outline-none"
            placeholder={isEnglish ? "Constraints, team, roadmap, etc." : "Contraintes, equipe, roadmap, etc."}
          />
        </div>
      </div>
      <div className="mt-6 space-y-2 text-sm text-white/70">
        <p>{isEnglish ? "Anti-spam verification" : "Verification anti-spam"}</p>
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
          <p className="text-amber-200">{isEnglish ? "Captcha not configured." : "Captcha non configure."}</p>
        )}
        {captchaError && <p className="text-rose-200">{captchaError}</p>}
      </div>
      <div className="mt-6 flex flex-col gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-black transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? (isEnglish ? "Sending..." : "Envoi en cours...") : isEnglish ? "Send my MVP request" : "Envoyer ma demande MVP"}
        </button>
        <button
          type="button"
          onClick={exportPdf}
          className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-white/80 transition hover:border-white hover:text-white"
        >
          {isEnglish ? "Export to PDF" : "Exporter en PDF"}
        </button>
        <p className="text-xs text-white/60">
          {isEnglish ? "Free estimate, reply within 24h. No commitment." : "Devis gratuit, reponse sous 24h. Aucun engagement."}
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
