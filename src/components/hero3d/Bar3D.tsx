"use client";

import { Environment, Lightformer, MeshReflectorMaterial } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState, type MutableRefObject } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import type { Drink3D, Garnish } from "./drinks";
import { buildGlass, buildLiquid, innerUp, PROFILES, radiusAt, rimOf } from "./glasses";
import { citrusTexture, cutGlassNormal, shadowTexture, type Citrus } from "./textures";

/** Estado compartido con el DOM: arrastre para girar y cambio de trago. */
export type Spin = {
  dragging: boolean;
  /** Giro acumulado por el arrastre, en radianes. */
  offset: number;
  velocity: number;
};

type Props = {
  drinks: Drink3D[];
  index: number;
  dir: 1 | -1;
  spin: MutableRefObject<Spin>;
  active: boolean;
  still: boolean;
  compact: boolean;
  /** Color del trago que se ve: tiñe el haz y el resplandor. */
  tint: string;
  onReady: () => void;
};

const SLIDE = 2.6;
/** Mismo negro que la página (bg-noche): el lienzo se funde con ella en los bordes. */
const BASE = "#08090a";
const SWAP_S = 1.05;

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/* ---------------------------------------------------------------- materiales */

function useCitrus(kind: Citrus) {
  return useMemo(() => {
    const tex = citrusTexture(kind);
    const face = new THREE.MeshPhysicalMaterial({
      map: tex,
      emissiveMap: tex,
      emissive: new THREE.Color("#ffffff"),
      emissiveIntensity: 0.22,
      roughness: 0.42,
      sheen: 0.4,
    });
    const rind = new THREE.MeshStandardMaterial({
      color: kind === "lime" ? "#3a7418" : "#e5700e",
      roughness: 0.5,
    });
    return [rind, face, face];
  }, [kind]);
}

function liquidMaterial(drink: Drink3D, floor: number) {
  const mat = new THREE.MeshPhysicalMaterial({
    color: drink.liquid,
    emissive: new THREE.Color(drink.glow),
    emissiveIntensity: drink.glowStrength,
    roughness: 0.14,
    clearcoat: 0.25,
    clearcoatRoughness: 0.1,
    envMapIntensity: 0.25,
  });
  // Más oscuro abajo y en los bordes, más vivo arriba y de frente: así se lee
  // como un volumen de líquido y no como un bloque de plástico.
  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uFloor = { value: floor };
    shader.uniforms.uFill = { value: drink.fill };
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", "#include <common>\nvarying float vLocalY;\nvarying float vUp;")
      .replace("#include <begin_vertex>", "#include <begin_vertex>\nvLocalY = position.y;\nvUp = normal.y;");
    shader.fragmentShader = shader.fragmentShader
      .replace(
        "#include <common>",
        "#include <common>\nuniform float uFloor;\nuniform float uFill;\nvarying float vLocalY;\nvarying float vUp;",
      )
      .replace(
        "#include <emissivemap_fragment>",
        `#include <emissivemap_fragment>
         float depthT = smoothstep(uFloor, uFill, vLocalY);
         float facing = max(dot(normal, normalize(vViewPosition)), 0.0);
         float top = smoothstep(0.6, 0.95, vUp);
         diffuseColor.rgb *= mix(0.35, 1.0, depthT);
         // la superficie se ve desde arriba: ahí uno mira hacia adentro del trago
         totalEmissiveRadiance *= (0.06 + 1.15 * mix(pow(facing, 2.4), 0.5, top)) * mix(0.12, 1.0, depthT * depthT);`,
      );
  };
  return mat;
}

/* ------------------------------------------------------------------ guarnición */

