export type Cocktail = {
  id: string;
  n: string;
  name: string;
  /** Licor principal, como se lee arriba del nombre. */
  base: string;
  ings: string[];
  /** Etiqueta corta debajo de los ingredientes. */
  tag: string;
  /** Color dominante del trago: tiñe la luz de la sección. */
  tint: string;
  /** Recorte sin fondo (WebP con transparencia). */
  image: string;
  thumb: string;
  /** Tamaño del recorte en px. */
  width: number;
  height: number;
  /**
   * Alto del trago respecto a la foto original. Todas se tomaron a la misma
   * distancia, así que un shot se ve más bajo que una piña colada.
   */
  scale: number;
};

/** Filtros de la carta: cada licor cae en un solo grupo. */
export const groups = [
  { id: "todos", label: "Todos", bases: [] as string[] },
  { id: "tequila", label: "Tequila y mezcal", bases: ["Tequila", "Mezcal"] },
  { id: "gin", label: "Gin", bases: ["Gin"] },
  { id: "vodka", label: "Vodka", bases: ["Vodka"] },
  { id: "ron", label: "Ron y guaro", bases: ["Ron blanco", "Guaro Cacique", "Cachaça"] },
  { id: "whisky", label: "Whisky", bases: ["Whisky", "Bourbon"] },
  { id: "otros", label: "Más y sin alcohol", bases: [] as string[] },
] as const;

export type GroupId = (typeof groups)[number]["id"];

/** Alto de las fotos originales de las que salen los recortes. */
const PHOTO_H = 1280;

type Entry = Omit<Cocktail, "n" | "image" | "thumb" | "width" | "height" | "scale"> & {
  /** ancho × alto del recorte */
  size: [number, number];
};

