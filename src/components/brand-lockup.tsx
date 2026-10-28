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
  const sizeClass = compact ? "h-14 w-14 md:h-[72px] md:w-[72px]" : "h-[88px] w-[88px]";
  return (
    <div className={`inline-flex items-center gap-3 ${className}`.trim()}>
      <Image
        src="/kah-logo.jpg"
        alt=""
        aria-hidden="true"
        width={176}
        height={176}
        className={`${sizeClass} shrink-0 rounded-full object-cover`}
        priority
      />

      <BrandTitle compact={compact} subtitle={subtitle} theme={theme} />
    </div>
  );
}

export function BrandTitle({
  compact = false,
  subtitle,
  theme = "dark",
  center = false,
  large = false,
}: Omit<BrandLockupProps, "className"> & { center?: boolean; large?: boolean }) {
  const dark = theme === "dark";
  const lineSize = large ? "text-[2rem]" : compact ? "text-[0.95rem]" : "text-[1.55rem]";
  const studioSize = large ? "text-[2.4rem]" : compact ? "text-[1.15rem]" : "text-[1.9rem]";

  return (
    <div className={`min-w-0 ${center ? "text-center" : ""}`} style={{ fontFamily: serif }}>
        <p
          className={`${lineSize} font-bold uppercase leading-none tracking-[0.2em] ${dark ? "text-[#f8f3ea]" : "text-[#20160c]"}`}
        >
          KAH Digital
        </p>
        <p className={`mt-1 flex items-center gap-2 ${center ? "justify-center" : ""}`}>
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
  );
}