function WheelOnRim({ drink, g }: { drink: Drink3D; g: Extract<Garnish, { kind: "wheel-rim" }> }) {
  const mats = useCitrus(g.citrus);
  const [rx, ry] = rimOf(drink.glass);
  const r = drink.glass === "rocks" ? 0.2 : 0.17;
  // atrás del borde, de frente a la cámara, con la ranura metida en el vidrio
  const x = Math.sin(g.angle) * rx * 0.86;
  const z = -Math.cos(g.angle) * rx * 0.86;
  return (
    <mesh
      position={[x, ry + r * 0.42, z]}
      rotation={[Math.PI / 2 + 0.08, g.tilt, g.angle * 0.6]}
      material={mats}
    >
      <cylinderGeometry args={[r, r, 0.045, 64]} />
    </mesh>
  );
}

function WheelInside({ drink, g }: { drink: Drink3D; g: Extract<Garnish, { kind: "wheel-inside" }> }) {
  const mats = useCitrus(g.citrus);
  const wall = radiusAt(innerUp(drink.glass), g.y) - 0.035;
  const r = 0.16;
  return (
    <group rotation={[0, g.angle, 0]}>
      <mesh position={[0, g.y, wall]} rotation={[Math.PI / 2, 0, 0.3]} material={mats}>
        <cylinderGeometry args={[r, r, 0.04, 64]} />
      </mesh>
    </group>
  );
}

function Twist({ drink, angle }: { drink: Drink3D; angle: number }) {
  const geo = useMemo(() => {
    const [rx, ry] = rimOf(drink.glass);
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i <= 40; i++) {
      const t = i / 40;
      const a = t * Math.PI * 4.2;
      const rad = 0.05 * (1 - t * 0.35);
      pts.push(new THREE.Vector3(rx + 0.03 + t * 0.05 + Math.cos(a) * rad, ry + 0.03 - t * 0.42, Math.sin(a) * rad));
    }
    const geo = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts), 160, 0.016, 8, false);
    geo.scale(1, 1, 1);
    return geo;
  }, [drink.glass]);
  return (
    <mesh geometry={geo} rotation={[0, angle, 0]}>
      <meshPhysicalMaterial color="#f07a14" roughness={0.38} clearcoat={0.6} emissive="#ff6a00" emissiveIntensity={0.12} />
    </mesh>
  );
}

function Salt({ drink }: { drink: Drink3D }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const count = 1100;
  useEffect(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const outer = PROFILES[drink.glass].outer;
    const [, ry] = rimOf(drink.glass);
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const e = new THREE.Euler();
    const s = new THREE.Vector3();
    const p = new THREE.Vector3();
    const rand = makeRand(3);
    for (let i = 0; i < count; i++) {
      const a = rand() * Math.PI * 2;
      const y = ry + 0.006 - Math.pow(rand(), 2.2) * 0.03;
      const r = radiusAt(outer, Math.min(y, ry)) + 0.004 + rand() * 0.006;
      p.set(Math.cos(a) * r, y, Math.sin(a) * r);
      e.set(rand() * 3, rand() * 3, rand() * 3);
      q.setFromEuler(e);
      const k = 0.0025 + rand() * 0.0035;
      s.set(k, k * (0.6 + rand() * 0.8), k);
      m.compose(p, q, s);
      mesh.setMatrixAt(i, m);
    }
    mesh.instanceMatrix.needsUpdate = true;
  }, [drink.glass]);
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <boxGeometry />
      <meshStandardMaterial color="#f6f2ea" roughness={0.4} emissive="#ffffff" emissiveIntensity={0.5} />
    </instancedMesh>
  );
}

function makeRand(seed: number) {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
}

const BUBBLES = (() => {
  const rand = makeRand(5);
  return Array.from({ length: 70 }, () => ({
    a: rand() * Math.PI * 2,
    t: rand(),
    v: 0.05 + rand() * 0.08,
    k: 0.006 + rand() * 0.008,
  }));
})();

const scratch = new THREE.Matrix4();

