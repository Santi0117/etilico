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
    <div className="marquee-mask relative overflow-hidden border-y border-white/10 bg-noche py-5">
      <div className="animate-marquee flex w-max items-center gap-10 pr-10">
        {loop.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="font-display flex shrink-0 items-center gap-10 text-xl text-ink-muted md:text-2xl"
          >
            <span className="text-[0.4em] text-lima">◆</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
