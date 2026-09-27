"use client";

import { useEffect, useState } from "react";

export type Tone = "dark" | "light";

/** Avisa a la cabecera que el fondo bajo ella cambió de tono. */
export function setTone(tone: Tone) {
  if (typeof document === "undefined") return;
  if (document.documentElement.dataset.tone === tone) return;
  document.documentElement.dataset.tone = tone;
  window.dispatchEvent(new CustomEvent<Tone>("etilico:tone", { detail: tone }));
}

export function useTone(): Tone {
  const [tone, set] = useState<Tone>("dark");

  useEffect(() => {
    const onTone = (e: Event) => set((e as CustomEvent<Tone>).detail);
    window.addEventListener("etilico:tone", onTone);
    return () => window.removeEventListener("etilico:tone", onTone);
  }, []);

  return tone;
}
