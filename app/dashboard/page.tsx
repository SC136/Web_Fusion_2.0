"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
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
import { AppIcon } from "@/app/components/dashboard/Icons";
import AppNavbar from "@/app/components/layout/AppNavbar";
import Sidebar from "@/app/components/dashboard/Sidebar";

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-[#FEFEFE] text-[#18181B] flex flex-col select-none">
      {/* ─── UNIFIED TOP NAVBAR ───────────────────────────────── */}
      <AppNavbar variant="auth" />

      {/* ─── MAIN CONTENT BODY ────────────────────────────────── */}
      <div className="flex-1 flex max-w-[1550px] w-full mx-auto">
        {/* ─── UNIFIED LEFT SIDEBAR ───────────────────────────── */}
        <Sidebar />

        {/* ─── DASHBOARD CONTENT + RIGHT SIDEBAR ──────────────── */}
        <div className="flex-1 flex flex-col xl:flex-row overflow-hidden">
          {/* ─── CENTER CONTENT ─────────────────────────────── */}
          <main className="flex-1 p-4 sm:p-5 lg:p-6 overflow-y-auto space-y-5">
            {/* Hero / Welcome + AI Search Section with Mascot */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-5 items-center">
              {/* Left Column: Heading + Search Card */}
              <div className="flex flex-col gap-4">
                {/* Heading */}
                <div>
                  <h1
                    className="text-2xl sm:text-3xl font-bold text-[#18181B] mb-1 flex items-center gap-2"
                    style={{ fontFamily: "'Pixelify Sans', monospace" }}
                  >
                    <span>Welcome back, {currentUser.name}!</span>
                    <span className="text-2xl not-italic">👋</span>
                  </h1>
                  <p className="text-xs sm:text-sm text-[#6B7280]">Let&apos;s make sharing the new normal.</p>
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
            <div className="bg-white rounded-2xl border border-[#EDE8C8] p-4 md:p-5">
              <h2 className="text-base font-bold text-[#18181B] mb-3">Overview</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
                {overviewStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border p-3.5 hover:shadow-xs transition-all"
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
            <div className="bg-[#FEFAEE] rounded-2xl border border-[#EDE8C8] p-4 md:p-5">
              <h2 className="text-base font-bold text-[#18181B] mb-4">Your Activity</h2>
              <div className="flex items-center justify-between overflow-x-auto gap-2 px-2 pb-1">
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
                  <button className="text-xs font-semibold text-[#16A34A] hover:underline cursor-pointer">
                    View all
                  </button>
                </div>
                <p className="text-[11px] text-[#9CA3AF] mb-3 -mt-2">
                  Based on your need: &quot;Camera and tripod for reel&quot;
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {recommendedItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl border border-[#F3F4F6] overflow-hidden hover:shadow-md transition-shadow group cursor-pointer shadow-2xs"
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
                  <button className="text-xs font-semibold text-[#16A34A] hover:underline cursor-pointer">
                    View all
                  </button>
                </div>
                <div className="space-y-2">
                  {popularCategories.map((cat) => (
                    <div
                      key={cat.name}
                      className="flex items-center gap-3 bg-white rounded-xl border border-[#F3F4F6] px-4 py-3 hover:shadow-xs transition-shadow cursor-pointer shadow-2xs"
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

          {/* ─── RIGHT SIDEBAR (Non-scrollable) ────────────────── */}
          <aside className="w-full xl:w-[280px] 2xl:w-[290px] sticky top-16 h-[calc(100vh-64px)] max-h-[calc(100vh-64px)] overflow-hidden border-t xl:border-t-0 xl:border-l border-[#EDE8C8] p-3.5 flex flex-col justify-between flex-shrink-0 bg-[#FEFEFE] select-none">
            {/* 1. Your Trust Score */}
            <Link
              href="/profile"
              id="dashboard-trust-widget"
              className="bg-white rounded-2xl border border-[#EDE8C8] p-3.5 shadow-2xs block hover:shadow-md transition-shadow group flex-shrink-0"
            >
              <h3 className="text-[13.5px] font-bold text-[#18181B] mb-2.5 group-hover:text-[#16A34A] transition-colors">
                Your Trust Score
              </h3>

              {/* Score Display */}
              <div className="flex items-center gap-2.5 mb-2.5">
                <div className="w-10 h-10 rounded-xl bg-[#E8F8EE] flex items-center justify-center text-[#10B981] flex-shrink-0">
                  <AppIcon name="shield-check" size={20} />
                </div>
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-[#18181B] leading-none">4.7</span>
                    <span className="text-xs text-[#9CA3AF] font-medium">/ 5</span>
                  </div>
                  <span className="text-[10px] font-semibold text-[#166534] bg-[#E2F7E9] px-2 py-0.5 rounded-md inline-block mt-0.5">
                    Excellent
                  </span>
                </div>
              </div>

              {/* Stats Rows */}
              <div className="space-y-1.5 text-[11.5px] text-[#374151]">
                <div className="flex items-center gap-2">
                  <span className="text-[#3B82F6] flex-shrink-0"><AppIcon name="repeat" size={13} /></span>
                  <span>32 Successful Exchanges</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#10B981] flex-shrink-0"><AppIcon name="timer" size={13} /></span>
                  <span>0 Late Returns</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#F59E0B] flex-shrink-0"><AppIcon name="alert-circle" size={13} /></span>
                  <span>0 Disputes</span>
                </div>
              </div>

              {/* Verified Member */}
              <div className="mt-2.5 pt-2.5 border-t border-[#F0EBE0]">
                <div className="flex items-center gap-1.5 text-[12px]">
                  <span className="text-[#10B981] flex-shrink-0"><AppIcon name="shield-check" size={14} /></span>
                  <span className="font-bold text-[#18181B]">Verified Member</span>
                </div>
                <p className="text-[10.5px] text-[#6B7280] ml-5 mt-0.5">Computer Engineering, 3rd Year</p>
              </div>
            </Link>

            {/* 2. Recent Messages */}
            <div className="bg-white rounded-2xl border border-[#EDE8C8] p-3.5 shadow-2xs flex-shrink-0">
              <div className="flex items-center justify-between mb-2.5">
                <h3 className="text-[13.5px] font-bold text-[#18181B]">Recent Messages</h3>
                <button className="text-[11px] font-semibold text-[#2563EB] hover:underline cursor-pointer">View all</button>
              </div>
              <div className="space-y-2.5">
                {recentMessages.map((msg) => (
                  <div key={msg.id} className="flex items-center gap-2.5">
                    <div className={`w-7 h-7 rounded-full ${msg.avatarBg} flex items-center justify-center font-bold text-[11px] flex-shrink-0 shadow-2xs`}>
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

            {/* 3. Impact Card with Tree */}
            <div className="bg-[#F2F7E8] border border-[#DCE8C8] rounded-2xl p-3 shadow-2xs relative overflow-hidden flex items-center justify-between flex-shrink-0">
              <div className="flex-1 min-w-0 pr-1">
                <p className="text-[12px] font-extrabold text-[#1E4E1C] leading-tight">
                  Every share<br />counts!
                </p>
                <p className="text-[10px] text-[#52525B] mt-0.5">You&apos;ve helped save</p>
                <p className="text-[22px] font-black text-[#18181B] mt-0.5 leading-none tracking-tight">
                  12.4 kg
                </p>
                <p className="text-[22px] font-black text-[#18181B] leading-none tracking-tight">
                  CO<sub className="text-xs font-bold">2</sub>
                </p>
                <p className="text-[10px] text-[#52525B] flex items-center gap-1 mt-0.5 font-medium">
                  <span>this month</span>
                  <span className="text-xs">🌱</span>
                </p>
              </div>
              <div className="w-[100px] h-[100px] relative flex-shrink-0 -mr-1">
                <Image
                  src="/tree.png"
                  alt="Environmental tree impact"
                  fill
                  className="object-contain object-center select-none pointer-events-none drop-shadow-xs"
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
