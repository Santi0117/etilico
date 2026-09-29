"use client";

import { useState } from "react";
import Reveal from "./Reveal";

const includes = [
  {
    n: "01",
    title: "Montaje y desmontaje",
    tag: "Llegamos y nos vamos",
    text: "Llegamos antes, armamos la barra y nos llevamos todo al final. Vos no movés una caja.",
  },
  {
    n: "02",
    title: "Bartenders",
    tag: "Equipo en casa",
    text: "Equipo uniformado que sabe leer la fiesta y sostener el ritmo de servicio toda la noche.",
  },
  {
    n: "03",
    title: "Licores y mixers",
    tag: "La barra viaja llena",
    text: "Selección nacional o importada según el paquete, con jugos, sodas y garnish fresco.",
  },
  {
    n: "04",
    title: "Hielo y cristalería",
    tag: "Sin vasos plásticos",
    text: "Hielo suficiente, cristalería real y reposición constante durante todo el servicio.",
  },
  {
    n: "05",
    title: "Carta a la medida",
    tag: "Tragos de tu evento",
    text: "Elegimos juntos los tragos del evento, incluida la opción sin alcohol para todos.",
  },
  {
    n: "06",
    title: "Transporte",
    tag: "Todo Costa Rica",
    text: "San José, Guanacaste, Puntarenas o donde sea la fiesta. La barra viaja con nosotros.",
  },
] as const;

export default function Services() {
  const [active, setActive] = useState(0);
  const current = includes[active] ?? includes[0];

  return (
    <section id="servicios" className="section-pad relative overflow-hidden bg-noche">
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 h-[45vh] w-[70vw] -translate-x-1/2 rounded-full bg-lima/[0.07] blur-[130px]"
        aria-hidden
      />
      <div className="section-wrap relative">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <span className="eyebrow text-lima">Qué llega con la barra</span>
              <h2 className="display-lg mt-5 text-ink">
                Todo
                <span className="block">incluido.</span>
              </h2>
            </div>
            <div className="max-w-xs">
              <p className="font-display text-5xl text-ink">+500</p>
              <p className="micro mt-2 text-ink-faint">Eventos servidos en Costa Rica</p>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                No somos un bar al que vas: somos el servicio que llega a tu celebración con
                todo listo para brindar.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-0">
          <div
            className="border-t border-white/10 lg:col-span-5 lg:pr-12"
            role="tablist"
            aria-label="Qué incluye el servicio"
          >
            {includes.map((item, i) => {
              const on = active === i;
              return (
                <Reveal key={item.n} delay={i * 60}>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={on}
                    aria-controls="include-detail"
                    className={on ? "prop-pick prop-pick--tight is-on" : "prop-pick prop-pick--tight"}
                    onClick={() => setActive(i)}
                  >
                    <span className="micro text-ink-faint tabular-nums">{item.n}</span>
                    <span className="prop-pick__name">{item.title}</span>
                  </button>
                </Reveal>
              );
            })}
          </div>

          <div
            id="include-detail"
            role="tabpanel"
            className="flex flex-col lg:col-span-7 lg:border-l lg:border-white/10 lg:pl-12"
          >
            <div key={current.n} className="swap-in flex h-full flex-col">
              <span className="micro text-lima">{current.tag}</span>
              <h3 className="font-display mt-4 text-3xl text-ink md:text-4xl">{current.title}</h3>
              <p className="mt-6 max-w-md text-[0.95rem] leading-relaxed text-ink-soft">
                {current.text}
              </p>
              <div className="mt-9 lg:mt-auto lg:pt-10">
                <a href="#cotizar" className="btn-primary">
                  Armar mi barra
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