function Bubbles({ drink }: { drink: Drink3D }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const up = useMemo(() => innerUp(drink.glass), [drink.glass]);
  useFrame(({ clock }) => {
    const mesh = ref.current;
    if (!mesh || !mesh.parent?.parent?.visible) return;
    const floor = up[0][1] + 0.06;
    const top = drink.fill - 0.01;
    const now = clock.elapsedTime;
    BUBBLES.forEach((b, i) => {
      const y = floor + (top - floor) * ((b.t + now * b.v) % 1);
      const r = radiusAt(up, y) - 0.004 - b.k;
      scratch.makeScale(b.k, b.k, b.k);
      scratch.setPosition(Math.cos(b.a) * r, y, Math.sin(b.a) * r);
      mesh.setMatrixAt(i, scratch);
    });
    mesh.instanceMatrix.needsUpdate = true;
  });
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, BUBBLES.length]}>
      <sphereGeometry args={[1, 10, 8]} />
      <meshPhysicalMaterial color="#ffe0c0" roughness={0.1} emissive="#ffb070" emissiveIntensity={0.35} />
    </instancedMesh>
  );
}

/* ------------------------------------------------------------------- un trago */

function Drink({ drink, groupRef }: { drink: Drink3D; groupRef: (g: THREE.Group | null) => void }) {
  const parts = useMemo(() => {
    const glass = buildGlass(drink.glass);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: "#ffffff",
      transmission: 1,
      // copas de pared fina: con más grosor el vidrio repite el líquido en franjas
      thickness: drink.glass === "rocks" ? 0.12 : 0.025,
      roughness: 0.015,
      ior: 1.5,
      specularIntensity: 1,
      envMapIntensity: 0.9,
      side: THREE.DoubleSide,
    });
    if (drink.cut && glass.cutV) {
      glassMat.normalMap = cutGlassNormal(glass.cutV[0], glass.cutV[1]);
      glassMat.normalScale.set(0.5, 0.5);
    }
    const liquid = buildLiquid(drink.glass, drink.fill);
    const liquidMat = liquidMaterial(drink, innerUp(drink.glass)[0][1]);
    const iceMat = new THREE.MeshPhysicalMaterial({
      color: "#f3f9ff",
      transmission: 1,
      thickness: 0.3,
      roughness: 0.07,
      ior: 1.31,
      envMapIntensity: 0.8,
      side: THREE.DoubleSide,
    });
    const ice = (drink.ice ?? []).map((c) => ({ ...c, geo: new RoundedBoxGeometry(c.size, c.size, c.size, 3, c.size * 0.16) }));
    return { glass, glassMat, liquid, liquidMat, iceMat, ice };
  }, [drink]);

  return (
    <group ref={groupRef} visible={false}>
      <group scale={drink.scale}>
        <mesh geometry={parts.glass.geometry} material={parts.glassMat} />
        <mesh geometry={parts.liquid} material={parts.liquidMat} />
        {parts.ice.map((c, i) => (
          <mesh key={i} geometry={c.geo} material={parts.iceMat} position={c.at} rotation={c.rot} />
        ))}
        {drink.salt ? <Salt drink={drink} /> : null}
        {drink.bubbles ? <Bubbles drink={drink} /> : null}
        {drink.garnish.map((g, i) =>
          g.kind === "wheel-rim" ? (
            <WheelOnRim key={i} drink={drink} g={g} />
          ) : g.kind === "wheel-inside" ? (
            <WheelInside key={i} drink={drink} g={g} />
          ) : (
            <Twist key={i} drink={drink} angle={g.angle} />
          ),
        )}
      </group>
    </group>
  );
}

/* --------------------------------------------------------------------- escena */

const BACKDROP_VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.9999, 1.0);
  }
`;

const BACKDROP_FRAG = /* glsl */ `
  uniform vec3 uBase;
  uniform vec3 uTint;
  uniform float uAspect;
  varying vec2 vUv;
  void main() {
    vec2 p = vec2((vUv.x - 0.5) * uAspect, vUv.y);
    // haz de luz cenital: un trapecio suave que se abre hacia abajo
    float hw = mix(0.34, 0.075, smoothstep(0.08, 1.0, p.y));
    float edge = 1.0 - smoothstep(hw * 0.45, hw * 1.15, abs(p.x));
    float fall = smoothstep(0.05, 0.55, p.y) * mix(0.55, 1.0, p.y);
    vec3 beam = mix(vec3(1.0, 0.96, 0.9), uTint, 0.3) * edge * fall * 0.05;
    // resplandor del color del trago detrás del vaso
    float glow = exp(-dot(p - vec2(0.0, 0.46), p - vec2(0.0, 0.46)) / 0.045);
    vec3 col = uBase + beam + uTint * glow * 0.11;
    gl_FragColor = vec4(col, 1.0);
    #include <colorspace_fragment>
  }
