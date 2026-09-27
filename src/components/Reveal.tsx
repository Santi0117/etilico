"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Envuelve el contenido en una máscara: el texto sube desde abajo. */
  mask?: boolean;
  as?: ElementType;
  id?: string;
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
  mask = false,
  as: Tag = "div",
  id,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // `isIntersecting` puede perderse con scroll muy rápido: si el bloque
        // ya quedó arriba del viewport, se muestra igual.
        if (!entry.isIntersecting && entry.boundingClientRect.top > 0) return;
        setSeen(true);
        observer.disconnect();
      },
      { threshold: 0.08, rootMargin: "0px 0px -60px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const base = mask ? "reveal-mask" : "reveal";

  return (
    <Tag
      id={id}
      ref={ref}
      className={`${base} ${seen ? "is-in" : ""} ${className}`}
      style={{ ["--reveal-delay" as string]: `${delay}ms` }}
    >
      {mask ? <span>{children}</span> : children}
    </Tag>
  );
}
