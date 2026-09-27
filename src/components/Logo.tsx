type LogoProps = {
  variant?: "inline" | "stacked";
  className?: string;
  tagline?: boolean;
};

function Martini({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 14 22" className={className} fill="none" aria-hidden>
      <path d="M0.6 1h12.8L7 10.2Z" stroke="currentColor" strokeWidth="1.15" strokeLinejoin="round" />
      <path d="M7 10.2V20" stroke="currentColor" strokeWidth="1.15" />
      <path d="M2.4 20.6h9.2" stroke="currentColor" strokeWidth="1.15" strokeLinecap="round" />
      <circle cx="10.1" cy="3.4" r="0.9" fill="currentColor" />
    </svg>
  );
}

export default function Logo({
  variant = "inline",
  className = "",
  tagline = true,
}: LogoProps) {
  if (variant === "stacked") {
    return (
      <span className={`inline-block leading-none ${className}`}>
        <span className="flex items-start gap-[0.12em]">
          <span className="font-display block text-[1em] tracking-[0.1em]">ETÍ</span>
          <Martini className="mt-[0.06em] h-[0.62em] w-auto text-lima" />
        </span>
        <span className="font-display mt-[0.08em] block text-[1em] tracking-[0.1em]">LICO</span>
        {tagline && (
          <span className="mt-[0.34em] block text-[0.13em] font-medium tracking-[0.46em] text-lima uppercase">
            Cocktails &amp; Drinks
          </span>
        )}
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-current/25 sm:h-10 sm:w-10">
        <Martini className="h-4 w-auto text-lima sm:h-[1.1rem]" />
      </span>
      <span className="min-w-0 leading-none">
        <span className="font-display block text-lg tracking-[0.2em] sm:text-xl">ETÍLICO</span>
        {tagline && (
          <span className="mt-1 hidden text-[8px] font-medium tracking-[0.36em] text-lima uppercase sm:block">
            Cocktails &amp; Drinks
          </span>
        )}
      </span>
    </span>
  );
}
