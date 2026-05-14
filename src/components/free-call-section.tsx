"use client";

import { useLocale } from "@/lib/locale";
import { FiCalendar, FiMessageCircle, FiCheck } from "react-icons/fi";

const WA_NUMBER = "33759558414";

function generateSlots(locale: string) {
  const lang = locale === "en" ? "en-GB" : "fr-CH";
  const times = ["10:00", "14:30", "09:00", "11:00"];
  const availability = [true, true, false, true];
  const slots: { day: string; time: string; available: boolean }[] = [];

  const d = new Date();
  d.setDate(d.getDate() + 1);

  while (slots.length < 4) {
    const dow = d.getDay();
    if (dow !== 0 && dow !== 6) {
      slots.push({
        day: new Intl.DateTimeFormat(lang, {
          weekday: "short",
          day: "numeric",
          month: "short",
        }).format(new Date(d)),
        time: times[slots.length],
        available: availability[slots.length],
      });
    }
    d.setDate(d.getDate() + 1);
  }
  return slots;
}

export function FreeCallSection() {
  const { locale } = useLocale();

  const copy = locale === "en"
    ? {
        label: "Free discovery call",
        title: "15 minutes to clarify your project.",
        subtitle: "No pitch. No sales rep. Just Kénan — we look at your project together and you leave with a clear plan.",
        items: ["Custom budget estimate", "Realistic guaranteed timeline", "Free tech advice", "Zero commitment"],
        cta: "Book 15 min on WhatsApp",
        waText: "Hi Kénan, I'd like to book a free 15-min discovery call to discuss my project.",
        note: "Reply within 2h on weekdays · Available CH / FR / BE",
        callTitle: "15 min call",
        callSubtitle: "Free · No commitment",
        confirmSlot: "Confirm your slot via WhatsApp",
        available: "Available",
      }
    : {
        label: "Appel découverte gratuit",
        title: "15 minutes pour clarifier votre projet.",
        subtitle: "Pas de pitch. Pas de vendeur. Juste Kénan — on regarde votre projet ensemble et vous repartez avec un plan clair.",
        items: ["Budget estimé sur mesure", "Délai réaliste garanti", "Conseils tech gratuits", "Zéro engagement"],
        cta: "Réserver 15 min sur WhatsApp",
        waText: "Bonjour Kénan, je voudrais réserver un appel découverte de 15 min pour discuter de mon projet.",
        note: "Réponse sous 2h en semaine · Disponible CH / FR / BE",
        callTitle: "Appel 15 min",
        callSubtitle: "Gratuit · Sans engagement",
        confirmSlot: "Confirmez votre créneau via WhatsApp",
        available: "Libre",
      };

  const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(copy.waText)}`;
  const slots = generateSlots(locale);

  return (
    <section className="relative bg-gradient-to-b from-blue-950/40 to-gray-950 border-y border-blue-500/15 py-14">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:gap-16">

          <div className="flex-1 text-center md:text-left">
            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-300">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-400" />
              {copy.label}
            </span>
            <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {copy.title}
            </h2>
            <p className="mb-6 text-base leading-relaxed text-gray-400">{copy.subtitle}</p>
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

          <div className="w-full max-w-xs shrink-0">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/15">
                  <FiCalendar size={18} className="text-blue-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{copy.callTitle}</p>
                  <p className="text-xs text-gray-500">{copy.callSubtitle}</p>
                </div>
              </div>
              <div className="space-y-2">
                {slots.map((slot) => (
                  <div
                    key={slot.day}
                    className={`flex items-center justify-between rounded-lg px-3 py-2 text-xs ${
                      slot.available
                        ? "border border-blue-500/25 bg-blue-500/8 text-blue-200"
                        : "border border-white/5 bg-white/[0.02] text-gray-600 line-through"
                    }`}
                  >
                    <span className="capitalize">{slot.day}</span>
                    <span className="font-semibold">{slot.time}</span>
                    {slot.available && (
                      <span className="rounded-full bg-emerald-500/20 px-1.5 py-0.5 text-[10px] text-emerald-400">
                        {copy.available}
                      </span>
                    )}
                  </div>
                ))}
              </div>
              <p className="mt-4 text-center text-xs text-gray-500">→ {copy.confirmSlot}</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
