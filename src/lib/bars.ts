export type Bar = {
  id: string;
  index: string;
  name: string;
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
};

export const bars: Bar[] = [
  {
    id: "slat",
    index: "01",
    name: "Barra Negra",
    ghost: "NEGRA",
    image: "/barras/slat.webp",
    alt: "Barra modular negra de listones con botellas premium, shakers dorados y utensilios",
    intro: "Elegante, con frente de listones en negro mate.",
    bg: "#ece5d8",
    ink: "#101112",
    accent: "#9fae2b",
    tone: "light",
    width: 720,
  },
  {
    id: "blanche",
    index: "02",
    name: "Barra Blanca",
    ghost: "BLANCA",
    image: "/barras/blanca.webp",
    alt: "Barra blanca con frente de moldura clásica, cristalería lista y carta de cocteles enmarcada",
    intro: "Clásica, con frente de moldura en blanco hueso.",
    bg: "#0d1005",
    ink: "#f7f4ec",
    accent: "#d4e44a",
    tone: "dark",
    width: 760,
  },
  {
    id: "case",
    index: "03",
    name: "Barra Etílico",
    ghost: "ETÍLICO",
    image: "/barras/etilico.webp",
    alt: "Barra portátil Etílico tipo flight case con el logo al frente, licores, cristalería y repisa lateral con códigos QR",
    intro: "Nuestra barra insignia, con el logo de Etílico al frente.",
    bg: "#08090a",
    ink: "#f7f4ec",
    accent: "#d4e44a",
    tone: "dark",
    width: 560,
  },
];
