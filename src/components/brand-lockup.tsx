import Image from "next/image";
import type { ReactNode } from "react";

type BrandLockupProps = {
  className?: string;
  compact?: boolean;
  subtitle?: ReactNode;
  theme?: "light" | "dark";
};

export function BrandLockup({
  className = "",
  compact = false,
  subtitle,
  theme = "dark",
}: BrandLockupProps) {
  const iconSizeClassName = compact ? "h-11 w-11" : "h-16 w-16";
  const subtitleClassName = theme === "dark" ? "text-[#c7b38b]/70" : "text-[#7f6240]";
  const titleStyle = {
    fontFamily: '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif',
  } as const;
  const wordmarkSizeClassName = compact ? "text-[1.35rem]" : "text-[2.15rem]";
  const trackingClassName = compact ? "tracking-[0.18em]" : "tracking-[0.22em]";
  const titleTone = theme === "dark" ? "text-[#f8f3ea]" : "text-[#20160c]";

  return (
    <div className={`inline-flex items-center gap-3 ${className}`.trim()}>
      <Image
        src="/kah-logo.jpg"
        alt="KAH Digital"
        aria-hidden="true"
        width={compact ? 44 : 64}
        height={compact ? 44 : 64}
        className={`${iconSizeClassName} shrink-0 rounded-full object-cover`}
        priority
      />

      <div className="min-w-0">
        <p
          className={`${wordmarkSizeClassName} ${trackingClassName} font-semibold uppercase leading-none ${titleTone}`}
          style={titleStyle}
        >
          <span>KAH</span>
          <span className="mx-[0.16em] inline-block align-middle text-[#d0a762]">-</span>
          <span className={theme === "dark" ? "text-[#dfc18a]" : "text-[#9b6f36]"}>DIGITAL</span>
        </p>
        {subtitle ? (
          <p className={`mt-1 text-[10px] font-medium uppercase tracking-[0.34em] ${subtitleClassName}`}>
            {subtitle}
          </p>
        ) : null}
      </div>
    </div>
  );
}
