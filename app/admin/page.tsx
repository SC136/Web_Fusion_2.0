"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AppNavbar from "@/app/components/layout/AppNavbar";
import { AppIcon } from "@/app/components/dashboard/Icons";
import {
  adminOverviewStats,
  adminOverdueReturns,
  adminRecentDisputes,
  adminRecentApprovals,
} from "@/app/data/mockData";

const adminNavItems = [
  { label: "Overview", icon: "grid", id: "overview" },
  { label: "User Management", icon: "users", id: "users", badge: "2,348" },
  { label: "Resource Inventory", icon: "package", id: "resources", badge: "1,864" },
  { label: "Active Exchanges", icon: "repeat", id: "exchanges", badge: "534" },
  { label: "Item Approvals", icon: "check-check", id: "approvals", badge: "7", badgeColor: "bg-[#DCFCE7] text-[#15803D]" },
  { label: "Overdue Returns", icon: "clock", id: "overdue", badge: "12", badgeColor: "bg-[#FEE2E2] text-[#DC2626]" },
  { label: "Disputes & Reports", icon: "alert-circle", id: "disputes", badge: "5", badgeColor: "bg-[#FEF3C7] text-[#D97706]" },
  { label: "Escrow & Fees", icon: "banknote", id: "transactions" },
  { label: "Sustainability Audit", icon: "leaf", id: "analytics" },
  { label: "System Settings", icon: "settings", id: "settings" },
];

