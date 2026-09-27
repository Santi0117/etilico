"use client";

import { useEffect } from "react";
import { setTone, type Tone } from "@/hooks/useTone";

/**
 * Lee el `data-tone` de la sección que queda justo debajo de la cabecera y
 * avisa para que el header se invierta sobre fondos claros.
 */
export default function ToneWatcher() {
  useEffect(() => {
    let frame = 0;
    const probe = 44;

    const check = () => {
      frame = 0;
      const zones = document.querySelectorAll<HTMLElement>("[data-tone]");
      let tone: Tone = "dark";
      zones.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top <= probe && r.bottom > probe) {
          tone = el.dataset.tone === "light" ? "light" : "dark";
        }
      });
      setTone(tone);
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
  }, []);

  return null;
}
