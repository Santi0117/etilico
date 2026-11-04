"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { groups, inGroup, type GroupId } from "@/lib/cocktails";

/** Distancia con signo al trago del centro, dando la vuelta por el otro lado. */
function offset(i: number, center: number, n: number) {
  let d = i - center;
  if (d > n / 2) d -= n;
  if (d < -n / 2) d += n;
  return d;
}

const wrap = (i: number, n: number) => ((i % n) + n) % n;
const pad = (n: number) => String(n).padStart(2, "0");

export default function Carta() {
  const [group, setGroup] = useState<GroupId>("todos");
  const [idx, setIdx] = useState(0);
  /** Arrastre en curso: cuánto se movió el dedo y cuánto mide un paso. */
  const [drag, setDrag] = useState<{ dx: number; step: number } | null>(null);
  const dragging = drag !== null;
  const reel = useRef<HTMLDivElement>(null);
  const section = useRef<HTMLElement>(null);
  const press = useRef<{ id: number; x: number; step: number; moved: boolean } | null>(null);
  const inView = useRef(false);

  const list = useMemo(() => inGroup(group), [group]);
  const n = list.length;
  const drink = list[wrap(idx, n)];

  const go = useCallback((to: number) => setIdx(wrap(to, n)), [n]);

  // flechas del teclado mientras la carta está en pantalla
  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => (inView.current = e.intersectionRatio > 0.45), {
      threshold: [0, 0.45, 1],
    });
    io.observe(el);
    const onKey = (e: KeyboardEvent) => {
      if (!inView.current || e.altKey || e.metaKey || e.ctrlKey) return;
      if ((e.target as HTMLElement).closest("input, textarea, select, [contenteditable]")) return;
      if (e.key === "ArrowRight") setIdx((i) => wrap(i + 1, n));
      if (e.key === "ArrowLeft") setIdx((i) => wrap(i - 1, n));
    };
    window.addEventListener("keydown", onKey);
    return () => {
      io.disconnect();
      window.removeEventListener("keydown", onKey);
    };
  }, [n]);

  const shift = drag ? drag.dx / drag.step : 0;

  return (
    <section
      ref={section}
      id="carta"
      aria-label="Carta de cocteles"
      className="carta"
      style={{ ["--carta-tint" as string]: drink.tint } as CSSProperties}
    >
      <div className="grain pointer-events-none absolute inset-0 z-[1] opacity-[0.12] mix-blend-overlay" aria-hidden />

      <p key={`g-${drink.id}`} className="carta__ghost" aria-hidden>
        {drink.name}
      </p>

      <div className="carta__pills" role="group" aria-label="Filtrar por licor">
        {groups.map((g) => {
          const on = g.id === group;
          return (
            <button
              key={g.id}
              type="button"
              aria-pressed={on}
              className={`carta__pill ${on ? "is-on" : ""}`}
              onClick={() => {
                setGroup(g.id);
                setIdx(0);
              }}
            >
              {g.label}
              <span className="carta__pill-n">{inGroup(g.id).length}</span>
            </button>
          );
        })}
      </div>

      <header className="carta__intro">
        <p className="eyebrow text-ink-muted">La carta · Costa Rica</p>
        <h2 className="carta__title">
          Treinta tragos,
          <span className="block text-lima italic">una sola barra.</span>
        </h2>
        <p className="carta__lede">
          Clásicos, firmas de la casa y opciones sin alcohol. Escoge los que quieras para tu barra.
        </p>
      </header>

      {/* ficha del trago: alto fijo, así cambiar de trago no mueve nada */}
      <div className="carta__sheet" aria-live="polite">
        <div key={drink.id} className="swap-in">
          <p className="micro text-lima">{drink.base}</p>
          <h3 className="carta__name">{drink.name}</h3>
          <ul className="carta__ings">
            {drink.ings.map((ing) => (
              <li key={ing}>{ing}</li>
            ))}
          </ul>
          <p className="carta__tag">{drink.tag}</p>
        </div>
      </div>

      <div
        ref={reel}
        className={`carta__reel ${dragging ? "is-dragging" : ""}`}
        onPointerDown={(e) => {
          if (e.pointerType === "mouse" && e.button !== 0) return;
          const width = reel.current?.clientWidth ?? 1000;
          press.current = { id: e.pointerId, x: e.clientX, step: width * (width > 900 ? 0.18 : 0.3), moved: false };
        }}
        onPointerMove={(e) => {
          const p = press.current;
          if (!p || p.id !== e.pointerId) return;
          const dx = e.clientX - p.x;
          if (!p.moved && Math.abs(dx) > 8) {
            p.moved = true;
            e.currentTarget.setPointerCapture(e.pointerId);
          }
          if (p.moved) setDrag({ dx, step: p.step });
        }}
        onPointerUp={(e) => {
          const p = press.current;
          if (!p || p.id !== e.pointerId) return;
          if (p.moved) {
            const dx = e.clientX - p.x;
            const steps = Math.round(-dx / p.step) || (Math.abs(dx) > 40 ? -Math.sign(dx) : 0);
            go(idx + Math.max(-3, Math.min(3, steps)));
            setDrag(null);
            // el clic que cierra el arrastre no elige trago
            window.setTimeout(() => (press.current = null), 0);
          } else {
            press.current = null;
          }
        }}
        onPointerCancel={() => {
          press.current = null;
          setDrag(null);
        }}
      >
        <span className="carta__aura" aria-hidden />
        <span className="carta__beam" aria-hidden />
        <span className="carta__floor" aria-hidden />
        {list.map((c, i) => {
          const d = offset(i, wrap(idx, n), n) + shift;
          const ad = Math.abs(d);
          if (ad > 4.2) return null;
          const live = Math.round(ad) === 0 && !dragging;
          return (
            <button
              key={`${group}-${c.id}`}
              type="button"
              tabIndex={ad < 3.5 ? 0 : -1}
              aria-label={live ? `${c.name}, en el centro` : `Ver ${c.name}`}
              aria-current={live || undefined}
              className={`carta__drink ${live ? "is-live" : ""}`}
              style={
                {
                  "--d": d.toFixed(3),
                  "--ad": ad.toFixed(3),
                  "--h": (0.3 + 0.62 * c.scale).toFixed(3),
                  "--ar": `${c.width} / ${c.height}`,
                  zIndex: 50 - Math.round(ad * 10),
                } as CSSProperties
              }
              onClick={() => {
                if (press.current?.moved) return;
                if (!live) go(i);
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.image} alt="" width={c.width} height={c.height} draggable={false} decoding="async" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="carta__mirror" src={c.image} alt="" aria-hidden draggable={false} decoding="async" />
            </button>
          );
        })}
      </div>

      <div className="carta__bar">
        <a href="#cotizar" className="btn-secondary carta__cta text-ink">
          Lo quiero en mi evento
        </a>
        <div className="carta__nav">
          <button type="button" className="carta__arrow" aria-label="Trago anterior" onClick={() => go(idx - 1)}>
            ←
          </button>
          <p className="carta__count" aria-label={`Trago ${wrap(idx, n) + 1} de ${n}`}>
            <span className="text-ink">{pad(wrap(idx, n) + 1)}</span>
            <span className="text-ink-faint"> / {pad(n)}</span>
          </p>
          <button type="button" className="carta__arrow" aria-label="Trago siguiente" onClick={() => go(idx + 1)}>
            →
          </button>
        </div>
        <p className="carta__hint micro">Arrastra · flechas · clic</p>
      </div>
    </section>
  );
}
