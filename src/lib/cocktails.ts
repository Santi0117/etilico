export type Family = "clasicos" | "citricos" | "tropicales" | "con-caracter";

export type Cocktail = {
  id: string;
  n: string;
  name: string;
  base: string;
  build: string;
  note: string;
  family: Family;
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

export const families: { id: Family | "todos"; label: string }[] = [
  { id: "todos", label: "Toda la carta" },
  { id: "clasicos", label: "Clásicos" },
  { id: "citricos", label: "Cítricos" },
  { id: "tropicales", label: "Tropicales" },
  { id: "con-caracter", label: "Con carácter" },
];

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
    build: "Toronja · lima · sal",
    note: "Rosada, salada en el borde y con burbuja. El trago que abre cualquier fiesta bajo el sol de aquí.",
    family: "citricos",
    tint: "#e4785a",
    size: [562, 845],
  },
  {
    id: "blue-lagoon",
    name: "Blue Lagoon",
    base: "Vodka",
    build: "Curaçao azul · limón",
    note: "El azul que todo el mundo fotografía. Cítrico, directo y frío hasta el último hielo.",
    family: "tropicales",
    tint: "#2ea8d8",
    size: [531, 827],
  },
  {
    id: "mojito",
    name: "Mojito",
    base: "Ron blanco",
    build: "Hierbabuena · lima · soda",
    note: "Hierbabuena golpeada, no triturada. Largo, seco y con el verde vivo hasta el final de la noche.",
    family: "clasicos",
    tint: "#c9d97a",
    size: [554, 888],
  },
  {
    id: "spritz-de-la-casa",
    name: "Spritz de la casa",
    base: "Aperitivo",
    build: "Espumante · naranja · fresa",
    note: "Amargo suave, burbuja seca y fruta fresca. El welcome drink que hace que nadie se quede sin copa.",
    family: "con-caracter",
    tint: "#e06a3e",
    size: [406, 902],
  },
  {
    id: "rosa",
    name: "Rosa",
    base: "Gin",
    build: "Frutos rojos · tónica",
    note: "Gradiente rosado, borde de azúcar y naranja deshidratada. Elegante sin ponerse seria.",
    family: "citricos",
    tint: "#e8899c",
    size: [367, 832],
  },
  {
    id: "gin-tonic",
    name: "Gin Tonic",
    base: "Gin",
    build: "Tónica · botánicos · fresa",
    note: "Copa alta, hielo limpio y botánicos a la vista. La receta donde se nota si la barra sabe o no.",
    family: "clasicos",
    tint: "#b9c4bd",
    size: [375, 839],
  },
  {
    id: "moscow-mule",
    name: "Moscow Mule",
    base: "Vodka",
    build: "Jengibre · lima",
    note: "En taza de cobre, como se debe. Pica apenas, refresca mucho y se toma sin darse cuenta.",
    family: "con-caracter",
    tint: "#c0713a",
    size: [466, 669],
  },
  {
    id: "negroni",
    name: "Negroni",
    base: "Gin",
    build: "Vermut rosso · bitter",
    note: "Tres partes iguales y hielo grande. Amargo, rojo y memorable: el favorito de quien sabe pedir.",
    family: "con-caracter",
    tint: "#b0391c",
    size: [390, 751],
  },
  {
    id: "margarita-chamoy",
    name: "Margarita Chamoy",
    base: "Tequila",
    build: "Chamoy · tajín · limón",
    note: "Hielo frappé, borde rojo y ese golpe dulce-picante. La que se pide dos veces.",
    family: "con-caracter",
    tint: "#cf6b46",
    size: [408, 552],
  },
  {
    id: "margarita",
    name: "Margarita",
    base: "Tequila",
    build: "Triple sec · limón · sal",
    note: "El clásico exacto: cítrico, frío y con el borde justo. Sin mezclas dulces de tienda.",
    family: "clasicos",
    tint: "#d9cf94",
    size: [474, 647],
  },
  {
    id: "espresso-martini",
    name: "Espresso Martini",
    base: "Vodka",
    build: "Café · licor de café",
    note: "Espuma densa y tres granos encima. El trago que revive la pista después de la cena.",
    family: "con-caracter",
    tint: "#8a5c45",
    size: [470, 670],
  },
  {
    id: "tequila-sunrise",
    name: "Tequila Sunrise",
    base: "Tequila",
    build: "Naranja · granadina",
    note: "El degradado se arma solo en el vaso. Dulce, largo y perfecto para brindar temprano.",
    family: "tropicales",
    tint: "#ef8a3c",
    size: [305, 628],
  },
  {
    id: "aperol-spritz",
    name: "Aperol Spritz",
    base: "Aperitivo",
    build: "Aperol · espumante · naranja",
    note: "Naranja amarga y burbuja fina en copa grande. El atardecer servido en hielo.",
    family: "citricos",
    tint: "#de6e17",
    size: [410, 847],
  },
  {
    id: "cosmopolitan",
    name: "Cosmopolitan",
    base: "Vodka",
    build: "Arándano · triple sec · lima",
    note: "Rosado, frío y con piel de naranja encima. Un clásico de copa martini que no pasa de moda.",
    family: "clasicos",
    tint: "#cd4b36",
    size: [540, 740],
  },
  {
    id: "french-martini",
    name: "French Martini",
    base: "Vodka",
    build: "Piña · licor de frambuesa",
    note: "Espuma de piña, frambuesas en palillo y un color que se ve desde la pista.",
    family: "tropicales",
    tint: "#b14543",
    size: [566, 753],
  },
  {
    id: "pina-colada",
    name: "Piña Colada",
    base: "Ron blanco",
    build: "Piña · coco · crema",
    note: "Cremosa, frutal y con piña fresca en el borde. Vacaciones en vaso huracán.",
    family: "tropicales",
    tint: "#cfb273",
    size: [451, 983],
  },
  {
    id: "caipirinha",
    name: "Caipirinha",
    base: "Cachaça",
    build: "Limón · azúcar · hielo picado",
    note: "Limón machacado en el mismo vaso y cachaça brasileña. Fresca, ácida y sin adornos.",
    family: "citricos",
    tint: "#afad65",
    size: [399, 512],
  },
  {
    id: "caciquina",
    name: "Caciquiña",
    base: "Guaro Cacique",
    build: "Limón · azúcar · hierbabuena",
    note: "La caipiriña a la tica: guaro, limón machacado y hielo picado. Sabe a fiesta de aquí.",
    family: "citricos",
    tint: "#9d934f",
    size: [432, 567],
  },
  {
    id: "guaro-sour",
    name: "Guaro Sour",
    base: "Guaro Cacique",
    build: "Limón · azúcar · soda",
    note: "El sour con guaro nacional. Ácido, ligero y hecho para durar toda la noche.",
    family: "citricos",
    tint: "#d1b974",
    size: [438, 667],
  },
  {
    id: "amaretto-sour",
    name: "Amaretto Sour",
    base: "Amaretto",
    build: "Limón · espuma · cereza",
    note: "Almendra, cítrico y una espuma sedosa arriba. Dulce en su punto, nunca empalagoso.",
    family: "clasicos",
    tint: "#d18e3e",
    size: [402, 561],
  },
  {
    id: "old-fashioned",
    name: "Old Fashioned",
    base: "Bourbon",
    build: "Angostura · azúcar · naranja",
    note: "Bourbon, amargo y piel de naranja sobre hielo grande. Lento, profundo y sin prisa.",
    family: "clasicos",
    tint: "#a35e2e",
    size: [390, 495],
  },
  {
    id: "coctel-ahumado",
    name: "Cóctel Ahumado",
    base: "Whisky",
    build: "Whisky · naranja · humo de madera",
    note: "Llega bajo campana y se destapa frente al invitado. El humo hace el show.",
    family: "con-caracter",
    tint: "#b0714b",
    size: [401, 842],
  },
  {
    id: "whisky-highball",
    name: "Whisky Highball",
    base: "Whisky",
    build: "Soda · piel de limón",
    note: "Alto, burbujeante y seco. La forma más fresca de tomarse un whisky.",
    family: "clasicos",
    tint: "#cca15d",
    size: [311, 658],
  },
  {
    id: "whisky-en-las-rocas",
    name: "Whisky en las Rocas",
    base: "Whisky",
    build: "Esfera de hielo",
    note: "Whisky sobre una esfera de hielo que se derrite despacio. No hace falta nada más.",
    family: "clasicos",
    tint: "#a86e3d",
    size: [396, 490],
  },
  {
    id: "carajillo",
    name: "Carajillo",
    base: "Licor 43 · Café",
    build: "Espresso · Licor 43 · hielo",
    note: "Espresso recién hecho sobre Licor 43 y hielo. El cierre perfecto después de la cena.",
    family: "con-caracter",
    tint: "#b1743d",
    size: [374, 537],
  },
  {
    id: "mezcal",
    name: "Mezcal",
    base: "Mezcal",
    build: "Naranja · sal de chile",
    note: "Servido solo, con naranja al lado. Ahumado y directo, para quien lo toma en serio.",
    family: "con-caracter",
    tint: "#c67a3f",
    size: [598, 460],
  },
  {
    id: "shot-tequila",
    name: "Shot de Tequila",
    base: "Tequila",
    build: "Sal · limón",
    note: "Sal, trago y limón. El ritual que arranca la pista a medianoche.",
    family: "con-caracter",
    tint: "#b1a759",
    size: [548, 389],
  },
  {
    id: "michelada",
    name: "Michelada",
    base: "Cerveza",
    build: "Limón · salsas · borde de chile",
    note: "Cerveza bien fría, limón y borde picante. Para el que no quiere coctel pero sí fiesta.",
    family: "con-caracter",
    tint: "#9b3c1b",
    size: [439, 684],
  },
  {
    id: "mimosa",
    name: "Mimosa",
    base: "Espumante",
    build: "Jugo de naranja · espumante",
    note: "Burbuja y naranja natural en copa flauta. Para brindis de día y desayunos de boda.",
    family: "citricos",
    tint: "#edac36",
    size: [344, 962],
  },
  {
    id: "frutos-rojos",
    name: "Frutos Rojos",
    base: "Sin alcohol",
    build: "Frutos rojos · hierbabuena · soda",
    note: "Todo el color de un coctel, sin una gota de alcohol. Para que nadie brinde con agua.",
    family: "tropicales",
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
