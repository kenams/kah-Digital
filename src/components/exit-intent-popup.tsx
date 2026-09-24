"use client";

import { useState, useEffect, useRef } from "react";
import { FiX, FiArrowRight, FiCheck } from "react-icons/fi";
import { useLocale } from "@/lib/locale";

const popupCopy = {
  fr: {
    badge: "Offre limitée",
    title: "Audit gratuit de votre site avant de partir",
    body: "En 2 minutes, on analyse votre site web et on vous envoie un rapport complet : vitesse, SEO, mobile, conversions.",
    placeholder_company: "Nom de votre entreprise",
    placeholder_website: "URL de votre site (ex: votre-site.fr)",
    placeholder_email: "Votre email *",
    cta: "Recevoir mon audit gratuit",
    loading: "Analyse en cours…",
    footer: "Résultats par email · Aucun engagement · 100% gratuit",
    success_title: "Votre audit arrive !",
    success_body: "Vérifiez votre boîte mail dans quelques minutes. On analyse votre site gratuitement.",
    close: "Fermer",
  },
  en: {
    badge: "Limited offer",
    title: "Free site audit before you leave",
    body: "In 2 minutes, we analyse your website and send you a full report: speed, SEO, mobile, conversions.",
    placeholder_company: "Your company name",
    placeholder_website: "Your website URL (e.g. your-site.com)",
    placeholder_email: "Your email *",
    cta: "Get my free audit",
    loading: "Analysing…",
    footer: "Results by email · No commitment · 100% free",
    success_title: "Your audit is on its way!",
    success_body: "Check your inbox in a few minutes. We're analysing your site for free.",
    close: "Close",
  },
  de: {
    badge: "Begrenztes Angebot",
    title: "Kostenlose Website-Analyse bevor Sie gehen",
    body: "In 2 Minuten analysieren wir Ihre Website und senden einen vollständigen Bericht: Geschwindigkeit, SEO, Mobile, Conversions.",
    placeholder_company: "Ihr Unternehmensname",
    placeholder_website: "Ihre Website-URL (z.B. ihre-seite.de)",
    placeholder_email: "Ihre E-Mail *",
    cta: "Meine kostenlose Analyse erhalten",
    loading: "Wird analysiert…",
    footer: "Ergebnisse per E-Mail · Keine Verpflichtung · 100% kostenlos",
    success_title: "Ihre Analyse ist unterwegs!",
    success_body: "Schauen Sie in wenigen Minuten in Ihren Posteingang. Wir analysieren Ihre Website kostenlos.",
    close: "Schließen",
  },
} as const;

export default function ExitIntentPopup() {
  const { locale } = useLocale();
  const copy = popupCopy[locale];

  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [website, setWebsite] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const triggered = useRef(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("exit_popup_dismissed");
    if (dismissed) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10 && !triggered.current) {
        triggered.current = true;
        setVisible(true);
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const delta = e.touches[0].clientY - touchStartY;
      if (delta > 80 && !triggered.current) {
        triggered.current = true;
        setVisible(true);
      }
    };

    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
      document.addEventListener("touchstart", handleTouchStart);
      document.addEventListener("touchmove", handleTouchMove);
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem("exit_popup_dismissed", "1");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const rawWebsite = website.trim();
      const normalizedWebsite = rawWebsite && !rawWebsite.startsWith("http")
        ? `https://${rawWebsite}`
        : rawWebsite;
      await fetch("/api/audit-gratuit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, businessName: businessName || "Non renseigné", website: normalizedWebsite, phone: "" }),
      });
      setSubmitted(true);
      sessionStorage.setItem("exit_popup_dismissed", "1");
    } finally {
      setLoading(false);
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" style={{ cursor: "none" }}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={dismiss} />
      <div className="relative w-full max-w-md overflow-hidden rounded-[24px] border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.5)] backdrop-blur sm:p-8">
        <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-sky-500/10 blur-3xl" />
        <button
          onClick={dismiss}
          aria-label={copy.close}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-white/50 transition hover:bg-white/10 hover:text-white"
        >
          <FiX size={20} />
        </button>

        {submitted ? (
          <div className="relative py-4 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15">
              <FiCheck size={28} className="text-emerald-400" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">{copy.success_title}</h3>
            <p className="text-sm text-white/60">{copy.success_body}</p>
          </div>
        ) : (
          <div className="relative">
            <div className="mb-1 inline-block rounded-full border border-rose-500/30 bg-rose-500/10 px-3 py-1 text-xs font-semibold text-rose-300">
              {copy.badge}
            </div>
            <h2 className="mb-2 mt-3 text-2xl font-extrabold text-white">{copy.title}</h2>
            <p className="mb-6 text-sm leading-relaxed text-white/60">{copy.body}</p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder={copy.placeholder_company}
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full rounded-xl border border-white/12 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-white/40 transition-all duration-150 focus:border-sky-400/60 focus:bg-slate-950/80 focus:outline-none focus:ring-2 focus:ring-sky-500/20 hover:border-white/20"
              />
              <input
                type="text"
                placeholder={copy.placeholder_website}
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full rounded-xl border border-white/12 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-white/40 transition-all duration-150 focus:border-sky-400/60 focus:bg-slate-950/80 focus:outline-none focus:ring-2 focus:ring-sky-500/20 hover:border-white/20"
              />
              <input
                type="email"
                required
                placeholder={copy.placeholder_email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-white/12 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-white/40 transition-all duration-150 focus:border-sky-400/60 focus:bg-slate-950/80 focus:outline-none focus:ring-2 focus:ring-sky-500/20 hover:border-white/20"
              />
              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-400 to-blue-500 px-6 py-3.5 font-bold text-slate-950 shadow-lg shadow-sky-500/25 transition-all hover:gap-3 hover:shadow-sky-500/40 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:gap-2"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950/30 border-t-slate-950" />
                    {copy.loading}
                  </>
                ) : (
                  <>
                    <span>{copy.cta}</span>
                    <FiArrowRight size={15} />
                  </>
                )}
              </button>
            </form>
            <p className="mt-3 text-center text-xs text-white/40">{copy.footer}</p>
          </div>
        )}
      </div>
    </div>
  );
}
