type LogoProps = {
  variant?: "inline" | "stacked" | "seal";
  className?: string;
  tagline?: boolean;
  /** Sin el verde de marca: todo en el color del texto. */
  mono?: boolean;
};

/** Copa que reemplaza la Í, igual que en Instagram y en el frente de la barra. */
function Martini({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 14 24" className={className} fill="none" aria-hidden>
      <path
        d="M0.7 1.2h12.6L7 12.2Z"
        stroke="currentColor"
        strokeWidth="1.05"
        strokeLinejoin="round"
      />
      <path d="M7 12.2V22.2" stroke="currentColor" strokeWidth="1.05" />
      <path d="M2.2 22.6h9.6" stroke="currentColor" strokeWidth="1.05" strokeLinecap="round" />
      <circle cx="10.15" cy="3.55" r="0.95" fill="currentColor" />
    </svg>
  );
}

function Wordmark({
  tagline,
  compact = false,
  mono = false,
}: {
  tagline: boolean;
  compact?: boolean;
  mono?: boolean;
}) {
  return (
    <span className="inline-flex flex-col items-start leading-none">
      <span className="flex items-end">
        <span className={`font-[family-name:var(--font-outfit)] font-light ${compact ? "tracking-[0.14em]" : "tracking-[0.28em]"}`}>
          ET
        </span>
        <Martini
          className={`text-current ${
            compact ? "mb-[0.02em] ml-px h-[1.22em] w-auto" : "mb-[0.04em] ml-[0.04em] h-[1.28em] w-auto"
          }`}
        />
      </span>
      <span
        className={`font-[family-name:var(--font-outfit)] font-light ${
          compact ? "tracking-[0.14em] -mt-[0.12em]" : "tracking-[0.28em] -mt-[0.08em]"
        }`}
      >
        LICO
      </span>
      {tagline ? (
        <span
          className={`font-[family-name:var(--font-outfit)] font-medium tracking-[0.42em] uppercase ${mono ? "opacity-60" : "text-lima"} ${
            compact ? "mt-[0.42em] text-[0.22em]" : "mt-[0.48em] text-[0.16em]"
          }`}
        >
          Cocktails &amp; Drinks
        </span>
      ) : null}
    </span>
  );
}

export default function Logo({
  variant = "inline",
  className = "",
  tagline = true,
  mono = false,
}: LogoProps) {
  if (variant === "stacked") {
    return (
      <span className={`inline-block text-[1em] leading-none ${className}`}>
        <Wordmark tagline={tagline} mono={mono} />
      </span>
    );
  }

  if (variant === "seal") {
    return (
      <span
        className={`relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-current/25 sm:h-12 sm:w-12 ${className}`}
      >
        <Wordmark tagline={false} compact />
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <span className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-current/25 sm:h-12 sm:w-12">
        <span className="text-[9px] leading-none tracking-[0.12em] sm:text-[10px]">
          <Wordmark tagline={false} compact />
        </span>
      </span>
      <span className="min-w-0 leading-none">
        <span className="font-[family-name:var(--font-outfit)] block text-[0.95rem] font-light tracking-[0.28em] sm:text-lg">
          ETÍLICO
        </span>
        {tagline ? (
          <span className="mt-1 hidden text-[8px] font-medium tracking-[0.36em] text-lima uppercase sm:block">
            Cocktails &amp; Drinks
          </span>
        ) : null}
      </span>
    </span>
  );
}
