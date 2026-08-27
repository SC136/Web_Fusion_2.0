"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Sidebar from "@/app/components/dashboard/Sidebar";
import AppNavbar from "@/app/components/layout/AppNavbar";
import { AppIcon } from "@/app/components/dashboard/Icons";
import { myUserListings } from "@/app/data/mockData";
import ListResourceModal from "@/app/components/modals/ListResourceModal";

export default function MyListingsPage() {
  const router = useRouter();
  const [listings, setListings] = useState(myUserListings);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [acceptedRequests, setAcceptedRequests] = useState<{ [key: string]: boolean }>({});
  const [pausedListings, setPausedListings] = useState<{ [key: string]: boolean }>({});

  const totalEarnings = listings.reduce((acc, curr) => acc + curr.totalEarned, 0);
  const totalRented = listings.reduce((acc, curr) => acc + curr.timesRented, 0);

  const handleAcceptRequest = (reqId: string) => {
    setAcceptedRequests((prev) => ({ ...prev, [reqId]: true }));
  };

  const togglePause = (itemId: string) => {
    setPausedListings((prev) => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  const handleNewListingSuccess = (newForm: any) => {
    const newItem = {
      id: `my-${Date.now()}`,
      title: newForm.title || "New Campus Resource",
      category: newForm.category || "Electronics",
      image: "/products/camera.jpg",
      dailyRate: newForm.dailyRate || 100,
      deposit: newForm.securityDeposit || 800,
      status: "Available",
      statusType: "active",
      timesRented: 0,
      totalEarned: 0,
      rating: 5.0,
      reviewsCount: 0,
      condition: newForm.condition || "Like New",
      incomingRequests: [],
    };
    setListings([newItem, ...listings]);
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
              Manage your shared equipment, track rental earnings, and approve incoming borrow requests.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/requests"
              className="px-4 py-2.5 bg-white hover:bg-[#FAF7F0] border border-[#EDE8C8] text-xs font-bold rounded-xl transition-all shadow-2xs flex items-center gap-1.5"
            >
              <span>📢 Wanted Board</span>
            </Link>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2.5 bg-[#84CC16] hover:bg-[#76B813] text-[#18181B] font-extrabold text-xs rounded-xl transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
            >
              <span>+ List New Resource</span>
            </button>
          </div>
        </div>

        {/* ─── Metric Summary Cards ────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mt-6">
          <div className="bg-white rounded-2xl border border-[#EDE8C8] p-4 shadow-2xs">
            <p className="text-[11px] font-bold text-[#71717A] uppercase">Total Earnings</p>
            <p className="text-xl font-black text-[#18181B] mt-1">₹{totalEarnings.toLocaleString()}</p>
            <span className="text-[10px] text-[#16A34A] font-semibold">Transferred to UPI</span>
          </div>
          <div className="bg-white rounded-2xl border border-[#EDE8C8] p-4 shadow-2xs">
            <p className="text-[11px] font-bold text-[#71717A] uppercase">Active Listings</p>
            <p className="text-xl font-black text-[#18181B] mt-1">{listings.length} Items</p>
            <span className="text-[10px] text-[#2563EB] font-semibold">100% Escrow Protected</span>
          </div>
          <div className="bg-white rounded-2xl border border-[#EDE8C8] p-4 shadow-2xs">
            <p className="text-[11px] font-bold text-[#71717A] uppercase">Times Borrowed</p>
            <p className="text-xl font-black text-[#18181B] mt-1">{totalRented} Exchanges</p>
            <span className="text-[10px] text-[#71717A] font-semibold">0 Disputes Reported</span>
          </div>
          <div className="bg-white rounded-2xl border border-[#EDE8C8] p-4 shadow-2xs">
            <p className="text-[11px] font-bold text-[#71717A] uppercase">Lender Rating</p>
            <p className="text-xl font-black text-[#18181B] mt-1">★ 4.9 <span className="text-xs font-normal text-[#71717A]">(28 reviews)</span></p>
            <span className="text-[10px] text-[#16A34A] font-bold">Top Verified Sharer</span>
          </div>
        </div>
      </div>

      {/* ─── Main Content ──────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full space-y-6 mt-2">
        {/* ══════════════════════════════════════════════════════════
           1. INCOMING BORROW REQUESTS (PENDING APPROVAL)
           ══════════════════════════════════════════════════════════ */}
        <div className="bg-white rounded-3xl border border-[#EDE8C8] p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#F0EAE0]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A] animate-pulse" />
              <h2 className="text-sm font-bold text-[#18181B]">
                Incoming Borrow Requests (Awaiting Your Approval)
              </h2>
            </div>
            <span className="text-xs font-bold text-[#166534] bg-[#DCFCE7] px-2.5 py-0.5 rounded-full">
              2 Pending
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Request 1 */}
            <div className="p-4 bg-[#FAF7F0] border border-[#EFE8D6] rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold bg-[#EFF6FF] text-[#2563EB] px-2 py-0.5 rounded-full">
                  Sony WH-1000XM4
                </span>
                <span className="text-xs font-bold text-[#16A34A]">₹360 Payout</span>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
                  KS
                </div>
                <div>
                  <p className="text-xs font-bold text-[#18181B]">Kabir Singh (4th Year, ECE)</p>
                  <p className="text-[10.5px] text-[#71717A]">3 Days • Aug 28 - Aug 31</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#52525B] bg-white p-2.5 rounded-xl border border-[#EDE8C8]">
                <span>Refundable Deposit Escrowed:</span>
                <span className="font-bold text-[#18181B]">₹1,000</span>
              </div>

              {acceptedRequests["req-1"] ? (
                <div className="py-2 text-center text-xs font-bold text-[#16A34A] bg-[#DCFCE7] rounded-xl flex items-center justify-center gap-1.5">
                  <span>✓ Request Accepted! Meetup PIN Generated.</span>
                  <Link href="/loans" className="underline hover:text-[#14532D]">Track in Loans</Link>
                </div>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAcceptRequest("req-1")}
                    className="flex-1 py-2 bg-[#84CC16] hover:bg-[#76B813] text-[#18181B] font-extrabold text-xs rounded-xl shadow-xs cursor-pointer"
                  >
                    Accept & Confirm Handover →
                  </button>
                  <button className="px-3 py-2 bg-white hover:bg-[#FAF7F0] border border-[#EDE8C8] text-xs font-bold rounded-xl cursor-pointer">
                    Decline
                  </button>
                </div>
              )}
            </div>

            {/* Request 2 */}
            <div className="p-4 bg-[#FAF7F0] border border-[#EFE8D6] rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold bg-[#EFF6FF] text-[#2563EB] px-2 py-0.5 rounded-full">
                  Casio FX-991CW Calculator
                </span>
                <span className="text-xs font-bold text-[#16A34A]">₹60 Payout</span>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                  MI
                </div>
                <div>
                  <p className="text-xs font-bold text-[#18181B]">Meera Iyer (1st Year, Stats)</p>
                  <p className="text-[10.5px] text-[#71717A]">2 Days • Aug 29 - Aug 31</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#52525B] bg-white p-2.5 rounded-xl border border-[#EDE8C8]">
                <span>Refundable Deposit Escrowed:</span>
                <span className="font-bold text-[#18181B]">₹400</span>
              </div>

              {acceptedRequests["req-2"] ? (
                <div className="py-2 text-center text-xs font-bold text-[#16A34A] bg-[#DCFCE7] rounded-xl flex items-center justify-center gap-1.5">
                  <span>✓ Request Accepted! Meetup PIN Generated.</span>
                  <Link href="/loans" className="underline hover:text-[#14532D]">Track in Loans</Link>
                </div>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAcceptRequest("req-2")}
                    className="flex-1 py-2 bg-[#84CC16] hover:bg-[#76B813] text-[#18181B] font-extrabold text-xs rounded-xl shadow-xs cursor-pointer"
                  >
                    Accept & Confirm Handover →
                  </button>
                  <button className="px-3 py-2 bg-white hover:bg-[#FAF7F0] border border-[#EDE8C8] text-xs font-bold rounded-xl cursor-pointer">
                    Decline
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════
           2. ACTIVE LISTINGS CARDS GRID
           ══════════════════════════════════════════════════════════ */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#18181B]">
              Your Published Items ({listings.length})
            </h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-xs font-bold text-[#16A34A] hover:underline cursor-pointer"
            >
              + Add Item
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {listings.map((item) => {
              const isPaused = pausedListings[item.id];

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl border border-[#EDE8C8] overflow-hidden shadow-2xs flex flex-col justify-between group hover:shadow-md transition-all"
                >
                  <div>
                    {/* Top Image */}
                    <div className="relative aspect-[4/3] bg-[#F9FAFB] overflow-hidden">
                      <Image src={item.image} alt={item.title} fill className="object-cover" />
                      <div className="absolute top-2.5 left-2.5">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full shadow-2xs ${
                            isPaused
                              ? "bg-[#F3F4F6] text-[#4B5563]"
                              : item.statusType === "lent"
                              ? "bg-[#FEF3C7] text-[#92400E]"
                              : "bg-[#DEF7EC] text-[#03543F]"
                          }`}
                        >
                          {isPaused ? "Paused" : item.status}
                        </span>
                      </div>
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
                          <span className="font-bold text-[#18181B]">₹{item.deposit}</span>
                        </div>
                        <div className="flex justify-between pt-1 border-t border-[#E8DFC8] text-[#16A34A] font-bold">
                          <span>Earned to Date:</span>
                          <span>₹{item.totalEarned}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions Strip */}
                  <div className="p-4 pt-0 flex items-center gap-2">
                    <button
                      onClick={() => togglePause(item.id)}
                      className="flex-1 py-1.5 bg-[#FAF7F0] hover:bg-[#F3EFE3] border border-[#EDE8C8] text-[11px] font-bold rounded-xl transition-all cursor-pointer text-center"
                    >
                      {isPaused ? "Resume Listing" : "Pause"}
                    </button>
                    <Link
                      href="/browse/b1"
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
        </div>
      </main>

      {/* ─── 3-Step List Modal ─────────────────────────────────── */}
      <ListResourceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialTab="list"
        onSuccess={handleNewListingSuccess}
      />
      </div>
      </div>
    </div>
  );
}
