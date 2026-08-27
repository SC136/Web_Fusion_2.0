"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { currentUser } from "@/app/data/mockData";
import { AppIcon } from "@/app/components/dashboard/Icons";

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
  { label: "Escrow Wallet & P2P Banking", icon: "wallet", href: "/wallet" },
  { label: "Wanted Requests", icon: "inbox", href: "/requests" },
  { label: "Meetup Messages", icon: "message", href: "/messages" },
  { label: "Trust Profile", icon: "shield-check", href: "/profile" },
  { label: "Campus Impact", icon: "leaf", href: "/impact" },
  { label: "How It Works", icon: "info", href: "/how-it-works" },
  { label: "Campus Help & Safety", icon: "help", href: "/help" },
  { label: "Admin Panel", icon: "shield", href: "/admin" },
];

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
                  <AppIcon name={item.icon} size={18} />
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
