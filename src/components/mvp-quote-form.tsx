"use client";

import { jsPDF } from "jspdf";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { TurnstileWidget } from "@/components/turnstile-widget";
import { trackEvent } from "@/lib/analytics";
import { useLocale } from "@/lib/locale";
import { drawKahDigitalPdfLogo } from "@/lib/pdf-branding";
import { getUtm } from "@/lib/utm";
import { countryDialCodesSorted } from "@/data/country-dial-codes";

type Copy = {
  you: string; select: string; company: string; individual: string; companyName: string; companyPh: string;
  fullName: string; namePh: string; phone: string; idea: string; ideaPh: string; platforms: string; features: string;
  flows: string; flowsPh: string; mood: string; moodPh: string; tech: string; techPh: string; store: string;
  refs: string; timeline: string; choose: string; notes: string; notesPh: string; antispam: string;
  send: string; sending: string; pdf: string; free: string; adjust: string;
  needPlatform: string; needIdea: string; sentOk: string; sendFail: string; captchaFail: string;
  pdfTitle: string; pdfSub: string; pdfFile: string; pdfLabels: string[]; flowLabel: string; moodLabel: string;
  projectType: string;
  platformOptions: string[]; featureOptions: string[]; budgetOptions: string[]; timelineOptions: string[]; storeOptions: string[];
  trust: { title: string; detail: string }[];
};

