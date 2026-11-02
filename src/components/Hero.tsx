"use client";

import { useCallback, useEffect, useState } from "react";
import { cocktailById } from "@/lib/cocktails";
import { useReady } from "@/hooks/useReady";
import { site } from "@/lib/site";
import CocktailStage from "./CocktailStage";
import TrustMarquee from "./TrustMarquee";

const REEL = [
  "negroni",
  "espresso-martini",
  "aperol-spritz",
  "paloma",
  "cosmopolitan",
  "moscow-mule",
  "blue-lagoon",
  "pina-colada",
]
  .map((id) => cocktailById(id)!)
  .filter(Boolean);

const stats = [
  { value: "500", suffix: "+", label: "Eventos servidos" },
  { value: "5.3", suffix: "k", label: "Seguidores en Instagram" },
  { value: "3", suffix: "", label: "Barras propias" },
  { value: "CR", suffix: "", label: "Todo el país" },
];

const wrap = (n: number) => (n + REEL.length) % REEL.length;

export default function Hero() {
  const ready = useReady();
  const [view, setView] = useState<{ i: number; dir: 1 | -1 }>({ i: 0, dir: 1 });
  const [hold, setHold] = useState(false);

  const step = useCallback((dir: 1 | -1) => {
    setView((v) => ({ i: wrap(v.i + dir), dir }));
  }, []);

  // pasa solo; cada clic reinicia la cuenta
  useEffect(() => {
    if (!ready || hold) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => step(1), 5200);
    return () => window.clearTimeout(id);
  }, [ready, hold, view, step]);

  const drink = REEL[view.i];
  const show = (delay: number) => ({
    transitionDelay: `${delay}ms`,
    opacity: ready ? 1 : 0,
    transform: ready ? "none" : "translateY(26px)",
  });
  const fade = "transition-all duration-[1100ms] ease-[var(--ease-luxe)]";

  return (
    <section id="inicio" className="hero relative flex min-h-[100svh] flex-col overflow-hidden bg-noche pt-[4.5rem] md:pt-20">
      <div className="stage-lines" aria-hidden />
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay" aria-hidden />

      <div className="section-wrap relative z-10 flex flex-1 flex-col">
        <div className="grid flex-1 items-center gap-2 pt-8 lg:grid-cols-12 lg:gap-6 lg:pt-4">
          {/* ---------- palabra ---------- */}
          <div className="lg:col-span-6 xl:col-span-5">
            <p className={`eyebrow text-ink-muted ${fade}`} style={show(120)}>
              Barra libre · {site.region}
            </p>

            <h1 className="mt-6 text-ink">
              <span className="reveal-mask block">
                <span
                  className="display-xl block"
                  style={{ transform: ready ? "none" : "translateY(105%)", transitionDelay: "220ms" }}
                >
                  BARRA
                </span>
              </span>
              <span className="reveal-mask block">
                <span
                  className="display-xl block"
                  style={{ transform: ready ? "none" : "translateY(105%)", transitionDelay: "330ms" }}
                >
                  LIBRE
                </span>
              </span>
              <span className="reveal-mask mt-3 block">
                <span
                  className="font-display block text-[clamp(1.6rem,3.6vw,2.6rem)] leading-tight text-ink-soft italic"
                  style={{ transform: ready ? "none" : "translateY(105%)", transitionDelay: "430ms" }}
                >
                  para tu evento.
                </span>
              </span>
            </h1>

            <div className={`mt-5 max-w-md ${fade}`} style={show(600)}>
              <p className="text-[0.95rem] leading-relaxed text-ink-soft md:text-base">
                Llevamos la barra, el equipo y los bartenders a tu evento, sea cual sea la ocasión. Tú
                pones la fecha y los invitados; nosotros, todo lo demás.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#cotizar" className="btn-primary group !px-6 !py-3.5">
                  Cotizar mi barra
                  <span className="transition-transform duration-500 ease-[var(--ease-luxe)] group-hover:translate-x-1">
                    →
                  </span>
                </a>
                <a href="#barras" className="btn-secondary !px-6 !py-3.5 text-ink">
                  Ver las barras
                </a>
              </div>
            </div>
          </div>

          {/* ---------- escenario ---------- */}
          <div
            className={`lg:col-span-6 xl:col-span-7 ${fade}`}
            style={show(520)}
            onPointerEnter={(e) => e.pointerType === "mouse" && setHold(true)}
            onPointerLeave={() => setHold(false)}
          >
            <CocktailStage
              drink={drink}
              dir={view.dir}
              onPrev={() => step(-1)}
              onNext={() => step(1)}
              preload={[REEL[wrap(view.i + 1)], REEL[wrap(view.i - 1)]]}
              priority
              className="stage--hero"
              label="Cocteles de la casa"
            />
          </div>
        </div>

        {/* ---------- cifras ---------- */}
        <dl className={`grid grid-cols-2 gap-y-5 pt-4 pb-7 sm:grid-cols-4 ${fade}`} style={show(820)}>
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="font-display text-3xl tracking-tight text-ink md:text-[2.4rem] md:leading-none">
                {stat.value}
                <span className="text-ink-faint">{stat.suffix}</span>
              </dt>
              <dd className="micro mt-2 text-ink-faint">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>

      <TrustMarquee />
    </section>
  );
}
