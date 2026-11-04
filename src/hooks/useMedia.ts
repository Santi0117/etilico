"use client";

import { useSyncExternalStore } from "react";

/** true si la media query se cumple. En el servidor siempre es false. */
export function useMedia(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

const noop = () => () => {};

/** true si el navegador puede dibujar WebGL. En el servidor siempre es false. */
let webgl: boolean | null = null;
export function useWebGL() {
  return useSyncExternalStore(
    noop,
    () => {
      if (webgl === null) {
        const c = document.createElement("canvas");
        webgl = !!(c.getContext("webgl2") ?? c.getContext("webgl"));
      }
      return webgl;
    },
    () => false,
  );
}

/** false en el servidor y en la primera pasada de hidratación; true después. */
export function useMounted() {
  return useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );
}
