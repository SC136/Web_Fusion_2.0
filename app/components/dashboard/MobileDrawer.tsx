"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { currentUser } from "@/app/data/mockData";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const drawerNavItems = [
  { label: "Dashboard", icon: "grid", href: "/dashboard" },
  { label: "Browse Catalog", icon: "search", href: "/browse" },
  { label: "AI Smart Assistant", icon: "sparkles", href: "/ai-assistant" },
  { label: "My Active Loans", icon: "arrow-up-right", href: "/loans" },
  { label: "My Listed Resources", icon: "list", href: "/listings" },
  { label: "Wanted Requests", icon: "inbox", href: "/requests" },
  { label: "Meetup Messages", icon: "message", href: "/messages" },
  { label: "Trust Profile", icon: "shield-check", href: "/profile" },
  { label: "Campus Impact", icon: "leaf", href: "/impact" },
  { label: "How It Works", icon: "info", href: "/how-it-works" },
  { label: "Campus Help & Safety", icon: "help", href: "/help" },
  { label: "Admin Panel", icon: "shield", href: "/admin" },
];

function DrawerIcon({ name }: { name: string }) {
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
          <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
        </svg>
      );
    case "arrow-up-right":
      return (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" viewBox="0 0 24 24">
          <path d="M7 17 17 7M7 7h10v10" />
        </svg>
      );
    case "inbox":
      return (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" viewBox="0 0 24 24">
          <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
          <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
        </svg>
      );
    case "list":
      return (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" viewBox="0 0 24 24">
          <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
          <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
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
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "leaf":
      return (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" viewBox="0 0 24 24">
          <path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.5 10-10 10Z" />
          <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
        </svg>
      );
    case "info":
    case "help":
      return (
        <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
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

export default function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const pathname = usePathname();

  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* ─── Backdrop ────────────────────────────────────────── */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fadeIn"
        onClick={onClose}
      />

      {/* ─── Drawer Panel ────────────────────────────────────── */}
      <div className="relative w-[85vw] max-w-xs bg-[#FDFBF1] h-full shadow-2xl flex flex-col z-10 animate-slideRight overflow-hidden border-r border-[#EDE8C8]">
        {/* Drawer Header */}
        <div className="p-4 border-b border-[#EDE8C8] flex items-center justify-between bg-[#FAF7F0]">
          <Link href="/dashboard" onClick={onClose} className="flex items-center">
            <div className="relative w-[150px] h-[40px]">
              <Image
                src="/named_logo.png"
                alt="Campus Circular"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="w-8 h-8 rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center text-[#18181B] font-bold text-sm shadow-2xs hover:bg-[#F3EFE3] transition-all cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* User Card */}
        <div className="p-3 border-b border-[#EDE8C8]">
          <Link
            href="/profile"
            onClick={onClose}
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
              <p className="text-[11px] text-[#78716C] font-medium">
                {currentUser.department}
              </p>
            </div>
          </Link>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {drawerNavItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={onClose}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? "bg-[#EAF7EE] text-[#14532D] shadow-2xs"
                    : "text-[#374151] hover:bg-[#FAF7F0] hover:text-[#18181B]"
                }`}
              >
                <span className={isActive ? "text-[#16A34A]" : "text-[#6B7280]"}>
                  <DrawerIcon name={item.icon} />
                </span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Log Out Footer Button */}
        <div className="p-3 border-t border-[#EDE8C8] bg-[#FAF7F0]">
          <Link
            href="/login"
            onClick={onClose}
            className="w-full py-2.5 bg-white hover:bg-[#F3EFE3] border border-[#E5E7EB] rounded-xl text-xs font-bold text-[#18181B] flex items-center justify-center gap-2 shadow-2xs transition-all"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span>Log out</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
