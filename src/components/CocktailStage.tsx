"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { Cocktail } from "@/lib/cocktails";

type Props = {
  drink: Cocktail;
  /** 1 si el nuevo trago entra por la derecha, -1 si entra por la izquierda. */
  dir: 1 | -1;
  onPrev: () => void;
  onNext: () => void;
  /** Tragos vecinos que conviene tener descargados antes de pasar. */
  preload?: Cocktail[];
  priority?: boolean;
  className?: string;
  label: string;
};

/** Alto del trago en el escenario: respeta la proporción real pero la comprime. */
const drinkHeight = (c: Cocktail) => (0.26 + 0.68 * c.scale).toFixed(3);

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
 * Escenario de un trago: haz de luz, peana y el recorte encima. Al cambiar de
 * trago el anterior se va desenfocado hacia un lado y el nuevo entra del otro.
 */
export default function CocktailStage({
  drink,
  dir,
  onPrev,
  onNext,
  preload = [],
  priority = false,
  className = "",
  label,
}: Props) {
  const [shown, setShown] = useState<{ cur: Cocktail; prev: Cocktail | null; dir: 1 | -1 }>({
    cur: drink,
    prev: null,
    dir,
  });
  if (shown.cur.id !== drink.id) {
    setShown({ cur: drink, prev: shown.cur, dir });
  }

  const swipe = useRef<{ id: number; x: number; y: number } | null>(null);

  const warm = preload.map((c) => c.image).join("|");
  useEffect(() => {
    if (!warm) return;
    warm.split("|").forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [warm]);

  const layer = (c: Cocktail, state: "in" | "out") => (
    <div
      key={c.id}
      className={`stage__drink is-${state}`}
      style={{ ["--h" as string]: drinkHeight(c), ["--dir" as string]: shown.dir } as CSSProperties}
      onAnimationEnd={
        state === "out"
          ? (e) => {
              if (e.target === e.currentTarget) setShown((s) => ({ ...s, prev: null }));
            }
          : undefined
      }
      aria-hidden={state === "out"}
    >
      <div className="stage__cut">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={c.image}
          alt={state === "in" ? `${c.name} · coctelería Etílico` : ""}
          width={c.width}
          height={c.height}
          draggable={false}
          decoding="async"
          fetchPriority={priority && state === "in" ? "high" : "auto"}
        />
      </div>
    </div>
  );

  return (
    <div
      className={`stage ${className}`}
      style={{ ["--tint" as string]: drink.tint } as CSSProperties}
      role="group"
      aria-roledescription="carrusel"
      aria-label={label}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") onNext();
        if (e.key === "ArrowLeft") onPrev();
      }}
      onPointerDown={(e) => {
        if (e.pointerType === "mouse") return;
        swipe.current = { id: e.pointerId, x: e.clientX, y: e.clientY };
      }}
      onPointerUp={(e) => {
        const s = swipe.current;
        swipe.current = null;
        if (!s || s.id !== e.pointerId) return;
        const dx = e.clientX - s.x;
        const dy = e.clientY - s.y;
        if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.2) {
          if (dx < 0) onNext();
          else onPrev();
        }
      }}
      onPointerCancel={() => {
        swipe.current = null;
      }}
    >
      <span className="stage__beam" aria-hidden>
        <i />
      </span>
      <span className="stage__glow" aria-hidden />
      <span className="stage__plinth" aria-hidden />

      <div className="stage__drinks" aria-live="polite">
        {shown.prev ? layer(shown.prev, "out") : null}
        {layer(shown.cur, "in")}
      </div>

      <button type="button" className="stage__arrow stage__arrow--prev" aria-label="Trago anterior" onClick={onPrev}>
        <Chevron />
      </button>
      <button type="button" className="stage__arrow stage__arrow--next" aria-label="Trago siguiente" onClick={onNext}>
        <Chevron flip />
      </button>
    </div>
  );
}
