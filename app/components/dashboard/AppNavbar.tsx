"use client";

import Image from "next/image";
import Link from "next/link";
import { AppIcon } from "@/app/components/dashboard/Icons";

export default function AppNavbar() {
  return (
    <header className="h-16 px-5 md:px-8 flex items-center justify-between border-b border-[#EFE8DC] bg-[#FBF7F0] sticky top-0 z-40 w-full select-none flex-shrink-0">
      {/* ─── Logo ────────────────────────────────────────────── */}
      <Link href="/" className="flex items-center gap-2.5 group" id="app-nav-logo">
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#3B82F6] via-[#10B981] to-[#84CC16] p-[2px] flex items-center justify-center shadow-2xs transition-transform group-hover:scale-105">
          <div className="w-full h-full bg-[#FBF7F0] rounded-full flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
            </svg>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-[11px] font-black tracking-tight text-[#18181B] leading-none">
            CAMPUS
          </span>
          <span className="text-[11px] font-black tracking-tight text-[#18181B] leading-none">
            CIRCULAR
          </span>
        </div>
      </Link>

      {/* ─── Center Nav Links ─────────────────────────────────── */}
      <nav className="hidden md:flex items-center gap-7">
        {[
          { label: "Browse", href: "/dashboard" },
          { label: "How it Works", href: "/dashboard" },
          { label: "For You", href: "/dashboard" },
          { label: "Impact", href: "/dashboard" },
          { label: "Help", href: "/dashboard" },
        ].map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="text-xs lg:text-sm font-semibold text-[#52525B] hover:text-[#18181B] transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* ─── Right User & Actions ─────────────────────────────── */}
      <div className="flex items-center gap-3">
        {/* Notification Bell */}
        <button
          id="app-nav-notifications"
          className="w-9 h-9 rounded-full bg-white/80 border border-[#E4E4E7] flex items-center justify-center text-[#52525B] hover:text-[#18181B] relative transition-colors shadow-2xs hover:bg-white cursor-pointer"
        >
          <AppIcon name="bell" size={17} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-[#EF4444] rounded-full ring-2 ring-[#FBF7F0]" />
        </button>

        {/* Log Out Button */}
        <Link
          href="/login"
          id="app-nav-logout"
          className="px-3.5 py-1.5 text-xs font-semibold text-[#18181B] bg-white/80 border border-[#E4E4E7] rounded-xl hover:bg-white transition-all shadow-2xs"
        >
          Log out
        </Link>

        {/* Avatar Dropdown */}
        <Link
          href="/profile"
          id="app-nav-profile-avatar"
          className="flex items-center gap-1.5 p-0.5 rounded-full hover:ring-2 hover:ring-[#84CC16]/40 transition-all cursor-pointer"
        >
          <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white shadow-2xs relative bg-amber-100">
            <Image
              src="/mascots/blue_dress_hat.png"
              alt="User avatar"
              fill
              className="object-cover"
            />
          </div>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#71717A] hidden sm:block">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </Link>
      </div>
    </header>
  );
}
