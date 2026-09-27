"use client";

import { useState } from "react";
import Reveal from "./Reveal";

const proposals = [
  {
    id: "esencial",
    index: "01",
    level: 1,
    name: "Esencial",
    tag: "La fiesta fluye",
    vibe: "After office · íntimo",
    featured: false,
    points: [
      "Barra libre de cerveza, vino y licores nacionales",
      "Mixers, hielo y cristalería incluidos",
      "Un bartender y montaje básico",
      "Ideal para after office y fiestas en casa",
    ],
  },
  {
    id: "premium",
    index: "02",
    level: 2,
    name: "Premium",
    tag: "El más pedido",
    vibe: "Bodas · corporativos",
    featured: true,
    points: [
      "Barra libre con selección importada",
      "Coctelería clásica a la carta",
      "Staff de bartenders y barra vestida",
      "Welcome drink de bienvenida",
      "Pensado para bodas y eventos de empresa",
    ],
  },
  {
    id: "signature",
    index: "03",
    level: 3,
    name: "Signature",
    tag: "Mixología a medida",
    vibe: "La noche completa",
    featured: false,
    points: [
      "Carta de autor diseñada para tu evento",
      "Estaciones de coctelería y show de barra",
      "Iluminación y presentación premium",
      "Opciones sin alcohol y menú personalizado",
      "Fotografía de producto de tus tragos firma",
    ],
  },
] as const;

export default function Packages() {
  const [active, setActive] = useState<(typeof proposals)[number]["id"]>("premium");
  const current = proposals.find((item) => item.id === active) ?? proposals[1];

  return (
    <section id="propuestas" className="section-pad relative overflow-hidden bg-noche">
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 h-[45vh] w-[70vw] -translate-x-1/2 rounded-full bg-lima/[0.07] blur-[130px]"
        aria-hidden
      />
      <div className="section-wrap relative">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <span className="eyebrow text-lima">Propuestas</span>
              <h2 className="display-lg mt-5 text-ink">Qué tan lejos va la noche</h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-ink-muted">
              Tres intensidades. Elegís el nivel y nosotros armamos la barra: horas,
              invitados y carta se afinan en la cotización.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-0">
          <div className="border-t border-white/10 lg:col-span-5 lg:pr-12" role="tablist" aria-label="Propuestas de barra">
            {proposals.map((pack, i) => {
              const on = active === pack.id;
              return (
                <Reveal key={pack.id} delay={i * 80}>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={on}
                    aria-controls="prop-detail"
                    className={on ? "prop-pick is-on" : "prop-pick"}
                    onClick={() => setActive(pack.id)}
                  >
                    <span className="micro text-ink-faint tabular-nums">{pack.index}</span>
                    <span className="flex min-w-0 flex-col gap-1.5">
                      <span className="prop-pick__name">{pack.name}</span>
                      <span className="micro text-ink-faint">{pack.vibe}</span>
                    </span>
                    <span className="prop-pick__meter" aria-hidden>
                      {[1, 2, 3].map((bar) => (
                        <i key={bar} className={bar <= pack.level ? "is-lit" : undefined} />
                      ))}
                    </span>
                  </button>
                </Reveal>
              );
            })}
          </div>

          <div
            id="prop-detail"
            role="tabpanel"
            className="flex flex-col lg:col-span-7 lg:border-l lg:border-white/10 lg:pl-12"
          >
            <div key={current.id} className="swap-in flex h-full flex-col">
              <span className="micro text-lima">{current.tag}</span>
              <p className="micro mt-3 text-ink-faint">{current.vibe}</p>
              <ul className="mt-8">
                {current.points.map((point) => (
                  <li
                    key={point}
                    className="grid grid-cols-[6px_1fr] items-start gap-4 border-t border-white/10 py-4 text-[0.95rem] leading-relaxed text-ink-soft last:border-b"
                  >
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-lima" aria-hidden />
                    {point}
                  </li>
                ))}
              </ul>
              <div className="mt-9 lg:mt-auto lg:pt-10">
                <a
                  href="#cotizar"
                  className={current.featured ? "btn-primary" : "btn-secondary text-ink"}
                >
                  Cotizar {current.name}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
