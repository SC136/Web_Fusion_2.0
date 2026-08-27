"use client";

import Image from "next/image";
import { useState } from "react";
import { profileUser, publicProfileMaya } from "@/app/data/mockData";
import { AppIcon } from "@/app/components/dashboard/Icons";
import TopBar from "@/app/components/dashboard/TopBar";
import Sidebar from "@/app/components/dashboard/Sidebar";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "public">("dashboard");

  return (
    <div className="flex min-h-screen bg-[#FEFEFE] text-[#18181B] select-none">
      {/* ─── UNIFIED MASTER LEFT SIDEBAR (Desktop) ────────────── */}
      <Sidebar />

      {/* ─── MAIN AREA ────────────────────────────────────────── */}
      <div className="flex-1 lg:ml-[240px] flex flex-col min-h-screen">
        {/* Top Bar */}
        <TopBar />

        {/* ─── CENTER PROFILE CONTENT ─────────────────────────── */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-h-[calc(100vh-56px)] bg-[#FEFEFE]">
          {/* Top Row: Page Title + View Switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div className="relative">
              <h1
                id="profile-heading"
                className="text-2xl sm:text-3xl font-bold text-[#18181B] tracking-normal inline-flex items-center gap-2"
                style={{ fontFamily: "'Pixelify Sans', monospace" }}
              >
                {activeTab === "dashboard" ? "User & Trust Profile" : "Public Member Profile"}
              </h1>
              {/* Hand-drawn burst accent lines */}
              <div className="inline-block ml-1 align-top text-[#18181B]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M12 2v4M4.93 4.93l2.83 2.83M2 12h4M19.07 4.93l-2.83 2.83M22 12h-4" />
                </svg>
              </div>
            </div>

            {/* Design View Switcher Pill */}
            <div className="bg-white/80 border border-[#E4E4E7] p-1 rounded-xl flex items-center gap-1 self-start sm:self-auto shadow-2xs">
              <button
                onClick={() => setActiveTab("dashboard")}
                id="tab-my-profile"
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  activeTab === "dashboard"
                    ? "bg-[#18181B] text-white shadow-2xs"
                    : "text-[#71717A] hover:text-[#18181B]"
                }`}
              >
                My Trust Profile
              </button>
              <button
                onClick={() => setActiveTab("public")}
                id="tab-public-profile"
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
                  activeTab === "public"
                    ? "bg-[#18181B] text-white shadow-2xs"
                    : "text-[#71717A] hover:text-[#18181B]"
                }`}
              >
                Public Member View
              </button>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* VIEW 1: MY USER & TRUST PROFILE (Design 1)             */}
          {/* ═══════════════════════════════════════════════════════ */}
          {activeTab === "dashboard" && (
            <div className="space-y-6 animate-fadeInUp">
              {/* Top Main Hero Card */}
              <div className="bg-white rounded-3xl border border-[#F0EAE0] p-6 lg:p-7 shadow-xs relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-6">
                {/* Left Side: Avatar + Details */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left z-10">
                  {/* Large Circular Avatar */}
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-[#FEF3C7] border-4 border-white shadow-md flex-shrink-0">
                    <Image
                      src="/mascots/blue_dress_hat.png"
                      alt={profileUser.name}
                      fill
                      className="object-cover object-top scale-110"
                      priority
                    />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center justify-center sm:justify-start gap-2">
                      <h2 className="text-xl sm:text-2xl font-bold text-[#18181B]">
                        {profileUser.name}
                      </h2>
                      <span className="w-5 h-5 rounded-full bg-[#16A34A] text-white flex items-center justify-center">
                        <AppIcon name="check" size={12} />
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-[#52525B]">
                      {profileUser.department}
                    </p>
                    <p className="text-xs text-[#71717A] font-medium">
                      {profileUser.year}
                    </p>
                    <p className="text-xs text-[#71717A] flex items-center justify-center sm:justify-start gap-1">
                      <AppIcon name="map-pin" size={13} className="text-[#9CA3AF]" />
                      <span>{profileUser.location}</span>
                    </p>

                    {/* Verification Badges */}
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#DCFCE7] text-[#15803D]">
                        <AppIcon name="check" size={11} />
                        <span>ID Verified</span>
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#DBEAFE] text-[#1D4ED8]">
                        <AppIcon name="check" size={11} />
                        <span>College Email Verified</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Center-Right: Trust Score Card */}
                <div className="border-t lg:border-t-0 lg:border-l border-[#F0EAE0] pt-4 lg:pt-0 lg:pl-8 flex flex-col items-center text-center z-10 min-w-[170px]">
                  <span className="text-xs font-bold text-[#52525B] mb-2 uppercase tracking-wide">
                    Trust Score
                  </span>
                  {/* Shield Badge */}
                  <div className="w-20 h-24 border-2 border-[#16A34A] rounded-2xl flex flex-col items-center justify-center bg-[#F0FDF4] shadow-xs relative mb-2">
                    <span className="text-3xl font-black text-[#18181B] leading-none">
                      {profileUser.trustScore}
                    </span>
                    <span className="text-[11px] font-bold text-[#71717A]">/5</span>
                  </div>
                  {/* Stars */}
                  <div className="flex items-center gap-1 text-amber-400 mb-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <AppIcon key={s} name="star" size={15} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-[#71717A] font-medium">
                    Based on {profileUser.reviewsCount} reviews
                  </span>
                </div>

                {/* Far Right: Thumbs Up Mascot Artwork */}
                <div className="relative w-36 h-40 lg:w-44 lg:h-44 hidden md:block flex-shrink-0 z-0">
                  <div className="absolute inset-0 bg-[#E2F0CB]/60 rounded-full blur-xl -z-10" />
                  <Image
                    src="/mascots/blue_dress_hat.png"
                    alt="Thumbs up mascot"
                    fill
                    className="object-contain object-right-bottom scale-110"
                  />
                  {/* Burst Accent */}
                  <div className="absolute top-2 left-2 text-[#18181B]">
                    <svg width="24" height="24" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M4 18 L9 10 L14 19 L19 9 L24 16" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Middle Metrics Row (5 White Cards) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                {profileUser.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="bg-white rounded-2xl border border-[#F0EAE0] p-4 flex items-center gap-3.5 shadow-2xs hover:shadow-xs transition-shadow"
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: m.bgColor, color: m.color }}
                    >
                      <AppIcon name={m.icon} size={20} />
                    </div>
                    <div>
                      <p className="text-xl sm:text-2xl font-black text-[#18181B] leading-none mb-1">
                        {m.value}
                      </p>
                      <p className="text-[11px] font-semibold text-[#71717A] leading-tight">
                        {m.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Two Columns: Recent Reviews & Trust Breakdown */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 1. Recent Reviews */}
                <div className="bg-white rounded-3xl border border-[#F0EAE0] p-6 shadow-2xs flex flex-col justify-between">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#18181B] mb-4">
                      Recent Reviews
                    </h3>
                    <div className="space-y-4">
                      {profileUser.reviews.map((r) => (
                        <div
                          key={r.id}
                          className="border-b border-[#F4EFE6] pb-4 last:border-0 last:pb-0"
                        >
                          <div className="flex items-start justify-between gap-2 mb-1.5">
                            <div className="flex items-center gap-2.5">
                              <div className={`w-8 h-8 rounded-full ${r.avatarBg} flex items-center justify-center font-bold text-xs`}>
                                {r.initials}
                              </div>
                              <div>
                                <div className="flex items-center gap-1.5">
                                  <span className="text-xs font-bold text-[#18181B]">
                                    {r.name}
                                  </span>
                                  <span className="w-3.5 h-3.5 rounded-full bg-[#16A34A] text-white flex items-center justify-center">
                                    <AppIcon name="check" size={9} />
                                  </span>
                                </div>
                                <span className="text-[10px] text-[#71717A] font-medium">
                                  {r.role}
                                </span>
                              </div>
                            </div>
                            <div className="flex flex-col items-end">
                              <div className="flex items-center gap-0.5 text-amber-400">
                                {[...Array(r.rating)].map((_, idx) => (
                                  <AppIcon key={idx} name="star" size={12} className="fill-amber-400 text-amber-400" />
                                ))}
                              </div>
                              <span className="text-[10px] text-[#A1A1AA] mt-0.5">
                                • {r.date}
                              </span>
                            </div>
                          </div>
                          <p className="text-xs text-[#52525B] leading-relaxed pl-10">
                            &quot;{r.comment}&quot;
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-5 mt-4 border-t border-[#F4EFE6] flex justify-end">
                    <button
                      id="view-all-reviews-btn"
                      className="px-4 py-2 bg-[#8DBF43] hover:bg-[#7EAC3B] text-[#18181B] font-bold text-xs rounded-full transition-all shadow-2xs hover:shadow-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>View All Reviews</span>
                      <AppIcon name="arrow-right" size={13} />
                    </button>
                  </div>
                </div>

                {/* 2. Trust Breakdown */}
                <div className="bg-white rounded-3xl border border-[#F0EAE0] p-6 shadow-2xs flex flex-col justify-between">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#18181B] mb-5">
                      Trust Breakdown
                    </h3>
                    <div className="space-y-4">
                      {profileUser.breakdown.map((item) => (
                        <div key={item.label}>
                          <div className="flex items-center justify-between text-xs font-semibold text-[#18181B] mb-1.5">
                            <span>{item.label}</span>
                            <span className="font-bold text-[#2D5A1E]">{item.score}</span>
                          </div>
                          <div className="w-full h-2.5 bg-[#F4EFE6] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#8DBF43] rounded-full transition-all duration-500"
                              style={{ width: `${item.progress}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-5 mt-4 border-t border-[#F4EFE6] flex justify-end">
                    <button
                      id="how-trust-works-btn"
                      className="px-4 py-2 bg-[#8DBF43] hover:bg-[#7EAC3B] text-[#18181B] font-bold text-xs rounded-full transition-all shadow-2xs hover:shadow-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>How Trust Score Works</span>
                      <AppIcon name="arrow-right" size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════ */}
          {/* VIEW 2: PUBLIC MEMBER PROFILE VIEW (Design 2)          */}
          {/* ═══════════════════════════════════════════════════════ */}
          {activeTab === "public" && (
            <div className="space-y-8 animate-fadeInUp">
              {/* Header Hero Title */}
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#8DBF43]/20 border border-[#8DBF43]/40 rounded-full text-xs font-bold text-[#2D5A1E]">
                  <span>TRUST &amp; COMMUNITY</span>
                  <span>✦</span>
                </div>
                <h2
                  className="text-2xl sm:text-4xl font-bold text-[#18181B] tracking-tight relative inline-block"
                  style={{ fontFamily: "'Pixelify Sans', monospace" }}
                >
                  Borrow from people<br />you can actually trust.
                  {/* Blue Hand-Drawn Underline */}
                  <div className="w-full mt-1">
                    <svg width="220" height="8" viewBox="0 0 220 8" fill="none">
                      <path d="M2 5C60 2 160 2 218 6" stroke="#3B82F6" strokeWidth="3.5" strokeLinecap="round" />
                    </svg>
                  </div>
                </h2>
                <p className="text-xs sm:text-sm text-[#52525B] font-medium max-w-xl">
                  Verification, trust scores, and full exchange history for every campus member.
                </p>
              </div>

              {/* 2-Column Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* ─── LEFT COLUMN: Profile Card ───────────────── */}
                <div className="lg:col-span-5 bg-white rounded-3xl border border-[#F0EAE0] p-6 shadow-xs space-y-6 flex flex-col justify-between">
                  {/* User Header */}
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden bg-amber-100 border-2 border-white shadow-xs flex-shrink-0">
                      <Image
                        src="/mascots/blue_dress_hat.png"
                        alt={publicProfileMaya.name}
                        fill
                        className="object-cover object-top scale-110"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#18181B]">
                        {publicProfileMaya.name}
                      </h3>
                      <p className="text-xs text-[#52525B] font-medium">
                        {publicProfileMaya.department} • {publicProfileMaya.year} • {publicProfileMaya.location}
                      </p>
                      <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#16A34A] text-white">
                          <AppIcon name="check" size={10} />
                          <span>Verified Student</span>
                        </span>
                        <span className="text-[10px] text-[#71717A] bg-[#F4EFE6] px-2 py-0.5 rounded-full font-medium">
                          {publicProfileMaya.memberSince}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Trust Score Circular Meter */}
                  <div className="bg-[#FBF7F0] rounded-2xl p-4 flex items-center justify-around">
                    <div className="w-20 h-20 rounded-full border-4 border-[#16A34A] flex flex-col items-center justify-center bg-white shadow-2xs">
                      <span className="text-2xl font-black text-[#18181B] leading-none">
                        {publicProfileMaya.trustScore}
                      </span>
                      <span className="text-[9px] font-bold text-[#71717A] uppercase">
                        Trust Score
                      </span>
                    </div>
                    <div>
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#DCFCE7] text-[#15803D] mb-1">
                        {publicProfileMaya.rank}
                      </span>
                      <p className="text-[11px] text-[#71717A]">
                        Consistent on-time returns
                      </p>
                    </div>
                  </div>

                  {/* 4 Stat Metrics */}
                  <div className="grid grid-cols-4 gap-2 text-center py-2 border-y border-[#F0EAE0]">
                    <div>
                      <p className="text-lg font-bold text-[#18181B]">{publicProfileMaya.stats.exchanges}</p>
                      <p className="text-[10px] text-[#71717A]">Exchanges</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-[#18181B] flex items-center justify-center gap-0.5">
                        {publicProfileMaya.stats.rating}
                        <AppIcon name="star" size={12} className="fill-amber-400 text-amber-400" />
                      </p>
                      <p className="text-[10px] text-[#71717A]">Avg Rating</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-[#18181B]">{publicProfileMaya.stats.lateReturns}</p>
                      <p className="text-[10px] text-[#71717A]">Late Returns</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-[#18181B]">{publicProfileMaya.stats.disputes}</p>
                      <p className="text-[10px] text-[#71717A]">Disputes</p>
                    </div>
                  </div>

                  {/* Rating Breakdown Bars */}
                  <div className="space-y-1 text-xs">
                    {publicProfileMaya.ratingDistribution.map((d) => (
                      <div key={d.stars} className="flex items-center gap-2 text-[11px] text-[#71717A]">
                        <span className="w-4 font-bold">{d.stars}★</span>
                        <div className="flex-1 h-2 bg-[#F4EFE6] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#8DBF43] rounded-full"
                            style={{ width: `${d.percentage}%` }}
                          />
                        </div>
                        <span className="w-4 text-right">{d.count}</span>
                      </div>
                    ))}
                  </div>

                  {/* Community Badges */}
                  <div className="grid grid-cols-2 gap-2">
                    {publicProfileMaya.badges.map((b) => (
                      <div
                        key={b.label}
                        className="bg-[#FBF7F0] border border-[#F0EAE0] rounded-xl px-2.5 py-1.5 flex items-center gap-2 text-[11px] font-bold text-[#3F3F46]"
                      >
                        <AppIcon name={b.icon} size={14} className="text-[#8DBF43]" />
                        <span>{b.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action CTA Buttons */}
                  <div className="space-y-2 pt-2">
                    <button
                      id="maya-request-borrow-btn"
                      className="w-full py-2.5 bg-[#18181B] hover:bg-[#27272A] text-white font-bold text-xs rounded-xl transition-all shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Request to Borrow</span>
                      <AppIcon name="arrow-right" size={14} />
                    </button>
                    <button
                      id="maya-send-message-btn"
                      className="w-full py-2.5 bg-[#8DBF43] hover:bg-[#7EAC3B] text-[#18181B] font-bold text-xs rounded-xl transition-all shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Send Message</span>
                      <AppIcon name="arrow-right" size={14} />
                    </button>
                  </div>
                </div>

                {/* ─── RIGHT COLUMN: Exchange History, Reviews & Checklist */}
                <div className="lg:col-span-7 space-y-6">
                  {/* 1. Exchange History */}
                  <div className="bg-white rounded-3xl border border-[#F0EAE0] p-6 shadow-2xs">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-base font-bold text-[#18181B]">
                        Exchange History
                      </h4>
                      <button className="text-xs font-semibold text-[#16A34A] hover:underline">
                        View all
                      </button>
                    </div>

                    <div className="space-y-3">
                      {publicProfileMaya.exchangeHistory.map((ex, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between gap-3 p-2.5 rounded-2xl hover:bg-[#FBF7F0] transition-colors border border-transparent hover:border-[#F0EAE0]"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-10 h-10 rounded-xl bg-[#F4EFE6] flex items-center justify-center text-[#52525B] flex-shrink-0">
                              <AppIcon name={ex.icon} size={18} />
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-[#18181B] truncate">
                                {ex.item}
                              </p>
                              <p className="text-[11px] text-[#71717A] truncate">
                                {ex.detail}
                              </p>
                            </div>
                          </div>

                          <span
                            className={`text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap ${
                              ex.statusType === "success"
                                ? "bg-[#DCFCE7] text-[#15803D]"
                                : ex.statusType === "warning"
                                ? "bg-[#FEF3C7] text-[#D97706]"
                                : "bg-[#DBEAFE] text-[#1D4ED8]"
                            }`}
                          >
                            {ex.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 2. Ratings & Reviews */}
                  <div className="bg-white rounded-3xl border border-[#F0EAE0] p-6 shadow-2xs">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-base font-bold text-[#18181B] flex items-center gap-2">
                        <span>Ratings &amp; Reviews</span>
                      </h4>
                      <div className="flex items-center gap-1">
                        <span className="text-base font-black text-[#18181B]">4.9</span>
                        <div className="flex items-center text-amber-400">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <AppIcon key={s} name="star" size={13} className="fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <span className="text-xs text-[#71717A] ml-1">38 ratings</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {publicProfileMaya.ratingsReviews.map((rev, idx) => (
                        <div key={idx} className="bg-[#FBF7F0] rounded-2xl p-3 text-xs space-y-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className={`w-6 h-6 rounded-full ${rev.avatarBg} flex items-center justify-center text-[10px] font-bold`}>
                                {rev.initials}
                              </div>
                              <span className="font-bold text-[#18181B]">{rev.name}</span>
                              <div className="flex items-center text-amber-400">
                                {[...Array(rev.rating)].map((_, i) => (
                                  <AppIcon key={i} name="star" size={10} className="fill-amber-400 text-amber-400" />
                                ))}
                              </div>
                            </div>
                            <span className="text-[10px] text-[#A1A1AA]">{rev.date}</span>
                          </div>
                          <p className="text-[11px] text-[#52525B] pl-8">
                            &quot;{rev.comment}&quot;
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 3. Verification Checklist */}
                  <div className="bg-white rounded-3xl border border-[#F0EAE0] p-6 shadow-2xs">
                    <h4 className="text-base font-bold text-[#18181B] mb-3">
                      Verification Checklist
                    </h4>
                    <div className="space-y-2.5 text-xs">
                      {publicProfileMaya.verificationChecklist.map((chk, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-[#3F3F46] font-semibold">
                            <span className="w-4 h-4 rounded-full bg-[#16A34A] text-white flex items-center justify-center">
                              <AppIcon name="check" size={10} />
                            </span>
                            <span>{chk.label}</span>
                          </div>
                          <span className="text-[11px] text-[#A1A1AA] font-medium">
                            {chk.date}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
