"use client";

import { useEffect, useRef, useState } from "react";
import { cocktails } from "@/lib/cocktails";

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

export default function Carta() {
  const trackRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLElement>(null);
  const offsets = useRef<number[]>([]);
  const distRef = useRef(0);
  const [dist, setDist] = useState(0);
  const [idx, setIdx] = useState(0);

  // mide el riel y define cuánto scroll vertical hace falta
  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const measure = () => {
      const cards = Array.from(rail.children) as HTMLElement[];
      offsets.current = cards.map((c) => c.offsetLeft + c.offsetWidth / 2);
      const overflow = Math.max(0, rail.scrollWidth - window.innerWidth);
      distRef.current = overflow;
      setDist(overflow);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(rail);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Progreso del scroll vertical -> desplazamiento horizontal. El riel se mueve
  // por estilo directo: React solo re-renderiza cuando cambia el trago activo.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let frame = 0;
    const measure = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const p = total > 0 ? clamp01(-rect.top / total) : 0;
      const shift = p * distRef.current;

      if (railRef.current) {
        railRef.current.style.transform = `translate3d(${-shift}px,0,0)`;
      }
      if (barRef.current) {
        barRef.current.style.width = `${Math.max(4, p * 100)}%`;
      }

      const center = shift + window.innerWidth / 2;
      let best = 0;
      let bestDelta = Infinity;
      offsets.current.forEach((o, i) => {
        const d = Math.abs(o - center);
        if (d < bestDelta) {
          bestDelta = d;
          best = i;
        }
      });
      setIdx((cur) => (cur === best ? cur : best));
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [dist]);

  const drink = cocktails[idx] ?? cocktails[0];

  return (
    <section
      ref={trackRef}
      id="carta"
      aria-label="Carta de cocteles"
      className="carta relative bg-noche"
      style={{
        height: `calc(100svh + ${dist}px)`,
        ["--carta-tint" as string]: drink.tint,
      }}
    >
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        <span className="carta__aura" aria-hidden />
        <div className="grain pointer-events-none absolute inset-0 z-[1] opacity-[0.16] mix-blend-overlay" aria-hidden />

        {/* ---- encabezado ---- */}
        <div className="section-wrap relative z-10 flex items-center justify-between gap-4 pt-[6rem] md:pt-[6.5rem]">
          <span className="eyebrow text-ink-muted">La carta</span>
          <span className="micro flex items-center gap-3 text-ink-muted">
            <span className="tabular-nums text-lima">{drink.n}</span>
            <span className="h-px w-8 bg-current opacity-40" />
            <span className="tabular-nums">{cocktails.length}</span>
          </span>
        </div>

        {/* ---- ficha del trago activo ---- */}
        <div className="section-wrap relative z-10 grid flex-none gap-6 py-6 md:grid-cols-12 md:items-end md:py-8">
          <div className="md:col-span-7">
            <h2 key={drink.id} className="display-lg swap-in text-ink">
              {drink.name}
            </h2>
            <p className="micro mt-3 text-lima">
              {drink.base} <span className="text-ink-faint">·</span> {drink.build}
            </p>
          </div>
          <div className="md:col-span-5">
            <p key={drink.id + "-n"} className="swap-in max-w-sm text-sm leading-relaxed text-ink-soft md:ml-auto md:text-right">
              {drink.note}
            </p>
          </div>
        </div>

        {/* ---- riel ---- */}
        <div className="relative z-10 flex flex-1 items-center overflow-hidden">
          <div ref={railRef} className="carta__track carta-rail-pad w-max shrink-0">
            {cocktails.map((c, i) => (
              <article
                key={c.id}
                className={`carta__card ${i === idx ? "is-live" : ""}`}
                style={{
                  transform: i === idx ? "scale(1)" : "scale(0.9)",
                  opacity: i === idx ? 1 : 0.55,
                }}
              >
                <div className="carta__shot">
                  <span className="carta__num">{c.n}</span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.thumb}
                    srcSet={`${c.thumb} 560w, ${c.image} 1100w`}
                    sizes="(min-width: 1024px) 22rem, 60vw"
                    alt={`${c.name} · coctelería Etílico`}
                    loading={i < 3 ? "eager" : "lazy"}
                    decoding="async"
                    width={560}
                    height={701}
                  />
                  <span className="carta__ring" aria-hidden />
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-3">
                  <span className="font-display text-xl text-ink">{c.name}</span>
                  <span className="micro text-ink-faint">{c.base}</span>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* ---- progreso ---- */}
        <div className="section-wrap relative z-10 pb-[4.25rem] sm:pb-[max(1.75rem,env(safe-area-inset-bottom))]">
          <div className="carta__progress">
            <i ref={barRef} style={{ width: "4%" }} />
          </div>
          <div className="mt-3 flex items-center justify-between gap-4">
            <span className="micro text-ink-faint">Clásicos · de autor · sin alcohol</span>
            <span className="micro hidden text-ink-faint sm:block">Seguí bajando →</span>
          </div>
        </div>
      </div>
    </section>
  );
}
