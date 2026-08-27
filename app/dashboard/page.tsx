"use client";

import Image from "next/image";
import {
  currentUser,
  overviewStats,
  activityStages,
  recommendedItems,
  popularCategories,
  upcomingReturns,
  recentMessages,
  popularSearches,
} from "@/app/data/mockData";
import { useState } from "react";

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex min-h-screen bg-[#FEFEFE]">
      {/* ─── LEFT SIDEBAR (Desktop) ─────────────────────────── */}
      <Sidebar />

      {/* ─── MAIN AREA ──────────────────────────────────────── */}
      <div className="flex-1 lg:ml-[220px] flex flex-col min-h-screen">
        {/* Top Bar */}
        <TopBar />

        {/* Content */}
        <div className="flex-1 flex">
          {/* ─── CENTER CONTENT ─────────────────────────────── */}
          <main className="flex-1 p-5 lg:p-6 overflow-y-auto max-h-[calc(100vh-56px)]">
            {/* Welcome */}
            <div className="flex items-start justify-between mb-5">
              <div>
                <h1
                  className="text-2xl md:text-3xl font-bold text-[#18181B] mb-1"
                  style={{ fontFamily: "'Pixelify Sans', monospace" }}
                >
                  Welcome back, {currentUser.name}! 👋
                </h1>
                <p className="text-sm text-[#6B7280]">Let&apos;s make sharing the new normal.</p>
              </div>
              <div className="hidden md:block w-[120px] h-[100px] relative">
                <Image src="/hero-center.jpg" alt="mascot" fill className="object-contain mix-blend-multiply" />
              </div>
            </div>

            {/* AI Search Bar */}
            <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-4 mb-5">
              <p className="text-sm font-semibold text-[#166534] mb-2">What do you need today?</p>
              <div className="flex gap-2">
                <input
                  id="ai-search"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. I need a camera and tripod for a reel shoot tomorrow"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white border border-[#D1D5DB] text-sm text-[#18181B] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#86EFAC] focus:border-transparent"
                />
                <button
                  id="ai-search-btn"
                  className="px-5 py-2.5 bg-[#16A34A] text-white text-sm font-semibold rounded-xl hover:bg-[#15803D] transition-colors flex items-center gap-1.5 whitespace-nowrap"
                >
                  Search with AI ✨
                </button>
              </div>
              <div className="flex items-center gap-2 mt-2.5 flex-wrap">
                <span className="text-[11px] text-[#6B7280] font-medium">Popular:</span>
                {popularSearches.map((tag) => (
                  <button
                    key={tag}
                    className="text-[11px] px-2.5 py-1 bg-white border border-[#E5E7EB] rounded-lg text-[#374151] hover:bg-[#F9FAFB] transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Overview Stats */}
            <div className="mb-5">
              <h2 className="text-base font-bold text-[#18181B] mb-3">Overview</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
                {overviewStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-white rounded-2xl border border-[#F3F4F6] p-4 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-center gap-2.5 mb-2">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
                        style={{ backgroundColor: stat.color }}
                      >
                        {stat.icon}
                      </div>
                      <span className="text-xl font-bold text-[#18181B]">{stat.value}</span>
                    </div>
                    <p className="text-[11px] text-[#6B7280] font-medium">{stat.label}</p>
                    <p className="text-[10px] text-[#16A34A] font-semibold mt-0.5">{stat.change}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Tracker */}
            <div className="bg-white rounded-2xl border border-[#F3F4F6] p-4 mb-5">
              <h2 className="text-base font-bold text-[#18181B] mb-4">Your Activity</h2>
              <div className="flex items-center justify-between overflow-x-auto gap-1">
                {activityStages.map((stage, i) => (
                  <div key={stage.label} className="flex items-center">
                    <div className="flex flex-col items-center min-w-[80px]">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-1.5 ${
                          stage.active
                            ? "bg-[#18181B] shadow-md"
                            : "bg-[#F9FAFB] border border-[#E5E7EB]"
                        }`}
                      >
                        {stage.icon}
                      </div>
                      <span
                        className={`text-[11px] font-medium ${
                          stage.active ? "text-[#18181B] font-bold" : "text-[#9CA3AF]"
                        }`}
                      >
                        {stage.label}
                      </span>
                      <span
                        className={`text-lg font-bold ${
                          stage.active ? "text-[#18181B]" : "text-[#6B7280]"
                        }`}
                      >
                        {stage.count}
                      </span>
                    </div>
                    {i < activityStages.length - 1 && (
                      <div className="w-8 h-[2px] bg-[#E5E7EB] mx-1 mt-[-20px]" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Row: Recommended + Categories */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-5">
              {/* Recommended Items */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-base font-bold text-[#18181B]">
                    Recommended for You <span className="text-sm">✨</span>
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
                        <div className="flex items-center gap-1.5 text-[10px] text-[#6B7280] mb-1.5">
                          <span>⭐ {item.rating}</span>
                          <span className="text-[#D1D5DB]">•</span>
                          <span>📍 {item.distance}</span>
                        </div>
                        <p className="text-[13px] font-semibold text-[#18181B] mb-0.5 truncate">{item.name}</p>
                        <p className="text-[10px] text-[#9CA3AF] mb-2">By {item.owner}</p>
                        <p className="text-[13px] font-bold text-[#18181B]">{item.pricePerDay}</p>
                        <p className="text-[10px] text-[#16A34A]">{item.deposit}</p>
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
                      <span className="text-lg">{cat.icon}</span>
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
          <aside className="hidden xl:block w-[280px] border-l border-[#F3F4F6] p-5 overflow-y-auto max-h-[calc(100vh-56px)] space-y-5 flex-shrink-0">
            {/* Trust Score */}
            <div className="bg-white rounded-2xl border border-[#F3F4F6] p-4">
              <h3 className="text-sm font-bold text-[#18181B] mb-3">Your Trust Score</h3>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-[#F0FDF4] border-2 border-[#16A34A] flex items-center justify-center">
                  <span className="text-lg">🛡️</span>
                </div>
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-[#18181B]">{currentUser.trustScore}</span>
                    <span className="text-sm text-[#9CA3AF]">/ 5</span>
                  </div>
                  <span className="text-[11px] font-semibold text-[#16A34A] bg-[#F0FDF4] px-2 py-0.5 rounded-full">
                    Excellent
                  </span>
                </div>
              </div>
              <div className="space-y-1.5 text-[12px] text-[#6B7280]">
                <div className="flex items-center gap-2">
                  <span>🤝</span> {currentUser.successfulExchanges} Successful Exchanges
                </div>
                <div className="flex items-center gap-2">
                  <span>⏱️</span> {currentUser.lateReturns} Late Returns
                </div>
                <div className="flex items-center gap-2">
                  <span>⚠️</span> {currentUser.disputes} Disputes
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-[#F3F4F6]">
                <div className="flex items-center gap-2 text-[12px]">
                  <span className="text-[#16A34A] font-bold">✓</span>
                  <span className="font-semibold text-[#18181B]">Verified Member</span>
                </div>
                <p className="text-[11px] text-[#9CA3AF] ml-5">{currentUser.department}, {currentUser.year}</p>
              </div>
            </div>

            {/* Upcoming Returns */}
            <div className="bg-white rounded-2xl border border-[#F3F4F6] p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-[#18181B]">Upcoming Returns</h3>
                <button className="text-[11px] font-semibold text-[#16A34A] hover:underline">View all</button>
              </div>
              <div className="space-y-3">
                {upcomingReturns.map((ret) => (
                  <div key={ret.id} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#F9FAFB] flex items-center justify-center text-lg">
                      {ret.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold text-[#18181B] truncate">{ret.item}</p>
                      <p className="text-[11px] text-[#9CA3AF]">By {ret.owner}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          ret.urgent
                            ? "bg-[#FEF2F2] text-[#DC2626]"
                            : "bg-[#FEF3C7] text-[#D97706]"
                        }`}
                      >
                        {ret.dueIn}
                      </span>
                      <button className="text-[#9CA3AF] hover:text-[#18181B]">
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Messages */}
            <div className="bg-white rounded-2xl border border-[#F3F4F6] p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-[#18181B]">Recent Messages</h3>
                <button className="text-[11px] font-semibold text-[#16A34A] hover:underline">View all</button>
              </div>
              <div className="space-y-3">
                {recentMessages.map((msg) => (
                  <div key={msg.id} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#F9FAFB] flex items-center justify-center text-lg">
                      {msg.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold text-[#18181B] truncate">{msg.name}</p>
                      <p className="text-[11px] text-[#9CA3AF] truncate">{msg.message}</p>
                    </div>
                    <span className="text-[10px] text-[#9CA3AF] whitespace-nowrap">{msg.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Impact Card */}
            <div className="bg-gradient-to-br from-[#065F46] to-[#047857] rounded-2xl p-4 text-white">
              <p className="text-xs font-semibold opacity-90 mb-1">Every share counts!</p>
              <p className="text-[11px] opacity-75 mb-2">You&apos;ve helped save</p>
              <p className="text-3xl font-bold mb-0.5">
                {currentUser.co2Saved} kg CO<sub className="text-base">2</sub>
              </p>
              <p className="text-[11px] opacity-75">this month 🌱</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

/* ─── SIDEBAR ────────────────────────────────────────────────── */
import Link from "next/link";
import { sidebarNav } from "@/app/data/mockData";

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
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
      <path d={p[name] || ""} />
    </svg>
  );
}

function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[220px] bg-[#FDFBF1] border-r border-[#E8E4D8] flex-col z-40 hidden lg:flex">
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
      <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
        {sidebarNav.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            id={`sidebar-${item.label.toLowerCase().replace(/\s/g, "-")}`}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all ${
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

      {/* User */}
      <div className="px-4 py-4 border-t border-[#E8E4D8]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#FEF3C7] flex items-center justify-center text-lg">
            {currentUser.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold text-[#18181B] truncate">Hey, {currentUser.name}! 👋</p>
            <p className="text-[11px] text-[#9CA3AF]">View Profile</p>
          </div>
        </div>
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
      <div className="w-9 h-9 rounded-full bg-[#FEF3C7] flex items-center justify-center text-lg cursor-pointer hover:ring-2 hover:ring-[#16A34A] transition-shadow">
        {currentUser.avatar}
      </div>
    </header>
  );
}