const copy: Record<"fr" | "en" | "de", Copy> = {
  fr: {
    you: "Tu es *", select: "Choisir", company: "Entreprise", individual: "Particulier",
    companyName: "Nom de société (si entreprise)", companyPh: "Ex : Studio Nova",
    fullName: "Nom complet *", namePh: "Ex : Alex Martin", phone: "Téléphone",
    idea: "Ton idée / la promesse *", ideaPh: "Ex : app de coaching nutrition avec suivi hebdo et contenus audio.",
    platforms: "Plateformes ciblées *", features: "Fonctionnalités clés",
    flows: "Comment ça fonctionne ? *", flowsPh: "Ex : onboarding 3 étapes, feed personnalisé, réservation coach.",
    mood: "Couleurs / univers visuel *", moodPh: "Ex : sombre luxe, touches or & violet.",
    tech: "Technologies ou APIs souhaitées", techPh: "Ex : Supabase, Stripe, Notion, API interne...",
    store: "Publication / stores *", refs: "Apps de référence", timeline: "Délai *", choose: "Choisis",
    notes: "Notes libres", notesPh: "Contraintes, équipe, roadmap, etc.", antispam: "Vérification anti-spam",
    send: "Envoyer ma demande MVP", sending: "Envoi en cours...", pdf: "Exporter en PDF",
    free: "Devis gratuit, réponse sous 24h. Aucun engagement.",
    adjust: "La proposition MVP est ajustée au périmètre réel, aux priorités de lancement et à la stratégie de validation.",
    needPlatform: "Sélectionne au moins une plateforme.", needIdea: "Décris rapidement ton idée pour que l'on puisse te répondre.",
    sentOk: "Merci, demande envoyée. Redirection en cours...", sendFail: "Impossible d'envoyer la demande. Vérifie ta connexion ou écris-nous.",
    captchaFail: "Vérification impossible. Réessaie.",
    pdfTitle: "Demande MVP", pdfSub: "Généré depuis le formulaire MVP", pdfFile: "devis-mvp-kah-digital.pdf",
    pdfLabels: ["Type de client", "Nom de société", "Nom complet", "Email", "Téléphone", "Idée / promesse", "Plateformes", "Fonctionnalités clés", "Fonctionnement", "Univers visuel", "Technos / APIs", "Publication / stores", "Références", "Budget", "Délai", "Notes"],
    flowLabel: "Fonctionnement", moodLabel: "Univers visuel", projectType: "Application mobile MVP",
    platformOptions: ["iOS", "Android", "Les deux"],
    featureOptions: ["Authentification / rôles", "Paiement in-app", "Réservation / planning", "Chat / communauté", "Notifications push", "Mode hors ligne", "Suivi analytics", "Intégration capteurs (GPS, caméra)"],
    budgetOptions: ["À discuter", "Budget MVP limité", "Budget MVP confortable", "Investissement prévu", "J'ai besoin de conseil"],
    timelineOptions: ["Dès que possible", "4-6 semaines", "6-10 semaines", "3 mois et +"],
    storeOptions: ["Prototype TestFlight / Android Beta", "Publication App Store + Play Store", "Je ne sais pas encore"],
    trust: [
      { title: "Réponse 24h", detail: "Budget + périmètre MVP" },
      { title: "Équipe senior", detail: "Design + build en un sprint" },
      { title: "Confidentiel", detail: "NDA sur demande" },
    ],
  },
  en: {
    you: "You are *", select: "Select", company: "Company", individual: "Individual",
    companyName: "Company name (if company)", companyPh: "e.g. Studio Nova",
    fullName: "Full name *", namePh: "e.g. Alex Martin", phone: "Phone",
    idea: "Your idea / promise *", ideaPh: "e.g. Nutrition coaching app with weekly tracking and audio content.",
    platforms: "Target platforms *", features: "Key features",
    flows: "How does it work? *", flowsPh: "e.g. 3-step onboarding, personalized feed, coach booking.",
    mood: "Colors / visual mood *", moodPh: "e.g. dark luxury, gold accents.",
    tech: "Tech or APIs you want", techPh: "e.g. Supabase, Stripe, Notion, internal API...",
    store: "Store release *", refs: "Reference apps", timeline: "Timeline *", choose: "Choose",
    notes: "Notes", notesPh: "Constraints, team, roadmap, etc.", antispam: "Anti-spam verification",
    send: "Send my MVP request", sending: "Sending...", pdf: "Export to PDF",
    free: "Free estimate, reply within 24h. No commitment.",
    adjust: "The MVP proposal is adjusted to the real scope, launch priorities and validation strategy.",
    needPlatform: "Select at least one platform.", needIdea: "Describe your idea briefly so we can reply.",
    sentOk: "Thanks, request sent. Redirecting...", sendFail: "Unable to send the request. Check your connection or contact us.",
    captchaFail: "Verification failed. Try again.",
    pdfTitle: "MVP request", pdfSub: "Generated from the MVP form", pdfFile: "kah-digital-mvp.pdf",
    pdfLabels: ["Client type", "Company name", "Full name", "Email", "Phone", "Idea / promise", "Platforms", "Key features", "How it works", "Visual mood", "Tech / APIs", "Store release", "References", "Budget", "Timeline", "Notes"],
    flowLabel: "Flow", moodLabel: "Visual mood", projectType: "Mobile MVP app",
    platformOptions: ["iOS", "Android", "Both"],
    featureOptions: ["Authentication / roles", "In-app payment", "Booking / scheduling", "Chat / community", "Push notifications", "Offline mode", "Analytics tracking", "Sensor integration (GPS, camera)"],
    budgetOptions: ["To be discussed", "Limited MVP budget", "Comfortable MVP budget", "Investment planned", "I need advice"],
    timelineOptions: ["ASAP", "4-6 weeks", "6-10 weeks", "3 months +"],
    storeOptions: ["Prototype TestFlight / Android Beta", "Publish on App Store + Play Store", "Not sure yet"],
    trust: [
      { title: "Reply in 24h", detail: "Budget + MVP scope" },
      { title: "Senior team", detail: "Design + build in one sprint" },
      { title: "Confidential", detail: "NDA on request" },
    ],
  },
  de: {
    you: "Du bist *", select: "Auswählen", company: "Unternehmen", individual: "Privatperson",
    companyName: "Firmenname (falls Unternehmen)", companyPh: "z. B. Studio Nova",
    fullName: "Vollständiger Name *", namePh: "z. B. Alex Müller", phone: "Telefon",
    idea: "Deine Idee / Dein Versprechen *", ideaPh: "z. B. Ernährungscoaching-App mit wöchentlichem Tracking und Audio-Inhalten.",
    platforms: "Zielplattformen *", features: "Kernfunktionen",
    flows: "Wie funktioniert es? *", flowsPh: "z. B. Onboarding in 3 Schritten, personalisierter Feed, Coach-Buchung.",
    mood: "Farben / visueller Stil *", moodPh: "z. B. dunkler Luxus, goldene Akzente.",
    tech: "Gewünschte Technologien oder APIs", techPh: "z. B. Supabase, Stripe, Notion, interne API...",
    store: "Veröffentlichung / Stores *", refs: "Referenz-Apps", timeline: "Zeitrahmen *", choose: "Auswählen",
    notes: "Anmerkungen", notesPh: "Einschränkungen, Team, Roadmap usw.", antispam: "Spam-Schutz",
    send: "MVP-Anfrage senden", sending: "Wird gesendet...", pdf: "Als PDF exportieren",
    free: "Kostenloses Angebot, Antwort innerhalb von 24 Stunden. Unverbindlich.",
    adjust: "Das MVP-Angebot wird an den tatsächlichen Umfang, die Prioritäten beim Start und die Validierungsstrategie angepasst.",
    needPlatform: "Wähle mindestens eine Plattform aus.", needIdea: "Beschreibe deine Idee kurz, damit wir antworten können.",
    sentOk: "Danke, Anfrage gesendet. Weiterleitung...", sendFail: "Die Anfrage konnte nicht gesendet werden. Prüfe deine Verbindung oder schreibe uns.",
    captchaFail: "Überprüfung fehlgeschlagen. Bitte erneut versuchen.",
    pdfTitle: "MVP-Anfrage", pdfSub: "Erstellt aus dem MVP-Formular", pdfFile: "kah-digital-mvp-anfrage.pdf",
    pdfLabels: ["Kundentyp", "Firmenname", "Vollständiger Name", "E-Mail", "Telefon", "Idee / Versprechen", "Plattformen", "Kernfunktionen", "Funktionsweise", "Visueller Stil", "Technologien / APIs", "Veröffentlichung / Stores", "Referenzen", "Budget", "Zeitrahmen", "Anmerkungen"],
    flowLabel: "Funktionsweise", moodLabel: "Visueller Stil", projectType: "Mobile MVP-App",
    platformOptions: ["iOS", "Android", "Beide"],
    featureOptions: ["Authentifizierung / Rollen", "In-App-Zahlung", "Buchung / Planung", "Chat / Community", "Push-Benachrichtigungen", "Offline-Modus", "Analytics-Tracking", "Sensor-Integration (GPS, Kamera)"],
    budgetOptions: ["Noch zu besprechen", "Begrenztes MVP-Budget", "Komfortables MVP-Budget", "Investition geplant", "Ich brauche Beratung"],
    timelineOptions: ["So schnell wie möglich", "4-6 Wochen", "6-10 Wochen", "3 Monate +"],
    storeOptions: ["Prototyp TestFlight / Android Beta", "Veröffentlichung im App Store + Play Store", "Noch unsicher"],
    trust: [
      { title: "Antwort in 24 Std.", detail: "Budget + MVP-Umfang" },
      { title: "Senior-Team", detail: "Design + Umsetzung in einem Sprint" },
      { title: "Vertraulich", detail: "NDA auf Anfrage" },
    ],
  },
};

