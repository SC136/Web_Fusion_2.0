"use client";

import { useState } from "react";
import AppNavbar from "./layout/AppNavbar";
import HeroStage, { HeroHint } from "./hero3d/HeroStage";

export default function HeroSection() {
  const [viewMode, setViewMode] = useState<"2d" | "3d">("2d");

  return (
    <HeroStage mode={viewMode}>
      {/* Unified Navbar with 2D / 3D switcher */}
      <AppNavbar variant="guest" mode={viewMode} onToggleMode={setViewMode} />

      {/* Hero Center Content - Over the background / 3D crew */}
      <div
        data-hero-copy
        className="relative z-10 flex flex-col items-center text-center pt-2 sm:pt-3 md:pt-4 px-4 max-w-3xl mx-auto flex-shrink-0"
      >
        {/* Tagline Badge */}
        <div
          id="hero-badge"
          className="inline-flex items-center gap-1.5 bg-[#9DC05B] text-[#1A1A1A] text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-md mb-1.5 sm:mb-2 shadow-xs select-none"
          style={{ fontFamily: "'Pixelify Sans', monospace" }}
        >
          <span>FROM OWNERSHIP TO ACCESS</span>
          <span className="text-[11px] font-normal opacity-70">✦</span>
        </div>

        {/* Headline */}
        <div className="relative mb-2 sm:mb-2.5 select-none">
          <h1
            id="hero-headline"
            className="text-2xl sm:text-4xl md:text-5xl lg:text-[3.4rem] font-bold text-[#1A1A1A] leading-[1.06] tracking-normal"
            style={{ fontFamily: "'Pixelify Sans', monospace" }}
          >
            Why buy what someone
            <br />
            nearby{" "}
            <span className="relative inline-block">
              already has?
              {/* Hand-drawn underline SVG */}
              <svg
                className="absolute -bottom-1 sm:-bottom-1.5 left-0 w-full"
                viewBox="0 0 280 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 9C45 4 90 3 140 7C195 11 235 5 278 8"
                  stroke="#3B82F6"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          {/* Hand-drawn burst lines top right */}
          <div className="absolute -top-1.5 -right-5 sm:-top-2 sm:-right-7 text-[#1A1A1A] select-none pointer-events-none hidden sm:block">
            <svg width="26" height="26" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="6" y1="26" x2="2" y2="30" />
              <line x1="14" y1="18" x2="22" y2="10" />
              <line x1="22" y1="22" x2="30" y2="20" />
            </svg>
          </div>
        </div>

        {/* Subtitle */}
        <p
          id="hero-subtitle"
          className="text-xs sm:text-[13px] md:text-sm text-[#4B5563] max-w-md leading-relaxed mb-3 sm:mb-4 font-medium select-none"
        >
          Discover, share, and borrow resources within your campus.
          <br className="hidden sm:inline" />
          Save money, build trust, and make the most of what we already have.
        </p>

        {/* CTA Buttons */}
        <div className="flex items-center justify-center gap-3 sm:gap-3.5 mb-1.5">
          <a
            href="/dashboard"
            id="cta-find-resource"
            className="group inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-[#18181B] text-white font-semibold text-xs sm:text-[13px] rounded-xl hover:bg-[#27272A] transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer select-none"
          >
            <span>Find a Resource</span>
            <svg
              className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </a>
          <a
            href="/dashboard"
            id="cta-lend"
            className="group inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-[#9DC05B] text-[#18181B] font-bold text-xs sm:text-[13px] rounded-xl hover:bg-[#8eb34e] transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer select-none"
          >
            <span>I Want to Lend</span>
            <svg
              className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </a>
        </div>

        {/* In 3D mode, display the interactive nudge */}
        {viewMode === "3d" && <HeroHint />}
      </div>
    </HeroStage>
  );
}
