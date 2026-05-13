"use client";

import { useLocale } from "@/lib/locale";
import { FiCalendar, FiMessageCircle, FiCheck } from "react-icons/fi";

const WA_NUMBER = "33759558414";

export function FreeCallSection() {
  const { locale } = useLocale();

  const copy = {
    fr: {
      label: "Appel découverte gratuit",
      title: "15 minutes pour clarifier ton projet.",
      subtitle: "Pas de pitch. Pas de vendeur. Juste Kénan — on regarde ton projet ensemble et tu repars avec un plan clair.",
      items: [
        "Budget estimé sur mesure",
        "Délai réaliste garanti",
        "Conseils tech gratuits",
        "Zéro engagement",
      ],
      cta: "Réserver 15 min sur WhatsApp",
      waText: "Bonjour Kénan, je voudrais réserver un appel découverte de 15 min pour discuter de mon projet.",
      note: "Réponse sous 2h en semaine · Disponible CH / FR / BE",
      calendar: {
        title: "Appel 15 min",
        subtitle: "Gratuit · Sans engagement",
        available: "Libre",
        confirm: "→ Confirme ton créneau via WhatsApp",
        slots: [
          { day: "Lun 9 juin", time: "10h00", available: true },
          { day: "Mar 10 juin", time: "14h30", available: true },
          { day: "Mer 11 juin", time: "09h00", available: false },
          { day: "Jeu 12 juin", time: "11h00", available: true },
        ],
      },
    },
    en: {
      label: "Free discovery call",
      title: "15 minutes to clarify your project.",
      subtitle: "No pitch. No sales rep. Just Kénan — we look at your project together and you leave with a clear plan.",
      items: [
        "Custom budget estimate",
        "Realistic guaranteed timeline",
        "Free tech advice",
        "Zero commitment",
      ],
      cta: "Book 15 min on WhatsApp",
      waText: "Hi Kénan, I'd like to book a free 15-min discovery call to discuss my project.",
      note: "Reply within 2h on weekdays · Available CH / FR / BE",
      calendar: {
        title: "15-min call",
        subtitle: "Free · No commitment",
        available: "Open",
        confirm: "→ Confirm your slot on WhatsApp",
        slots: [
          { day: "Mon 9 Jun", time: "10:00", available: true },
          { day: "Tue 10 Jun", time: "14:30", available: true },
          { day: "Wed 11 Jun", time: "09:00", available: false },
          { day: "Thu 12 Jun", time: "11:00", available: true },
        ],
      },
    },
    de: {
      label: "Kostenloses Erstgespräch",
      title: "15 Minuten für Ihr Projekt.",
      subtitle: "Kein Pitch. Kein Verkäufer. Nur Kénan — wir schauen uns Ihr Projekt gemeinsam an.",
      items: [
        "Individuelle Kostenschätzung",
        "Realistischer Zeitplan",
        "Kostenlose Tech-Beratung",
        "Keine Verpflichtung",
      ],
      cta: "15 Min auf WhatsApp buchen",
      waText: "Hallo Kénan, ich möchte einen kostenlosen 15-Minuten-Anruf buchen.",
      note: "Antwort innerhalb von 2h · Verfügbar CH / DE",
      calendar: {
        title: "15-Min.-Anruf",
        subtitle: "Kostenlos · Unverbindlich",
        available: "Frei",
        confirm: "→ Termin per WhatsApp bestätigen",
        slots: [
          { day: "Mo. 9. Juni", time: "10:00", available: true },
          { day: "Di. 10. Juni", time: "14:30", available: true },
          { day: "Mi. 11. Juni", time: "09:00", available: false },
          { day: "Do. 12. Juni", time: "11:00", available: true },
        ],
      },
    },
  }[locale];

  const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(copy.waText)}`;

  return (
    <section className="relative bg-gradient-to-b from-blue-950/40 to-gray-950 border-y border-blue-500/15 py-14">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:gap-16">

          {/* Left — texte */}
          <div className="flex-1 text-center md:text-left">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400" />
              {copy.label}
            </span>
            <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {copy.title}
            </h2>
            <p className="mb-6 text-base leading-relaxed text-gray-400">
              {copy.subtitle}
            </p>
            <ul className="mb-8 space-y-2">
              {copy.items.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-gray-300">
                  <FiCheck size={14} className="shrink-0 text-emerald-400" />
                  {item}
                </li>
              ))}
            </ul>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-[#25D366] px-7 py-3.5 text-base font-bold text-white shadow-xl shadow-black/30 transition hover:brightness-110 hover:shadow-green-500/20"
            >
              <FiMessageCircle size={18} />
              {copy.cta}
            </a>
            <p className="mt-3 text-xs text-gray-500">{copy.note}</p>
          </div>

          {/* Right — card visuelle */}
          <div className="w-full max-w-xs shrink-0">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/15">
                  <FiCalendar size={18} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{copy.calendar.title}</p>
                  <p className="text-xs text-gray-500">{copy.calendar.subtitle}</p>
                </div>
              </div>
              <div className="space-y-2">
                {copy.calendar.slots.map((slot) => (
                  <div
                    key={slot.day}
                    className={`flex items-center justify-between rounded-lg px-3 py-2 text-xs ${
                      slot.available
                        ? "border border-blue-500/25 bg-blue-500/8 text-blue-200"
                        : "border border-white/5 bg-white/[0.02] text-gray-600 line-through"
                    }`}
                  >
                    <span>{slot.day}</span>
                    <span className="font-semibold">{slot.time}</span>
                    {slot.available && (
                      <span className="rounded-full bg-emerald-500/20 px-1.5 py-0.5 text-[10px] text-emerald-400">{copy.calendar.available}</span>
                    )}
                  </div>
                ))}
              </div>
              <p className="mt-4 text-center text-xs text-gray-500">
                {copy.calendar.confirm}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
