import type { GlassKind } from "./glasses";
import type { Citrus } from "./textures";

export type Garnish =
  | { kind: "wheel-rim"; citrus: Citrus; angle: number; tilt: number }
  | { kind: "wheel-inside"; citrus: Citrus; angle: number; y: number }
  | { kind: "twist"; angle: number };

export type Drink3D = {
  /** Mismo id que en la carta, para sacar nombre y licor. */
  id: string;
  glass: GlassKind;
  cut?: boolean;
  /** Color del líquido y del brillo que sale de adentro. */
  liquid: string;
  glow: string;
  glowStrength: number;
  /** Altura del líquido, en las unidades del perfil del vaso. */
  fill: number;
  ice?: { size: number; at: [number, number, number]; rot: [number, number, number] }[];
  salt?: boolean;
  bubbles?: boolean;
  garnish: Garnish[];
  /** Escala para que todos ocupen más o menos lo mismo en el escenario. */
  scale: number;
};

export const DRINKS_3D: Drink3D[] = [
  {
    id: "blue-lagoon",
    glass: "rocks",
    cut: true,
    liquid: "#0a5fd0",
    glow: "#1e8cff",
    glowStrength: 0.9,
    fill: 0.79,
    ice: [
      { size: 0.27, at: [-0.11, 0.8, 0.07], rot: [0.35, 0.6, 0.12] },
      { size: 0.25, at: [0.13, 0.78, -0.07], rot: [-0.2, 1.1, 0.3] },
      { size: 0.23, at: [0.04, 0.82, 0.19], rot: [0.5, 0.2, -0.25] },
    ],
    garnish: [{ kind: "wheel-rim", citrus: "lime", angle: -0.55, tilt: 0.12 }],
    scale: 1.3,
  },
  {
    id: "margarita",
    glass: "margarita",
    liquid: "#c7cf62",
    glow: "#e9f07c",
    glowStrength: 0.55,
    fill: 0.99,
    salt: true,
    garnish: [{ kind: "wheel-rim", citrus: "lime", angle: 0.35, tilt: -0.2 }],
    scale: 1.08,
  },
  {
    id: "cosmopolitan",
    glass: "martini",
    liquid: "#c4113a",
    glow: "#ff2f5a",
    glowStrength: 0.7,
    fill: 1.19,
    garnish: [{ kind: "twist", angle: 0.5 }],
    scale: 1.02,
  },
  {
    id: "aperol-spritz",
    glass: "wine",
    liquid: "#f2560a",
    glow: "#ff7a1c",
    glowStrength: 0.85,
    fill: 1.12,
    bubbles: true,
    ice: [
      { size: 0.22, at: [-0.12, 1.12, 0.02], rot: [0.3, 0.7, 0.2] },
      { size: 0.2, at: [0.12, 1.1, -0.09], rot: [-0.25, 0.3, 0.4] },
    ],
    garnish: [{ kind: "wheel-inside", citrus: "orange", angle: 0.35, y: 0.93 }],
    scale: 1.02,
  },
  {
    id: "negroni",
    glass: "rocks",
    cut: true,
    liquid: "#8e0d14",
    glow: "#e0281f",
    glowStrength: 0.6,
    fill: 0.7,
    ice: [{ size: 0.34, at: [0, 0.68, 0], rot: [0.12, 0.5, 0.06] }],
    garnish: [{ kind: "wheel-rim", citrus: "orange", angle: 0.5, tilt: -0.1 }],
    scale: 1.3,
  },
];
