"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Browse", href: "/browse" },
  { label: "How it Works", href: "/#how-it-works" },
  { label: "For You", href: "/dashboard" },
  { label: "Impact", href: "/dashboard#impact" },
  { label: "Help", href: "/dashboard#help" },
];

export default function TopBar() {
  const pathname = usePathname();

  return (
    <header className="h-16 border-b border-[#EDE8C8] bg-[#FDFBF1] px-6 lg:px-8 flex items-center justify-between gap-4 flex-shrink-0 sticky top-0 z-30 select-none">
      {/* ─── Center / Left Nav Links ────────────────────────── */}
      <nav className="hidden md:flex items-center gap-7">
        {navLinks.map((item) => {
          const isActive = pathname === item.href || (item.href === "/dashboard" && pathname === "/dashboard");
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
      <div className="flex items-center gap-3.5 ml-auto">
        {/* Notification Bell */}
        <button
          id="topbar-notifications"
          aria-label="Notifications"
          className="w-10 h-10 rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center relative shadow-xs hover:bg-[#F9FAFB] transition-all cursor-pointer flex-shrink-0"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#18181B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className="absolute top-1.5 right-1.5 w-3 h-3 bg-[#EA4335] rounded-full ring-2 ring-white" />
        </button>

        {/* Log Out Pill */}
        <Link
          href="/login"
          id="topbar-logout-btn"
          className="px-5 py-2 text-sm font-bold text-[#18181B] bg-white border border-[#E5E7EB] rounded-2xl hover:bg-[#F9FAFB] transition-all shadow-xs inline-flex items-center justify-center cursor-pointer"
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
  );
}
