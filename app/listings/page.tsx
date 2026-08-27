"use client";

import { useState, useMemo, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Sidebar from "@/app/components/dashboard/Sidebar";
import AppNavbar from "@/app/components/layout/AppNavbar";
import { AppIcon } from "@/app/components/dashboard/Icons";
import ListResourceModal from "@/app/components/modals/ListResourceModal";
import { useApp } from "@/app/context/AppContext";

export default function MyListingsPage() {
  const router = useRouter();
  const { currentUser, listings, exchanges, acceptBorrowRequest, removeListing, updateListingImage } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pausedListings, setPausedListings] = useState<{ [key: string]: boolean }>({});
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const fileInputRefs = useRef<{ [id: string]: HTMLInputElement | null }>({});

  const handleImageUpload = (itemId: string, file: File) => {
    if (!file.type.startsWith("image/")) return;
    setUploadingId(itemId);
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl && updateListingImage) updateListingImage(itemId, dataUrl);
      setUploadingId(null);
    };
    reader.readAsDataURL(file);
  };

  // Filter listings belonging to the active logged-in user
  const userListings = useMemo(() => {
    return listings.filter((l) => l.ownerId === currentUser.id);
  }, [listings, currentUser.id]);

  // Find incoming borrow requests for this user's items
  const incomingRequests = useMemo(() => {
    return exchanges.filter((ex) => ex.ownerId === currentUser.id);
  }, [exchanges, currentUser.id]);

  const pendingRequests = useMemo(() => {
    return incomingRequests.filter((ex) => ex.status === "pending");
  }, [incomingRequests]);

  const totalEarnings = userListings.length * 450 + 280;

  const togglePause = (itemId: string) => {
    setPausedListings((prev) => ({ ...prev, [itemId]: !prev[itemId] }));
  };

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
          {/* ─── Header & Actions ─────────────────────────────────── */}
          <div className="px-5 lg:px-8 pt-6 pb-4 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#71717A] mb-1">
                  <Link href="/dashboard" className="hover:text-[#18181B]">Dashboard</Link>
                  <span>/</span>
                  <span className="text-[#18181B]">My Listed Resources</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-[#18181B] tracking-tight">
                  My Listed Resources
                </h1>
                <p className="text-xs sm:text-sm text-[#52525B] mt-0.5">
                  Manage equipment shared by <strong>{currentUser.fullName}</strong> ({currentUser.department}), track earnings & approve requests.
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <Link
                  href="/requests"
                  className="px-4 py-2.5 bg-white hover:bg-[#FAF7F0] border border-[#EDE8C8] text-xs font-bold rounded-xl transition-all shadow-2xs flex items-center gap-1.5"
                >
                  <AppIcon name="bell" size={14} className="text-[#D97706]" />
                  <span>Wanted Board</span>
                </Link>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-5 py-2.5 bg-gradient-to-b from-[#7FB634] to-[#689A24] text-white font-bold text-xs rounded-2xl transition-all shadow-xs hover:from-[#8AC538] hover:to-[#72A627] cursor-pointer flex items-center gap-1.5 border-b-2 border-[#557F1C] active:translate-y-0.5"
                >
                  <span>+ List New Resource</span>
                </button>
              </div>
            </div>

            {/* ─── 4 Metrics Strip ─────────────────────────────────── */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mt-5">
              <div className="p-4 bg-white rounded-2xl border border-[#EDE8C8] shadow-2xs">
                <p className="text-[11px] font-bold text-[#71717A] uppercase">Active Listings</p>
                <p className="text-xl font-black text-[#18181B] mt-1">{userListings.length}</p>
                <p className="text-[10.5px] text-[#16A34A] font-semibold mt-0.5">Ready for campus loans</p>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-[#EDE8C8] shadow-2xs">
                <p className="text-[11px] font-bold text-[#71717A] uppercase">Pending Requests</p>
                <p className="text-xl font-black text-[#D97706] mt-1">{pendingRequests.length}</p>
                <p className="text-[10.5px] text-[#D97706] font-semibold mt-0.5">Action required</p>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-[#EDE8C8] shadow-2xs">
                <p className="text-[11px] font-bold text-[#71717A] uppercase">Total Earnings</p>
                <p className="text-xl font-black text-[#16A34A] mt-1">₹{totalEarnings}</p>
                <p className="text-[10.5px] text-[#16A34A] font-semibold mt-0.5">Protected by Escrow</p>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-[#EDE8C8] shadow-2xs">
                <p className="text-[11px] font-bold text-[#71717A] uppercase">Lender Rating</p>
                <p className="text-xl font-black text-[#18181B] mt-1">{currentUser.trustScore}★</p>
                <p className="text-[10.5px] text-[#71717A] font-semibold mt-0.5">{currentUser.reviewsCount} reviews</p>
              </div>
            </div>
          </div>

          {/* ─── Main Content Body ───────────────────────────────── */}
          <main className="px-5 lg:px-8 pb-12 w-full space-y-6">
            {/* ══════════════════════════════════════════════════════════
               1. INCOMING BORROW REQUESTS
               ══════════════════════════════════════════════════════════ */}
            <div className="bg-white rounded-3xl border border-[#EDE8C8] p-5 sm:p-6 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A] animate-pulse" />
                  <h2 className="text-base font-bold text-[#18181B]">
                    Incoming Borrow Requests ({incomingRequests.length})
                  </h2>
                </div>
                <span className="text-xs font-bold text-[#166534] bg-[#DCFCE7] px-2.5 py-0.5 rounded-full">
                  {pendingRequests.length} Needs Acceptance
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {incomingRequests.length > 0 ? (
                  incomingRequests.map((req) => {
                    const isAccepted = req.status !== "pending";

                    return (
                      <div key={req.id} className="p-4 bg-[#FAF7F0] border border-[#EFE8D6] rounded-2xl space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold bg-[#EFF6FF] text-[#2563EB] px-2 py-0.5 rounded-full truncate max-w-[200px]">
                            {req.listingTitle}
                          </span>
                          <span className="text-xs font-bold text-[#16A34A]">₹{req.totalRentalFee} Payout</span>
                        </div>

                        <div className="flex items-center gap-2.5">
                          <div className={`w-8 h-8 rounded-full ${req.borrowerAvatarBg} flex items-center justify-center font-bold text-xs flex-shrink-0`}>
                            {req.borrowerName.split(" ").map((n) => n[0]).join("").substring(0, 2)}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-[#18181B]">{req.borrowerName}</p>
                            <p className="text-[10.5px] text-[#71717A]">{req.borrowerDept} • {req.durationDays} Days</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-[#52525B] bg-white p-2.5 rounded-xl border border-[#EDE8C8]">
                          <span>Refundable Deposit Escrowed:</span>
                          <span className="font-bold text-[#18181B]">₹{req.securityDeposit}</span>
                        </div>

                        {isAccepted ? (
                          <div className="py-2 px-3 text-xs font-bold text-[#16A34A] bg-[#DCFCE7] rounded-xl flex items-center justify-between">
                            <span>✓ Request Accepted (OTP: {req.handoverOtp})</span>
                            <Link href="/loans" className="underline hover:text-[#14532D]">
                              Track in Loans →
                            </Link>
                          </div>
                        ) : (
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => acceptBorrowRequest(req.id)}
                              className="flex-1 py-2.5 bg-gradient-to-b from-[#7FB634] to-[#689A24] text-white font-bold text-xs rounded-xl shadow-xs hover:from-[#8AC538] hover:to-[#72A627] cursor-pointer border-b-2 border-[#557F1C] active:translate-y-0.5 text-center"
                            >
                              Accept & Generate Meetup PIN →
                            </button>
                            <Link
                              href="/messages"
                              className="px-3 py-2 bg-white hover:bg-[#FAF7F0] border border-[#EDE8C8] text-xs font-bold rounded-xl flex items-center justify-center"
                            >
                              Chat
                            </Link>
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="col-span-full py-8 text-center text-xs text-[#71717A] space-y-1">
                    <p className="font-bold text-[#18181B]">No pending borrow requests right now</p>
                    <p>When students request your items, they will appear here for 1-click acceptance.</p>
                  </div>
                )}
              </div>
            </div>

            {/* ══════════════════════════════════════════════════════════
               2. ACTIVE LISTINGS CARDS GRID
               ══════════════════════════════════════════════════════════ */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-bold text-[#18181B]">
                  Your Published Items ({userListings.length})
                </h2>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="text-xs font-bold text-[#16A34A] hover:underline cursor-pointer"
                >
                  + Add Item
                </button>
              </div>

              {userListings.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {userListings.map((item) => {
                    const isPaused = pausedListings[item.id];

                    return (
                      <div
                        key={item.id}
                        className="bg-white rounded-3xl border border-[#EDE8C8] overflow-hidden shadow-2xs flex flex-col justify-between group hover:shadow-md transition-all"
                      >
                        <div>
                          {/* Top Image with quick upload overlay */}
                          <div className="relative aspect-[4/3] bg-[#F9FAFB] overflow-hidden group/img">
                            <Image src={item.image} alt={item.title} fill className="object-cover" />
                            {/* Status badge */}
                            <div className="absolute top-2.5 left-2.5 z-10">
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full shadow-2xs ${
                                  isPaused
                                    ? "bg-[#F3F4F6] text-[#4B5563]"
                                    : "bg-[#DEF7EC] text-[#03543F]"
                                }`}
                              >
                                {isPaused ? "Paused" : item.status}
                              </span>
                            </div>
                            {/* Camera upload overlay — appears on hover */}
                            <button
                              type="button"
                              onClick={() => fileInputRefs.current[item.id]?.click()}
                              className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-1.5 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity cursor-pointer"
                              title="Change photo"
                            >
                              {uploadingId === item.id ? (
                                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              ) : (
                                <>
                                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                                    <circle cx="12" cy="13" r="4" />
                                  </svg>
                                  <span className="text-white text-[10px] font-bold">Change Photo</span>
                                </>
                              )}
                            </button>
                            <input
                              ref={(el) => { fileInputRefs.current[item.id] = el; }}
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleImageUpload(item.id, file);
                                e.target.value = "";
                              }}
                            />
                          </div>

                          {/* Card Content */}
                          <div className="p-4 space-y-2.5">
                            <span className="text-[10px] font-bold text-[#71717A]">{item.category}</span>
                            <h3 className="text-xs font-bold text-[#18181B] line-clamp-2 leading-snug">
                              {item.title}
                            </h3>

                            <div className="bg-[#FAF7F0] p-2.5 rounded-xl border border-[#EFE8D6] text-[11px] space-y-1">
                              <div className="flex justify-between">
                                <span className="text-[#71717A]">Daily Charge:</span>
                                <span className="font-bold text-[#18181B]">₹{item.dailyRate}/day</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-[#71717A]">Deposit:</span>
                                <span className="font-bold text-[#18181B]">₹{item.securityDeposit}</span>
                              </div>
                              <div className="flex justify-between pt-1 border-t border-[#E8DFC8] text-[#16A34A] font-bold">
                                <span>Condition:</span>
                                <span>{item.condition}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Actions Strip */}
                        <div className="p-4 pt-0 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => togglePause(item.id)}
                            className="flex-1 py-1.5 bg-[#FAF7F0] hover:bg-[#F3EFE3] border border-[#EDE8C8] text-[11px] font-bold rounded-xl transition-all cursor-pointer text-center"
                          >
                            {isPaused ? "Resume" : "Pause"}
                          </button>
                          <button
                            type="button"
                            onClick={() => removeListing(item.id)}
                            className="p-1.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600 rounded-xl transition-all"
                            title="Delete Listing"
                          >
                            ✕
                          </button>
                          <Link
                            href={`/browse/${item.id}`}
                            className="p-1.5 bg-[#FAF7F0] hover:bg-[#F3EFE3] border border-[#EDE8C8] rounded-xl text-[#52525B] hover:text-[#18181B] transition-all"
                            title="View Public Page"
                          >
                            <AppIcon name="arrow-up-right" size={15} />
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-white rounded-3xl border border-[#EDE8C8] p-12 text-center shadow-2xs space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#F5F8E9] text-[#16A34A] flex items-center justify-center mx-auto">
                    <AppIcon name="package" size={24} />
                  </div>
                  <h3 className="text-sm font-bold text-[#18181B]">No listings yet for {currentUser.name}</h3>
                  <p className="text-xs text-[#71717A] max-w-sm mx-auto">
                    List unused lab equipment, books, gadgets or sports items to start earning deposits and building campus trust.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="px-4 py-2 bg-[#84CC16] hover:bg-[#76B813] text-[#18181B] text-xs font-bold rounded-xl cursor-pointer"
                  >
                    + Create First Listing
                  </button>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* ─── 3-Step List Modal ─────────────────────────────────── */}
      <ListResourceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialTab="list"
      />
    </div>
  );
}
