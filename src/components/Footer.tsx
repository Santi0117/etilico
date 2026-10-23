import Logo from "./Logo";
import Reveal from "./Reveal";
import { navLinks } from "@/lib/nav";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black">
      <div
        className="pointer-events-none absolute -bottom-40 left-1/2 h-[40vh] w-[80vw] -translate-x-1/2 rounded-full bg-lima/[0.08] blur-[120px]"
        aria-hidden
      />
      <div className="section-wrap relative pt-20 pb-10">
        <Reveal>
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <Logo variant="stacked" className="text-[3.6rem] text-ink sm:text-[4.6rem]" />
              <p className="mt-8 max-w-xs text-sm leading-relaxed text-ink-muted">
                {site.specialty} en {site.region}. Llegamos con la barra, el equipo y los
                bartenders.
              </p>
            </div>

            <nav className="md:col-span-3" aria-label="Pie de página">
              <p className="micro text-lima">Navegación</p>
              <ul className="mt-6 space-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="link-underline text-sm text-ink-soft">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="md:col-span-4">
              <p className="micro text-lima">Contacto</p>
              <ul className="mt-6 space-y-3 text-sm text-ink-soft">
                <li>
                  <a
                    href={site.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline"
                  >
                    Instagram @{site.instagram}
                  </a>
                </li>
                <li>
                  <a
                    href={site.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline"
                  >
                    Facebook {site.facebook}
                  </a>
                </li>
                <li>
                  <a
                    href={`https://wa.me/${site.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline"
                  >
                    WhatsApp {site.whatsappDisplay}
                  </a>
                </li>
                <li className="text-ink-faint">{site.hours}</li>
              </ul>

              <a href="#cotizar" className="btn-secondary mt-8 text-ink">
                Cotizar mi barra
              </a>
            </div>
          </div>
        </Reveal>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="micro text-ink-faint">
            © {new Date().getFullYear()} {site.fullName}
          </p>
          <p className="micro text-lima/70">{site.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
