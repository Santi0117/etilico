import Reveal from "./Reveal";

const steps = [
  {
    n: "01",
    title: "Cuéntanos del evento",
    text: "Fecha, lugar, cuánta gente y cuántas horas de barra. Con eso ya sabemos el tamaño del montaje.",
  },
  {
    n: "02",
    title: "Propuesta a medida",
    text: "Te armamos el paquete, el equipo y la carta con todo lo que incluye.",
  },
  {
    n: "03",
    title: "Ajuste de carta",
    text: "Eliges clásicos, cocteles de autor, welcome drink y opciones sin alcohol. Todo queda cerrado antes del evento.",
  },
  {
    n: "04",
    title: "Llegamos y brindamos",
    text: "Montaje, hielo, cristalería y bartenders. Tú recibes a tus invitados; nosotros cuidamos que nadie se quede con el vaso vacío.",
  },
];

export default function Process() {
  return (
    <section id="proceso" className="section-pad relative overflow-hidden bg-carbon text-ink">
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.16] mix-blend-overlay" aria-hidden />
      <div
        className="pointer-events-none absolute top-1/4 right-[-10%] h-[45vh] w-[45vh] rounded-full bg-lima/[0.07] blur-[120px]"
        aria-hidden
      />
      <div className="section-wrap relative">
        <Reveal>
          <div className="max-w-xl">
            <span className="eyebrow text-lima">Cómo trabajamos</span>
            <h2 className="display-lg mt-5">
              De la cotización
              <span className="block italic text-ink-faint">al último brindis.</span>
            </h2>
          </div>
        </Reveal>

        <ol className="mt-16 grid gap-px border-t border-white/10 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal key={step.n} delay={i * 90}>
              <li className="group relative h-full border-b border-white/10 py-9 md:border-b-0 md:pr-8 lg:border-r lg:last:border-r-0">
                <span className="font-display block text-6xl leading-none text-white/15 transition-colors duration-700 group-hover:text-lima/70 md:text-7xl">
                  {step.n}
                </span>
                <h3 className="mt-7 text-lg font-semibold tracking-tight text-ink">{step.title}</h3>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-muted">{step.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={420}>
          <div className="mt-14 flex flex-wrap items-center justify-between gap-6 border-t border-white/10 pt-10">
            <p className="font-display text-2xl md:text-3xl">¿Ya tienes fecha?</p>
            <a href="#cotizar" className="btn-primary">
              Reservar mi fecha
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
