import * as THREE from "three";

export type GlassKind = "rocks" | "margarita" | "martini" | "wine";

type P = [number, number];

/**
 * Perfil de una copa como sólido cerrado, en unidades donde el vaso corto mide
 * casi 1 de alto. Se gira alrededor del eje Y.
 */
type Profile = {
  /** De la base (sobre el eje) hasta el canto exterior del borde. */
  outer: P[];
  /** Del canto interior del borde hasta el fondo del vaso (sobre el eje). */
  inner: P[];
  /** Tramo de `outer` que lleva tallado: índices del punto inicial y final. */
  cut?: [number, number];
};

const BASE_STEM: P[] = [
  [0, 0],
  [0.33, 0],
  [0.342, 0.008],
  [0.34, 0.02],
  [0.3, 0.03],
  [0.08, 0.045],
  [0.042, 0.07],
  [0.028, 0.12],
];

export const PROFILES: Record<GlassKind, Profile> = {
  rocks: {
    outer: [
      [0, 0],
      [0.4, 0],
      [0.415, 0.006],
      [0.422, 0.02],
      [0.468, 0.93],
    ],
    inner: [
      [0.441, 0.93],
      [0.398, 0.185],
      [0.392, 0.168],
      [0.375, 0.16],
      [0, 0.16],
    ],
    cut: [3, 4],
  },
  margarita: {
    outer: [
      ...BASE_STEM,
      [0.026, 0.58],
      [0.04, 0.63],
      [0.085, 0.665],
      [0.13, 0.7],
      [0.155, 0.75],
      [0.16, 0.8],
      [0.175, 0.845],
      [0.23, 0.885],
      [0.33, 0.93],
      [0.45, 0.99],
      [0.545, 1.055],
      [0.6, 1.12],
    ],
    inner: [
      [0.585, 1.12],
      [0.532, 1.064],
      [0.44, 1.003],
      [0.323, 0.944],
      [0.222, 0.9],
      [0.162, 0.856],
      [0.146, 0.805],
      [0.141, 0.755],
      [0.118, 0.712],
      [0.075, 0.682],
      [0.03, 0.666],
      [0, 0.662],
    ],
  },
  martini: {
    outer: [...BASE_STEM, [0.026, 0.7], [0.05, 0.725], [0.1, 0.77], [0.62, 1.28]],
    inner: [
      [0.604, 1.28],
      [0.09, 0.79],
      [0.03, 0.752],
      [0, 0.745],
    ],
  },
  wine: {
    outer: [
      ...BASE_STEM,
      [0.028, 0.55],
      [0.05, 0.6],
      [0.12, 0.64],
      [0.25, 0.7],
      [0.36, 0.8],
      [0.42, 0.92],
      [0.43, 1.04],
      [0.41, 1.18],
      [0.37, 1.32],
    ],
    inner: [
      [0.356, 1.32],
      [0.396, 1.18],
      [0.416, 1.04],
      [0.406, 0.925],
      [0.348, 0.81],
      [0.24, 0.712],
      [0.115, 0.655],
      [0.045, 0.622],
      [0, 0.615],
    ],
  },
};

/** Radio de un tramo del perfil a la altura `y` (el tramo sube siempre). */
export function radiusAt(points: P[], y: number) {
  for (let i = 1; i < points.length; i++) {
    const [x0, y0] = points[i - 1];
    const [x1, y1] = points[i];
    if (y >= y0 && y <= y1) return y1 === y0 ? Math.max(x0, x1) : x0 + ((x1 - x0) * (y - y0)) / (y1 - y0);
  }
  return points[points.length - 1][0];
}

export const rimOf = (kind: GlassKind) => PROFILES[kind].outer.at(-1)!;

/** Fondo y borde de la cavidad, sobre el eje. */
export const cavityOf = (kind: GlassKind) => {
  const inner = PROFILES[kind].inner;
  return { floor: inner.at(-1)![1], rim: inner[0][1] };
};

/** Interior subiendo desde el fondo: sirve para el líquido y para saber dónde cabe el hielo. */
export const innerUp = (kind: GlassKind) => [...PROFILES[kind].inner].reverse();

export function buildGlass(kind: GlassKind) {
  const { outer, inner, cut } = PROFILES[kind];
  const [ox, oy] = outer.at(-1)!;
  const [ix] = inner[0];
  const cx = (ox + ix) / 2;
  const r = (ox - ix) / 2;
  // borde redondo: es lo que más brilla en una copa
  const arc: P[] = [];
  for (let k = 1; k < 8; k++) {
    const a = (k / 8) * Math.PI;
    arc.push([cx + r * Math.cos(a), oy + r * Math.sin(a)]);
  }
  const pts = [...outer, ...arc, ...inner];
  const geometry = new THREE.LatheGeometry(
    pts.map(([x, y]) => new THREE.Vector2(x, y)),
    112,
  );
  const last = pts.length - 1;
  return { geometry, cutV: cut ? ([cut[0] / last, cut[1] / last] as [number, number]) : null };
}

/** Líquido: el interior hasta `fill` (altura absoluta), apenas separado del vidrio. */
export function buildLiquid(kind: GlassKind, fill: number, inset = 0.006) {
  const up = innerUp(kind);
  const pts: P[] = [[0, up[0][1] + 0.003]];
  for (const [x, y] of up.slice(1)) {
    if (y >= fill) break;
    pts.push([Math.max(x - inset, 0.001), y + 0.003]);
  }
  const top = Math.max(radiusAt(up, fill) - inset, 0.001);
  // menisco: el líquido sube un pelo contra el vidrio
  pts.push([top, fill + 0.006], [top - 0.012, fill], [0, fill]);
  return new THREE.LatheGeometry(
    pts.map(([x, y]) => new THREE.Vector2(x, y)),
    96,
  );
}
