"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-6 left-4 right-4 z-40 flex justify-center sm:left-6 sm:right-auto sm:justify-start ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      } transition duration-500`}
    >
      <Link
        href="/devis"
        className="inline-flex items-center gap-3 rounded-full bg-white/90 px-6 py-3 text-black shadow-2xl shadow-black/30 backdrop-blur hover:bg-white"
      >
        <span className="h-2 w-2 rounded-full bg-emerald-500" />
        Devis rapide
      </Link>
    </div>
  );
}
