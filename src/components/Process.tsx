import Reveal from "./Reveal";

const steps = [
  {
    n: "01",
    title: "Contanos del evento",
    text: "Fecha, lugar, cuánta gente y cuántas horas de barra. Con eso ya sabemos el tamaño del montaje.",
  },
  {
    n: "02",
    title: "Propuesta a medida",
    text: "Te armamos paquete, staff y carta con todo lo que incluye. Sin letra chica ni sorpresas.",
  },
  {
    n: "03",
    title: "Ajuste de carta",
    text: "Elegís clásicos, firmas, welcome drink y opciones sin alcohol. Queda cerrado antes del día.",
  },
  {
    n: "04",
    title: "Llegamos y brindamos",
    text: "Montaje, hielo, cristalería y bartenders. Vos recibís invitados; nosotros que no se seque el vaso.",
  },
];

export default function Process() {
  return (
    <section
      id="proceso"
      data-tone="light"
      className="section-pad relative overflow-hidden bg-hueso text-noche"
    >
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.3] mix-blend-multiply" aria-hidden />
      <div className="section-wrap relative">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <span className="eyebrow text-lima-deep">Cómo trabajamos</span>
              <h2 className="display-lg mt-5">
                De la cotización
                <span className="block italic opacity-60">al último brindis.</span>
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-noche/55">
              Cuatro pasos y listo. Organizar la barra debería ser lo más fácil de tu
              evento, y para eso trabajamos así.
            </p>
          </div>
        </Reveal>

        <ol className="mt-16 grid gap-px border-t border-black/15 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal key={step.n} delay={i * 90}>
              <li className="group relative h-full border-b border-black/15 py-9 md:border-b-0 md:pr-8 lg:border-r lg:last:border-r-0">
                <span className="font-display block text-6xl leading-none text-noche/15 transition-colors duration-700 group-hover:text-lima-deep/70 md:text-7xl">
                  {step.n}
                </span>
                <h3 className="mt-7 text-lg font-semibold tracking-tight">{step.title}</h3>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-noche/55">{step.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={420}>
          <div className="mt-14 flex flex-wrap items-center justify-between gap-6 border-t border-black/15 pt-10">
            <p className="font-display text-2xl md:text-3xl">¿Ya tenés fecha?</p>
            <a href="#cotizar" className="btn-primary !bg-noche !text-hueso hover:!bg-lima hover:!text-noche">
              Reservar mi fecha
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
