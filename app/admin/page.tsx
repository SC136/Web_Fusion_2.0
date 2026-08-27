"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import AppNavbar from "@/app/components/layout/AppNavbar";
import { AppIcon } from "@/app/components/dashboard/Icons";
import {
  adminOverviewStats,
  adminOverdueReturns,
  adminRecentDisputes,
  adminRecentApprovals,
  browseResources,
} from "@/app/data/mockData";

/* ─── Trend Datasets for Interactive Chart ─────────────────────── */
interface ChartPoint {
  label: string;
  fullDate: string;
  exchanges: number;
  escrow: string;
  borrowers: number;
  cx: number;
  cy: number;
}

interface TimeframeData {
  title: string;
  totalExchanges: number;
  growth: string;
  linePath: string;
  areaPath: string;
  points: ChartPoint[];
}

const trendDataMap: Record<string, TimeframeData> = {
  "this-week": {
    title: "This Week (May 20 - May 26)",
    totalExchanges: 550,
    growth: "+15.2%",
    linePath: "M 0 115 C 40 100, 70 80, 83 95 C 120 110, 140 70, 166 65 C 210 60, 230 45, 250 50 C 290 55, 310 30, 333 35 C 370 40, 390 60, 416 55 C 450 50, 480 20, 500 20",
    areaPath: "M 0 160 L 0 115 C 40 100, 70 80, 83 95 C 120 110, 140 70, 166 65 C 210 60, 230 45, 250 50 C 290 55, 310 30, 333 35 C 370 40, 390 60, 416 55 C 450 50, 480 20, 500 20 L 500 160 Z",
    points: [
      { label: "Mon", fullDate: "Monday, May 20, 2025", exchanges: 42, escrow: "₹9,800", borrowers: 38, cx: 0, cy: 115 },
      { label: "Tue", fullDate: "Tuesday, May 21, 2025", exchanges: 58, escrow: "₹14,200", borrowers: 51, cx: 83, cy: 95 },
      { label: "Wed", fullDate: "Wednesday, May 22, 2025", exchanges: 72, escrow: "₹18,600", borrowers: 64, cx: 166, cy: 65 },
      { label: "Thu", fullDate: "Thursday, May 23, 2025", exchanges: 84, escrow: "₹22,400", borrowers: 76, cx: 250, cy: 50 },
      { label: "Fri", fullDate: "Friday, May 24, 2025", exchanges: 95, escrow: "₹26,100", borrowers: 88, cx: 333, cy: 35 },
      { label: "Sat", fullDate: "Saturday, May 25, 2025", exchanges: 89, escrow: "₹23,900", borrowers: 82, cx: 416, cy: 55 },
      { label: "Sun", fullDate: "Sunday, May 26, 2025", exchanges: 110, escrow: "₹31,500", borrowers: 104, cx: 500, cy: 20 },
    ],
  },
  "last-week": {
    title: "Last Week (May 13 - May 19)",
    totalExchanges: 478,
    growth: "+11.8%",
    linePath: "M 0 130 C 40 120, 70 110, 83 105 C 120 100, 140 90, 166 85 C 210 80, 230 75, 250 70 C 290 65, 310 50, 333 45 C 370 50, 390 65, 416 60 C 450 55, 480 35, 500 35",
    areaPath: "M 0 160 L 0 130 C 40 120, 70 110, 83 105 C 120 100, 140 90, 166 85 C 210 80, 230 75, 250 70 C 290 65, 310 50, 333 45 C 370 50, 390 65, 416 60 C 450 55, 480 35, 500 35 L 500 160 Z",
    points: [
      { label: "Mon", fullDate: "Monday, May 13, 2025", exchanges: 35, escrow: "₹7,900", borrowers: 30, cx: 0, cy: 130 },
      { label: "Tue", fullDate: "Tuesday, May 14, 2025", exchanges: 49, escrow: "₹11,400", borrowers: 44, cx: 83, cy: 105 },
      { label: "Wed", fullDate: "Wednesday, May 15, 2025", exchanges: 61, escrow: "₹15,100", borrowers: 55, cx: 166, cy: 85 },
      { label: "Thu", fullDate: "Thursday, May 16, 2025", exchanges: 70, escrow: "₹18,500", borrowers: 63, cx: 250, cy: 70 },
      { label: "Fri", fullDate: "Friday, May 17, 2025", exchanges: 82, escrow: "₹21,800", borrowers: 75, cx: 333, cy: 45 },
      { label: "Sat", fullDate: "Saturday, May 18, 2025", exchanges: 79, escrow: "₹20,500", borrowers: 71, cx: 416, cy: 60 },
      { label: "Sun", fullDate: "Sunday, May 19, 2025", exchanges: 102, escrow: "₹28,200", borrowers: 92, cx: 500, cy: 35 },
    ],
  },
  "this-month": {
    title: "This Month (May 2025)",
    totalExchanges: 2150,
    growth: "+22.4%",
    linePath: "M 0 140 C 60 130, 100 110, 166 100 C 230 90, 270 60, 333 50 C 400 40, 450 25, 500 15",
    areaPath: "M 0 160 L 0 140 C 60 130, 100 110, 166 100 C 230 90, 270 60, 333 50 C 400 40, 450 25, 500 15 L 500 160 Z",
    points: [
      { label: "Week 1", fullDate: "May 1 - May 7, 2025", exchanges: 410, escrow: "₹92,000", borrowers: 350, cx: 0, cy: 140 },
      { label: "Week 2", fullDate: "May 8 - May 14, 2025", exchanges: 485, escrow: "₹1,12,000", borrowers: 420, cx: 166, cy: 100 },
      { label: "Week 3", fullDate: "May 15 - May 21, 2025", exchanges: 590, escrow: "₹1,38,000", borrowers: 510, cx: 333, cy: 50 },
      { label: "Week 4", fullDate: "May 22 - May 28, 2025", exchanges: 665, escrow: "₹1,64,000", borrowers: 580, cx: 500, cy: 15 },
    ],
  },
};

