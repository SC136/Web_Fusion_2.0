"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NotificationDropdown from "@/app/components/dashboard/NotificationDropdown";
import MobileDrawer from "@/app/components/dashboard/MobileDrawer";
import { useApp } from "@/app/context/AppContext";
import { AppIcon } from "@/app/components/dashboard/Icons";

interface AppNavbarProps {
  variant?: "auth" | "guest";
}

const navLinks = [
  { label: "Browse", href: "/browse" },
  { label: "How it Works", href: "/how-it-works" },
  { label: "Impact", href: "/impact" },
  { label: "Help", href: "/help" },
];

export default function AppNavbar({ variant = "auth" }: AppNavbarProps) {
  const pathname = usePathname();
  const { currentUser, allUsers, switchUser } = useApp();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const accountMenuRef = useRef<HTMLDivElement>(null);

  // Close account menu on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (accountMenuRef.current && !accountMenuRef.current.contains(e.target as Node)) {
        setIsAccountMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="h-16 px-3 sm:px-6 md:px-8 flex items-center justify-between border-b border-[#EDE8C8] bg-[#FDFBF1] sticky top-0 z-50 w-full select-none flex-shrink-0 flex-nowrap">
        {/* ─── Left Section: Hamburger (Mobile) + Logo ─────────── */}
        <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0 min-w-0">
          {variant === "auth" && (
            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Open mobile menu"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-white border border-[#EDE8C8] flex lg:hidden items-center justify-center text-[#18181B] shadow-2xs hover:bg-[#FAF7F0] transition-all cursor-pointer flex-shrink-0"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            </button>
          )}

          <Link href="/dashboard" className="flex items-center group flex-shrink-0" id="main-nav-logo">
            <div className="relative w-[130px] sm:w-[170px] md:w-[200px] h-[38px] sm:h-[48px]">
              <Image
                src="/named_logo.png"
                alt="Campus Circular"
                fill
                className="object-contain object-left transition-transform group-hover:scale-105"
                priority
              />
            </div>
          </Link>
        </div>

        {/* ─── Center Nav Links (Desktop) ───────────────────────── */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((item) => {
            let isActive = false;
            if (item.label === "Browse") {
              isActive = pathname.startsWith("/browse");
            } else if (item.label === "How it Works") {
              isActive = pathname.startsWith("/how-it-works");
            } else if (item.label === "Impact") {
              isActive = pathname.startsWith("/impact");
            } else if (item.label === "Help") {
              isActive = pathname.startsWith("/help");
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`text-xs lg:text-[13.5px] font-semibold transition-all relative py-1 ${
                  isActive ? "text-[#18181B] font-bold" : "text-[#52525B] hover:text-[#18181B]"
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#6F9535] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* ─── Right Section (Aligned with Reference Style) ─────── */}
        <div className="flex items-center gap-2 sm:gap-3.5">
          {variant === "auth" ? (
            <>
              {/* Notification Dropdown Bell */}
              <NotificationDropdown />

              {/* 1-Click Fast Account Switcher Pill */}
              <div className="relative" ref={accountMenuRef}>
                <button
                  type="button"
                  onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                  className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 bg-white hover:bg-[#FAF7F0] border border-[#EDE8C8] rounded-2xl shadow-2xs transition-all cursor-pointer select-none"
                  title="Switch Active Account"
                >
                  <div className={`w-7 h-7 rounded-full ${currentUser.avatarBg} flex items-center justify-center font-black text-[11px] flex-shrink-0 shadow-2xs`}>
                    {currentUser.initials}
                  </div>
                  <div className="text-left hidden sm:block">
                    <p className="text-xs font-bold text-[#18181B] leading-tight truncate max-w-[100px]">
                      {currentUser.name}
                    </p>
                    <p className="text-[9.5px] font-semibold text-[#16A34A] leading-none">
                      Trust {currentUser.trustScore}★
                    </p>
                  </div>
                  <AppIcon name="chevron-down" size={13} className="text-[#71717A]" />
                </button>

                {/* Switcher Dropdown Menu */}
                {isAccountMenuOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-3xl border border-[#EDE8C8] shadow-2xl p-2.5 z-50 animate-fadeInUp space-y-1">
                    <div className="px-3 py-2 border-b border-[#F0EAE0]">
                      <p className="text-[10.5px] font-extrabold uppercase text-[#71717A] tracking-wider">
                        Switch Active Campus Profile
                      </p>
                      <p className="text-[11px] text-[#52525B] mt-0.5">
                        Test multi-party borrows, messages & handovers in real-time
                      </p>
                    </div>

                    <div className="py-1 space-y-1">
                      {allUsers.map((user) => {
                        const isCurrent = user.id === currentUser.id;
                        return (
                          <button
                            key={user.id}
                            type="button"
                            onClick={() => {
                              switchUser(user.id);
                              setIsAccountMenuOpen(false);
                            }}
                            className={`w-full p-2.5 rounded-2xl flex items-center justify-between text-left transition-all cursor-pointer ${
                              isCurrent
                                ? "bg-[#F0FDF4] border border-[#BBF7D0]"
                                : "hover:bg-[#FAF7F0]"
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className={`w-8 h-8 rounded-full ${user.avatarBg} flex items-center justify-center font-bold text-xs flex-shrink-0`}>
                                {user.initials}
                              </div>
                              <div className="min-w-0">
                                <p className="text-xs font-bold text-[#18181B] truncate">{user.fullName}</p>
                                <p className="text-[10px] text-[#71717A] truncate">{user.department}</p>
                              </div>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <span className="text-[10px] font-bold text-[#16A34A] bg-white border border-[#EDE8C8] px-2 py-0.5 rounded-full">
                                {user.trustScore}★
                              </span>
                              {isCurrent && (
                                <p className="text-[9.5px] font-bold text-[#16A34A] mt-0.5">Active ✓</p>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <div className="pt-2 border-t border-[#F0EAE0] flex items-center justify-between px-2">
                      <Link
                        href="/profile"
                        onClick={() => setIsAccountMenuOpen(false)}
                        className="text-xs font-bold text-[#2563EB] hover:underline"
                      >
                        View Full Profile →
                      </Link>
                      <Link
                        href="/login"
                        onClick={() => setIsAccountMenuOpen(false)}
                        className="text-xs font-semibold text-[#71717A] hover:text-[#18181B]"
                      >
                        Sign out
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link
                href="/login"
                id="nav-guest-login"
                className="px-3 sm:px-4 py-2 text-xs lg:text-sm font-semibold text-[#18181B] bg-white/80 border border-[#E4E4E7] rounded-xl hover:bg-white transition-all shadow-2xs"
              >
                Log in
              </Link>
              <Link
                href="/login"
                id="nav-guest-signup"
                className="px-3 sm:px-4 py-2 text-xs lg:text-sm font-semibold text-white bg-[#18181B] rounded-xl hover:bg-[#27272A] transition-all shadow-xs"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </header>

      {/* ─── Mobile Slide-out Drawer ─────────────────────────── */}
      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </>
  );
}
