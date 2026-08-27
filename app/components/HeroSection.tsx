import Image from "next/image";
import AppNavbar from "./layout/AppNavbar";

export default function HeroSection() {
  return (
    <div className="relative w-full h-screen h-[100dvh] max-h-screen overflow-hidden flex flex-col justify-between">
      {/* Background Image */}
      <Image
        src="/bg.png"
        alt="Campus Circular Illustration"
        fill
        priority
        className="object-cover object-bottom -z-10 pointer-events-none select-none"
      />

      {/* Unified Navbar at top */}
      <AppNavbar variant="guest" />

      {/* Hero Center Content - Over the background */}
      <div className="flex-1 flex flex-col items-center justify-start text-center pt-4 sm:pt-6 md:pt-10 lg:pt-12 px-4 z-10 max-w-4xl mx-auto">
        {/* Tagline Badge */}
        <div
          id="hero-badge"
          className="inline-flex items-center gap-1.5 bg-[#9DC05B] text-[#1A1A1A] text-[11px] sm:text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-md mb-3 sm:mb-4 shadow-xs"
          style={{ fontFamily: "'Pixelify Sans', monospace" }}
        >
          <span>FROM OWNERSHIP TO ACCESS</span>
          <span className="text-xs font-normal opacity-70">✦</span>
        </div>

        {/* Headline */}
        <div className="relative mb-3 sm:mb-4">
          <h1
            id="hero-headline"
            className="text-3xl sm:text-5xl md:text-6xl lg:text-[4.3rem] font-bold text-[#1A1A1A] leading-[1.08] tracking-normal"
            style={{ fontFamily: "'Pixelify Sans', monospace" }}
          >
            Why buy what someone
            <br />
            nearby{" "}
            <span className="relative inline-block">
              already has?
              {/* Hand-drawn underline SVG */}
              <svg
                className="absolute -bottom-1.5 sm:-bottom-2.5 left-0 w-full"
                viewBox="0 0 280 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 9C45 4 90 3 140 7C195 11 235 5 278 8"
                  stroke="#3B82F6"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          {/* Hand-drawn burst lines top right */}
          <div className="absolute -top-2 -right-6 sm:-top-3 sm:-right-8 text-[#1A1A1A] select-none pointer-events-none hidden sm:block">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="6" y1="26" x2="2" y2="30" />
              <line x1="14" y1="18" x2="22" y2="10" />
              <line x1="22" y1="22" x2="30" y2="20" />
            </svg>
          </div>
        </div>

        {/* Subtitle */}
        <p
          id="hero-subtitle"
          className="text-xs sm:text-sm md:text-base text-[#4B5563] max-w-lg leading-relaxed mb-5 sm:mb-6 font-medium"
        >
          Discover, share, and borrow resources within your campus.
          <br className="hidden sm:inline" />
          Save money, build trust, and make the most of what we already have.
        </p>

        {/* CTA Buttons */}
        <div className="flex items-center justify-center gap-3 sm:gap-4">
          <a
            href="/dashboard"
            id="cta-find-resource"
            className="group inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-[#18181B] text-white font-semibold text-xs sm:text-sm rounded-xl hover:bg-[#27272A] transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <span>Find a Resource</span>
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
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
            className="group inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-[#9DC05B] text-[#18181B] font-bold text-xs sm:text-sm rounded-xl hover:bg-[#8eb34e] transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <span>I Want to Lend</span>
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
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
      </div>

      {/* Spacer at bottom so content is vertically centered */}
      <div className="h-[28vh] sm:h-[32vh] md:h-[36vh] w-full pointer-events-none flex-shrink-0" />
    </div>
  );
}
