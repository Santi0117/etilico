"use client";

import { useSyncExternalStore } from "react";

/**
 * true cuando el telón de carga ya se abrió. Con red de seguridad por si el
 * preloader nunca emite el evento (bloqueado, recarga en caliente, etc.).
 */
function subscribe(onChange: () => void) {
  window.addEventListener("etilico:ready", onChange);
  const fallback = window.setTimeout(() => {
    document.documentElement.dataset.ready = "1";
    onChange();
  }, 5200);

  return () => {
    window.removeEventListener("etilico:ready", onChange);
    window.clearTimeout(fallback);
  };
}

const getSnapshot = () => document.documentElement.dataset.ready === "1";
const getServerSnapshot = () => false;

export function useReady() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
