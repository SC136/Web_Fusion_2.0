"use client";

import { Suspense, useEffect, useMemo, useRef, type ReactNode, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, useGLTF, useProgress } from "@react-three/drei";
import * as THREE from "three";
import Character from "./Character";
import { Headphones, Mic, ModelProp, Scribble, SliderCube, Squishy, ToggleSwitch } from "./props";
import { CAMERA, CHARACTERS, MODEL_PROPS, computeStageLayout, type PropId, type StageLayout } from "./stage";

[...CHARACTERS, ...Object.values(MODEL_PROPS)].forEach((m) => useGLTF.preload(m.url));

const GAZE_Z = 7;

interface HeroCanvasProps {
  eventSource: RefObject<HTMLElement | null>;
  copyBottomPx: number | null;
  reducedMotion: boolean;
  onProgress: (progress: number) => void;
  onReady: () => void;
  onInteract: () => void;
}

export default function HeroCanvas({
  eventSource,
  copyBottomPx,
  reducedMotion,
  onProgress,
  onReady,
  onInteract,
}: HeroCanvasProps) {
  const { progress } = useProgress();
  useEffect(() => onProgress(progress), [progress, onProgress]);

  return (
    <Canvas
      eventSource={eventSource}
      eventPrefix="client"
      dpr={[1, 2]}
      camera={{ fov: CAMERA.fov, position: CAMERA.position, near: 0.1, far: 60 }}
      gl={{ alpha: true, antialias: true, toneMapping: THREE.NeutralToneMapping }}
    >
      <hemisphereLight args={["#FFFAF0", "#D9C9AD", 0.9]} />
      <directionalLight position={[4, 8, 6]} intensity={1.7} color="#FFF4E2" />
      <directionalLight position={[-6, 3, 2]} intensity={0.45} color="#DFE8FF" />
      <Environment resolution={128} frames={1}>
        <Lightformer form="rect" intensity={2} position={[0, 5, 5]} scale={[10, 5, 1]} target={[0, 0, 0]} />
        <Lightformer form="rect" intensity={1.2} color="#FFE3C2" position={[-6, 2, 2]} scale={[4, 6, 1]} target={[0, 0, 0]} />
        <Lightformer form="rect" intensity={1} color="#D8E6FF" position={[6, 2, 1]} scale={[4, 6, 1]} target={[0, 0, 0]} />
        <Lightformer form="circle" intensity={0.6} position={[0, -4, 3]} scale={4} target={[0, 0, 0]} />
      </Environment>
      <CameraRig reducedMotion={reducedMotion} />
      <Suspense fallback={null}>
        <Stage
          copyBottomPx={copyBottomPx}
          reducedMotion={reducedMotion}
          onReady={onReady}
          onInteract={onInteract}
        />
      </Suspense>
    </Canvas>
  );
}

function Stage({
  copyBottomPx,
  reducedMotion,
  onReady,
  onInteract,
}: Pick<HeroCanvasProps, "copyBottomPx" | "reducedMotion" | "onReady" | "onInteract">) {
  const width = useThree((s) => s.size.width);
  const height = useThree((s) => s.size.height);
  const layout = useMemo(() => computeStageLayout(width, height, copyBottomPx), [width, height, copyBottomPx]);
  const gaze = useGaze(reducedMotion);

  // Suspense only lets this mount once every model has loaded.
  useEffect(() => onReady(), [onReady]);

  return (
    <>
      {CHARACTERS.map((c, i) => {
        const position = layout.characters[c.id];
        if (!position) return null;
        return (
          <Character
            key={c.id}
            config={c}
            position={position}
            unit={layout.unit}
            gaze={gaze}
            introDelay={0.2 + i * 0.16}
            dropHeight={layout.dropHeight}
            reducedMotion={reducedMotion}
            onInteract={onInteract}
          />
        );
      })}
      <StageProps layout={layout} reducedMotion={reducedMotion} />
      <ContactShadows
        position={[0, layout.groundY + 0.005, 0]}
        scale={[layout.span * 1.4, 5]}
        far={layout.unit * 1.2}
        blur={2.6}
        opacity={0.5}
        resolution={1024}
        color="#4A3520"
      />
    </>
  );
}

const PROP_ORDER: { id: PropId; float: boolean; render: (animate: boolean) => ReactNode }[] = [
  { id: "plant", float: false, render: () => <ModelProp {...MODEL_PROPS.plant} /> },
  { id: "books", float: false, render: () => <ModelProp {...MODEL_PROPS.books} /> },
  { id: "toggle", float: true, render: () => <ToggleSwitch /> },
  { id: "sliderCube", float: true, render: (animate) => <SliderCube animate={animate} /> },
  { id: "scribble", float: true, render: () => <Scribble /> },
  { id: "imageCard", float: true, render: () => <ModelProp {...MODEL_PROPS.imageCard} /> },
  { id: "ladder", float: false, render: () => <ModelProp {...MODEL_PROPS.ladder} /> },
  { id: "mic", float: true, render: () => <Mic /> },
  { id: "headphones", float: true, render: () => <Headphones /> },
];

function StageProps({ layout, reducedMotion }: { layout: StageLayout; reducedMotion: boolean }) {
  return (
    <>
      {PROP_ORDER.map(({ id, float, render }, i) => {
        const position = layout.props[id];
        if (!position) return null;
        return (
          <Squishy
            key={id}
            position={position}
            scale={layout.unit * layout.propScale}
            delay={0.9 + i * 0.08}
            reducedMotion={reducedMotion}
            float={float}
          >
            {render(!reducedMotion)}
          </Squishy>
        );
      })}
    </>
  );
}

/** Subtle parallax: the camera drifts a little with the pointer. */
function CameraRig({ reducedMotion }: { reducedMotion: boolean }) {
  useFrame((state, delta) => {
    const { camera, pointer } = state;
    const dt = Math.min(delta, 1 / 30);
    const tx = CAMERA.position[0] + (reducedMotion ? 0 : pointer.x * 0.35);
    const ty = CAMERA.position[1] + (reducedMotion ? 0 : pointer.y * 0.18);
    camera.position.x = THREE.MathUtils.damp(camera.position.x, tx, 2.5, dt);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, ty, 2.5, dt);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/**
 * Where the crew looks: the pointer while it's moving, otherwise a slow
 * wander so they still feel alive on touch devices or an idle mouse.
 */
function useGaze(reducedMotion: boolean) {
  const gaze = useRef(new THREE.Vector3(0, 0, GAZE_Z));
  const scratch = useRef({
    raycaster: new THREE.Raycaster(),
    plane: new THREE.Plane(new THREE.Vector3(0, 0, 1), -GAZE_Z),
    ndc: new THREE.Vector2(),
    last: new THREE.Vector2(),
    movedAt: -Infinity,
  });

  useFrame((state) => {
    const tmp = scratch.current;
    const t = state.clock.elapsedTime;
    if (!tmp.last.equals(state.pointer)) {
      tmp.last.copy(state.pointer);
      tmp.movedAt = t;
    }
    if (t - tmp.movedAt < 3.5) tmp.ndc.copy(state.pointer);
    else if (reducedMotion) tmp.ndc.set(0, 0);
    else tmp.ndc.set(Math.sin(t * 0.45) * 0.75, Math.sin(t * 0.31 + 1.3) * 0.35 - 0.05);
    tmp.raycaster.setFromCamera(tmp.ndc, state.camera);
    tmp.raycaster.ray.intersectPlane(tmp.plane, gaze.current);
  });

  return gaze;
}
