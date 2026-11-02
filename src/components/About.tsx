import Reveal from "./Reveal";
import { site } from "@/lib/site";

const values = [
  {
    title: "Llegamos nosotros",
    text: "No tenés que buscar hielo, copas ni quién sirva. Montaje, staff y barra viajan con el servicio.",
  },
  {
    title: "Carta según la fiesta",
    text: "Una boda no se toma igual que un after office. Ajustamos licores, cocteles y ritmo de servicio.",
  },
  {
    title: "La barra también se ve",
    text: "Iluminación, cristalería y presentación cuidada. La barra es parte de la foto, no un rincón improvisado.",
  },
];

export default function About() {
  return (
    <section className="section-pad relative overflow-hidden bg-noche">
      <div className="section-wrap grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <div className="relative">
            <div
              className="pointer-events-none absolute -inset-8 rounded-full bg-lima/15 blur-[80px]"
              aria-hidden
            />
            <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/cocteles/moscow-mule.webp"
                alt="Moscow Mule servido en taza de cobre por el equipo de Etílico"
                width={1022}
                height={1280}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <div className="absolute -right-3 -bottom-8 w-28 overflow-hidden rounded-xl border border-white/15 shadow-2xl shadow-black/60 sm:-right-7 sm:-bottom-10 sm:w-40">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/cocteles/margarita-chamoy-sm.webp"
                alt="Margarita con borde de chamoy"
                width={560}
                height={701}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-7 lg:pl-8">
          <span className="eyebrow text-lima">La casa</span>
          <h2 className="display-lg mt-5 text-ink">
            Un servicio de barra,
            <span className="block text-ink-faint italic">no un bar más.</span>
          </h2>
          <p className="mt-7 max-w-lg text-[0.95rem] leading-relaxed text-ink-muted md:text-base">
            {site.bio} Más de cinco mil personas siguen el trabajo en Instagram y el
            estándar se ve en cada copa que sale de la barra.
          </p>

          <ul className="mt-10">
            {values.map((value) => (
              <li key={value.title} className="border-t border-white/10 py-6 last:border-b">
                <p className="font-display text-xl text-ink md:text-2xl">{value.title}</p>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-muted">{value.text}</p>
              </li>
            ))}
          </ul>

          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost group mt-8 text-ink-soft"
          >
            Ver el trabajo en Instagram
            <span className="transition-transform duration-500 ease-[var(--ease-luxe)] group-hover:translate-x-1">
              →
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
