"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AppIcon } from "@/app/components/dashboard/Icons";

const navItems = [
  { label: "Home", icon: "home", href: "/dashboard" },
  { label: "Discover", icon: "search", href: "/dashboard" },
  { label: "My Listings", icon: "list", href: "/dashboard" },
  { label: "Requests", icon: "inbox", href: "/dashboard" },
  { label: "Trust Profile", icon: "shield-check", href: "/profile" },
  { label: "Messages", icon: "message", href: "/dashboard" },
  { label: "Notifications", icon: "bell", href: "/dashboard" },
  { label: "Settings", icon: "settings", href: "/dashboard" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[200px] lg:w-[220px] p-4 flex flex-col justify-between hidden md:flex flex-shrink-0 select-none">
      {/* ─── Nav Links ───────────────────────────────────────── */}
      <nav className="space-y-1">
        {navItems.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard" && item.label === "Home"
              : pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              id={`sidebar-link-${item.label.toLowerCase().replace(/\s/g, "-")}`}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 text-left ${
                isActive
                  ? "bg-[#E2F0CB] text-[#2D5A1E] shadow-2xs font-bold"
                  : "text-[#52525B] hover:bg-white/70 hover:text-[#18181B]"
              }`}
            >
              <AppIcon
                name={item.icon}
                size={17}
                className={isActive ? "text-[#2D5A1E]" : "text-[#71717A]"}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* ─── Mascot Card ─────────────────────────────────────── */}
      <div className="bg-[#EFE9DF]/80 rounded-2xl p-3.5 flex flex-col items-center text-center mt-6 border border-[#E8E0D2]">
        <p className="text-[11px] font-bold text-[#3F3F46] leading-tight mb-2">
          Sharing builds<br />better campuses.
        </p>
        <div className="relative w-20 h-24 my-1">
          <Image
            src="/mascots/blue_dress_hat.png"
            alt="Campus mascot"
            fill
            className="object-contain object-bottom"
          />
        </div>
        <div className="w-12 h-2 bg-[#8DBF43]/40 rounded-full mx-auto -mt-1 blur-[1px]" />
      </div>
    </aside>
  );
}
