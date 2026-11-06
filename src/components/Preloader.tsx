"use client";

import { useEffect, useRef, useState } from "react";

/** Logo oficial, en su tamaño en px. */
const LOGO = "/brand/etilico.png";
const W = 690;
const H = 876;
const MIN_MS = 1700;
const MAX_MS = 4600;

/** Assets que vale la pena tener listos antes de abrir el telón. */
const WARMUP = [
  LOGO,
  "/barras/slat.webp",
  "/cocteles/negroni.webp",
  "/cocteles/espresso-martini.webp",
];

function wavePath(progress: number, phase: number) {
  // el líquido sube desde la base del logo hasta taparlo entero
  const amp = 26 * (1 - progress * 0.55);
  const level = H + amp - (H + 2 * amp) * progress;
  const seg = W / 4;
  let d = `M ${-W + phase} ${level}`;
  for (let i = 0; i < 12; i += 1) {
    const x = -W + phase + i * seg;
    d += ` Q ${x + seg / 2} ${level + (i % 2 === 0 ? -amp : amp)} ${x + seg} ${level}`;
  }
  d += ` L ${2 * W} ${H + 80} L ${-W} ${H + 80} Z`;
  return d;
}

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);
  const [out, setOut] = useState(false);
  const [gone, setGone] = useState(false);
  const loaded = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const started = performance.now();

    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    const hash = window.location.hash;
    if (!hash) window.scrollTo(0, 0);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Precarga real: cada imagen que entra suma progreso.
    WARMUP.forEach((src) => {
      const img = new Image();
      const done = () => {
        loaded.current += 1;
      };
      img.onload = done;
      img.onerror = done;
      img.src = src;
    });

    let raf = 0;
    let shown = 0;

    const tick = (now: number) => {
      const elapsed = now - started;
      const assets = loaded.current / WARMUP.length;
      const docReady = document.readyState === "complete" ? 1 : 0.65;
      const timeFloor = Math.min(elapsed / MIN_MS, 1);

      // objetivo = lo más lento entre assets reales y el piso de tiempo
      let target = Math.min(assets * 0.55 + docReady * 0.45, timeFloor);
      if (elapsed > MAX_MS) target = 1;

      shown += (target - shown) * 0.08;
      if (target >= 0.999 && shown > 0.985) shown = 1;

      setProgress(shown);
      setPhase((p) => (p + (reduced ? 0 : W / 260)) % (W / 2));

      if (shown >= 1) {
        window.setTimeout(() => {
          setOut(true);
          document.documentElement.dataset.ready = "1";
          window.dispatchEvent(new Event("etilico:ready"));
          // si llegaron con ancla, recolocamos al abrir el telón
          if (hash) {
            document.querySelector(hash)?.scrollIntoView({ block: "start" });
          }
        }, reduced ? 0 : 360);
        window.setTimeout(
          () => {
            document.body.style.overflow = prevOverflow;
            setGone(true);
          },
          reduced ? 80 : 1500,
        );
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  if (gone) return null;

  const pct = Math.round(progress * 100);

  return (
    <div className={out ? "pre is-out" : "pre"} aria-hidden>
      <div className="pre__panel pre__panel--top" />
      <div className="pre__panel pre__panel--bottom" />

      <div className="pre__drops">
        {[12, 26, 41, 58, 73, 88].map((left, i) => (
          <span
            key={left}
            className="pre__drop"
            style={{
              left: `${left}%`,
              ["--dur" as string]: `${2.2 + (i % 3) * 0.7}s`,
              ["--delay" as string]: `${i * 0.42}s`,
            }}
          />
        ))}
      </div>

      <div className="pre__core">
        <span className="pre__mark">
          <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Etílico">
            <defs>
              <linearGradient id="pre-pour" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#d4e44a" />
                <stop offset="55%" stopColor="#eef5b8" />
                <stop offset="100%" stopColor="#f7f4ec" />
              </linearGradient>
              <mask id="pre-logo">
                <image href={LOGO} width={W} height={H} />
              </mask>
              <mask id="pre-liquid">
                <rect x={-W} y={-H} width={W * 3} height={H * 3} fill="black" />
                <path d={wavePath(progress, phase)} fill="white" />
              </mask>
            </defs>

            {/* el logo se llena como una copa */}
            <g mask="url(#pre-logo)">
              <rect className="pre__glyph-ghost" width={W} height={H} />
              <rect width={W} height={H} fill="url(#pre-pour)" mask="url(#pre-liquid)" />
            </g>
          </svg>
        </span>

        <span className="pre__bar">
          <i style={{ width: `${pct}%` }} />
        </span>

        <span className="pre__meta">
          <span>Sirviendo la barra</span>
          <span className="pre__count">{String(pct).padStart(3, "0")}</span>
        </span>
      </div>

      <span className="pre__seam" />
    </div>
  );
}
