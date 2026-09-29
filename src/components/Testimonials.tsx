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

function Stars() {
  return (
    <span className="review-stars" aria-label="5 de 5 estrellas">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" aria-hidden>
          <path d="M10 1.35 12.47 6.4l5.58.81-4.04 3.94.95 5.55L10 14.27 5.04 16.7l.95-5.55L1.95 7.21l5.58-.81L10 1.35Z" />
        </svg>
      ))}
    </span>
  );
}

export default function Testimonials() {
  return (
    <section id="reseñas" className="relative overflow-hidden bg-noche py-16 md:py-24">
      <div className="section-wrap">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="review-kicker">Quiénes ya brindaron</span>
            <h2 className="display-md mt-5 text-ink">El after se recuerda por la barra</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted md:mt-4">
              Eventos en Costa Rica donde la copa, el ritmo y el montaje hicieron la diferencia.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-4 md:mt-12 md:grid-cols-3 md:gap-5">
          {quotes.map((quote, i) => (
            <Reveal key={quote.name} delay={i * 80}>
              <blockquote className="review-card">
                <Stars />
                <p className="review-card__text">“{quote.text}”</p>
                <footer className="mt-auto pt-6">
                  <p className="font-medium text-ink">{quote.name}</p>
                  <p className="mt-1 text-sm text-ink-faint">{quote.role}</p>
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
