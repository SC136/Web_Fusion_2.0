"use client";

import Link from "next/link";
import { currentUser } from "@/app/data/mockData";

export default function TopBar() {
  return (
    <header className="h-14 border-b border-[#EDE9DA] bg-[#FEFEFE] px-5 flex items-center justify-end gap-4 flex-shrink-0 sticky top-0 z-30 select-none">
      <button
        id="topbar-notifications"
        aria-label="Notifications"
        className="w-9 h-9 rounded-xl bg-[#F9FAFB] flex items-center justify-center hover:bg-[#F3F4F6] transition-colors relative cursor-pointer"
      >
        <svg width="18" height="18" fill="none" stroke="#6B7280" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
        <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#EF4444] rounded-full border-2 border-white" />
      </button>

      <button
        id="topbar-messages"
        aria-label="Messages"
        className="w-9 h-9 rounded-xl bg-[#F9FAFB] flex items-center justify-center hover:bg-[#F3F4F6] transition-colors cursor-pointer"
      >
        <svg width="18" height="18" fill="none" stroke="#6B7280" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </button>

      <Link
        href="/profile"
        className={`w-9 h-9 rounded-full ${currentUser.avatarBg} flex items-center justify-center font-bold text-xs cursor-pointer hover:ring-2 hover:ring-[#16A34A] transition-all shadow-2xs`}
      >
        {currentUser.initials}
      </Link>
    </header>
  );
}
