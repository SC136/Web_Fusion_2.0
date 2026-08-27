"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileBottomNav() {
  const pathname = usePathname();

  // Hide on auth pages
  if (pathname === "/login" || pathname.startsWith("/admin/login")) {
    return null;
  }

  const navItems = [
    {
      label: "Home",
      href: "/dashboard",
      isActive: pathname === "/dashboard" || pathname === "/",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
    {
      label: "Browse",
      href: "/browse",
      isActive: pathname.startsWith("/browse"),
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      ),
    },
    {
      label: "AI Kit",
      href: "/ai-assistant",
      isActive: pathname.startsWith("/ai-assistant"),
      badge: "AI",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
        </svg>
      ),
    },
    {
      label: "Loans",
      href: "/loans",
      isActive: pathname.startsWith("/loans"),
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m17 2 4 4-4 4" />
          <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
          <path d="m7 22-4-4 4-4" />
          <path d="M21 13v1a4 4 0 0 1-4 4H3" />
        </svg>
      ),
    },
    {
      label: "Chat",
      href: "/messages",
      isActive: pathname.startsWith("/messages"),
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#FDFBF1]/95 backdrop-blur-md border-t border-[#EDE8C8] z-40 flex items-center justify-around px-2 shadow-[0_-4px_16px_rgba(0,0,0,0.04)] select-none">
      {navItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className={`flex flex-col items-center justify-center flex-1 h-full py-1 transition-all relative ${
            item.isActive
              ? "text-[#15803D] font-black"
              : "text-[#71717A] font-semibold hover:text-[#18181B]"
          }`}
        >
          <div className="relative">
            <div className={`p-1 rounded-xl transition-all ${item.isActive ? "bg-[#DCFCE7] shadow-2xs" : ""}`}>
              {item.icon}
            </div>
            {item.badge && (
              <span className="absolute -top-1 -right-2 px-1 py-0.2 bg-[#84CC16] text-[#18181B] text-[8px] font-black rounded-full shadow-2xs">
                {item.badge}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight">
            {item.label}
          </span>
          {item.isActive && (
            <span className="absolute bottom-1 w-1 h-1 bg-[#16A34A] rounded-full" />
          )}
        </Link>
      ))}
    </div>
  );
}
