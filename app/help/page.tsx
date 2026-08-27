"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import AppNavbar from "@/app/components/layout/AppNavbar";
import { AppIcon } from "@/app/components/dashboard/Icons";

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [ticketSubmitted, setTicketSubmitted] = useState(false);

  const categories = [
    { id: "all", label: "All Questions", icon: "help-circle" },
    { id: "trust", label: "Trust & SSO", icon: "shield-check", color: "text-[#3B82F6]" },
    { id: "escrow", label: "Escrow & Deposits", icon: "credit-card", color: "text-[#10B981]" },
    { id: "handover", label: "Handover Photos", icon: "camera", color: "text-[#F59E0B]" },
    { id: "disputes", label: "Damage & Disputes", icon: "alert-circle", color: "text-[#EF4444]" },
  ];

  const faqs = [
    {
      category: "escrow",
      categoryName: "Escrow & Deposits",
      icon: "credit-card",
      q: "When is my security deposit refunded?",
      a: "Your security deposit is held in automated escrow and is immediately released back to your original payment method as soon as the lender inspects the item and completes the return handover check-in.",
    },
    {
      category: "trust",
      categoryName: "Trust & SSO",
      icon: "shield-check",
      q: "How does the Campus Trust Score work?",
      a: "Your Trust Score starts at 80 upon university email verification and climbs up to 100 based on verified successful handovers, on-time returns, and 5-star borrower reviews. Late returns or unverified disputes deduct points.",
    },
    {
      category: "handover",
      categoryName: "Handover Photos",
      icon: "camera",
      q: "Why do I need to take handover photos?",
      a: "Timestamped handover photos are the bedrock of our campus trust protocol. Taking 2 quick photos at pickup and return creates an indisputable visual record of item condition, protecting both parties against false damage claims.",
    },
    {
      category: "disputes",
      categoryName: "Damage & Disputes",
      icon: "alert-circle",
      q: "What happens if an item is returned damaged?",
      a: "If damage is flagged during return check-in, the lender submits photo evidence. Our Campus Mediation Board reviews the check-in photos vs checkout photos. If damage occurred during the rental, repair costs are deducted from the escrow deposit and the remainder is refunded.",
    },
    {
      category: "trust",
      categoryName: "Trust & SSO",
      icon: "shield-check",
      q: "Can non-students use Campus Circular?",
      a: "No. Campus Circular is an exclusive verified network. Only users with active university SSO (.edu / campus domain emails) can create accounts, list resources, or borrow gear.",
    },
    {
      category: "escrow",
      categoryName: "Escrow & Deposits",
      icon: "credit-card",
      q: "What are the platform fees?",
      a: "Campus Circular charges a transparent 10% platform fee on the rental amount to fund campus locker maintenance, payment gateway processing, and student dispute protection. There are zero hidden subscription fees.",
    },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    if (selectedCategory !== "all" && faq.category !== selectedCategory) return false;
    if (searchQuery && !faq.q.toLowerCase().includes(searchQuery.toLowerCase()) && !faq.a.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#FDFBF1] text-[#18181B] flex flex-col select-none animate-fadeIn">
      {/* ─── Top Navbar ───────────────────────────────────────── */}
      <AppNavbar variant="auth" />

      {/* ─── Main Content Container ───────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 w-full">
        {/* Header Hero */}
        <div className="text-center max-w-2xl mx-auto pb-8 border-b border-[#EDE8C8]">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#F5F8E9] border border-[#D8E8B8] rounded-full text-xs font-bold text-[#2E5E1C] mb-3 shadow-2xs">
            <AppIcon name="help-circle" size={14} className="text-[#6F9535]" />
            <span>CAMPUS SUPPORT &amp; HELP CENTER</span>
            <span>✦</span>
          </div>
          <h1
            className="text-3xl sm:text-5xl font-extrabold text-[#18181B] tracking-tight leading-[1.1] mb-3"
            style={{ fontFamily: "'Pixelify Sans', monospace" }}
          >
            How Can We Help You?
          </h1>
          <p className="text-xs sm:text-sm text-[#52525B] font-medium leading-relaxed mb-6">
            Find quick answers about security deposit escrow, handover photo protocols, trust scores, and dispute mediation.
          </p>

          {/* Search Help Input */}
          <div className="relative max-w-lg mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#9CA3AF]">
              <AppIcon name="search" size={18} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search help articles (e.g. deposit refund, damage...)"
              className="w-full pl-11 pr-4 py-3 bg-white border border-[#EDE8C8] rounded-2xl text-xs sm:text-sm text-[#18181B] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#6F9535] shadow-2xs transition-all"
            />
          </div>
        </div>

        {/* ─── Category Filter Tabs (Professional Vector SVGs) ── */}
        <div className="flex items-center justify-center gap-2.5 flex-wrap my-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all duration-200 cursor-pointer border flex items-center gap-2 ${
                selectedCategory === cat.id
                  ? "bg-[#6F9535] text-white border-[#6F9535] shadow-xs scale-102"
                  : "bg-white text-[#52525B] border-[#EDE8C8] hover:bg-[#FEFAEE] hover:border-[#6F9535]/40"
              }`}
            >
              <AppIcon name={cat.icon} size={15} className={selectedCategory === cat.id ? "text-white" : cat.color || "text-[#52525B]"} />
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* ─── FAQ Accordion List ──────────────────────────────── */}
        <div className="space-y-3.5 my-8">
          {filteredFaqs.length === 0 ? (
            <div className="bg-white rounded-3xl border border-[#EDE8C8] p-8 text-center text-xs text-[#71717A] shadow-2xs">
              No articles found matching &quot;{searchQuery}&quot;. Try another query or submit a support ticket below.
            </div>
          ) : (
            filteredFaqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className={`bg-white rounded-2xl border border-[#EDE8C8] overflow-hidden shadow-2xs hover:shadow-md transition-all duration-200 ${
                    isOpen ? "ring-2 ring-[#6F9535]/30 border-[#6F9535]/40" : ""
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FDFBF1]/50 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-xl bg-[#F5F8E9] border border-[#D8E8B8] flex items-center justify-center text-[#6F9535] flex-shrink-0">
                        <AppIcon name={faq.icon} size={16} />
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-[#18181B] truncate">
                        {faq.q}
                      </span>
                    </div>
                    <div
                      className={`w-7 h-7 rounded-full bg-[#F5F2E8] flex items-center justify-center text-xs font-bold text-[#18181B] flex-shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180 bg-[#DCFCE7] text-[#15803D]" : ""
                      }`}
                    >
                      <AppIcon name="chevron-down" size={14} />
                    </div>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-2 text-xs sm:text-[13px] text-[#52525B] leading-relaxed border-t border-[#F8F5EC] pl-16 animate-fadeIn">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* ─── Direct Contact / Support Ticket Card ────────────── */}
        <div className="bg-white rounded-3xl border border-[#EDE8C8] p-6 sm:p-10 shadow-2xs my-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-md space-y-3 text-center md:text-left">
              <div className="w-12 h-12 rounded-2xl bg-[#F5F8E9] border border-[#D8E8B8] flex items-center justify-center text-[#16A34A] mx-auto md:mx-0">
                <AppIcon name="mail" size={24} />
              </div>
              <h3
                className="text-2xl font-extrabold text-[#18181B]"
                style={{ fontFamily: "'Pixelify Sans', monospace" }}
              >
                Still Need Assistance?
              </h3>
              <p className="text-xs text-[#52525B] leading-relaxed">
                Our student-run campus support team responds in less than 15 minutes during operating campus hours (9 AM – 9 PM).
              </p>
              <div className="flex items-center justify-center md:justify-start gap-3 pt-2 text-xs font-bold text-[#16A34A]">
                <span>⚡ Live Mediation Active</span>
                <span>•</span>
                <span>📍 Student Center Room 204</span>
              </div>
            </div>

            {/* Quick Ticket Form */}
            <div className="w-full md:max-w-sm bg-[#FDFBF1] border border-[#EDE8C8] p-5 rounded-2xl space-y-3">
              {ticketSubmitted ? (
                <div className="text-center py-6 space-y-2">
                  <span className="text-3xl">✅</span>
                  <h4 className="text-sm font-bold text-[#18181B]">Ticket Received!</h4>
                  <p className="text-xs text-[#52525B]">A campus peer coordinator will reply to your student email shortly.</p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setTicketSubmitted(true);
                  }}
                  className="space-y-3 text-xs"
                >
                  <div>
                    <label className="block font-bold text-[#18181B] mb-1">Issue Subject</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Deposit release inquiry"
                      className="w-full px-3 py-2 bg-white border border-[#EDE8C8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6F9535]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#18181B] mb-1">Exchange ID (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. EX-8941"
                      className="w-full px-3 py-2 bg-white border border-[#EDE8C8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6F9535]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#18181B] mb-1">Description</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Explain what happened..."
                      className="w-full px-3 py-2 bg-white border border-[#EDE8C8] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6F9535]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-gradient-to-b from-[#7FB634] to-[#689A24] text-white font-bold rounded-xl hover:from-[#8AC538] hover:to-[#72A627] transition-all shadow-xs cursor-pointer active:translate-y-0.5"
                  >
                    Submit Support Ticket →
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
