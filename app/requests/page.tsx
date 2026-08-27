"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Sidebar from "@/app/components/dashboard/Sidebar";
import AppNavbar from "@/app/components/layout/AppNavbar";
import { AppIcon } from "@/app/components/dashboard/Icons";
import ListResourceModal from "@/app/components/modals/ListResourceModal";
import { useApp } from "@/app/context/AppContext";

export default function CommunityRequestsPage() {
  const router = useRouter();
  const { currentUser, wantedRequests, respondToWantedRequest } = useApp();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInitialTab, setModalInitialTab] = useState<"list" | "request">("request");

  const categories = ["All", "Electronics", "Books", "Sports", "Tools", "Others"];

  const filteredRequests = useMemo(() => {
    return wantedRequests.filter((r) =>
      selectedCategory === "All" ? true : r.category === selectedCategory
    );
  }, [wantedRequests, selectedCategory]);

  const handleRespond = (id: string) => {
    respondToWantedRequest(id);
    router.push("/messages");
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
          {/* ─── Header Banner ───────────────────────────────────── */}
          <div className="px-5 lg:px-8 pt-6 pb-4 w-full">
            <div className="bg-gradient-to-r from-[#F2F8ED] via-[#FBF7EE] to-[#EFF6FE] border border-[#DCEAD6] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-2xs">
              <div className="space-y-1.5 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-[#DCFCE7] text-[#166534] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                    <AppIcon name="bell" size={13} className="text-[#16A34A]" />
                    <span>Campus Circular Community Board</span>
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-[#18181B] tracking-tight">
                  Community Wanted Requests
                </h1>
                <p className="text-xs sm:text-sm text-[#52525B] leading-relaxed">
                  Can&apos;t find what you need in Browse? Post a wanted request as <strong>{currentUser.fullName}</strong> or offer your equipment to peers!
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    setModalInitialTab("request");
                    setIsModalOpen(true);
                  }}
                  className="px-5 py-3 bg-gradient-to-b from-[#7FB634] to-[#689A24] text-white font-black text-xs rounded-2xl transition-all shadow-xs hover:from-[#8AC538] hover:to-[#72A627] cursor-pointer flex items-center justify-center gap-2 border-b-2 border-[#557F1C] active:translate-y-0.5 whitespace-nowrap"
                >
                  <span>+ Post Wanted Request</span>
                </button>
              </div>
            </div>
          </div>

          {/* ─── Categories Filter Bar ────────────────────────────── */}
          <div className="px-5 lg:px-8 py-2 flex items-center gap-2 overflow-x-auto scrollbar-none w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex-shrink-0 ${
                  selectedCategory === cat
                    ? "bg-[#18181B] text-white shadow-2xs"
                    : "bg-white border border-[#EDE8C8] text-[#52525B] hover:text-[#18181B]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* ─── Community Requests Feed ─────────────────────────── */}
          <main className="px-5 lg:px-8 pb-16 w-full mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {filteredRequests.map((req) => {
                const isMine = req.requesterId === currentUser.id;
                const hasOffered = req.respondedUserIds?.includes(currentUser.id);

                return (
                  <div
                    key={req.id}
                    className="bg-white rounded-3xl border border-[#EDE8C8] p-5 sm:p-6 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                  >
                    <div>
                      {/* Top Requester Row */}
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-8 h-8 rounded-full ${req.requesterAvatarBg} flex items-center justify-center font-black text-xs`}>
                            {req.requesterName.split(" ").map((n) => n[0]).join("")}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-[#18181B] leading-tight">
                              {req.requesterName} {isMine && "(You)"}
                            </p>
                            <p className="text-[10.5px] text-[#71717A]">{req.requesterDept}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-[#71717A] bg-[#FAF7F0] px-2 py-0.5 rounded-md border border-[#EDE8C8]">
                            {req.postedAgo}
                          </span>
                          {req.urgency === "High" && (
                            <span className="text-[10px] font-bold bg-[#FEE2E2] text-[#DC2626] px-2 py-0.5 rounded-full flex items-center gap-1">
                              <AppIcon name="flame" size={11} className="text-[#DC2626]" />
                              <span>Urgent</span>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Title & Description */}
                      <h3 className="text-sm sm:text-base font-black text-[#18181B] leading-snug mb-1.5">
                        {req.title}
                      </h3>
                      <p className="text-xs text-[#52525B] leading-relaxed mb-3">
                        {req.description}
                      </p>

                      {/* Key Constraints Badges */}
                      <div className="grid grid-cols-3 gap-2 bg-[#FAF7F0] border border-[#EFE8D6] rounded-2xl p-3 text-[11px]">
                        <div>
                          <p className="text-[10px] text-[#71717A]">Needed By</p>
                          <p className="font-bold text-[#18181B] truncate">{req.neededBy}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-[#71717A]">Budget</p>
                          <p className="font-bold text-[#16A34A]">{req.budget}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-[#71717A]">Deposit Ready</p>
                          <p className="font-bold text-[#18181B] truncate">{req.depositOffered}</p>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="pt-3 border-t border-[#F0EAE0] flex items-center justify-between gap-3">
                      <div className="flex items-center gap-1.5 text-xs text-[#71717A]">
                        <AppIcon name="map-pin" size={13} className="text-[#16A34A]" />
                        <span className="truncate">{req.location}</span>
                      </div>

                      {isMine ? (
                        <span className="text-xs font-bold text-[#71717A] bg-[#FAF7F0] px-3 py-1.5 rounded-xl border border-[#EDE8C8]">
                          Your Request
                        </span>
                      ) : hasOffered ? (
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#16A34A] bg-[#DCFCE7] px-4 py-2 rounded-xl">
                          <AppIcon name="check" size={12} />
                          <span>Offer Sent in Chat</span>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleRespond(req.id)}
                          className="px-4 py-2 bg-gradient-to-b from-[#7FB634] to-[#689A24] text-white font-bold text-xs rounded-xl transition-all shadow-xs hover:from-[#8AC538] hover:to-[#72A627] cursor-pointer flex items-center gap-1.5 border-b-2 border-[#557F1C] active:translate-y-0.5"
                        >
                          <AppIcon name="handshake" size={13} />
                          <span>I Can Lend This!</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </main>
        </div>
      </div>

      {/* ─── 3-Step List / Request Modal ──────────────────────── */}
      <ListResourceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialTab={modalInitialTab}
      />
    </div>
  );
}
