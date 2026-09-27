"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

const events = [
  {
    n: "01",
    title: "Bodas",
    text: "Welcome drink, brindis y barra abierta hasta el último baile.",
    image: "/cocteles/06-sm.webp",
  },
  {
    n: "02",
    title: "Corporativos",
    text: "Lanzamientos, cenas de fin de año y after office con presencia de marca.",
    image: "/cocteles/11-sm.webp",
  },
  {
    n: "03",
    title: "XV años",
    text: "Una barra que se ve tan bien como se toma, con carta sin alcohol incluida.",
    image: "/cocteles/05-sm.webp",
  },
  {
    n: "04",
    title: "Graduaciones",
    text: "Celebrá el logro con cocteles, shots y una barra que aguanta la noche.",
    image: "/cocteles/02-sm.webp",
  },
  {
    n: "05",
    title: "Fiestas privadas",
    text: "En casa, quinta o rooftop. Llevamos todo y nos adaptamos al espacio.",
    image: "/cocteles/09-sm.webp",
  },
  {
    n: "06",
    title: "Al aire libre",
    text: "Jardines, playas y fincas en todo el país. Montaje resistente al clima.",
    image: "/cocteles/01-sm.webp",
  },
];

export default function Events() {
  const floatRef = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const [hover, setHover] = useState<number | null>(null);

  useEffect(() => {
    let frame = 0;
    const loop = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.14;
      pos.current.y += (target.current.y - pos.current.y) * 0.14;
      const el = floatRef.current;
      if (el) el.style.left = `${pos.current.x}px`;
      if (el) el.style.top = `${pos.current.y}px`;
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section id="eventos" className="section-pad relative overflow-hidden bg-noche">
      <div className="section-wrap">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <span className="eyebrow text-lima">Para toda celebración</span>
              <h2 className="display-lg mt-5 text-ink">Si hay evento, hay barra</h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-ink-muted">
              Cada celebración pide un ritmo distinto de servicio. Armamos la barra al
              tamaño de la invitación, no al revés.
            </p>
          </div>
        </Reveal>

        <div
          className="evt-list mt-14 border-b border-white/12 md:mt-16"
          onPointerMove={(e) => {
            target.current = { x: e.clientX, y: e.clientY };
          }}
          onPointerLeave={() => setHover(null)}
        >
          {events.map((event, i) => (
            <Reveal key={event.title} delay={i * 70}>
              <a
                href="#cotizar"
                className="evt-row group text-ink"
                onPointerEnter={(e) => {
                  target.current = { x: e.clientX, y: e.clientY };
                  if (pos.current.x === 0) pos.current = { ...target.current };
                  setHover(i);
                }}
              >
                <span className="micro w-8 shrink-0 text-lima tabular-nums">{event.n}</span>
                <span className="min-w-0">
                  <span className="evt-row__name block">{event.title}</span>
                  <span className="evt-row__text mt-2 block max-w-md text-sm leading-relaxed text-ink-muted">
                    {event.text}
                  </span>
                </span>
                <span className="micro shrink-0 text-ink-faint transition-colors duration-500 group-hover:text-lima">
                  Cotizar →
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>

      <div ref={floatRef} className={`evt-float ${hover !== null ? "is-on" : ""}`} aria-hidden>
        {hover !== null && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={events[hover].image} alt="" width={560} height={701} />
        )}
      </div>
    </section>
  );
}
