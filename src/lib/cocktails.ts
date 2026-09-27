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
  image: string;
  thumb: string;
};

export const families: { id: Family | "todos"; label: string }[] = [
  { id: "todos", label: "Toda la carta" },
  { id: "clasicos", label: "Clásicos" },
  { id: "citricos", label: "Cítricos" },
  { id: "tropicales", label: "Tropicales" },
  { id: "con-caracter", label: "Con carácter" },
];

const shot = (n: number) => ({
  image: `/cocteles/${String(n).padStart(2, "0")}.webp`,
  thumb: `/cocteles/${String(n).padStart(2, "0")}-sm.webp`,
});

export const cocktails: Cocktail[] = [
  {
    id: "paloma",
    n: "01",
    name: "Paloma",
    base: "Tequila",
    build: "Toronja · lima · sal",
    note: "Rosada, salada en el borde y con burbuja. El trago que abre cualquier fiesta bajo el sol de aquí.",
    family: "citricos",
    tint: "#e4785a",
    ...shot(1),
  },
  {
    id: "blue-lagoon",
    n: "02",
    name: "Blue Lagoon",
    base: "Vodka",
    build: "Curaçao azul · limón",
    note: "El azul que todo el mundo fotografía. Cítrico, directo y frío hasta el último hielo.",
    family: "tropicales",
    tint: "#2ea8d8",
    ...shot(2),
  },
  {
    id: "mojito",
    n: "03",
    name: "Mojito",
    base: "Ron blanco",
    build: "Hierbabuena · lima · soda",
    note: "Hierbabuena golpeada, no triturada. Largo, seco y con el verde vivo hasta el final de la noche.",
    family: "clasicos",
    tint: "#c9d97a",
    ...shot(3),
  },
  {
    id: "spritz",
    n: "04",
    name: "Spritz de la casa",
    base: "Aperitivo",
    build: "Espumante · naranja · fresa",
    note: "Amargo suave, burbuja seca y fruta fresca. El welcome drink que hace que nadie se quede sin copa.",
    family: "con-caracter",
    tint: "#e06a3e",
    ...shot(4),
  },
  {
    id: "rosa",
    n: "05",
    name: "Rosa",
    base: "Gin",
    build: "Frutos rojos · tónica",
    note: "Gradiente rosado, borde de azúcar y naranja deshidratada. Elegante sin ponerse seria.",
    family: "citricos",
    tint: "#e8899c",
    ...shot(5),
  },
  {
    id: "gin-tonic",
    n: "06",
    name: "Gin Tonic",
    base: "Gin",
    build: "Tónica · botánicos · fresa",
    note: "Copa alta, hielo limpio y botánicos a la vista. La receta donde se nota si la barra sabe o no.",
    family: "clasicos",
    tint: "#b9c4bd",
    ...shot(6),
  },
  {
    id: "moscow-mule",
    n: "07",
    name: "Moscow Mule",
    base: "Vodka",
    build: "Jengibre · lima",
    note: "En taza de cobre, como se debe. Pica apenas, refresca mucho y se toma sin darse cuenta.",
    family: "con-caracter",
    tint: "#c0713a",
    ...shot(7),
  },
  {
    id: "negroni",
    n: "08",
    name: "Negroni",
    base: "Gin",
    build: "Vermut rosso · bitter",
    note: "Tres partes iguales y hielo grande. Amargo, rojo y memorable: el favorito de quien sabe pedir.",
    family: "con-caracter",
    tint: "#b0391c",
    ...shot(8),
  },
  {
    id: "margarita-chamoy",
    n: "09",
    name: "Margarita Chamoy",
    base: "Tequila",
    build: "Chamoy · tajín · limón",
    note: "Hielo frappé, borde rojo y ese golpe dulce-picante. La que se pide dos veces.",
    family: "con-caracter",
    tint: "#cf6b46",
    ...shot(9),
  },
  {
    id: "margarita",
    n: "10",
    name: "Margarita",
    base: "Tequila",
    build: "Triple sec · limón · sal",
    note: "El clásico exacto: cítrico, frío y con el borde justo. Sin mezclas dulces de tienda.",
    family: "clasicos",
    tint: "#d9cf94",
    ...shot(10),
  },
  {
    id: "espresso-martini",
    n: "11",
    name: "Espresso Martini",
    base: "Vodka",
    build: "Café · licor de café",
    note: "Espuma densa y tres granos encima. El trago que revive la pista después de la cena.",
    family: "con-caracter",
    tint: "#8a5c45",
    ...shot(11),
  },
  {
    id: "tequila-sunrise",
    n: "12",
    name: "Tequila Sunrise",
    base: "Tequila",
    build: "Naranja · granadina",
    note: "El degradado se arma solo en el vaso. Dulce, largo y perfecto para brindar temprano.",
    family: "tropicales",
    tint: "#ef8a3c",
    ...shot(12),
  },
];
