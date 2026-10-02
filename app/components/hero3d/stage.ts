import * as THREE from "three";

// ─── Cast ──────────────────────────────────────────────────────

export type CharacterId = "bubbles" | "bagu" | "lanky" | "bolt" | "pino" | "chutki" | "moti";

export interface CharacterConfig {
  id: CharacterId;
  name: string;
  line: string;
  url: string;
  /** Height relative to Moti, the tallest of the original crew. */
  height: number;
}

// Listed in drop-in order.
export const CHARACTERS: CharacterConfig[] = [
  { id: "pino", name: "Pino", line: "Reformed hoarder. Ask me for textbooks!", url: "/models/pino.glb", height: 0.7 },
  { id: "chutki", name: "Chutki", line: "Lent my ring light 12× this sem ✦", url: "/models/chutki.glb", height: 0.76 },
  { id: "moti", name: "Moti", line: "Borrowed a DSLR for the fest reel. 5★ return!", url: "/models/moti.glb", height: 1 },
  { id: "bubbles", name: "Bubbles", line: "My puffer's up for loan. Yes, it's that warm.", url: "/models/bubbles.glb", height: 0.98 },
  { id: "lanky", name: "Lanky", line: "Tallest on campus. I fetch top-shelf books.", url: "/models/lanky.glb", height: 0.84 },
  { id: "bagu", name: "Bagu", line: "30 litres of borrowed stuff. Hop in!", url: "/models/bagu.glb", height: 0.42 },
  { id: "bolt", name: "Bolt", line: "Calculators, chargers, cables. Beep me.", url: "/models/bolt.glb", height: 0.44 },
];

/** Static models that sit in the scene as props (height relative to Moti). */
export const MODEL_PROPS = {
  plant: { url: "/models/plant.glb", height: 0.25 },
  books: { url: "/models/books.glb", height: 0.46 },
  imageCard: { url: "/models/image-card.glb", height: 0.3 },
  ladder: { url: "/models/ladder.glb", height: 0.6 },
} as const;

// ─── Camera ────────────────────────────────────────────────────

export const CAMERA = {
  fov: 30,
  position: [0, 1.3, 12] as [number, number, number],
};

const CAMERA_DISTANCE = Math.hypot(CAMERA.position[1], CAMERA.position[2]);

// ─── Layout ────────────────────────────────────────────────────

export type PropId =
  | "plant"
  | "books"
  | "ladder"
  | "toggle"
  | "scribble"
  | "sliderCube"
  | "imageCard"
  | "mic"
  | "headphones";

export type Vec3 = [number, number, number];

export interface StageLayout {
  groundY: number;
  /** World-space height of Moti; everything else is sized relative to this. */
  unit: number;
  /** World-space width the crew is spread across. */
  span: number;
  /** How far above their spot the crew starts when they drop in. */
  dropHeight: number;
  propScale: number;
  characters: Partial<Record<CharacterId, Vec3>>;
  props: Partial<Record<PropId, Vec3>>;
}

/**
 * Lays the stage out in screen terms (where the feet sit, how much room is
 * left under the hero copy) and projects that into world space, so the crew
 * never collides with the headline regardless of viewport shape.
 */
