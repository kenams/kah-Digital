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
  const textClassName = theme === "dark" ? "text-white" : "text-slate-950";
  const accentClassName = theme === "dark" ? "text-sky-400" : "text-sky-500";
  const subtitleClassName = theme === "dark" ? "text-white/55" : "text-slate-500";
  const iconSizeClassName = compact ? "h-10 w-10" : "h-14 w-14";
  const titleSizeClassName = compact ? "text-lg" : "text-2xl";

  return (
    <div className={`inline-flex items-center gap-3 ${className}`.trim()}>
      <svg
        aria-hidden="true"
        className={`${iconSizeClassName} shrink-0`}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="2" y="18" width="7" height="7" rx="1.5" fill="#8AD4FF" opacity="0.72" />
        <rect x="10" y="10" width="7" height="7" rx="1.5" fill="#8AD4FF" opacity="0.78" />
        <rect x="10" y="26" width="7" height="7" rx="1.5" fill="#4DB8FF" opacity="0.95" />
        <rect x="18" y="18" width="7" height="7" rx="1.5" fill="#2EA8FF" />
        <rect x="18" y="34" width="7" height="7" rx="1.5" fill="#4DB8FF" opacity="0.88" />
        <rect x="26" y="2" width="7" height="7" rx="1.5" fill="#8AD4FF" opacity="0.7" />
        <rect x="26" y="18" width="7" height="7" rx="1.5" fill="#56BCFF" opacity="0.98" />
        <rect x="26" y="34" width="7" height="7" rx="1.5" fill="#2EA8FF" />
        <rect x="26" y="42" width="7" height="7" rx="1.5" fill="#56BCFF" opacity="0.86" />
        <rect x="34" y="10" width="7" height="7" rx="1.5" fill="#8AD4FF" opacity="0.75" />
        <path
          d="M36 8H46V29.5L58 8H70L53 28.5L71 56H59L46 35.5V56H36V8Z"
          fill="url(#brand-lockup-k)"
          transform="translate(-8 0)"
        />
        <defs>
          <linearGradient id="brand-lockup-k" x1="36" y1="8" x2="70" y2="56" gradientUnits="userSpaceOnUse">
            <stop stopColor="#70CAFF" />
            <stop offset="1" stopColor="#1F91F3" />
          </linearGradient>
        </defs>
      </svg>

      <div className="min-w-0">
        <p className={`${titleSizeClassName} font-black leading-none tracking-[-0.06em] ${textClassName}`}>
          <span>KAH-</span>
          <span className={accentClassName}>DIGITAL</span>
        </p>
        {subtitle ? (
          <p className={`mt-1 text-[10px] font-semibold uppercase tracking-[0.28em] ${subtitleClassName}`}>
            {subtitle}
          </p>
        ) : null}
      </div>
    </div>
  );
}
