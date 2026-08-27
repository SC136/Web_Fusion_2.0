"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AppIcon } from "@/app/components/dashboard/Icons";

interface AppNavbarProps {
  variant?: "auth" | "guest";
}

export default function AppNavbar({ variant = "auth" }: AppNavbarProps) {
  const pathname = usePathname();

  return (
    <header className="h-16 px-6 md:px-10 flex items-center justify-between border-b border-[#EDE8C8] bg-[#FDFBF1] sticky top-0 z-40 w-full select-none flex-shrink-0">
      {/* ─── Logo ────────────────────────────────────────────── */}
      <Link href="/" className="flex items-center group" id="main-nav-logo">
        <div className="relative w-[190px] h-[52px]">
          <Image
            src="/named_logo.png"
            alt="Campus Circular"
            fill
            className="object-contain object-left transition-transform group-hover:scale-105"
            priority
          />
        </div>
      </Link>

      {/* ─── Center Nav Links ─────────────────────────────────── */}
      <nav className="hidden md:flex items-center gap-7">
        {[
          { label: "Browse", href: "/browse" },
          { label: "How it Works", href: "/#how-it-works" },
          { label: "For You", href: "/dashboard" },
          { label: "Impact", href: "/dashboard" },
          { label: "Help", href: "/dashboard" },
        ].map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`text-xs lg:text-sm font-semibold transition-all relative py-1 ${
                isActive ? "text-[#18181B] font-bold" : "text-[#52525B] hover:text-[#18181B]"
              }`}
            >
              {item.label}
              {isActive && (
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#16A34A] rounded-full" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* ─── Right Section (Profile Page Style) ───────────────── */}
      <div className="flex items-center gap-3.5">
        {variant === "auth" ? (
          <>
            {/* Notification Bell */}
            <button
              id="nav-bell"
              className="w-9 h-9 rounded-full bg-white border border-[#EDE8C8] flex items-center justify-center text-[#52525B] hover:text-[#18181B] relative transition-colors shadow-2xs hover:bg-white cursor-pointer"
            >
              <AppIcon name="bell" size={17} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#EF4444] rounded-full ring-2 ring-[#FDFBF1]" />
            </button>

            {/* Log Out */}
            <Link
              href="/login"
              id="nav-logout-btn"
              className="px-3.5 py-1.5 text-xs font-semibold text-[#18181B] bg-white border border-[#EDE8C8] rounded-xl hover:bg-[#F5F2E8] transition-all shadow-2xs"
            >
              Log out
            </Link>

            {/* Avatar with Dropdown Arrow */}
            <Link
              href="/profile"
              id="nav-avatar-btn"
              className="flex items-center gap-1.5 cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white shadow-2xs relative bg-[#E0F2FE] group-hover:ring-2 group-hover:ring-[#84CC16]/50 transition-all">
                <Image
                  src="/dashboard.png"
                  alt="User avatar"
                  fill
                  className="object-cover object-top scale-175 translate-y-1"
                />
              </div>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#71717A] hidden sm:block">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </Link>
          </>
        ) : (
          <>
            <Link
              href="/login"
              id="nav-guest-login"
              className="px-4 py-2 text-xs lg:text-sm font-semibold text-[#18181B] bg-white/80 border border-[#E4E4E7] rounded-xl hover:bg-white transition-all shadow-2xs"
            >
              Log in
            </Link>
            <Link
              href="/login"
              id="nav-guest-signup"
              className="px-4 py-2 text-xs lg:text-sm font-semibold text-white bg-[#18181B] rounded-xl hover:bg-[#27272A] transition-all shadow-xs"
            >
              Sign up
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