export function computeStageLayout(
  width: number,
  height: number,
  copyBottomPx: number | null
): StageLayout {
  const aspect = width / height;
  const camera = new THREE.PerspectiveCamera(CAMERA.fov, aspect, 0.1, 100);
  camera.position.set(...CAMERA.position);
  camera.lookAt(0, 0, 0);
  camera.updateMatrixWorld();

  const ray = new THREE.Vector3();
  const project = (ndcX: number, ndcY: number, planeZ = 0): Vec3 => {
    ray.set(ndcX, ndcY, 0.5).unproject(camera).sub(camera.position).normalize();
    const t = (planeZ - camera.position.z) / ray.z;
    return [camera.position.x + ray.x * t, camera.position.y + ray.y * t, planeZ];
  };

  const portrait = aspect < 1;
  const wide = aspect >= 1.35;

  // The mobile bottom nav (below `lg`) covers the last 64px of the hero.
  const feetPx = height - (width < 1024 ? 64 + height * 0.035 : height * 0.075);
  const roomPx = feetPx - (copyBottomPx ?? height * 0.42) - 20;
  const spanPx = Math.min(width, height * 2.1);

  let unitPx = portrait
    ? Math.min(width * 0.5, roomPx)
    : Math.min(height * 0.4, spanPx * (wide ? 0.21 : 0.24), roomPx / 0.8);
  unitPx = Math.max(unitPx, height * 0.14);

  const worldPerPx = (2 * CAMERA_DISTANCE * Math.tan(THREE.MathUtils.degToRad(CAMERA.fov / 2))) / height;
  const unit = unitPx * worldPerPx;

  const ndcX = (frac: number) => (2 * frac * spanPx) / width;
  const ndcY = (px: number) => 1 - (2 * px) / height;
  const groundY = project(0, ndcY(feetPx))[1];

  const ground = (frac: number, z = 0): Vec3 => [project(ndcX(frac), ndcY(feetPx))[0], groundY, z];
  const lifted = (frac: number, k: number, z = 0): Vec3 => [ground(frac)[0], groundY + k * unit, z];
  const screen = (frac: number, yPx: number, z = 0): Vec3 => project(ndcX(frac), ndcY(yPx), z);

  let characters: StageLayout["characters"];
  let props: StageLayout["props"];

  if (wide) {
    // Mirrors the original illustration's left-to-right composition.
    const f = 0.94;
    characters = {
      bubbles: ground(-0.37 * f, -0.2),
      bagu: ground(-0.3 * f, 0.35),
      lanky: ground(-0.185 * f, -0.35),
      bolt: ground(-0.15 * f, 0.05),
      chutki: ground(0.008, 0.3),
      pino: ground(0.31 * f, 0.15),
      moti: ground(0.42 * f, -0.15),
    };
    props = {
      plant: ground(-0.47 * f, 0.4),
      books: ground(-0.23 * f, 0.45),
      toggle: lifted(-0.095 * f, 0.1, 0.5),
      scribble: lifted(-0.11 * f, 0.55),
      sliderCube: lifted(-0.068 * f, 0.33, 0.2),
      imageCard: lifted(0.12 * f, 0.38),
      ladder: ground(0.21 * f, -0.1),
    };
    if (aspect >= 1.5) {
      props.mic = screen(-0.39, height * 0.36, 0.4);
      props.headphones = screen(0.39, height * 0.3, 0.2);
    }
  } else if (!portrait) {
    characters = {
      pino: ground(-0.3, 0.15),
      chutki: ground(0, 0.35),
      moti: ground(0.3, -0.1),
    };
    props = {
      scribble: lifted(-0.17, 0.62),
      sliderCube: lifted(-0.15, 0.36, 0.2),
      imageCard: lifted(0.15, 0.44),
    };
  } else {
    characters = {
      pino: ground(-0.29, 0.1),
      chutki: ground(0, 0.25),
      moti: ground(0.29, -0.3),
    };
    props = {};
    // Float a couple of props in the gap between the copy and the crew, if there is one.
    const gapTop = copyBottomPx ?? height * 0.42;
    const gapBottom = feetPx - unitPx;
    if (gapBottom - gapTop > unitPx * 0.45) {
      const mid = (gapTop + gapBottom) / 2;
      props.sliderCube = screen(-0.26, mid, 0.2);
      props.imageCard = screen(0.25, mid - 10);
    }
  }

  return {
    groundY,
    unit,
    span: spanPx * worldPerPx,
    dropHeight: height * worldPerPx * 1.1,
    propScale: portrait ? 1.35 : 1,
    characters,
    props,
  };
}

// ─── Easing ────────────────────────────────────────────────────

export const TAU = Math.PI * 2;

export const clamp01 = (x: number) => Math.min(Math.max(x, 0), 1);

export const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);

export const easeInOutCubic = (x: number) =>
  x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

export const easeOutBack = (x: number) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
};
