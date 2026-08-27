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
    { id: "trust", label: "🛡️ Trust & SSO", icon: "shield-check" },
    { id: "escrow", label: "💳 Escrow & Deposits", icon: "credit-card" },
    { id: "handover", label: "📦 Handover Photos", icon: "camera" },
    { id: "disputes", label: "⚠️ Damage & Disputes", icon: "alert-circle" },
  ];

  const faqs = [
    {
      category: "escrow",
      q: "When is my security deposit refunded?",
      a: "Your security deposit is held in automated escrow and is immediately released back to your original payment method as soon as the lender inspects the item and completes the return handover check-in.",
    },
    {
      category: "trust",
      q: "How does the Campus Trust Score work?",
      a: "Your Trust Score starts at 80 upon university email verification and climbs up to 100 based on verified successful handovers, on-time returns, and 5-star borrower reviews. Late returns or unverified disputes deduct points.",
    },
    {
      category: "handover",
      q: "Why do I need to take handover photos?",
      a: "Timestamped handover photos are the bedrock of our campus trust protocol. Taking 2 quick photos at pickup and return creates an indisputable visual record of item condition, protecting both parties against false damage claims.",
    },
    {
      category: "disputes",
      q: "What happens if an item is returned damaged?",
      a: "If damage is flagged during return check-in, the lender submits photo evidence. Our Campus Mediation Board reviews the check-in photos vs checkout photos. If damage occurred during the rental, repair costs are deducted from the escrow deposit and the remainder is refunded.",
    },
    {
      category: "trust",
      q: "Can non-students use Campus Circular?",
      a: "No. Campus Circular is an exclusive verified network. Only users with active university SSO (.edu / campus domain emails) can create accounts, list resources, or borrow gear.",
    },
    {
      category: "escrow",
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
    <div className="min-h-screen bg-[#FDFBF1] text-[#18181B] flex flex-col select-none">
      {/* ─── Top Navbar ───────────────────────────────────────── */}
      <AppNavbar variant="auth" />

      {/* ─── Main Content Container ───────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 w-full">
        {/* Header Hero */}
        <div className="text-center max-w-2xl mx-auto pb-8 border-b border-[#EDE8C8]">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#F5F8E9] border border-[#D8E8B8] rounded-full text-xs font-bold text-[#2E5E1C] mb-3 shadow-2xs">
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
              className="w-full pl-11 pr-4 py-3 bg-white border border-[#EDE8C8] rounded-2xl text-xs sm:text-sm text-[#18181B] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#6F9535] shadow-2xs"
            />
          </div>
        </div>

        {/* ─── Category Filter Tabs ────────────────────────────── */}
        <div className="flex items-center justify-center gap-2 flex-wrap my-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer border ${
                selectedCategory === cat.id
                  ? "bg-[#6F9535] text-white border-[#6F9535] shadow-xs"
                  : "bg-white text-[#52525B] border-[#EDE8C8] hover:bg-[#FEFAEE]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* ─── FAQ Accordion List ──────────────────────────────── */}
        <div className="space-y-3.5 my-8">
          {filteredFaqs.length === 0 ? (
            <div className="bg-white rounded-3xl border border-[#EDE8C8] p-8 text-center text-xs text-[#71717A]">
              No articles found matching &quot;{searchQuery}&quot;. Try another query or reach out below.
            </div>
          ) : (
            filteredFaqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-[#EDE8C8] overflow-hidden shadow-2xs transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FDFBF1]/50"
                  >
                    <span className="text-xs sm:text-sm font-bold text-[#18181B]">
                      {faq.q}
                    </span>
                    <span
                      className={`w-7 h-7 rounded-full bg-[#F5F2E8] flex items-center justify-center text-xs font-bold text-[#18181B] flex-shrink-0 transition-transform ${
                        isOpen ? "rotate-180 bg-[#DCFCE7] text-[#15803D]" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-[#52525B] leading-relaxed border-t border-[#F8F5EC]">
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
