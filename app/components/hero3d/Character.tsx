"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState, type RefObject } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { Html, Line, useCursor, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { TAU, easeInOutCubic, type CharacterConfig, type Vec3 } from "./stage";

const DROP = 0.55;
const CROUCH = 0.12;
const AIR = 0.58;
const MAX_YAW = 0.85;
const { damp, clamp } = THREE.MathUtils;

interface CharacterProps {
  config: CharacterConfig;
  /** Where the feet touch the ground. */
  position: Vec3;
  unit: number;
  gaze: RefObject<THREE.Vector3>;
  introDelay: number;
  dropHeight: number;
  reducedMotion: boolean;
  onInteract: () => void;
}

export default function Character({
  config,
  position,
  unit,
  gaze,
  introDelay,
  dropHeight,
  reducedMotion,
  onInteract,
}: CharacterProps) {
  const { scene, box } = useClayModel(config.url);
  const motionRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(false);
  const pinTimer = useRef<number | undefined>(undefined);
  useCursor(hovered);

  const height = config.height * unit;
  const phase = useMemo(() => config.id.length * 1.7, [config.id]);

  const anim = useRef({
    now: 0,
    introAt: -1,
    landed: false,
    landedAt: -1,
    landAmp: 0,
    jumpAt: -1,
    hover: 0,
    yaw: 0,
    pitch: 0,
    spin: 0,
    spinVel: 0,
    dragging: false,
  });

  useEffect(() => () => window.clearTimeout(pinTimer.current), []);

  const hop = () => {
    const a = anim.current;
    if (a.jumpAt < 0 && a.landed) {
      a.jumpAt = a.now;
      a.landedAt = -1;
    }
    setPinned(true);
    window.clearTimeout(pinTimer.current);
    pinTimer.current = window.setTimeout(() => setPinned(false), 2600);
    onInteract();
  };

  const handlePointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    const a = anim.current;
    let lastX = e.nativeEvent.clientX;
    let lastT = performance.now();
    let travelled = 0;
    a.dragging = true;
    a.spinVel = 0;

    const onMove = (ev: PointerEvent) => {
      const dx = ev.clientX - lastX;
      const now = performance.now();
      const step = dx * 0.012;
      travelled += Math.abs(dx);
      a.spin += step;
      a.spinVel = THREE.MathUtils.lerp(a.spinVel, step / Math.max((now - lastT) / 1000, 1 / 120), 0.5);
      lastX = ev.clientX;
      lastT = now;
    };
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      a.dragging = false;
      // A flick that stopped before release shouldn't keep spinning.
      a.spinVel = performance.now() - lastT > 80 ? 0 : clamp(a.spinVel, -24, 24);
      if (travelled < 6) hop();
      else onInteract();
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
  };

  useFrame((state, delta) => {
    const motion = motionRef.current;
    const body = bodyRef.current;
    if (!motion || !body) return;
    const a = anim.current;
    const t = state.clock.elapsedTime;
    const dt = Math.min(delta, 1 / 30);
    a.now = t;

    let y = 0;
    let sy = 1;
    let sxz = 1;
    let jumpTwirl = 0;

    // Drop in from above the viewport, then land with a squash.
    if (a.introAt < 0) a.introAt = reducedMotion ? t - DROP : t + introDelay;
    const ti = t - a.introAt;
    motion.visible = ti >= 0;
    if (ti < DROP) {
      const p = Math.max(ti, 0) / DROP;
      y = dropHeight * (1 - p * p);
      sy = 1 + 0.15 * p;
      sxz = 1 - 0.06 * p;
    } else if (!a.landed) {
      a.landed = true;
      if (!reducedMotion) {
        a.landedAt = t;
        a.landAmp = 0.3;
      }
    }

    // Hop: crouch → stretch into the air with a twirl → squash on landing.
    if (a.jumpAt >= 0) {
      const tj = t - a.jumpAt;
      if (tj < CROUCH) {
        const k = Math.sin((tj / CROUCH) * (Math.PI / 2));
        sy *= 1 - 0.16 * k;
        sxz *= 1 + 0.08 * k;
      } else if (tj < CROUCH + AIR) {
        const q = (tj - CROUCH) / AIR;
        y += 4 * q * (1 - q) * height * 0.38;
        const stretch = 0.13 * Math.abs(Math.cos(q * Math.PI));
        sy *= 1 + stretch;
        sxz *= 1 - stretch * 0.45;
        jumpTwirl = easeInOutCubic(q) * TAU;
      } else {
        a.jumpAt = -1;
        a.landedAt = t;
        a.landAmp = 0.24;
      }
    }

    if (a.landedAt >= 0) {
      const tl = t - a.landedAt;
      const s = a.landAmp * Math.exp(-7 * tl) * Math.cos(17 * tl);
      sy *= 1 - s;
      sxz *= 1 + s * 0.55;
      if (tl > 1.5) a.landedAt = -1;
    }

    if (!reducedMotion) {
      const breath = Math.sin(t * 2.1 + phase) * 0.016;
      sy *= 1 + breath;
      sxz *= 1 - breath * 0.5;
    }

    a.hover = damp(a.hover, hovered || pinned ? 1 : 0, 10, dt);
    const grow = height * (1 + 0.04 * a.hover);

    // Turn to look at whatever the gaze target is (the cursor, or a slow wander).
    const g = gaze.current;
    const dx = g.x - position[0];
    const dz = g.z - position[2];
    const dy = g.y - (position[1] + height * 0.7);
    a.yaw = damp(a.yaw, clamp(Math.atan2(dx, dz) * 1.2, -MAX_YAW, MAX_YAW), 4, dt);
    a.pitch = damp(a.pitch, clamp(-Math.atan2(dy, Math.hypot(dx, dz)) * 0.3, -0.1, 0.1), 4, dt);

    // Drag-to-spin with inertia, settling back to face front.
    if (!a.dragging) {
      a.spin += a.spinVel * dt;
      a.spinVel *= Math.exp(-2.2 * dt);
      if (Math.abs(a.spinVel) < 0.8) {
        a.spinVel *= Math.exp(-6 * dt);
        a.spin = damp(a.spin, Math.round(a.spin / TAU) * TAU, 3.5, dt);
      }
    }

    const sway = reducedMotion ? 0 : Math.sin(t * 0.9 + phase) * 0.025;
    body.rotation.set(a.pitch, a.yaw + a.spin + jumpTwirl, sway, "YXZ");
    body.scale.set(grow * sxz, grow * sy, grow * sxz);
    motion.position.y = y;
  });

  const selected = hovered || pinned;

  return (
    <group position={position}>
      <group ref={motionRef} visible={false}>
        <group ref={bodyRef}>
          <group scale={1 / box.height}>
            <primitive object={scene} position={box.offset} />
          </group>
        </group>

        <mesh
          visible={false}
          position={[0, height / 2, 0]}
          onPointerOver={(e) => {
            e.stopPropagation();
            if (e.nativeEvent.pointerType !== "touch") setHovered(true);
          }}
          onPointerOut={() => setHovered(false)}
          onPointerDown={handlePointerDown}
        >
          <boxGeometry args={[box.width * height * 0.85, height * 0.98, box.depth * height * 0.8]} />
        </mesh>

        {selected && (
          <>
            <SelectionFrame width={box.width * height * 1.15} height={height * 1.06} />
            <Html position={[0, height * 1.1, 0]} zIndexRange={[30, 20]} style={{ pointerEvents: "none" }}>
              <div className="-translate-x-1/2 -translate-y-full pb-3">
                <div className="animate-fadeInUp relative whitespace-nowrap rounded-2xl border-2 border-[#18181B] bg-white px-3.5 py-2 shadow-[3px_3px_0_#18181B]">
                  <p
                    className="text-sm font-bold leading-tight text-[#18181B]"
                    style={{ fontFamily: "'Pixelify Sans', monospace" }}
                  >
                    {config.name}
                  </p>
                  <p className="text-[11px] font-medium text-[#52525B]">{config.line}</p>
                  <span className="absolute -bottom-[7px] left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b-2 border-r-2 border-[#18181B] bg-white" />
                </div>
              </div>
            </Html>
          </>
        )}
      </group>
    </group>
  );
}

