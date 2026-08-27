"use client";

import Link from "next/link";
import { currentUser } from "@/app/data/mockData";

const navLinks = [
  { label: "Browse", href: "/dashboard" },
  { label: "How it Works", href: "/dashboard" },
  { label: "For You", href: "/dashboard" },
  { label: "Impact", href: "/dashboard" },
  { label: "Help", href: "/dashboard" },
];

export default function TopBar() {
  return (
    <header className="h-14 border-b border-[#EDE8C8] bg-[#FEFEFE] px-6 flex items-center justify-between gap-4 flex-shrink-0 sticky top-0 z-30 select-none">
      {/* ─── Center / Left Nav Links ────────────────────────── */}
      <nav className="hidden md:flex items-center gap-7">
        {navLinks.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="text-xs lg:text-[13.5px] font-semibold text-[#52525B] hover:text-[#18181B] transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* ─── Right Section: Notifications, Messages, Logout, Avatar ─ */}
      <div className="flex items-center gap-3 ml-auto">
        {/* Notification Bell */}
        <button
          id="topbar-notifications"
          aria-label="Notifications"
          className="w-9 h-9 rounded-xl bg-white border border-[#EDE8C8] flex items-center justify-center hover:bg-[#F5F2E8] transition-colors relative cursor-pointer shadow-2xs"
        >
          <svg width="18" height="18" fill="none" stroke="#6B7280" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#EF4444] rounded-full ring-2 ring-white" />
        </button>

        {/* Messages */}
        <button
          id="topbar-messages"
          aria-label="Messages"
          className="w-9 h-9 rounded-xl bg-white border border-[#EDE8C8] flex items-center justify-center hover:bg-[#F5F2E8] transition-colors cursor-pointer shadow-2xs"
        >
          <svg width="18" height="18" fill="none" stroke="#6B7280" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        </button>

        {/* Log Out */}
        <Link
          href="/login"
          id="topbar-logout-btn"
          className="px-3.5 py-1.5 text-xs font-semibold text-[#18181B] bg-white border border-[#EDE8C8] rounded-xl hover:bg-[#F5F2E8] transition-all shadow-2xs"
        >
          Log out
        </Link>

        {/* Avatar with Dropdown Arrow */}
        <Link
          href="/profile"
          id="topbar-avatar-btn"
          className="flex items-center gap-1.5 cursor-pointer group ml-1"
        >
          <div className={`w-9 h-9 rounded-full ${currentUser.avatarBg} border-2 border-white flex items-center justify-center font-bold text-xs shadow-2xs group-hover:ring-2 group-hover:ring-[#16A34A] transition-all`}>
            {currentUser.initials}
          </div>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#71717A] hidden sm:block">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </Link>
      </div>
    </header>
  );
}
