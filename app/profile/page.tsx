"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AppIcon } from "@/app/components/dashboard/Icons";
import AppNavbar from "@/app/components/layout/AppNavbar";
import Sidebar from "@/app/components/dashboard/Sidebar";
import { useApp } from "@/app/context/AppContext";

export default function ProfilePage() {
  const { currentUser, allUsers, switchUser } = useApp();
  const [activeTab, setActiveTab] = useState<"dashboard" | "public">("dashboard");

  // ── Derived profile data from live currentUser ──────────────────────────
  const profileUser = {
    metrics: [
      {
        label: "Successful Exchanges",
        value: currentUser.successfulExchanges,
        icon: "package",
        bgColor: "#DCFCE7",
        color: "#15803D",
        cardBg: "#F0FDF4",
        cardBorder: "#BBF7D0",
      },
      {
        label: "Trust Score",
        value: `${currentUser.trustScore}/5`,
        icon: "shield-check",
        bgColor: "#D1FAE5",
        color: "#065F46",
        cardBg: "#F0FDF4",
        cardBorder: "#6EE7B7",
      },
      {
        label: "Reviews Received",
        value: currentUser.reviewsCount,
        icon: "star",
        bgColor: "#FEF3C7",
        color: "#B45309",
        cardBg: "#FFFBEB",
        cardBorder: "#FDE68A",
      },
      {
        label: "Late Returns",
        value: currentUser.lateReturns,
        icon: "clock",
        bgColor: "#FEE2E2",
        color: "#B91C1C",
        cardBg: "#FFF5F5",
        cardBorder: "#FCA5A5",
      },
      {
        label: "CO₂ Saved (kg)",
        value: currentUser.co2Saved,
        icon: "leaf",
        bgColor: "#D1FAE5",
        color: "#166534",
        cardBg: "#F0FDF4",
        cardBorder: "#BBF7D0",
      },
    ],
    reviews: [
      {
        id: "r1",
        name: "Aarav Mehta",
        initials: "AM",
        avatarBg: "bg-amber-100 text-amber-800",
        role: "Lender",
        rating: 5,
        date: "Aug 27, 2026",
        comment: `${currentUser.name} handled the gear with care and returned it right on time. Highly recommended!`,
      },
      {
        id: "r2",
        name: "Kabir Singh",
        initials: "KS",
        avatarBg: "bg-blue-100 text-blue-800",
        role: "Borrower",
        rating: 5,
        date: "Aug 22, 2026",
        comment: "Super smooth handover, clear communication, and the item was in perfect shape.",
      },
      {
        id: "r3",
        name: "Maya Ortiz",
        initials: "MO",
        avatarBg: "bg-purple-100 text-purple-800",
        role: "Lender",
        rating: 5,
        date: "Aug 18, 2026",
        comment: "Returned well before deadline with everything packed. A model borrower on campus!",
      },
    ],
    breakdown: [
      { label: "On-Time Returns", score: "5.0 / 5", progress: 100 },
      { label: "Item Condition", score: "4.9 / 5", progress: 98 },
      { label: "Communication", score: "4.8 / 5", progress: 96 },
      { label: "Escrow Compliance", score: "5.0 / 5", progress: 100 },
    ],
  };

  // ── Public profile data (uses currentUser but styled as a peer view) ─────
  const publicProfileMaya = {
    name: currentUser.fullName,
    department: currentUser.department,
    year: currentUser.year,
    memberSince: "Member since Aug 2024",
    trustScore: currentUser.trustScore,
    rank: "Top 5% on Campus",
    stats: {
      exchanges: currentUser.successfulExchanges,
      rating: currentUser.trustScore,
      lateReturns: currentUser.lateReturns,
      disputes: currentUser.disputes,
    },
    ratingDistribution: [
      { stars: 5, percentage: 88, count: 25 },
      { stars: 4, percentage: 10, count: 3 },
      { stars: 3, percentage: 2, count: 1 },
      { stars: 2, percentage: 0, count: 0 },
      { stars: 1, percentage: 0, count: 0 },
    ],
    badges: [
      { label: "Top Sharer", icon: "trophy" },
      { label: "Eco Champion", icon: "leaf" },
      { label: "100% On-Time", icon: "clock" },
      { label: "Zero Disputes", icon: "shield-check" },
    ],
    exchangeHistory: [
      { icon: "package", item: "Canon EOS 80D Camera Kit", detail: "Lent to Anaya Sharma • 3 days", status: "Returned On-Time", statusType: "success" },
      { icon: "book", item: "Thomas Calculus 14th Ed.", detail: "Lent to Kabir Singh • 5 days", status: "Returned On-Time", statusType: "success" },
      { icon: "zap", item: "Sony WH-1000XM4 Headphones", detail: "Borrowed from Maya Ortiz • 2 days", status: "Active Borrow", statusType: "info" },
    ],
    ratingsReviews: [
      { initials: "AS", avatarBg: "bg-emerald-100 text-emerald-800", name: "Anaya Sharma", date: "Aug 27, 2026", rating: 5, comment: "Aarav was super helpful! The camera was in pristine shape." },
      { initials: "KS", avatarBg: "bg-blue-100 text-blue-800", name: "Kabir Singh", date: "Aug 22, 2026", rating: 5, comment: "Great lender — clear instructions, fast response, and fair pricing." },
    ],
    verificationChecklist: [
      { label: "Campus Email Verified", date: "Aug 2024" },
      { label: "Student ID Verified", date: "Aug 2024" },
      { label: "Escrow Account Active", date: "Sep 2024" },
      { label: "Zero Dispute History", date: "Ongoing" },
    ],
  };

  return (
    <div className="min-h-screen bg-[#FEFEFE] text-[#18181B] select-none flex flex-col">
      {/* ─── FULL-WIDTH CONTINUOUS TOP NAVBAR ─────────────── */}
      <AppNavbar variant="auth" />

      {/* ─── MAIN BODY (Sidebar + Content) ─────────────────── */}
      <div className="flex-1 flex w-full">
        {/* ─── UNIFIED MASTER LEFT SIDEBAR (Desktop) ────────── */}
        <Sidebar />

        {/* ─── MAIN AREA ────────────────────────────────────── */}
        <div className="flex-1 lg:ml-[240px] flex flex-col min-w-0">
          {/* ─── CENTER PROFILE CONTENT ─────────────────────── */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-h-[calc(100vh-64px)] bg-[#FEFEFE]">
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
                My Trust Profile ({currentUser.name})
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
              <div className="bg-white rounded-3xl border border-[#EDE8C8] p-6 lg:p-7 shadow-xs relative overflow-hidden flex flex-col xl:flex-row items-center justify-between gap-6">
                {/* Left Side: Avatar + Details + Bio + Action Pills */}
                <div className="flex-1 flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left z-10 min-w-0">
                  {/* Large Circular Avatar */}
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden bg-gradient-to-b from-[#E0F2FE] to-[#BAE6FD] border-4 border-white shadow-md flex-shrink-0">
                    <Image
                      src={currentUser.avatar || "/mascots/blue_dress_hat.png"}
                      alt={currentUser.fullName}
                      fill
                      className="object-cover object-top scale-115 translate-y-1"
                      priority
                    />
                    <div className="absolute bottom-1 right-1 w-4 h-4 bg-[#16A34A] rounded-full border-2 border-white shadow-xs" title="Active on Campus" />
                  </div>

                  <div className="space-y-2 flex-1 min-w-0">
                    {/* Name + Department */}
                    <div>
                      <div className="flex items-center justify-center sm:justify-start gap-2">
                        <h2 className="text-xl sm:text-2xl font-bold text-[#18181B]">
                          {currentUser.fullName}
                        </h2>
                      </div>
                      <p className="text-xs sm:text-[13px] font-semibold text-[#52525B] mt-0.5">
                        {currentUser.department} • {currentUser.year}
                      </p>
                    </div>

                    {/* Location & Meta Badges */}
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-xs text-[#71717A]">
                      <span className="flex items-center gap-1 bg-[#F9FAFB] border border-[#E5E7EB] px-2.5 py-1 rounded-lg font-medium text-[11.5px]">
                        <AppIcon name="map-pin" size={12} className="text-[#9CA3AF]" />
                        <span>{currentUser.location}</span>
                      </span>
                      <span className="flex items-center gap-1 bg-[#F9FAFB] border border-[#E5E7EB] px-2.5 py-1 rounded-lg font-medium text-[11.5px]">
                        <AppIcon name="calendar" size={12} className="text-[#9CA3AF]" />
                        <span>Member since Aug 2024</span>
                      </span>
                    </div>

                    {/* Verification Badges */}
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-0.5">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#DCFCE7] text-[#15803D] border border-[#BBF7D0]">
                        <AppIcon name="check" size={11} />
                        <span>ID Verified</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#DBEAFE] text-[#1D4ED8] border border-[#BFDBFE]">
                        <AppIcon name="check" size={11} />
                        <span>College Email Verified</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#FEF3C7] text-[#B45309] border border-[#FDE68A]">
                        <AppIcon name="shield-check" size={12} />
                        <span>Top Sharer</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Middle / Center: Trust Score & Quick Activity Stats */}
                <div className="border-t xl:border-t-0 xl:border-l xl:border-r border-[#EDE8C8] pt-4 xl:pt-0 xl:px-6 flex flex-col sm:flex-row items-center gap-5 z-10">
                  {/* Trust Score Box */}
                  <div className="bg-[#F5F8E9] border border-[#D8E8B8] rounded-2xl p-4 flex flex-col items-center text-center shadow-2xs min-w-[140px]">
                    <span className="text-[10.5px] font-bold text-[#2E5E1C] uppercase tracking-wider mb-1">
                      Trust Score
                    </span>
                    <div className="flex items-baseline gap-1 my-0.5">
                      <span className="text-3xl font-extrabold text-[#18181B] leading-none">
                        {currentUser.trustScore}
                      </span>
                      <span className="text-xs text-[#71717A] font-bold">/ 5</span>
                    </div>
                    <span className="text-[10px] font-bold text-[#166534] bg-[#DCFCE7] px-2.5 py-0.5 rounded-full my-1">
                      Excellent Tier
                    </span>
                    <div className="flex items-center gap-0.5 text-amber-400 my-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <AppIcon key={s} name="star" size={13} className="fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[10px] text-[#71717A] font-medium mt-0.5">
                      {currentUser.reviewsCount} reviews
                    </span>
                  </div>

                  {/* Highlights Mini Stats */}
                  <div className="space-y-2 text-xs min-w-[150px]">
                    <div className="bg-[#FEFCF6] border border-[#F4E8CB] p-2 rounded-xl flex items-center gap-2.5">
                      <AppIcon name="zap" size={16} className="text-[#F59E0B]" />
                      <div>
                        <p className="text-[10px] text-[#78716C] font-semibold">Response Time</p>
                        <p className="text-xs font-bold text-[#18181B]">&lt; 15 mins</p>
                      </div>
                    </div>
                    <div className="bg-[#FEFCF6] border border-[#F4E8CB] p-2 rounded-xl flex items-center gap-2.5">
                      <AppIcon name="trophy" size={16} className="text-[#84CC16]" />
                      <div>
                        <p className="text-[10px] text-[#78716C] font-semibold">Campus Rank</p>
                        <p className="text-xs font-bold text-[#18181B]">Top 5% on Campus</p>
                      </div>
                    </div>
                    <div className="bg-[#FEFCF6] border border-[#F4E8CB] p-2 rounded-xl flex items-center gap-2.5">
                      <AppIcon name="leaf" size={16} className="text-[#16A34A]" />
                      <div>
                        <p className="text-[10px] text-[#78716C] font-semibold">CO₂ Saved</p>
                        <p className="text-xs font-bold text-[#18181B]">{currentUser.co2Saved} kg CO₂</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Far Right: Clean Mascot with Friendly Speech Bubble */}
                <div className="relative flex flex-col items-center justify-end flex-shrink-0 z-0 pl-2">
                  <div className="mb-2 bg-[#FFF9EA] border border-[#F4E8CB] px-3 py-1.5 rounded-xl text-[11px] font-bold text-[#78350F] shadow-2xs relative max-w-[170px] text-center">
                    <span>100% on-time returns!</span>
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#FFF9EA] border-r border-b border-[#F4E8CB] rotate-45" />
                  </div>
                  <div className="relative w-32 h-36 lg:w-36 lg:h-40 flex-shrink-0">
                    <Image
                      src="/mascots/mascot_character.png"
                      alt="Profile mascot"
                      fill
                      className="object-contain object-bottom scale-105 select-none pointer-events-none"
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* Middle Metrics Row (5 Distinct Pastel Cards) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                {profileUser.metrics.map((m) => (
                  <div
                    key={m.label}
                    style={{ backgroundColor: m.cardBg, borderColor: m.cardBorder }}
                    className="rounded-2xl border p-4 flex items-center gap-3.5 shadow-2xs hover:shadow-xs transition-shadow"
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
                      <p className="text-[11px] font-semibold text-[#52525B] leading-tight">
                        {m.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Two Columns: Recent Reviews & Trust Breakdown */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 1. Recent Reviews */}
                <div className="bg-white rounded-3xl border border-[#EDE8C8] p-6 shadow-2xs flex flex-col justify-between">
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

                  <div className="pt-5 mt-4 border-t border-[#EDE8C8] flex justify-end">
                    <button
                      id="view-all-reviews-btn"
                      className="px-4 py-2 bg-[#6F9535] hover:bg-[#5E802B] text-white font-bold text-xs rounded-full transition-all shadow-2xs hover:shadow-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>View All Reviews</span>
                      <AppIcon name="arrow-right" size={13} />
                    </button>
                  </div>
                </div>

                {/* 2. Trust Breakdown */}
                <div className="bg-white rounded-3xl border border-[#EDE8C8] p-6 shadow-2xs flex flex-col justify-between">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#18181B] mb-5">
                      Trust Breakdown
                    </h3>
                    <div className="space-y-4">
                      {profileUser.breakdown.map((item) => (
                        <div key={item.label}>
                          <div className="flex items-center justify-between text-xs font-semibold text-[#18181B] mb-1.5">
                            <span>{item.label}</span>
                            <span className="font-bold text-[#2E5E1C]">{item.score}</span>
                          </div>
                          <div className="w-full h-2.5 bg-[#F5F8E9] border border-[#D8E8B8] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[#84CC16] to-[#16A34A] rounded-full transition-all duration-500"
                              style={{ width: `${item.progress}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-5 mt-4 border-t border-[#EDE8C8] flex justify-end">
                    <button
                      id="how-trust-works-btn"
                      className="px-4 py-2 bg-[#6F9535] hover:bg-[#5E802B] text-white font-bold text-xs rounded-full transition-all shadow-2xs hover:shadow-xs flex items-center gap-1.5 cursor-pointer"
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
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-[#EDE8C8]">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F5F8E9] border border-[#D8E8B8] rounded-full text-xs font-bold text-[#2E5E1C] mb-2.5 shadow-2xs">
                    <span>TRUST &amp; COMMUNITY LEDGER</span>
                    <span>✦</span>
                  </div>
                  <h2
                    className="text-2xl sm:text-4xl font-extrabold text-[#18181B] tracking-tight leading-tight"
                    style={{ fontFamily: "'Pixelify Sans', monospace" }}
                  >
                    Borrow from people you can actually trust.
                  </h2>
                  <p className="text-xs sm:text-sm text-[#52525B] font-medium max-w-2xl mt-1.5">
                    Real-time verification badges, peer-vouched trust ratings, and transparent exchange histories for every campus member.
                  </p>
                </div>

                {/* Public View Status Pill */}
                <div className="flex items-center gap-2 bg-[#FEFAEE] border border-[#EDE8C8] px-4 py-2 rounded-2xl text-xs font-bold text-[#78350F] shadow-2xs flex-shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A]" />
                  <span>Public View Active</span>
                </div>
              </div>

              {/* 2-Column Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* ─── LEFT COLUMN: Member Profile Card ─────────── */}
                <div className="lg:col-span-5 bg-white rounded-3xl border border-[#EDE8C8] p-6 lg:p-7 shadow-2xs space-y-6">
                  {/* User Header */}
                  <div className="flex items-center gap-4">
                    <div className="relative w-18 h-18 rounded-full overflow-hidden bg-gradient-to-b from-[#E0F2FE] to-[#BAE6FD] border-2 border-white shadow-xs flex-shrink-0 flex items-center justify-center">
                      <Image
                        src="/mascots/mascot_character.png"
                        alt={publicProfileMaya.name}
                        fill
                        className="object-contain object-bottom scale-110 p-0.5"
                        priority
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-xl font-extrabold text-[#18181B]">
                          {publicProfileMaya.name}
                        </h3>
                        <span className="text-[#16A34A] flex items-center" title="Verified Campus Identity">
                          <AppIcon name="shield-check" size={17} />
                        </span>
                      </div>
                      <p className="text-xs text-[#52525B] font-medium mt-0.5">
                        {publicProfileMaya.department} • {publicProfileMaya.year}
                      </p>
                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-[#DCFCE7] text-[#15803D] border border-[#BBF7D0]">
                          <AppIcon name="check" size={11} />
                          <span>Verified Student</span>
                        </span>
                        <span className="text-[10px] text-[#71717A] bg-[#FBF7F0] border border-[#EDE8C8] px-2.5 py-0.5 rounded-full font-medium">
                          {publicProfileMaya.memberSince}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Trust Score Card */}
                  <div className="bg-[#F5F8E9] border border-[#D8E8B8] rounded-2xl p-4 flex items-center justify-between shadow-2xs">
                    <div className="flex items-center gap-3.5">
                      <div className="w-16 h-16 rounded-full border-4 border-[#6F9535] flex flex-col items-center justify-center bg-white shadow-xs">
                        <span className="text-xl font-black text-[#18181B] leading-none">
                          {publicProfileMaya.trustScore}
                        </span>
                        <span className="text-[8px] font-extrabold text-[#6F9535] uppercase tracking-wider mt-0.5">
                          SCORE
                        </span>
                      </div>
                      <div>
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#DCFCE7] text-[#15803D] mb-0.5">
                          {publicProfileMaya.rank}
                        </span>
                        <p className="text-[11.5px] font-semibold text-[#2E5E1C]">
                          100% on-time return rate
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 4 Stat Metrics */}
                  <div className="grid grid-cols-4 gap-2 text-center py-3 border-y border-[#EDE8C8]">
                    <div className="p-1">
                      <p className="text-lg font-black text-[#18181B]">{publicProfileMaya.stats.exchanges}</p>
                      <p className="text-[10px] text-[#71717A] font-semibold">Exchanges</p>
                    </div>
                    <div className="p-1">
                      <p className="text-lg font-black text-[#18181B] flex items-center justify-center gap-0.5">
                        {publicProfileMaya.stats.rating}
                        <AppIcon name="star" size={13} className="fill-amber-400 text-amber-400" />
                      </p>
                      <p className="text-[10px] text-[#71717A] font-semibold">Avg Rating</p>
                    </div>
                    <div className="p-1">
                      <p className="text-lg font-black text-[#18181B]">{publicProfileMaya.stats.lateReturns}</p>
                      <p className="text-[10px] text-[#71717A] font-semibold">Late Returns</p>
                    </div>
                    <div className="p-1">
                      <p className="text-lg font-black text-[#16A34A]">{publicProfileMaya.stats.disputes}</p>
                      <p className="text-[10px] text-[#71717A] font-semibold">Disputes</p>
                    </div>
                  </div>

                  {/* Rating Breakdown Bars */}
                  <div className="space-y-1.5 text-xs bg-[#FDFBF1] p-3.5 rounded-2xl border border-[#EDE8C8]">
                    <p className="text-[11px] font-bold text-[#18181B] mb-2">Rating Distribution</p>
                    {publicProfileMaya.ratingDistribution.map((d) => (
                      <div key={d.stars} className="flex items-center gap-2 text-[11px] text-[#71717A]">
                        <span className="w-5 font-bold text-[#18181B] flex items-center gap-0.5">
                          {d.stars}<AppIcon name="star" size={9} className="text-[#F59E0B]" />
                        </span>
                        <div className="flex-1 h-2 bg-[#EFE9DB] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#6F9535] rounded-full"
                            style={{ width: `${d.percentage}%` }}
                          />
                        </div>
                        <span className="w-5 text-right font-medium">{d.count}</span>
                      </div>
                    ))}
                  </div>

                  {/* Community Badges */}
                  <div className="grid grid-cols-2 gap-2">
                    {publicProfileMaya.badges.map((b) => (
                      <div
                        key={b.label}
                        className="bg-[#FEFAEE] border border-[#EDE8C8] rounded-xl px-3 py-2 flex items-center gap-2 text-[11px] font-bold text-[#3F3F46]"
                      >
                        <AppIcon name={b.icon} size={15} className="text-[#6F9535]" />
                        <span className="truncate">{b.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action CTA Buttons */}
                  <div className="space-y-2.5 pt-1">
                    <Link
                      href="/browse"
                      id="maya-request-borrow-btn"
                      className="w-full py-3 bg-gradient-to-b from-[#7FB634] to-[#689A24] text-white font-bold text-xs sm:text-sm rounded-2xl transition-all shadow-xs hover:from-[#8AC538] hover:to-[#72A627] flex items-center justify-center gap-2 cursor-pointer border-b-2 border-[#557F1C] active:translate-y-0.5"
                    >
                      <span>Browse Maya&apos;s Listings</span>
                      <AppIcon name="arrow-right" size={15} />
                    </Link>
                    <button
                      onClick={() => alert("Connecting you with Maya via encrypted campus chat...")}
                      id="maya-send-message-btn"
                      className="w-full py-3 bg-white hover:bg-[#F9FAFB] text-[#18181B] font-bold text-xs sm:text-sm rounded-2xl transition-all border border-[#E5E7EB] shadow-xs flex items-center justify-center gap-2 cursor-pointer active:translate-y-0.5"
                    >
                      <AppIcon name="message" size={15} />
                      <span>Send Direct Message</span>
                    </button>
                  </div>
                </div>

                {/* ─── RIGHT COLUMN: Exchange Ledger & Reviews ─── */}
                <div className="lg:col-span-7 space-y-6">
                  {/* 1. Exchange Ledger */}
                  <div className="bg-white rounded-3xl border border-[#EDE8C8] p-6 lg:p-7 shadow-2xs">
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#EDE8C8]">
                      <div>
                        <h4 className="text-base font-bold text-[#18181B]">
                          Exchange Ledger
                        </h4>
                        <p className="text-[11px] text-[#71717A]">
                          47 verified handovers with zero escrow disputes
                        </p>
                      </div>
                      <span className="text-xs font-bold text-[#16A34A] bg-[#DCFCE7] px-3 py-1 rounded-full border border-[#BBF7D0]">
                        100% Verified
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      {publicProfileMaya.exchangeHistory.map((ex, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between gap-3 p-3 rounded-2xl bg-[#FDFBF1] hover:bg-[#F8F5E4] transition-all border border-[#EDE8C8]"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-10 h-10 rounded-xl bg-white border border-[#EDE8C8] flex items-center justify-center text-[#18181B] flex-shrink-0 shadow-2xs">
                              <AppIcon name={ex.icon} size={18} />
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs sm:text-[13px] font-bold text-[#18181B] truncate">
                                {ex.item}
                              </p>
                              <p className="text-[11px] text-[#71717A] truncate">
                                {ex.detail}
                              </p>
                            </div>
                          </div>

                          <span
                            className={`text-[10px] sm:text-[11px] font-bold px-3 py-1 rounded-full whitespace-nowrap border ${
                              ex.statusType === "success"
                                ? "bg-[#DCFCE7] text-[#15803D] border-[#BBF7D0]"
                                : ex.statusType === "warning"
                                ? "bg-[#FEF3C7] text-[#D97706] border-[#FDE68A]"
                                : "bg-[#DBEAFE] text-[#1D4ED8] border-[#BFDBFE]"
                            }`}
                          >
                            {ex.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 2. Ratings & Verified Reviews */}
                  <div className="bg-white rounded-3xl border border-[#EDE8C8] p-6 lg:p-7 shadow-2xs">
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#EDE8C8]">
                      <div>
                        <h4 className="text-base font-bold text-[#18181B] flex items-center gap-2">
                          <span>Verified Peer Reviews</span>
                        </h4>
                        <p className="text-[11px] text-[#71717A]">
                          Feedback from fellow students after return inspection
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 bg-[#FEFAEE] border border-[#EDE8C8] px-3 py-1.5 rounded-2xl">
                        <span className="text-sm font-black text-[#18181B]">4.9</span>
                        <div className="flex items-center text-amber-400">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <AppIcon key={s} name="star" size={12} className="fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <span className="text-[11px] text-[#71717A] font-semibold">(38)</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {publicProfileMaya.ratingsReviews.map((rev, idx) => (
                        <div key={idx} className="bg-[#FDFBF1] border border-[#EDE8C8] rounded-2xl p-3.5 text-xs space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                              <div className={`w-7 h-7 rounded-full ${rev.avatarBg} flex items-center justify-center text-[10px] font-bold shadow-2xs`}>
                                {rev.initials}
                              </div>
                              <div>
                                <p className="font-bold text-[#18181B] text-[12px] leading-tight">{rev.name}</p>
                                <p className="text-[10px] text-[#71717A]">{rev.date || "Recent"}</p>
                              </div>
                            </div>
                            <div className="flex items-center text-amber-400">
                              {[...Array(rev.rating)].map((_, i) => (
                                <AppIcon key={i} name="star" size={11} className="fill-amber-400 text-amber-400" />
                              ))}
                            </div>
                          </div>
                          <p className="text-[#374151] text-[11.5px] leading-relaxed pl-9">
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
    </div>
  );
}
