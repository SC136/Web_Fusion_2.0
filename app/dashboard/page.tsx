"use client";

import Image from "next/image";
import Link from "next/link";
import {
  currentUser,
  overviewStats,
  activityStages,
  recommendedItems,
  popularCategories,
  upcomingReturns,
  recentMessages,
  popularSearches,
  sidebarNav,
} from "@/app/data/mockData";
import { AppIcon } from "@/app/components/dashboard/Icons";
import { useState } from "react";

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex min-h-screen bg-[#FEFEFE]">
      {/* ─── LEFT SIDEBAR (Desktop) ─────────────────────────── */}
      <Sidebar />

      {/* ─── MAIN AREA ──────────────────────────────────────── */}
      <div className="flex-1 lg:ml-[240px] flex flex-col min-h-screen">
        {/* Top Bar */}
        <TopBar />

        {/* Content */}
        <div className="flex-1 flex">
          {/* ─── CENTER CONTENT ─────────────────────────────── */}
          <main className="flex-1 p-5 lg:p-6 overflow-y-auto max-h-[calc(100vh-56px)]">
            {/* Hero / Welcome + AI Search Section with Mascot */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-5 items-center mb-6">
              {/* Left Column: Heading + Search Card */}
              <div className="flex flex-col gap-4">
                {/* Heading */}
                <div>
                  <h1
                    className="text-2xl md:text-3xl font-bold text-[#18181B] mb-1 flex items-center gap-2"
                    style={{ fontFamily: "'Pixelify Sans', monospace" }}
                  >
                    <span>Welcome back, {currentUser.name}!</span>
                    <span className="text-2xl not-italic">👋</span>
                  </h1>
                  <p className="text-sm text-[#6B7280]">Let&apos;s make sharing the new normal.</p>
                </div>

                {/* AI Search Card */}
                <div className="bg-[#F5F8E9] border border-[#D8E8B8] rounded-2xl p-4 shadow-2xs">
                  <p className="text-[13px] font-semibold text-[#2E5E1C] mb-2.5">
                    What do you need today?
                  </p>
                  <div className="flex gap-2">
                    <input
                      id="ai-search"
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="e.g. I need a camera and tripod for a reel shoot tomorrow"
                      className="flex-1 px-4 py-2.5 rounded-xl bg-white border border-[#E5E7EB] text-xs md:text-sm text-[#18181B] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#86EFAC] focus:border-transparent shadow-2xs"
                    />
                    <button
                      id="ai-search-btn"
                      className="px-4 md:px-5 py-2.5 bg-[#6F9535] hover:bg-[#61832C] text-white text-xs md:text-[13px] font-semibold rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap shadow-xs cursor-pointer active:scale-98"
                    >
                      <span>Search with AI</span>
                      <span className="text-sm">✨</span>
                    </button>
                  </div>
                  <div className="flex items-center gap-2 mt-3 flex-wrap">
                    <span className="text-[11px] text-[#6B7280] font-medium">Popular:</span>
                    {popularSearches.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setSearchQuery(tag)}
                        className="text-[11px] px-3 py-1 bg-white/90 border border-[#E0E7D5] rounded-xl text-[#374151] hover:bg-white hover:border-[#CBD5C0] hover:text-[#18181B] transition-colors cursor-pointer shadow-2xs"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: 3D Mascot Illustration */}
              <div className="hidden lg:flex items-center justify-center relative w-[280px] xl:w-[320px] h-[190px] xl:h-[220px]">
                <Image
                  src="/dashboard.png"
                  alt="Campus Circular 3D Characters"
                  fill
                  className="object-contain drop-shadow-sm select-none"
                  priority
                />
              </div>
            </div>

            {/* Overview Stats */}
            <div className="bg-white rounded-2xl border border-[#EDE8C8] p-4 md:p-5 mb-5">
              <h2 className="text-base font-bold text-[#18181B] mb-3">Overview</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
                {overviewStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border p-3.5 hover:shadow-sm transition-all"
                    style={{ backgroundColor: stat.cardBg, borderColor: stat.cardBorder }}
                  >
                    <div className="flex items-center gap-2.5 mb-2.5">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: stat.iconBg, color: stat.iconColor }}
                      >
                        <AppIcon name={stat.icon} size={18} />
                      </div>
                      <span className="text-xl font-bold text-[#18181B]">{stat.value}</span>
                    </div>
                    <p className="text-[12px] text-[#374151] font-medium leading-snug">{stat.label}</p>
                    <p className="text-[11px] text-[#6B7280] mt-1">{stat.change}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Tracker */}
            <div className="bg-[#FEFAEE] rounded-2xl border border-[#EDE8C8] p-4 md:p-5 mb-5">
              <h2 className="text-base font-bold text-[#18181B] mb-4">Your Activity</h2>
              <div className="flex items-center justify-between overflow-x-auto gap-2 px-2">
                {activityStages.map((stage, i) => {
                  const isCurrent = stage.active;
                  const isPast = i < 2;
                  return (
                    <div key={stage.label} className="flex items-center flex-1 last:flex-none">
                      <div className="flex flex-col items-center min-w-[76px]">
                        <div
                          className={`w-11 h-11 rounded-full flex items-center justify-center mb-1.5 transition-all shadow-2xs ${
                            isCurrent
                              ? "bg-[#F0FDF4] text-[#16A34A] border-2 border-[#16A34A]"
                              : isPast
                              ? "bg-white text-[#374151] border border-[#D1D5DB]"
                              : "bg-white text-[#9CA3AF] border border-[#FDE68A]"
                          }`}
                        >
                          <AppIcon name={stage.icon} size={18} />
                        </div>
                        <span
                          className={`text-[11px] ${
                            isCurrent
                              ? "text-[#18181B] font-bold"
                              : "text-[#6B7280] font-medium"
                          }`}
                        >
                          {stage.label}
                        </span>
                        <span
                          className={`text-base font-bold ${
                            isCurrent ? "text-[#18181B]" : "text-[#4B5563]"
                          }`}
                        >
                          {stage.count}
                        </span>
                      </div>
                      {i < activityStages.length - 1 && (
                        <div
                          className={`flex-1 h-[2px] mx-1 mt-[-26px] ${
                            i < 2 ? "bg-[#16A34A]" : "bg-[#FDE68A]"
                          }`}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Row: Recommended + Categories */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-5">
              {/* Recommended Items */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-base font-bold text-[#18181B] flex items-center gap-1.5">
                    <span>Recommended for You</span>
                    <AppIcon name="sparkles" size={16} className="text-amber-500" />
                  </h2>
                  <button className="text-xs font-semibold text-[#16A34A] hover:underline">View all</button>
                </div>
                <p className="text-[11px] text-[#9CA3AF] mb-3 -mt-2">
                  Based on your need: &quot;Camera and tripod for reel&quot;
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {recommendedItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl border border-[#F3F4F6] overflow-hidden hover:shadow-md transition-shadow group cursor-pointer"
                    >
                      <div className="aspect-square bg-[#F9FAFB] relative overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-3">
                        <div className="flex items-center gap-2 text-[10px] text-[#6B7280] mb-1.5">
                          <span className="flex items-center gap-0.5 text-amber-500 font-semibold">
                            <AppIcon name="star" size={12} className="fill-amber-400 text-amber-400" />
                            <span className="text-[#374151]">{item.rating}</span>
                          </span>
                          <span className="text-[#D1D5DB]">•</span>
                          <span className="flex items-center gap-0.5 text-[#6B7280]">
                            <AppIcon name="map-pin" size={11} className="text-[#9CA3AF]" />
                            {item.distance}
                          </span>
                        </div>
                        <p className="text-[13px] font-semibold text-[#18181B] mb-0.5 truncate">{item.name}</p>
                        <p className="text-[10px] text-[#9CA3AF] mb-2">By {item.owner}</p>
                        <p className="text-[13px] font-bold text-[#18181B]">{item.pricePerDay}</p>
                        <p className="text-[10px] text-[#16A34A] font-medium">{item.deposit}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Popular Categories */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-base font-bold text-[#18181B]">Popular Categories</h2>
                  <button className="text-xs font-semibold text-[#16A34A] hover:underline">View all</button>
                </div>
                <div className="space-y-2">
                  {popularCategories.map((cat) => (
                    <div
                      key={cat.name}
                      className="flex items-center gap-3 bg-white rounded-xl border border-[#F3F4F6] px-4 py-3 hover:shadow-sm transition-shadow cursor-pointer"
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${cat.color}`}>
                        <AppIcon name={cat.icon} size={16} />
                      </div>
                      <div className="flex-1">
                        <p className="text-[13px] font-medium text-[#18181B]">{cat.name}</p>
                      </div>
                      <span className="text-[11px] text-[#9CA3AF] font-medium">{cat.count} items</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>

          {/* ─── RIGHT SIDEBAR ─────────────────────────────────── */}
          <aside className="hidden xl:flex w-[280px] 2xl:w-[290px] border-l border-[#EDE8C8] p-4 flex-col gap-3.5 flex-shrink-0 bg-[#FEFEFE] h-[calc(100vh-56px)] justify-between overflow-hidden">
            {/* Trust Score */}
            <div className="bg-white rounded-2xl border border-[#EDE8C8] p-4 shadow-2xs">
              <h3 className="text-[13px] font-bold text-[#18181B] mb-2.5">Your Trust Score</h3>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] flex items-center justify-center text-[#16A34A] flex-shrink-0">
                  <AppIcon name="shield-check" size={22} />
                </div>
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-extrabold text-[#18181B]">{currentUser.trustScore}</span>
                    <span className="text-xs text-[#9CA3AF] font-medium">/ 5</span>
                  </div>
                  <span className="text-[10.5px] font-semibold text-[#166534] bg-[#DCFCE7] px-2 py-0.5 rounded-full inline-block">
                    Excellent
                  </span>
                </div>
              </div>
              <div className="space-y-1.5 text-[11.5px] text-[#4B5563] pt-2 border-t border-[#F4F0E4]">
                <div className="flex items-center gap-2">
                  <span className="text-[#3B82F6]"><AppIcon name="repeat" size={14} /></span>
                  <span>{currentUser.successfulExchanges} Successful Exchanges</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#10B981]"><AppIcon name="timer" size={14} /></span>
                  <span>{currentUser.lateReturns} Late Returns</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#F59E0B]"><AppIcon name="alert-circle" size={14} /></span>
                  <span>{currentUser.disputes} Disputes</span>
                </div>
              </div>
              <div className="mt-2.5 pt-2.5 border-t border-[#F4F0E4]">
                <div className="flex items-center gap-1.5 text-[12px]">
                  <span className="text-[#16A34A]"><AppIcon name="shield-check" size={15} /></span>
                  <span className="font-bold text-[#18181B]">Verified Member</span>
                </div>
                <p className="text-[10.5px] text-[#78716C] ml-5">{currentUser.department}, {currentUser.year}</p>
              </div>
            </div>

            {/* Recent Messages */}
            <div className="bg-white rounded-2xl border border-[#EDE8C8] p-4 shadow-2xs">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-[13px] font-bold text-[#18181B]">Recent Messages</h3>
                <button className="text-[11px] font-semibold text-[#2563EB] hover:underline cursor-pointer">View all</button>
              </div>
              <div className="space-y-3">
                {recentMessages.map((msg) => (
                  <div key={msg.id} className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-full ${msg.avatarBg} flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-2xs`}>
                      {msg.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-bold text-[#18181B] truncate leading-tight">{msg.name}</p>
                      <p className="text-[10.5px] text-[#6B7280] truncate">{msg.message}</p>
                    </div>
                    <span className="text-[10px] text-[#9CA3AF] whitespace-nowrap">{msg.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Impact Card with Tree */}
            <div className="bg-[#F5F8E9] border border-[#D8E8B8] rounded-2xl p-4 shadow-2xs relative overflow-hidden flex items-center justify-between">
              <div className="flex-1 min-w-0 pr-2">
                <p className="text-[12px] font-bold text-[#2E5E1C] leading-tight">Every share counts!</p>
                <p className="text-[10.5px] text-[#4B5563] mt-0.5">You&apos;ve helped save</p>
                <p className="text-2xl font-extrabold text-[#18181B] mt-0.5 leading-none">
                  {currentUser.co2Saved} kg CO<sub className="text-xs font-normal">2</sub>
                </p>
                <p className="text-[10.5px] text-[#4B5563] mt-1.5">this month 🌱</p>
              </div>
              <div className="w-[120px] h-[115px] relative flex-shrink-0 -mr-2 -my-2">
                <Image
                  src="/tree.png"
                  alt="Environmental tree impact"
                  fill
                  className="object-contain object-bottom scale-110 select-none pointer-events-none drop-shadow-sm"
                  priority
                />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

/* ─── SIDEBAR ────────────────────────────────────────────────── */
function SidebarIcon({ name }: { name: string }) {
  const p: Record<string, string> = {
    grid: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z",
    search: "M11 3a8 8 0 100 16 8 8 0 000-16zM21 21l-4.3-4.3",
    sparkles: "M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z",
    inbox: "M22 12l-6 0-2 3h-4l-2-3-6 0",
    "arrow-up-right": "M7 17L17 7M7 7h10v10",
    list: "M8 6h13M8 12h13M8 18h13",
    message: "M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z",
    star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 6.91-1.01z",
    leaf: "M11 20A7 7 0 019.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.5 10-10 10z",
    shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  };
  return (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d={p[name] || ""} />
    </svg>
  );
}

function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[240px] bg-[#FDFBF1] border-r border-[#E8E4D8] flex flex-col z-40 hidden lg:flex">
      {/* Logo */}
      <div className="px-5 py-5 flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#3B82F6] via-[#10B981] to-[#84CC16] p-[2px] flex items-center justify-center">
          <div className="w-full h-full bg-[#FDFBF1] rounded-full flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38" />
            </svg>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-[10px] font-black tracking-tight text-[#18181B] leading-none">CAMPUS</span>
          <span className="text-[10px] font-black tracking-tight text-[#18181B] leading-none">CIRCULAR</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3.5 py-2 space-y-1 overflow-y-auto">
        {sidebarNav.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            id={`sidebar-${item.label.toLowerCase().replace(/\s/g, "-")}`}
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-[13.5px] transition-all ${
              item.active
                ? "bg-[#EAF7EE] text-[#14532D] font-bold shadow-2xs"
                : "text-[#374151] font-semibold hover:bg-[#F5F2E8] hover:text-[#18181B]"
            }`}
          >
            <span className={item.active ? "text-[#16A34A]" : "text-[#6B7280]"}>
              <SidebarIcon name={item.icon} />
            </span>
            {item.label}
          </Link>
        ))}
      </nav>

      {/* User Profile Card */}
      <div className="px-3.5 pt-2 pb-1">
        <div className="p-2.5 bg-[#FFF9EA] border border-[#F4E8CB] rounded-2xl flex items-center gap-2.5 shadow-2xs">
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
            <p className="text-[11px] text-[#78716C] font-medium hover:underline cursor-pointer">
              View Profile
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Mascot */}
      <div className="relative w-full h-[225px] mt-auto overflow-hidden">
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

/* ─── TOP BAR ────────────────────────────────────────────────── */
function TopBar() {
  return (
    <header className="h-14 border-b border-[#EDE9DA] bg-[#FEFEFE] px-5 flex items-center justify-end gap-4 flex-shrink-0 sticky top-0 z-30">
      <button id="topbar-notifications" className="w-9 h-9 rounded-xl bg-[#F9FAFB] flex items-center justify-center hover:bg-[#F3F4F6] transition-colors relative">
        <svg width="18" height="18" fill="none" stroke="#6B7280" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
        <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#EF4444] rounded-full border-2 border-white" />
      </button>
      <button id="topbar-messages" className="w-9 h-9 rounded-xl bg-[#F9FAFB] flex items-center justify-center hover:bg-[#F3F4F6] transition-colors">
        <svg width="18" height="18" fill="none" stroke="#6B7280" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </button>
      <div className={`w-9 h-9 rounded-full ${currentUser.avatarBg} flex items-center justify-center font-bold text-xs cursor-pointer hover:ring-2 hover:ring-[#16A34A] transition-all`}>
        {currentUser.initials}
      </div>
    </header>
  );
}
