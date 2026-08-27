"use client";

import { useState } from "react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="w-full px-6 md:px-12 py-3 flex items-center justify-between relative z-50 flex-shrink-0 bg-transparent">
      {/* Logo */}
      <a href="/" className="flex items-center gap-2.5 group" id="navbar-logo">
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#3B82F6] via-[#10B981] to-[#84CC16] p-[2px] flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-105">
          <div className="w-full h-full bg-[#F3F3F5] rounded-full flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
            </svg>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-black tracking-tight text-[#18181B] leading-none">
            CAMPUS
          </span>
          <span className="text-xs font-black tracking-tight text-[#18181B] leading-none">
            CIRCULAR
          </span>
        </div>
      </a>

      {/* Desktop Nav Links */}
      <div className="hidden md:flex items-center gap-7">
        {["Browse", "How it Works", "For You", "Impact", "Help"].map((item) => (
          <a
            key={item}
            href="#"
            id={`nav-${item.toLowerCase().replace(/\s/g, "-")}`}
            className="text-xs lg:text-sm font-semibold text-[#3F3F46] hover:text-[#18181B] transition-colors"
          >
            {item}
          </a>
        ))}
      </div>

      {/* Auth Buttons */}
      <div className="hidden md:flex items-center gap-2.5">
        <a
          href="/login"
          id="nav-login"
          className="px-4 py-2 text-xs lg:text-sm font-semibold text-[#18181B] bg-white/70 border border-[#D4D4D8] rounded-xl hover:bg-white transition-all duration-200 shadow-xs"
        >
          Log in
        </a>
        <a
          href="/login"
          id="nav-signup"
          className="px-4 py-2 text-xs lg:text-sm font-semibold text-white bg-[#18181B] rounded-xl hover:bg-[#27272A] transition-all duration-200 shadow-sm"
        >
          Sign up
        </a>
      </div>

      {/* Mobile Hamburger */}
      <button
        id="mobile-menu-btn"
        className="md:hidden flex flex-col gap-1.5 p-1.5"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        <span className={`w-5 h-0.5 bg-[#18181B] transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
        <span className={`w-5 h-0.5 bg-[#18181B] transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
        <span className={`w-5 h-0.5 bg-[#18181B] transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
      </button>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="absolute top-full left-0 w-full bg-[#F3F3F5] border-b border-[#E4E4E7] shadow-xl md:hidden z-50 p-5 flex flex-col gap-3 animate-slideDown">
          {["Browse", "How it Works", "For You", "Impact", "Help"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-sm font-semibold text-[#3F3F46] hover:text-[#18181B] py-1"
            >
              {item}
            </a>
          ))}
          <div className="flex gap-2.5 pt-3 border-t border-[#E4E4E7]">
            <a href="#" className="flex-1 text-center px-4 py-2 text-xs font-semibold text-[#18181B] border border-[#D4D4D8] bg-white rounded-xl">
              Log in
            </a>
            <a href="#" className="flex-1 text-center px-4 py-2 text-xs font-semibold text-white bg-[#18181B] rounded-xl">
              Sign up
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
