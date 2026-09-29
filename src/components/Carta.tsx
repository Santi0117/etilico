"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cocktails } from "@/lib/cocktails";

export default function Carta() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const drag = useRef<{
    id: number;
    startX: number;
    startLeft: number;
    moved: boolean;
  } | null>(null);
  const skipClick = useRef(false);

  const syncIndex = useCallback(() => {
    const root = scrollerRef.current;
    if (!root) return;
    const mid = root.scrollLeft + root.clientWidth / 2;
    let best = 0;
    let bestDelta = Infinity;
    Array.from(root.children).forEach((node, i) => {
      const el = node as HTMLElement;
      const center = el.offsetLeft + el.offsetWidth / 2;
      const d = Math.abs(center - mid);
      if (d < bestDelta) {
        bestDelta = d;
        best = i;
      }
    });
    setIdx((cur) => (cur === best ? cur : best));
  }, []);

  const goTo = useCallback((next: number) => {
    const root = scrollerRef.current;
    if (!root) return;
    const clamped = Math.max(0, Math.min(cocktails.length - 1, next));
    const card = root.children[clamped] as HTMLElement | undefined;
    if (card) {
      const left = card.offsetLeft - (root.clientWidth - card.offsetWidth) / 2;
      root.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
    }
    setIdx(clamped);
  }, []);

  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;
    const onScroll = () => syncIndex();
    root.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    const boot = requestAnimationFrame(() => goTo(0));
    return () => {
      cancelAnimationFrame(boot);
      root.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [goTo, syncIndex]);

  const drink = cocktails[idx] ?? cocktails[0];

  return (
    <section
      id="carta"
      aria-label="Carta de cocteles"
      className="carta relative overflow-hidden bg-noche pt-24 pb-16 md:pt-32 md:pb-20"
      style={{ ["--carta-tint" as string]: drink.tint }}
    >
      <span className="carta__aura" aria-hidden />
      <div className="grain pointer-events-none absolute inset-0 z-[1] opacity-[0.16] mix-blend-overlay" aria-hidden />

      <div className="section-wrap relative z-10 flex items-center justify-between gap-4">
        <span className="eyebrow text-ink-muted">La carta</span>
        <span className="micro flex items-center gap-3 text-ink-muted">
          <span className="tabular-nums text-lima">{drink.n}</span>
          <span className="h-px w-8 bg-current opacity-40" />
          <span className="tabular-nums">{String(cocktails.length).padStart(2, "0")}</span>
        </span>
      </div>

      <div className="section-wrap relative z-10 mt-8 grid gap-6 md:mt-10 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <h2 key={drink.id} className="display-lg swap-in text-ink">
            {drink.name}
          </h2>
          <p className="micro mt-3 text-lima">
            {drink.base} <span className="text-ink-faint">·</span> {drink.build}
          </p>
        </div>
        <div className="md:col-span-5">
          <p
            key={drink.id + "-n"}
            className="swap-in max-w-sm text-sm leading-relaxed text-ink-soft md:ml-auto md:text-right"
          >
            {drink.note}
          </p>
        </div>
      </div>

      <div className="relative z-10 mt-10 md:mt-14">
        <button
          type="button"
          className="carta__arrow carta__arrow--prev"
          aria-label="Trago anterior"
          disabled={idx <= 0}
          onClick={() => goTo(idx - 1)}
        >
          ←
        </button>
        <button
          type="button"
          className="carta__arrow carta__arrow--next"
          aria-label="Trago siguiente"
          disabled={idx >= cocktails.length - 1}
          onClick={() => goTo(idx + 1)}
        >
          →
        </button>

        <div
          ref={scrollerRef}
          className="carta__scroller"
          onPointerDown={(e) => {
            if (e.pointerType === "touch") return;
            const root = scrollerRef.current;
            if (!root) return;
            drag.current = {
              id: e.pointerId,
              startX: e.clientX,
              startLeft: root.scrollLeft,
              moved: false,
            };
            root.setPointerCapture(e.pointerId);
          }}
          onPointerMove={(e) => {
            const root = scrollerRef.current;
            const d = drag.current;
            if (!root || !d || d.id !== e.pointerId) return;
            const dx = e.clientX - d.startX;
            if (Math.abs(dx) > 6) d.moved = true;
            if (d.moved) {
              root.scrollLeft = d.startLeft - dx;
            }
          }}
          onPointerUp={(e) => {
            const d = drag.current;
            if (d && d.id === e.pointerId) {
              if (d.moved) skipClick.current = true;
              drag.current = null;
              const root = scrollerRef.current;
              if (d.moved && root) {
                const cards = Array.from(root.children) as HTMLElement[];
                const mid = root.scrollLeft + root.clientWidth / 2;
                let best = 0;
                let bestDelta = Infinity;
                cards.forEach((card, i) => {
                  const center = card.offsetLeft + card.offsetWidth / 2;
                  const delta = Math.abs(center - mid);
                  if (delta < bestDelta) {
                    bestDelta = delta;
                    best = i;
                  }
                });
                goTo(best);
              }
            }
          }}
        >
          {cocktails.map((c, i) => (
            <article
              key={c.id}
              className={`carta__card ${i === idx ? "is-live" : ""}`}
              onClick={() => {
                if (skipClick.current) {
                  skipClick.current = false;
                  return;
                }
                goTo(i);
              }}
            >
              <div className="carta__shot">
                <span className="carta__num">{c.n}</span>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.thumb}
                  srcSet={`${c.thumb} 560w, ${c.image} 1100w`}
                  sizes="(min-width: 1024px) 22rem, 70vw"
                  alt={`${c.name} · coctelería Etílico`}
                  loading={i < 3 ? "eager" : "lazy"}
                  decoding="async"
                  draggable={false}
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

      <div className="section-wrap relative z-10 mt-8">
        <div className="carta__progress">
          <i style={{ width: `${((idx + 1) / cocktails.length) * 100}%` }} />
        </div>
        <div className="mt-3 flex items-center justify-between gap-4">
          <span className="micro text-ink-faint">Clásicos · de autor · sin alcohol</span>
          <span className="micro hidden text-ink-faint md:block">Arrastrá o usá las flechas</span>
          <span className="micro text-ink-faint md:hidden">Deslizá para ver más</span>
        </div>
      </div>
    </section>
  );
}
