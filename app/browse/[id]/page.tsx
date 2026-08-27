"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import AppNavbar from "@/app/components/layout/AppNavbar";
import { browseResources, recommendedItems } from "@/app/data/mockData";
import { AppIcon } from "@/app/components/dashboard/Icons";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  // Map recommendedItems to full product shape if needed
  const foundRec = recommendedItems.find((r) => r.id === id);
  const normalizedRec = foundRec
    ? {
        id: foundRec.id,
        title: foundRec.name,
        category: "Photography & Media",
        image: foundRec.image,
        status: "Available Now",
        statusType: "now",
        isFavorite: false,
        owner: foundRec.owner,
        department: "Campus Verified Lender",
        avatarBg: "bg-blue-100 text-blue-800",
        initials: foundRec.owner
          .split(" ")
          .map((n) => n[0])
          .join(""),
        rating: foundRec.rating,
        reviews: 28,
        distance: parseFloat(foundRec.distance) || 0.8,
        condition: "Like New",
        dailyRate: parseInt(foundRec.pricePerDay.replace(/[^0-9]/g, "")) || 150,
        deposit: parseInt(foundRec.deposit.replace(/[^0-9]/g, "")) || 1000,
        lateFee: 40,
      }
    : null;

  // Find product or fallback to first item
  const product =
    browseResources.find((p) => p.id === id) ||
    normalizedRec ||
    browseResources[0];

  // Gallery active images
  const galleryImages = [
    product.image,
    "/products/camera.jpg",
    "/products/tripod.jpg",
    "/products/ringlight.jpg",
    "/products/mic.jpg",
    "/mascots/books_camera.png",
  ];
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // States
  const [isSaved, setIsSaved] = useState(product.isFavorite || false);
  const [isBorrowModalOpen, setIsBorrowModalOpen] = useState(false);
  const [borrowDays, setBorrowDays] = useState(3);
  const [requestSubmitted, setRequestSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<"details" | "agreement" | "condition">("details");

  // Dynamic pricing
  const dailyRate = (product as any).dailyRate || 150;
  const deposit = (product as any).deposit || 1500;
  const lateFee = (product as any).lateFee || 50;
  const platformFee = Math.round(dailyRate * borrowDays * 0.1);
  const rentalTotal = dailyRate * borrowDays;
  const totalPayable = rentalTotal + platformFee + deposit;

  return (
    <div className="min-h-screen bg-[#FBF7F0] text-[#18181B] flex flex-col select-none">
      {/* ─── Top Navbar ───────────────────────────────────────── */}
      <AppNavbar variant="auth" />

      {/* ─── Breadcrumb Bar ───────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-3 w-full flex items-center justify-between">
        <Link
          href="/browse"
          className="inline-flex items-center gap-2 text-xs sm:text-[13px] font-bold text-[#52525B] hover:text-[#18181B] transition-colors group"
        >
          <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
          <span>Back to Browse</span>
        </Link>

        <div className="hidden sm:flex items-center gap-2 text-xs text-[#71717A] font-medium">
          <span>Browse</span>
          <span>/</span>
          <span className="text-[#52525B] font-semibold">{product.category}</span>
          <span>/</span>
          <span className="text-[#18181B] font-bold truncate max-w-[200px]">{product.title}</span>
        </div>
      </div>

      {/* ─── Main Content Grid ────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 w-full space-y-7">
        {/* ══════════════════════════════════════════════════════════
           TOP SECTION: GALLERY (LEFT) + BOOKING CARD (RIGHT)
           ══════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
          {/* ─── LEFT: Product Showcase & Gallery (7 cols) ──────── */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Stage Display Card */}
            <div className="relative w-full aspect-[4/3] bg-gradient-to-b from-[#F6FAF1] to-[#EAF3E4] border border-[#D5E5CE] rounded-3xl overflow-hidden shadow-xs flex items-center justify-center p-6 sm:p-10 group">
              {/* Product Hero Image */}
              <div className="relative w-4/5 h-4/5 max-h-[380px] z-10">
                <Image
                  src={galleryImages[selectedImageIndex]}
                  alt={product.title}
                  fill
                  className="object-contain object-center drop-shadow-md transition-all duration-300 group-hover:scale-105"
                  priority
                />
              </div>

              {/* Counter Badge */}
              <div className="absolute top-4 right-4 bg-[#18181B]/75 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full z-20 shadow-xs">
                {selectedImageIndex + 1} / {galleryImages.length}
              </div>

              {/* Verified Resource Watermark Badge */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md border border-[#BBF7D0] text-[#15803D] text-[10.5px] font-bold px-2.5 py-1 rounded-full z-20 flex items-center gap-1.5 shadow-2xs">
                <AppIcon name="shield-check" size={13} />
                <span>Verified Listing</span>
              </div>
            </div>

            {/* Thumbnails Carousel */}
            <div className="flex items-center gap-3">
              <div className="flex-1 flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-white border-2 flex-shrink-0 transition-all cursor-pointer ${
                      selectedImageIndex === idx
                        ? "border-[#6F9535] ring-3 ring-[#6F9535]/30 shadow-xs scale-98"
                        : "border-[#EDE8C8] hover:border-[#6F9535]/50 opacity-85 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt="Thumb" fill className="object-cover" />
                  </button>
                ))}
              </div>

              {/* Next arrow thumbnail button */}
              <button
                onClick={() =>
                  setSelectedImageIndex((prev) => (prev + 1) % galleryImages.length)
                }
                aria-label="Next image"
                className="w-11 h-11 rounded-2xl bg-white border border-[#EDE8C8] flex items-center justify-center text-[#18181B] hover:bg-[#F5F2E8] shadow-2xs cursor-pointer flex-shrink-0 transition-all active:scale-95"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>

          {/* ─── RIGHT: Booking & Action Card (5 cols) ─────────── */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-[#EDE8C8] p-6 sm:p-7 shadow-xs flex flex-col justify-between space-y-5">
            <div>
              {/* Category & Status Badges */}
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#15803D] bg-[#DCFCE7] border border-[#BBF7D0] px-3 py-1 rounded-full">
                  <AppIcon name="package" size={13} />
                  <span>{product.category}</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-bold text-[#1D4ED8] bg-[#DBEAFE] border border-[#BFDBFE] px-2.5 py-0.5 rounded-full">
                  <span>⚡ Instant Approval</span>
                </div>
              </div>

              {/* Product Title */}
              <h1 className="text-xl sm:text-2xl font-black text-[#18181B] leading-snug mb-2">
                {product.title}
              </h1>

              {/* Rating & Trust Metrics */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <div className="flex items-center gap-1 text-xs font-bold bg-[#FEF3C7] border border-[#FDE68A] text-[#B45309] px-2.5 py-0.5 rounded-lg">
                  <span>★</span>
                  <span>{product.rating}</span>
                  <span className="font-medium text-[#78350F]">({product.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-[#166534] font-bold">
                  <AppIcon name="shield-check" size={14} />
                  <span>100% On-time Returns</span>
                </div>
              </div>

              {/* 3 Status Info Boxes */}
              <div className="grid grid-cols-3 gap-2.5 bg-[#FAF7F0] border border-[#EFE8D6] rounded-2xl p-3 text-center mb-5 shadow-2xs">
                <div>
                  <p className="text-xs font-bold text-[#18181B]">{product.condition}</p>
                  <p className="text-[10px] text-[#71717A] font-medium">Condition</p>
                </div>
                <div className="border-x border-[#E8DFC8]">
                  <p className="text-xs font-bold text-[#166534]">{product.status}</p>
                  <p className="text-[10px] text-[#71717A] font-medium">Availability</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#18181B]">{product.distance} km</p>
                  <p className="text-[10px] text-[#71717A] font-medium">from you</p>
                </div>
              </div>

              {/* Pricing Breakdown Card */}
              <div className="bg-[#FAF5EA] border border-[#EAE1CB] rounded-2xl p-4 mb-5 shadow-2xs space-y-2">
                <div className="grid grid-cols-3 gap-3 text-left">
                  <div>
                    <p className="text-[10.5px] font-semibold text-[#71717A]">Daily Charge</p>
                    <p className="text-lg font-black text-[#18181B] mt-0.5">
                      ₹{dailyRate} <span className="text-xs font-normal text-[#71717A]">/ day</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-[10.5px] font-semibold text-[#71717A]">Security Deposit</p>
                    <p className="text-lg font-black text-[#18181B] mt-0.5">
                      ₹{deposit.toLocaleString()}
                    </p>
                    <p className="text-[9.5px] text-[#16A34A] font-bold">100% Refundable</p>
                  </div>
                  <div>
                    <p className="text-[10.5px] font-semibold text-[#71717A]">Late Fee</p>
                    <p className="text-lg font-black text-[#18181B] mt-0.5">
                      ₹{lateFee} <span className="text-xs font-normal text-[#71717A]">/ day</span>
                    </p>
                    <p className="text-[9.5px] text-[#71717A]">24h grace buffer</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-1">
              {/* Primary CTA with 3D Tactile Styling */}
              <button
                onClick={() => setIsBorrowModalOpen(true)}
                id="borrow-now-cta"
                className="w-full py-3.5 bg-gradient-to-b from-[#7FB634] to-[#689A24] hover:from-[#8AC538] hover:to-[#72A627] text-white font-extrabold rounded-2xl transition-all duration-150 shadow-[0_4px_14px_rgba(104,154,36,0.3),inset_0_1px_1px_rgba(255,255,255,0.4)] border-b-2 border-[#547C1C] active:translate-y-0.5 flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer tracking-wide"
              >
                <span>Request to Borrow</span>
                <span>→</span>
              </button>

              {/* Chat with Owner */}
              <Link
                href="/dashboard"
                className="w-full py-3 bg-white hover:bg-[#FAF9F5] border border-[#DDD6C8] text-[#18181B] font-bold rounded-2xl transition-all duration-150 shadow-[0_2px_6px_rgba(0,0,0,0.03),inset_0_1px_1px_rgba(255,255,255,0.8)] border-b-2 border-[#CCC4B4] active:translate-y-0.5 flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer"
              >
                <AppIcon name="message" size={16} />
                <span>Chat with Owner</span>
              </Link>

              {/* Wishlist Toggle */}
              <button
                onClick={() => setIsSaved(!isSaved)}
                className="w-full py-2 text-xs font-bold text-[#52525B] hover:text-[#18181B] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>{isSaved ? "❤️" : "🤍"}</span>
                <span>{isSaved ? "Saved to Wishlist" : "Save for Later"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════
           MIDDLE SECTION: DETAILS TABS (LEFT) + LISTED BY (RIGHT)
           ══════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
          {/* ─── LEFT: Interactive Tabbed Details (7 cols) ─────── */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#EDE8C8] p-6 sm:p-7 shadow-xs space-y-5">
            {/* Tab Navigation */}
            <div className="flex items-center gap-2 border-b border-[#F0EAE0] pb-3">
              {[
                { id: "details", label: "About & Accessories" },
                { id: "agreement", label: "Borrowing Rules" },
                { id: "condition", label: "Condition Tracking" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-[#8DBF43]/20 text-[#2E5E1C] border border-[#8DBF43]/40"
                      : "text-[#71717A] hover:text-[#18181B] hover:bg-[#FAF7F0]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB 1: About & Accessories */}
            {activeTab === "details" && (
              <div className="space-y-5 animate-fadeIn">
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-[#18181B] mb-2">
                    Item Description
                  </h2>
                  <p className="text-xs sm:text-[13px] text-[#52525B] leading-relaxed">
                    {product.title} in {product.condition.toLowerCase()} condition. Verified and maintained regularly by {product.owner}. Clean sensor, smooth operational mechanics, and includes all necessary cords and protective cases.
                  </p>
                </div>

                {/* Attributes Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3 bg-[#FAF7F0] border border-[#EFE8D6] rounded-2xl text-xs">
                  <div>
                    <p className="text-[#71717A] text-[10.5px]">Category</p>
                    <p className="font-bold text-[#18181B]">{product.category}</p>
                  </div>
                  <div>
                    <p className="text-[#71717A] text-[10.5px]">Condition</p>
                    <p className="font-bold text-[#16A34A]">{product.condition}</p>
                  </div>
                  <div>
                    <p className="text-[#71717A] text-[10.5px]">Max Duration</p>
                    <p className="font-bold text-[#18181B]">7 Days</p>
                  </div>
                  <div>
                    <p className="text-[#71717A] text-[10.5px]">Campus Location</p>
                    <p className="font-bold text-[#18181B]">North Campus</p>
                  </div>
                </div>

                {/* Included Accessories */}
                <div>
                  <h3 className="text-xs font-bold text-[#18181B] uppercase tracking-wider mb-3">
                    Included in this Bundle
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs text-[#374151]">
                    {[
                      "Primary Equipment",
                      "Standard Mount Plate",
                      "Heavy-Duty Padded Bag",
                      "Connection Cable",
                      "Protective Caps",
                      "User Manual Sheet",
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl font-medium">
                        <span className="text-[#16A34A] font-bold">✔</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Borrowing Rules */}
            {activeTab === "agreement" && (
              <div className="space-y-4 animate-fadeIn text-xs">
                <h2 className="text-sm sm:text-base font-bold text-[#18181B]">
                  Community Borrowing Rules
                </h2>
                <div className="space-y-2.5">
                  <div className="flex items-start gap-3 p-3 bg-[#FAF7F0] border border-[#EFE8D6] rounded-2xl">
                    <span className="text-base">📸</span>
                    <div>
                      <p className="font-bold text-[#18181B]">Photo Condition Inspection</p>
                      <p className="text-[11.5px] text-[#52525B] mt-0.5">
                        Lender and borrower must snap 2 photos during physical handover to verify initial condition.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-[#FAF7F0] border border-[#EFE8D6] rounded-2xl">
                    <span className="text-base">🛡️</span>
                    <div>
                      <p className="font-bold text-[#18181B]">Refundable Security Deposit</p>
                      <p className="text-[11.5px] text-[#52525B] mt-0.5">
                        ₹{deposit.toLocaleString()} is held safely in escrow and automatically released upon return approval.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-[#FAF7F0] border border-[#EFE8D6] rounded-2xl">
                    <span className="text-base">⏰</span>
                    <div>
                      <p className="font-bold text-[#18181B]">On-Time Return Pledge</p>
                      <p className="text-[11.5px] text-[#52525B] mt-0.5">
                        Return the item before 8:00 PM on the due date. A 24-hour grace window applies before late fees begin.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: Condition Tracking */}
            {activeTab === "condition" && (
              <div className="space-y-4 animate-fadeIn text-xs">
                <h2 className="text-sm sm:text-base font-bold text-[#18181B]">
                  Before &amp; After Condition Protocol
                </h2>
                <div className="p-4 bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl space-y-2 text-[#166534]">
                  <p className="font-bold text-sm">✓ Condition Guarantee Active</p>
                  <p className="text-[11.5px] leading-relaxed">
                    This item has undergone <strong>12 successful verified handovers</strong> with 0 disputes. Both parties confirm condition in the app before unlocking exchange completion.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div className="p-3 bg-[#FAF7F0] border border-[#EFE8D6] rounded-xl text-center">
                    <p className="font-bold text-[#18181B]">Check-in Photo</p>
                    <p className="text-[10.5px] text-[#71717A]">At Handover</p>
                  </div>
                  <div className="p-3 bg-[#FAF7F0] border border-[#EFE8D6] rounded-xl text-center">
                    <p className="font-bold text-[#18181B]">Check-out Photo</p>
                    <p className="text-[10.5px] text-[#71717A]">At Return</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ─── RIGHT: "Listed by" Owner Card (5 cols) ────────── */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-[#EDE8C8] p-6 sm:p-7 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-bold text-[#71717A] uppercase tracking-wider">
                Listed by Lender
              </h2>
              <span className="text-[10.5px] font-bold text-[#15803D] bg-[#DCFCE7] px-2.5 py-0.5 rounded-full">
                Top 5% Lender
              </span>
            </div>

            {/* Owner Header */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="relative w-14 h-14 rounded-full overflow-hidden bg-gradient-to-b from-[#E0F2FE] to-[#BAE6FD] border-2 border-white shadow-xs flex-shrink-0">
                  <Image
                    src="/mascots/blue_dress_hat.png"
                    alt={product.owner}
                    fill
                    className="object-cover object-top scale-110"
                  />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#18181B] leading-tight">
                    {product.owner}
                  </h3>
                  <p className="text-xs text-[#52525B] mt-0.5">{product.department}</p>
                  <div className="flex items-center gap-1 text-[10.5px] font-bold text-[#166534] mt-1">
                    <span>✔ Campus ID &amp; Email Verified</span>
                  </div>
                </div>
              </div>

              {/* Owner Rating */}
              <div className="text-right">
                <div className="flex items-center justify-end gap-1 text-sm font-black text-[#18181B]">
                  <span className="text-[#F59E0B]">★</span>
                  <span>4.9</span>
                </div>
                <p className="text-[10px] text-[#71717A]">(32 reviews)</p>
              </div>
            </div>

            {/* Location Box */}
            <div className="p-3.5 bg-[#FAF7F0] border border-[#EFE8D6] rounded-2xl flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <AppIcon name="map-pin" size={16} className="text-[#16A34A] flex-shrink-0" />
                <div>
                  <p className="font-bold text-[#18181B]">Tech Block • Room 204</p>
                  <p className="text-[10.5px] text-[#71717A]">{product.distance} km from your current campus location</p>
                </div>
              </div>
            </div>

            {/* Response Time & Stats */}
            <div className="grid grid-cols-2 gap-3 pt-1 text-left text-xs">
              <div className="p-3 bg-[#FAF7F0] border border-[#EFE8D6] rounded-xl">
                <p className="text-[10.5px] text-[#71717A]">Response Time</p>
                <p className="text-xs font-bold text-[#18181B] mt-0.5">&lt; 15 mins</p>
              </div>
              <div className="p-3 bg-[#FAF7F0] border border-[#EFE8D6] rounded-xl">
                <p className="text-[10.5px] text-[#71717A]">Total Exchanges</p>
                <p className="text-xs font-bold text-[#18181B] mt-0.5">42 Loans (0 Disputes)</p>
              </div>
            </div>

            {/* Link to Owner Trust Profile */}
            <Link
              href="/profile"
              className="w-full py-2.5 bg-[#FAF7F0] hover:bg-[#F3EFE3] border border-[#EDE8C8] text-[#18181B] font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all"
            >
              <span>View Full Trust Profile</span>
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════
           3. SIMILAR AVAILABLE ALTERNATIVES NEARBY (Section 5 of PS)
           ══════════════════════════════════════════════════════════ */}
        <div className="mt-10 pt-8 border-t border-[#EDE8C8] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black bg-[#DCFCE7] text-[#166534] px-2.5 py-0.5 rounded-full">
                  Smart Alternatives • Section 5
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-[#18181B] mt-1">
                Similar Available Items Nearby
              </h2>
              <p className="text-xs text-[#71717A]">
                Alternative equipment matching this category and proximity.
              </p>
            </div>

            <Link
              href="/browse"
              className="text-xs font-bold text-[#16A34A] hover:underline"
            >
              View All Campus Resources →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {browseResources
              .filter((item) => item.id !== product.id)
              .slice(0, 4)
              .map((item) => (
                <Link
                  key={item.id}
                  href={`/browse/${item.id}`}
                  className="bg-white rounded-3xl border border-[#EDE8C8] overflow-hidden shadow-2xs hover:shadow-md transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="relative aspect-[4/3] bg-[#F9FAFB] overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2.5 left-2.5">
                        <span
                          className={`text-[9.5px] font-bold px-2 py-0.5 rounded-full shadow-2xs ${
                            item.statusType === "now"
                              ? "bg-[#DEF7EC] text-[#03543F]"
                              : "bg-[#FEF3C7] text-[#92400E]"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                    </div>

                    <div className="p-3.5 space-y-1.5">
                      <span className="text-[10px] font-bold text-[#71717A]">{item.category}</span>
                      <h3 className="text-xs font-bold text-[#18181B] line-clamp-2 group-hover:text-[#16A34A] transition-colors leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-[11px] text-[#71717A]">
                        Shared by <strong>{item.owner}</strong>
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 pt-0 flex items-center justify-between border-t border-[#F5EFE6] mt-2">
                    <span className="text-xs font-black text-[#18181B]">
                      ₹{item.dailyRate || 100} <span className="text-[10px] font-normal text-[#71717A]">/ day</span>
                    </span>
                    <span className="text-[10.5px] text-[#16A34A] font-bold">
                      {item.distance} km away
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </main>

      {/* ─── Interactive Borrow Request Modal ─────────────────── */}
      {isBorrowModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#EDE8C8] p-6 max-w-md w-full shadow-2xl space-y-4 animate-fadeInUp">
            {requestSubmitted ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-16 h-16 bg-[#DCFCE7] text-[#15803D] rounded-full flex items-center justify-center text-3xl mx-auto shadow-xs">
                  ✓
                </div>
                <h3 className="text-xl font-black text-[#18181B]">Borrow Request Sent!</h3>
                <p className="text-xs text-[#52525B] leading-relaxed">
                  Your request has been submitted to <strong>{product.owner}</strong>. You will receive an instant notification once approved.
                </p>
                <div className="p-3 bg-[#FAF7F0] border border-[#EFE8D6] rounded-xl text-xs text-left space-y-1">
                  <p><strong>Item:</strong> {product.title}</p>
                  <p><strong>Duration:</strong> {borrowDays} Days</p>
                  <p><strong>Total Payable on Handover:</strong> ₹{totalPayable}</p>
                </div>
                <button
                  onClick={() => {
                    setRequestSubmitted(false);
                    setIsBorrowModalOpen(false);
                    router.push("/loans");
                  }}
                  className="mt-4 w-full py-3 bg-[#84CC16] hover:bg-[#76B813] text-[#18181B] font-extrabold text-xs rounded-xl cursor-pointer shadow-xs"
                >
                  Track in Lifecycle Tracker →
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between pb-3 border-b border-[#F0EAE0]">
                  <h3 className="text-base font-bold text-[#18181B]">Request to Borrow</h3>
                  <button
                    onClick={() => setIsBorrowModalOpen(false)}
                    className="text-[#71717A] hover:text-[#18181B] text-lg font-bold cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  {/* Item Preview */}
                  <div className="flex items-center gap-3 p-2.5 bg-[#FAF7F0] rounded-2xl border border-[#EFE8D6]">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-white flex-shrink-0 border border-[#EDE8C8]">
                      <Image src={product.image} alt={product.title} fill className="object-contain p-1" />
                    </div>
                    <div>
                      <p className="font-bold text-[#18181B] line-clamp-1">{product.title}</p>
                      <p className="text-[#71717A] text-[11px]">{product.owner} • {product.department}</p>
                    </div>
                  </div>

                  {/* Duration Selector */}
                  <div>
                    <label className="font-bold text-[#18181B] block mb-1.5">Borrowing Duration</label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 5, 7].map((d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => setBorrowDays(d)}
                          className={`flex-1 py-2 rounded-xl font-bold text-xs border transition-all cursor-pointer ${
                            borrowDays === d
                              ? "bg-[#6F9535] text-white border-[#6F9535] shadow-xs scale-102"
                              : "bg-white text-[#52525B] border-[#EDE8C8] hover:bg-[#FAF7F0]"
                          }`}
                        >
                          {d}d
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="p-3.5 bg-[#FAF5EC] rounded-2xl border border-[#E8DFC8] space-y-1.5">
                    <div className="flex justify-between text-[#52525B]">
                      <span>Rental Fee ({borrowDays} days × ₹{dailyRate}):</span>
                      <span className="font-bold text-[#18181B]">₹{rentalTotal}</span>
                    </div>
                    <div className="flex justify-between text-[#52525B]">
                      <span>Campus Platform Fee (10%):</span>
                      <span className="font-bold text-[#18181B]">₹{platformFee}</span>
                    </div>
                    <div className="flex justify-between text-[#52525B]">
                      <span>Refundable Security Deposit:</span>
                      <span className="font-bold text-[#16A34A]">₹{deposit.toLocaleString()} (Refundable)</span>
                    </div>
                    <div className="border-t border-[#E8DFC8] pt-2 flex justify-between font-extrabold text-sm text-[#18181B]">
                      <span>Total Amount:</span>
                      <span className="text-base text-[#18181B]">₹{totalPayable}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setRequestSubmitted(true)}
                  className="w-full py-3.5 bg-gradient-to-b from-[#7FB634] to-[#689A24] text-white font-extrabold rounded-2xl transition-all shadow-md active:translate-y-0.5 cursor-pointer text-sm"
                >
                  Confirm &amp; Send Request
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
