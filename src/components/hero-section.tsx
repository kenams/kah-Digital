"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "@/lib/locale";
import { FiArrowRight, FiMessageCircle, FiPlay } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";

const WA_NUMBER = "33759558414";

/* ─── Word-by-word masked reveal ─────────────────────────────────────────── */
function WordReveal({
  text,
  delay = 0,
  className = "",
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] mr-[0.22em] last:mr-0"
        >
          <motion.span
            className={`inline-block ${className}`}
            initial={{ y: "115%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
              delay: delay + i * 0.08,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </>
  );
}

/* ─── Floating proof card ────────────────────────────────────────────────── */
function FloatCard({
  title,
  value,
  sub,
  color,
  className = "",
  refEl,
}: {
  title: string;
  value: string;
  sub: string;
  color: string;
  className?: string;
  refEl: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      ref={refEl}
      className={`pointer-events-none absolute hidden lg:block ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-2xl border border-white/[0.08] px-4 py-3.5 backdrop-blur-xl"
        style={{
          background: "rgba(8,9,14,0.82)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.04)",
        }}
      >
        <div className="mb-2 flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
          <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-gray-500">
            {title}
          </span>
        </div>
        <div className="text-[22px] font-black leading-none text-white">{value}</div>
        <div className="mt-0.5 text-[11px] text-gray-500">{sub}</div>
      </motion.div>
    </div>
  );
}

/* ─── Rotating gradient text ─────────────────────────────────────────────── */
function RotatingText({
  lines,
  delay = 0,
}: {
  lines: string[];
  delay?: number;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => {
      const id = setInterval(() => setIndex((i) => (i + 1) % lines.length), 3200);
      return () => clearInterval(id);
    }, delay * 1000 + 1800);
    return () => clearTimeout(t);
  }, [lines.length, delay]);

  return (
    <span className="relative inline-block overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          className="inline-block bg-gradient-to-r from-blue-400 via-violet-400 to-purple-500 bg-clip-text text-transparent gradient-animated"
          initial={{ y: 48, opacity: 0, filter: "blur(10px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -48, opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {lines[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* ─── Section ────────────────────────────────────────────────────────────── */
export function HeroSection() {
  const { locale, prefix } = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  // Mouse parallax — paused via IntersectionObserver when off-screen
  useEffect(() => {
    let tx = 0, ty = 0, x = 0, y = 0;
    let raf: number;
    let visible = true;

    const obs = new IntersectionObserver(
      ([e]) => { visible = e.isIntersecting; },
      { threshold: 0 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);

    const onMove = (e: MouseEvent) => {
      if (!visible) return;
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const tick = () => {
      if (visible) {
        x += (tx - x) * 0.045;
        y += (ty - y) * 0.045;
        const c1 = card1Ref.current;
        const c2 = card2Ref.current;
        const c3 = card3Ref.current;
        if (c1) c1.style.transform = `translate(${x * 22}px, ${y * 14}px)`;
        if (c2) c2.style.transform = `translate(${x * -18}px, ${y * -12}px)`;
        if (c3) c3.style.transform = `translate(${x * 28}px, ${y * 20}px)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      obs.disconnect();
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const copy =
    locale === "en"
      ? {
          live: "Studio open · Reply in 2h",
          title1: "We build the systems",
          lines2: [
            "that grow your business.",
            "that generate qualified leads.",
            "that automate your growth.",
            "that convert your visitors.",
          ],
          body: "Premium website in 5 days, full AI system in 28 days. Fixed price, zero surprises. Quote accepted → we launch in 48h.",
          primary: "Get my free quote",
          secondary: "See results",
          wa: "WhatsApp — reply in 2h",
          waText: "Hi KAH Digital, I'd like a quote for my project.",
          trustLine: "70+ projects delivered · From $142 · AI from $349 · Launch in 48h",
          proof: [
            { value: "$142", label: "From" },
            { value: "5 days", label: "First delivery" },
            { value: "24h", label: "Quote response" },
            { value: "100%", label: "On-budget" },
          ],
          cards: [
            { title: "Restaurant · Geneva", value: "+30%", sub: "bookings online", color: "#f97316" },
            { title: "FinTech Startup · Lausanne", value: "98/100", sub: "Lighthouse score", color: "#0ea5e9" },
            { title: "Law firm · Lausanne", value: "#1", sub: "Google local", color: "#ec4899" },
          ],
        }
      : locale === "de"
      ? {
          live: "Studio offen · Antwort in 2h",
          title1: "Wir bauen die Systeme,",
          lines2: [
            "die Ihr Unternehmen wachsen lassen.",
            "die qualifizierte Leads generieren.",
            "die Ihr Wachstum automatisieren.",
            "die Ihre Besucher konvertieren.",
          ],
          body: "Premium-Website in 5 Tagen, vollständiges KI-System in 28 Tagen. Fester Preis, null Überraschungen. Freigabe → Start in 48h.",
          primary: "Kostenlose Offerte",
          secondary: "Ergebnisse ansehen",
          wa: "WhatsApp — Antwort in 2h",
          waText: "Hallo KAH Digital, ich möchte eine Offerte für mein Projekt.",
          trustLine: "70+ Projekte · Ab CHF 149 · KI ab CHF 350 · Start in 48h",
          proof: [
            { value: "CHF 149", label: "Ab" },
            { value: "5 Tage", label: "Erste Lieferung" },
            { value: "24h", label: "Angebotsantwort" },
            { value: "100%", label: "Budget" },
          ],
          cards: [
            { title: "Restaurant · Genf", value: "+30%", sub: "Online-Reservierungen", color: "#f97316" },
            { title: "FinTech · Lausanne", value: "98/100", sub: "Lighthouse Score", color: "#0ea5e9" },
            { title: "Anwaltskanzlei", value: "#1", sub: "Google lokal", color: "#ec4899" },
          ],
        }
      : {
          live: "Studio ouvert · Réponse en 2h",
          title1: "On construit les systèmes",
          lines2: [
            "qui font croître votre business.",
            "qui génèrent des prospects qualifiés.",
            "qui automatisent votre croissance.",
            "qui convertissent vos visiteurs.",
          ],
          body: "Site premium en 5 jours, système IA complet en 28 jours. Prix fixe, zéro surprise. Devis validé → on démarre en 48h.",
          primary: "Obtenir mon devis gratuit",
          secondary: "Voir les résultats",
          wa: "WhatsApp — réponse en 2h",
          waText: "Bonjour KAH Digital, je voudrais un devis pour mon projet.",
          trustLine: "70+ projets livrés · Sites dès 142 € · Systèmes IA dès 349 € · Démarrage en 48h",
          proof: [
            { value: "142 €", label: "Dès" },
            { value: "5 jours", label: "1ère livraison" },
            { value: "24h", label: "Délai de réponse" },
            { value: "100%", label: "Budget respecté" },
          ],
          cards: [
            { title: "Restaurant · Genève", value: "+30%", sub: "réservations en ligne", color: "#f97316" },
            { title: "Startup FinTech · Lausanne", value: "98/100", sub: "Lighthouse score", color: "#0ea5e9" },
            { title: "Cabinet juridique", value: "#1", sub: "Google local Lausanne", color: "#ec4899" },
          ],
        };

  const withPrefix = (path: string) => (prefix ? `${prefix}${path}` : path);
  const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(copy.waText)}`;

  return (
    <section ref={sectionRef} className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#030304]">

      {/* ── Noise texture — absolute (not fixed) to avoid full-page composite layer ── */}
      <svg
        className="pointer-events-none absolute inset-0 z-[1] h-full w-full opacity-[0.032]"
        aria-hidden="true"
      >
        <filter id="kah-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#kah-noise)" />
      </svg>

      {/* ── Aurora blobs ──────────────────────────────────────────────────── */}
      <div className="aurora-1 absolute -top-60 left-[8%] h-[700px] w-[700px] rounded-full bg-blue-600/[0.1] blur-[90px]" />
      <div className="aurora-2 absolute -top-32 right-[3%] h-[600px] w-[600px] rounded-full bg-violet-600/[0.09] blur-[80px]" />
      <div className="aurora-3 absolute bottom-[-4rem] left-[28%] h-[480px] w-[480px] rounded-full bg-cyan-500/[0.06] blur-[65px]" />
      <div className="aurora-4 absolute bottom-[8%] left-[-2%] h-[380px] w-[380px] rounded-full bg-indigo-500/[0.065] blur-[60px]" />

      {/* ── Grid ──────────────────────────────────────────────────────────── */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:72px_72px]" />

      {/* ── Vignette edges ─────────────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_40%,rgba(3,3,4,0.6)_100%)]" />

      {/* ── Floating proof cards ──────────────────────────────────────────── */}
      <FloatCard
        refEl={card1Ref}
        title={copy.cards[0].title}
        value={copy.cards[0].value}
        sub={copy.cards[0].sub}
        color={copy.cards[0].color}
        className="top-[16%] right-[3%] rotate-[6deg] xl:right-[6%]"
      />
      <FloatCard
        refEl={card2Ref}
        title={copy.cards[1].title}
        value={copy.cards[1].value}
        sub={copy.cards[1].sub}
        color={copy.cards[1].color}
        className="top-[42%] left-[1%] rotate-[-5deg] xl:left-[4%]"
      />
      <FloatCard
        refEl={card3Ref}
        title={copy.cards[2].title}
        value={copy.cards[2].value}
        sub={copy.cards[2].sub}
        color={copy.cards[2].color}
        className="bottom-[20%] right-[2%] rotate-[3deg] xl:right-[5%]"
      />

      {/* ── Main content ──────────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 py-32 text-center sm:px-6 lg:px-8">

        {/* Live badge */}
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="shimmer-badge mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/[0.08] px-5 py-2 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-gray-400">
            {copy.live}
          </span>
        </motion.div>

        {/* Headline — line 1 (word-by-word reveal) */}
        <h1 className="mb-6 text-5xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-[4.5rem]">
          <span className="block">
            <WordReveal text={copy.title1} delay={0.1} />
          </span>

          {/* Line 2 — rotating gradient text */}
          <span className="mt-1 block min-h-[1.2em]">
            <RotatingText lines={copy.lines2} delay={0.4} />
          </span>
        </h1>

        {/* Body */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-gray-400"
        >
          {copy.body}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link
            href={withPrefix("/devis")}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-8 py-4 font-semibold text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:gap-3 hover:shadow-blue-500/50 hover:scale-[1.02]"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-violet-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span className="relative">{copy.primary}</span>
            <FiArrowRight size={16} className="relative transition-transform group-hover:translate-x-0.5" />
          </Link>

          <Link
            href={withPrefix("/projets")}
            className="inline-flex items-center gap-2 rounded-full border border-white/[0.14] px-8 py-4 font-semibold text-white transition-all duration-300 hover:border-white/30 hover:bg-white/[0.05] hover:scale-[1.02]"
          >
            <FiPlay size={13} />
            {copy.secondary}
          </Link>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[#25D366]/25 bg-[#25D366]/[0.08] px-8 py-4 font-semibold text-[#25D366] transition-all duration-300 hover:bg-[#25D366]/[0.16] hover:scale-[1.02]"
          >
            <FiMessageCircle size={15} />
            {copy.wa}
          </a>
        </motion.div>

        {/* Trust line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-8 text-sm text-gray-600"
        >
          {copy.trustLine}
        </motion.p>

        {/* Proof stats */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {copy.proof.map(({ value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.25 + i * 0.08 }}
              className="flex flex-col items-center gap-1 rounded-2xl border border-white/[0.07] bg-white/[0.03] px-4 py-3 backdrop-blur-sm transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.05]"
            >
              <span className="text-2xl font-extrabold text-white">{value}</span>
              <span className="text-xs text-gray-500">{label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Tech logos */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-5"
        >
          <span className="text-xs text-gray-700">Built with</span>
          {["Next.js", "Vercel", "Stripe", "Supabase", "OpenAI"].map((logo) => (
            <span
              key={logo}
              className="text-xs font-semibold text-gray-700 transition-colors duration-200 hover:text-gray-400"
            >
              {logo}
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── Scroll indicator ──────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-700">Scroll</span>
          <div className="h-8 w-[1px] overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-4 w-full bg-gradient-to-b from-transparent to-white/40"
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      </motion.div>

    </section>
  );
}