const entries: Entry[] = [
  {
    id: "paloma",
    name: "Paloma",
    base: "Tequila",
    ings: ["Tequila blanco", "Limón", "Almíbar", "Fresco de toronja"],
    tag: "Firma de la casa",
    tint: "#e4785a",
    size: [562, 845],
  },
  {
    id: "margarita",
    name: "Margarita",
    base: "Tequila",
    ings: ["Tequila", "Licor de naranja", "Limón", "Borde de tajín"],
    tag: "Clásico",
    tint: "#d9cf94",
    size: [474, 647],
  },
  {
    id: "guaro-sour",
    name: "Guaro Sour",
    base: "Guaro Cacique",
    ings: ["Guaro Cacique", "Limón", "Soda", "Sirope"],
    tag: "El más tico",
    tint: "#d1b974",
    size: [438, 667],
  },
  {
    id: "gin-tonic",
    name: "Gin Tonic",
    base: "Gin",
    ings: ["Gin", "Agua tónica", "Fresa", "Hielo cristalino"],
    tag: "Favorito en bodas",
    tint: "#b9c4bd",
    size: [375, 839],
  },
  {
    id: "moscow-mule",
    name: "Moscow Mule",
    base: "Vodka",
    ings: ["Vodka", "Ginger beer", "Limón", "Taza de cobre"],
    tag: "Clásico",
    tint: "#c0713a",
    size: [466, 669],
  },
  {
    id: "mojito",
    name: "Mojito",
    base: "Ron blanco",
    ings: ["Ron blanco", "Hierbabuena", "Limón", "Soda"],
    tag: "Tradicional o maracuyá",
    tint: "#c9d97a",
    size: [554, 888],
  },
  {
    id: "espresso-martini",
    name: "Espresso Martini",
    base: "Vodka",
    ings: ["Vodka", "Espresso", "Licor de café"],
    tag: "Para después de cenar",
    tint: "#8a5c45",
    size: [470, 670],
  },
  {
    id: "old-fashioned",
    name: "Old Fashioned",
    base: "Bourbon",
    ings: ["Bourbon", "Angostura", "Azúcar", "Piel de naranja"],
    tag: "Clásico",
    tint: "#a35e2e",
    size: [390, 495],
  },
  {
    id: "negroni",
    name: "Negroni",
    base: "Gin",
    ings: ["Gin", "Campari", "Vermut rosso"],
    tag: "Clásico italiano",
    tint: "#b0391c",
    size: [390, 751],
  },
  {
    id: "pina-colada",
    name: "Piña Colada",
    base: "Ron blanco",
    ings: ["Ron blanco", "Piña", "Leche de coco", "Leche condensada"],
    tag: "Tropical",
    tint: "#cfb273",
    size: [451, 983],
  },
  {
    id: "blue-lagoon",
    name: "Blue Lagoon",
    base: "Vodka",
    ings: ["Vodka", "Curaçao azul", "Limonada"],
    tag: "Para la pista",
    tint: "#2ea8d8",
    size: [531, 827],
  },
  {
    id: "french-martini",
    name: "French Martini",
    base: "Vodka",
    ings: ["Vodka", "Licor de frambuesa", "Jugo de piña"],
    tag: "Elegante",
    tint: "#b14543",
    size: [566, 753],
  },
  {
    id: "margarita-chamoy",
    name: "Margarita Chamoy",
    base: "Tequila",
    ings: ["Tequila", "Limón", "Chamoy", "Borde de chamoy"],
    tag: "Firma de la casa",
    tint: "#cf6b46",
    size: [408, 552],
  },
  {
    id: "caipirinha",
    name: "Caipirinha",
    base: "Cachaça",
    ings: ["Cachaça", "Limón", "Azúcar", "Hielo frappé"],
    tag: "Brasileño",
    tint: "#afad65",
    size: [399, 512],
  },
  {
    id: "rosa",
    name: "Rosa",
    base: "Gin",
    ings: ["Gin", "Tónica rosa", "Frutos rojos", "Naranja"],
    tag: "Firma de la casa",
    tint: "#e8899c",
    size: [367, 832],
  },
  {
    id: "cosmopolitan",
    name: "Cosmopolitan",
    base: "Vodka",
    ings: ["Vodka", "Licor de naranja", "Arándano", "Limón"],
    tag: "Clásico",
    tint: "#cd4b36",
    size: [540, 740],
  },
  {
    id: "caciquina",
    name: "Caciquiña",
    base: "Guaro Cacique",
    ings: ["Guaro Cacique", "Limón", "Azúcar", "Hierbabuena"],
    tag: "Caipiriña tica",
    tint: "#9d934f",
    size: [432, 567],
  },
  {
    id: "spritz-de-la-casa",
    name: "Spritz de la casa",
    base: "Aperitivo",
    ings: ["Aperitivo", "Espumante", "Fresa", "Naranja"],
    tag: "Welcome drink",
    tint: "#e06a3e",
    size: [406, 902],
  },
  {
    id: "aperol-spritz",
    name: "Aperol Spritz",
    base: "Aperitivo",
    ings: ["Aperol", "Espumante", "Soda", "Naranja"],
    tag: "Para tardes de piscina",
    tint: "#de6e17",
    size: [410, 847],
  },
  {
    id: "whisky-highball",
    name: "Whisky Highball",
    base: "Whisky",
    ings: ["Whisky", "Soda", "Piel de limón"],
    tag: "Ligero y seco",
    tint: "#cca15d",
    size: [311, 658],
  },
  {
    id: "amaretto-sour",
    name: "Amaretto Sour",
    base: "Amaretto",
    ings: ["Amaretto", "Limón", "Espuma", "Cereza"],
    tag: "Dulce y cítrico",
    tint: "#d18e3e",
    size: [402, 561],
  },
  {
    id: "tequila-sunrise",
    name: "Tequila Sunrise",
    base: "Tequila",
    ings: ["Tequila", "Jugo de naranja", "Granadina"],
    tag: "Clásico",
    tint: "#ef8a3c",
    size: [305, 628],
  },
  {
    id: "carajillo",
    name: "Carajillo",
    base: "Licor 43",
    ings: ["Licor 43", "Espresso", "Hielo"],
    tag: "El cierre perfecto",
    tint: "#b1743d",
    size: [374, 537],
  },
  {
    id: "mimosa",
    name: "Mimosa",
    base: "Espumante",
    ings: ["Espumante", "Jugo de naranja"],
    tag: "Brunch y despedidas",
    tint: "#edac36",
    size: [344, 962],
  },
  {
    id: "michelada",
    name: "Michelada",
    base: "Cerveza",
    ings: ["Cerveza", "Limón", "Salsas", "Borde de tajín"],
    tag: "Para el calor",
    tint: "#9b3c1b",
    size: [439, 684],
  },
  {
    id: "shot-tequila",
    name: "Shot de Tequila",
    base: "Tequila",
    ings: ["Tequila blanco", "Limón", "Sal"],
    tag: "Para brindar",
    tint: "#b1a759",
    size: [548, 389],
  },
  {
    id: "mezcal",
    name: "Mezcal",
    base: "Mezcal",
    ings: ["Mezcal", "Naranja", "Sal de gusano"],
    tag: "Ahumado y directo",
    tint: "#c67a3f",
    size: [598, 460],
  },
  {
    id: "coctel-ahumado",
    name: "Cóctel Ahumado",
    base: "Whisky",
    ings: ["Whisky", "Bitter", "Naranja deshidratada", "Humo de madera"],
    tag: "Show en la barra",
    tint: "#b0714b",
    size: [401, 842],
  },
  {
    id: "whisky-en-las-rocas",
    name: "Whisky en las Rocas",
    base: "Whisky",
    ings: ["Whisky", "Esfera de hielo"],
    tag: "Para los clásicos",
    tint: "#a86e3d",
    size: [396, 490],
  },
  {
    id: "frutos-rojos",
    name: "Frutos Rojos",
    base: "Sin alcohol",
    ings: ["Limonada", "Frutos rojos", "Hierbabuena", "Soda"],
    tag: "Mocktail · sin alcohol",
    tint: "#c0485a",
    size: [381, 797],
  },
];

export const cocktails: Cocktail[] = entries.map(({ size: [width, height], ...c }, i) => ({
  ...c,
  n: String(i + 1).padStart(2, "0"),
  image: `/cocteles/${c.id}.webp`,
  thumb: `/cocteles/${c.id}-sm.webp`,
  width,
  height,
  scale: height / PHOTO_H,
}));

export const cocktailById = (id: string) => cocktails.find((c) => c.id === id);

export const groupOf = (c: Cocktail): GroupId =>
  groups.find((g) => (g.bases as readonly string[]).includes(c.base))?.id ?? "otros";

export const inGroup = (id: GroupId) => (id === "todos" ? cocktails : cocktails.filter((c) => groupOf(c) === id));
