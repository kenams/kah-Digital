"use client";

import { useMemo, useState } from "react";
import type { MouseEvent } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import type { ConfigSummary } from "@/types/configurator";

type ConfiguratorPreviewProps = {
  summary: ConfigSummary;
  features: string[];
  integrations: string[];
  aiModules: string[];
  ready: boolean;
};

type LayoutKind = "vitrine" | "blog" | "shop" | "saas" | "event" | "portal";

type Palette = {
  canvas: string;
  panel: string;
  surface: string;
  accent: string;
  glow: string;
  muted: string;
};

const normalizeText = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

const detectLayout = (typeLabel: string): LayoutKind => {
  const text = normalizeText(typeLabel);
  if (text.includes("boutique") || text.includes("shop") || text.includes("store")) return "shop";
  if (text.includes("blog") || text.includes("magazine")) return "blog";
  if (text.includes("saas") || text.includes("produit") || text.includes("product")) return "saas";
  if (text.includes("evenement") || text.includes("event")) return "event";
  if (text.includes("portail") || text.includes("portal") || text.includes("client")) return "portal";
  return "vitrine";
};

const pickPalette = (moodLabel: string): Palette => {
  const mood = normalizeText(moodLabel);
  if (mood.includes("minimal")) {
    return {
      canvas: "#0f0f12",
      panel: "#1b1b22",
      surface: "#262631",
      accent: "#d5b97a",
      glow: "#f6e6c5",
      muted: "#8a8f9c",
    };
  }
  if (mood.includes("vibrant") || mood.includes("colore") || mood.includes("color")) {
    return {
      canvas: "#0b1020",
      panel: "#121a2c",
      surface: "#1a2844",
      accent: "#ff7b6b",
      glow: "#63b5ff",
      muted: "#97a3ba",
    };
  }
  if (mood.includes("editorial")) {
    return {
      canvas: "#141312",
      panel: "#1f1c19",
      surface: "#2c2822",
      accent: "#86a986",
      glow: "#d6c9a5",
      muted: "#a19a8d",
    };
  }
  if (mood.includes("dark")) {
    return {
      canvas: "#0a0c12",
      panel: "#111827",
      surface: "#182235",
      accent: "#2ee6a6",
      glow: "#6ec1ff",
      muted: "#7b8bbd",
    };
  }
  return {
    canvas: "#0f121a",
    panel: "#171c28",
    surface: "#212838",
    accent: "#6ee7ff",
    glow: "#8b7bff",
    muted: "#93a0b8",
  };
};

