"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Sidebar from "@/app/components/dashboard/Sidebar";
import AppNavbar from "@/app/components/layout/AppNavbar";
import { AppIcon } from "@/app/components/dashboard/Icons";
import { mockAiBundles, browseResources } from "@/app/data/mockData";

export default function AiAssistantPage() {
  const router = useRouter();

  // Active user query input
  const [promptText, setPromptText] = useState("I need to make a reel for my club event tomorrow");
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingStep, setThinkingStep] = useState(0);
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  // Selected bundle index
  const [selectedBundleId, setSelectedBundleId] = useState("bundle-creator");

  // Selected item IDs within the bundle (allows students to toggle off items)
  const activeBundle = useMemo(() => {
    return mockAiBundles.find((b) => b.id === selectedBundleId) || mockAiBundles[0];
  }, [selectedBundleId]);

  const [selectedItemIds, setSelectedItemIds] = useState<string[]>(
    activeBundle.items.map((i) => i.id)
  );

  // Alternative swaps state { [originalId]: swappedName }
  const [swappedAlternatives, setSwappedAlternatives] = useState<{ [key: string]: string }>({});

  // Duration in days
  const [borrowDuration, setBorrowDuration] = useState<number>(2);

  // Modal confirmation state
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [agreementChecked, setAgreementChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle prompt change & smart match
  const handleGenerateBundle = (customPrompt?: string) => {
    const textToMatch = (customPrompt !== undefined ? customPrompt : promptText).toLowerCase();
    setIsThinking(true);
    setThinkingStep(1);

    setTimeout(() => {
      setThinkingStep(2);
    }, 350);

    setTimeout(() => {
      setThinkingStep(3);
    }, 700);

    setTimeout(() => {
      // Find matching bundle or default to creator
      let matched = mockAiBundles.find((b) =>
        b.matchKeywords.some((kw) => textToMatch.includes(kw))
      );

      if (!matched) {
        matched = mockAiBundles[0];
      }

      setSelectedBundleId(matched.id);
      setSelectedItemIds(matched.items.map((i) => i.id));
      setSwappedAlternatives({});
      setIsThinking(false);
      setThinkingStep(0);
    }, 1100);
  };

  const handleChipClick = (scenarioPrompt: string) => {
    setPromptText(scenarioPrompt);
    handleGenerateBundle(scenarioPrompt);
  };

  // Toggle item inclusion
  const toggleItem = (itemId: string) => {
    if (selectedItemIds.includes(itemId)) {
      if (selectedItemIds.length === 1) return; // keep at least 1
      setSelectedItemIds(selectedItemIds.filter((id) => id !== itemId));
    } else {
      setSelectedItemIds([...selectedItemIds, itemId]);
    }
  };

  // Swap alternative
  const handleSwapAlternative = (itemId: string, altText: string) => {
    setSwappedAlternatives((prev) => ({
      ...prev,
      [itemId]: prev[itemId] ? "" : altText,
    }));
  };

  // Calculate pricing
  const activeItems = activeBundle.items.filter((i) => selectedItemIds.includes(i.id));
  const rawDailyTotal = activeItems.reduce((acc, curr) => acc + curr.dailyRate, 0);
  const discountAmount = Math.round(
    rawDailyTotal * (activeBundle.bundleDiscountPercent / 100)
  );
  const discountedDailyRate = rawDailyTotal - discountAmount;
  const totalRentalFee = discountedDailyRate * borrowDuration;
  const totalDeposit = activeItems.reduce((acc, curr) => acc + curr.deposit, 0);
  const platformFee = 25;
  const totalEscrowPayable = totalRentalFee + totalDeposit + platformFee;

  const handleConfirmBundleBorrow = () => {
    setIsSubmitting(true);
    const bundleExchange = {
      id: `EX-KIT-${Math.floor(1000 + Math.random() * 9000)}`,
      itemTitle: activeBundle.title,
      itemImage: activeItems[0]?.image || "/products/camera.jpg",
      category: "AI Smart Bundle",
      ownerName: "Campus Verified Collective",
      ownerDept: "Multidisciplinary Resource Pool",
      ownerAvatarBg: "bg-purple-100 text-purple-800",
      borrowerName: "Anaya Sharma",
      borrowerDept: "3rd Year, Computer Engg",
      borrowerAvatarBg: "bg-emerald-100 text-emerald-800",
      currentStageIndex: 0,
      requestedDate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      startDate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      returnDueDate: new Date(Date.now() + borrowDuration * 86400000).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) + ", 6:00 PM",
      durationDays: borrowDuration,
      dailyRate: discountedDailyRate,
      platformFee: platformFee,
      securityDeposit: totalDeposit,
      totalRentalFee: totalRentalFee,
      totalPaid: totalEscrowPayable,
      handoverOtp: `CC-${Math.floor(1000 + Math.random() * 9000)}`,
      handoverLocation: "Campus Central Library Plaza",
      returnLocation: "Engineering Block Quad",
      beforeCondition: {
        photo: activeItems[0]?.image || "/products/camera.jpg",
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) + " • 10:00 AM",
        rating: "Excellent",
        checklist: activeItems.map((item) => ({ item: `${item.name} tested & verified`, verified: true })),
        notes: `AI Smart Bundle (${activeItems.length} items) verified and packaged together.`,
      },
      afterCondition: {
        photo: activeItems[0]?.image || "/products/camera.jpg",
        date: new Date(Date.now() + borrowDuration * 86400000).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) + " • 5:30 PM",
        rating: "Excellent",
        checklist: activeItems.map((item) => ({ item: `${item.name} returned & clean`, verified: true })),
        notes: "All bundle items accounted for and returned in working order.",
      },
      settlement: {
        borrowingCharge: totalRentalFee,
        platformFee: platformFee,
        lateFeeDeduction: 0,
        damageDeduction: 0,
        refundedDeposit: totalDeposit,
        lenderPayout: totalRentalFee,
        refundStatus: "Transferred to Student Escrow Account",
        transactionId: `TXN-CC-${Math.floor(100000 + Math.random() * 900000)}`,
      },
      ratingData: {
        borrowerGivenRating: 5,
        borrowerReview: "Super convenient to borrow the entire equipment bundle with 1 click!",
        lenderGivenRating: 5,
        lenderReview: "Anaya took great care of all items in the kit. Returned promptly!",
        trustPointsEarned: 20,
      },
    };

    try {
      const existingStr = localStorage.getItem("campus_circular_exchanges");
      const existing = existingStr ? JSON.parse(existingStr) : [];
      const updated = [bundleExchange, ...existing.filter((e: any) => e.id !== bundleExchange.id)];
      localStorage.setItem("campus_circular_exchanges", JSON.stringify(updated));
      localStorage.setItem("campus_circular_selected_exchange", bundleExchange.id);
    } catch (err) {
      console.error("Failed to save bundle borrow request:", err);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setIsConfirmModalOpen(false);
      router.push("/loans");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#FBF7F0] text-[#18181B] select-none flex flex-col w-full max-w-full overflow-x-hidden">
      {/* ─── FULL-WIDTH CONTINUOUS TOP NAVBAR ─────────────── */}
      <AppNavbar variant="auth" />

      {/* ─── MAIN BODY (Sidebar + Content) ─────────────────── */}
      <div className="flex-1 flex w-full max-w-full overflow-x-hidden">
        {/* ─── Left Persistent Sidebar ──────────────────────── */}
        <Sidebar />

        {/* ─── Main Content Area ────────────────────────────── */}
        <div className="flex-1 lg:ml-[240px] flex flex-col min-w-0 w-full max-w-full overflow-x-hidden">

        {/* ─── Hero Header ─────────────────────────────────────── */}
        <div className="px-5 lg:px-8 pt-6 pb-2 w-full">
          <div className="bg-gradient-to-r from-[#EFF6FE] via-[#F5F3FF] to-[#FAF5FF] border border-[#DDD6FE] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xs relative overflow-hidden">
            <div className="space-y-2 max-w-2xl z-10">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-[#EDE9FE] text-[#6D28D9] px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <AppIcon name="sparkles" size={12} className="text-[#7C3AED]" />
                  <span>AI Need-Based Discovery • Section 4</span>
                </span>
                <span className="text-xs text-[#7C3AED] font-semibold">
                  Multi-Item Smart Bundle Suggester
                </span>
              </div>
              <h1
                className="text-2xl sm:text-4xl font-extrabold text-[#18181B] tracking-tight leading-tight"
                style={{ fontFamily: "'Pixelify Sans', monospace" }}
              >
                AI Natural Language Kit Builder
              </h1>
              <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed">
                Describe what you want to accomplish in natural language (e.g. <em>&quot;I need to make a reel for my club event tomorrow&quot;</em>). Our AI automatically analyzes dependencies, scans nearby campus inventory, and configures an optimal discounted gear bundle.
              </p>
            </div>

            {/* AI Mascot Animation Asset */}
            <div className="relative flex-shrink-0 self-center md:self-auto -mr-2">
              <div className="relative w-32 h-32 sm:w-36 sm:h-36">
                <Image
                  src="/mascots/admin_robot.png"
                  alt="AI Assistant Robot Mascot"
                  fill
                  sizes="144px"
                  className="object-contain select-none pointer-events-none drop-shadow-md"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* ─── Main Content ──────────────────────────────────────── */}
        <main className="px-5 lg:px-8 py-5 w-full space-y-6">
          {/* ══════════════════════════════════════════════════════════
             1. NATURAL LANGUAGE PROMPT INPUT & SCENARIO CHIPS
             ══════════════════════════════════════════════════════════ */}
          <div className="bg-white rounded-3xl border border-[#EDE8C8] p-5 sm:p-6 shadow-2xs space-y-4">
            <label className="text-xs font-black text-[#374151] uppercase tracking-wider flex items-center gap-1.5">
              <AppIcon name="message" size={14} className="text-[#6F9535]" />
              <span>Describe Your Requirement / Event:</span>
            </label>

            {/* Prompt Input Box */}
            <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleGenerateBundle()}
                  placeholder="e.g. I need to make a reel for my club event tomorrow..."
                  className="w-full pl-4 pr-12 py-3.5 bg-[#FAF7F0] border border-[#EDE8C8] rounded-2xl text-xs sm:text-sm text-[#18181B] font-semibold placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#84CC16] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setIsVoiceActive(!isVoiceActive)}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl flex items-center justify-center text-sm transition-all cursor-pointer ${
                    isVoiceActive ? "bg-[#DC2626] text-white animate-pulse" : "bg-white text-[#71717A] hover:text-[#18181B]"
                  }`}
                  title="Voice Input (Simulation)"
                >
                  <AppIcon name="mic" size={15} />
                </button>
              </div>

              <button
                type="button"
                onClick={() => handleGenerateBundle()}
                disabled={isThinking}
                className="px-6 py-3.5 bg-gradient-to-b from-[#7FB634] to-[#689A24] text-white font-bold text-xs sm:text-sm rounded-2xl transition-all shadow-xs hover:from-[#8AC538] hover:to-[#72A627] cursor-pointer flex items-center justify-center gap-2 flex-shrink-0 border-b-2 border-[#557F1C] active:translate-y-0.5"
              >
                <span>{isThinking ? "Configuring Kit..." : "Generate Smart Kit"}</span>
                <AppIcon name="sparkles" size={15} />
              </button>
            </div>

            {/* Quick Scenario Chips (Section 4 Examples) */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-bold text-[#71717A]">
                Try Sample Scenarios:
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Club Event Reel Shoot (PS Sec 4)", prompt: "I need to make a reel for my club event tomorrow", icon: "video" },
                  { label: "Electronics & IoT Lab Exam", prompt: "I have an electronics & IoT lab midterm on Friday", icon: "zap" },
                  { label: "Weekend Campus Trekking", prompt: "Heading for weekend trekking near campus hills", icon: "leaf" },
                  { label: "Placement Interview & Pitch", prompt: "Mock placement interview tomorrow morning", icon: "user" },
                ].map((chip) => (
                  <button
                    key={chip.label}
                    onClick={() => handleChipClick(chip.prompt)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                      promptText === chip.prompt
                        ? "bg-[#18181B] text-white border-[#18181B]"
                        : "bg-[#FAF7F0] hover:bg-[#F3EFE3] text-[#52525B] border-[#EDE8C8]"
                    }`}
                  >
                    <AppIcon name={chip.icon} size={13} />
                    <span>{chip.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Thinking Progress Bar */}
            {isThinking && (
              <div className="p-4 bg-[#F5F3FF] border border-[#DDD6FE] rounded-2xl space-y-2 animate-fadeIn">
                <div className="flex items-center justify-between text-xs font-bold text-[#6D28D9]">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#7C3AED] animate-ping" />
                    {thinkingStep === 1 && "1/3: Analyzing equipment dependencies and audio-visual requirements..."}
                    {thinkingStep === 2 && "2/3: Finding closest verified lenders (< 0.8 km) with 4.8+ trust..."}
                    {thinkingStep === 3 && "3/3: Applying 15% Campus Bundle Discount and generating escrow..."}
                  </span>
                  <span>{thinkingStep * 33}%</span>
                </div>
                <div className="w-full h-1.5 bg-[#DDD6FE] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#7C3AED] rounded-full transition-all duration-300"
                    style={{ width: `${thinkingStep * 33}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* ══════════════════════════════════════════════════════════
             2. RECOMMENDED MULTI-ITEM SMART KIT BREAKDOWN
             ══════════════════════════════════════════════════════════ */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Multi-Item Kit Cards (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              {/* Kit Header Strip */}
              <div className="bg-white rounded-3xl border border-[#EDE8C8] p-5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black bg-[#DCFCE7] text-[#166534] px-2.5 py-0.5 rounded-full">
                      {activeBundle.badge}
                    </span>
                    <span className="text-xs text-[#71717A] font-semibold">
                      {activeItems.length} of {activeBundle.items.length} Items Selected
                    </span>
                  </div>
                  <h2 className="text-lg font-black text-[#18181B] mt-1">
                    {activeBundle.title}
                  </h2>
                  <p className="text-xs text-[#52525B]">
                    {activeBundle.tagline}
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-[#FAF7F0] p-2 rounded-2xl border border-[#EFE8D6] self-start sm:self-auto">
                  <span className="text-xs font-bold text-[#71717A]">Borrow Duration:</span>
                  <select
                    value={borrowDuration}
                    onChange={(e) => setBorrowDuration(parseInt(e.target.value))}
                    className="bg-white border border-[#EDE8C8] text-xs font-bold rounded-xl px-2.5 py-1 text-[#18181B] focus:outline-none"
                  >
                    <option value={1}>1 Day</option>
                    <option value={2}>2 Days</option>
                    <option value={3}>3 Days</option>
                    <option value={5}>5 Days</option>
                    <option value={7}>1 Week</option>
                  </select>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                {activeBundle.items.map((item, idx) => {
                  const isChecked = selectedItemIds.includes(item.id);
                  const isSwapped = Boolean(swappedAlternatives[item.id]);

                  return (
                    <div
                      key={item.id}
                      className={`p-4 rounded-3xl border transition-all ${
                        isChecked
                          ? "bg-white border-[#EDE8C8] shadow-2xs"
                          : "bg-[#F4EFE6]/50 border-[#E8DFC8] opacity-60"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        {/* Checkbox & Details */}
                        <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleItem(item.id)}
                            className="w-5 h-5 rounded-lg accent-[#84CC16] cursor-pointer mt-1 sm:mt-0"
                          />

                          <div className="relative w-14 h-14 rounded-2xl bg-[#F9FAFB] overflow-hidden border border-[#E5E7EB] flex-shrink-0">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              sizes="56px"
                              className="object-cover"
                            />
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#F3F4F6] text-[#374151]">
                                Item {idx + 1}: {item.category}
                              </span>
                              <span className="text-[10px] text-[#16A34A] font-bold">
                                {item.condition}
                              </span>
                            </div>
                            <h3 className="text-xs sm:text-sm font-bold text-[#18181B] truncate mt-0.5">
                              {isSwapped ? swappedAlternatives[item.id] : item.name}
                            </h3>
                            <p className="text-[11px] text-[#71717A] flex items-center gap-1.5 sm:gap-2 mt-0.5 flex-wrap">
                              <span>Shared by <strong>{item.owner}</strong> ({item.department})</span>
                              <span>•</span>
                              <span>★ {item.rating}</span>
                              <span>•</span>
                              <span className="text-[#16A34A] font-semibold">{item.distance} km away</span>
                            </p>
                          </div>
                        </div>

                        {/* Pricing & Alternative Swap CTA */}
                        <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-[#F0EAE0]">
                          <div className="text-left sm:text-right">
                            <p className="text-xs font-black text-[#18181B]">₹{item.dailyRate} / day</p>
                            <p className="text-[10.5px] text-[#71717A]">Deposit: ₹{item.deposit}</p>
                          </div>

                          {item.alternative && (
                            <button
                              type="button"
                              onClick={() => handleSwapAlternative(item.id, item.alternative!)}
                              className="text-[11px] font-bold text-[#2563EB] hover:underline bg-[#EFF6FF] hover:bg-[#DBEAFE] px-2.5 py-1.5 rounded-xl transition-all cursor-pointer flex-shrink-0"
                            >
                              {isSwapped ? "↺ Revert Item" : "⇄ Swap Alternative"}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Consolidated Escrow & 1-Click Borrow Card (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white rounded-3xl border border-[#EDE8C8] p-5 sm:p-6 shadow-2xs space-y-4 sticky top-20">
                <div className="flex items-center justify-between pb-3 border-b border-[#F0EAE0]">
                  <h3 className="text-sm font-black text-[#18181B]">
                    Smart Bundle Escrow
                  </h3>
                  <span className="text-[10.5px] font-bold text-[#166534] bg-[#DCFCE7] px-2 py-0.5 rounded-full">
                    {activeBundle.bundleDiscountPercent}% Discount Applied
                  </span>
                </div>

                <div className="space-y-2.5 text-xs text-[#52525B]">
                  <div className="flex justify-between">
                    <span>Individual Rates Total ({activeItems.length} items):</span>
                    <span className="text-[#9CA3AF] line-through">₹{rawDailyTotal} / day</span>
                  </div>
                  <div className="flex justify-between text-[#16A34A] font-bold">
                    <span>Bundle Discount ({activeBundle.bundleDiscountPercent}% OFF):</span>
                    <span>-₹{discountAmount} / day</span>
                  </div>
                  <div className="flex justify-between font-bold text-[#18181B] pt-1 border-t border-[#F0EAE0]">
                    <span>Discounted Daily Rate:</span>
                    <span>₹{discountedDailyRate} / day</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rental Charge ({borrowDuration} Days):</span>
                    <span className="font-bold text-[#18181B]">₹{totalRentalFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Combined Security Deposit:</span>
                    <span className="font-bold text-[#18181B]">₹{totalDeposit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Platform Protocol Fee:</span>
                    <span className="font-bold text-[#18181B]">₹{platformFee}</span>
                  </div>
                </div>

                {/* Total Escrow Box */}
                <div className="bg-[#FAF7F0] p-3.5 rounded-2xl border border-[#EFE8D6] space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#18181B]">Total Payable on Handover:</span>
                    <span className="text-lg font-black text-[#16A34A]">₹{totalEscrowPayable}</span>
                  </div>
                  <p className="text-[10px] text-[#71717A] leading-tight">
                    * ₹{totalDeposit} deposit is 100% refundable upon on-time return and condition signoff.
                  </p>
                </div>

                {/* 1-Click Borrow CTA */}
                <button
                  type="button"
                  onClick={() => setIsConfirmModalOpen(true)}
                  className="w-full py-3.5 bg-gradient-to-b from-[#7FB634] to-[#689A24] text-white font-bold text-xs rounded-2xl transition-all shadow-xs hover:from-[#8AC538] hover:to-[#72A627] cursor-pointer flex items-center justify-center gap-1.5 border-b-2 border-[#557F1C] active:translate-y-0.5"
                >
                  <span>1-Click Borrow Whole Bundle ({activeItems.length} Items) →</span>
                </button>

                <div className="text-center">
                  <Link
                    href="/requests"
                    className="text-[11.5px] font-bold text-[#71717A] hover:text-[#18181B] hover:underline"
                  >
                    Looking for a specific item? Post a Wanted Request →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
        </div>
      </div>

      {/* ─── 1-Click Bundle Borrow Confirmation Modal ──────────── */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#EDE8C8] p-6 max-w-lg w-full shadow-2xl space-y-4 animate-fadeInUp">
            <div className="flex items-center justify-between pb-3 border-b border-[#F0EAE0]">
              <div className="flex items-center gap-2">
                <span className="text-xl">🤝</span>
                <h3 className="text-base font-bold text-[#18181B]">
                  Confirm Smart Kit Borrow Request
                </h3>
              </div>
              <button
                onClick={() => setIsConfirmModalOpen(false)}
                className="text-[#71717A] hover:text-[#18181B] text-lg font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-[#FAF7F0] p-3.5 rounded-2xl border border-[#EFE8D6] space-y-2">
                <p className="font-bold text-[#18181B]">
                  📦 Items in Bundle ({activeItems.length}):
                </p>
                <ul className="list-disc pl-4 space-y-1 text-[#52525B]">
                  {activeItems.map((item) => (
                    <li key={item.id}>
                      <strong>{item.name}</strong> (Lender: {item.owner} • {item.distance} km)
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-between p-3 bg-[#ECFDF5] rounded-xl border border-[#A7F3D0] text-[#065F46] font-bold">
                <span>Total Escrow: ₹{totalEscrowPayable}</span>
                <span>Duration: {borrowDuration} Days</span>
              </div>

              {/* Digital Agreement Terms */}
              <label className="flex items-start gap-2.5 p-3 bg-[#FAF7F0] rounded-xl border border-[#EFE8D6] cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreementChecked}
                  onChange={(e) => setAgreementChecked(e.target.checked)}
                  className="w-4 h-4 rounded-md accent-[#84CC16] mt-0.5"
                />
                <span className="text-[11.5px] text-[#374151] leading-relaxed">
                  I agree to inspect items before handover, return them clean by the due timestamp, and abide by the Campus Circular Escrow and Damage policy.
                </span>
              </label>
            </div>

            <div className="flex gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setIsConfirmModalOpen(false)}
                className="px-4 py-2.5 bg-[#FAF7F0] hover:bg-[#F3EFE3] border border-[#EDE8C8] text-xs font-bold rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!agreementChecked || isSubmitting}
                onClick={handleConfirmBundleBorrow}
                className="flex-1 py-2.5 bg-gradient-to-b from-[#7FB634] to-[#689A24] text-white hover:from-[#8AC538] hover:to-[#72A627] disabled:opacity-40 font-bold text-xs rounded-xl shadow-xs cursor-pointer text-center border-b-2 border-[#557F1C] active:translate-y-0.5"
              >
                {isSubmitting ? "Submitting to Lenders..." : "Confirm & Open Lifecycle Tracker →"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
