"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname, getLocalePrefix } from "@/lib/locale";

const copy = {
  fr: {
    kicker: "Page introuvable",
    title: "Cette page n'existe pas.",
    text: "L'adresse est peut-être erronée, ou la page a changé de place. Repartons du bon pied.",
    home: "Retour à l'accueil",
    links: [
      ["/offres", "Voir les offres"],
      ["/projets", "Nos réalisations"],
      ["/devis", "Demander un devis"],
      ["/contact", "Nous écrire"],
    ],
  },
  en: {
    kicker: "Page not found",
    title: "This page doesn't exist.",
    text: "The address may be wrong, or the page may have moved. Let's get you back on track.",
    home: "Back to home",
    links: [
      ["/offres", "See the offers"],
      ["/projets", "Our work"],
      ["/devis", "Request a quote"],
      ["/contact", "Contact us"],
    ],
  },
  de: {
    kicker: "Seite nicht gefunden",
    title: "Diese Seite gibt es nicht.",
    text: "Die Adresse stimmt vielleicht nicht, oder die Seite wurde verschoben. Wir bringen Sie zurück.",
    home: "Zur Startseite",
    links: [
      ["/offres", "Angebote ansehen"],
      ["/projets", "Unsere Projekte"],
      ["/devis", "Angebot anfragen"],
      ["/contact", "Kontakt"],
    ],
  },
} as const;

export function NotFoundContent() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const prefix = getLocalePrefix(locale);
  const t = copy[locale];

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-start justify-center px-6 py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#d6b36a]">404 · {t.kicker}</p>
      <h1 className="mt-5 text-4xl font-bold leading-tight text-[#f5f1e8] sm:text-5xl" style={{ fontFamily: "var(--font-syne)" }}>
        {t.title}
      </h1>
      <p className="mt-5 max-w-lg text-base leading-relaxed text-[#b7b1a5]">{t.text}</p>
      <a
        href={prefix || "/"}
        className="mt-9 inline-flex items-center rounded-full bg-[#d6b36a] px-7 py-3 text-sm font-semibold text-[#0a0908] transition hover:bg-[#e3c585] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d6b36a]"
      >
        {t.home}
      </a>
      <nav aria-label="Liens utiles" className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-6 text-sm">
        {t.links.map(([href, label]) => (
          <a key={href} href={`${prefix}${href}`} className="text-[#b7b1a5] underline-offset-4 transition hover:text-[#f5f1e8] hover:underline focus-visible:text-[#f5f1e8]">
            {label}
          </a>
        ))}
      </nav>
    </main>
  );
}
