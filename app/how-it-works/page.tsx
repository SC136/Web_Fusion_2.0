"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import AppNavbar from "@/app/components/layout/AppNavbar";
import { AppIcon } from "@/app/components/dashboard/Icons";

export default function HowItWorksPage() {
  const [userRole, setUserRole] = useState<"borrower" | "lender">("borrower");

  const steps = [
    {
      num: "01",
      title: "Discover Nearby Resources",
      desc: "Search equipment by category, distance, rating, or AI prompt (e.g., 'Camera & tripod for reel shoot'). Browse verified student listings within walking distance on your campus.",
      icon: "search",
      badge: "Smart Search",
      color: "bg-[#DEF7EC] text-[#03543F] border-[#BBF7D0]",
    },
    {
      num: "02",
      title: "Transparent Escrow Booking",
      desc: "Select your rental duration. Pay affordable daily rental rates + refundable security deposit. Funds are held safely in campus escrow until the exchange completes.",
      icon: "shield-check",
      badge: "Protected Escrow",
      color: "bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]",
    },
    {
      num: "03",
      title: "Visual Handover Inspection",
      desc: "Meet the lender at a campus landmark. Both parties take quick check-in photos to verify condition and unlock the loan on the platform.",
      icon: "camera",
      badge: "Verified Handover",
      color: "bg-[#E0F2FE] text-[#075985] border-[#BAE6FD]",
    },
    {
      num: "04",
      title: "On-Time Return & Trust Boost",
      desc: "Return the item on schedule. Once the lender confirms return condition, your 100% security deposit is immediately released and your Campus Trust Score levels up!",
      icon: "sparkles",
      badge: "Instant Release",
      color: "bg-[#F3E8FF] text-[#6B21A8] border-[#E9D5FF]",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF1] text-[#18181B] flex flex-col select-none animate-fadeIn">
      {/* ─── Top Navbar ───────────────────────────────────────── */}
      <AppNavbar variant="auth" />

      {/* ─── Hero Section ─────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8 w-full">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-[#EDE8C8]">
          <div className="max-w-xl text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#F5F8E9] border border-[#D8E8B8] rounded-full text-xs font-bold text-[#2E5E1C] mb-3 shadow-2xs">
              <AppIcon name="sparkles" size={14} className="text-[#6F9535]" />
              <span>HOW CAMPUS CIRCULAR WORKS</span>
              <span>✦</span>
            </div>
            <h1
              className="text-3xl sm:text-5xl font-extrabold text-[#18181B] tracking-tight leading-[1.1] mb-3"
              style={{ fontFamily: "'Pixelify Sans', monospace" }}
            >
              From Ownership to Access in 4 Steps.
            </h1>
            <p className="text-sm sm:text-base text-[#52525B] font-medium leading-relaxed mb-6">
              Why buy expensive gear for short projects? Campus Circular connects students to safely borrow, lend, and monetize everyday equipment with escrow security.
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <Link
                href="/browse"
                className="px-6 py-3 bg-gradient-to-b from-[#7FB634] to-[#689A24] text-white font-bold text-xs sm:text-sm rounded-2xl transition-all shadow-xs hover:from-[#8AC538] hover:to-[#72A627] flex items-center gap-2 cursor-pointer border-b-2 border-[#557F1C] active:translate-y-0.5"
              >
                <span>Browse Equipment</span>
                <AppIcon name="arrow-right" size={15} />
              </Link>
              <Link
                href="/listings"
                className="px-6 py-3 bg-white hover:bg-[#F9FAFB] text-[#18181B] font-bold text-xs sm:text-sm rounded-2xl transition-all border border-[#E5E7EB] shadow-xs flex items-center gap-2 cursor-pointer active:translate-y-0.5"
              >
                <span>List an Item</span>
                <AppIcon name="package" size={15} />
              </Link>
            </div>
          </div>

          {/* Right Hero Mascot Graphic */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex-shrink-0 flex items-center justify-center">
            <Image
              src="/mascots/books_camera.png"
              alt="Sharing Mascot"
              fill
              className="object-contain select-none pointer-events-none scale-105"
              priority
            />
          </div>
        </div>

        {/* ─── 4 Step Cards Grid ───────────────────────────────── */}
        <div className="py-12">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2
              className="text-2xl sm:text-3xl font-bold text-[#18181B] tracking-tight mb-2"
              style={{ fontFamily: "'Pixelify Sans', monospace" }}
            >
              The 4-Step Exchange Lifecycle
            </h2>
            <p className="text-xs sm:text-sm text-[#71717A]">
              Engineered with university trust protocols to guarantee safety and accountability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((step) => (
              <div
                key={step.num}
                className="bg-white rounded-3xl border border-[#EDE8C8] p-6 shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-black text-[#EDE8C8] group-hover:text-[#6F9535] transition-colors">
                      {step.num}
                    </span>
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${step.color}`}>
                      {step.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-[#18181B] mb-2 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#52525B] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#F8F5EC] flex items-center gap-2 text-xs font-bold text-[#6F9535]">
                  <span>Step Verified</span>
                  <AppIcon name="check" size={14} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── Role Comparison Switcher ────────────────────────── */}
        <div className="bg-white rounded-3xl border border-[#EDE8C8] p-6 sm:p-10 shadow-2xs my-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#EDE8C8]">
            <div>
              <h2
                className="text-2xl sm:text-3xl font-bold text-[#18181B]"
                style={{ fontFamily: "'Pixelify Sans', monospace" }}
              >
                Tailored for Both Sides
              </h2>
              <p className="text-xs sm:text-sm text-[#71717A] mt-1">
                Whether you want to borrow on a budget or earn from idle gear.
              </p>
            </div>

            {/* Switcher Pills */}
            <div className="inline-flex p-1 bg-[#F5F2E8] rounded-2xl border border-[#EDE8C8]">
              <button
                onClick={() => setUserRole("borrower")}
                className={`px-5 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                  userRole === "borrower"
                    ? "bg-white text-[#18181B] shadow-xs"
                    : "text-[#71717A] hover:text-[#18181B]"
                }`}
              >
                <AppIcon name="package" size={15} className={userRole === "borrower" ? "text-[#6F9535]" : "text-[#71717A]"} />
                <span>For Borrowers</span>
              </button>
              <button
                onClick={() => setUserRole("lender")}
                className={`px-5 py-2.5 text-xs sm:text-sm font-bold rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                  userRole === "lender"
                    ? "bg-white text-[#18181B] shadow-xs"
                    : "text-[#71717A] hover:text-[#18181B]"
                }`}
              >
                <AppIcon name="coins" size={15} className={userRole === "lender" ? "text-[#6F9535]" : "text-[#71717A]"} />
                <span>For Lenders</span>
              </button>
            </div>
          </div>

          {userRole === "borrower" ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
              <div className="bg-[#FDFBF1] p-5 rounded-2xl border border-[#EDE8C8] space-y-2 hover:shadow-xs transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#DCFCE7] text-[#15803D] flex items-center justify-center font-bold">
                  <AppIcon name="rupee" size={18} />
                </div>
                <h4 className="text-sm font-bold text-[#18181B]">Save up to 90%</h4>
                <p className="text-xs text-[#52525B] leading-relaxed">
                  Rent cameras, lab calculators, or studio lighting for days instead of paying thousands for equipment you use once.
                </p>
              </div>
              <div className="bg-[#FDFBF1] p-5 rounded-2xl border border-[#EDE8C8] space-y-2 hover:shadow-xs transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#DBEAFE] text-[#1D4ED8] flex items-center justify-center font-bold">
                  <AppIcon name="shield-check" size={18} />
                </div>
                <h4 className="text-sm font-bold text-[#18181B]">Safe Campus Pickups</h4>
                <p className="text-xs text-[#52525B] leading-relaxed">
                  Every member is authenticated via university email and campus ID badge before making requests.
                </p>
              </div>
              <div className="bg-[#FDFBF1] p-5 rounded-2xl border border-[#EDE8C8] space-y-2 hover:shadow-xs transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#FEF3C7] text-[#D97706] flex items-center justify-center font-bold">
                  <AppIcon name="sparkles" size={18} />
                </div>
                <h4 className="text-sm font-bold text-[#18181B]">Fast Approvals</h4>
                <p className="text-xs text-[#52525B] leading-relaxed">
                  Average owner response time is under 15 minutes. Pick up gear right outside your lecture hall.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fadeIn">
              <div className="bg-[#FDFBF1] p-5 rounded-2xl border border-[#EDE8C8] space-y-2 hover:shadow-xs transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#DCFCE7] text-[#15803D] flex items-center justify-center font-bold">
                  <AppIcon name="coins" size={18} />
                </div>
                <h4 className="text-sm font-bold text-[#18181B]">Monetize Idle Assets</h4>
                <p className="text-xs text-[#52525B] leading-relaxed">
                  Turn dust-gathering cameras, drones, textbooks, and monitors into regular monthly campus income.
                </p>
              </div>
              <div className="bg-[#FDFBF1] p-5 rounded-2xl border border-[#EDE8C8] space-y-2 hover:shadow-xs transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#FEF3C7] text-[#D97706] flex items-center justify-center font-bold">
                  <AppIcon name="shield-check" size={18} />
                </div>
                <h4 className="text-sm font-bold text-[#18181B]">100% Deposit Guarantee</h4>
                <p className="text-xs text-[#52525B] leading-relaxed">
                  Lender security deposit escrow guarantees you are fully compensated in case of late returns or damage.
                </p>
              </div>
              <div className="bg-[#FDFBF1] p-5 rounded-2xl border border-[#EDE8C8] space-y-2 hover:shadow-xs transition-all">
                <div className="w-10 h-10 rounded-xl bg-[#F3E8FF] text-[#6B21A8] flex items-center justify-center font-bold">
                  <AppIcon name="star" size={18} />
                </div>
                <h4 className="text-sm font-bold text-[#18181B]">Build Campus Reputation</h4>
                <p className="text-xs text-[#52525B] leading-relaxed">
                  Earn Super Lender badges, five-star peer reviews, and campus sustainability credentials.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ─── Bottom CTA Banner ───────────────────────────────── */}
        <div className="bg-gradient-to-r from-[#F5F8E9] to-[#EAF3E4] border border-[#D8E8B8] rounded-3xl p-8 sm:p-12 text-center my-8 shadow-2xs">
          <h3
            className="text-2xl sm:text-4xl font-extrabold text-[#18181B] mb-3"
            style={{ fontFamily: "'Pixelify Sans', monospace" }}
          >
            Start Sharing On Your Campus Today.
          </h3>
          <p className="text-xs sm:text-sm text-[#52525B] max-w-lg mx-auto mb-6">
            Join hundreds of university students saving money and reducing campus waste.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/browse"
              className="px-8 py-3.5 bg-gradient-to-b from-[#7FB634] to-[#689A24] text-white font-bold text-sm rounded-2xl transition-all shadow-xs hover:from-[#8AC538] hover:to-[#72A627] cursor-pointer border-b-2 border-[#557F1C]"
            >
              Explore Catalog Now →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
