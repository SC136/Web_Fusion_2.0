"use client";

import { useMemo, useRef, useState, type ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Line, RoundedBox, useCursor } from "@react-three/drei";
import * as THREE from "three";
import { useClayModel } from "./Character";
import { TAU, clamp01, easeOutBack, easeOutCubic, type Vec3 } from "./stage";

// Props are authored in "Moti units": 1 = the tallest character's height.

function Clay({ color, roughness = 0.55 }: { color: string; roughness?: number }) {
  return <meshStandardMaterial color={color} roughness={roughness} metalness={0} />;
}

// ─── Wrapper: pop in, float, boing on click ────────────────────

interface SquishyProps {
  position: Vec3;
  scale: number;
  delay: number;
  reducedMotion: boolean;
  float?: boolean;
  rotation?: Vec3;
  children: ReactNode;
}

export function Squishy({ position, scale, delay, reducedMotion, float = false, rotation, children }: SquishyProps) {
  const ref = useRef<THREE.Group>(null);
  const st = useRef({ now: 0, start: -1, boingAt: -10, spinAt: -10 });
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  useFrame((state) => {
    const g = ref.current;
    if (!g) return;
    const s = st.current;
    const t = state.clock.elapsedTime;
    s.now = t;
    if (s.start < 0) s.start = t + delay;
    const p = reducedMotion ? 1 : clamp01((t - s.start) / 0.55);
    const pop = Math.max(easeOutBack(p), 1e-4);
    const tb = t - s.boingAt;
    const b = tb < 1.2 ? 0.22 * Math.exp(-6 * tb) * Math.sin(20 * tb) : 0;
    g.visible = p > 0;
    g.scale.set(scale * pop * (1 + b), scale * pop * (1 - b), scale * pop * (1 + b));
    const ts = t - s.spinAt;
    g.rotation.y = ts < 0.9 ? easeOutCubic(ts / 0.9) * TAU : 0;
  });

  const body = (
    <group
      ref={ref}
      visible={false}
      onClick={(e) => {
        e.stopPropagation();
        st.current.boingAt = st.current.now;
        if (float) st.current.spinAt = st.current.now;
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      {children}
    </group>
  );

  return (
    <group position={position} rotation={rotation}>
      {float && !reducedMotion ? (
        <Float speed={1.6} rotationIntensity={0.5} floatIntensity={0.6} floatingRange={[-0.06, 0.06]}>
          {body}
        </Float>
      ) : (
        body
      )}
    </group>
  );
}

// ─── Floating UI tokens from the original illustration ─────────

export function SliderCube({ animate }: { animate: boolean }) {
  const k1 = useRef<THREE.Mesh>(null);
  const k2 = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!animate) return;
    const t = state.clock.elapsedTime;
    if (k1.current) k1.current.position.y = Math.sin(t * 1.3) * 0.032;
    if (k2.current) k2.current.position.y = Math.sin(t * 1.1 + 2) * 0.032;
  });
  return (
    <group>
      <RoundedBox args={[0.17, 0.17, 0.17]} radius={0.03} smoothness={4}>
        <Clay color="#2563EB" />
      </RoundedBox>
      {[-0.035, 0.035].map((x, i) => (
        <group key={x} position={[x, 0, 0.086]}>
          <RoundedBox args={[0.016, 0.11, 0.01]} radius={0.004} smoothness={2}>
            <Clay color="#1E3A8A" />
          </RoundedBox>
          <mesh ref={i === 0 ? k1 : k2} position={[0, i === 0 ? 0.02 : -0.02, 0.008]}>
            <sphereGeometry args={[0.017, 20, 20]} />
            <Clay color="#EF4444" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

const KNOB_OFF = new THREE.Color("#F97316");
const KNOB_ON = new THREE.Color("#2563EB");

export function ToggleSwitch() {
  const [on, setOn] = useState(false);
  const knob = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  useFrame((_, dt) => {
    if (knob.current) knob.current.position.x = THREE.MathUtils.damp(knob.current.position.x, on ? 0.085 : -0.085, 12, dt);
    if (mat.current) mat.current.color.lerp(on ? KNOB_ON : KNOB_OFF, 1 - Math.exp(-10 * dt));
  });
  return (
    <group onClick={() => setOn((v) => !v)}>
      <RoundedBox args={[0.3, 0.1, 0.07]} radius={0.03} smoothness={4}>
        <Clay color="#FFFFFF" roughness={0.45} />
      </RoundedBox>
      <mesh ref={knob} position={[-0.085, 0, 0.038]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.02, 28]} />
        <meshStandardMaterial ref={mat} color={KNOB_OFF} roughness={0.5} metalness={0} />
      </mesh>
    </group>
  );
}

export function Scribble() {
  const points = useMemo<Vec3[]>(
    () => [
      [-0.07, -0.05, 0],
      [-0.045, 0.045, 0],
      [-0.015, -0.035, 0],
      [0.012, 0.055, 0],
      [0.04, -0.025, 0],
      [0.07, 0.07, 0],
    ],
    []
  );
  return <Line points={points} color="#18181B" lineWidth={3.5} />;
}

// ─── Generated models used as props ───────────────────────────

/** A static clay model standing on y = 0, `height` tall, with a cheap hit box. */
export function ModelProp({ url, height }: { url: string; height: number }) {
  const { scene, box } = useClayModel(url);
  return (
    <group scale={height}>
      <group scale={1 / box.height}>
        <primitive object={scene} position={box.offset} />
      </group>
      <mesh visible={false} position={[0, 0.5, 0]}>
        <boxGeometry args={[box.width, 1, box.depth]} />
      </mesh>
    </group>
  );
}

// ─── Upper floaters (borrowable gear) ──────────────────────────

export function Mic() {
  return (
    <group rotation={[0, 0, -0.5]}>
      <mesh position={[0, -0.03, 0]}>
        <cylinderGeometry args={[0.022, 0.016, 0.12, 24]} />
        <Clay color="#18181B" />
      </mesh>
      <mesh position={[0, 0.03, 0]}>
        <cylinderGeometry args={[0.024, 0.024, 0.012, 24]} />
        <Clay color="#FACC15" />
      </mesh>
      <mesh position={[0, 0.07, 0]}>
        <sphereGeometry args={[0.042, 28, 28]} />
        <Clay color="#52525B" roughness={0.85} />
      </mesh>
    </group>
  );
}

export function Headphones() {
  return (
    <group rotation={[0.2, -0.3, 0.15]}>
      <mesh>
        <torusGeometry args={[0.07, 0.011, 12, 40, Math.PI]} />
        <Clay color="#EC4899" />
      </mesh>
      {[-1, 1].map((side) => (
        <group key={side} position={[side * 0.07, -0.01, 0]}>
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.034, 0.034, 0.03, 28]} />
            <Clay color="#F472B6" />
          </mesh>
          <mesh position={[-side * 0.018, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.027, 0.027, 0.012, 28]} />
            <Clay color="#18181B" roughness={0.9} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
