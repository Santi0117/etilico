"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useTone } from "@/hooks/useTone";
import { navLinks } from "@/lib/nav";
import { site } from "@/lib/site";

const SECTION_IDS = navLinks.map((l) => l.id);

function InstagramIcon({ className = "h-[18px] w-[18px]" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5Zm8.75 2.25a.75.75 0 0 1 .75.75v.01a.75.75 0 0 1-1.5 0V6.5a.75.75 0 0 1 .75-.75ZM12 7a5 5 0 1 1 0 10 5 5 0 1 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" />
    </svg>
  );
}

function InstagramLink({
  light,
  className = "",
}: {
  light: boolean;
  className?: string;
}) {
  return (
    <a
      href={site.instagramUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Instagram @${site.instagram}`}
      className={`flex h-11 w-11 items-center justify-center rounded-full border transition duration-500 ${
        light
          ? "border-black/15 text-noche hover:border-black/40 hover:text-noche"
          : "border-white/15 text-ink hover:border-lima/60 hover:text-lima"
      } ${className}`}
    >
      <InstagramIcon />
    </a>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const active = useActiveSection(SECTION_IDS);
  const tone = useTone();
  const light = tone === "light" && !open;

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 420 && y > last && !open);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        style={{ ["--nav-accent" as string]: light ? "#101112" : "#d4e44a" }}
        className={`fixed inset-x-0 top-0 z-[90] transition-[transform,background-color,border-color,color] duration-700 ease-[var(--ease-luxe)] ${
          hidden ? "-translate-y-full" : "translate-y-0"
        } ${light ? "text-noche" : "text-ink"} ${
          scrolled && !open
            ? light
              ? "border-b border-black/10 bg-hueso/70 backdrop-blur-xl"
              : "border-b border-white/10 bg-noche/70 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <div className="section-wrap relative flex h-[4.5rem] items-center justify-between gap-4 md:h-20 lg:grid lg:grid-cols-[1fr_auto_1fr]">
          <a href="#inicio" aria-label="Inicio" className="relative z-10 min-w-0 shrink justify-self-start">
            <Logo className="h-11 sm:h-[3.25rem]" />
          </a>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Principal">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={active === link.id ? "nav-pill is-on" : "nav-pill"}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* filete bajo el menú, dentro del ancho del contenido, solo arriba del todo */}
          <span
            className={`pointer-events-none absolute inset-x-5 bottom-0 h-px bg-current transition-opacity duration-700 sm:inset-x-8 lg:inset-x-12 ${
              scrolled || open ? "opacity-0" : "opacity-[0.12]"
            }`}
            aria-hidden
          />

          <div className="flex items-center gap-2 justify-self-end sm:gap-3">
            <InstagramLink light={light} className="lg:hidden" />
            <a
              href="#cotizar"
              className={`btn-primary hidden !px-6 !py-3 md:inline-flex ${
                light ? "!bg-noche !text-hueso hover:!bg-lima hover:!text-noche" : ""
              }`}
            >
              Cotizar
            </a>

            <button
              type="button"
              className="relative z-10 flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full border border-current/20 transition hover:border-current/50 lg:hidden"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span
                className={`block h-px w-4 bg-current transition-transform duration-500 ease-[var(--ease-luxe)] ${
                  open ? "translate-y-[3px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-px w-4 bg-current transition-transform duration-500 ease-[var(--ease-luxe)] ${
                  open ? "-translate-y-[3px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* menú móvil a pantalla completa */}
      <div
        className={`menu-sheet fixed inset-0 z-[85] bg-noche lg:hidden ${open ? "is-open" : ""}`}
        aria-hidden={!open}
      >
        <div className="grain pointer-events-none absolute inset-0 opacity-[0.16] mix-blend-overlay" />
        <div className="section-wrap flex h-full flex-col justify-center gap-1 pt-24 pb-10">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="group flex items-baseline gap-4 border-b border-white/10 py-4"
              style={{
                transition: "opacity 700ms var(--ease-luxe), transform 700ms var(--ease-luxe)",
                transitionDelay: open ? `${160 + i * 70}ms` : "0ms",
                opacity: open ? 1 : 0,
                transform: open ? "none" : "translateY(18px)",
              }}
            >
              <span className="micro text-lima">0{i + 1}</span>
              <span className="font-display text-4xl text-ink transition-colors group-hover:text-lima sm:text-5xl">
                {link.label}
              </span>
            </a>
          ))}

          <div
            className="mt-8 flex flex-col gap-3"
            style={{
              transition: "opacity 700ms var(--ease-luxe)",
              transitionDelay: open ? "560ms" : "0ms",
              opacity: open ? 1 : 0,
            }}
          >
            <a href="#cotizar" className="btn-primary w-full" onClick={() => setOpen(false)}>
              Cotizar mi barra
            </a>
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary w-full text-ink"
            >
              Instagram @{site.instagram}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
