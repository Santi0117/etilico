"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { cocktailById } from "@/lib/cocktails";
import { useMedia, useMounted, useWebGL } from "@/hooks/useMedia";
import CocktailStage from "../CocktailStage";
import type { Spin } from "./Bar3D";
import { DRINKS_3D } from "./drinks";

const Bar3D = dynamic(() => import("./Bar3D"), { ssr: false });

const PHOTOS = DRINKS_3D.map((d) => cocktailById(d.id)!);

type Props = {
  index: number;
  dir: 1 | -1;
  onPrev: () => void;
  onNext: () => void;
  /** Se llama con true mientras alguien gira el trago, para que no pase solo. */
  onHold: (hold: boolean) => void;
};

function Chevron({ flip = false }: { flip?: boolean }) {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden>
      <path
        d={flip ? "M6 3.5 10.5 8 6 12.5" : "M10 3.5 5.5 8l4.5 4.5"}
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Escenario del landing con el trago en 3D: se gira arrastrando y cambia con
 * las flechas. Sin WebGL cae al escenario de fotos recortadas.
 */
export default function HeroBar({ index, dir, onPrev, onNext, onHold }: Props) {
  const mounted = useMounted();
  const webgl = useWebGL();
  const still = useMedia("(prefers-reduced-motion: reduce)");
  const compact = useMedia("(max-width: 767px)");
  const [ready, setReady] = useState(false);
  const [onScreen, setOnScreen] = useState(true);
  const box = useRef<HTMLDivElement>(null);
  const spin = useRef<Spin>({ dragging: false, offset: 0, velocity: 0 });
  const drag = useRef<{ id: number; x: number; t: number } | null>(null);

  // fuera de pantalla no se dibuja: ahorra batería en el celular
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { rootMargin: "80px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const photo = PHOTOS[index];

  if (mounted && !webgl) {
    return (
      <CocktailStage
        drink={photo}
        dir={dir}
        onPrev={onPrev}
        onNext={onNext}
        priority
        className="stage--hero"
        label="Cocteles de la casa"
      />
    );
  }

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current || drag.current.id !== e.pointerId) return;
    drag.current = null;
    spin.current.dragging = false;
    onHold(false);
  };

  return (
    <div
      ref={box}
      className="stage stage--hero stage--3d"
      style={{ ["--tint" as string]: photo.tint } as CSSProperties}
      role="group"
      aria-roledescription="carrusel"
      aria-label="Cocteles de la casa"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") onNext();
        if (e.key === "ArrowLeft") onPrev();
      }}
      onPointerDown={(e) => {
        if (e.pointerType === "mouse" && e.button !== 0) return;
        if ((e.target as HTMLElement).closest("button")) return;
        drag.current = { id: e.pointerId, x: e.clientX, t: e.timeStamp };
        spin.current.dragging = true;
        spin.current.velocity = 0;
        onHold(true);
      }}
      onPointerMove={(e) => {
        const d = drag.current;
        if (!d || d.id !== e.pointerId) return;
        const dx = e.clientX - d.x;
        const dt = Math.max(e.timeStamp - d.t, 8) / 1000;
        spin.current.offset += dx * 0.011;
        spin.current.velocity = (dx * 0.011) / dt;
        d.x = e.clientX;
        d.t = e.timeStamp;
      }}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      <div className={`stage__canvas ${ready ? "is-ready" : ""}`}>
        {mounted ? (
          <Bar3D
            drinks={DRINKS_3D}
            index={index}
            dir={dir}
            spin={spin}
            active={onScreen}
            still={still}
            compact={compact}
            tint={photo.tint}
            onReady={() => setReady(true)}
          />
        ) : null}
      </div>

      <p className="stage__caption" aria-live="polite">
        <span key={photo.id} className="swap-in block">
          <span className="font-display text-ink">{photo.name}</span>
          <span className="micro ml-3 text-ink-faint">{photo.base}</span>
        </span>
        <span className="micro mt-1.5 block text-ink-faint">Arrastra para girarlo</span>
      </p>

      <button type="button" className="stage__arrow stage__arrow--prev" aria-label="Trago anterior" onClick={onPrev}>
        <Chevron />
      </button>
      <button type="button" className="stage__arrow stage__arrow--next" aria-label="Trago siguiente" onClick={onNext}>
        <Chevron flip />
      </button>
    </div>
  );
}
