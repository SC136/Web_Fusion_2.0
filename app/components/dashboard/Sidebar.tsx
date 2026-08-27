"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { currentUser } from "@/app/data/mockData";
import { AppIcon } from "@/app/components/dashboard/Icons";

const navItems = [
  { label: "Dashboard", icon: "grid", href: "/dashboard" },
  { label: "Browse", icon: "search", href: "/dashboard" },
  { label: "AI Assistant", icon: "sparkles", href: "/dashboard" },
  { label: "My Requests", icon: "inbox", href: "/dashboard" },
  { label: "My Loans", icon: "arrow-up-right", href: "/dashboard" },
  { label: "My Listings", icon: "list", href: "/dashboard" },
  { label: "Messages", icon: "message", href: "/dashboard" },
  { label: "Trust Profile", icon: "shield-check", href: "/profile" },
  { label: "Reviews", icon: "star", href: "/profile" },
  { label: "Impact", icon: "leaf", href: "/dashboard" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[210px] lg:w-[230px] sticky top-16 h-[calc(100vh-64px)] max-h-[calc(100vh-64px)] flex flex-col justify-between hidden md:flex flex-shrink-0 select-none border-r border-[#EDE8C8] bg-[#FDF8EE] overflow-hidden">
      {/* ─── Nav Links (Non-scrollable) ───────────────────────── */}
      <div className="px-3 pt-3 pb-1 space-y-0.5 flex-shrink-0">
        <nav className="space-y-0.5">
          {navItems.map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard" && item.label === "Dashboard"
                : pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                id={`sidebar-link-${item.label.toLowerCase().replace(/\s/g, "-")}`}
                className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-xl text-[12.5px] font-semibold transition-all duration-150 text-left ${
                  isActive
                    ? "bg-[#EAF7EE] text-[#14532D] shadow-2xs font-bold"
                    : "text-[#374151] hover:bg-white/80 hover:text-[#18181B]"
                }`}
              >
                <AppIcon
                  name={item.icon}
                  size={16}
                  className={isActive ? "text-[#16A34A]" : "text-[#6B7280]"}
                />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* ─── Bottom Section: User Profile + Bottom Mascot Image ─ */}
      <div className="flex flex-col flex-1 justify-end min-h-0 overflow-hidden">
        {/* User Card */}
        <div className="px-3 pb-2 flex-shrink-0">
          <Link
            href="/profile"
            className="p-2 bg-[#FFF9EA] border border-[#F4E8CB] rounded-xl flex items-center gap-2 shadow-2xs hover:shadow-xs transition-shadow block"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full overflow-hidden relative flex-shrink-0 bg-[#E0F2FE] border border-[#BAE6FD]">
                <Image
                  src="/dashboard.png"
                  alt={currentUser.name}
                  fill
                  className="object-cover object-top scale-175 translate-y-1"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11.5px] font-bold text-[#18181B] truncate flex items-center gap-1">
                  <span>Hey, {currentUser.name}!</span>
                  <span className="text-xs">👋</span>
                </p>
                <p className="text-[10px] text-[#78716C] font-medium hover:underline">
                  View Profile
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* Big Bottom Mascot from assets/sidebar.png */}
        <div className="relative w-full flex-1 min-h-[160px] max-h-[220px] overflow-hidden mt-1">
          <Image
            src="/sidebar.png"
            alt="Campus Circular Mascot"
            fill
            className="object-contain object-bottom select-none pointer-events-none"
            priority
          />
        </div>
      </div>
    </aside>
  );
}