const field =
  "w-full rounded-xl border border-white/12 bg-slate-950/60 px-4 py-3 text-white placeholder:text-white/40 transition-all duration-150 focus:border-sky-400/60 focus:bg-slate-950/80 focus:outline-none focus:ring-2 focus:ring-sky-500/20 hover:border-white/20";
const fieldSelect = `${field} [color-scheme:dark]`;
const check = "h-4 w-4 rounded border-white/40 bg-transparent accent-fuchsia-500 focus:ring-fuchsia-400/60";

export function MvpQuoteForm() {
  const router = useRouter();
  const { locale, prefix } = useLocale();
  const c = copy[locale];
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
  const formRef = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaError, setCaptchaError] = useState("");

  const exportPdf = () => {
    if (!formRef.current) return;
    const fd = new FormData(formRef.current);
    const list = (key: string) => fd.getAll(key).map(String).filter(Boolean).join(", ");
    const phoneRaw = String(fd.get("phone") ?? "").trim();
    const phoneValue = phoneRaw ? `${String(fd.get("phoneCountry") ?? "").trim()} ${phoneRaw}`.trim() : "";
    const raw = [
      String(fd.get("clientType") ?? ""), String(fd.get("companyName") ?? ""), String(fd.get("name") ?? ""),
      String(fd.get("email") ?? ""), phoneValue, String(fd.get("idea") ?? ""), list("mobilePlatforms"),
      list("mobileFeatures"), String(fd.get("flows") ?? ""), String(fd.get("visualMood") ?? ""),
      String(fd.get("techStack") ?? ""), String(fd.get("storeSupport") ?? ""), String(fd.get("inspirations") ?? ""),
      String(fd.get("budget") ?? ""), String(fd.get("timeline") ?? ""), String(fd.get("notes") ?? ""),
    ];
    const values: Array<[string, string]> = c.pdfLabels.map((label, i) => [label, raw[i]]);

    const doc = new jsPDF();
    drawKahDigitalPdfLogo(doc, 16, 10);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text(c.pdfTitle, 16, 42);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(c.pdfSub, 16, 49);
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
      const lines = doc.splitTextToSize(value && value.trim() ? value.trim() : "-", 170);
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

    doc.save(c.pdfFile);
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const fd = new FormData(form);
    const selectedPlatforms = fd.getAll("mobilePlatforms").map(String);
    const phoneRaw = String(fd.get("phone") ?? "").trim();
    const phoneValue = phoneRaw ? `${String(fd.get("phoneCountry") ?? "").trim()} ${phoneRaw}`.trim() : "";
    const goal = String(fd.get("idea") ?? "").trim();

    if (selectedPlatforms.length === 0) {
      setServerMessage(c.needPlatform);
      setStatus("error");
      return;
    }
    if (goal.length < 5) {
      setServerMessage(c.needIdea);
      setStatus("error");
      return;
    }

    // Captcha non bloquant : le widget Cloudflare peut ne pas se charger sur ce domaine, on envoie alors sans jeton (limites serveur).
    const payload = {
      name: String(fd.get("name") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      phone: phoneValue || undefined,
      clientType: String(fd.get("clientType") ?? "").trim() as "entreprise" | "particulier",
      companyName: String(fd.get("companyName") ?? "").trim() || undefined,
      projectType: c.projectType,
      goal,
      pages: [] as string[],
      mobilePlatforms: selectedPlatforms,
      mobileFeatures: fd.getAll("mobileFeatures").map(String),
      storeSupport: String(fd.get("storeSupport") ?? "").trim() || undefined,
      techPreferences: String(fd.get("techStack") ?? "").trim() || undefined,
      inspirations: String(fd.get("inspirations") ?? "").trim() || undefined,
      budget: String(fd.get("budget") ?? ""),
      timeline: String(fd.get("timeline") ?? ""),
      message: [
        `${c.flowLabel} : ${String(fd.get("flows") ?? "").trim() || "-"}`,
        `${c.moodLabel} : ${String(fd.get("visualMood") ?? "").trim() || "-"}`,
        `Notes : ${String(fd.get("notes") ?? "").trim() || "-"}`,
      ].join("\n"),
      projectFocus: "mobile" as const,
      website: String(fd.get("website") ?? "").trim() || undefined,
      turnstileToken: captchaToken || undefined,
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
        setCaptchaToken("");
        setStatus("error");
        setServerMessage(errorPayload?.error ?? c.sendFail);
        return;
      }

      setStatus("success");
      setServerMessage(c.sentOk);
      trackEvent("generate_lead", { form_name: "mvp", destination: "devis_mvp" });
      form.reset();
      setCaptchaToken("");
      window.setTimeout(() => {
        router.push(prefix ? `${prefix}/merci` : "/merci");
      }, 800);
    } catch (error) {
      console.error(error);
      setStatus("error");
      setServerMessage(c.sendFail);
    }
  }

  const isSubmitting = status === "loading";

  return (
    <form
      ref={formRef}
      className="premium-card relative overflow-hidden rounded-[36px] border border-white/15 bg-gradient-to-br from-[#0b0c23] via-[#170f32] to-[#2a1854] p-6 text-white shadow-[0_35px_120px_rgba(72,33,128,0.45)] sm:p-8"
      onSubmit={handleSubmit}
    >
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-fuchsia-500/15 blur-3xl" />
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" defaultValue="" />
      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        {c.trust.map((item) => (
          <div key={item.title} className="rounded-2xl border border-white/15 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">{item.title}</p>
            <p className="mt-2 text-sm text-white/70">{item.detail}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="clientType" className="text-sm text-white/70">{c.you}</label>
          <select id="clientType" name="clientType" required className={fieldSelect} defaultValue="">
            <option value="" disabled>{c.select}</option>
            <option value="entreprise">{c.company}</option>
            <option value="particulier">{c.individual}</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="companyName" className="text-sm text-white/70">{c.companyName}</label>
          <input id="companyName" name="companyName" className={field} placeholder={c.companyPh} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm text-white/70">{c.fullName}</label>
          <input id="name" name="name" required className={field} placeholder={c.namePh} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm text-white/70">{locale === "de" ? "E-Mail *" : "Email *"}</label>
          <input id="email" type="email" name="email" required className={field} placeholder="contact@company.com" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className="text-sm text-white/70">{c.phone}</label>
          <div className="flex flex-wrap gap-3">
            <select
              id="phoneCountry"
              name="phoneCountry"
              aria-label={c.phone}
              defaultValue="+41"
              className="min-w-[170px] rounded-2xl border border-white/20 bg-gray-900 px-3 py-3 text-white [color-scheme:dark] focus:border-white/40 focus:outline-none"
            >
              {countryDialCodesSorted.map((entry) => (
                <option key={entry.iso} value={entry.code}>
                  {entry.country} ({entry.code})
                </option>
              ))}
            </select>
            <input id="phone" name="phone" inputMode="tel" className={`min-w-[200px] flex-1 ${field}`} placeholder="00 00 00 00 00" />
          </div>
        </div>
        <div className="md:col-span-2 flex flex-col gap-2">
          <label htmlFor="idea" className="text-sm text-white/70">{c.idea}</label>
          <textarea id="idea" name="idea" required rows={3} className={field} placeholder={c.ideaPh} />
        </div>
        <fieldset className="premium-card md:col-span-2 space-y-3 rounded-3xl border border-white/15 bg-white/5 p-4 text-sm text-white/80">
          <legend className="px-1 text-xs uppercase tracking-[0.4em] text-white/60">{c.platforms}</legend>
          <div className="flex flex-wrap gap-3">
            {c.platformOptions.map((platform) => (
              <label key={platform} className="flex items-center gap-2">
                <input type="checkbox" name="mobilePlatforms" value={platform} className={check} />
                {platform}
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset className="premium-card md:col-span-2 space-y-3 rounded-3xl border border-white/15 bg-white/5 p-4 text-sm text-white/80">
          <legend className="px-1 text-xs uppercase tracking-[0.4em] text-white/60">{c.features}</legend>
          <div className="grid gap-3 md:grid-cols-2">
            {c.featureOptions.map((feature) => (
              <label key={feature} className="flex items-center gap-2">
                <input type="checkbox" name="mobileFeatures" value={feature} className={check} />
                {feature}
              </label>
            ))}
          </div>
        </fieldset>
        <div className="flex flex-col gap-2">
          <label htmlFor="flows" className="text-sm text-white/70">{c.flows}</label>
          <textarea id="flows" name="flows" required rows={3} className={field} placeholder={c.flowsPh} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="visualMood" className="text-sm text-white/70">{c.mood}</label>
          <input id="visualMood" name="visualMood" required className={field} placeholder={c.moodPh} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="techStack" className="text-sm text-white/70">{c.tech}</label>
          <input id="techStack" name="techStack" className={field} placeholder={c.techPh} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="storeSupport" className="text-sm text-white/70">{c.store}</label>
          <select id="storeSupport" name="storeSupport" required className={fieldSelect} defaultValue="">
            <option value="" disabled>{c.select}</option>
            {c.storeOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="inspirations" className="text-sm text-white/70">{c.refs}</label>
          <input id="inspirations" name="inspirations" className={field} placeholder="Headspace, Uber, Notion..." />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="budget" className="text-sm text-white/70">Budget *</label>
          <select id="budget" name="budget" required className={fieldSelect} defaultValue="">
            <option value="" disabled>{c.select}</option>
            {c.budgetOptions.map((value) => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="timeline" className="text-sm text-white/70">{c.timeline}</label>
          <select id="timeline" name="timeline" required className={fieldSelect} defaultValue="">
            <option value="" disabled>{c.choose}</option>
            {c.timelineOptions.map((value) => (
              <option key={value} value={value}>{value}</option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2 flex flex-col gap-2">
          <label htmlFor="notes" className="text-sm text-white/70">{c.notes}</label>
          <textarea id="notes" name="notes" rows={4} className={field} placeholder={c.notesPh} />
        </div>
      </div>
      {siteKey && (
        <div className="mt-6 space-y-2 text-sm text-white/70">
          <TurnstileWidget
            siteKey={siteKey}
            onVerify={(token) => {
              setCaptchaToken(token);
              setCaptchaError("");
            }}
            onExpire={() => setCaptchaToken("")}
            onError={() => setCaptchaError(c.captchaFail)}
          />
          {captchaError && <p className="text-rose-200">{captchaError}</p>}
        </div>
      )}
      <div className="mt-6 flex flex-col gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-400 to-violet-500 px-6 py-3.5 font-bold text-slate-950 shadow-lg shadow-fuchsia-500/25 transition-all hover:gap-3 hover:shadow-fuchsia-500/40 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:gap-2"
        >
          {isSubmitting ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950/30 border-t-slate-950" />
              {c.sending}
            </>
          ) : (
            c.send
          )}
        </button>
        <button
          type="button"
          onClick={exportPdf}
          className="inline-flex w-full items-center justify-center rounded-full border border-white/15 px-6 py-3 text-white/80 transition hover:border-white/30 hover:text-white"
        >
          {c.pdf}
        </button>
        <p className="text-xs text-white/60">{c.free}</p>
        <p className="text-xs text-white/55">{c.adjust}</p>
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
