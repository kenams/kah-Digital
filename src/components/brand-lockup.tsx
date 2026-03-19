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
  const frameStroke = theme === "dark" ? "rgba(234, 214, 176, 0.32)" : "rgba(108, 78, 41, 0.28)";
  const glowOpacity = theme === "dark" ? "0.95" : "0.78";
  const smallGlowOpacity = theme === "dark" ? "0.55" : "0.42";
  const borderColor = theme === "dark" ? "#e5c98a" : "#8e6b3a";
  const innerBorderColor = theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(109,84,46,0.12)";
  const titleTone = theme === "dark" ? "text-[#f8f3ea]" : "text-[#20160c]";

  return (
    <div className={`inline-flex items-center gap-3 ${className}`.trim()}>
      <svg
        aria-hidden="true"
        className={`${iconSizeClassName} shrink-0`}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`brand-lockup-panel-${theme}`} x1="6" y1="6" x2="58" y2="58" gradientUnits="userSpaceOnUse">
            <stop stopColor={theme === "dark" ? "#171c27" : "#fbf4e7"} />
            <stop offset="0.5" stopColor={theme === "dark" ? "#0c1119" : "#efe1c5"} />
            <stop offset="1" stopColor={theme === "dark" ? "#05070c" : "#ddc9a0"} />
          </linearGradient>
          <linearGradient id={`brand-lockup-gold-${theme}`} x1="18" y1="16" x2="48" y2="50" gradientUnits="userSpaceOnUse">
            <stop stopColor="#f7edd6" />
            <stop offset="0.28" stopColor="#e8cb8b" />
            <stop offset="0.62" stopColor="#c6934e" />
            <stop offset="1" stopColor="#8e632f" />
          </linearGradient>
          <linearGradient id={`brand-lockup-shine-${theme}`} x1="12" y1="12" x2="52" y2="52" gradientUnits="userSpaceOnUse">
            <stop stopColor={`rgba(255,255,255,${glowOpacity})`} />
            <stop offset="1" stopColor={`rgba(255,255,255,0)`} />
          </linearGradient>
        </defs>
        <rect x="4.5" y="4.5" width="55" height="55" rx="16" fill={`url(#brand-lockup-panel-${theme})`} stroke={frameStroke} />
        <rect x="10" y="10" width="44" height="44" rx="12" stroke={innerBorderColor} />
        <path d="M19 18H25.5V30.5L38.5 18H46.5L32.5 31.5L47.5 47H39L25.5 33.5V47H19V18Z" fill={`url(#brand-lockup-gold-${theme})`} />
        <path d="M19 18H25.5V47H19V18Z" fill={`url(#brand-lockup-shine-${theme})`} opacity={smallGlowOpacity} />
        <circle cx="48.5" cy="16.5" r="1.5" fill={borderColor} opacity="0.82" />
        <circle cx="43.5" cy="16.5" r="1.5" fill={borderColor} opacity="0.52" />
        <circle cx="38.5" cy="16.5" r="1.5" fill={borderColor} opacity="0.34" />
        <path d="M15 49H49" stroke={frameStroke} strokeLinecap="round" />
        <path d="M15 46H35" stroke={innerBorderColor} strokeLinecap="round" />
      </svg>

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
