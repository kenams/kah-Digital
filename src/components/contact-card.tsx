"use client";

import Link from "next/link";
import { brandContact } from "@/config/brand";
import { useLocale } from "@/lib/locale";

type ContactCardProps = {
  title?: string;
  className?: string;
};

export function ContactCard({ title, className = "" }: ContactCardProps) {
  const { locale } = useLocale();
  const copy = {
    fr: {
      title: "Conciergerie privee",
      email: "Email direct:",
      phone: "Telephone direct:",
      note: "Numero temporaire avant activation du numero suisse.",
      reply: "Reponse sous 24h. Brief express possible par Slack ou WhatsApp.",
    },
    en: {
      title: "Direct contact",
      email: "Direct email:",
      phone: "Direct phone:",
      note: "Temporary number before Swiss line activation.",
      reply: "Reply within 24h. Quick brief possible via Slack or WhatsApp.",
    },
    de: {
      title: "Direkter Kontakt",
      email: "Direkte E-Mail:",
      phone: "Direkte Telefonnummer:",
      note: "Temporäre Nummer, bis die Schweizer Linie aktiv ist.",
      reply: "Antwort innerhalb von 24 Stunden. Kurzes Briefing per Slack oder WhatsApp möglich.",
    },
  }[locale];
  const resolvedTitle = title ?? copy.title;

  return (
    <div
      className={`premium-card rounded-3xl border border-white/10 bg-white/5 p-5 text-white shadow-[0_20px_70px_rgba(0,0,0,0.35)] ${className}`}
    >
      <p className="text-xs uppercase tracking-[0.3em] text-white/60">{resolvedTitle}</p>
      <div className="mt-3 space-y-2 text-sm text-white/80">
        <p>
          {copy.email}{" "}
          <Link href={`mailto:${brandContact.email}`} className="font-semibold text-white hover:underline">
            {brandContact.email}
          </Link>
        </p>
        <p>
          {copy.phone}{" "}
          <Link href={`tel:${brandContact.phoneHref}`} className="font-semibold text-white hover:underline">
            {brandContact.phone}
          </Link>
        </p>
        <p className="text-xs text-white/50">{copy.note}</p>
        <p className="text-xs text-white/60">{copy.reply}</p>
      </div>
    </div>
  );
}
