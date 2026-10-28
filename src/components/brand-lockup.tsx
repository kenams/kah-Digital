import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

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
  const wrapClass = compact ? "h-14 w-[84px] md:h-[72px] md:w-[124px]" : "h-[88px] w-[88px]";
  const medalClass = compact
    ? "absolute left-1 top-[-4px] h-20 w-20 md:left-3 md:h-[116px] md:w-[116px]"
    : "absolute inset-0 h-[88px] w-[88px]";

  return (
    <div className={`inline-flex items-center gap-3 ${className}`.trim()}>
      <span className={`relative block shrink-0 ${wrapClass}`}>
        <span className={medalClass}>
          {theme === "dark" ? <span className="kah-halo" aria-hidden="true" /> : null}
          <span className="kah-orbit" aria-hidden="true">
            <i style={{ "--a": "0deg", "--d": "0s" } as CSSProperties} />
            <i style={{ "--a": "120deg", "--d": "1.2s" } as CSSProperties} />
            <i style={{ "--a": "240deg", "--d": "2.4s" } as CSSProperties} />
          </span>
          <span className="kah-orbit kah-orbit-b" aria-hidden="true">
            <i style={{ "--a": "60deg", "--d": "0.6s" } as CSSProperties} />
            <i style={{ "--a": "240deg", "--d": "2s" } as CSSProperties} />
          </span>
          <Image
            src="/brand/medal-compact.svg"
            unoptimized
            alt=""
            aria-hidden="true"
            width={232}
            height={232}
            className="kah-medal relative h-full w-full rounded-full object-cover"
            priority
          />
        </span>
      </span>

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
            className={`${studioSize} font-bold italic uppercase leading-none tracking-[0.3em] bg-clip-text text-transparent ${dark ? "kah-shimmer" : "kah-shimmer-light"}`}
          >
            Studio
          </span>
          <span
            aria-hidden="true"
            className={`h-[2px] flex-1 min-w-3 ${dark ? "kah-sweep" : "bg-[#9b6f36]/50"}`}
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
