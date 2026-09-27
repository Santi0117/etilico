"use client";

import { useState } from "react";
import Reveal from "./Reveal";

const includes = [
  {
    n: "01",
    title: "Montaje y desmontaje",
    text: "Llegamos antes, armamos la barra y nos llevamos todo al final. Vos no movés una caja.",
  },
  {
    n: "02",
    title: "Bartenders profesionales",
    text: "Equipo uniformado que sabe leer la fiesta y sostener el ritmo de servicio toda la noche.",
  },
  {
    n: "03",
    title: "Licores y mixers",
    text: "Selección nacional o importada según el paquete, con jugos, sodas y garnish fresco.",
  },
  {
    n: "04",
    title: "Hielo y cristalería",
    text: "Hielo suficiente, cristalería real y reposición constante. Sin vasos plásticos.",
  },
  {
    n: "05",
    title: "Carta a la medida",
    text: "Elegimos juntos los tragos del evento, incluida la opción sin alcohol para todos.",
  },
  {
    n: "06",
    title: "Transporte a todo el país",
    text: "San José, Guanacaste, Puntarenas o donde sea la fiesta. La barra viaja con nosotros.",
  },
];

export default function Services() {
  const [open, setOpen] = useState(0);

  return (
    <section
      id="servicios"
      data-tone="light"
      className="section-pad relative overflow-hidden bg-hueso text-noche"
    >
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.3] mix-blend-multiply" aria-hidden />
      <div className="section-wrap relative grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <span className="eyebrow text-lima-deep">Qué llega con la barra</span>
            <h2 className="display-lg mt-5">
              Todo incluido,
              <span className="block italic opacity-60">de verdad.</span>
            </h2>
            <p className="mt-7 max-w-sm text-sm leading-relaxed text-noche/60 md:text-base">
              No somos un bar al que vas: somos el servicio que llega a tu celebración con
              todo listo para brindar. Vos ponés el lugar y la gente.
            </p>

            <div className="mt-10 border-t border-black/15 pt-8">
              <p className="font-display text-5xl">377+</p>
              <p className="micro mt-2 text-noche/50">Eventos servidos en Costa Rica</p>
            </div>

            <a href="#cotizar" className="btn-primary mt-10 !bg-noche !text-hueso hover:!bg-lima hover:!text-noche">
              Armar mi barra
            </a>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <dl className="border-b border-black/15">
            {includes.map((item, i) => {
              const on = open === i;
              return (
                <Reveal key={item.n} delay={i * 60}>
                  <div className="border-t border-black/15">
                    <button
                      type="button"
                      onClick={() => setOpen(on ? -1 : i)}
                      aria-expanded={on}
                      className="flex w-full items-center gap-5 py-6 text-left"
                    >
                      <dt className="micro w-8 shrink-0 text-noche/35 tabular-nums">{item.n}</dt>
                      <span
                        className={`font-display flex-1 text-2xl transition-opacity duration-500 md:text-3xl ${
                          on ? "opacity-100" : "opacity-55"
                        }`}
                      >
                        {item.title}
                      </span>
                      <span
                        className={`relative h-4 w-4 shrink-0 transition-transform duration-500 ease-[var(--ease-luxe)] ${
                          on ? "rotate-45" : ""
                        }`}
                        aria-hidden
                      >
                        <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-noche" />
                        <span className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-noche" />
                      </span>
                    </button>
                    <dd
                      className="grid overflow-hidden transition-[grid-template-rows,opacity] duration-700 ease-[var(--ease-luxe)]"
                      style={{ gridTemplateRows: on ? "1fr" : "0fr", opacity: on ? 1 : 0 }}
                    >
                      <span className="overflow-hidden">
                        <span className="block max-w-md pb-7 pl-13 text-sm leading-relaxed text-noche/60">
                          {item.text}
                        </span>
                      </span>
                    </dd>
                  </div>
                </Reveal>
              );
            })}
          </dl>
        </div>
      </div>
    </section>
  );
}
