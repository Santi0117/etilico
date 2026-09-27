"use client";

import { useEffect, useState } from "react";

/**
 * Sección activa según una línea imaginaria al 38% de la pantalla. Se calcula
 * en cada scroll en vez de con IntersectionObserver: las secciones de esta
 * página son mucho más altas que el viewport y los umbrales se perdían.
 */
export function useActiveSection(sectionIds: readonly string[]) {
  const [active, setActive] = useState("");

  useEffect(() => {
    let frame = 0;

    const check = () => {
      frame = 0;
      const probe = window.innerHeight * 0.38;
      let current = "";

      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= probe && rect.bottom > probe) current = id;
      });

      setActive((cur) => (current === cur ? cur : current));
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(check);
    };

    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sectionIds]);

  return active;
}