export default function AdminPage() {
  const [selectedNav, setSelectedNav] = useState("overview");
  const [timeRange, setTimeRange] = useState("May 20 - May 26, 2025");
  const [searchQuery, setSearchQuery] = useState("");
  const [approvalsList, setApprovalsList] = useState(adminRecentApprovals);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleAction = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleApprove = (id: string, name: string) => {
    setApprovalsList((prev) => prev.filter((item) => item.id !== id));
    handleAction(`✓ "${name}" approved and published to Campus Catalog!`);
  };

  const handleReject = (id: string, name: string) => {
    setApprovalsList((prev) => prev.filter((item) => item.id !== id));
    handleAction(`✕ "${name}" listing flagged for student review.`);
  };

  return (
    <div className="min-h-screen bg-[#FBF7F0] text-[#18181B] select-none flex flex-col">
      {/* ─── Master Continuous Top Navbar ─────────────────────── */}
      <AppNavbar variant="auth" />

      {/* ─── Main Body (Sidebar + Content) ─────────────────── */}
      <div className="flex-1 flex w-full">
        {/* ─── Admin Left Sidebar ─────────────────────────────── */}
        <aside className="fixed left-0 top-16 bottom-0 w-[240px] bg-[#FDFBF1] border-r border-[#EDE8C8] flex flex-col z-40 hidden lg:flex select-none">
          {/* Header Tag */}
          <div className="p-4 pb-2 border-b border-[#F0EAE0]">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#6F9535] bg-[#EAF7EE] px-2.5 py-1 rounded-xl flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
                <span>Admin Console</span>
              </span>
              <span className="text-[10px] font-bold text-[#71717A]">v2.4</span>
            </div>
          </div>

          {/* Nav List */}
          <nav className="flex-1 px-3.5 py-3 space-y-1 overflow-y-auto">
            {adminNavItems.map((item) => {
              const isActive = selectedNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedNav(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[13px] transition-all duration-150 text-left cursor-pointer ${
                    isActive
                      ? "bg-[#EAF7EE] text-[#14532D] font-bold shadow-2xs"
                      : "text-[#374151] font-semibold hover:bg-[#F5F2E8] hover:text-[#18181B]"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className={isActive ? "text-[#16A34A]" : "text-[#6B7280]"}>
                      <AppIcon name={item.icon} size={16} />
                    </span>
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full flex-shrink-0 ${
                        item.badgeColor || "bg-[#F3F4F6] text-[#4B5563]"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Exit to Dashboard */}
          <div className="p-3 border-t border-[#EDE8C8] bg-[#FAF7F0]/60">
            <Link
              href="/dashboard"
              className="flex items-center justify-center gap-2 w-full py-2.5 bg-white hover:bg-[#F3EFE3] border border-[#EDE8C8] text-[#18181B] text-xs font-bold rounded-2xl transition-all shadow-2xs cursor-pointer"
            >
              <span>← Back to Student View</span>
            </Link>
          </div>
        </aside>

        {/* ─── Main Admin Content Area ────────────────────────── */}
        <div className="flex-1 lg:ml-[240px] flex flex-col min-w-0 min-h-[calc(100vh-64px)]">
          <main className="flex-1 p-5 sm:p-7 lg:p-8 space-y-6 overflow-y-auto">
            {/* ─── Top Bar & Filter Controls ─────────────────────── */}
            <div className="bg-white rounded-3xl border border-[#EDE8C8] p-5 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2.5">
                  <h1
                    className="text-2xl sm:text-3xl font-black text-[#18181B] tracking-tight"
                    style={{ fontFamily: "'Pixelify Sans', monospace" }}
                  >
                    Admin Command Center
                  </h1>
                  <span className="px-2.5 py-0.5 bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A] text-[10px] font-extrabold rounded-full">
                    Live Escrow Node
                  </span>
                </div>
                <p className="text-xs text-[#71717A] mt-1">
                  Real-time peer moderation, escrow deposits, and equipment custody control
                </p>
              </div>

              {/* Controls */}
              <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
                {/* Search Box */}
                <div className="relative flex-1 md:w-64">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#9CA3AF]">
                    <AppIcon name="search" size={15} />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search users, serials, tickets..."
                    className="w-full pl-9 pr-3 py-2 bg-[#FDFBF1] border border-[#EDE8C8] rounded-2xl text-xs text-[#18181B] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#6F9535]"
                  />
                </div>

                {/* Date Dropdown */}
                <div className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#FDFBF1] border border-[#EDE8C8] rounded-2xl text-xs font-bold text-[#374151] shadow-2xs cursor-pointer hover:bg-[#FAF7F0]">
                  <span>{timeRange}</span>
                  <AppIcon name="chevron-down" size={12} />
                </div>
              </div>
            </div>

            {/* ─── 1. OVERVIEW METRICS (4 3D CARDS) ──────────────── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
              {adminOverviewStats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white rounded-3xl border border-[#EDE8C8] p-5 shadow-2xs hover:shadow-md transition-all relative overflow-hidden group"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-[#6B7280] font-bold">{stat.label}</span>
                    <div
                      className="w-10 h-10 rounded-2xl flex items-center justify-center shadow-2xs transition-transform group-hover:scale-110"
                      style={{ backgroundColor: stat.bgColor, color: stat.iconColor }}
                    >
                      <AppIcon name={stat.icon} size={18} />
                    </div>
                  </div>

                  <p className="text-2xl sm:text-3xl font-black text-[#18181B] tracking-tight">
                    {stat.value}
                  </p>

                  <div className="flex items-center gap-1.5 mt-2.5 pt-2.5 border-t border-[#F5F2E8]">
                    <span className="text-[11px] font-extrabold text-[#16A34A] bg-[#DCFCE7] px-2 py-0.5 rounded-full flex items-center gap-0.5">
                      <span>↑</span>
                      <span>{stat.change}</span>
                    </span>
                    <span className="text-[10.5px] text-[#9CA3AF] font-medium">vs last month</span>
                  </div>
                </div>
              ))}
            </div>

            {/* ─── 2. CHARTS & ANALYTICS ROW ─────────────────────── */}
            <div className="grid grid-cols-1 xl:grid-cols-[1.6fr_1fr] gap-5">
              {/* Left Chart: Exchanges Over Time */}
              <div className="bg-white rounded-3xl border border-[#EDE8C8] p-6 shadow-2xs flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-bold text-[#18181B]">Exchanges Volume Trend</h3>
                    <p className="text-[11px] text-[#71717A]">Verified student borrow & return check-ins</p>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FDFBF1] border border-[#EDE8C8] rounded-xl text-xs font-bold text-[#4B5563]">
                    <span>This Week</span>
                    <AppIcon name="chevron-down" size={10} />
                  </div>
                </div>

                {/* SVG Wavy Line Chart */}
                <div className="h-44 w-full relative pt-2">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 500 160" preserveAspectRatio="none">
                    <line x1="0" y1="0" x2="500" y2="0" stroke="#F3F4F6" strokeDasharray="3 3" />
                    <line x1="0" y1="40" x2="500" y2="40" stroke="#F3F4F6" strokeDasharray="3 3" />
                    <line x1="0" y1="80" x2="500" y2="80" stroke="#F3F4F6" strokeDasharray="3 3" />
                    <line x1="0" y1="120" x2="500" y2="120" stroke="#F3F4F6" strokeDasharray="3 3" />
                    <line x1="0" y1="160" x2="500" y2="160" stroke="#EDE8C8" />

                    {/* Area Fill */}
                    <path
                      d="M 0 160 L 0 115 C 40 100, 70 80, 83 95 C 120 110, 140 70, 166 65 C 210 60, 230 45, 250 50 C 290 55, 310 30, 333 35 C 370 40, 390 60, 416 55 C 450 50, 480 20, 500 20 L 500 160 Z"
                      fill="url(#adminGreenGradient)"
                      opacity="0.3"
                    />

                    {/* Curve Line */}
                    <path
                      d="M 0 115 C 40 100, 70 80, 83 95 C 120 110, 140 70, 166 65 C 210 60, 230 45, 250 50 C 290 55, 310 30, 333 35 C 370 40, 390 60, 416 55 C 450 50, 480 20, 500 20"
                      fill="none"
                      stroke="#6F9535"
                      strokeWidth="3.5"
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
                        r="5"
                        fill="#6F9535"
                        stroke="white"
                        strokeWidth="2.5"
                      />
                    ))}

                    <defs>
                      <linearGradient id="adminGreenGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#7FB634" />
                        <stop offset="100%" stopColor="#7FB634" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* X Axis Labels */}
                <div className="flex items-center justify-between text-[11px] text-[#71717A] mt-4 font-bold">
                  <span>Mon (May 20)</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun (May 26)</span>
                </div>
              </div>

              {/* Right Chart: Resource Status (Donut) */}
              <div className="bg-white rounded-3xl border border-[#EDE8C8] p-6 shadow-2xs flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-[#18181B]">Resource Inventory Status</h3>
                  <p className="text-[11px] text-[#71717A]">Verification & safety compliance</p>
                </div>

                <div className="flex items-center justify-center gap-6 py-3">
                  {/* SVG Donut */}
                  <div className="relative w-36 h-36 flex-shrink-0">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="14" fill="transparent" stroke="#F3F4F6" strokeWidth="6" />
                      {/* Approved (67%) */}
                      <circle
                        cx="18"
                        cy="18"
                        r="14"
                        fill="transparent"
                        stroke="#6F9535"
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
                        stroke="#F59E0B"
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
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-xs font-black text-[#18181B]">1,864</span>
                      <span className="text-[9px] text-[#71717A] font-bold">Total</span>
                    </div>
                  </div>

                  {/* Donut Legend */}
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between gap-3">
                      <span className="flex items-center gap-1.5 text-[#52525B] font-semibold">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#6F9535]" />
                        Approved
                      </span>
                      <span className="font-extrabold text-[#18181B]">67%</span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="flex items-center gap-1.5 text-[#52525B] font-semibold">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                        Pending
                      </span>
                      <span className="font-extrabold text-[#18181B]">17%</span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="flex items-center gap-1.5 text-[#52525B] font-semibold">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                        Rejected
                      </span>
                      <span className="font-extrabold text-[#18181B]">6%</span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span className="flex items-center gap-1.5 text-[#52525B] font-semibold">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]" />
                        Flagged
                      </span>
                      <span className="font-extrabold text-[#18181B]">10%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ─── 3. OPERATIONS ACTION CENTER (3 COLUMNS) ───────── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* 1. Overdue Returns */}
              <div className="bg-white rounded-3xl border border-[#EDE8C8] p-5 shadow-2xs flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-[#F5F2E8]">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-[#18181B]">Overdue Returns</h3>
                      <span className="px-2 py-0.5 bg-[#FEE2E2] text-[#DC2626] text-[10px] font-extrabold rounded-full">
                        12 Actionable
                      </span>
                    </div>
                  </div>

                  <div className="divide-y divide-[#F5F2E8] pt-1">
                    {adminOverdueReturns.map((ret) => (
                      <div key={ret.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-9 h-9 rounded-xl overflow-hidden relative bg-[#FDFBF1] border border-[#EDE8C8] flex-shrink-0">
                            <Image src={ret.image} alt={ret.item} fill className="object-cover" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-[#18181B] truncate text-xs">{ret.item}</p>
                            <p className="text-[10px] text-[#71717A] truncate">{ret.borrower} • {ret.dept}</p>
                          </div>
                        </div>

                        <div className="text-right flex-shrink-0">
                          <span className="text-[10px] font-extrabold bg-[#FEE2E2] text-[#DC2626] px-2 py-0.5 rounded-md block">
                            {ret.overdueBy}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleAction(`Urgent SMS & Email ping dispatched to ${ret.borrower}!`)}
                            className="text-[10px] font-bold text-[#6F9535] hover:underline mt-1 cursor-pointer"
                          >
                            Ping Borrower
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleAction("Loading all 12 active overdue case files...")}
                  className="w-full py-2 bg-[#FDFBF1] hover:bg-[#FAF7F0] border border-[#EDE8C8] text-xs font-bold text-[#18181B] rounded-2xl transition-all cursor-pointer text-center"
                >
                  Manage All Overdue (12) →
                </button>
              </div>

              {/* 2. Recent Disputes */}
              <div className="bg-white rounded-3xl border border-[#EDE8C8] p-5 shadow-2xs flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-[#F5F2E8]">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-[#18181B]">Disputes & Claims</h3>
                      <span className="px-2 py-0.5 bg-[#FEF3C7] text-[#D97706] text-[10px] font-extrabold rounded-full">
                        5 Pending
                      </span>
                    </div>
                  </div>

                  <div className="divide-y divide-[#F5F2E8] pt-1">
                    {adminRecentDisputes.map((disp) => (
                      <div key={disp.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                        <div className="min-w-0">
                          <p className="font-bold text-[#18181B] truncate text-xs">{disp.issue}</p>
                          <p className="text-[10px] text-[#71717A] truncate">Filed by {disp.reportedBy}</p>
                        </div>

                        <div className="text-right flex-shrink-0">
                          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full block ${disp.statusColor}`}>
                            {disp.status}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleAction(`Opened Escrow Arbitration Vault for "${disp.issue}"!`)}
                            className="text-[10px] font-bold text-[#3B82F6] hover:underline mt-1 cursor-pointer"
                          >
                            Arbitrate
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleAction("Opening Full Dispute Audit Log...")}
                  className="w-full py-2 bg-[#FDFBF1] hover:bg-[#FAF7F0] border border-[#EDE8C8] text-xs font-bold text-[#18181B] rounded-2xl transition-all cursor-pointer text-center"
                >
                  View Dispute Vault (5) →
                </button>
              </div>

              {/* 3. Pending Approvals */}
              <div className="bg-white rounded-3xl border border-[#EDE8C8] p-5 shadow-2xs flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-[#F5F2E8]">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-[#18181B]">Item Approvals</h3>
                      <span className="px-2 py-0.5 bg-[#DCFCE7] text-[#15803D] text-[10px] font-extrabold rounded-full">
                        {approvalsList.length} Awaiting
                      </span>
                    </div>
                  </div>

                  <div className="divide-y divide-[#F5F2E8] pt-1">
                    {approvalsList.slice(0, 3).map((app) => (
                      <div key={app.id} className="py-2.5 flex items-center justify-between gap-2 text-xs">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-8 h-8 rounded-xl bg-[#FDFBF1] border border-[#EDE8C8] flex items-center justify-center text-[#6F9535] flex-shrink-0">
                            <AppIcon name={app.icon} size={15} />
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-[#18181B] truncate text-xs">{app.item}</p>
                            <p className="text-[10px] text-[#71717A] truncate">Owner: {app.owner}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          <button
                            type="button"
                            onClick={() => handleApprove(app.id, app.item)}
                            className="px-2 py-1 bg-[#84CC16] hover:bg-[#76B813] text-[#18181B] font-extrabold text-[10px] rounded-lg shadow-2xs cursor-pointer"
                          >
                            Approve
                          </button>
                          <button
                            type="button"
                            onClick={() => handleReject(app.id, app.item)}
                            className="px-2 py-1 bg-[#FAF7F0] hover:bg-[#FEE2E2] border border-[#EDE8C8] text-[#DC2626] font-bold text-[10px] rounded-lg cursor-pointer"
                          >
                            Review
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleAction("Batch approving all verified student equipment listings...")}
                  className="w-full py-2 bg-gradient-to-b from-[#7FB634] to-[#689A24] text-white text-xs font-bold rounded-2xl transition-all shadow-xs hover:from-[#8AC538] hover:to-[#72A627] cursor-pointer text-center"
                >
                  1-Click Batch Approve All →
                </button>
              </div>
            </div>

            {/* Floating Toast Notification */}
            {toastMessage && (
              <div className="fixed bottom-6 right-6 z-50 bg-[#18181B] text-white px-5 py-3 rounded-2xl shadow-2xl border border-white/10 text-xs font-bold flex items-center gap-2 animate-fadeInUp">
                <span>🛡️</span>
                <span>{toastMessage}</span>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