/* ─── Resource Status Donut Data ──────────────────────────────── */
interface ResourceSlice {
  id: "approved" | "pending" | "rejected" | "flagged";
  label: string;
  count: number;
  percent: number;
  color: string;
  strokeDasharray: string;
  strokeDashoffset: string;
  description: string;
}

const resourceStatusSlices: ResourceSlice[] = [
  {
    id: "approved",
    label: "Approved",
    count: 1245,
    percent: 67,
    color: "#6F9535",
    strokeDasharray: "59 100",
    strokeDashoffset: "0",
    description: "Active, safety-verified listings available for instant peer booking across campus.",
  },
  {
    id: "pending",
    label: "Pending Review",
    count: 320,
    percent: 17,
    color: "#F59E0B",
    strokeDasharray: "15 100",
    strokeDashoffset: "-59",
    description: "Newly listed equipment awaiting admin photo & student identity verification.",
  },
  {
    id: "rejected",
    label: "Rejected",
    count: 120,
    percent: 6,
    color: "#EF4444",
    strokeDasharray: "5 100",
    strokeDashoffset: "-74",
    description: "Declined due to prohibited items, duplicate images, or inadequate specifications.",
  },
  {
    id: "flagged",
    label: "Flagged / Dispute",
    count: 179,
    percent: 10,
    color: "#8B5CF6",
    strokeDasharray: "9 100",
    strokeDashoffset: "-79",
    description: "User reports or condition discrepancies undergoing campus escrow arbitration.",
  },
];

