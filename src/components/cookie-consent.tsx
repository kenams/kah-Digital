"use client";

import Link from "next/link";
import Script from "next/script";
import { useCallback, useEffect, useState } from "react";
import { useLocale } from "@/lib/locale";

const STORAGE_KEY = "kah-consent-v1";
const OPEN_EVENT = "kah-open-cookie-settings";
// CNIL : le choix doit être renouvelé périodiquement ; on redemande après 6 mois.
const MAX_AGE_MS = 1000 * 60 * 60 * 24 * 182;

type Choice = "granted" | "denied";

const COPY = {
  fr: {
    title: "Vos choix sur les cookies",
    body: "Nous mesurons l'audience du site avec Google Analytics, uniquement si vous l'acceptez. Sans votre accord, aucun traceur n'est déposé et aucune donnée n'est envoyée à Google.",
    refuse: "Tout refuser",
    accept: "Tout accepter",
    policy: "Politique de confidentialité",
    policyHref: "/confidentialite",
  },
  en: {
    title: "Your cookie choices",
    body: "We measure site audience with Google Analytics, only if you accept. Without your consent, no tracker is set and no data is sent to Google.",
    refuse: "Reject all",
    accept: "Accept all",
    policy: "Privacy policy",
    policyHref: "/en/politique-de-confidentialite",
  },
  de: {
    title: "Ihre Cookie-Auswahl",
    body: "Wir messen die Reichweite der Website mit Google Analytics, nur mit Ihrer Einwilligung. Ohne Ihre Zustimmung wird kein Tracker gesetzt und werden keine Daten an Google gesendet.",
    refuse: "Alle ablehnen",
    accept: "Alle akzeptieren",
    policy: "Datenschutzerklärung",
    policyHref: "/confidentialite",
  },
} as const;

function readChoice(): Choice | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { choice?: string; ts?: number };
    if ((parsed.choice !== "granted" && parsed.choice !== "denied") || typeof parsed.ts !== "number") return null;
    if (Date.now() - parsed.ts > MAX_AGE_MS) return null;
    return parsed.choice;
  } catch {
    return null;
  }
}

function storeChoice(choice: Choice) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ choice, ts: Date.now() }));
  } catch {
    /* stockage indisponible : le choix vaut pour la page en cours */
  }
}

export function CookieConsent({ gaId: rawGaId }: { gaId: string }) {
  // Une variable d'environnement saisie avec un retour à la ligne casserait le script inline : on nettoie et on valide.
  const cleanGaId = (rawGaId ?? "").trim();
  const gaId = /^G-[A-Z0-9]{4,20}$/.test(cleanGaId) ? cleanGaId : "";
  const { locale } = useLocale();
  const c = COPY[locale];
  const [ready, setReady] = useState(false);
  const [choice, setChoice] = useState<Choice | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const stored = readChoice();
    setChoice(stored);
    setOpen(stored === null);
    setReady(true);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  const decide = useCallback((next: Choice) => {
    storeChoice(next);
    setChoice(next);
    setOpen(false);
    if (next === "denied") {
      // Retrait du consentement : on supprime les cookies de mesure déjà déposés.
      for (const name of document.cookie.split(";").map((p) => p.split("=")[0]?.trim() ?? "")) {
        if (name === "_ga" || name.startsWith("_ga_") || name === "_gid" || name === "_gat") {
          document.cookie = `${name}=; Max-Age=0; path=/`;
          document.cookie = `${name}=; Max-Age=0; path=/; domain=${window.location.hostname}`;
          document.cookie = `${name}=; Max-Age=0; path=/; domain=.${window.location.hostname.replace(/^www\./, "")}`;
        }
      }
    }
  }, []);

  const focusRing =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0b12]";

  return (
    <>
      {/* Google Analytics : chargé uniquement après acceptation explicite. */}
      {ready && choice === "granted" && gaId ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'granted' });
gtag('js', new Date());
gtag('config', '${gaId}', { anonymize_ip: true });`}
          </Script>
        </>
      ) : null}

      {ready && open ? (
        <div
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-consent-title"
          aria-describedby="cookie-consent-body"
          className="fixed inset-x-3 bottom-3 z-[2147483000] mx-auto max-w-xl rounded-2xl border border-white/15 bg-[#0b0b12]/95 p-5 shadow-2xl backdrop-blur sm:inset-x-auto sm:bottom-5 sm:left-5 sm:mx-0"
        >
          <h2 id="cookie-consent-title" className="text-base font-bold text-white">
            {c.title}
          </h2>
          <p id="cookie-consent-body" className="mt-2 text-sm leading-relaxed text-gray-300">
            {c.body}{" "}
            <Link href={c.policyHref} className={`font-semibold text-white underline underline-offset-4 ${focusRing}`}>
              {c.policy}
            </Link>
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => decide("denied")}
              className={`rounded-full border border-white/30 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-white/10 ${focusRing}`}
            >
              {c.refuse}
            </button>
            <button
              type="button"
              onClick={() => decide("granted")}
              className={`rounded-full border border-white/30 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-white/10 ${focusRing}`}
            >
              {c.accept}
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

export function CookieSettingsButton({ label, className }: { label: string; className?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}>
      {label}
    </button>
  );
}
