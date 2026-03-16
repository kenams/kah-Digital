"use client";

interface KahDigitalDocumentLogoProps {
  className?: string;
}

export function KahDigitalDocumentLogo({ className = "" }: KahDigitalDocumentLogoProps) {
  return (
    <div className={`inline-flex items-center gap-4 ${className}`.trim()}>
      <svg
        aria-hidden="true"
        className="h-16 w-16 shrink-0"
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="2" y="18" width="7" height="7" rx="1.5" fill="#2EA8FF" opacity="0.9" />
        <rect x="10" y="10" width="7" height="7" rx="1.5" fill="#2EA8FF" opacity="0.85" />
        <rect x="10" y="26" width="7" height="7" rx="1.5" fill="#2EA8FF" opacity="0.95" />
        <rect x="18" y="18" width="7" height="7" rx="1.5" fill="#2EA8FF" />
        <rect x="18" y="34" width="7" height="7" rx="1.5" fill="#2EA8FF" opacity="0.92" />
        <rect x="26" y="2" width="7" height="7" rx="1.5" fill="#2EA8FF" opacity="0.75" />
        <rect x="26" y="18" width="7" height="7" rx="1.5" fill="#2EA8FF" opacity="0.95" />
        <rect x="26" y="34" width="7" height="7" rx="1.5" fill="#2EA8FF" />
        <rect x="26" y="42" width="7" height="7" rx="1.5" fill="#2EA8FF" opacity="0.9" />
        <rect x="34" y="10" width="7" height="7" rx="1.5" fill="#2EA8FF" opacity="0.82" />
        <path
          d="M36 8H46V29.5L58 8H70L53 28.5L71 56H59L46 35.5V56H36V8Z"
          fill="url(#kah-digital-logo-gradient)"
          transform="translate(-8 0)"
        />
        <defs>
          <linearGradient id="kah-digital-logo-gradient" x1="36" y1="8" x2="70" y2="56" gradientUnits="userSpaceOnUse">
            <stop stopColor="#56BCFF" />
            <stop offset="1" stopColor="#1F91F3" />
          </linearGradient>
        </defs>
      </svg>

      <div className="min-w-0">
        <p className="text-[28px] font-black leading-none tracking-[-0.06em] text-slate-900">
          <span>KAH-</span>
          <span className="text-sky-500">DIGITAL</span>
        </p>
        <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-slate-500">
          Solutions digitales
        </p>
      </div>
    </div>
  );
}
