"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { TurnstileWidget } from "@/components/turnstile-widget";

// ─── Catalogue ─────────────────────────────────────────────────────────────────

type Unit = "forfait" | "month" | "hour";

type Service = {
  id: string;
  emoji: string;
  label: Record<"fr" | "en", string>;
  shortDesc: Record<"fr" | "en", string>;
  scopeLabel: Record<"fr" | "en", string>;
  delayLabel: Record<"fr" | "en", string>;
  projectType: Record<"fr" | "en", string>;
  budget: string;
};

const SERVICES: Service[] = [
  {
    id: "landing",
    emoji: "🚀",
    label:      { fr: "Landing page",         en: "Landing page" },
    shortDesc:  { fr: "1 page percutante avec CTA clair",         en: "1-page site with a clear call-to-action" },
    scopeLabel: { fr: "Projet simple", en: "Simple project" },
    delayLabel: { fr: "5–10 jours",            en: "5–10 days" },
    projectType:{ fr: "Landing page",          en: "Landing page" },
    budget: "À définir après échange",
  },
  {
    id: "site-vitrine",
    emoji: "🌐",
    label:      { fr: "Site vitrine",          en: "Business website" },
    shortDesc:  { fr: "5–8 pages, SEO, formulaire contact",       en: "5–8 pages, SEO, contact form" },
    scopeLabel: { fr: "Présence professionnelle", en: "Professional presence" },
    delayLabel: { fr: "2–3 semaines",          en: "2–3 weeks" },
    projectType:{ fr: "Site vitrine standard", en: "Standard business website" },
    budget: "À définir après échange",
  },
  {
    id: "site-premium",
    emoji: "✨",
    label:      { fr: "Site corporate / premium", en: "Corporate / premium website" },
    shortDesc:  { fr: "10–20 pages, SEO avancé, CRM",             en: "10–20 pages, advanced SEO, CRM" },
    scopeLabel: { fr: "Projet évolutif", en: "Scalable project" },
    delayLabel: { fr: "3–5 semaines",          en: "3–5 weeks" },
    projectType:{ fr: "Site corporate / premium", en: "Corporate / premium website" },
    budget: "À définir après échange",
  },
  {
    id: "ecommerce",
    emoji: "🛒",
    label:      { fr: "Boutique en ligne",     en: "Online store" },
    shortDesc:  { fr: "Catalogue produits, paiement Stripe",      en: "Product catalog, Stripe payments" },
    scopeLabel: { fr: "Périmètre à cadrer", en: "Scope to define" },
    delayLabel: { fr: "3–8 semaines",          en: "3–8 weeks" },
    projectType:{ fr: "E-commerce",            en: "E-commerce" },
    budget: "À définir après échange",
  },
  {
    id: "outil-metier",
    emoji: "⚙️",
    label:      { fr: "Outil métier / Dashboard", en: "Business tool / Dashboard" },
    shortDesc:  { fr: "App interne, gestion données, rôles",      en: "Internal app, data management, roles" },
    scopeLabel: { fr: "Projet sur mesure", en: "Custom project" },
    delayLabel: { fr: "4–10 semaines",         en: "4–10 weeks" },
    projectType:{ fr: "Outil web métier",      en: "Business web tool" },
    budget: "À définir après échange",
  },
  {
    id: "refonte",
    emoji: "🔄",
    label:      { fr: "Refonte de site",       en: "Website redesign" },
    shortDesc:  { fr: "Moderniser un site existant",              en: "Modernise an existing website" },
    scopeLabel: { fr: "Diagnostic préalable", en: "Initial diagnosis" },
    delayLabel: { fr: "2–4 semaines",          en: "2–4 weeks" },
    projectType:{ fr: "Refonte de site",       en: "Website redesign" },
    budget: "À définir après échange",
  },
  {
    id: "app-mobile",
    emoji: "📱",
    label:      { fr: "Application mobile",   en: "Mobile app" },
    shortDesc:  { fr: "iOS + Android, MVP fonctionnel",           en: "iOS + Android, working MVP" },
    scopeLabel: { fr: "MVP à cadrer", en: "MVP to scope" },
    delayLabel: { fr: "6–12 semaines",         en: "6–12 weeks" },
    projectType:{ fr: "Application mobile MVP", en: "Mobile app MVP" },
    budget: "À définir après échange",
  },
  {
    id: "saas",
    emoji: "☁️",
    label:      { fr: "SaaS / Produit web",   en: "SaaS / Web product" },
    shortDesc:  { fr: "Auth, paiement, dashboard client",         en: "Auth, payments, client dashboard" },
    scopeLabel: { fr: "Produit évolutif", en: "Scalable product" },
    delayLabel: { fr: "8–12 semaines",         en: "8–12 weeks" },
    projectType:{ fr: "SaaS MVP",             en: "SaaS MVP" },
    budget: "À définir après échange",
  },
  {
    id: "ia",
    emoji: "🤖",
    label:      { fr: "IA / Chatbot",         en: "AI / Chatbot" },
    shortDesc:  { fr: "Intégration IA, assistant, automatisation", en: "AI integration, assistant, automation" },
    scopeLabel: { fr: "Automatisation adaptée", en: "Adapted automation" },
    delayLabel: { fr: "2–6 semaines",          en: "2–6 weeks" },
    projectType:{ fr: "Chatbot / Intégration IA", en: "Chatbot / AI integration" },
    budget: "À définir après échange",
  },
  {
    id: "autre",
    emoji: "💬",
    label:      { fr: "Autre / Je ne sais pas", en: "Other / Not sure" },
    shortDesc:  { fr: "Décrivez votre idée, on vous oriente",     en: "Describe your idea, we'll guide you" },
    scopeLabel: { fr: "Devis personnalisé", en: "Custom quote" },
    delayLabel: { fr: "À définir",             en: "To be defined" },
    projectType:{ fr: "Autre projet",          en: "Other project" },
    budget: "Budget à définir",
  },
];

