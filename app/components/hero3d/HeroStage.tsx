"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import {
  Component,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

// three.js only runs in the browser, and keeping it in its own chunk keeps the
// landing page's first paint light.
const HeroCanvas = dynamic(() => import("./HeroCanvas"), { ssr: false });

let webglSupport: boolean | null = null;
function detectWebGL() {
  if (webglSupport === null) {
    try {
      webglSupport = !!document.createElement("canvas").getContext("webgl2");
    } catch {
      webglSupport = false;
    }
  }
  return webglSupport;
}
const subscribeNever = () => () => {};

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

class SceneErrorBoundary extends Component<{ onError: () => void; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

const HintContext = createContext<"hidden" | "waiting" | "shown" | "dismissed">("hidden");

export interface HeroStageProps {
  children: ReactNode;
  mode?: "2d" | "3d";
}

/**
 * Full-height hero with the 2D illustration as primary/default and optional
 * interactive 3D crew. Falls back smoothly if WebGL is unavailable.
 * Mark the copy block with `data-hero-copy` so the crew is laid out below it.
 */
export default function HeroStage({ children, mode = "2d" }: HeroStageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const webgl = useSyncExternalStore(subscribeNever, detectWebGL, () => null);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false
  );
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [copyBottom, setCopyBottom] = useState<number | null>(null);
  const [interacted, setInteracted] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const copy = container?.querySelector<HTMLElement>("[data-hero-copy]");
    if (!container || !copy) return;
    const observer = new ResizeObserver(() =>
      setCopyBottom(copy.getBoundingClientRect().bottom - container.getBoundingClientRect().top)
    );
    observer.observe(copy);
    observer.observe(container);
    return () => observer.disconnect();
  }, [mode]);

  const handleReady = useCallback(() => setReady(true), []);
  const handleInteract = useCallback(() => setInteracted(true), []);
  const handleError = useCallback(() => setFailed(true), []);

  const is3D = mode === "3d" && webgl !== false && !failed;
  const hint = !is3D ? "hidden" : !ready ? "waiting" : interacted ? "dismissed" : "shown";

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen h-[100dvh] max-h-screen overflow-hidden flex flex-col bg-[#FCF7EE]"
    >
      {/* 2D Flat Illustration - Main/default view, and smooth backdrop while 3D is preparing */}
      {(!is3D || !ready) && (
        <Image
          src="/bg.png"
          alt="Campus Circular Illustration"
          fill
          priority
          className="object-cover object-bottom pointer-events-none select-none transition-opacity duration-700"
        />
      )}

      {/* 3D Scene - Only loaded/rendered when 3D is toggled on */}
      {mode === "3d" && webgl !== false && !failed && (
        <div
          className={`absolute inset-0 transition-opacity duration-700 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden="true"
        >
          <SceneErrorBoundary onError={handleError}>
            <HeroCanvas
              eventSource={containerRef}
              copyBottomPx={copyBottom}
              reducedMotion={reducedMotion}
              onProgress={setProgress}
              onReady={handleReady}
              onInteract={handleInteract}
            />
          </SceneErrorBoundary>
        </div>
      )}

      <HintContext.Provider value={hint}>{children}</HintContext.Provider>

      {/* 3D Loading Progress Pill */}
      {mode === "3d" && !ready && !failed && (
        <div className="pointer-events-none absolute inset-x-0 bottom-24 lg:bottom-10 z-20 flex justify-center">
          <div
            className="flex items-center gap-3 rounded-full border-2 border-[#18181B] bg-white px-4 py-2 shadow-[3px_3px_0_#18181B]"
            style={{ fontFamily: "'Pixelify Sans', monospace" }}
          >
            <span className="text-xs font-semibold text-[#18181B]">Waking up the crew…</span>
            <span className="h-2 w-20 overflow-hidden rounded-full bg-[#EDE8C8]">
              <span className="block h-full bg-[#9DC05B] transition-[width]" style={{ width: `${progress}%` }} />
            </span>
            <span className="w-8 text-right text-xs tabular-nums text-[#18181B]">{Math.round(progress)}%</span>
          </div>
        </div>
      )}
    </div>
  );
}

/** Small nudge under the CTAs telling people the crew is interactive. */
export function HeroHint() {
  const state = useContext(HintContext);
  if (state === "hidden") return null;
  return (
    <p
      className={`mt-2 text-[10.5px] sm:text-[11px] text-[#71717A] transition-opacity duration-700 select-none ${
        state === "shown" ? "opacity-100" : "opacity-0"
      }`}
      style={{ fontFamily: "'Pixelify Sans', monospace" }}
    >
      ✦ psst, the crew below is 3D. drag to spin, tap to hop ✦
    </p>
  );
}
