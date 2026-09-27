"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { bars } from "@/lib/bars";

const N = bars.length;

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

export default function Bars() {
  const trackRef = useRef<HTMLElement>(null);
  const ghostRef = useRef<HTMLSpanElement>(null);
  const rigRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const tilt = useRef({ x: 0, y: 0 });
  const local = useRef(0);
  const idxRef = useRef(0);
  const [idx, setIdx] = useState(0);

  /** Mueve fantasma, barra y subrayado sin pasar por React. */
  const paint = useCallback(() => {
    const drift = (local.current - 0.5) * 22;

    if (ghostRef.current) {
      ghostRef.current.style.transform = `translate(-50%, -50%) translateX(${drift * 0.5}px)`;
    }
    if (rigRef.current) {
      rigRef.current.style.transform = `perspective(1400px) rotateX(${tilt.current.x}deg) rotateY(${tilt.current.y}deg) translateY(${drift * 0.35}px)`;
    }
    lineRefs.current.forEach((el, i) => {
      if (el) el.style.width = i === idxRef.current ? `${12 + local.current * 88}%` : "0%";
    });
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let frame = 0;
    const measure = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const p = total > 0 ? clamp01(-rect.top / total) : 0;
      const scaled = p * N;
      const next = Math.min(N - 1, Math.floor(scaled));

      idxRef.current = next;
      local.current = clamp01(scaled - next);
      paint();
      setIdx((cur) => (cur === next ? cur : next));
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
  }, [paint]);

  const goTo = useCallback((target: number) => {
    const el = trackRef.current;
    if (!el) return;
    const total = el.offsetHeight - window.innerHeight;
    const top = el.offsetTop + (total * (target + 0.42)) / N;
    window.scrollTo({ top, behavior: "smooth" });
  }, []);

  const bar = bars[idx];

  return (
    <section
      ref={trackRef}
      id="barras"
      aria-label="Nuestras barras"
      className="relative"
      style={{ height: `${(N + 1) * 100}vh` }}
    >
      <div
        className="stage sticky top-0 flex h-[100svh] flex-col overflow-hidden"
        data-tone={bar.tone}
        style={{
          ["--stage-bg" as string]: bar.bg,
          ["--stage-ink" as string]: bar.ink,
          ["--stage-accent" as string]: bar.accent,
        }}
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse") return;
          const r = e.currentTarget.getBoundingClientRect();
          tilt.current = {
            x: ((e.clientY - r.top) / r.height - 0.5) * -4,
            y: ((e.clientX - r.left) / r.width - 0.5) * 7,
          };
          paint();
        }}
        onPointerLeave={() => {
          tilt.current = { x: 0, y: 0 };
          paint();
        }}
      >
        <div
          className="grain pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-overlay"
          aria-hidden
        />

        {/* ----- encabezado de la escena ----- */}
        <div className="section-wrap relative z-20 flex items-center justify-between gap-4 pt-[5.5rem] pb-1 md:pt-[6.5rem] md:pb-2">
          <span className="eyebrow opacity-70">El montaje</span>
          <span className="micro flex items-center gap-3 opacity-70">
            <span className="tabular-nums">{bar.index}</span>
            <span className="h-px w-8 bg-current opacity-40" />
            <span className="tabular-nums">0{N}</span>
          </span>
        </div>

        {/* ----- escenario ----- */}
        <div className="relative flex-1">
          <span className="stage__halo" aria-hidden />
          <span ref={ghostRef} className="stage__ghost hidden md:block" aria-hidden>
            {bar.ghost}
          </span>

          <div className="section-wrap relative flex h-full flex-col lg:flex-row lg:items-center">
            {/* texto */}
            <div className="relative z-20 w-full shrink-0 pt-1 sm:max-w-md lg:max-w-[21rem]">
              <div key={bar.id} className="swap-in">
                <span className="micro" style={{ color: bar.accent }}>
                  {bar.kicker}
                </span>
                <h2 className="display-lg mt-3">{bar.name}</h2>
                <p className="mt-4 max-w-xs text-[0.82rem] leading-relaxed opacity-65 sm:text-sm lg:mt-5 lg:text-[0.95rem]">
                  {bar.intro}
                </p>

                <dl className="mt-7 hidden lg:block">
                  {bar.specs.map((spec) => (
                    <div key={spec.label} className="stage__spec">
                      <dt className="micro opacity-45">{spec.label}</dt>
                      <dd className="text-sm">{spec.value}</dd>
                    </div>
                  ))}
                </dl>

                <ul className="mt-4 flex flex-wrap gap-1.5 sm:gap-2 lg:mt-8">
                  {bar.fits.map((fit) => (
                    <li
                      key={fit}
                      className="rounded-full border px-2.5 py-1 text-[9px] tracking-[0.14em] uppercase sm:px-3 sm:py-1.5 sm:text-[10px]"
                      style={{ borderColor: `color-mix(in srgb, ${bar.ink} 22%, transparent)` }}
                    >
                      {fit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* barra */}
            <div
              ref={rigRef}
              className="pointer-events-none relative z-10 min-h-0 w-full flex-1 lg:absolute lg:inset-y-0 lg:right-0 lg:left-auto lg:h-full lg:w-[60%] lg:flex-none"
              style={{ transition: "transform 700ms var(--ease-luxe)" }}
            >
              <div className="relative h-full w-full pb-[5%]">
                {bars.map((item, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={item.id}
                    src={item.image}
                    alt={item.alt}
                    loading={i === 0 ? "eager" : "lazy"}
                    decoding="async"
                    className="stage__bar"
                    data-state={i === idx ? "in" : i < idx ? "prev" : "next"}
                  />
                ))}
                <span className="stage__shadow" aria-hidden />
              </div>
            </div>
          </div>
        </div>

        {/* ----- selector ----- */}
        <div className="section-wrap relative z-20 pb-[4.5rem] sm:pb-[max(1.5rem,env(safe-area-inset-bottom))]">
          <div className="grid grid-cols-3 gap-x-4 sm:gap-x-8">
            {bars.map((item, i) => (
              <button
                key={item.id}
                type="button"
                onClick={() => goTo(i)}
                aria-current={i === idx}
                className={i === idx ? "stage__pick is-on" : "stage__pick"}
              >
                <span className="stage__pick-num tabular-nums">{item.index}</span>
                <span className="stage__pick-name">{item.name}</span>
                <span
                  ref={(el) => {
                    lineRefs.current[i] = el;
                  }}
                  className="stage__pick-line"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