const COPY = {
  fr: {
    step1: "Étape 1",
    step1Title: "Quel projet avez-vous ?",
    step2: "Étape 2",
    step2Title: "Vos coordonnées",
    projectTitle: "Décrivez votre projet",
    name: "Nom",
    email: "Email",
    company: "Entreprise",
    companyHint: "optionnel",
    phone: "Téléphone",
    phoneHint: "optionnel",
    namePlaceholder: "Jean Dupont",
    emailPlaceholder: "jean@entreprise.fr",
    companyPlaceholder: "ACME SAS",
    phonePlaceholder: "+33 6 …",
    messagePlaceholder: "Ex. : Je gère un restaurant à Lyon et j'ai besoin d'un site moderne avec la carte en ligne, un formulaire de réservation et une galerie photos. Je voudrais qu'il soit rapide sur mobile et bien visible sur Google.",
    messageLabel: "Ce que vous souhaitez",
    timelineLabel: "Délai souhaité",
    timelineDefault: "Sélectionner…",
    timelines: ["Le plus tôt possible", "Dans le mois", "Dans 1 à 3 mois", "Dans 3 à 6 mois", "Pas de deadline précise"],
    recap: "Votre demande",
    service: "Service",
    estimation: "Type de besoin",
    contact: "Contact",
    delay: "Délai souhaité",
    noService: "Non sélectionné",
    reassurance: [
      { icon: "⚡", label: "Réponse sous 24h", sub: "Jours ouvrés" },
      { icon: "🔒", label: "Sans engagement", sub: "Aucune obligation" },
      { icon: "💬", label: "Estimation adaptée", sub: "Selon votre besoin" },
      { icon: "🌍", label: "France & Suisse", sub: "Remote ou présentiel" },
    ],
    submit: "Demander mon devis personnalisé → Réponse sous 24h",
    submitting: "Envoi en cours…",
    disclaimer: "Sans engagement · Vos données ne sont pas revendues · RGPD",
    captchaError: "Merci de valider le captcha.",
    noServiceError: "Veuillez choisir un type de projet.",
    networkError: "Erreur réseau. Réessayez.",
  },
  en: {
    step1: "Step 1",
    step1Title: "What project do you have?",
    step2: "Step 2",
    step2Title: "Your details",
    projectTitle: "Describe your project",
    name: "Name",
    email: "Email",
    company: "Company",
    companyHint: "optional",
    phone: "Phone",
    phoneHint: "optional",
    namePlaceholder: "John Smith",
    emailPlaceholder: "john@company.com",
    companyPlaceholder: "ACME Ltd",
    phonePlaceholder: "+44 7…",
    messagePlaceholder: "E.g. I run a restaurant in London and need a modern website with an online menu, a booking form and a photo gallery. I'd like it to be fast on mobile and rank well on Google.",
    messageLabel: "What you need",
    timelineLabel: "Desired timeline",
    timelineDefault: "Select…",
    timelines: ["As soon as possible", "Within the month", "Within 1–3 months", "Within 3–6 months", "No specific deadline"],
    recap: "Your request",
    service: "Service",
    estimation: "Need type",
    contact: "Contact",
    delay: "Desired timeline",
    noService: "Not selected",
    reassurance: [
      { icon: "⚡", label: "Reply within 24h", sub: "Business days" },
      { icon: "🔒", label: "No commitment", sub: "Completely free" },
      { icon: "💬", label: "Adapted estimate", sub: "Based on your need" },
      { icon: "🌍", label: "France & Switzerland", sub: "Remote or on-site" },
    ],
    submit: "Request my custom quote → Reply within 24h",
    submitting: "Sending…",
    disclaimer: "No commitment · Your data is never sold · GDPR",
    captchaError: "Please complete the captcha.",
    noServiceError: "Please choose a project type.",
    networkError: "Network error. Please try again.",
  },
} as const;

