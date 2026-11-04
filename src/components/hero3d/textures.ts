import * as THREE from "three";

const TAU = Math.PI * 2;

/** Aleatorio con semilla, para que las texturas salgan iguales en cada carga. */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function canvas(w: number, h = w) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  return { c, g: c.getContext("2d")! };
}

export type Citrus = "lime" | "orange";

const CITRUS = {
  lime: { rind: "#3f7a1c", pith: "#eef0cf", core: "#f4f6d2", pulp: "#c3dc4e", edge: "#9fc23a", cells: 10 },
  orange: { rind: "#ee7a12", pith: "#fff1d2", core: "#fff4dc", pulp: "#ffa43a", edge: "#f37d18", cells: 11 },
} as const;

/** Rodaja de cítrico de frente: cáscara, albedo, gajos y vesículas. */
export function citrusTexture(kind: Citrus) {
  const p = CITRUS[kind];
  const size = 512;
  const R = size / 2;
  const { c, g } = canvas(size);
  const rand = seeded(kind === "lime" ? 7 : 11);
  g.translate(R, R);

  const disc = (r: number, fill: string | CanvasGradient) => {
    g.fillStyle = fill;
    g.beginPath();
    g.arc(0, 0, r, 0, TAU);
    g.fill();
  };

  disc(R, p.rind);
  disc(R * 0.94, p.pith);
  const pulp = g.createRadialGradient(0, 0, R * 0.06, 0, 0, R * 0.86);
  pulp.addColorStop(0, p.core);
  pulp.addColorStop(0.3, p.pulp);
  pulp.addColorStop(1, p.edge);
  disc(R * 0.86, pulp);

  // vesículas: trazos alargados hacia afuera
  for (let i = 0; i < 1400; i++) {
    const a = rand() * TAU;
    const d = R * (0.1 + rand() * 0.74);
    g.save();
    g.rotate(a);
    g.translate(d, 0);
    g.fillStyle = rand() > 0.5 ? "rgba(255,255,235,0.22)" : "rgba(80,90,10,0.12)";
    g.beginPath();
    g.ellipse(0, 0, 6 + rand() * 10, 1.6 + rand() * 1.6, 0, 0, TAU);
    g.fill();
    g.restore();
  }

  // membranas entre gajos
  g.strokeStyle = p.pith;
  g.lineCap = "round";
  for (let i = 0; i < p.cells; i++) {
    const a = (i / p.cells) * TAU + 0.12;
    g.lineWidth = 5;
    g.beginPath();
    g.moveTo(Math.cos(a) * R * 0.08, Math.sin(a) * R * 0.08);
    g.lineTo(Math.cos(a) * R * 0.87, Math.sin(a) * R * 0.87);
    g.stroke();
  }
  disc(R * 0.075, p.pith);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

/**
 * Mapa de normales de un tallado en diamante, para la pared de un vaso torneado.
 * `v0`–`v1` es el tramo de la textura que cae sobre la pared; arriba queda una
 * franja lisa, como en los vasos de cristal tallado de verdad.
 */
export function cutGlassNormal(v0: number, v1: number, around = 20, rows = 4.5, plain = 0.3) {
  const W = 1024;
  const H = 2048;
  const { c, g } = canvas(W, H);
  g.fillStyle = "rgb(128,128,255)";
  g.fillRect(0, 0, W, H);

  // la textura se voltea en Y: v = 1 es la fila de arriba del lienzo
  const yBottom = (1 - v0) * H;
  const yTop = (1 - v1) * H;
  const yCut = yTop + (yBottom - yTop) * plain;
  const cw = W / around;
  const ch = (yBottom - yCut) / rows;

  const tilt = 0.55;
  const color = (nx: number, ny: number) => {
    const l = Math.hypot(nx, ny, 1);
    const enc = (n: number) => Math.round((n / l) * 127.5 + 127.5);
    return `rgb(${enc(nx)},${enc(ny)},${enc(1)})`;
  };
  const facets = [
    { n: color(-tilt, tilt), v: [0, -1, -1, 0] },
    { n: color(tilt, tilt), v: [0, -1, 1, 0] },
    { n: color(tilt, -tilt), v: [0, 1, 1, 0] },
    { n: color(-tilt, -tilt), v: [0, 1, -1, 0] },
  ];

  g.save();
  g.beginPath();
  g.rect(0, yCut, W, yBottom - yCut);
  g.clip();
  const halfRows = Math.ceil(rows * 2) + 2;
  for (let r = 0; r <= halfRows; r++) {
    const cy = yBottom - (r * ch) / 2;
    const shift = r % 2 ? cw / 2 : 0;
    for (let k = -1; k <= around; k++) {
      const cx = k * cw + shift;
      for (const f of facets) {
        g.fillStyle = f.n;
        g.beginPath();
        g.moveTo(cx, cy);
        g.lineTo(cx + (f.v[0] * cw) / 2, cy + (f.v[1] * ch) / 2);
        g.lineTo(cx + (f.v[2] * cw) / 2, cy + (f.v[3] * ch) / 2);
        g.closePath();
        g.fill();
      }
    }
  }
  g.restore();

  // un filo horizontal donde termina el tallado
  g.fillStyle = color(0, -0.7);
  g.fillRect(0, yCut - 6, W, 6);

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.NoColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.anisotropy = 8;
  return tex;
}

/** Sombra de contacto: un degradé radial negro. */
export function shadowTexture() {
  const size = 256;
  const { c, g } = canvas(size);
  const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  grad.addColorStop(0, "rgba(0,0,0,0.85)");
  grad.addColorStop(0.45, "rgba(0,0,0,0.5)");
  grad.addColorStop(1, "rgba(0,0,0,0)");
  g.fillStyle = grad;
  g.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  return tex;
}