export default function AdminPage() {
  const [selectedNav, setSelectedNav] = useState("overview");
  const [timeframe, setTimeframe] = useState<"this-week" | "last-week" | "this-month">("this-week");
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredPoint, setHoveredPoint] = useState<ChartPoint | null>(null);
  const [pinnedPoint, setPinnedPoint] = useState<ChartPoint | null>(null);
  const [activeSlice, setActiveSlice] = useState<ResourceSlice>(resourceStatusSlices[0]);
  const [approvalsList, setApprovalsList] = useState(adminRecentApprovals);
  const [overdueList, setOverdueList] = useState(adminOverdueReturns);
  const [disputesList, setDisputesList] = useState(adminRecentDisputes);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const activeTrend = trendDataMap[timeframe];
  const currentPoint = hoveredPoint || pinnedPoint || activeTrend.points[activeTrend.points.length - 1];

  const handleAction = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleApprove = (id: string, name: string) => {
    setApprovalsList((prev) => prev.filter((item) => item.id !== id));
    handleAction(`✓ "${name}" approved and published to Campus Catalog!`);
  };

  const handleReject = (id: string, name: string) => {
    setApprovalsList((prev) => prev.filter((item) => item.id !== id));
    handleAction(`✕ "${name}" listing flagged for student revision.`);
  };

  const handlePingBorrower = (borrower: string, item: string) => {
    handleAction(`📲 Urgent SMS & Email handover notification sent to ${borrower} for ${item}!`);
  };

  const handleResolveDispute = (id: string, issue: string) => {
    setDisputesList((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: "Resolved", statusColor: "bg-[#DCFCE7] text-[#15803D]" } : d))
    );
    handleAction(`⚖️ Dispute "${issue}" resolved. Escrow deposit released!`);
  };

  const adminNavItems = useMemo(
    () => [
      { label: "Overview", icon: "grid", id: "overview" },
      { label: "User Management", icon: "users", id: "users", badge: "2,348" },
      { label: "Resource Inventory", icon: "package", id: "resources", badge: "1,864" },
      { label: "Active Exchanges", icon: "repeat", id: "exchanges", badge: "534" },
      { label: "Item Approvals", icon: "check-check", id: "approvals", badge: `${approvalsList.length}`, badgeColor: "bg-[#DCFCE7] text-[#15803D]" },
      { label: "Overdue Returns", icon: "clock", id: "overdue", badge: `${overdueList.length}`, badgeColor: "bg-[#FEE2E2] text-[#DC2626]" },
      { label: "Disputes & Reports", icon: "alert-circle", id: "disputes", badge: `${disputesList.filter((d) => d.status !== "Resolved").length}`, badgeColor: "bg-[#FEF3C7] text-[#D97706]" },
      { label: "Escrow & Fees", icon: "banknote", id: "transactions" },
      { label: "Sustainability Audit", icon: "leaf", id: "analytics" },
      { label: "System Settings", icon: "settings", id: "settings" },
    ],
    [approvalsList.length, overdueList.length, disputesList]
  );

  return (
    <div className="min-h-screen bg-[#FBF7F0] text-[#18181B] select-none flex flex-col">
      {/* ─── Master Continuous Top Navbar ─────────────────────── */}
      <AppNavbar variant="auth" />

      {/* ─── Main Body (Sidebar + Content) ─────────────────── */}
      <div className="flex-1 flex w-full">
        {/* ─── Admin Left Sidebar ─────────────────────────────── */}
        <aside className="fixed left-0 top-16 bottom-0 w-[240px] bg-[#FDFBF1] border-r border-[#EDE8C8] flex flex-col z-40 hidden lg:flex select-none">
          {/* Header Tag */}
          <div className="p-4 pb-2.5 border-b border-[#F0EAE0]">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#6F9535] bg-[#EAF7EE] px-2.5 py-1 rounded-xl flex items-center gap-1.5 border border-[#C6E6B8]">
                <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
                <span>Admin Console</span>
              </span>
              <span className="text-[10px] font-bold text-[#71717A] bg-white px-2 py-0.5 rounded-lg border border-[#EDE8C8]">v2.4</span>
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
            {/* ─── Top Command Bar ───────────────────────────────── */}
            <div className="bg-white rounded-3xl border border-[#EDE8C8] p-5 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2.5">
                  <h1
                    className="text-2xl sm:text-3xl font-black text-[#18181B] tracking-tight"
                    style={{ fontFamily: "'Pixelify Sans', monospace" }}
                  >
                    Admin Command Center
                  </h1>
                  <span className="px-2.5 py-0.5 bg-[#DCFCE7] text-[#166534] border border-[#BBF7D0] text-[10px] font-extrabold rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
                    <span>Escrow Synced</span>
                  </span>
                </div>
                <p className="text-xs text-[#71717A] mt-1">
                  Active monitoring across <strong>{adminOverviewStats[0].value} verified students</strong> and <strong>534 active exchanges</strong>
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
                    placeholder="Search students, equipment, PINs..."
                    className="w-full pl-9 pr-3 py-2 bg-[#FDFBF1] border border-[#EDE8C8] rounded-2xl text-xs text-[#18181B] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#6F9535]"
                  />
                </div>

                {/* Quick Refresh Button */}
                <button
                  type="button"
                  onClick={() => handleAction("🔄 Admin cache synchronized with campus database!")}
                  className="px-3.5 py-2 bg-[#FDFBF1] hover:bg-[#FAF7F0] border border-[#EDE8C8] rounded-2xl text-xs font-bold text-[#18181B] flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  title="Sync Data"
                >
                  <AppIcon name="refresh" size={14} className="text-[#6F9535]" />
                  <span className="hidden sm:inline">Sync</span>
                </button>
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

            {/* ─── 2. INTERACTIVE CHARTS & ANALYTICS ROW ─────────── */}
            <div className="grid grid-cols-1 xl:grid-cols-[1.65fr_1fr] gap-5">
              {/* Left Chart: Exchanges Volume Trend (Fully Interactive) */}
              <div className="bg-white rounded-3xl border border-[#EDE8C8] p-6 shadow-2xs flex flex-col justify-between relative overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-[#18181B]">Exchanges Volume Trend</h3>
                      <span className="text-[10px] font-extrabold bg-[#EAF7EE] text-[#166534] px-2 py-0.5 rounded-full border border-[#C6E6B8]">
                        {activeTrend.growth}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#71717A]">
                      {activeTrend.title} • <strong>{activeTrend.totalExchanges} Total Exchanges</strong>
                    </p>
                  </div>

                  {/* Interactive Timeframe Switcher Dropdown */}
                  <div className="flex items-center gap-1.5 bg-[#FDFBF1] p-1 rounded-2xl border border-[#EDE8C8]">
                    {[
                      { id: "this-week", label: "This Week" },
                      { id: "last-week", label: "Last Week" },
                      { id: "this-month", label: "This Month" },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => {
                          setTimeframe(tab.id as any);
                          setPinnedPoint(null);
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          timeframe === tab.id
                            ? "bg-[#18181B] text-white shadow-2xs"
                            : "text-[#52525B] hover:text-[#18181B]"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* SVG Wavy Line Chart with Hover Interactions */}
                <div className="h-44 w-full relative pt-2">
                  <svg className="w-full h-full overflow-visible" viewBox="0 0 500 160" preserveAspectRatio="none">
                    <line x1="0" y1="0" x2="500" y2="0" stroke="#F3F4F6" strokeDasharray="3 3" />
                    <line x1="0" y1="40" x2="500" y2="40" stroke="#F3F4F6" strokeDasharray="3 3" />
                    <line x1="0" y1="80" x2="500" y2="80" stroke="#F3F4F6" strokeDasharray="3 3" />
                    <line x1="0" y1="120" x2="500" y2="120" stroke="#F3F4F6" strokeDasharray="3 3" />
                    <line x1="0" y1="160" x2="500" y2="160" stroke="#EDE8C8" />

                    {/* Active vertical guide line */}
                    {currentPoint && (
                      <line
                        x1={currentPoint.cx}
                        y1="0"
                        x2={currentPoint.cx}
                        y2="160"
                        stroke="#6F9535"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                        opacity="0.6"
                      />
                    )}

                    {/* Area Fill */}
                    <path
                      d={activeTrend.areaPath}
                      fill="url(#adminGreenGradient)"
                      opacity="0.3"
                    />

                    {/* Curve Line */}
                    <path
                      d={activeTrend.linePath}
                      fill="none"
                      stroke="#6F9535"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />

                    {/* Interactive Clickable & Hoverable Dots */}
                    {activeTrend.points.map((pt, i) => {
                      const isSelected = currentPoint.label === pt.label;
                      return (
                        <g key={i} className="cursor-pointer">
                          {isSelected && (
                            <circle
                              cx={pt.cx}
                              cy={pt.cy}
                              r="10"
                              fill="#6F9535"
                              opacity="0.25"
                              className="animate-ping"
                            />
                          )}
                          <circle
                            cx={pt.cx}
                            cy={pt.cy}
                            r={isSelected ? "7" : "5"}
                            fill={isSelected ? "#18181B" : "#6F9535"}
                            stroke="white"
                            strokeWidth={isSelected ? "3" : "2"}
                            onMouseEnter={() => setHoveredPoint(pt)}
                            onMouseLeave={() => setHoveredPoint(null)}
                            onClick={() => setPinnedPoint(pt)}
                            className="transition-all hover:scale-125"
                          />
                        </g>
                      );
                    })}

                    <defs>
                      <linearGradient id="adminGreenGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#7FB634" />
                        <stop offset="100%" stopColor="#7FB634" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* X Axis Labels */}
                <div className="flex items-center justify-between text-[11px] text-[#71717A] mt-3 font-bold">
                  {activeTrend.points.map((pt) => (
                    <button
                      key={pt.label}
                      type="button"
                      onClick={() => setPinnedPoint(pt)}
                      className={`px-1.5 py-0.5 rounded-md transition-all cursor-pointer ${
                        currentPoint.label === pt.label ? "text-[#18181B] font-black bg-[#EAF7EE]" : "hover:text-[#18181B]"
                      }`}
                    >
                      {pt.label}
                    </button>
                  ))}
                </div>

                {/* Real-time Interactive Tooltip Card for Selected Point */}
                <div className="mt-3 p-3 bg-[#FDFBF1] rounded-2xl border border-[#EDE8C8] flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
                    <span className="font-extrabold text-[#18181B]">{currentPoint.fullDate}</span>
                  </div>
                  <div className="flex items-center gap-4 text-[#52525B]">
                    <span>Exchanges: <strong className="text-[#18181B]">{currentPoint.exchanges}</strong></span>
                    <span>Escrow Flow: <strong className="text-[#16A34A]">{currentPoint.escrow}</strong></span>
                    <span>Borrowers: <strong className="text-[#18181B]">{currentPoint.borrowers}</strong></span>
                  </div>
                </div>
              </div>

              {/* Right Chart: Resource Status (Interactive Donut with Slice Select) */}
              <div className="bg-white rounded-3xl border border-[#EDE8C8] p-6 shadow-2xs flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-[#18181B]">Resource Inventory Status</h3>
                    <p className="text-[11px] text-[#71717A]">Click any segment to inspect compliance</p>
                  </div>
                  <span className="text-xs font-black text-[#6F9535] bg-[#EAF7EE] px-2 py-0.5 rounded-full">
                    1,864 Total
                  </span>
                </div>

                <div className="flex items-center justify-center gap-6 py-1">
                  {/* SVG Donut */}
                  <div className="relative w-36 h-36 flex-shrink-0">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="14" fill="transparent" stroke="#F3F4F6" strokeWidth="6" />
                      {resourceStatusSlices.map((slice) => {
                        const isSelected = activeSlice.id === slice.id;
                        return (
                          <circle
                            key={slice.id}
                            cx="18"
                            cy="18"
                            r="14"
                            fill="transparent"
                            stroke={slice.color}
                            strokeWidth={isSelected ? "7.5" : "6"}
                            strokeDasharray={slice.strokeDasharray}
                            strokeDashoffset={slice.strokeDashoffset}
                            onClick={() => setActiveSlice(slice)}
                            className="cursor-pointer transition-all hover:opacity-80"
                          />
                        );
                      })}
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                      <span className="text-sm font-black text-[#18181B]">{activeSlice.percent}%</span>
                      <span className="text-[9px] text-[#71717A] font-bold">{activeSlice.label}</span>
                    </div>
                  </div>

                  {/* Donut Legend */}
                  <div className="space-y-1.5 text-xs flex-1">
                    {resourceStatusSlices.map((slice) => {
                      const isSelected = activeSlice.id === slice.id;
                      return (
                        <button
                          key={slice.id}
                          type="button"
                          onClick={() => setActiveSlice(slice)}
                          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl transition-all text-left cursor-pointer ${
                            isSelected ? "bg-[#FDFBF1] border border-[#EDE8C8] font-bold shadow-2xs" : "hover:bg-[#FAF7F0]"
                          }`}
                        >
                          <span className="flex items-center gap-1.5 text-[#52525B]">
                            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: slice.color }} />
                            <span>{slice.label}</span>
                          </span>
                          <span className="font-extrabold text-[#18181B]">{slice.count}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Inspected Slice Explanation Card */}
                <div className="p-3 bg-[#FAF7F0] rounded-2xl border border-[#EDE8C8] text-xs space-y-1">
                  <div className="flex items-center justify-between font-bold text-[#18181B]">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeSlice.color }} />
                      <span>{activeSlice.label} Pool ({activeSlice.count} items)</span>
                    </span>
                    <span className="text-[#6F9535]">{activeSlice.percent}% share</span>
                  </div>
                  <p className="text-[11px] text-[#71717A] leading-relaxed">
                    {activeSlice.description}
                  </p>
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
                        {overdueList.length} Actionable
                      </span>
                    </div>
                  </div>

                  <div className="divide-y divide-[#F5F2E8] pt-1">
                    {overdueList.map((ret) => (
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
                            onClick={() => handlePingBorrower(ret.borrower, ret.item)}
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
                  onClick={() => handleAction(`Dispatched batch return reminders to all ${overdueList.length} overdue student borrowers!`)}
                  className="w-full py-2.5 bg-[#FDFBF1] hover:bg-[#FAF7F0] border border-[#EDE8C8] text-xs font-bold text-[#18181B] rounded-2xl transition-all cursor-pointer text-center"
                >
                  Ping All Overdue ({overdueList.length}) →
                </button>
              </div>

              {/* 2. Recent Disputes */}
              <div className="bg-white rounded-3xl border border-[#EDE8C8] p-5 shadow-2xs flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-[#F5F2E8]">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-[#18181B]">Disputes & Claims</h3>
                      <span className="px-2 py-0.5 bg-[#FEF3C7] text-[#D97706] text-[10px] font-extrabold rounded-full">
                        {disputesList.filter((d) => d.status !== "Resolved").length} Pending
                      </span>
                    </div>
                  </div>

                  <div className="divide-y divide-[#F5F2E8] pt-1">
                    {disputesList.map((disp) => (
                      <div key={disp.id} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                        <div className="min-w-0">
                          <p className="font-bold text-[#18181B] truncate text-xs">{disp.issue}</p>
                          <p className="text-[10px] text-[#71717A] truncate">Filed by {disp.reportedBy}</p>
                        </div>

                        <div className="text-right flex-shrink-0">
                          <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full block ${disp.statusColor}`}>
                            {disp.status}
                          </span>
                          {disp.status !== "Resolved" ? (
                            <button
                              type="button"
                              onClick={() => handleResolveDispute(disp.id, disp.issue)}
                              className="text-[10px] font-bold text-[#3B82F6] hover:underline mt-1 cursor-pointer"
                            >
                              Resolve
                            </button>
                          ) : (
                            <span className="text-[10px] text-[#16A34A] font-bold mt-1 block">Closed ✓</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleAction("Escrow arbitration vault loaded with digital signature keys.")}
                  className="w-full py-2.5 bg-[#FDFBF1] hover:bg-[#FAF7F0] border border-[#EDE8C8] text-xs font-bold text-[#18181B] rounded-2xl transition-all cursor-pointer text-center"
                >
                  Open Dispute Vault →
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
                    {approvalsList.length > 0 ? (
                      approvalsList.slice(0, 3).map((app) => (
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
                              className="px-2.5 py-1 bg-[#84CC16] hover:bg-[#76B813] text-[#18181B] font-extrabold text-[10px] rounded-lg shadow-2xs cursor-pointer"
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
                      ))
                    ) : (
                      <div className="py-6 text-center text-xs text-[#16A34A] font-bold">
                        🎉 All submitted items have been reviewed!
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  disabled={approvalsList.length === 0}
                  onClick={() => {
                    setApprovalsList([]);
                    handleAction(`✓ Batch approved all ${approvalsList.length} student equipment listings!`);
                  }}
                  className="w-full py-2.5 bg-gradient-to-b from-[#7FB634] to-[#689A24] disabled:opacity-50 text-white text-xs font-bold rounded-2xl transition-all shadow-xs hover:from-[#8AC538] hover:to-[#72A627] cursor-pointer text-center"
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
