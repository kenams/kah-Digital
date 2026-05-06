import type { Metadata } from "next";
import Link from "next/link";
import { brandContact } from "@/config/brand";
import { FiCheck, FiArrowRight, FiMail, FiPhone, FiCalendar, FiMessageCircle } from "react-icons/fi";
import { TrackConversion } from "@/components/track-conversion";

export const metadata: Metadata = {
  title: "Merci",
  robots: { index: false, follow: false },
};

export default function MerciPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950 px-4 py-20">
      <TrackConversion event="conversion" params={{ page: "merci", locale: "fr" }} />
      <div className="w-full max-w-lg text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 ring-1 ring-emerald-500/30">
          <FiCheck size={32} className="text-emerald-400" />
        </div>
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-emerald-400">Demande reçue</p>
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-white">Merci, c'est bien envoyé.</h1>
        <p className="mb-10 text-lg text-gray-400">
          Je reviens vers toi sous 24h avec un retour clair : budget, délai et recommandations. Pas de blabla.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://wa.me/33759558414?text=Bonjour%20Kénan%2C%20je%20viens%20de%20vous%20envoyer%20une%20demande%20et%20je%20voudrais%20en%20discuter%20rapidement."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-black/20 transition hover:brightness-110"
          >
            <FiMessageCircle size={14} />
            Discuter sur WhatsApp
          </a>
          <a
            href={`tel:${brandContact.phoneHref}`}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
          >
            <FiPhone size={14} />
            Appeler
          </a>
          <a
            href={`mailto:${brandContact.email}`}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
          >
            <FiMail size={14} />
            Écrire un email
          </a>
          {brandContact.calendlyUrl && (
            <a
              href={brandContact.calendlyUrl}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:opacity-90"
            >
              <FiCalendar size={14} />
              Planifier un appel
            </a>
          )}
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
          >
            Retour à l'accueil
            <FiArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
