"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import NotificationDropdown from "@/app/components/dashboard/NotificationDropdown";
import MobileDrawer from "@/app/components/dashboard/MobileDrawer";

const navLinks = [
  { label: "Browse", href: "/browse" },
  { label: "AI Assistant", href: "/ai-assistant" },
  { label: "How it Works", href: "/how-it-works" },
  { label: "For You", href: "/dashboard" },
  { label: "Impact", href: "/impact" },
  { label: "Help", href: "/help" },
];

export default function TopBar() {
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <header className="h-16 border-b border-[#EDE8C8] bg-[#FDFBF1] px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 sm:gap-4 flex-shrink-0 sticky top-0 z-30 select-none">
        {/* ─── Left: Mobile Hamburger & Mobile Logo ─────────────── */}
        <div className="flex items-center gap-2 sm:gap-3 lg:hidden">
          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            aria-label="Open mobile menu"
            className="w-10 h-10 rounded-2xl bg-white border border-[#EDE8C8] flex items-center justify-center text-[#18181B] shadow-2xs hover:bg-[#FAF7F0] transition-all cursor-pointer flex-shrink-0"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="6" x2="20" y2="6" />
              <line x1="4" y1="12" x2="20" y2="12" />
              <line x1="4" y1="18" x2="20" y2="18" />
            </svg>
          </button>

          <Link href="/dashboard" className="flex items-center group flex-shrink-0" id="topbar-mobile-logo">
            <div className="relative w-[145px] sm:w-[170px] h-[42px] sm:h-[46px]">
              <Image
                src="/named_logo.png"
                alt="Campus Circular"
                fill
                className="object-contain object-left transition-transform group-hover:scale-105"
                priority
              />
            </div>
          </Link>
        </div>

        {/* ─── Center / Left Nav Links (Desktop) ───────────────── */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-7">
          {navLinks.map((item) => {
            const isActive = pathname === item.href || (item.href === "/browse" && pathname.startsWith("/browse"));
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`text-xs lg:text-[13.5px] font-semibold transition-all relative py-1 ${
                  isActive ? "text-[#18181B] font-bold" : "text-[#52525B] hover:text-[#18181B]"
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#6F9535] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* ─── Right Section: Bell with dot, Log Out, Character Avatar + Chevron ─ */}
        <div className="flex items-center gap-2 sm:gap-3.5 ml-auto">
          {/* Notification Dropdown Bell */}
          <NotificationDropdown />

          {/* Log Out Pill */}
          <Link
            href="/login"
            id="topbar-logout-btn"
            className="hidden sm:inline-flex px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold text-[#18181B] bg-white border border-[#E5E7EB] rounded-2xl hover:bg-[#F9FAFB] transition-all shadow-xs items-center justify-center cursor-pointer"
          >
            Log out
          </Link>

          {/* Avatar with Dropdown Arrow */}
          <Link
            href="/profile"
            id="topbar-avatar-btn"
            className="flex items-center gap-1.5 cursor-pointer group select-none ml-0.5"
          >
            <div className="w-10 h-10 rounded-full bg-white border border-[#E5E7EB] relative overflow-hidden flex items-center justify-center shadow-xs group-hover:ring-2 group-hover:ring-[#16A34A] transition-all flex-shrink-0">
              <Image
                src="/mascots/mascot_character.png"
                alt="User avatar"
                fill
                className="object-contain object-center scale-110 p-0.5"
                priority
              />
            </div>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#52525B"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform group-hover:translate-y-0.5 hidden sm:block"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </Link>
        </div>
      </header>

      {/* ─── Mobile Slide-out Drawer ─────────────────────────── */}
      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </>
  );
}
