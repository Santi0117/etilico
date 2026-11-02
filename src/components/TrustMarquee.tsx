const items = [
  "Barra libre",
  "Coctelería de autor",
  "Bodas",
  "Corporativos",
  "XV años",
  "Graduaciones",
  "After office",
  "Fiestas privadas",
  "Welcome drink",
  "Bartenders",
  "Montaje completo",
  "Todo Costa Rica",
];

export default function TrustMarquee() {
  const loop = [...items, ...items];

  return (
    <div className="relative z-10 overflow-hidden border-y border-white/10 bg-noche py-4">
      <div className="animate-marquee flex w-max items-center" style={{ ["--marquee-dur" as string]: "46s" }}>
        {loop.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex shrink-0 items-center gap-8 pr-8 text-[11px] font-medium tracking-[0.3em] whitespace-nowrap text-ink-soft uppercase md:text-xs"
          >
            <span className="h-[3px] w-[3px] rounded-full bg-ink-faint" aria-hidden />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