/**
 * Loads a generated clay model and measures it so callers can stand it on the
 * ground at any height: render `scene` at `box.offset` inside a group scaled
 * by `1 / box.height`, and its feet land on y = 0 with a height of 1.
 * `width`/`depth` are the footprint at that height.
 */
export function useClayModel(url: string) {
  const { scene } = useGLTF(url);

  const box = useMemo(() => {
    const b = new THREE.Box3().setFromObject(scene);
    const size = b.getSize(new THREE.Vector3());
    const center = b.getCenter(new THREE.Vector3());
    return {
      height: size.y,
      width: size.x / size.y,
      depth: size.z / size.y,
      offset: [-center.x, -b.min.y, -center.z] as Vec3,
    };
  }, [scene]);

  // The generated models ship with metalness 1; clay should be fully dielectric.
  useLayoutEffect(() => {
    scene.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.isMesh) return;
      // Callers use cheap invisible hit boxes rather than raycasting ~50k triangles.
      mesh.raycast = () => {};
      const material = mesh.material as THREE.MeshStandardMaterial;
      material.metalness = 0;
      material.envMapIntensity = 0.9;
    });
  }, [scene]);

  return { scene, box };
}

/** Design-tool style bounding box, a nod to the frames in the original illustration. */
function SelectionFrame({ width, height }: { width: number; height: number }) {
  const hw = width / 2;
  const handle = Math.max(width, height) * 0.035;
  const points = useMemo<Vec3[]>(
    () => [
      [-hw, 0, 0],
      [hw, 0, 0],
      [hw, height, 0],
      [-hw, height, 0],
      [-hw, 0, 0],
    ],
    [hw, height]
  );
  const corners: [number, number][] = [
    [-hw, 0],
    [hw, 0],
    [hw, height],
    [-hw, height],
  ];

  return (
    <group>
      <Line points={points} color="#18181B" lineWidth={1.5} depthTest={false} renderOrder={20} />
      {corners.map(([x, y]) => (
        <group key={`${x}:${y}`} position={[x, y, 0]}>
          <mesh renderOrder={21}>
            <planeGeometry args={[handle, handle]} />
            <meshBasicMaterial color="#18181B" depthTest={false} toneMapped={false} />
          </mesh>
          <mesh renderOrder={22}>
            <planeGeometry args={[handle * 0.55, handle * 0.55]} />
            <meshBasicMaterial color="#FFFFFF" depthTest={false} toneMapped={false} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
