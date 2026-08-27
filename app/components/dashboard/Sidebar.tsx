"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { currentUser } from "@/app/data/mockData";
import { AppIcon } from "@/app/components/dashboard/Icons";

/* ─── Sidebar Navigation Items ────────────────────────────────── */
const navItems = [
  { label: "Dashboard", icon: "grid", href: "/dashboard" },
  { label: "AI Assistant", icon: "sparkles", href: "/ai-assistant" },
  { label: "Requests", icon: "inbox", href: "/requests" },
  { label: "My Loans", icon: "arrow-up-right", href: "/loans" },
  { label: "My Listings", icon: "list", href: "/listings" },
  { label: "Escrow Wallet", icon: "wallet", href: "/wallet" },
  { label: "Messages", icon: "message", href: "/messages" },
  { label: "Trust Profile", icon: "shield-check", href: "/profile" },
  { label: "Admin Panel", icon: "shield", href: "/admin" },
];

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
          } else if (item.label === "AI Assistant") {
            isActive = pathname.startsWith("/ai-assistant");
          } else if (item.label === "Requests") {
            isActive = pathname.startsWith("/requests");
          } else if (item.label === "My Loans") {
            isActive = pathname.startsWith("/loans");
          } else if (item.label === "My Listings") {
            isActive = pathname.startsWith("/listings");
          } else if (item.label === "Escrow Wallet") {
            isActive = pathname.startsWith("/wallet");
          } else if (item.label === "Messages") {
            isActive = pathname.startsWith("/messages");
          } else if (item.label === "Trust Profile") {
            isActive = pathname === "/profile";
          } else if (item.label === "Admin Panel") {
            isActive = pathname.startsWith("/admin");
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
                <AppIcon name={item.icon} size={18} />
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