export function ConfiguratorPreview({ summary, features, integrations, aiModules, ready }: ConfiguratorPreviewProps) {
  const [copied, setCopied] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const shareText = useMemo(() => {
    const lines = [
      `Type: ${summary.type}`,
      `Vision: ${summary.strategy}`,
      `Style: ${summary.mood}`,
      `Fonctionnalités: ${features.length ? features.join(", ") : "Aucune"}`,
      `Intégrations: ${integrations.length ? integrations.join(", ") : "Aucune"}`,
      `Modules IA: ${aiModules.length ? aiModules.join(", ") : "Aucun"}`,
    ];
    return lines.join("\n");
  }, [summary, features, integrations, aiModules]);

  const layout = useMemo(() => detectLayout(summary.type), [summary.type]);
  const palette = useMemo(() => pickPalette(summary.mood), [summary.mood]);
  const tags = useMemo(() => {
    const combined = [...features, ...integrations, ...aiModules].map((item) => item.trim()).filter(Boolean);
    if (combined.length > 0) return combined.slice(0, 3);
    return [summary.strategy, summary.mood].filter((item) => item && item !== "-").slice(0, 2);
  }, [features, integrations, aiModules, summary]);
  const moduleCount = useMemo(() => {
    const count = Math.round((features.length + integrations.length + aiModules.length) / 2);
    return Math.min(3, Math.max(1, count));
  }, [features, integrations, aiModules]);

  const pulseOpacity = ready ? [0.55, 1, 0.55] : [0.35, 0.6, 0.35];
  const floatOffset = ready ? [0, -3, 0] : [0, -2, 0];
  const slowPulse = { duration: 3.6, repeat: Infinity, ease: "easeInOut" } as const;
  const fastPulse = { duration: 2.4, repeat: Infinity, ease: "easeInOut" } as const;
  const floatLoop = { duration: 5.5, repeat: Infinity, ease: "easeInOut" } as const;
  const hoverPulse = isHovering ? [0.65, 1, 0.65] : pulseOpacity;
  const hoverScale = isHovering ? [1, 1.08, 1] : [1, 1.04, 1];

  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const shiftX = useMotionValue(0);
  const shiftY = useMotionValue(0);
  const tiltXS = useSpring(tiltX, { stiffness: 140, damping: 18 });
  const tiltYS = useSpring(tiltY, { stiffness: 140, damping: 18 });
  const shiftXS = useSpring(shiftX, { stiffness: 120, damping: 20 });
  const shiftYS = useSpring(shiftY, { stiffness: 120, damping: 20 });

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    tiltX.set(-y * 8);
    tiltY.set(x * 8);
    shiftX.set(x * 12);
    shiftY.set(y * 12);
  };

  const handleLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
    shiftX.set(0);
    shiftY.set(0);
    setIsHovering(false);
  };

  const handleEnter = () => {
    setIsHovering(true);
  };

  async function copySummary() {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (error) {
      console.error(error);
      setCopied(false);
    }
  }

  const list = (items: string[]) =>
    items.length === 0 ? (
      <p className="text-sm text-white/50">Aucune option sélectionnée.</p>
    ) : (
      <ul className="mt-3 space-y-2 text-white/80">
        {items.map((value) => (
          <li key={value} className="flex items-start gap-2 text-sm">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/50" />
            <span>{value}</span>
          </li>
        ))}
      </ul>
    );

  return (
    <div className="premium-card rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 to-white/0 p-6 text-white shadow-[0_25px_70px_rgba(0,0,0,0.45)]">
      <div className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.4em] text-white/60">Aperçu configurateur</p>
        <h3 className="text-2xl font-semibold">Brief prêt à partager</h3>
        <p className="text-sm text-white/70">
          {ready
            ? "Tu peux le copier/coller dans Notion, Slack ou le formulaire de devis."
            : "Complète les étapes pour activer l'aperçu complet."}
        </p>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-4">
        <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.3em] text-white/60">
          <span>Aperçu visuel</span>
          <span className="rounded-full border border-white/20 px-3 py-1 text-[0.6rem] text-white/70">
            {summary.type}
          </span>
        </div>
        <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-3">
          <div
            className="aspect-[16/10] w-full"
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            onMouseEnter={handleEnter}
            style={{ perspective: "900px" }}
          >
            <motion.div
              className="h-full w-full"
              style={{ rotateX: tiltXS, rotateY: tiltYS, transformStyle: "preserve-3d" }}
            >
              <motion.svg
                viewBox="0 0 640 400"
                className="h-full w-full"
                role="img"
                aria-label="Aperçu dynamique du configurateur"
                style={{ transformStyle: "preserve-3d" }}
              >
                <defs>
                  <linearGradient id="previewGlow" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor={palette.accent} stopOpacity="0.9" />
                    <stop offset="100%" stopColor={palette.glow} stopOpacity="0.9" />
                  </linearGradient>
                  <linearGradient id="previewImage" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor={palette.glow} stopOpacity="0.9" />
                    <stop offset="100%" stopColor={palette.accent} stopOpacity="0.85" />
                  </linearGradient>
                </defs>
                <rect x="0" y="0" width="640" height="400" rx="26" fill={palette.canvas} />
                <rect x="18" y="18" width="604" height="364" rx="22" fill={palette.panel} />

                <motion.g style={{ x: shiftXS, y: shiftYS }}>
                  <rect x="40" y="40" width="560" height="40" rx="12" fill={palette.surface} />
                  {[0, 1, 2, 3].map((index) => (
                    <rect
                      key={`nav-${index}`}
                      x={70 + index * 68}
                      y="52"
                      width={index === 0 ? 52 : 44}
                      height="16"
                      rx="8"
                      fill={index === 0 ? "url(#previewGlow)" : palette.muted}
                      opacity={index === 0 ? 1 : 0.55}
                    />
                  ))}
                  <rect x="430" y="52" width="90" height="16" rx="8" fill={palette.muted} opacity="0.35" />
                  <motion.rect
                    x="528"
                    y="50"
                    width="62"
                    height="20"
                    rx="10"
                    fill="url(#previewGlow)"
                    style={{ transformOrigin: "50% 50%" }}
                    animate={{ opacity: hoverPulse, scale: hoverScale }}
                    transition={fastPulse}
                  />

                  {layout === "vitrine" && (
                    <>
                      <rect x="52" y="98" width="330" height="152" rx="18" fill={palette.surface} />
                      <rect x="70" y="122" width="190" height="14" rx="7" fill="url(#previewGlow)" />
                      <rect x="70" y="146" width="220" height="10" rx="5" fill={palette.muted} opacity="0.7" />
                      <rect x="70" y="166" width="180" height="10" rx="5" fill={palette.muted} opacity="0.5" />
                      <rect x="70" y="192" width="120" height="28" rx="14" fill="url(#previewGlow)" />
                      <motion.rect
                        x="400"
                        y="98"
                        width="188"
                        height="152"
                        rx="18"
                        fill="url(#previewImage)"
                        animate={{ y: floatOffset, opacity: pulseOpacity }}
                        transition={floatLoop}
                      />
                      <rect x="400" y="266" width="188" height="64" rx="16" fill="#0f1118" opacity="0.5" />
                    </>
                  )}

                  {layout === "shop" && (
                    <>
                      <rect x="52" y="98" width="536" height="46" rx="16" fill={palette.surface} />
                      {[0, 1, 2].map((col) =>
                        [0, 1].map((row) => {
                          const x = 52 + col * 184;
                          const y = 158 + row * 100;
                          return (
                            <g key={`${col}-${row}`}>
                              <rect x={x} y={y} width="168" height="84" rx="16" fill="#0f1118" opacity="0.55" />
                              <motion.rect
                                x={x + 10}
                                y={y + 10}
                                width="70"
                                height="36"
                                rx="10"
                                fill="url(#previewImage)"
                                animate={{ opacity: pulseOpacity }}
                                transition={slowPulse}
                              />
                              <rect
                                x={x + 90}
                                y={y + 14}
                                width="60"
                                height="8"
                                rx="4"
                                fill={palette.muted}
                                opacity="0.6"
                              />
                              <rect
                                x={x + 90}
                                y={y + 28}
                                width="50"
                                height="6"
                                rx="3"
                                fill={palette.muted}
                                opacity="0.4"
                              />
                            </g>
                          );
                        })
                      )}
                    </>
                  )}

                  {layout === "blog" && (
                    <>
                      <rect x="52" y="98" width="360" height="200" rx="18" fill={palette.surface} />
                      {[0, 1, 2, 3].map((row) => (
                        <rect
                          key={`row-${row}`}
                          x="72"
                          y={122 + row * 38}
                          width="300"
                          height="10"
                          rx="5"
                          fill={palette.muted}
                          opacity={0.7 - row * 0.12}
                        />
                      ))}
                      <motion.rect
                        x="432"
                        y="98"
                        width="156"
                        height="120"
                        rx="18"
                        fill="url(#previewImage)"
                        animate={{ y: floatOffset, opacity: pulseOpacity }}
                        transition={floatLoop}
                      />
                      <rect x="432" y="232" width="156" height="110" rx="18" fill="#0f1118" opacity="0.45" />
                    </>
                  )}

                  {layout === "saas" && (
                    <>
                      <rect x="52" y="98" width="220" height="220" rx="18" fill={palette.surface} />
                      <rect x="292" y="98" width="296" height="220" rx="18" fill="#0f1118" opacity="0.6" />
                      {[0, 1, 2].map((card) => (
                        <rect
                          key={`stat-${card}`}
                          x="70"
                          y={122 + card * 60}
                          width="180"
                          height="42"
                          rx="14"
                          fill="#0f1118"
                          opacity="0.45"
                        />
                      ))}
                      <polyline
                        points="320,290 350,250 380,270 410,220 440,240 470,210 500,230 530,190"
                        fill="none"
                        stroke="url(#previewGlow)"
                        strokeWidth="4"
                      />
                    </>
                  )}

                  {layout === "event" && (
                    <>
                      <motion.rect
                        x="52"
                        y="98"
                        width="536"
                        height="90"
                        rx="18"
                        fill="url(#previewImage)"
                        animate={{ opacity: pulseOpacity }}
                        transition={slowPulse}
                      />
                      {[0, 1, 2].map((step) => (
                        <g key={`step-${step}`}>
                          <motion.circle
                            cx={90 + step * 170}
                            cy="224"
                            r="10"
                            fill="url(#previewGlow)"
                            animate={{ opacity: pulseOpacity }}
                            transition={{ ...fastPulse, delay: step * 0.3 }}
                          />
                          <rect
                            x={110 + step * 170}
                            y="216"
                            width="120"
                            height="12"
                            rx="6"
                            fill={palette.muted}
                            opacity="0.6"
                          />
                        </g>
                      ))}
                      <rect x="52" y="252" width="536" height="90" rx="18" fill="#0f1118" opacity="0.45" />
                    </>
                  )}

                  {layout === "portal" && (
                    <>
                      <rect x="52" y="98" width="160" height="244" rx="18" fill={palette.surface} />
                      {[0, 1, 2].map((nav) => (
                        <rect
                          key={`nav-${nav}`}
                          x="70"
                          y={126 + nav * 44}
                          width="110"
                          height="10"
                          rx="5"
                          fill={palette.muted}
                          opacity={0.65 - nav * 0.1}
                        />
                      ))}
                      <rect x="232" y="98" width="356" height="110" rx="18" fill="#0f1118" opacity="0.6" />
                      <rect x="232" y="224" width="356" height="118" rx="18" fill="#0f1118" opacity="0.45" />
                    </>
                  )}

                  {Array.from({ length: moduleCount }).map((_, index) => (
                    <motion.rect
                      key={`module-${index}`}
                      x={420 + index * 26}
                      y="312"
                      width="18"
                      height="18"
                      rx="6"
                      fill="url(#previewGlow)"
                      opacity={0.7 - index * 0.1}
                      animate={{ opacity: hoverPulse }}
                      transition={{ ...fastPulse, delay: index * 0.2 }}
                    />
                  ))}

                  <rect x="40" y="342" width="560" height="28" rx="14" fill={palette.surface} opacity="0.9" />
                  <circle cx="68" cy="356" r="7" fill="url(#previewGlow)" />
                  <rect x="82" y="350" width="90" height="12" rx="6" fill={palette.muted} opacity="0.6" />
                  <rect x="182" y="350" width="70" height="12" rx="6" fill={palette.muted} opacity="0.4" />
                  <motion.rect
                    x="492"
                    y="348"
                    width="92"
                    height="16"
                    rx="8"
                    fill="url(#previewGlow)"
                    style={{ transformOrigin: "50% 50%" }}
                    animate={{ opacity: hoverPulse, scale: hoverScale }}
                    transition={fastPulse}
                  />
                </motion.g>
              </motion.svg>
            </motion.div>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-white/70"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {[
          { label: "Type", value: summary.type },
          { label: "Vision", value: summary.strategy },
          { label: "Style", value: summary.mood },
        ].map((item) => (
          <div key={item.label} className="rounded-2xl border border-white/10 bg-black/30 p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">{item.label}</p>
            <p className="mt-2 text-lg font-semibold">{item.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 grid gap-6 sm:grid-cols-3">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">Fonctionnalités</p>
          {list(features)}
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">Intégrations</p>
          {list(integrations)}
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">Modules IA</p>
          {list(aiModules)}
        </div>
      </div>
      <motion.div
        className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-4 text-sm text-white/80"
        initial={{ opacity: 0.7 }}
        animate={{ opacity: ready ? 1 : 0.7 }}
      >
        <p className="text-xs uppercase tracking-[0.3em] text-white/60">Résumé</p>
        <pre className="mt-3 whitespace-pre-wrap text-white/90">{shareText}</pre>
      </motion.div>
      <div className="mt-4 flex flex-wrap gap-3 text-sm">
        <button
          type="button"
          onClick={copySummary}
          disabled={!ready}
          className="inline-flex items-center rounded-full bg-white px-5 py-2 font-semibold text-black transition hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {copied ? "Copié" : "Copier le brief"}
        </button>
        <span className="inline-flex items-center rounded-full border border-white/20 px-4 py-1 text-xs uppercase tracking-[0.3em] text-white/60">
          {ready ? "Brief complet" : "En attente de sélection"}
        </span>
      </div>
    </div>
  );
}
