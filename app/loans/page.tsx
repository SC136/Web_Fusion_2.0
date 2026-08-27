"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Sidebar from "@/app/components/dashboard/Sidebar";
import AppNavbar from "@/app/components/layout/AppNavbar";
import { AppIcon } from "@/app/components/dashboard/Icons";
import { LIFECYCLE_STAGES, mockExchanges } from "@/app/data/mockData";

export default function BorrowingLifecyclePage() {
  // Selected Exchange (defaults to first exchange)
  const [selectedExchangeIndex, setSelectedExchangeIndex] = useState(0);
  const currentExchange = mockExchanges[selectedExchangeIndex];

  // Current active stage state (0 to 8 corresponding to the 9 stages)
  const [activeStageIndex, setActiveStageIndex] = useState(
    currentExchange.currentStageIndex
  );

  // Inspection damage simulator toggle
  const [hasDamageReported, setHasDamageReported] = useState(false);
  const [damageAmount, setDamageAmount] = useState(250);

  // Stepper helper
  const nextStage = () => {
    if (activeStageIndex < LIFECYCLE_STAGES.length - 1) {
      setActiveStageIndex(activeStageIndex + 1);
    }
  };

  const prevStage = () => {
    if (activeStageIndex > 0) {
      setActiveStageIndex(activeStageIndex - 1);
    }
  };

  const currentStage = LIFECYCLE_STAGES[activeStageIndex];

  return (
    <div className="min-h-screen bg-[#FBF7F0] text-[#18181B] select-none flex flex-col">
      {/* ─── FULL-WIDTH CONTINUOUS TOP NAVBAR ─────────────── */}
      <AppNavbar variant="auth" />

      {/* ─── MAIN BODY (Sidebar + Content) ─────────────────── */}
      <div className="flex-1 flex w-full">
        {/* ─── LEFT PERSISTENT SIDEBAR ──────────────────────── */}
        <Sidebar />

        {/* ─── MAIN CONTENT AREA ────────────────────────────── */}
        <div className="flex-1 lg:ml-[240px] flex flex-col min-w-0">

        {/* ─── Top Breadcrumbs & Title ───────────────────────────── */}
        <div className="px-5 lg:px-8 pt-6 pb-4 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#71717A] mb-1">
              <Link href="/dashboard" className="hover:text-[#18181B]">Dashboard</Link>
              <span>/</span>
              <span className="text-[#18181B]">Borrowing Lifecycle Tracker</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-[#18181B] tracking-tight flex items-center gap-2.5">
              <span>Borrowing Lifecycle Tracker</span>
              <span className="text-xs bg-[#EAF7EE] text-[#166534] border border-[#BBF7D0] px-2.5 py-0.5 rounded-full font-bold">
                Live Interactive Simulation
              </span>
            </h1>
          </div>

          {/* Switch Active Exchange Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#71717A] hidden md:inline">Exchange:</span>
            <div className="flex bg-white p-1 rounded-2xl border border-[#EDE8C8] shadow-2xs">
              {mockExchanges.map((ex, idx) => (
                <button
                  key={ex.id}
                  onClick={() => {
                    setSelectedExchangeIndex(idx);
                    setActiveStageIndex(ex.currentStageIndex);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedExchangeIndex === idx
                      ? "bg-[#18181B] text-white shadow-2xs"
                      : "text-[#52525B] hover:text-[#18181B]"
                  }`}
                >
                  {ex.id} ({ex.itemTitle.split(" ")[0]})
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── Main Content ──────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full space-y-6">
        {/* ══════════════════════════════════════════════════════════
           1. HORIZONTAL 9-STAGE TIMELINE STEPPER
           ══════════════════════════════════════════════════════════ */}
        <div className="bg-white rounded-3xl border border-[#EDE8C8] p-5 sm:p-6 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-bold text-[#71717A] uppercase tracking-wider">
              Exchange Progress (9-Stage Protocol)
            </h2>
            <div className="flex items-center gap-2 text-xs font-bold">
              <span className="text-[#16A34A]">Stage {activeStageIndex + 1} of 9:</span>
              <span className="text-[#18181B] bg-[#F4F4F5] px-2.5 py-0.5 rounded-md">
                {currentStage.label}
              </span>
            </div>
          </div>

          {/* Stepper Dots & Line */}
          <div className="relative">
            {/* Background Line */}
            <div className="absolute top-5 left-6 right-6 h-1 bg-[#F0EAE0] rounded-full -z-0 hidden md:block" />
            {/* Progress Fill Line */}
            <div
              className="absolute top-5 left-6 h-1 bg-[#84CC16] rounded-full transition-all duration-300 -z-0 hidden md:block"
              style={{
                width: `${(activeStageIndex / (LIFECYCLE_STAGES.length - 1)) * 92}%`,
              }}
            />

            {/* Stepper Buttons Strip */}
            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2 relative z-10">
              {LIFECYCLE_STAGES.map((stage, idx) => {
                const isCompleted = idx < activeStageIndex;
                const isCurrent = idx === activeStageIndex;

                return (
                  <button
                    key={stage.id}
                    onClick={() => setActiveStageIndex(idx)}
                    className={`flex flex-col items-center text-center p-2 rounded-2xl transition-all cursor-pointer ${
                      isCurrent
                        ? "bg-[#F7FEE7] border-2 border-[#84CC16] shadow-sm scale-102"
                        : isCompleted
                        ? "bg-[#F0FDF4] hover:bg-[#DCFCE7] border border-[#BBF7D0]"
                        : "bg-[#FAFAF9] hover:bg-[#F4F4F5] border border-[#F0EAE0] opacity-75"
                    }`}
                  >
                    {/* Circle Indicator */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black mb-1.5 transition-all ${
                        isCurrent
                          ? "bg-[#84CC16] text-[#18181B] ring-4 ring-[#84CC16]/20 shadow-xs"
                          : isCompleted
                          ? "bg-[#16A34A] text-white"
                          : "bg-[#E4E4E7] text-[#71717A]"
                      }`}
                    >
                      {isCompleted ? "✓" : stage.stepNumber}
                    </div>
                    <span
                      className={`text-[11px] font-bold leading-tight ${
                        isCurrent
                          ? "text-[#18181B]"
                          : isCompleted
                          ? "text-[#166534]"
                          : "text-[#71717A]"
                      }`}
                    >
                      {stage.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stepper Simulation Navigation Controls */}
          <div className="mt-5 pt-4 border-t border-[#F0EAE0] flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-[#52525B]">
              <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-ping" />
              <span><strong>Interactive Simulator:</strong> Click any step above or use next/prev to test any stage.</span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={prevStage}
                disabled={activeStageIndex === 0}
                className="flex-1 sm:flex-none px-4 py-2 bg-white hover:bg-[#FBF7F0] disabled:opacity-40 disabled:hover:bg-white border border-[#EDE8C8] text-xs font-bold rounded-xl transition-all shadow-2xs cursor-pointer"
              >
                ← Previous Stage
              </button>
              <button
                onClick={nextStage}
                disabled={activeStageIndex === LIFECYCLE_STAGES.length - 1}
                className="flex-1 sm:flex-none px-4 py-2 bg-[#84CC16] hover:bg-[#76B813] disabled:opacity-40 text-[#18181B] text-xs font-black rounded-xl transition-all shadow-xs cursor-pointer"
              >
                Advance to Next Stage →
              </button>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════
           2. TWO-COLUMN LAYOUT: STAGE DETAILS (LEFT) + ITEM CARD (RIGHT)
           ══════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ─── LEFT: Stage-Specific Action Panel (8 cols) ────── */}
          <div className="lg:col-span-8 space-y-6">
            {/* ─── STAGE 1: REQUESTED ─── */}
            {activeStageIndex === 0 && (
              <div className="bg-white rounded-3xl border border-[#EDE8C8] p-6 sm:p-7 shadow-2xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#F0EAE0]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#18181B]">Stage 1: Borrow Request Submitted</h3>
                      <p className="text-xs text-[#71717A]">Borrower signed agreement and paid into escrow</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#2563EB] bg-[#DBEAFE] px-2.5 py-1 rounded-full">
                    Awaiting Lender Approval
                  </span>
                </div>

                {/* Agreement Summary Box (Section 7 of PS) */}
                <div className="bg-[#FAF7F0] border border-[#EFE8D6] rounded-2xl p-4 space-y-3 text-xs">
                  <h4 className="font-bold text-[#18181B] flex items-center gap-1.5">
                    <AppIcon name="shield-check" size={14} className="text-[#16A34A]" />
                    <span>Campus Circular Borrowing Agreement (Confirmed)</span>
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11.5px]">
                    <div>
                      <p className="text-[#71717A]">Borrower</p>
                      <p className="font-bold text-[#18181B]">{currentExchange.borrowerName}</p>
                    </div>
                    <div>
                      <p className="text-[#71717A]">Lender</p>
                      <p className="font-bold text-[#18181B]">{currentExchange.ownerName}</p>
                    </div>
                    <div>
                      <p className="text-[#71717A]">Requested Duration</p>
                      <p className="font-bold text-[#18181B]">{currentExchange.durationDays} Days</p>
                    </div>
                    <div>
                      <p className="text-[#71717A]">Return Deadline</p>
                      <p className="font-bold text-[#16A34A]">{currentExchange.returnDueDate}</p>
                    </div>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-[#EDE8C8] text-[11px] text-[#52525B]">
                    ✔ Borrower agreed to care instructions, zero water damage, and on-time return protocol.
                  </div>
                </div>

                {/* Financial Escrow Formula (Section 12 of PS) */}
                <div className="bg-[#F0FDF4] border border-[#DCFCE7] rounded-2xl p-4 space-y-2">
                  <p className="text-xs font-bold text-[#166534]">Escrow Payment Breakdown (Held Securely)</p>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#18181B]">
                    <span className="bg-white px-2.5 py-1 rounded-lg border border-[#BBF7D0]">₹{currentExchange.totalRentalFee} Rental Fee</span>
                    <span>+</span>
                    <span className="bg-white px-2.5 py-1 rounded-lg border border-[#BBF7D0]">₹{currentExchange.platformFee} Platform Fee</span>
                    <span>+</span>
                    <span className="bg-white px-2.5 py-1 rounded-lg border border-[#BBF7D0]">₹{currentExchange.securityDeposit} Refundable Deposit</span>
                    <span>=</span>
                    <span className="bg-[#166534] text-white px-3 py-1 rounded-lg font-bold">₹{currentExchange.totalPaid} Escrow Total</span>
                  </div>
                </div>

                <button
                  onClick={nextStage}
                  className="w-full py-3 bg-[#84CC16] hover:bg-[#76B813] text-[#18181B] font-extrabold rounded-2xl text-xs sm:text-sm cursor-pointer shadow-xs"
                >
                  Simulate Lender Approving Request →
                </button>
              </div>
            )}

            {/* ─── STAGE 2: ACCEPTED ─── */}
            {activeStageIndex === 1 && (
              <div className="bg-white rounded-3xl border border-[#EDE8C8] p-6 sm:p-7 shadow-2xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#F0EAE0]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#DCFCE7] text-[#166534] flex items-center justify-center font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#18181B]">Stage 2: Request Accepted by Lender</h3>
                      <p className="text-xs text-[#71717A]">Meetup point confirmed on campus</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#166534] bg-[#DCFCE7] px-2.5 py-1 rounded-full">
                    Ready for Meetup
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-[#FAF7F0] border border-[#EFE8D6] rounded-2xl space-y-2 text-xs">
                    <p className="font-bold text-[#18181B] flex items-center gap-1.5">
                      <AppIcon name="map-pin" size={14} className="text-[#16A34A]" />
                      <span>Confirmed Handover Spot</span>
                    </p>
                    <p className="font-semibold text-sm text-[#18181B]">{currentExchange.handoverLocation}</p>
                    <p className="text-[#71717A]">Meet tomorrow morning at 10:00 AM</p>
                  </div>

                  <div className="p-4 bg-[#FAF7F0] border border-[#EFE8D6] rounded-2xl space-y-2 text-xs">
                    <p className="font-bold text-[#18181B] flex items-center gap-1.5">
                      <AppIcon name="shield-check" size={14} className="text-[#2563EB]" />
                      <span>Handover Verification Code</span>
                    </p>
                    <p className="text-lg font-black text-[#2563EB] tracking-widest">{currentExchange.handoverOtp}</p>
                    <p className="text-[#71717A]">Share this code with lender upon receiving item</p>
                  </div>
                </div>

                <button
                  onClick={nextStage}
                  className="w-full py-3 bg-[#84CC16] hover:bg-[#76B813] text-[#18181B] font-extrabold rounded-2xl text-xs sm:text-sm cursor-pointer shadow-xs"
                >
                  Proceed to Physical Handover & Inspection →
                </button>
              </div>
            )}

            {/* ─── STAGE 3: HANDOVER ─── */}
            {activeStageIndex === 2 && (
              <div className="bg-white rounded-3xl border border-[#EDE8C8] p-6 sm:p-7 shadow-2xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#F0EAE0]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#FEF3C7] text-[#92400E] flex items-center justify-center font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#18181B]">Stage 3: Physical Handover & Before-Inspection</h3>
                      <p className="text-xs text-[#71717A]">Record before-condition photo and checklist before taking custody</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#92400E] bg-[#FEF3C7] px-2.5 py-1 rounded-full">
                    In Person Handover
                  </span>
                </div>

                {/* Before Condition Checklist (Section 8 of PS) */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-[#18181B]">Before-Condition Checklist (Handover Verification)</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {currentExchange.beforeCondition.checklist.map((item, idx) => (
                      <div key={idx} className="p-3 bg-[#FAF7F0] border border-[#EFE8D6] rounded-xl flex items-center gap-2.5 text-xs text-[#18181B]">
                        <span className="text-[#16A34A] font-bold">✓</span>
                        <span>{item.item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-[#FAF7F0] border border-[#EFE8D6] rounded-xl text-xs text-[#52525B]">
                  <strong>Inspection Photo Logged:</strong> {currentExchange.beforeCondition.notes} ({currentExchange.beforeCondition.date})
                </div>

                <button
                  onClick={nextStage}
                  className="w-full py-3 bg-[#84CC16] hover:bg-[#76B813] text-[#18181B] font-extrabold rounded-2xl text-xs sm:text-sm cursor-pointer shadow-xs"
                >
                  Verify PIN & Start Active Borrowing →
                </button>
              </div>
            )}

            {/* ─── STAGE 4: BORROWED (ACTIVE) ─── */}
            {activeStageIndex === 3 && (
              <div className="bg-white rounded-3xl border border-[#EDE8C8] p-6 sm:p-7 shadow-2xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#F0EAE0]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#84CC16] text-[#18181B] flex items-center justify-center font-black">
                      4
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#18181B]">Stage 4: Active Borrowing Period</h3>
                      <p className="text-xs text-[#71717A]">Resource is currently in borrower custody</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#166534] bg-[#DCFCE7] px-2.5 py-1 rounded-full animate-pulse">
                    ● Active Custody
                  </span>
                </div>

                {/* Countdown Box */}
                <div className="bg-[#FAF5EA] border border-[#EAE1CB] rounded-2xl p-5 text-center space-y-2">
                  <p className="text-xs font-semibold text-[#71717A]">Time Remaining Until Return</p>
                  <p className="text-2xl sm:text-3xl font-black text-[#18181B] tracking-tight">
                    2 Days • 14 Hours • 32 Mins
                  </p>
                  <p className="text-xs font-bold text-[#166534]">
                    Due Date: {currentExchange.returnDueDate}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button className="py-2.5 bg-white hover:bg-[#FBF7F0] border border-[#EDE8C8] text-xs font-bold rounded-xl shadow-2xs cursor-pointer flex items-center justify-center gap-1.5">
                    <AppIcon name="message" size={13} />
                    <span>Message Lender</span>
                  </button>
                  <button className="py-2.5 bg-white hover:bg-[#FBF7F0] border border-[#EDE8C8] text-xs font-bold rounded-xl shadow-2xs cursor-pointer flex items-center justify-center gap-1.5">
                    <AppIcon name="clock" size={13} />
                    <span>Request Extension (+1 Day)</span>
                  </button>
                </div>

                <button
                  onClick={nextStage}
                  className="w-full py-3 bg-[#84CC16] hover:bg-[#76B813] text-[#18181B] font-extrabold rounded-2xl text-xs sm:text-sm cursor-pointer shadow-xs"
                >
                  Simulate Clock Approaching Return Deadline →
                </button>
              </div>
            )}

            {/* ─── STAGE 5: RETURN DUE ─── */}
            {activeStageIndex === 4 && (
              <div className="bg-white rounded-3xl border border-[#EDE8C8] p-6 sm:p-7 shadow-2xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#F0EAE0]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#FDE047] text-[#854D0E] flex items-center justify-center font-bold">
                      5
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#18181B]">Stage 5: Return Due Today</h3>
                      <p className="text-xs text-[#71717A]">Automated campus drop-off notification sent</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#854D0E] bg-[#FEF9C3] px-2.5 py-1 rounded-full">
                    Return Alert Active
                  </span>
                </div>

                <div className="p-4 bg-[#FEF3C7] border border-[#FDE68A] rounded-2xl space-y-2 text-xs text-[#92400E]">
                  <p className="font-bold text-sm flex items-center gap-1.5">
                    <AppIcon name="alert-circle" size={15} className="text-[#92400E]" />
                    <span>Return Deadline: Today, 6:00 PM</span>
                  </p>
                  <p>Drop-off location: <strong>{currentExchange.returnLocation}</strong>. Please ensure all included accessories (lens cap, SD card, battery, bag) are packed.</p>
                </div>

                <button
                  onClick={nextStage}
                  className="w-full py-3 bg-[#84CC16] hover:bg-[#76B813] text-[#18181B] font-extrabold rounded-2xl text-xs sm:text-sm cursor-pointer shadow-xs"
                >
                  Meet Lender & Hand Back Item (Return) →
                </button>
              </div>
            )}

            {/* ─── STAGE 6: RETURNED ─── */}
            {activeStageIndex === 5 && (
              <div className="bg-white rounded-3xl border border-[#EDE8C8] p-6 sm:p-7 shadow-2xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#F0EAE0]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#CFFAFE] text-[#0E7490] flex items-center justify-center font-bold">
                      6
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#18181B]">Stage 6: Item Returned to Owner</h3>
                      <p className="text-xs text-[#71717A]">Lender has physically received the resource</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#0E7490] bg-[#CFFAFE] px-2.5 py-1 rounded-full">
                    Handed Back
                  </span>
                </div>

                <div className="p-4 bg-[#FAF7F0] border border-[#EFE8D6] rounded-2xl space-y-1.5 text-xs">
                  <p className="font-bold text-[#18181B]">Handover Timestamp: {currentExchange.afterCondition.date}</p>
                  <p className="text-[#71717A]">Lender will now perform the post-borrow inspection check.</p>
                </div>

                <button
                  onClick={nextStage}
                  className="w-full py-3 bg-[#84CC16] hover:bg-[#76B813] text-[#18181B] font-extrabold rounded-2xl text-xs sm:text-sm cursor-pointer shadow-xs"
                >
                  Proceed to Condition Inspection & Damage Verification →
                </button>
              </div>
            )}

            {/* ─── STAGE 7: INSPECTION (BEFORE / AFTER COMPARISON) ─── */}
            {activeStageIndex === 6 && (
              <div className="bg-white rounded-3xl border border-[#EDE8C8] p-6 sm:p-7 shadow-2xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#F0EAE0]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#E0E7FF] text-[#4338CA] flex items-center justify-center font-bold">
                      7
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#18181B]">Stage 7: Before & After Condition Inspection</h3>
                      <p className="text-xs text-[#71717A]">Side-by-side comparison protocol (Section 8 of PS)</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#4338CA] bg-[#E0E7FF] px-2.5 py-1 rounded-full">
                    Inspection Review
                  </span>
                </div>

                {/* Side-by-Side Photo Comparison */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3 bg-[#FAF7F0] border border-[#EFE8D6] rounded-2xl space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="flex items-center gap-1.5">
                        <AppIcon name="camera" size={13} />
                        <span>Handover Condition (Before)</span>
                      </span>
                      <span className="text-[#16A34A]">{currentExchange.beforeCondition.rating}</span>
                    </div>
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-white">
                      <Image src={currentExchange.beforeCondition.photo} alt="Before" fill className="object-cover" />
                    </div>
                    <p className="text-[10.5px] text-[#71717A]">{currentExchange.beforeCondition.notes}</p>
                  </div>

                  <div className="p-3 bg-[#FAF7F0] border border-[#EFE8D6] rounded-2xl space-y-2">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="flex items-center gap-1.5">
                        <AppIcon name="camera" size={13} />
                        <span>Return Condition (After)</span>
                      </span>
                      <span className={hasDamageReported ? "text-[#DC2626]" : "text-[#16A34A]"}>
                        {hasDamageReported ? "Minor Scratches (Flagged)" : currentExchange.afterCondition.rating}
                      </span>
                    </div>
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-white">
                      <Image src={currentExchange.afterCondition.photo} alt="After" fill className="object-cover" />
                    </div>
                    <p className="text-[10.5px] text-[#71717A]">{currentExchange.afterCondition.notes}</p>
                  </div>
                </div>

                {/* Damage Simulator Toggle */}
                <div className="p-3.5 bg-[#FAF5EA] border border-[#EAE1CB] rounded-2xl flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-[#18181B]">Simulate Damage / Dispute Claim</p>
                    <p className="text-[10.5px] text-[#71717A]">Toggle to test deduction from security deposit vs 100% refund</p>
                  </div>
                  <button
                    onClick={() => setHasDamageReported(!hasDamageReported)}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                      hasDamageReported
                        ? "bg-[#DC2626] text-white"
                        : "bg-white border border-[#EDE8C8] text-[#52525B]"
                    }`}
                  >
                    {hasDamageReported ? "Damage Flagged (-₹250)" : "No Damage (Full Refund)"}
                  </button>
                </div>

                <button
                  onClick={nextStage}
                  className="w-full py-3 bg-[#84CC16] hover:bg-[#76B813] text-[#18181B] font-extrabold rounded-2xl text-xs sm:text-sm cursor-pointer shadow-xs"
                >
                  Approve Inspection & Calculate Final Settlement →
                </button>
              </div>
            )}

            {/* ─── STAGE 8: SETTLEMENT ─── */}
            {activeStageIndex === 7 && (
              <div className="bg-white rounded-3xl border border-[#EDE8C8] p-6 sm:p-7 shadow-2xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#F0EAE0]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#DCFCE7] text-[#166534] flex items-center justify-center font-bold">
                      8
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#18181B]">Stage 8: Final Financial Settlement</h3>
                      <p className="text-xs text-[#71717A]">Automatic deposit refund & lender payout (Section 6 & 10 of PS)</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#166534] bg-[#DCFCE7] px-2.5 py-1 rounded-full">
                    Settlement Executed
                  </span>
                </div>

                {/* Settlement Table */}
                <div className="bg-[#FAF7F0] border border-[#EFE8D6] rounded-2xl p-4 space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-[#E8DFC8]">
                    <span className="text-[#71717A]">Total Security Deposit Paid:</span>
                    <span className="font-bold text-[#18181B]">₹{currentExchange.securityDeposit}</span>
                  </div>
                  {hasDamageReported && (
                    <div className="flex justify-between py-1 border-b border-[#E8DFC8] text-[#DC2626]">
                      <span>Damage Assessment Deduction:</span>
                      <span className="font-bold">-₹{damageAmount}</span>
                    </div>
                  )}
                  <div className="flex justify-between py-1 border-b border-[#E8DFC8] text-[#166534] font-bold text-sm">
                    <span>Refund to Borrower (UPI):</span>
                    <span>₹{hasDamageReported ? currentExchange.securityDeposit - damageAmount : currentExchange.securityDeposit}</span>
                  </div>
                  <div className="flex justify-between py-1 pt-2 font-bold text-[#18181B]">
                    <span>Payout to Lender ({currentExchange.ownerName}):</span>
                    <span>₹{currentExchange.totalRentalFee}</span>
                  </div>
                </div>

                <div className="p-3 bg-[#F0FDF4] border border-[#DCFCE7] rounded-xl text-xs text-[#166534] font-semibold flex items-center gap-2">
                  <AppIcon name="check" size={14} className="text-[#16A34A] flex-shrink-0" />
                  <span>Refund transferred automatically to borrower UPI. Transaction ID: {currentExchange.settlement.transactionId}</span>
                </div>

                <button
                  onClick={nextStage}
                  className="w-full py-3 bg-[#84CC16] hover:bg-[#76B813] text-[#18181B] font-extrabold rounded-2xl text-xs sm:text-sm cursor-pointer shadow-xs"
                >
                  Proceed to Trust Rating & Reviews →
                </button>
              </div>
            )}

            {/* ─── STAGE 9: RATED (COMPLETED) ─── */}
            {activeStageIndex === 8 && (
              <div className="bg-white rounded-3xl border border-[#EDE8C8] p-6 sm:p-7 shadow-2xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-[#F0EAE0]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#FEF3C7] text-[#B45309] flex items-center justify-center font-bold">
                      9
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-[#18181B]">Stage 9: Mutual Ratings & Trust Score Increment</h3>
                      <p className="text-xs text-[#71717A]">Exchange successfully concluded (Section 1 of PS)</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#166534] bg-[#DCFCE7] px-2.5 py-1 rounded-full">
                    Completed ✓
                  </span>
                </div>

                {/* Trust Score Reward Card */}
                <div className="bg-[#FAF5EA] border border-[#EAE1CB] rounded-2xl p-5 text-center space-y-2">
                  <AppIcon name="sparkles" size={26} className="text-[#16A34A] mx-auto" />
                  <h4 className="text-base font-black text-[#18181B]">Trust Profile Updated!</h4>
                  <p className="text-xs text-[#52525B]">
                    Both parties completed this exchange responsibly. <strong>+15 Trust Points</strong> awarded.
                  </p>
                  <div className="inline-flex items-center gap-2 bg-white px-3 py-1 rounded-full border border-[#EDE8C8] text-xs font-bold text-[#16A34A] mt-1">
                    <span>New Trust Score: 4.85 / 5.0</span>
                  </div>
                </div>

                {/* 2 Reviews Display */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 bg-[#FAF7F0] border border-[#EFE8D6] rounded-2xl space-y-1.5">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-[#18181B]">Borrower Review</p>
                      <div className="flex items-center gap-0.5 text-[#F59E0B]">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <AppIcon key={s} name="star" size={11} />
                        ))}
                      </div>
                    </div>
                    <p className="text-[#52525B] leading-relaxed">&quot;{currentExchange.ratingData.borrowerReview}&quot;</p>
                  </div>

                  <div className="p-3.5 bg-[#FAF7F0] border border-[#EFE8D6] rounded-2xl space-y-1.5">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-[#18181B]">Lender Review</p>
                      <div className="flex items-center gap-0.5 text-[#F59E0B]">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <AppIcon key={s} name="star" size={11} />
                        ))}
                      </div>
                    </div>
                    <p className="text-[#52525B] leading-relaxed">&quot;{currentExchange.ratingData.lenderReview}&quot;</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setActiveStageIndex(0)}
                    className="flex-1 py-3 bg-[#18181B] text-white font-bold text-xs rounded-xl hover:bg-[#27272A] cursor-pointer"
                  >
                    ↺ Restart Simulation
                  </button>
                  <Link
                    href="/profile"
                    className="flex-1 py-3 bg-[#84CC16] text-[#18181B] font-extrabold text-xs rounded-xl hover:bg-[#76B813] flex items-center justify-center cursor-pointer shadow-xs"
                  >
                    View Updated Trust Profile →
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* ─── RIGHT: Resource Summary Sidebar (4 cols) ──────── */}
          <div className="lg:col-span-4 space-y-4">
            {/* Resource Card */}
            <div className="bg-white rounded-3xl border border-[#EDE8C8] p-5 shadow-2xs space-y-4">
              <h3 className="text-xs font-bold text-[#71717A] uppercase tracking-wider">
                Exchange Item Details
              </h3>

              <div className="relative aspect-video rounded-2xl overflow-hidden bg-[#F9FAFB]">
                <Image
                  src={currentExchange.itemImage}
                  alt={currentExchange.itemTitle}
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <span className="text-[10px] font-bold text-[#166534] bg-[#DCFCE7] px-2 py-0.5 rounded-full">
                  {currentExchange.category}
                </span>
                <h4 className="text-sm font-black text-[#18181B] mt-1 leading-snug">
                  {currentExchange.itemTitle}
                </h4>
              </div>

              {/* Owner and Borrower */}
              <div className="space-y-2.5 pt-2 border-t border-[#F0EAE0] text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-full ${currentExchange.ownerAvatarBg} flex items-center justify-center font-bold text-[10px]`}>
                      AM
                    </div>
                    <div>
                      <p className="font-bold text-[#18181B]">{currentExchange.ownerName}</p>
                      <p className="text-[10px] text-[#71717A]">Lender ({currentExchange.ownerDept})</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-[#16A34A] flex items-center gap-1">
                    <AppIcon name="check" size={11} />
                    <span>Owner</span>
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-full ${currentExchange.borrowerAvatarBg} flex items-center justify-center font-bold text-[10px]`}>
                      AS
                    </div>
                    <div>
                      <p className="font-bold text-[#18181B]">{currentExchange.borrowerName}</p>
                      <p className="text-[10px] text-[#71717A]">Borrower ({currentExchange.borrowerDept})</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-[#2563EB] flex items-center gap-1">
                    <AppIcon name="check" size={11} />
                    <span>Borrower</span>
                  </span>
                </div>
              </div>

              {/* Pricing Escrow Strip */}
              <div className="bg-[#FAF7F0] p-3 rounded-2xl border border-[#EFE8D6] text-xs space-y-1">
                <div className="flex justify-between text-[#71717A]">
                  <span>Daily Rate:</span>
                  <span className="font-bold text-[#18181B]">₹{currentExchange.dailyRate}/day</span>
                </div>
                <div className="flex justify-between text-[#71717A]">
                  <span>Deposit:</span>
                  <span className="font-bold text-[#18181B]">₹{currentExchange.securityDeposit}</span>
                </div>
                <div className="flex justify-between text-[#71717A]">
                  <span>Platform Fee:</span>
                  <span className="font-bold text-[#18181B]">₹{currentExchange.platformFee}</span>
                </div>
              </div>
            </div>

            {/* Quick Helper Card */}
            <div className="bg-[#FAF5EA] border border-[#EAE1CB] rounded-3xl p-5 text-xs space-y-2">
              <h4 className="font-bold text-[#18181B] flex items-center gap-1.5">
                <AppIcon name="shield-check" size={14} className="text-[#16A34A]" />
                <span>Campus Circular Protocol</span>
              </h4>
              <p className="text-[#52525B] text-[11.5px] leading-relaxed">
                Every borrow exchange is safeguarded by escrow protection, digital condition verification, and trust score indexing.
              </p>
            </div>
          </div>
        </div>
      </main>
      </div>
      </div>
    </div>
  );
}
