"use client";

import { useCallback, useRef, useState } from "react";
import { bars } from "@/lib/bars";

const N = bars.length;

export default function Bars() {
  const rigRef = useRef<HTMLDivElement>(null);
  const tilt = useRef({ x: 0, y: 0 });
  const [idx, setIdx] = useState(0);
  const bar = bars[idx];

  const paint = useCallback(() => {
    if (rigRef.current) {
      rigRef.current.style.transform = `perspective(1400px) rotateX(${tilt.current.x}deg) rotateY(${tilt.current.y}deg)`;
    }
  }, []);

  return (
    <section
      id="barras"
      aria-label="Nuestras barras"
      data-tone={bar.tone}
      className="bar-stage relative flex min-h-[100svh] flex-col"
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

      <div className="section-wrap relative z-20 flex items-center justify-between gap-4 pt-[5.5rem] pb-1 md:pt-[6.5rem] md:pb-2">
        <span className="eyebrow opacity-70">El montaje</span>
        <span className="micro flex items-center gap-3 opacity-70">
          <span className="tabular-nums">{bar.index}</span>
          <span className="h-px w-8 bg-current opacity-40" />
          <span className="tabular-nums">0{N}</span>
        </span>
      </div>

      <div className="relative flex min-h-0 flex-1 flex-col lg:grid lg:grid-cols-12 lg:items-center">
        <span className="bar-stage__halo" aria-hidden />
        <span className="bar-stage__ghost hidden md:block" aria-hidden>
          {bar.ghost}
        </span>

        <div className="section-wrap relative z-20 w-full shrink-0 pt-2 sm:max-w-md lg:col-span-4 lg:max-w-none lg:pt-0">
          <div key={bar.id} className="swap-in">
            <span className="micro" style={{ color: bar.accent }}>
              {bar.kicker}
            </span>
            <h2 className="display-lg mt-2 lg:mt-3">{bar.name}</h2>
            <p className="mt-3 hidden max-w-xs text-[0.82rem] leading-relaxed opacity-65 sm:block sm:text-sm lg:mt-5 lg:text-[0.95rem]">
              {bar.intro}
            </p>

            <dl className="mt-7 hidden lg:block">
              {bar.specs.map((spec) => (
                <div key={spec.label} className="bar-stage__spec">
                  <dt className="micro opacity-45">{spec.label}</dt>
                  <dd className="text-sm">{spec.value}</dd>
                </div>
              ))}
            </dl>

            <ul className="mt-3 hidden flex-wrap gap-1.5 sm:mt-4 sm:flex sm:gap-2 lg:mt-8">
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

        <div
          ref={rigRef}
          className="bar-stage__rig z-10 lg:col-span-8"
          style={{ transition: "transform 700ms var(--ease-luxe)" }}
        >
          {bars.map((item, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={item.id}
              src={item.image}
              alt={item.alt}
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
              className="bar-stage__bar"
              data-state={i === idx ? "in" : i < idx ? "prev" : "next"}
            />
          ))}
          <span className="bar-stage__shadow" aria-hidden />
        </div>

        <p className="section-wrap relative z-20 mt-3 max-w-xs text-[0.82rem] leading-relaxed opacity-65 sm:hidden">
          {bar.intro}
        </p>
      </div>

      <div className="section-wrap relative z-20 pt-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] lg:pt-4 lg:pb-[4.5rem]">
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {bars.map((item, i) => {
            const on = i === idx;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setIdx(i)}
                aria-current={on ? true : undefined}
                className={on ? "bar-stage__pick is-on" : "bar-stage__pick"}
                style={{ background: bar.bg, color: bar.ink }}
              >
                <span className="bar-stage__pick-num tabular-nums">{item.index}</span>
                <span className="bar-stage__pick-name">{item.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
