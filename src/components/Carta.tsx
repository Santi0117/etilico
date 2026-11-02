"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { cocktails } from "@/lib/cocktails";
import CocktailStage from "./CocktailStage";

const total = cocktails.length;
const wrap = (n: number) => (n + total) % total;

export default function Carta() {
  const [view, setView] = useState<{ i: number; dir: 1 | -1 }>({ i: 0, dir: 1 });
  const railRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ id: number; x: number; left: number; moved: boolean } | null>(null);
  const skipClick = useRef(false);
  const [dragging, setDragging] = useState(false);

  const step = useCallback((dir: 1 | -1) => setView((v) => ({ i: wrap(v.i + dir), dir })), []);
  const pick = useCallback(
    (i: number) => setView((v) => (i === v.i ? v : { i, dir: i > v.i ? 1 : -1 })),
    [],
  );

  // el trago elegido queda centrado en el riel, sin mover la página
  useEffect(() => {
    const rail = railRef.current;
    const btn = rail?.children[view.i] as HTMLElement | undefined;
    if (!rail || !btn) return;
    rail.scrollTo({ left: btn.offsetLeft - (rail.clientWidth - btn.offsetWidth) / 2, behavior: "smooth" });
  }, [view.i]);

  const drink = cocktails[view.i];
  const parts = drink.build.split(" · ").map((p) => p.charAt(0).toUpperCase() + p.slice(1));

  return (
    <section
      id="carta"
      aria-label="Carta de cocteles"
      className="carta relative overflow-hidden bg-noche pt-20 pb-12 md:pb-14"
      style={{ ["--carta-tint" as string]: drink.tint } as CSSProperties}
    >
      <div className="stage-lines" aria-hidden />
      <span className="carta__aura" aria-hidden />
      <div className="grain pointer-events-none absolute inset-0 z-[1] opacity-[0.12] mix-blend-overlay" aria-hidden />

      <div className="section-wrap relative z-10">
        <div className="grid items-center gap-6 lg:grid-cols-12 lg:gap-10">
          <header className="lg:col-span-5 lg:self-end xl:col-span-4">
            <span className="eyebrow text-ink-muted">La carta</span>
            <h2 className="font-display mt-4 text-[clamp(1.6rem,2.6vw,2.2rem)] leading-[1.05] text-ink">
              {total} tragos, <span className="text-ink-soft italic">una sola barra.</span>
            </h2>
          </header>

          <div className="order-3 lg:order-none lg:col-span-7 lg:row-span-2 xl:col-span-8">
            <CocktailStage
              drink={drink}
              dir={view.dir}
              onPrev={() => step(-1)}
              onNext={() => step(1)}
              preload={[cocktails[wrap(view.i + 1)], cocktails[wrap(view.i - 1)]]}
              className="stage--carta"
              label="Carta de cocteles"
            />
          </div>

          <div className="order-4 lg:order-none lg:col-span-5 lg:self-start xl:col-span-4">
            <div key={drink.id} className="swap-in border-t border-white/10 pt-6">
              <p className="micro flex items-center justify-between gap-4 text-ink-muted">
                {drink.base}
                <span className="tabular-nums text-ink-faint">
                  <span className="text-ink">{drink.n}</span> / {String(total).padStart(2, "0")}
                </span>
              </p>
              <h3 className="display-lg mt-3 text-ink">{drink.name}</h3>
              <ul className="carta__build" aria-label="Lleva">
                {parts.map((part) => (
                  <li key={part}>{part}</li>
                ))}
              </ul>
              <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-ink-soft">{drink.note}</p>
            </div>
            <a href="#cotizar" className="btn-secondary mt-8 !px-6 !py-3.5 text-ink">
              Lo quiero en mi evento
            </a>
          </div>
        </div>
      </div>

      <div
        ref={railRef}
        className={`carta__rail relative z-10 mt-8 ${dragging ? "is-dragging" : ""}`}
        role="group"
        aria-label="Todos los tragos"
        onPointerDown={(e) => {
          if (e.pointerType !== "mouse" || e.button !== 0) return;
          drag.current = { id: e.pointerId, x: e.clientX, left: e.currentTarget.scrollLeft, moved: false };
        }}
        onPointerMove={(e) => {
          const d = drag.current;
          if (!d || d.id !== e.pointerId) return;
          const dx = e.clientX - d.x;
          if (!d.moved && Math.abs(dx) > 6) {
            d.moved = true;
            setDragging(true);
            e.currentTarget.setPointerCapture(e.pointerId);
          }
          if (d.moved) e.currentTarget.scrollLeft = d.left - dx;
        }}
        onPointerUp={(e) => {
          const d = drag.current;
          drag.current = null;
          if (d?.moved) {
            // el clic que cierra el arrastre no elige trago
            skipClick.current = true;
            window.setTimeout(() => (skipClick.current = false), 0);
            setDragging(false);
            e.currentTarget.releasePointerCapture(e.pointerId);
          }
        }}
      >
        {cocktails.map((c, i) => (
          <button
            key={c.id}
            type="button"
            aria-pressed={i === view.i}
            aria-label={c.name}
            className={`carta__pick ${i === view.i ? "is-on" : ""}`}
            onClick={() => {
              if (skipClick.current) {
                skipClick.current = false;
                return;
              }
              pick(i);
            }}
          >
            <span className="carta__pick-cut">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={c.thumb}
                alt=""
                width={c.width}
                height={c.height}
                loading="lazy"
                decoding="async"
                draggable={false}
                style={{ height: `${Math.round((0.3 + 0.7 * c.scale) * 100)}%` }}
              />
            </span>
            <span className="carta__pick-name">{c.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
