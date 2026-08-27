"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
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
import Sidebar from "@/app/components/dashboard/Sidebar";
import AppNavbar from "@/app/components/layout/AppNavbar";
import { useApp } from "@/app/context/AppContext";

export default function DashboardPage() {
  const router = useRouter();
  const { currentUser, listings, exchanges } = useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const [isCo2TooltipPinned, setIsCo2TooltipPinned] = useState(false);

  return (
    <div className="min-h-screen bg-[#FEFEFE] flex flex-col select-none">
      {/* ─── FULL-WIDTH CONTINUOUS TOP NAVBAR ─────────────── */}
      <AppNavbar variant="auth" />

      {/* ─── MAIN BODY (Sidebar + Content) ─────────────────── */}
      <div className="flex-1 flex w-full">
        {/* ─── LEFT SIDEBAR (Desktop) ───────────────────────── */}
        <Sidebar />

        {/* ─── MAIN DASHBOARD AREA ──────────────────────────── */}
        <div className="flex-1 lg:ml-[240px] flex min-w-0">
          {/* ─── CENTER CONTENT ─────────────────────────────── */}
          <main className="flex-1 p-5 lg:p-6 overflow-y-auto max-h-[calc(100vh-64px)] min-w-0">
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
                  </h1>
                  <p className="text-sm text-[#6B7280]">Let&apos;s make sharing the new normal.</p>
                </div>

                {/* AI Search Card */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    router.push(`/ai-assistant`);
                  }}
                  className="bg-[#F5F8E9] border border-[#D8E8B8] rounded-2xl p-4 shadow-2xs"
                >
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
                      type="submit"
                      id="dashboard-ai-search-btn"
                      className="bg-gradient-to-b from-[#7FB634] to-[#689A24] text-white px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 hover:from-[#8AC538] hover:to-[#72A627] transition-all shadow-xs active:translate-y-0.5 cursor-pointer whitespace-nowrap"
                    >
                      <span>Build Smart Kit</span>
                      <AppIcon name="sparkles" size={15} />
                    </button>
                  </div>

                  {/* Popular Tags */}
                  <div className="flex items-center gap-2 flex-wrap text-xs text-[#6B7280] mt-3">
                    <span className="font-medium text-[#4B5563]">Popular Kits:</span>
                    {["Reel Shoot Kit", "IoT Lab Exam", "Camping Gear", "Placement Interview"].map((tag) => (
                      <Link
                        key={tag}
                        href="/ai-assistant"
                        className="text-[11px] px-3 py-1 bg-white/90 border border-[#E0E7D5] rounded-xl text-[#374151] hover:bg-white hover:border-[#6F9535] hover:text-[#18181B] transition-colors cursor-pointer shadow-2xs flex items-center gap-1"
                      >
                        <AppIcon name="sparkles" size={11} className="text-[#6F9535]" />
                        <span>{tag}</span>
                      </Link>
                    ))}
                  </div>
                </form>
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
            <div className="bg-white rounded-2xl border border-[#EDE8C8] p-4 md:p-5 mb-5 shadow-2xs">
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
            <div className="bg-[#FEFAEE] rounded-2xl border border-[#EDE8C8] p-4 md:p-5 mb-5 shadow-2xs">
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
                  <Link href="/browse" className="text-xs font-semibold text-[#16A34A] hover:underline cursor-pointer">
                    View all
                  </Link>
                </div>
                <p className="text-[11px] text-[#9CA3AF] mb-3 -mt-2">
                  Based on your need: &quot;Camera and tripod for reel&quot;
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {recommendedItems.map((item) => (
                    <Link
                      key={item.id}
                      href={`/browse/${item.id}`}
                      className="bg-white rounded-2xl border border-[#EDE8C8] overflow-hidden hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between block"
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
                        <p className="text-[13px] font-semibold text-[#18181B] mb-0.5 truncate group-hover:text-[#16A34A] transition-colors">{item.name}</p>
                        <p className="text-[10px] text-[#9CA3AF] mb-2">By {item.owner}</p>
                        <p className="text-[13px] font-bold text-[#18181B]">{item.pricePerDay}</p>
                        <p className="text-[10px] text-[#16A34A] font-medium">{item.deposit}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Popular Categories */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-base font-bold text-[#18181B]">Popular Categories</h2>
                  <Link href="/browse" className="text-xs font-semibold text-[#16A34A] hover:underline cursor-pointer">
                    View all
                  </Link>
                </div>
                <div className="space-y-2">
                  {popularCategories.map((cat) => (
                    <Link
                      key={cat.name}
                      href={`/browse?category=${encodeURIComponent(cat.name)}`}
                      className="flex items-center gap-3 bg-white rounded-xl border border-[#EDE8C8] px-4 py-3 hover:shadow-sm hover:border-[#6F9535]/50 transition-all cursor-pointer block group"
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${cat.color}`}>
                        <AppIcon name={cat.icon} size={16} />
                      </div>
                      <div className="flex-1">
                        <p className="text-[13px] font-medium text-[#18181B] group-hover:text-[#16A34A] transition-colors">{cat.name}</p>
                      </div>
                      <span className="text-[11px] text-[#9CA3AF] font-medium">{cat.count} items</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </main>

          {/* ─── RIGHT SIDEBAR ─────────────────────────────────── */}
          <aside className="hidden xl:flex w-[280px] 2xl:w-[290px] border-l border-[#EDE8C8] p-4 flex-col gap-3.5 flex-shrink-0 bg-[#FEFEFE] h-[calc(100vh-56px)] justify-between overflow-visible relative z-20">
            {/* Trust Score */}
            <Link href="/profile" className="bg-white rounded-2xl border border-[#EDE8C8] p-4 shadow-2xs hover:shadow-sm transition-all block group">
              <div className="flex items-center justify-between mb-2.5">
                <h3 className="text-[13px] font-bold text-[#18181B] group-hover:text-[#16A34A] transition-colors">Your Trust Score</h3>
                <span className="text-[11px] text-[#16A34A] font-semibold">View Profile →</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#16A34A] to-[#15803D] flex items-center justify-center text-white font-extrabold text-lg shadow-xs">
                  {currentUser.trustScore}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span key={star} className="text-[#EAB308] text-xs">★</span>
                    ))}
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
            </Link>

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

            {/* Impact Card with Tree & Interactive Calculation Tooltip */}
            <div
              className="bg-[#F5F8E9] border border-[#D8E8B8] rounded-2xl p-4 shadow-2xs relative flex items-center justify-between group cursor-pointer hover:border-[#A6D560] hover:shadow-xs transition-all select-none"
              onClick={() => setIsCo2TooltipPinned(!isCo2TooltipPinned)}
            >
              <div className="flex-1 min-w-0 pr-2">
                <div className="flex items-center gap-1.5">
                  <p className="text-[12px] font-bold text-[#2E5E1C] leading-tight">Every share counts!</p>
                  <span
                    className="w-4 h-4 rounded-full bg-[#E2EFCD] text-[#2E5E1C] flex items-center justify-center text-[9.5px] font-extrabold cursor-pointer group-hover:bg-[#2E5E1C] group-hover:text-white transition-colors"
                    title="View calculation methodology"
                  >
                    ⓘ
                  </span>
                </div>
                <p className="text-[10.5px] text-[#4B5563] mt-0.5">You&apos;ve helped save</p>
                <p className="text-2xl font-extrabold text-[#18181B] mt-0.5 leading-none">
                  {currentUser.co2Saved} kg CO<sub className="text-xs font-normal">2</sub>
                </p>
                <div className="flex items-center gap-1 mt-1.5">
                  <p className="text-[10.5px] text-[#4B5563]">this month 🌱</p>
                  <span className="text-[9px] font-bold text-[#2E5E1C] underline decoration-dotted opacity-75 group-hover:opacity-100">
                    Hover for formula
                  </span>
                </div>
              </div>
              <div className="w-[120px] h-[115px] relative flex-shrink-0 -mr-2 -my-2">
                <Image
                  src="/tree.png"
                  alt="Environmental tree impact"
                  fill
                  className="object-contain object-bottom scale-110 select-none pointer-events-none drop-shadow-sm group-hover:scale-115 transition-transform duration-300"
                  priority
                />
              </div>

              {/* ─── Hover & Pinned Calculation Tooltip Popover (Contained 100% inside right column) ──── */}
              <div
                className={`absolute bottom-full left-0 right-0 mb-2 w-full bg-white border-2 border-[#18181B] rounded-2xl p-3.5 shadow-2xl z-50 text-xs font-sans transition-all duration-200 cursor-default ${
                  isCo2TooltipPinned
                    ? "opacity-100 scale-100 pointer-events-auto"
                    : "opacity-0 scale-95 pointer-events-none group-hover:opacity-100 group-hover:scale-100 group-hover:pointer-events-auto"
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Tooltip Header */}
                <div className="flex items-start justify-between pb-1.5 border-b border-[#EDE8C8]">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <div className="w-6 h-6 rounded-lg bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center text-xs font-bold flex-shrink-0">
                      🌿
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-black text-[#18181B] text-[11.5px] leading-tight truncate">
                        How 12.4 kg CO₂ is calculated
                      </h4>
                      <p className="text-[9px] text-[#71717A]">Campus Carbon Model (CSCM v2.4)</p>
                    </div>
                  </div>
                  {isCo2TooltipPinned && (
                    <button
                      type="button"
                      onClick={() => setIsCo2TooltipPinned(false)}
                      className="text-[#71717A] hover:text-[#18181B] text-xs font-bold px-1"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Calculation Methodology Formula */}
                <div className="bg-[#FAF7F0] border border-[#EFE8D6] rounded-xl p-2 my-2 space-y-0.5 text-[10px]">
                  <p className="font-bold text-[#2E5E1C]">Formula:</p>
                  <p className="text-[#374151] font-mono leading-tight bg-white/90 p-1 rounded border border-[#EDE8C8] text-[9.5px]">
                    CO₂e = Mfg Avoidance + Zero-Mile Transit
                  </p>
                  <p className="text-[9px] text-[#71717A] leading-tight">
                    Every share prevents purchasing new hardware and avoids factory emissions.
                  </p>
                </div>

                {/* Itemized Contribution Breakdown */}
                <div className="space-y-1 text-[10.5px] pb-2 border-b border-[#EDE8C8]">
                  <p className="font-extrabold text-[9.5px] uppercase text-[#71717A] tracking-wider">
                    Your Active Shares This Month:
                  </p>

                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-[#374151] truncate pr-1">📷 Sony Alpha A7 III</span>
                    <span className="font-black text-[#16A34A] whitespace-nowrap">+6.2 kg</span>
                  </div>

                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-[#374151] truncate pr-1">🎙️ Rode Mic (2 shares)</span>
                    <span className="font-black text-[#16A34A] whitespace-nowrap">+3.8 kg</span>
                  </div>

                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-[#374151] truncate pr-1">🔭 Digitek 65&quot; Tripod</span>
                    <span className="font-black text-[#16A34A] whitespace-nowrap">+1.8 kg</span>
                  </div>

                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-[#374151] truncate pr-1">📦 Zero-Mile Handover</span>
                    <span className="font-black text-[#16A34A] whitespace-nowrap">+0.6 kg</span>
                  </div>

                  <div className="flex justify-between items-center pt-1 border-t border-[#EDE8C8] font-black text-[11px] text-[#18181B]">
                    <span>Total Prevented:</span>
                    <span className="text-[#15803D]">12.4 kg CO₂</span>
                  </div>
                </div>

                {/* Real-World Equivalence */}
                <div className="pt-1.5 text-[9.5px] text-[#52525B] space-y-1">
                  <div className="grid grid-cols-2 gap-1">
                    <div className="bg-[#F0FDF4] p-1 rounded-lg border border-[#DCFCE7] text-center">
                      🚗 <strong>52 km</strong> drive
                    </div>
                    <div className="bg-[#F0FDF4] p-1 rounded-lg border border-[#DCFCE7] text-center">
                      📱 <strong>1,510</strong> charges
                    </div>
                  </div>
                </div>

                {/* Navigation Link */}
                <Link
                  href="/impact"
                  className="mt-2 block w-full py-1.5 bg-[#18181B] hover:bg-[#27272A] text-white text-center rounded-xl font-bold text-[10px] transition-all shadow-2xs"
                >
                  View Full Impact Dashboard →
                </Link>

                {/* Downward Arrow Pointer */}
                <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white border-r-2 border-b-2 border-[#18181B] rotate-45" />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}



