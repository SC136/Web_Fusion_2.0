"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  adminOverviewStats,
  adminOverdueReturns,
  adminRecentDisputes,
  adminRecentApprovals,
} from "@/app/data/mockData";
import { AppIcon } from "@/app/components/dashboard/Icons";

const adminNavItems = [
  { label: "Dashboard", icon: "home", active: true },
  { label: "Users", icon: "users" },
  { label: "Resources", icon: "package" },
  { label: "Exchanges", icon: "repeat" },
  { label: "Approvals", icon: "check-check" },
  { label: "Overdue Returns", icon: "clock" },
  { label: "Disputes & Reports", icon: "alert-circle" },
  { label: "Transactions & Fees", icon: "banknote" },
  { label: "Analytics", icon: "leaf" },
  { label: "Settings", icon: "settings" },
  { label: "Logs", icon: "file-text" },
  { label: "Support", icon: "info" },
];

export default function AdminPage() {
  const [viewMode, setViewMode] = useState<"dashboard" | "login">("dashboard");
  const [selectedNav, setSelectedNav] = useState("Dashboard");
  const [timeRange, setTimeRange] = useState("May 20 - May 26, 2025");
  const [searchQuery, setSearchQuery] = useState("");

  // Login form state
  const [username, setUsername] = useState("admin@campuscircular.edu");
  const [password, setPassword] = useState("••••••••");

  return (
    <div className="min-h-screen bg-[#FBF7F0] text-[#18181B] flex flex-col select-none">
      {viewMode === "login" ? (
        /* ══════════════════════════════════════════════════════════
           VIEW 1: ADMIN LOGIN VIEW
           ══════════════════════════════════════════════════════════ */
        <div className="flex-1 flex flex-col items-center justify-center p-6 relative min-h-screen overflow-hidden">
          {/* Logo at top left */}
          <Link href="/" className="absolute top-8 left-8 flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#3B82F6] via-[#10B981] to-[#84CC16] p-[2px] flex items-center justify-center shadow-xs">
              <div className="w-full h-full bg-[#FBF7F0] rounded-full flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                </svg>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-black tracking-tight text-[#18181B] leading-none">CAMPUS</span>
              <span className="text-[11px] font-black tracking-tight text-[#18181B] leading-none">CIRCULAR</span>
            </div>
          </Link>

          {/* Center Login Container */}
          <div className="w-full max-w-sm flex flex-col items-center">
            {/* Logo */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#3B82F6] via-[#10B981] to-[#84CC16] p-[2.5px] flex items-center justify-center mb-3">
              <div className="w-full h-full bg-[#FBF7F0] rounded-full flex items-center justify-center">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                </svg>
              </div>
            </div>

            {/* Title */}
            <div className="relative mb-6 text-center">
              <h1
                className="text-2xl sm:text-3xl font-bold text-[#18181B]"
                style={{ fontFamily: "'Pixelify Sans', monospace" }}
              >
                Admin Login
              </h1>
              <svg className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-24" height="6" viewBox="0 0 100 6" fill="none">
                <path d="M2 3.5C25 1.5 75 1.5 98 4" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </div>

            {/* Form Card */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setViewMode("dashboard");
              }}
              className="w-full bg-white rounded-3xl border border-[#EDE8C8] p-6 shadow-md space-y-4"
            >
              {/* Username Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#9CA3AF]">
                  <AppIcon name="user" size={17} />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Admin Username or Email"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-[#E5E7EB] rounded-2xl text-xs sm:text-sm text-[#18181B] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#84CC16]"
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#9CA3AF]">
                  <AppIcon name="shield-check" size={17} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-[#E5E7EB] rounded-2xl text-xs sm:text-sm text-[#18181B] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#84CC16]"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-[#18181B] hover:bg-[#27272A] text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <span>Enter Admin Panel</span>
                <span className="text-base">→</span>
              </button>

              {/* Forgot Password */}
              <div className="text-center pt-1">
                <button
                  type="button"
                  className="text-xs text-[#71717A] hover:text-[#18181B] hover:underline cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>
            </form>
          </div>

          {/* Mascot in blue coat typing on laptop at bottom left */}
          <div className="absolute left-6 bottom-4 hidden lg:flex items-end gap-3 pointer-events-none">
            <div className="relative w-44 h-44">
              <Image
                src="/mascots/admin_laptop.png"
                alt="Admin Laptop Mascot"
                fill
                className="object-contain object-bottom"
              />
            </div>
            {/* Speech Bubble */}
            <div className="bg-[#D1E7B7] text-[#1E4E1C] border border-[#B8D996] px-3.5 py-2 rounded-2xl rounded-bl-none text-xs font-bold shadow-xs -mb-3">
              Let&apos;s keep the campus circular! 💻
            </div>
          </div>
        </div>
      ) : (
        /* ══════════════════════════════════════════════════════════
           VIEW 2: ADMIN DASHBOARD PANEL
           ══════════════════════════════════════════════════════════ */
        <div className="flex-1 flex min-h-screen">
          {/* ─── ADMIN LEFT SIDEBAR ─────────────────────────────── */}
          <aside className="w-[210px] lg:w-[230px] border-r border-[#EDE8C8] bg-[#FDF8EE] p-4 flex flex-col justify-between hidden md:flex flex-shrink-0 sticky top-0 h-screen overflow-hidden">
            {/* Top Logo */}
            <div>
              <Link href="/" className="flex items-center gap-2.5 mb-6 group">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#3B82F6] via-[#10B981] to-[#84CC16] p-[2px] flex items-center justify-center shadow-xs">
                  <div className="w-full h-full bg-[#FDF8EE] rounded-full flex items-center justify-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                    </svg>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-black tracking-tight text-[#18181B] leading-none">CAMPUS</span>
                  <span className="text-[11px] font-black tracking-tight text-[#18181B] leading-none">CIRCULAR</span>
                </div>
              </Link>

              {/* Navigation items */}
              <nav className="space-y-0.5">
                {adminNavItems.map((item) => {
                  const isActive = selectedNav === item.label;
                  return (
                    <button
                      key={item.label}
                      onClick={() => setSelectedNav(item.label)}
                      className={`w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all text-left cursor-pointer ${
                        isActive
                          ? "bg-[#D9EBBF] text-[#244E15] shadow-2xs font-bold"
                          : "text-[#4B5563] hover:bg-white/80 hover:text-[#18181B]"
                      }`}
                    >
                      <AppIcon
                        name={item.icon}
                        size={16}
                        className={isActive ? "text-[#244E15]" : "text-[#6B7280]"}
                      />
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Logout button at bottom */}
            <div className="pt-3 border-t border-[#EDE8C8]">
              <button
                onClick={() => setViewMode("login")}
                className="w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold text-[#DC2626] hover:bg-[#FEE2E2]/60 rounded-xl transition-colors cursor-pointer"
              >
                <AppIcon name="logout" size={16} className="text-[#DC2626]" />
                <span>Logout</span>
              </button>
            </div>
          </aside>

          {/* ─── MAIN ADMIN CONTENT AREA ────────────────────────── */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Admin Header */}
            <header className="h-16 px-6 lg:px-8 border-b border-[#EDE8C8] bg-[#FDFBF7] flex items-center justify-between gap-4 sticky top-0 z-30 flex-shrink-0">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#9CA3AF]">
                  <AppIcon name="search" size={16} />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search anything..."
                  className="w-full pl-10 pr-4 py-2 bg-white border border-[#E5E7EB] rounded-2xl text-xs sm:text-sm text-[#18181B] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#84CC16]"
                />
              </div>

              {/* Right Admin Profile & Notifications */}
              <div className="flex items-center gap-3.5">
                {/* Notification Bell with red badge */}
                <button className="w-9 h-9 rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center text-[#4B5563] relative hover:bg-[#F9FAFB] transition-colors cursor-pointer shadow-2xs">
                  <AppIcon name="bell" size={17} />
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#EF4444] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                    8
                  </span>
                </button>

                {/* Admin User Badge */}
                <div className="flex items-center gap-2 pl-2 border-l border-[#EDE8C8]">
                  <div className="w-9 h-9 rounded-full overflow-hidden relative bg-amber-100 border border-[#E5E7EB] flex-shrink-0">
                    <Image
                      src="/mascots/blue_dress_hat.png"
                      alt="Super Admin"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-xs font-bold text-[#18181B] leading-tight">Admin</p>
                    <p className="text-[10px] text-[#71717A] leading-tight">Super Admin</p>
                  </div>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#71717A]">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
              </div>
            </header>

            {/* Admin Body Content */}
            <main className="flex-1 p-5 lg:p-7 space-y-6 overflow-y-auto relative">
              {/* Title & Date Range Filter */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="relative">
                  <h1
                    className="text-2xl sm:text-3xl font-bold text-[#18181B]"
                    style={{ fontFamily: "'Pixelify Sans', monospace" }}
                  >
                    Admin Panel
                  </h1>
                  <svg className="absolute -bottom-1.5 left-0 w-28" height="6" viewBox="0 0 100 6" fill="none">
                    <path d="M2 3.5C25 1.5 75 1.5 98 4" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </div>

                {/* Date Dropdown */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-[#E5E7EB] rounded-xl text-xs font-semibold text-[#374151] shadow-2xs cursor-pointer hover:bg-[#F9FAFB]">
                  <span>{timeRange}</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
              </div>

              {/* ─── 1. OVERVIEW METRICS (4 CARDS) ──────────────────── */}
              <div>
                <h2 className="text-sm font-bold text-[#18181B] mb-3">Overview</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                  {adminOverviewStats.map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-white rounded-3xl border border-[#EDE8C8] p-4 shadow-2xs hover:shadow-xs transition-shadow"
                    >
                      <div className="flex items-center gap-3 mb-2.5">
                        <div
                          className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: stat.bgColor, color: stat.iconColor }}
                        >
                          <AppIcon name={stat.icon} size={20} />
                        </div>
                        <div>
                          <p className="text-xs text-[#6B7280] font-medium leading-tight">{stat.label}</p>
                          <p className="text-2xl font-black text-[#18181B]">{stat.value}</p>
                        </div>
                      </div>
                      <p className="text-[11px] text-[#16A34A] font-semibold flex items-center gap-1">
                        {stat.change}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ─── 2. CHARTS ROW (Exchanges Over Time + Resource Status) */}
              <div className="grid grid-cols-1 xl:grid-cols-[1.5fr_1fr] gap-5">
                {/* Left Chart: Exchanges Over Time */}
                <div className="bg-white rounded-3xl border border-[#EDE8C8] p-5 shadow-2xs flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-[#18181B]">Exchanges Over Time</h3>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg text-xs font-medium text-[#4B5563] cursor-pointer">
                      <span>This Week</span>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </div>
                  </div>

                  {/* SVG Wavy Line Chart */}
                  <div className="h-44 w-full relative">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 500 160" preserveAspectRatio="none">
                      {/* Grid Lines */}
                      <line x1="0" y1="0" x2="500" y2="0" stroke="#F3F4F6" strokeDasharray="3 3" />
                      <line x1="0" y1="40" x2="500" y2="40" stroke="#F3F4F6" strokeDasharray="3 3" />
                      <line x1="0" y1="80" x2="500" y2="80" stroke="#F3F4F6" strokeDasharray="3 3" />
                      <line x1="0" y1="120" x2="500" y2="120" stroke="#F3F4F6" strokeDasharray="3 3" />
                      <line x1="0" y1="160" x2="500" y2="160" stroke="#E5E7EB" />

                      {/* Area Fill */}
                      <path
                        d="M 0 160 L 0 115 C 40 100, 70 80, 83 95 C 120 110, 140 70, 166 65 C 210 60, 230 45, 250 50 C 290 55, 310 30, 333 35 C 370 40, 390 60, 416 55 C 450 50, 480 20, 500 20 L 500 160 Z"
                        fill="url(#greenGradient)"
                        opacity="0.25"
                      />

                      {/* Curve Line */}
                      <path
                        d="M 0 115 C 40 100, 70 80, 83 95 C 120 110, 140 70, 166 65 C 210 60, 230 45, 250 50 C 290 55, 310 30, 333 35 C 370 40, 390 60, 416 55 C 450 50, 480 20, 500 20"
                        fill="none"
                        stroke="#84CC16"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />

                      {/* Dots */}
                      {[
                        { cx: 0, cy: 115 },
                        { cx: 83, cy: 95 },
                        { cx: 166, cy: 65 },
                        { cx: 250, cy: 50 },
                        { cx: 333, cy: 35 },
                        { cx: 416, cy: 55 },
                        { cx: 500, cy: 20 },
                      ].map((dot, i) => (
                        <circle
                          key={i}
                          cx={dot.cx}
                          cy={dot.cy}
                          r="4.5"
                          fill="#84CC16"
                          stroke="white"
                          strokeWidth="2"
                        />
                      ))}

                      <defs>
                        <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#84CC16" />
                          <stop offset="100%" stopColor="#84CC16" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>

                  {/* X Axis Labels */}
                  <div className="flex items-center justify-between text-[11px] text-[#9CA3AF] mt-3 font-medium">
                    <span>May 20</span>
                    <span>May 21</span>
                    <span>May 22</span>
                    <span>May 23</span>
                    <span>May 24</span>
                    <span>May 25</span>
                    <span>May 26</span>
                  </div>
                </div>

                {/* Right Chart: Resource Status (Donut) */}
                <div className="bg-white rounded-3xl border border-[#EDE8C8] p-5 shadow-2xs flex flex-col justify-between">
                  <h3 className="text-sm font-bold text-[#18181B] mb-2">Resource Status</h3>
                  <div className="flex items-center justify-center gap-6 py-2">
                    {/* SVG Donut */}
                    <div className="relative w-36 h-36 flex-shrink-0">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                        {/* Background */}
                        <circle cx="18" cy="18" r="14" fill="transparent" stroke="#F3F4F6" strokeWidth="6" />
                        {/* Approved (67%) */}
                        <circle
                          cx="18"
                          cy="18"
                          r="14"
                          fill="transparent"
                          stroke="#84CC16"
                          strokeWidth="6"
                          strokeDasharray="59 100"
                          strokeDashoffset="0"
                        />
                        {/* Pending (17%) */}
                        <circle
                          cx="18"
                          cy="18"
                          r="14"
                          fill="transparent"
                          stroke="#FBBF24"
                          strokeWidth="6"
                          strokeDasharray="15 100"
                          strokeDashoffset="-59"
                        />
                        {/* Rejected (6%) */}
                        <circle
                          cx="18"
                          cy="18"
                          r="14"
                          fill="transparent"
                          stroke="#EF4444"
                          strokeWidth="6"
                          strokeDasharray="5 100"
                          strokeDashoffset="-74"
                        />
                        {/* Flagged (10%) */}
                        <circle
                          cx="18"
                          cy="18"
                          r="14"
                          fill="transparent"
                          stroke="#8B5CF6"
                          strokeWidth="6"
                          strokeDasharray="9 100"
                          strokeDashoffset="-79"
                        />
                      </svg>
                      {/* Center icon */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <AppIcon name="package" size={20} className="text-[#6B7280]" />
                      </div>
                    </div>

                    {/* Donut Legend */}
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between gap-4">
                        <span className="flex items-center gap-2 text-[#4B5563]">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#84CC16]" />
                          Approved
                        </span>
                        <span className="font-bold text-[#18181B]">1,245 <span className="text-[#9CA3AF] font-normal">(67%)</span></span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="flex items-center gap-2 text-[#4B5563]">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#FBBF24]" />
                          Pending
                        </span>
                        <span className="font-bold text-[#18181B]">320 <span className="text-[#9CA3AF] font-normal">(17%)</span></span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="flex items-center gap-2 text-[#4B5563]">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                          Rejected
                        </span>
                        <span className="font-bold text-[#18181B]">120 <span className="text-[#9CA3AF] font-normal">(6%)</span></span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="flex items-center gap-2 text-[#4B5563]">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]" />
                          Flagged
                        </span>
                        <span className="font-bold text-[#18181B]">179 <span className="text-[#9CA3AF] font-normal">(10%)</span></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ─── 3. OPERATIONS ROW (3 DATA TABLES) ───────────────── */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* 1. Overdue Returns */}
                <div className="bg-white rounded-3xl border border-[#EDE8C8] p-4 shadow-2xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-[#18181B]">Overdue Returns</h3>
                        <span className="px-2 py-0.5 bg-[#FEE2E2] text-[#DC2626] text-[10px] font-bold rounded-full">
                          12
                        </span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {adminOverdueReturns.map((ret) => (
                        <div key={ret.id} className="flex items-center justify-between text-xs py-1 border-b border-[#F9FAFB] last:border-0">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="w-7 h-7 rounded-lg overflow-hidden relative bg-[#F3F4F6] flex-shrink-0">
                              <Image src={ret.image} alt={ret.item} fill className="object-cover" />
                            </div>
                            <div className="min-w-0">
                              <p className="font-bold text-[#18181B] truncate text-[11.5px]">{ret.item}</p>
                              <p className="text-[10px] text-[#71717A] truncate">{ret.borrower} • {ret.dept}</p>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0 ml-2">
                            <p className="text-[10px] text-[#9CA3AF]">{ret.dueDate}</p>
                            <p className="text-[11px] font-bold text-[#DC2626]">{ret.overdueBy}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button className="text-xs font-bold text-[#18181B] hover:text-[#16A34A] text-center pt-3 flex items-center justify-center gap-1 cursor-pointer">
                    <span>View All Overdue</span>
                    <span>→</span>
                  </button>
                </div>

                {/* 2. Recent Disputes */}
                <div className="bg-white rounded-3xl border border-[#EDE8C8] p-4 shadow-2xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-[#18181B]">Recent Disputes</h3>
                        <span className="px-2 py-0.5 bg-[#FEF3C7] text-[#D97706] text-[10px] font-bold rounded-full">
                          5
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2.5">
                      {adminRecentDisputes.map((disp) => (
                        <div key={disp.id} className="flex items-center justify-between text-xs py-1 border-b border-[#F9FAFB] last:border-0">
                          <div className="min-w-0 pr-2">
                            <p className="font-semibold text-[#18181B] truncate text-[11.5px]">{disp.issue}</p>
                            <p className="text-[10px] text-[#71717A]">{disp.reportedBy}</p>
                          </div>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${disp.statusColor}`}>
                            {disp.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button className="text-xs font-bold text-[#18181B] hover:text-[#16A34A] text-center pt-3 flex items-center justify-center gap-1 cursor-pointer">
                    <span>View All Disputes</span>
                    <span>→</span>
                  </button>
                </div>

                {/* 3. Recent Approvals */}
                <div className="bg-white rounded-3xl border border-[#EDE8C8] p-4 shadow-2xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-[#18181B]">Recent Approvals</h3>
                        <span className="px-2 py-0.5 bg-[#DCFCE7] text-[#15803D] text-[10px] font-bold rounded-full">
                          7
                        </span>
                      </div>
                    </div>
                    <div className="space-y-2.5">
                      {adminRecentApprovals.map((app) => (
                        <div key={app.id} className="flex items-center justify-between text-xs py-1 border-b border-[#F9FAFB] last:border-0">
                          <div className="flex items-center gap-2 min-w-0">
                            <div className="w-6 h-6 rounded-md bg-[#F3F4F6] flex items-center justify-center text-[#4B5563] flex-shrink-0">
                              <AppIcon name={app.icon} size={13} />
                            </div>
                            <div className="min-w-0">
                              <p className="font-semibold text-[#18181B] truncate text-[11.5px]">{app.item}</p>
                              <p className="text-[10px] text-[#71717A] truncate">{app.owner}</p>
                            </div>
                          </div>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#DCFCE7] text-[#15803D] flex-shrink-0">
                            {app.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button className="text-xs font-bold text-[#18181B] hover:text-[#16A34A] text-center pt-3 flex items-center justify-center gap-1 cursor-pointer">
                    <span>View All Approvals</span>
                    <span>→</span>
                  </button>
                </div>
              </div>

              {/* Green Robot Mascot with Speech Bubble (Bottom Right) */}
              <div className="fixed right-6 bottom-4 hidden xl:flex items-end gap-2.5 pointer-events-none z-20">
                {/* Speech Bubble */}
                <div className="bg-[#60A5FA] text-white font-bold text-[11px] px-3 py-1.5 rounded-2xl rounded-br-none shadow-md mb-24 animate-bounce">
                  All systems under control! 🛡️
                </div>
                <div className="relative w-28 h-36">
                  <Image
                    src="/mascots/admin_robot.png"
                    alt="System Robot Mascot"
                    fill
                    className="object-contain object-bottom drop-shadow-md"
                  />
                </div>
              </div>
            </main>
          </div>
        </div>
      )}
    </div>
  );
}
