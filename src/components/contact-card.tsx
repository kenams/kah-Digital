"use client";

import Link from "next/link";
import { brandContact } from "@/config/brand";
import { useLocale } from "@/lib/locale";

type ContactCardProps = {
  title?: string;
  className?: string;
};

export function ContactCard({ title, className = "" }: ContactCardProps) {
  const { isEnglish } = useLocale();
  const resolvedTitle = title ?? (isEnglish ? "Direct contact" : "Conciergerie privee");

  return (
    <div
      className={`premium-card rounded-3xl border border-white/10 bg-white/5 p-5 text-white shadow-[0_20px_70px_rgba(0,0,0,0.35)] ${className}`}
    >
      <p className="text-xs uppercase tracking-[0.3em] text-white/60">{resolvedTitle}</p>
      <div className="mt-3 space-y-2 text-sm text-white/80">
        <p>
          {isEnglish ? "Direct email:" : "Email direct:"}{" "}
          <Link href={`mailto:${brandContact.email}`} className="font-semibold text-white hover:underline">
            {brandContact.email}
          </Link>
        </p>
        <p>
          {isEnglish ? "Direct phone:" : "Telephone direct:"}{" "}
          <Link href={`tel:${brandContact.phoneHref}`} className="font-semibold text-white hover:underline">
            {brandContact.phone}
          </Link>
        </p>
        <p className="text-xs text-white/50">
          {isEnglish ? "Temporary number before Swiss line activation." : "Numero temporaire avant activation du numero suisse."}
        </p>
        <p className="text-xs text-white/60">
          {isEnglish
            ? "Reply within 24h. Quick brief possible via Slack or WhatsApp."
            : "Reponse sous 24h. Brief express possible par Slack ou WhatsApp."}
        </p>
      </div>
    </div>
  );
}
