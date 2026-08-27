"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { currentUser } from "@/app/data/mockData";

/* ─── Sidebar Navigation Items ────────────────────────────────── */
const navItems = [
  { label: "Dashboard", icon: "grid", href: "/dashboard" },
  { label: "Browse", icon: "search", href: "/browse" },
  { label: "AI Assistant", icon: "sparkles", href: "/ai-assistant" },
  { label: "My Requests", icon: "inbox", href: "/loans" },
  { label: "My Loans", icon: "arrow-up-right", href: "/loans" },
  { label: "My Listings", icon: "list", href: "/listings" },
  { label: "Messages", icon: "message", href: "/messages" },
  { label: "Trust Profile", icon: "shield-check", href: "/profile" },
  { label: "Reviews", icon: "star", href: "/profile#reviews" },
  { label: "Impact", icon: "leaf", href: "/impact" },
  { label: "Admin Panel", icon: "shield", href: "/admin" },
];

/* ─── Precise Sidebar Icons ───────────────────────────────────── */
function SidebarIcon({ name }: { name: string }) {
  switch (name) {
    case "grid":
      return (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" viewBox="0 0 24 24">
          <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      );
    case "search":
      return (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
        </svg>
      );
    case "sparkles":
      return (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" viewBox="0 0 24 24">
          <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5L12 3z" />
          <path d="M18 14l.67 2 2 .67-2 .66L18 19.33l-.67-2-2-.66 2-.67L18 14z" />
        </svg>
      );
    case "inbox":
      return (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" viewBox="0 0 24 24">
          <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
          <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
        </svg>
      );
    case "arrow-up-right":
      return (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" viewBox="0 0 24 24">
          <path d="M7 17 17 7M7 7h10v10" />
        </svg>
      );
    case "list":
      return (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" viewBox="0 0 24 24">
          <line x1="8" x2="21" y1="6" y2="6" /><line x1="8" x2="21" y1="12" y2="12" /><line x1="8" x2="21" y1="18" y2="18" />
          <line x1="3" x2="3.01" y1="6" y2="6" /><line x1="3" x2="3.01" y1="12" y2="12" /><line x1="3" x2="3.01" y1="18" y2="18" />
        </svg>
      );
    case "message":
      return (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" viewBox="0 0 24 24">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      );
    case "shield-check":
    case "shield":
      return (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" viewBox="0 0 24 24">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "star":
      return (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" viewBox="0 0 24 24">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      );
    case "leaf":
      return (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" viewBox="0 0 24 24">
          <path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.5 10-10 10Z" />
          <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
        </svg>
      );
    default:
      return (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="8" />
        </svg>
      );
  }
}

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-[240px] bg-[#FDFBF1] border-r border-[#EDE8C8] flex flex-col z-40 hidden lg:flex select-none">
      {/* ─── 1. Navigation Links ────────────────────────────── */}
      <nav className="flex-1 px-3.5 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          // Precise single item active matching:
          let isActive = false;
          if (item.label === "Dashboard") {
            isActive = pathname === "/dashboard" || pathname === "/";
          } else if (item.label === "Browse") {
            isActive = pathname.startsWith("/browse");
          } else if (item.label === "AI Assistant") {
            isActive = pathname.startsWith("/ai-assistant");
          } else if (item.label === "Trust Profile") {
            isActive = pathname === "/profile";
          } else if (item.label === "Admin Panel") {
            isActive = pathname.startsWith("/admin");
          } else if (item.label === "My Loans" || item.label === "My Requests") {
            isActive = pathname.startsWith("/loans");
          } else if (item.label === "My Listings") {
            isActive = pathname.startsWith("/listings");
          } else if (item.label === "Messages") {
            isActive = pathname.startsWith("/messages");
          } else if (item.label === "Impact") {
            isActive = pathname.startsWith("/impact");
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              id={`sidebar-${item.label.toLowerCase().replace(/\s/g, "-")}`}
              className={`flex items-center gap-3 px-3.5 py-2 rounded-xl text-[13.5px] transition-all duration-150 ${
                isActive
                  ? "bg-[#EAF7EE] text-[#14532D] font-bold shadow-2xs"
                  : "text-[#374151] font-semibold hover:bg-[#F5F2E8] hover:text-[#18181B]"
              }`}
            >
              <span className={isActive ? "text-[#16A34A]" : "text-[#6B7280]"}>
                <SidebarIcon name={item.icon} />
              </span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* ─── 3. Floating User Profile Card ──────────────────── */}
      <div className="px-3.5 pt-2 pb-1 flex-shrink-0">
        <Link
          href="/profile"
          className="p-2.5 bg-[#FFF9EA] border border-[#F4E8CB] rounded-2xl flex items-center gap-2.5 shadow-2xs hover:shadow-xs transition-shadow block"
        >
          <div className="w-10 h-10 rounded-full overflow-hidden relative flex-shrink-0 bg-[#E0F2FE] border border-[#BAE6FD]">
            <Image
              src="/dashboard.png"
              alt={currentUser.name}
              fill
              className="object-cover object-top scale-175 translate-y-1"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[12.5px] font-bold text-[#18181B] truncate flex items-center gap-1">
              <span>Hey, {currentUser.name}!</span>
              <span className="text-xs">👋</span>
            </p>
            <p className="text-[11px] text-[#78716C] font-medium hover:underline">
              View Profile
            </p>
          </div>
        </Link>
      </div>

      {/* ─── 4. Bottom 3D Mascot Illustration ───────────────── */}
      <div className="relative w-full h-[215px] mt-auto overflow-hidden flex-shrink-0">
        <Image
          src="/sidebar.png"
          alt="Sidebar mascot"
          fill
          className="object-cover object-top select-none pointer-events-none"
          priority
        />
      </div>
    </aside>
  );
}