// ─── Component ─────────────────────────────────────────────────────────────────

export function SmartQuoteForm({
  locale = "fr",
  defaultCompany = "",
  defaultSite = "",
}: {
  locale?: "fr" | "en";
  defaultCompany?: string;
  defaultSite?: string;
}) {
  const router = useRouter();
  const c = COPY[locale];
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

  const [selectedService, setSelectedService] = useState<string | null>(null);
  const defaultMessage = defaultSite ? (locale === "en" ? `My current site: ${defaultSite}. ` : `Mon site actuel : ${defaultSite}. `) : "";
  const [form, setForm] = useState({ name: "", email: "", companyName: defaultCompany, phone: "", message: defaultMessage, timeline: "" });
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaError, setCaptchaError] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState("");

  const service = SERVICES.find((s) => s.id === selectedService);

  function update(key: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedService) { setServerMessage(c.noServiceError); setStatus("error"); return; }
    if (!captchaToken) { setCaptchaError(c.captchaError); return; }

    setStatus("loading");
    setCaptchaError("");

    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        companyName: form.companyName.trim() || undefined,
        phone: form.phone.trim() || undefined,
        projectType: service?.projectType[locale] ?? "Other",
        goal: form.message.trim() || `Quote request: ${service?.label[locale]}`,
        budget: service?.budget ?? "To be defined",
        timeline: form.timeline || "Not specified",
        message: form.message.trim() || undefined,
        turnstileToken: captchaToken,
      };

      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push(locale === "en" ? "/en/merci" : "/merci");
      } else {
        const data = await res.json() as { error?: string };
        setServerMessage(data.error ?? "An error occurred.");
        setStatus("error");
      }
    } catch {
      setServerMessage(c.networkError);
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">

      {defaultSite && (
        <div className="flex items-center gap-3 rounded-xl border border-sky-500/20 bg-sky-500/8 px-4 py-3 text-sm text-sky-300">
          <span className="text-base">🔍</span>
          <span>
            {locale === "en" ? "Site analysed:" : "Site analysé :"}{" "}
            <strong className="text-white">{defaultSite}</strong>
          </span>
        </div>
      )}

      {/* ── Step 1 : Service ── */}
      <div>
        <p className="mb-1 text-xs font-bold uppercase tracking-widest text-white/40">{c.step1}</p>
        <h2 className="mb-5 text-xl font-bold text-white">{c.step1Title}</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {SERVICES.map((s) => {
            const active = selectedService === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => setSelectedService(s.id)}
                className={`relative flex flex-col items-center gap-2 rounded-2xl border p-4 text-center transition-all ${
                  active
                    ? "border-sky-500 bg-sky-500/15 shadow-[0_0_0_2px_rgba(14,165,233,0.5)]"
                    : "border-white/10 bg-white/5 hover:border-sky-400/40 hover:bg-sky-500/8"
                }`}
              >
                <span className="text-2xl">{s.emoji}</span>
                <span className={`text-sm font-semibold leading-tight ${active ? "text-sky-300" : "text-white"}`}>
                  {s.label[locale]}
                </span>
                <span className={`text-[11px] leading-tight ${active ? "text-sky-200/80" : "text-white/45"}`}>
                  {s.scopeLabel[locale]}
                </span>
                {active && (
                  <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-sky-500 text-[10px] font-black text-white">✓</span>
                )}
              </button>
            );
          })}
        </div>

        {service && (
          <div className="mt-4 flex items-center gap-4 rounded-2xl border border-sky-500/25 bg-sky-500/8 px-5 py-4">
            <span className="text-3xl">{service.emoji}</span>
            <div className="flex-1">
              <p className="font-semibold text-white">{service.label[locale]}</p>
              <p className="text-sm text-white/60">{service.shortDesc[locale]}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-sky-400">{service.scopeLabel[locale]}</p>
              <p className="text-xs text-white/45">{service.delayLabel[locale]}</p>
            </div>
          </div>
        )}
      </div>

      {/* ── Step 2 : Details + Recap ── */}
      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <div className="space-y-5">
          <div>
            <p className="mb-1 text-xs font-bold uppercase tracking-widest text-white/40">{c.step2}</p>
            <h2 className="mb-4 text-xl font-bold text-white">{c.step2Title}</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { key: "name",        label: c.name,    placeholder: c.namePlaceholder,    type: "text",  required: true },
                { key: "email",       label: c.email,   placeholder: c.emailPlaceholder,   type: "email", required: true },
                { key: "companyName", label: c.company, placeholder: c.companyPlaceholder, type: "text",  hint: c.companyHint },
                { key: "phone",       label: c.phone,   placeholder: c.phonePlaceholder,   type: "tel",   hint: c.phoneHint },
              ].map(({ key, label, placeholder, type, required, hint }) => (
                <label key={key} className="block">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/50">
                    {label}
                    {required && <span className="ml-1 text-sky-400">*</span>}
                    {hint && <span className="ml-1 font-normal normal-case tracking-normal text-white/30">({hint})</span>}
                  </span>
                  <input
                    type={type}
                    required={required}
                    value={form[key as keyof typeof form]}
                    onChange={(e) => update(key as keyof typeof form, e.target.value)}
                    placeholder={placeholder}
                    className="w-full rounded-xl border border-white/10 bg-white/8 px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/25"
                  />
                </label>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-4 text-xl font-bold text-white">{c.projectTitle}</h2>
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/50">
                {c.messageLabel} <span className="text-sky-400">*</span>
              </span>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                placeholder={c.messagePlaceholder}
                className="w-full resize-y rounded-xl border border-white/10 bg-white/8 px-4 py-3 text-sm leading-6 text-white placeholder-white/30 outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/25"
              />
            </label>
          </div>

          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-white/50">
              {c.timelineLabel}
            </span>
            <select
              value={form.timeline}
              onChange={(e) => update("timeline", e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#0d1525] px-4 py-3 text-sm text-white outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/25"
            >
              <option value="">{c.timelineDefault}</option>
              {c.timelines.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </label>
        </div>

        {/* Recap sidebar */}
        <div className="h-fit rounded-2xl border border-white/10 bg-white/5 p-5 lg:sticky lg:top-24">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-white/40">{c.recap}</p>
          <div className="space-y-3">
            <div className="rounded-xl border border-white/8 bg-white/5 p-3">
              <p className="mb-1 text-xs text-white/40">{c.service}</p>
              {service ? (
                <div className="flex items-center gap-2">
                  <span className="text-lg">{service.emoji}</span>
                  <span className="text-sm font-semibold text-white">{service.label[locale]}</span>
                </div>
              ) : (
                <p className="text-sm italic text-white/30">{c.noService}</p>
              )}
            </div>

            {service && (
              <div className="rounded-xl border border-sky-500/20 bg-sky-500/8 p-3">
                <p className="mb-1 text-xs text-sky-400/70">{c.estimation}</p>
                <p className="text-lg font-black text-sky-400">{service.scopeLabel[locale]}</p>
                <p className="mt-0.5 text-xs text-white/40">{service.delayLabel[locale]}</p>
              </div>
            )}

            {form.name && (
              <div className="rounded-xl border border-white/8 bg-white/5 p-3">
                <p className="mb-1 text-xs text-white/40">{c.contact}</p>
                <p className="text-sm font-semibold text-white">{form.name}</p>
                {form.companyName && <p className="text-xs text-white/50">{form.companyName}</p>}
                {form.email && <p className="text-xs text-white/50">{form.email}</p>}
              </div>
            )}

            {form.timeline && (
              <div className="rounded-xl border border-white/8 bg-white/5 p-3">
                <p className="mb-1 text-xs text-white/40">{c.delay}</p>
                <p className="text-sm text-white">{form.timeline}</p>
              </div>
            )}
          </div>
          <div className="mt-5 space-y-2 text-xs text-white/40">
            <p>✓ {c.reassurance[0]?.label}</p>
            <p>✓ {c.reassurance[1]?.label}</p>
            <p>✓ {c.reassurance[2]?.label}</p>
          </div>
        </div>
      </div>

      {/* Captcha + Submit */}
      <div className="space-y-4">
        {siteKey && (
          <div>
            <TurnstileWidget siteKey={siteKey} onVerify={setCaptchaToken} onExpire={() => setCaptchaToken("")} onError={() => setCaptchaError(c.captchaError)} />
            {captchaError && <p className="mt-2 text-sm text-rose-400">{captchaError}</p>}
          </div>
        )}

        {serverMessage && status === "error" && (
          <p className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
            {serverMessage}
          </p>
        )}

        <button
          type="submit"
          disabled={status === "loading" || !selectedService}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#2ea8ff,#1d4ed8)] px-6 py-4 text-base font-bold text-white shadow-[0_12px_40px_rgba(46,168,255,0.35)] transition hover:brightness-105 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "loading" ? `⟳ ${c.submitting}` : c.submit}
        </button>

        <p className="text-center text-xs text-white/30">{c.disclaimer}</p>
      </div>
    </form>
  );
}
