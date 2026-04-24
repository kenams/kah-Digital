"use client";

import { useState, useEffect, useRef } from "react";
import { FiX, FiArrowRight, FiCheck } from "react-icons/fi";

export default function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const triggered = useRef(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("exit_popup_dismissed");
    if (dismissed) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10 && !triggered.current) {
        triggered.current = true;
        setVisible(true);
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const delta = e.touches[0].clientY - touchStartY;
      if (delta > 80 && !triggered.current) {
        triggered.current = true;
        setVisible(true);
      }
    };

    // Delay activation 5s to avoid triggering immediately
    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
      document.addEventListener("touchstart", handleTouchStart);
      document.addEventListener("touchmove", handleTouchMove);
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem("exit_popup_dismissed", "1");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await fetch("/api/audit-gratuit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, businessName: businessName || "Non renseigné", website: "", phone: "" }),
      });
      setSubmitted(true);
      sessionStorage.setItem("exit_popup_dismissed", "1");
    } finally {
      setLoading(false);
    }
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={dismiss} />
      <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-gray-900 p-8 shadow-2xl">
        <button onClick={dismiss} className="absolute right-4 top-4 text-gray-500 hover:text-white transition">
          <FiX size={20} />
        </button>

        {submitted ? (
          <div className="text-center py-4">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20">
              <FiCheck size={28} className="text-emerald-400" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-white">Votre audit arrive !</h3>
            <p className="text-sm text-gray-400">Vérifiez votre boîte mail dans quelques minutes. On analyse votre site gratuitement.</p>
          </div>
        ) : (
          <>
            <div className="mb-1 inline-block rounded-full border border-red-500/30 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400">
              Attendez — offre limitée
            </div>
            <h2 className="mb-2 mt-3 text-2xl font-extrabold text-white">
              Audit gratuit de votre site avant de partir
            </h2>
            <p className="mb-6 text-sm text-gray-400 leading-relaxed">
              En 2 minutes, on analyse votre site web et on vous envoie un rapport complet : vitesse, SEO, mobile, conversions.
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Nom de votre entreprise"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-gray-800 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
              />
              <input
                type="email"
                required
                placeholder="Votre email *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-gray-800 px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
              />
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3.5 font-bold text-white transition disabled:opacity-60"
              >
                {loading ? "Analyse en cours…" : <><span>Recevoir mon audit gratuit</span><FiArrowRight size={15} /></>}
              </button>
            </form>
            <p className="mt-3 text-center text-xs text-gray-600">Résultats par email · Aucun engagement · 100% gratuit</p>
          </>
        )}
      </div>
    </div>
  );
}