`;

/**
 * Fondo opaco con el haz y el resplandor. Tiene que estar dentro de la escena:
 * el vidrio solo refracta lo que está dibujado detrás, y con un lienzo
 * transparente three.js rellena ese fondo de blanco y el vaso se ve lechoso.
 */
const tintTarget = new THREE.Color();

function Backdrop({ tint }: { tint: string }) {
  const { size } = useThree();
  const mat = useRef<THREE.ShaderMaterial>(null);
  // el color arranca con el primer trago y después se anima en useFrame
  const [uniforms] = useState(() => ({
    uBase: { value: new THREE.Color(BASE) },
    uTint: { value: new THREE.Color(tint) },
    uAspect: { value: 1 },
  }));
  useFrame((_, dt) => {
    const m = mat.current;
    if (!m) return;
    m.uniforms.uAspect.value = size.width / size.height;
    (m.uniforms.uTint.value as THREE.Color).lerp(tintTarget.set(tint), Math.min(1, dt * 2.2));
  });
  return (
    <mesh renderOrder={-1} frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={mat}
        vertexShader={BACKDROP_VERT}
        fragmentShader={BACKDROP_FRAG}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

function Plinth({ compact }: { compact: boolean }) {
  const shadow = useMemo(() => shadowTexture(), []);
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <circleGeometry args={[1.12, 96]} />
        <MeshReflectorMaterial
          resolution={compact ? 256 : 512}
          blur={[90, 28]}
          mixBlur={0.7}
          mixStrength={55}
          mixContrast={1}
          depthScale={0}
          mirror={1}
          roughness={0.9}
          metalness={0}
          color="#111214"
        />
      </mesh>
      {/* canto: apenas un filo de luz */}
      <mesh position={[0, -0.035, 0]}>
        <cylinderGeometry args={[1.12, 1.11, 0.07, 96, 1, true]} />
        <meshStandardMaterial color="#060607" roughness={0.6} metalness={0.3} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 0]}>
        <ringGeometry args={[1.108, 1.12, 128]} />
        <meshBasicMaterial color="#f7f4ec" transparent opacity={0.22} toneMapped={false} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.003, 0]}>
        <planeGeometry args={[1.5, 1.5]} />
        <meshBasicMaterial map={shadow} transparent depthWrite={false} opacity={0.9} />
      </mesh>
    </group>
  );
}

function Rig({ drinks, index, dir, spin, still, onReady }: Omit<Props, "active" | "compact" | "tint">) {
  const groups = useRef<(THREE.Group | null)[]>([]);
  const swap = useRef({ cur: index, prev: -1, dir, t: 1 });
  const motion = useRef({ yaw: -0.35, coast: 0, velocity: 0, wasDragging: false, frames: 0 });
  const { camera } = useThree();

  useEffect(() => {
    camera.lookAt(0, 0.6, 0);
  }, [camera]);

  useEffect(() => {
    if (swap.current.cur === index) return;
    swap.current = { cur: index, prev: swap.current.cur, dir, t: still ? 1 : 0 };
  }, [index, dir, still]);

  useFrame((_, rawDt) => {
    const dt = Math.min(rawDt, 1 / 20);
    const mo = motion.current;
    const { dragging, offset, velocity } = spin.current;

    // al soltar, el trago sigue girando un rato con la inercia del dedo
    if (mo.wasDragging && !dragging) mo.velocity = velocity;
    mo.wasDragging = dragging;
    if (!dragging) {
      mo.coast += mo.velocity * dt;
      mo.velocity *= Math.pow(0.04, dt);
      if (!still) mo.yaw += dt * 0.32;
    }

    const sw = swap.current;
    sw.t = Math.min(1, sw.t + dt / SWAP_S);
    const turn = mo.yaw + offset + mo.coast;

    groups.current.forEach((g, i) => {
      if (!g) return;
      const isCur = i === sw.cur;
      const isPrev = i === sw.prev && sw.t < 1;
      g.visible = isCur || isPrev;
      if (!g.visible) return;
      // el que sale se va primero y rápido; el que entra llega un poco después,
      // así nunca se montan uno sobre otro en la peana
      if (isCur) {
        const e = easeOut(Math.max(0, (sw.t - 0.12) / 0.88));
        g.position.set(sw.dir * SLIDE * (1 - e), 0, 0);
        g.scale.setScalar(0.8 + 0.2 * e);
        g.rotation.y = turn - sw.dir * 1.4 * (1 - e);
      } else {
        const e = easeInOut(Math.min(1, sw.t * 1.6));
        g.position.set(-sw.dir * SLIDE * e, 0, 0);
        g.scale.setScalar(1 - 0.25 * e);
        g.rotation.y = turn + sw.dir * 0.9 * e;
      }
    });

    if (mo.frames < 3 && ++mo.frames === 3) onReady();
  });

  return (
    <>
      {drinks.map((d, i) => (
        <Drink
          key={d.id}
          drink={d}
          groupRef={(g) => {
            groups.current[i] = g;
          }}
        />
      ))}
    </>
  );
}

/** En el celular basta con 30 cuadros por segundo: el vidrio pide varias pasadas por cuadro. */
function Ticker({ fps }: { fps: number }) {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    const id = window.setInterval(() => invalidate(), 1000 / fps);
    return () => window.clearInterval(id);
  }, [fps, invalidate]);
  return null;
}

export default function Bar3D({ drinks, index, dir, spin, active, still, compact, tint, onReady }: Props) {
  return (
    <Canvas
      dpr={compact ? [1, 1.4] : [1, 1.75]}
      frameloop={!active ? "never" : compact ? "demand" : "always"}
      camera={{ fov: 25, position: [0, 1.85, 6.6], near: 0.1, far: 40 }}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.NeutralToneMapping;
        gl.toneMappingExposure = 1.05;
        gl.setClearColor(BASE, 1);
      }}
      aria-hidden
    >
      <ambientLight intensity={0.12} />
      <spotLight
        position={[0.5, 6, 2.4]}
        angle={0.36}
        penumbra={0.85}
        intensity={110}
        decay={2}
        color="#fff4e2"
      />
      <spotLight position={[0, 3.2, -3.4]} angle={0.5} penumbra={1} intensity={34} decay={2} color="#ffffff" />

      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={4} position={[-3, 1.2, 1.4]} rotation={[0, Math.PI / 2.4, 0]} scale={[0.22, 5, 1]} />
        <Lightformer form="rect" intensity={2.2} position={[-3, 1.2, -0.4]} rotation={[0, Math.PI / 2, 0]} scale={[0.12, 5, 1]} />
        <Lightformer form="rect" intensity={3} position={[3, 1.2, 1.2]} rotation={[0, -Math.PI / 2.4, 0]} scale={[0.18, 5, 1]} />
        <Lightformer form="ring" intensity={0.6} position={[0, 5, 0.5]} rotation={[Math.PI / 2, 0, 0]} scale={0.9} />
        <Lightformer form="rect" intensity={0.7} position={[0, 1.4, -4]} scale={[0.3, 4, 1]} />
      </Environment>

      {compact && active ? <Ticker fps={30} /> : null}
      <Backdrop tint={tint} />
      <Plinth compact={compact} />
      <Rig drinks={drinks} index={index} dir={dir} spin={spin} still={still} onReady={onReady} />
    </Canvas>
  );
}
