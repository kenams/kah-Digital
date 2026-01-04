"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLocale } from "@/lib/locale";

export function FloatingCTA() {
  const { isEnglish, prefix } = useLocale();
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
        href={`${prefix}/devis`}
        className="inline-flex items-center gap-3 rounded-full border border-black/10 bg-[#f6efe3]/95 px-6 py-3 text-[#15120e] shadow-2xl shadow-black/30 backdrop-blur transition hover:bg-[#f6efe3]"
      >
        <span className="h-2 w-2 rounded-full bg-[#d6b36a]" />
        {isEnglish ? "Get a quote" : "Demander un devis"}
      </Link>
    </div>
  );
}
