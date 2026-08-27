"use client";

import Link from "next/link";
import { sidebarNav, currentUser } from "@/app/data/mockData";

/* ─── Icon Components ─────────────────────────────────────────── */
function SidebarIcon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    grid: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
        <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
    search: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
        <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
      </svg>
    ),
    sparkles: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
        <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
        <path d="M18 14l.67 2 2 .67-2 .66L18 19.33l-.67-2-2-.66 2-.67L18 14z" />
      </svg>
    ),
    inbox: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
        <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
        <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
      </svg>
    ),
    "arrow-up-right": (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
        <path d="M7 17 17 7M7 7h10v10" />
      </svg>
    ),
    list: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
        <line x1="8" x2="21" y1="6" y2="6" /><line x1="8" x2="21" y1="12" y2="12" /><line x1="8" x2="21" y1="18" y2="18" />
        <line x1="3" x2="3.01" y1="6" y2="6" /><line x1="3" x2="3.01" y1="12" y2="12" /><line x1="3" x2="3.01" y1="18" y2="18" />
      </svg>
    ),
    message: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    star: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    leaf: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
        <path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.5 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </svg>
    ),
    shield: (
      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  };
  return <>{icons[name] || null}</>;
}

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[220px] bg-[#FDFBF1] border-r border-[#E8E4D8] flex flex-col z-40 hidden lg:flex">
      {/* Logo */}
      <div className="px-5 py-5 flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#3B82F6] via-[#10B981] to-[#84CC16] p-[2px] flex items-center justify-center">
          <div className="w-full h-full bg-[#FDFBF1] rounded-full flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
            </svg>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-black tracking-tight text-[#18181B] leading-none">CAMPUS</span>
          <span className="text-[10px] font-black tracking-tight text-[#18181B] leading-none">CIRCULAR</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
        {sidebarNav.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            id={`sidebar-${item.label.toLowerCase().replace(/\s/g, "-")}`}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-150 ${
              item.active
                ? "bg-[#EAF7EE] text-[#166534] font-semibold"
                : "text-[#6B7280] hover:bg-[#F5F2E8] hover:text-[#18181B]"
            }`}
          >
            <span className={item.active ? "text-[#16A34A]" : "text-[#9CA3AF]"}>
              <SidebarIcon name={item.icon} />
            </span>
            {item.label}
          </Link>
        ))}
      </nav>

      {/* User Profile */}
      <div className="px-4 py-4 border-t border-[#E8E4D8]">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-full ${currentUser.avatarBg} flex items-center justify-center font-bold text-xs`}>
            {currentUser.initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold text-[#18181B] truncate">
              Hey, {currentUser.name}!
            </p>
            <p className="text-[11px] text-[#9CA3AF]">View Profile</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
