import Link from "next/link";
import { brandContact } from "@/config/brand";

type ContactCardProps = {
  title?: string;
  className?: string;
};

export function ContactCard({ title = "Canal direct", className = "" }: ContactCardProps) {
  return (
    <div
      className={`rounded-3xl border border-white/10 bg-white/5 p-5 text-white shadow-[0_20px_70px_rgba(0,0,0,0.35)] ${className}`}
    >
      <p className="text-xs uppercase tracking-[0.3em] text-white/60">{title}</p>
      <div className="mt-3 space-y-2 text-sm text-white/80">
        <p>
          Email:{" "}
          <Link href={`mailto:${brandContact.email}`} className="font-semibold text-white hover:underline">
            {brandContact.email}
          </Link>
        </p>
        <p>
          Telephone:{" "}
          <Link href={`tel:${brandContact.phoneHref}`} className="font-semibold text-white hover:underline">
            {brandContact.phone}
          </Link>
        </p>
        <p className="text-xs text-white/60">
          Reponse promise sous 24h - briefing express possible par Slack ou WhatsApp.
        </p>
      </div>
    </div>
  );
}
