"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import AppNavbar from "@/app/components/layout/AppNavbar";
import { browseResources } from "@/app/data/mockData";
import { AppIcon } from "@/app/components/dashboard/Icons";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  // Find product or fallback to first item
  const product =
    browseResources.find((p) => p.id === id) ||
    browseResources[0];

  // Gallery active image
  const galleryImages = [
    product.image,
    "/products/camera.jpg",
    "/products/tripod.jpg",
    "/products/mic.jpg",
    "/products/ringlight.jpg",
    "/mascots/books_camera.png",
  ];
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // States
  const [isSaved, setIsSaved] = useState(product.isFavorite || false);
  const [isBorrowModalOpen, setIsBorrowModalOpen] = useState(false);
  const [borrowDays, setBorrowDays] = useState(3);
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  // Pricing calculations
  const dailyRate = 150;
  const deposit = 1500;
  const lateFee = 50;
  const rentalTotal = dailyRate * borrowDays;

  return (
    <div className="min-h-screen bg-[#FBF7F0] text-[#18181B] flex flex-col select-none">
      {/* ─── Top Navbar ───────────────────────────────────────── */}
      <AppNavbar variant="auth" />

      {/* ─── Breadcrumb / Back Link ───────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 pb-3 w-full">
        <Link
          href="/browse"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#52525B] hover:text-[#18181B] transition-colors"
        >
          <span>←</span>
          <span>Back to Browse</span>
        </Link>
      </div>

      {/* ─── Main Content Grid ────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full space-y-6">
        {/* ══════════════════════════════════════════════════════════
           TOP SECTION: GALLERY (LEFT) + BOOKING CARD (RIGHT)
           ══════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ─── LEFT: Product Showcase & Gallery (7 cols) ──────── */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Stage Display Card */}
            <div className="relative w-full aspect-[4/3] bg-[#EFF7ED] border border-[#DCEBD9] rounded-3xl overflow-hidden shadow-xs flex items-center justify-center p-6 sm:p-10 group">
              {/* Main Product Hero Image */}
              <div className="relative w-4/5 h-4/5 max-h-[360px] z-10">
                <Image
                  src={galleryImages[selectedImageIndex]}
                  alt={product.title}
                  fill
                  className="object-contain object-center drop-shadow-md transition-all duration-300 group-hover:scale-105"
                  priority
                />
              </div>

              {/* Counter Badge (Top Right) */}
              <div className="absolute top-4 right-4 bg-[#18181B]/70 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full z-20">
                {selectedImageIndex + 1} / {galleryImages.length}
              </div>
            </div>

            {/* Thumbnails Carousel */}
            <div className="flex items-center gap-3">
              <div className="flex-1 flex items-center gap-2.5 overflow-x-auto pb-1 scrollbar-none">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-white border-2 flex-shrink-0 transition-all cursor-pointer ${
                      selectedImageIndex === idx
                        ? "border-[#84CC16] ring-2 ring-[#84CC16]/40 shadow-xs scale-98"
                        : "border-[#EDE8C8] hover:border-[#84CC16]/50 opacity-80 hover:opacity-100"
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
                className="w-10 h-10 rounded-2xl bg-white border border-[#EDE8C8] flex items-center justify-center text-[#18181B] hover:bg-[#FBF7F0] shadow-2xs cursor-pointer flex-shrink-0"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>

          {/* ─── RIGHT: Booking & Action Card (5 cols) ─────────── */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-[#EDE8C8] p-6 shadow-sm flex flex-col justify-between space-y-5">
            <div>
              {/* Category Tag */}
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#71717A] mb-2">
                <AppIcon name="package" size={14} className="text-[#84CC16]" />
                <span>{product.category}</span>
              </div>

              {/* Product Title */}
              <h1 className="text-xl sm:text-2xl font-black text-[#18181B] leading-snug mb-2.5">
                {product.title}
              </h1>

              {/* Rating & Verified Badge */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1 text-xs font-bold">
                  <span className="text-[#F59E0B]">★</span>
                  <span className="text-[#18181B]">{product.rating}</span>
                  <span className="text-[#71717A] font-normal">({product.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-bold text-[#166534] bg-[#DCFCE7] px-2.5 py-0.5 rounded-full">
                  <AppIcon name="shield-check" size={13} />
                  <span>Verified</span>
                </div>
              </div>

              {/* 3 Status Info Boxes */}
              <div className="grid grid-cols-3 gap-2.5 bg-[#FAF6EC] border border-[#EFE8D6] rounded-2xl p-3 text-center mb-5">
                <div>
                  <p className="text-xs font-bold text-[#18181B]">{product.condition}</p>
                  <p className="text-[10px] text-[#71717A]">Condition</p>
                </div>
                <div className="border-x border-[#E8DFC8]">
                  <p className="text-xs font-bold text-[#166534]">{product.status}</p>
                  <p className="text-[10px] text-[#71717A]">Until May 28, 2025</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#18181B]">{product.distance} km</p>
                  <p className="text-[10px] text-[#71717A]">from you</p>
                </div>
              </div>

              {/* Pricing 3-Column Strip */}
              <div className="bg-[#FAF5EA] border border-[#EAE1CB] rounded-2xl p-4 mb-5">
                <div className="grid grid-cols-3 gap-3 text-left">
                  <div>
                    <p className="text-[11px] font-semibold text-[#71717A]">Daily Charge</p>
                    <p className="text-lg font-black text-[#18181B] mt-0.5">₹{dailyRate} <span className="text-xs font-normal text-[#71717A]">/ day</span></p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-[#71717A]">Security Deposit</p>
                    <p className="text-lg font-black text-[#18181B] mt-0.5">₹{deposit.toLocaleString()}</p>
                    <p className="text-[10px] text-[#16A34A] font-semibold">Refundable</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-[#71717A]">Late Fee</p>
                    <p className="text-lg font-black text-[#18181B] mt-0.5">₹{lateFee} <span className="text-xs font-normal text-[#71717A]">/ day</span></p>
                    <p className="text-[10px] text-[#71717A]">After 24h grace</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2.5 pt-2">
              {/* Primary CTA */}
              <button
                onClick={() => setIsBorrowModalOpen(true)}
                id="borrow-now-cta"
                className="w-full py-3.5 bg-[#84CC16] hover:bg-[#76B813] text-[#18181B] font-extrabold rounded-2xl transition-all shadow-xs hover:shadow-md flex items-center justify-center gap-2 text-sm cursor-pointer"
              >
                <span>Request to Borrow</span>
                <span>→</span>
              </button>

              {/* Chat with Owner */}
              <Link
                href="/dashboard"
                className="w-full py-3 bg-white hover:bg-[#FBF7F0] border border-[#EDE8C8] text-[#18181B] font-bold rounded-2xl transition-all shadow-2xs flex items-center justify-center gap-2 text-xs sm:text-sm"
              >
                <AppIcon name="message" size={16} />
                <span>Chat with Owner</span>
              </Link>

              {/* Save for later */}
              <button
                onClick={() => setIsSaved(!isSaved)}
                className="w-full py-2.5 text-xs font-semibold text-[#52525B] hover:text-[#18181B] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>{isSaved ? "❤️" : "🤍"}</span>
                <span>{isSaved ? "Saved to Favorites" : "Save for Later"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════
           BOTTOM SECTION: "ABOUT THIS ITEM" (LEFT) + "LISTED BY" (RIGHT)
           ══════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* ─── LEFT: About This Item Details Card (7 cols) ───── */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#EDE8C8] p-6 sm:p-7 shadow-2xs space-y-6">
            {/* Header & Overview */}
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#18181B] mb-2">
                About this item
              </h2>
              <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed">
                {product.title} with standard accessories. Perfect for photography enthusiasts, project presentations, and campus coursework. Well maintained, clean, and lightly used. Delivers excellent output and reliability.
              </p>
            </div>

            {/* Spec Attributes Row */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 py-3 border-y border-[#F0EAE0] text-xs">
              <div>
                <p className="text-[#71717A] text-[10.5px]">Category</p>
                <p className="font-bold text-[#18181B]">{product.category}</p>
              </div>
              <div>
                <p className="text-[#71717A] text-[10.5px]">Subcategory</p>
                <p className="font-bold text-[#18181B]">Standard Gear</p>
              </div>
              <div>
                <p className="text-[#71717A] text-[10.5px]">Condition</p>
                <p className="font-bold text-[#16A34A]">{product.condition}</p>
              </div>
              <div>
                <p className="text-[#71717A] text-[10.5px]">Usage</p>
                <p className="font-bold text-[#18181B]">Lightly Used</p>
              </div>
              <div>
                <p className="text-[#71717A] text-[10.5px]">Listed on</p>
                <p className="font-bold text-[#18181B]">May 12, 2025</p>
              </div>
            </div>

            {/* 3 Detail Subsections */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-1">
              {/* 1. Included Accessories */}
              <div>
                <h3 className="text-xs font-bold text-[#18181B] mb-2.5">
                  Included Accessories
                </h3>
                <div className="space-y-1.5 text-[11.5px] text-[#374151]">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#16A34A]">✔</span>
                    <span>18-55mm Lens</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#16A34A]">✔</span>
                    <span>Lens Cap</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#16A34A]">✔</span>
                    <span>Battery (2x)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#16A34A]">✔</span>
                    <span>Charger</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#16A34A]">✔</span>
                    <span>32GB SD Card</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#16A34A]">✔</span>
                    <span>Camera Bag</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#16A34A]">✔</span>
                    <span>USB Cable</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#16A34A]">✔</span>
                    <span>Neck Strap</span>
                  </div>
                </div>
              </div>

              {/* 2. Borrowing Conditions */}
              <div>
                <h3 className="text-xs font-bold text-[#18181B] mb-2.5">
                  Borrowing Conditions
                </h3>
                <ul className="space-y-1.5 text-[11.5px] text-[#52525B] list-disc list-inside">
                  <li>Handle with care and return in the same condition</li>
                  <li>No water damage or rough usage</li>
                  <li>Report any issues immediately</li>
                  <li>Return on or before the due date</li>
                </ul>
              </div>

              {/* 3. Previous Usage */}
              <div>
                <h3 className="text-xs font-bold text-[#18181B] mb-2.5">
                  Previous Usage
                </h3>
                <div className="space-y-2 text-[11.5px] text-[#374151]">
                  <div className="flex items-center gap-2">
                    <AppIcon name="package" size={13} className="text-[#6B7280]" />
                    <span>Rented 12 times</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AppIcon name="star" size={13} className="text-[#F59E0B]" />
                    <span>Positive reviews: 11</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AppIcon name="timer" size={13} className="text-[#10B981]" />
                    <span>On-time returns: 100%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AppIcon name="calendar-clock" size={13} className="text-[#3B82F6]" />
                    <span>Last rented: 2 weeks ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ─── RIGHT: "Listed by" Owner Card (5 cols) ────────── */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-[#EDE8C8] p-6 shadow-2xs space-y-5">
            <h2 className="text-xs font-bold text-[#71717A] uppercase tracking-wider">
              Listed by
            </h2>

            {/* Owner Header */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-xs relative bg-amber-100 flex-shrink-0">
                  <Image
                    src="/mascots/blue_dress_hat.png"
                    alt={product.owner}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#18181B] leading-tight">
                    {product.owner}
                  </h3>
                  <p className="text-xs text-[#71717A]">{product.department}</p>
                  <span className="inline-flex items-center gap-1 text-[10.5px] font-bold text-[#166534] mt-0.5">
                    <span>✔</span> Verified
                  </span>
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
              <div className="flex items-center gap-2">
                <AppIcon name="map-pin" size={16} className="text-[#16A34A] flex-shrink-0" />
                <div>
                  <p className="font-bold text-[#18181B]">Engineering Block, Room 204</p>
                  <p className="text-[10.5px] text-[#71717A]">{product.distance} km from you</p>
                </div>
              </div>
              <button className="text-[11px] font-bold text-[#2563EB] hover:underline cursor-pointer">
                View on map
              </button>
            </div>

            {/* Response Time & Member Since */}
            <div className="grid grid-cols-2 gap-4 pt-2 text-left">
              <div>
                <p className="text-[11px] text-[#71717A]">Usually responds in</p>
                <p className="text-sm font-bold text-[#18181B] mt-0.5">30 mins</p>
              </div>
              <div>
                <p className="text-[11px] text-[#71717A]">Member since</p>
                <p className="text-sm font-bold text-[#18181B] mt-0.5">Jan 2024</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ─── Interactive Borrow Request Modal ─────────────────── */}
      {isBorrowModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#EDE8C8] p-6 max-w-md w-full shadow-2xl space-y-4">
            {requestSubmitted ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-14 h-14 bg-[#DCFCE7] text-[#15803D] rounded-full flex items-center justify-center text-2xl mx-auto">
                  ✓
                </div>
                <h3 className="text-lg font-black text-[#18181B]">Borrow Request Sent!</h3>
                <p className="text-xs text-[#52525B]">
                  Your request has been delivered to <strong>{product.owner}</strong>. You will receive a notification once approved.
                </p>
                <button
                  onClick={() => {
                    setRequestSubmitted(false);
                    setIsBorrowModalOpen(false);
                    router.push("/dashboard");
                  }}
                  className="mt-4 px-6 py-2.5 bg-[#18181B] text-white font-bold text-xs rounded-xl hover:bg-[#27272A] cursor-pointer"
                >
                  View in My Loans
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
                  <div className="flex items-center gap-3 p-2 bg-[#FBF7F0] rounded-xl">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-white flex-shrink-0">
                      <Image src={product.image} alt={product.title} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="font-bold text-[#18181B]">{product.title}</p>
                      <p className="text-[#71717A]">{product.owner} • {product.department}</p>
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-[#18181B] block mb-1">Duration (Days)</label>
                    <div className="flex items-center gap-3">
                      {[1, 2, 3, 5, 7].map((d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => setBorrowDays(d)}
                          className={`flex-1 py-1.5 rounded-xl font-bold border transition-all cursor-pointer ${
                            borrowDays === d
                              ? "bg-[#84CC16] text-[#18181B] border-[#84CC16]"
                              : "bg-white text-[#52525B] border-[#EDE8C8]"
                          }`}
                        >
                          {d}d
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-3 bg-[#FAF5EC] rounded-xl space-y-1.5">
                    <div className="flex justify-between text-[#52525B]">
                      <span>Rental Fee ({borrowDays} days × ₹{dailyRate}):</span>
                      <span className="font-bold text-[#18181B]">₹{rentalTotal}</span>
                    </div>
                    <div className="flex justify-between text-[#52525B]">
                      <span>Refundable Deposit:</span>
                      <span className="font-bold text-[#18181B]">₹{deposit}</span>
                    </div>
                    <div className="border-t border-[#E8DFC8] pt-1.5 flex justify-between font-bold text-sm text-[#18181B]">
                      <span>Total Payable:</span>
                      <span>₹{rentalTotal + deposit}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setRequestSubmitted(true)}
                  className="w-full py-3 bg-[#84CC16] hover:bg-[#76B813] text-[#18181B] font-extrabold rounded-xl transition-all cursor-pointer text-xs sm:text-sm"
                >
                  Confirm & Send Request
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
