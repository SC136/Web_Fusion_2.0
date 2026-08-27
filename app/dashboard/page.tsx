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
import AppFooter from "@/app/components/layout/AppFooter";
import Sidebar from "@/app/components/dashboard/Sidebar";

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-[#FBF7F0] text-[#18181B] flex flex-col select-none">
      {/* ─── UNIFIED TOP NAVBAR ───────────────────────────────── */}
      <AppNavbar variant="auth" />

      {/* ─── MAIN CONTENT BODY ────────────────────────────────── */}
      <div className="flex-1 flex max-w-[1550px] w-full mx-auto">
        {/* ─── UNIFIED LEFT SIDEBAR ───────────────────────────── */}
        <Sidebar />

        {/* ─── DASHBOARD CONTENT + RIGHT SIDEBAR ──────────────── */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* ─── MAIN CENTER AREA ─────────────────────────────── */}
          <main className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-5">
            {/* Welcome Banner */}
            <div className="flex items-start justify-between">
              <div>
                <h1
                  className="text-2xl sm:text-3xl font-bold text-[#18181B] tracking-normal mb-1 flex items-center gap-2"
                  style={{ fontFamily: "'Pixelify Sans', monospace" }}
                >
                  Welcome back, {currentUser.name}!
                </h1>
                <p className="text-xs sm:text-sm text-[#52525B]">Let&apos;s make sharing the new normal.</p>
              </div>
              <div className="hidden md:block w-[110px] h-[90px] relative">
                <Image src="/hero-center.jpg" alt="mascot" fill className="object-contain mix-blend-multiply" />
              </div>
            </div>

            {/* AI Search Bar */}
            <div className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl p-4 shadow-2xs">
              <p className="text-xs sm:text-sm font-semibold text-[#166534] mb-2 flex items-center gap-1.5">
                <span>What do you need today?</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#9CA3AF]">
                    <AppIcon name="sparkles" size={16} className="text-[#16A34A]" />
                  </div>
                  <input
                    id="ai-search"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="e.g. I need a camera and tripod for a reel shoot tomorrow"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#D1D5DB] text-xs sm:text-sm text-[#18181B] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#86EFAC] focus:border-transparent shadow-2xs"
                  />
                </div>
                <button
                  id="ai-search-btn"
                  className="px-5 py-2.5 bg-[#16A34A] hover:bg-[#15803D] text-white text-xs sm:text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 whitespace-nowrap shadow-2xs cursor-pointer"
                >
                  <span>Search with AI</span>
                  <AppIcon name="sparkles" size={15} />
                </button>
              </div>
              <div className="flex items-center gap-2 mt-2.5 flex-wrap">
                <span className="text-[11px] text-[#6B7280] font-medium">Popular:</span>
                {popularSearches.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className="text-[11px] px-2.5 py-1 bg-white border border-[#E5E7EB] rounded-lg text-[#374151] hover:bg-[#F9FAFB] transition-colors cursor-pointer shadow-2xs"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Overview Stats */}
            <div>
              <h2 className="text-sm sm:text-base font-bold text-[#18181B] mb-3">Overview</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-3">
                {overviewStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-white rounded-2xl border border-[#F0EAE0] p-3.5 shadow-2xs hover:shadow-xs transition-shadow"
                  >
                    <div className="flex items-center gap-2.5 mb-2">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: stat.iconBg || "#E0F2FE", color: stat.iconColor || "#0284C7" }}
                      >
                        <AppIcon name={stat.icon} size={18} />
                      </div>
                      <span className="text-lg sm:text-xl font-bold text-[#18181B]">{stat.value}</span>
                    </div>
                    <p className="text-[11px] text-[#6B7280] font-medium leading-tight">{stat.label}</p>
                    <p className="text-[10px] text-[#16A34A] font-semibold mt-0.5">{stat.change}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Tracker */}
            <div className="bg-white rounded-2xl border border-[#F0EAE0] p-4 shadow-2xs">
              <h2 className="text-sm sm:text-base font-bold text-[#18181B] mb-3">Your Activity</h2>
              <div className="flex items-center justify-between overflow-x-auto gap-1 pb-1">
                {activityStages.map((stage, i) => (
                  <div key={stage.label} className="flex items-center">
                    <div className="flex flex-col items-center min-w-[75px]">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center mb-1.5 transition-colors ${
                          stage.active
                            ? "bg-[#18181B] text-white shadow-xs"
                            : "bg-[#FBF7F0] text-[#6B7280] border border-[#E5E7EB]"
                        }`}
                      >
                        <AppIcon name={stage.icon} size={16} />
                      </div>
                      <span
                        className={`text-[10px] sm:text-[11px] font-medium ${
                          stage.active ? "text-[#18181B] font-bold" : "text-[#9CA3AF]"
                        }`}
                      >
                        {stage.label}
                      </span>
                      <span
                        className={`text-base sm:text-lg font-bold ${
                          stage.active ? "text-[#18181B]" : "text-[#6B7280]"
                        }`}
                      >
                        {stage.count}
                      </span>
                    </div>
                    {i < activityStages.length - 1 && (
                      <div className="w-6 sm:w-8 h-[2px] bg-[#E8E0D2] mx-1 mt-[-18px]" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Row: Recommended + Categories */}
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_260px] gap-5">
              {/* Recommended Items */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-sm sm:text-base font-bold text-[#18181B] flex items-center gap-1.5">
                    <span>Recommended for You</span>
                    <AppIcon name="sparkles" size={15} className="text-amber-500" />
                  </h2>
                  <button className="text-xs font-semibold text-[#16A34A] hover:underline cursor-pointer">
                    View all
                  </button>
                </div>
                <p className="text-[11px] text-[#9CA3AF] mb-3">
                  Based on your need: &quot;Camera and tripod for reel&quot;
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {recommendedItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl border border-[#F0EAE0] overflow-hidden hover:shadow-md transition-all group cursor-pointer"
                    >
                      <div className="aspect-square bg-[#FBF7F0] relative overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-contain p-2.5 group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-3">
                        <div className="flex items-center gap-1.5 text-[10px] text-[#6B7280] mb-1">
                          <span className="flex items-center gap-0.5 text-amber-500 font-semibold">
                            <AppIcon name="star" size={11} className="fill-amber-400 text-amber-400" />
                            <span className="text-[#374151]">{item.rating}</span>
                          </span>
                          <span className="text-[#D1D5DB]">•</span>
                          <span className="flex items-center gap-0.5 text-[#6B7280]">
                            <AppIcon name="map-pin" size={10} className="text-[#9CA3AF]" />
                            {item.distance}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-[#18181B] mb-0.5 truncate">{item.name}</p>
                        <p className="text-[10px] text-[#9CA3AF] mb-1.5">By {item.owner}</p>
                        <p className="text-xs font-bold text-[#18181B]">{item.pricePerDay}</p>
                        <p className="text-[10px] text-[#16A34A] font-medium">{item.deposit}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Popular Categories */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm sm:text-base font-bold text-[#18181B]">Popular Categories</h2>
                  <button className="text-xs font-semibold text-[#16A34A] hover:underline cursor-pointer">
                    View all
                  </button>
                </div>
                <div className="space-y-2">
                  {popularCategories.map((cat) => (
                    <div
                      key={cat.name}
                      className="flex items-center gap-3 bg-white rounded-xl border border-[#F0EAE0] px-3.5 py-2.5 hover:shadow-2xs transition-shadow cursor-pointer"
                    >
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${cat.color}`}>
                        <AppIcon name={cat.icon} size={15} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-[#18181B] truncate">{cat.name}</p>
                      </div>
                      <span className="text-[11px] text-[#9CA3AF] font-medium whitespace-nowrap">{cat.count} items</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>

          {/* ─── RIGHT SIDEBAR WIDGETS ───────────────────────── */}
          <aside className="w-full lg:w-[280px] p-4 sm:p-6 lg:pl-0 space-y-4 flex-shrink-0">
            {/* Trust Score Card */}
            <Link
              href="/profile"
              id="dashboard-trust-widget"
              className="bg-white rounded-2xl border border-[#F0EAE0] p-4 block hover:shadow-md transition-shadow group shadow-2xs"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold text-[#18181B] uppercase tracking-wide group-hover:text-[#16A34A] transition-colors">
                  Your Trust Score
                </h3>
                <span className="text-[10px] font-bold text-[#16A34A] flex items-center gap-1">
                  View Profile <AppIcon name="arrow-right" size={11} />
                </span>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 rounded-full bg-[#F0FDF4] border-2 border-[#16A34A] flex items-center justify-center text-[#16A34A]">
                  <AppIcon name="shield-check" size={22} />
                </div>
                <div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-[#18181B]">{currentUser.trustScore}</span>
                    <span className="text-xs text-[#9CA3AF]">/ 5</span>
                  </div>
                  <span className="text-[10px] font-bold text-[#16A34A] bg-[#F0FDF4] px-2 py-0.5 rounded-full">
                    Excellent
                  </span>
                </div>
              </div>
              <div className="space-y-1.5 text-[11px] text-[#6B7280]">
                <div className="flex items-center gap-2">
                  <span className="text-[#3B82F6]"><AppIcon name="repeat" size={13} /></span>
                  <span>{currentUser.successfulExchanges} Successful Exchanges</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#10B981]"><AppIcon name="clock-check" size={13} /></span>
                  <span>{currentUser.lateReturns} Late Returns</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#F59E0B]"><AppIcon name="alert-circle" size={13} /></span>
                  <span>{currentUser.disputes} Disputes</span>
                </div>
              </div>
            </Link>

            {/* Upcoming Returns */}
            <div className="bg-white rounded-2xl border border-[#F0EAE0] p-4 shadow-2xs">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold text-[#18181B] uppercase tracking-wide">Upcoming Returns</h3>
                <button className="text-[10px] font-semibold text-[#16A34A] hover:underline cursor-pointer">View all</button>
              </div>
              <div className="space-y-2.5">
                {upcomingReturns.map((ret) => (
                  <div key={ret.id} className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-full ${ret.avatarBg} flex items-center justify-center font-bold text-[11px] flex-shrink-0`}>
                      {ret.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#18181B] truncate">{ret.item}</p>
                      <p className="text-[10px] text-[#9CA3AF]">By {ret.owner}</p>
                    </div>
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${
                        ret.urgent
                          ? "bg-[#FEF2F2] text-[#DC2626]"
                          : "bg-[#FEF3C7] text-[#D97706]"
                      }`}
                    >
                      {ret.dueIn}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Messages */}
            <div className="bg-white rounded-2xl border border-[#F0EAE0] p-4 shadow-2xs">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold text-[#18181B] uppercase tracking-wide">Recent Messages</h3>
                <button className="text-[10px] font-semibold text-[#16A34A] hover:underline cursor-pointer">View all</button>
              </div>
              <div className="space-y-2.5">
                {recentMessages.map((msg) => (
                  <div key={msg.id} className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-full ${msg.avatarBg} flex items-center justify-center font-bold text-[11px] flex-shrink-0`}>
                      {msg.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[#18181B] truncate">{msg.name}</p>
                      <p className="text-[10px] text-[#9CA3AF] truncate">{msg.message}</p>
                    </div>
                    <span className="text-[9px] text-[#9CA3AF] whitespace-nowrap">{msg.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Impact Card */}
            <div className="bg-gradient-to-br from-[#065F46] to-[#047857] rounded-2xl p-4 text-white shadow-2xs">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-semibold opacity-90">Every share counts!</p>
                <AppIcon name="leaf" size={16} className="text-emerald-200" />
              </div>
              <p className="text-[10px] opacity-75 mb-1.5">You&apos;ve helped save</p>
              <p className="text-2xl font-bold mb-0.5">
                {currentUser.co2Saved} kg CO<sub className="text-sm font-normal">2</sub>
              </p>
              <p className="text-[10px] opacity-75">this month</p>
            </div>
          </aside>
        </div>
      </div>

      {/* ─── UNIFIED BOTTOM FOOTER ────────────────────────────── */}
      <AppFooter />
    </div>
  );
}
