"use client";

import { useEffect, useState } from "react";
import { cocktails } from "@/lib/cocktails";
import { useReady } from "@/hooks/useReady";
import { site } from "@/lib/site";

const REEL = ["espresso-martini", "paloma", "negroni", "blue-lagoon", "margarita-chamoy"]
  .map((id) => cocktails.find((c) => c.id === id)!)
  .filter(Boolean);

const stats = [
  { value: "500", suffix: "+", label: "Eventos servidos" },
  { value: "5.3", suffix: "k", label: "En Instagram" },
  { value: "3", suffix: "", label: "Barras propias" },
  { value: "CR", suffix: "", label: "Todo el país" },
];

export default function Hero() {
  const ready = useReady();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (!ready) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setI((v) => (v + 1) % REEL.length), 4200);
    return () => window.clearInterval(id);
  }, [ready]);

  const drink = REEL[i];
  const show = (delay: number) => ({
    transitionDelay: `${delay}ms`,
    opacity: ready ? 1 : 0,
    transform: ready ? "none" : "translateY(26px)",
  });
  const fade = "transition-all duration-[1100ms] ease-[var(--ease-luxe)]";

  return (
    <section
      id="inicio"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-noche pt-[5.5rem]"
    >
      {/* luz de ambiente teñida por el trago en pantalla */}
      <div
        className="animate-glow pointer-events-none absolute top-[-18%] right-[-10%] h-[70vh] w-[70vh] rounded-full blur-[110px] transition-[background] duration-[1400ms]"
        style={{ background: `radial-gradient(circle, ${drink.tint}55, transparent 68%)` }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-[-25%] left-[-15%] h-[60vh] w-[60vh] rounded-full bg-lima/10 blur-[120px]"
        aria-hidden
      />
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.16] mix-blend-overlay" aria-hidden />
      <div
        className="pointer-events-none absolute inset-y-0 left-[6%] hidden w-px bg-gradient-to-b from-transparent via-white/12 to-transparent lg:block"
        aria-hidden
      />

      <div className="section-wrap relative z-10 flex flex-1 flex-col">
        <div className="grid flex-1 items-center gap-10 py-6 lg:grid-cols-12 lg:gap-10 lg:py-8">
          {/* ---------- palabra ---------- */}
          <div className="lg:col-span-7">
            <p className={`eyebrow text-ink-muted ${fade}`} style={show(120)}>
              Barra libre · {site.region}
            </p>

            <h1 className="mt-6 text-ink">
              <span className="reveal-mask block">
                <span
                  className="display-xl block"
                  style={{
                    transform: ready ? "none" : "translateY(105%)",
                    transitionDelay: "220ms",
                  }}
                >
                  BARRA
                </span>
              </span>
              <span className="reveal-mask mt-1 block">
                <span
                  className="display-xl block"
                  style={{
                    transform: ready ? "none" : "translateY(105%)",
                    transitionDelay: "330ms",
                  }}
                >
                  LIBRE
                </span>
              </span>
              <span className="reveal-mask mt-2 block">
                <span
                  className="font-display block text-[clamp(1.5rem,4vw,2.9rem)] text-lima italic"
                  style={{
                    transform: ready ? "none" : "translateY(105%)",
                    transitionDelay: "430ms",
                  }}
                >
                  para tu evento.
                </span>
              </span>
            </h1>

            <div className={`mt-9 max-w-md ${fade}`} style={show(600)}>
              <span className="block h-px w-14 bg-lima" />
              <p className="mt-6 text-[0.95rem] leading-relaxed text-ink-soft md:text-base">
                Llevamos la barra, el equipo y los bartenders a tu boda, corporativo o
                fiesta. Vos ponés la fecha y la lista de invitados; nosotros ponemos todo
                lo demás.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#cotizar" className="btn-primary group">
                  Cotizar mi barra
                  <span className="transition-transform duration-500 ease-[var(--ease-luxe)] group-hover:translate-x-1">
                    →
                  </span>
                </a>
                <a href="#barras" className="btn-secondary text-ink">
                  Ver las barras
                </a>
              </div>
            </div>
          </div>

          {/* ---------- copa ---------- */}
          <div className={`lg:col-span-5 ${fade}`} style={show(520)}>
            <div className="relative mx-auto w-full max-w-[19rem] sm:max-w-[21rem] lg:ml-auto lg:mr-0">
              <div
                className="hero-glow"
                style={{ background: `radial-gradient(circle, ${drink.tint}, transparent 70%)` }}
                aria-hidden
              />
              <div className="hero-frame aspect-[4/5] border border-white/12 bg-carbon">
                {REEL.map((c, idx) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={c.id}
                    src={c.thumb}
                    srcSet={`${c.thumb} 560w, ${c.image} 1100w`}
                    sizes="(min-width: 1024px) 21rem, 19rem"
                    alt={`${c.name} servido por Etílico`}
                    width={1022}
                    height={1280}
                    loading={idx === 0 ? "eager" : "lazy"}
                    fetchPriority={idx === 0 ? "high" : "auto"}
                    data-state={idx === i ? "in" : "out"}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ))}
                <span
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-noche/80 via-transparent to-transparent"
                  aria-hidden
                />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                  <span>
                    <span className="micro block text-lima">{drink.base}</span>
                    <span className="font-display mt-1 block text-2xl text-ink">{drink.name}</span>
                  </span>
                  <span className="micro text-ink-muted">{drink.n}</span>
                </span>
              </div>

              <div className="mt-4 flex items-center justify-center gap-2" role="tablist" aria-label="Cocteles destacados">
                {REEL.map((c, idx) => (
                  <button
                    key={c.id}
                    type="button"
                    role="tab"
                    aria-selected={idx === i}
                    aria-label={c.name}
                    onClick={() => setI(idx)}
                    className={`h-px transition-all duration-700 ease-[var(--ease-luxe)] ${
                      idx === i ? "w-9 bg-lima" : "w-4 bg-white/25 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ---------- pie del hero ---------- */}
        <div className={`${fade} pb-6`} style={show(820)}>
          <dl className="grid grid-cols-2 border-t border-white/10 sm:grid-cols-4">
            {stats.map((stat, idx) => (
              <div
                key={stat.label}
                className={`py-4 sm:px-6 md:py-5 ${idx > 0 ? "sm:border-l sm:border-white/10" : ""} ${
                  idx % 2 === 1 ? "border-l border-white/10 pl-5 sm:pl-6" : ""
                }`}
              >
                <dt className="font-display text-3xl tracking-tight text-ink md:text-4xl">
                  {stat.value}
                  <span className="text-lima">{stat.suffix}</span>
                </dt>
                <dd className="micro mt-1.5 text-ink-faint">{stat.label}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-5 flex items-center justify-between gap-4">
            <span className="micro text-ink-faint">Bodas · Corporativos · XV · Privadas</span>
            <span className="scroll-cue hidden h-10 w-px overflow-hidden bg-white/10 sm:block" aria-hidden>
              <i />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
