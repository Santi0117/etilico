import Reveal from "./Reveal";

const events = [
  {
    title: "Bodas",
    text: "Welcome drink, brindis y barra libre hasta el último baile.",
    image: "/nights/wedding.webp",
    pos: "center 38%",
  },
  {
    title: "Corporativos",
    text: "Lanzamientos, cenas de fin de año y after office con presencia de marca.",
    image: "/nights/lamp.webp",
    pos: "center 62%",
  },
  {
    title: "XV y cumpleaños",
    text: "Una barra que se ve tan bien como se toma. Fiesta, no improvisación.",
    image: "/nights/balloons.webp",
    pos: "center 48%",
  },
  {
    title: "Graduaciones",
    text: "Celebrá el logro con cocteles, shots y una barra que aguanta la noche.",
    image: "/nights/team.webp",
    pos: "center 42%",
  },
  {
    title: "Fiestas privadas",
    text: "En casa, quinta o rooftop. Llevamos todo y nos adaptamos al espacio.",
    image: "/nights/floral.webp",
    pos: "center 58%",
  },
  {
    title: "Eventos al aire libre",
    text: "Montaje para jardines, playas y fincas en todo el país.",
    image: "/nights/pool.webp",
    pos: "center 62%",
  },
];

export default function Events() {
  return (
    <section id="eventos" className="relative overflow-hidden bg-noche py-16 md:py-24">
      <div className="section-wrap">
        <Reveal>
          <div className="max-w-xl">
            <h2 className="display-md text-ink">Si hay evento, hay barra</h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-muted md:mt-4">
              Bodas, empresas, quinceaños o una noche en casa. Armamos el servicio al ritmo
              de tu invitación.
            </p>
          </div>
        </Reveal>

        <div className="evt-grid mt-8 md:mt-10">
          {events.map((event, i) => (
            <Reveal key={event.title} delay={i * 50}>
              <a href="#cotizar" className="evt-tile group">
                <img
                  src={event.image}
                  alt=""
                  className="evt-tile__img"
                  style={{ objectPosition: event.pos }}
                  loading="lazy"
                  decoding="async"
                />
                <span className="evt-tile__shade" aria-hidden />
                <span className="evt-tile__copy">
                  <span className="evt-tile__name">{event.title}</span>
                  <span className="evt-tile__text">{event.text}</span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
