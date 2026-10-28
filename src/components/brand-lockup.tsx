import Image from "next/image";
import type { ReactNode } from "react";

type BrandLockupProps = {
  className?: string;
  compact?: boolean;
  subtitle?: ReactNode;
  theme?: "light" | "dark";
};

const serif = '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif';

export function BrandLockup({
  className = "",
  compact = false,
  subtitle,
  theme = "dark",
}: BrandLockupProps) {
  const dark = theme === "dark";
  const size = compact ? 44 : 64;
  const lineSize = compact ? "text-[0.95rem]" : "text-[1.55rem]";
  const studioSize = compact ? "text-[1.15rem]" : "text-[1.9rem]";

  return (
    <div className={`inline-flex items-center gap-3 ${className}`.trim()}>
      <Image
        src="/kah-studio-mark.svg"
        alt=""
        aria-hidden="true"
        width={size}
        height={size}
        className="shrink-0"
        style={{ width: size, height: size }}
        priority
      />

      <div className="min-w-0" style={{ fontFamily: serif }}>
        <p
          className={`${lineSize} font-bold uppercase leading-none tracking-[0.2em] ${dark ? "text-[#f8f3ea]" : "text-[#20160c]"}`}
        >
          KAH Digital
        </p>
        <p className="mt-1 flex items-center gap-2">
          <span
            className={`${studioSize} font-bold italic uppercase leading-none tracking-[0.3em] bg-clip-text text-transparent ${
              dark
                ? "bg-[linear-gradient(135deg,#f6e4b8,#d9ae62_55%,#b98441)]"
                : "bg-[linear-gradient(135deg,#b98441,#8a5f27)]"
            }`}
          >
            Studio
          </span>
          <span
            aria-hidden="true"
            className={`h-px flex-1 min-w-3 ${dark ? "bg-[#d9ae62]/50" : "bg-[#9b6f36]/50"}`}
          />
        </p>
        {subtitle && !compact ? (
          <p
            className={`mt-1.5 text-[10px] font-medium uppercase tracking-[0.34em] ${dark ? "text-[#c7b38b]/70" : "text-[#7f6240]"}`}
          >
            {subtitle}
          </p>
        ) : null}
      </div>
    </div>
  );
}
