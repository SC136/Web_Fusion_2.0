"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import AppNavbar from "@/app/components/layout/AppNavbar";
import { AppIcon } from "@/app/components/dashboard/Icons";

export default function ImpactPage() {
  const [selectedItemType, setSelectedItemType] = useState<"camera" | "projector" | "tent" | "calculator">("camera");
  const [borrowDays, setBorrowDays] = useState(3);

  const itemData = {
    camera: { name: "DSLR / Mirrorless Camera", retailCost: 65000, rentalDay: 350, co2PerUnit: 42 },
    projector: { name: "1080p Studio Projector", retailCost: 28000, rentalDay: 200, co2PerUnit: 26 },
    tent: { name: "2-Person Camping Tent", retailCost: 8500, rentalDay: 120, co2PerUnit: 14 },
    calculator: { name: "Scientific Graphing Calculator", retailCost: 9500, rentalDay: 50, co2PerUnit: 8 },
  };

  const selected = itemData[selectedItemType];
  const rentalTotal = selected.rentalDay * borrowDays;
  const moneySaved = Math.max(0, selected.retailCost - rentalTotal);
  const co2Saved = Math.round(selected.co2PerUnit * 0.85);

  const departments = [
    { name: "Computer Science & Engineering", co2: 420, loans: 142, trees: 21, badge: "🥇 #1 Campus Rank" },
    { name: "Design & Media Arts", co2: 380, loans: 118, trees: 19, badge: "🥈 #2 Campus Rank" },
    { name: "Electrical & Robotics Lab", co2: 260, loans: 84, trees: 13, badge: "🥉 #3 Campus Rank" },
    { name: "Management & Commerce", co2: 220, loans: 66, trees: 11, badge: "#4 Campus Rank" },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF1] text-[#18181B] flex flex-col select-none animate-fadeIn">
      {/* ─── Top Navbar ───────────────────────────────────────── */}
      <AppNavbar variant="auth" />

      {/* ─── Main Content Container ───────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 w-full">
        {/* Header Hero Banner */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pb-10 border-b border-[#EDE8C8]">
          <div className="max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#F5F8E9] border border-[#D8E8B8] rounded-full text-xs font-bold text-[#2E5E1C] mb-3 shadow-2xs">
              <AppIcon name="leaf" size={14} className="text-[#16A34A]" />
              <span>SUSTAINABILITY &amp; IMPACT LEDGER</span>
              <span>✦</span>
            </div>
            <h1
              className="text-3xl sm:text-5xl font-extrabold text-[#18181B] tracking-tight leading-[1.1] mb-3"
              style={{ fontFamily: "'Pixelify Sans', monospace" }}
            >
              Every Share Powers a Greener Campus.
            </h1>
            <p className="text-sm sm:text-base text-[#52525B] font-medium leading-relaxed mb-6">
              When students share equipment instead of buying brand new for brief assignments, we cut electronic manufacturing demand, save lakhs of rupees, and eliminate unnecessary packaging waste.
            </p>
            <div className="flex items-center justify-center lg:justify-start gap-4">
              <div className="bg-[#FEFAEE] border border-[#EDE8C8] px-4 py-2 rounded-2xl shadow-2xs">
                <p className="text-2xl font-black text-[#18181B]">1,280 kg</p>
                <p className="text-[11px] text-[#71717A] font-semibold">Total CO₂ Averted</p>
              </div>
              <div className="bg-[#FEFAEE] border border-[#EDE8C8] px-4 py-2 rounded-2xl shadow-2xs">
                <p className="text-2xl font-black text-[#16A34A]">₹4.85 L+</p>
                <p className="text-[11px] text-[#71717A] font-semibold">Student Money Saved</p>
              </div>
            </div>
          </div>

          {/* Right Hero Illustration with Tree */}
          <div className="bg-white rounded-3xl border border-[#EDE8C8] p-6 shadow-2xs flex items-center gap-6 max-w-sm w-full hover:shadow-md transition-all">
            <div className="w-28 h-28 relative flex-shrink-0">
              <Image
                src="/tree.png"
                alt="Impact Tree"
                fill
                className="object-contain scale-110 drop-shadow-sm select-none pointer-events-none"
                priority
              />
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-[#166534] bg-[#DCFCE7] px-2.5 py-0.5 rounded-full border border-[#BBF7D0]">
                LEVEL 4 GREEN CAMPUS
              </span>
              <h3 className="text-lg font-black text-[#18181B] mt-1">64 Trees</h3>
              <p className="text-xs text-[#52525B] mt-0.5">
                Carbon absorption equivalent saved this semester!
              </p>
            </div>
          </div>
        </div>

        {/* ─── 4 Metric Highlights (Professional Icons) ─────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 my-8">
          <div className="bg-white p-5 rounded-3xl border border-[#EDE8C8] shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 space-y-1">
            <div className="w-10 h-10 rounded-2xl bg-[#DCFCE7] text-[#15803D] flex items-center justify-center font-bold mb-2">
              <AppIcon name="leaf" size={20} />
            </div>
            <p className="text-2xl font-black text-[#18181B]">1,280 kg</p>
            <p className="text-xs font-bold text-[#52525B]">CO₂ Emissions Saved</p>
            <p className="text-[10.5px] text-[#71717A]">Equivalent to 64 planted trees</p>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-[#EDE8C8] shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 space-y-1">
            <div className="w-10 h-10 rounded-2xl bg-[#FEF3C7] text-[#D97706] flex items-center justify-center font-bold mb-2">
              <AppIcon name="coins" size={20} />
            </div>
            <p className="text-2xl font-black text-[#18181B]">₹4,85,000</p>
            <p className="text-xs font-bold text-[#52525B]">Direct Student Savings</p>
            <p className="text-[10.5px] text-[#71717A]">Compared to retail purchase</p>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-[#EDE8C8] shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 space-y-1">
            <div className="w-10 h-10 rounded-2xl bg-[#DBEAFE] text-[#1D4ED8] flex items-center justify-center font-bold mb-2">
              <AppIcon name="package" size={20} />
            </div>
            <p className="text-2xl font-black text-[#18181B]">410+ Items</p>
            <p className="text-xs font-bold text-[#52525B]">Circulating Equipment</p>
            <p className="text-[10.5px] text-[#71717A]">Zero single-use packaging</p>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-[#EDE8C8] shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 space-y-1">
            <div className="w-10 h-10 rounded-2xl bg-[#F3E8FF] text-[#6B21A8] flex items-center justify-center font-bold mb-2">
              <AppIcon name="sparkles" size={20} />
            </div>
            <p className="text-2xl font-black text-[#18181B]">98.4%</p>
            <p className="text-xs font-bold text-[#52525B]">On-Time Return Rate</p>
            <p className="text-[10.5px] text-[#71717A]">Zero dispute resolution rate</p>
          </div>
        </div>

        {/* ─── Interactive Carbon & Savings Calculator ─────────── */}
        <div className="bg-white rounded-3xl border border-[#EDE8C8] p-6 sm:p-10 shadow-2xs my-8">
          <div className="max-w-2xl mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F5F8E9] border border-[#D8E8B8] rounded-full text-xs font-bold text-[#2E5E1C] mb-2">
              <AppIcon name="calculator" size={13} className="text-[#6F9535]" />
              <span>INTERACTIVE CALCULATOR</span>
              <span>✦</span>
            </div>
            <h2
              className="text-2xl sm:text-3xl font-extrabold text-[#18181B]"
              style={{ fontFamily: "'Pixelify Sans', monospace" }}
            >
              See Your Impact Before You Borrow
            </h2>
            <p className="text-xs sm:text-sm text-[#71717A] mt-1">
              Select an item category and rental duration to calculate how much money and carbon you prevent.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Controls */}
            <div className="lg:col-span-6 space-y-6">
              {/* Item Selector */}
              <div>
                <label className="block text-xs font-bold text-[#18181B] mb-2">
                  Select Equipment Type:
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { id: "camera", label: "DSLR Camera", icon: "camera" },
                    { id: "projector", label: "Projector", icon: "video" },
                    { id: "tent", label: "Camping Tent", icon: "tent" },
                    { id: "calculator", label: "Lab Calculator", icon: "calculator" },
                  ].map((btn) => (
                    <button
                      key={btn.id}
                      onClick={() => setSelectedItemType(btn.id as any)}
                      className={`p-3 rounded-2xl text-xs font-bold border transition-all text-left cursor-pointer flex items-center gap-2.5 ${
                        selectedItemType === btn.id
                          ? "bg-[#F5F8E9] border-[#6F9535] text-[#18181B] shadow-2xs scale-102"
                          : "bg-white border-[#EDE8C8] text-[#52525B] hover:bg-[#FDFBF1]"
                      }`}
                    >
                      <AppIcon name={btn.icon} size={16} className={selectedItemType === btn.id ? "text-[#6F9535]" : "text-[#9CA3AF]"} />
                      <span>{btn.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Days Slider */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-[#18181B] mb-2">
                  <span>Borrow Duration:</span>
                  <span className="text-[#6F9535] bg-[#DCFCE7] px-3 py-0.5 rounded-full">
                    {borrowDays} {borrowDays === 1 ? "Day" : "Days"}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="14"
                  value={borrowDays}
                  onChange={(e) => setBorrowDays(parseInt(e.target.value))}
                  className="w-full h-2 bg-[#EDE8C8] rounded-lg appearance-none cursor-pointer accent-[#6F9535]"
                />
                <div className="flex items-center justify-between text-[10px] text-[#71717A] mt-1.5 font-medium">
                  <span>1 Day</span>
                  <span>7 Days</span>
                  <span>14 Days</span>
                </div>
              </div>
            </div>

            {/* Right Output Box */}
            <div className="lg:col-span-6 bg-[#FDFBF1] border border-[#EDE8C8] rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xs">
              <div className="flex items-center justify-between pb-3 border-b border-[#EDE8C8]">
                <span className="text-xs font-bold text-[#71717A]">Retail Price to Buy:</span>
                <span className="text-sm font-bold text-[#71717A] line-through">₹{selected.retailCost.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-[#EDE8C8]">
                <span className="text-xs font-bold text-[#18181B]">Campus Rental Cost ({borrowDays}d):</span>
                <span className="text-sm font-bold text-[#18181B]">₹{rentalTotal.toLocaleString()}</span>
              </div>
              <div className="bg-[#DCFCE7] border border-[#BBF7D0] p-4 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-[#166534]">Your Direct Money Saved</p>
                  <p className="text-2xl font-black text-[#15803D]">₹{moneySaved.toLocaleString()}</p>
                </div>
                <span className="text-2xl">🎉</span>
              </div>
              <div className="bg-[#FEF3C7] border border-[#FDE68A] p-4 rounded-2xl flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-[#92400E]">CO₂ Manufacturing Averted</p>
                  <p className="text-2xl font-black text-[#B45309]">{co2Saved} kg CO₂</p>
                </div>
                <span className="text-2xl">🌱</span>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Department Sustainability Leaderboard ───────────── */}
        <div className="bg-white rounded-3xl border border-[#EDE8C8] p-6 sm:p-10 shadow-2xs my-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#EDE8C8]">
            <div>
              <h2
                className="text-2xl sm:text-3xl font-extrabold text-[#18181B]"
                style={{ fontFamily: "'Pixelify Sans', monospace" }}
              >
                Campus Department Leaderboard
              </h2>
              <p className="text-xs sm:text-sm text-[#71717A] mt-0.5">
                Top campus academic circles driving circular sharing.
              </p>
            </div>
            <span className="text-xs font-bold text-[#16A34A] bg-[#DCFCE7] px-3.5 py-1.5 rounded-full border border-[#BBF7D0] self-start sm:self-auto">
              Live Semester Standings
            </span>
          </div>

          <div className="space-y-3">
            {departments.map((dept, index) => (
              <div
                key={dept.name}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-2xl bg-[#FDFBF1] border border-[#EDE8C8] hover:bg-[#F8F5E4] transition-all"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white border border-[#EDE8C8] flex items-center justify-center font-black text-sm text-[#18181B] shadow-2xs flex-shrink-0">
                    #{index + 1}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#18181B]">{dept.name}</h4>
                    <p className="text-[11px] text-[#71717A]">{dept.loans} verified exchanges completed</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:gap-6 self-end sm:self-auto">
                  <div className="text-right">
                    <p className="text-xs sm:text-sm font-black text-[#15803D]">{dept.co2} kg CO₂</p>
                    <p className="text-[10px] text-[#71717A]">{dept.trees} trees equiv.</p>
                  </div>
                  <span className="text-[11px] font-bold px-3 py-1 bg-white border border-[#EDE8C8] rounded-xl text-[#18181B] shadow-2xs">
                    {dept.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Bottom CTA ─────────────────────────────────────── */}
        <div className="bg-gradient-to-r from-[#F5F8E9] to-[#EAF3E4] border border-[#D8E8B8] rounded-3xl p-8 sm:p-12 text-center shadow-2xs">
          <h3
            className="text-2xl sm:text-4xl font-extrabold text-[#18181B] mb-2"
            style={{ fontFamily: "'Pixelify Sans', monospace" }}
          >
            Add Your Impact to the Campus Ledger.
          </h3>
          <p className="text-xs sm:text-sm text-[#52525B] max-w-md mx-auto mb-6">
            Share an item you rarely use or borrow what you need for this week&apos;s project.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/browse"
              className="px-8 py-3.5 bg-gradient-to-b from-[#7FB634] to-[#689A24] text-white font-bold text-sm rounded-2xl transition-all shadow-xs hover:from-[#8AC538] hover:to-[#72A627] cursor-pointer border-b-2 border-[#557F1C]"
            >
              Start Borrowing →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
