import Reveal from "./Reveal";

const quotes = [
  {
    name: "Mariana R.",
    role: "Boda · San José",
    text: "La barra se volvió el centro de la fiesta. Llegaron puntuales, la carta quedó exactamente como la pedimos y nadie tuvo que esperar por un trago.",
  },
  {
    name: "Andrés L.",
    role: "Cena corporativa · Heredia",
    text: "Se notó el nivel. Welcome drink, barra vestida y un equipo que entendió el tono del evento. Los invitados todavía hablan de los cocteles.",
  },
  {
    name: "Sofía M.",
    role: "Cumpleaños · Guanacaste",
    text: "Montaron todo en la quinta y se adaptaron al espacio. Barra libre sin estrés, que es exactamente lo que uno quiere cuando es anfitrión.",
  },
];

export default function Testimonials() {
  return (
    <section className="section-pad relative overflow-hidden bg-carbon">
      <div className="section-wrap">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow justify-center text-lima">Quiénes ya brindaron</span>
            <h2 className="display-lg mt-5 text-ink">El after se recuerda por la barra</h2>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-px md:grid-cols-3">
          {quotes.map((quote, i) => (
            <Reveal key={quote.name} delay={i * 90}>
              <blockquote className="flex h-full flex-col border-t border-white/10 pt-8 md:px-7 md:first:pl-0 md:last:pr-0">
                <span className="font-display text-5xl leading-none text-lima/50" aria-hidden>
                  “
                </span>
                <p className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-ink-soft">
                  {quote.text}
                </p>
                <footer className="mt-8">
                  <p className="font-display text-xl text-ink">{quote.name}</p>
                  <p className="micro mt-1.5 text-ink-faint">{quote.role}</p>
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
