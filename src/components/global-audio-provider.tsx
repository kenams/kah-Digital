"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { FiVolume2, FiVolumeX } from "react-icons/fi";

type AmbientAudioContextValue = {
  isPlaying: boolean;
  toggle: () => void;
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

  useEffect(() => {
    const audio = new Audio("/hero-ambient.wav");
    audio.loop = true;
    audio.volume = 0.3;
    const markReady = () => setIsReady(true);
    audio.addEventListener("canplaythrough", markReady, { once: true });
    audioRef.current = audio;
    return () => {
      audio.removeEventListener("canplaythrough", markReady);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio || !isReady) return;
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
    }
  };

  return (
    <AmbientAudioContext.Provider value={{ isPlaying, toggle }}>
      {children}
      <FloatingAudioToggle
        isPlaying={isPlaying}
        toggle={toggle}
        disabled={!isReady}
        showHint={showHint}
        clearHint={() => setShowHint(false)}
      />
    </AmbientAudioContext.Provider>
  );
}

type FloatingAudioToggleProps = {
  isPlaying: boolean;
  toggle: () => void;
  disabled: boolean;
  showHint: boolean;
  clearHint: () => void;
};

function FloatingAudioToggle({ isPlaying, toggle, disabled, showHint, clearHint }: FloatingAudioToggleProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {showHint && (
        <div className="rounded-2xl border border-white/20 bg-black/70 px-4 py-2 text-xs text-white/80 shadow-lg backdrop-blur">
          Autorise l’audio dans ton navigateur pour profiter de l’ambiance.
          <button
            type="button"
            className="ml-2 text-white/60 underline-offset-2 hover:text-white"
            onClick={clearHint}
          >
            OK
          </button>
        </div>
      )}
      <button
        type="button"
        aria-label={isPlaying ? "Couper l’ambiance sonore" : "Activer l’ambiance sonore"}
        disabled={disabled}
        onClick={toggle}
        className={`inline-flex items-center gap-2 rounded-full border px-5 py-2 text-sm font-medium shadow-2xl transition ${
          isPlaying ? "border-emerald-300/70 bg-emerald-500/20 text-white" : "border-white/30 bg-black/60 text-white/70"
        } ${disabled ? "cursor-not-allowed opacity-50" : "hover:border-white"}`}
      >
        {isPlaying ? <FiVolume2 className="text-lg" /> : <FiVolumeX className="text-lg" />}
        {isPlaying ? "Ambiance active" : "Activer l’ambiance"}
      </button>
    </div>
  );
}
