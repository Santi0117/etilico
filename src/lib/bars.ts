export type Bar = {
  id: string;
  index: string;
  name: string;
  kicker: string;
  ghost: string;
  image: string;
  alt: string;
  intro: string;
  /** Paleta de la escena: fondo, tinta y acento. */
  bg: string;
  ink: string;
  accent: string;
  /** Tono de la escena: la cabecera se invierte cuando es clara. */
  tone: "dark" | "light";
  /** Cuánto ocupa la barra dentro del escenario (ancho máximo en px). */
  width: number;
  specs: { label: string; value: string }[];
  fits: string[];
};

export const bars: Bar[] = [
  {
    id: "case",
    index: "01",
    name: "La Case",
    kicker: "La barra que viaja",
    ghost: "CASE",
    image: "/barras/case.webp",
    alt: "Barra portátil Etílico tipo flight case con licores, cristalería y repisa de vidrio",
    intro:
      "Nuestra barra insignia. Viaja cerrada como un case de gira, se abre en minutos y queda de pie con la marca al frente. La que entra donde otras no caben.",
    bg: "#08090a",
    ink: "#f7f4ec",
    accent: "#d4e44a",
    tone: "dark",
    width: 560,
    specs: [
      { label: "Formato", value: "Plegable · se transporta cerrada" },
      { label: "Frente", value: "Branding Etílico iluminable" },
      { label: "Servicio", value: "Un bartender · alas laterales" },
      { label: "Incluye", value: "Repisa de vidrio, cristalería y carta" },
    ],
    fits: ["Casas y terrazas", "Cumpleaños", "After office", "Espacios reducidos"],
  },
  {
    id: "slat",
    index: "02",
    name: "Noir",
    kicker: "Dos cuerpos, listón negro",
    ghost: "NOIR",
    image: "/barras/slat.webp",
    alt: "Barra modular negra de listones con botellas premium, shakers dorados y utensilios",
    intro:
      "Frente de listones en negro mate y top continuo. Dos módulos que se acoplan para montar una barra larga con dos estaciones trabajando al mismo tiempo.",
    bg: "#ece5d8",
    ink: "#101112",
    accent: "#9fae2b",
    tone: "light",
    width: 720,
    specs: [
      { label: "Formato", value: "Modular · dos cuerpos con ruedas" },
      { label: "Frente", value: "Listones verticales negro mate" },
      { label: "Servicio", value: "Dos bartenders en paralelo" },
      { label: "Incluye", value: "Estación de coctelería a la vista" },
    ],
    fits: ["Bodas de noche", "Corporativos", "Eventos de 150+", "Salones y rooftops"],
  },
  {
    id: "blanche",
    index: "03",
    name: "Blanche",
    kicker: "Moldura blanca, luz de día",
    ghost: "BLANCHE",
    image: "/barras/blanca.webp",
    alt: "Barra blanca con frente de moldura clásica, cristalería lista y carta de cocteles enmarcada",
    intro:
      "Frente de moldura clásica en blanco hueso. Desaparece dentro de una decoración fina y deja que manden las flores, el mantel y la copa.",
    bg: "#0d1005",
    ink: "#f7f4ec",
    accent: "#d4e44a",
    tone: "dark",
    width: 760,
    specs: [
      { label: "Formato", value: "Cuerpo largo · frente entamborado" },
      { label: "Frente", value: "Moldura clásica blanco hueso" },
      { label: "Servicio", value: "Dos bartenders · cristalería en barra" },
      { label: "Incluye", value: "Carta enmarcada y set de firma" },
    ],
    fits: ["Bodas de día", "Jardines y fincas", "XV años", "Montajes en blanco"],
  },
];
