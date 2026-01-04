"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { FiVolume2, FiVolumeX } from "react-icons/fi";
import { useLocale } from "@/lib/locale";

type AmbientAudioContextValue = {
  isPlaying: boolean;
  isReady: boolean;
  showHint: boolean;
  toggle: () => void;
  dismissHint: () => void;
};

const AmbientAudioContext = createContext<AmbientAudioContextValue | undefined>(undefined);

export function useAmbientAudio() {
  const context = useContext(AmbientAudioContext);
  if (!context) {
    throw new Error("useAmbientAudio must be used within GlobalAudioProvider");
  }
  return context;
}

type GlobalAudioProviderProps = {
  children: React.ReactNode;
};

export function GlobalAudioProvider({ children }: GlobalAudioProviderProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(
    () => () => {
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
        audio.src = "";
        audioRef.current = null;
      }
    },
    [],
  );

  const ensureAudio = () => {
    if (audioRef.current) {
      return audioRef.current;
    }
    if (typeof Audio === "undefined") {
      return null;
    }
    const audio = new Audio("/Cy.mp3");
    audio.loop = true;
    audio.volume = 0.3;
    const markReady = () => setIsReady(true);
    audio.addEventListener("canplaythrough", markReady, { once: true });
    audioRef.current = audio;
    return audio;
  };

  const toggle = () => {
    const audio = ensureAudio();
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
      setShowHint(false);
      return;
    }

    const playAttempt = audio.play();
    if (playAttempt && typeof playAttempt.then === "function") {
      playAttempt
        .then(() => {
          setIsPlaying(true);
          setShowHint(false);
        })
        .catch(() => {
          setShowHint(true);
        });
    } else {
      setIsPlaying(true);
    }
  };

  return (
    <AmbientAudioContext.Provider
      value={{ isPlaying, isReady, showHint, toggle, dismissHint: () => setShowHint(false) }}
    >
      {children}
    </AmbientAudioContext.Provider>
  );
}

type AudioToggleProps = {
  className?: string;
  variant?: "dark" | "light";
  compact?: boolean;
};

export function AmbientAudioToggleButton({
  className = "",
  variant = "dark",
  compact = false,
}: AudioToggleProps) {
  const { isPlaying, isReady, showHint, toggle, dismissHint } = useAmbientAudio();
  const { isEnglish } = useLocale();
  const compactLabel = isEnglish ? "Ambient" : "Ambiance";
  const label = compact
    ? compactLabel
    : isPlaying
      ? isEnglish
        ? "Ambient on"
        : "Ambiance active"
      : isReady
        ? isEnglish
          ? "Enable ambient"
          : "Activer l'ambiance"
        : isEnglish
          ? "Preparing ambient"
          : "Preparer l'ambiance";

  const baseColors =
    variant === "light"
      ? "border-slate-900/30 text-slate-900 hover:border-slate-900"
      : "border-white/30 text-white/80 hover:border-white";

  const activeColors = variant === "light" ? "bg-emerald-500/15 text-slate-900" : "bg-emerald-500/20 text-white";

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <button
        type="button"
        aria-label={
          isPlaying
            ? isEnglish
              ? "Mute ambient sound"
              : "Couper l'ambiance sonore"
            : isEnglish
              ? "Enable ambient sound"
              : "Activer l'ambiance sonore"
        }
        onClick={toggle}
        className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] transition ${
          isPlaying ? activeColors : baseColors
        } ${compact ? "px-3 text-[0.6rem] tracking-[0.18em]" : ""}`}
      >
        {isPlaying ? <FiVolume2 className="text-base" /> : <FiVolumeX className="text-base" />}
        {label}
      </button>
      {showHint && (
        <button
          type="button"
          onClick={dismissHint}
          className="text-[0.65rem] text-white/70 underline-offset-4 hover:text-white/90"
        >
          {isEnglish ? "Allow audio in your browser" : "Autorise l'audio dans ton navigateur"}
        </button>
      )}
    </div>
  );
}
