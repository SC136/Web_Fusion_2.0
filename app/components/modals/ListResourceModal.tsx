"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AppIcon } from "@/app/components/dashboard/Icons";

interface ListResourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: "list" | "request";
  onSuccess?: (newItem: any) => void;
}

export default function ListResourceModal({
  isOpen,
  onClose,
  initialTab = "list",
  onSuccess,
}: ListResourceModalProps) {
  const [activeTab, setActiveTab] = useState<"list" | "request">(initialTab);
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State for "List a Resource"
  const [listForm, setListForm] = useState({
    title: "",
    category: "Electronics",
    condition: "Like New",
    description: "",
    accessories: ["Charger", "Original Box"],
    newAccessory: "",
    sharingModel: "rent", // "rent" | "free" | "donate"
    dailyRate: 120,
    securityDeposit: 1000,
    lateFee: 30,
    pickupLocation: "Engineering Block, Room 204",
    availability: "Available Now",
    rules: [
      "Handle with care and return in same condition",
      "No water or physical damage",
      "Return by due date",
    ],
  });

  // Form State for "Post Community Request"
  const [requestForm, setRequestForm] = useState({
    title: "Wanted: Graphic Tablet for 2 days",
    category: "Electronics",
    neededBy: "Tomorrow by 2:00 PM",
    duration: "2 Days",
    budget: 150,
    depositOffered: 1000,
    location: "Design Block C",
    urgency: "High",
    description: "Need a pressure-sensitive drawing tablet with stylus for semester submission.",
  });

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => (prev + 1) as 1 | 2 | 3);
    } else {
      // Final submit
      if (activeTab === "list") {
        const categoryImages: Record<string, string> = {
          Electronics: "/products/camera.jpg",
          Books: "/mascots/books_camera.png",
          Sports: "/products/tripod.jpg",
          Tools: "/products/ringlight.jpg",
          Music: "/products/mic.jpg",
          Others: "/products/camera.jpg",
        };

        const newItem = {
          id: `my-${Date.now()}`,
          title: listForm.title || "Custom Campus Equipment",
          category: listForm.category || "Electronics",
          image: categoryImages[listForm.category] || "/products/camera.jpg",
          dailyRate: Number(listForm.dailyRate) || 120,
          deposit: Number(listForm.securityDeposit) || 1000,
          status: "Available",
          statusType: "active",
          timesRented: 0,
          totalEarned: 0,
          rating: 5.0,
          reviewsCount: 0,
          condition: listForm.condition || "Like New",
          incomingRequests: [],
          description: listForm.description,
          accessories: listForm.accessories,
          pickupLocation: listForm.pickupLocation,
        };

        const newBrowseResource = {
          id: `b-${Date.now()}`,
          title: listForm.title || "Custom Campus Equipment",
          category: listForm.category || "Electronics",
          image: categoryImages[listForm.category] || "/products/camera.jpg",
          status: "Available Now",
          statusType: "now",
          isFavorite: false,
          owner: "Anaya Sharma (You)",
          department: "Computer Engineering • 3rd Year",
          avatarBg: "bg-emerald-100 text-emerald-800",
          initials: "AS",
          rating: 5.0,
          reviews: 0,
          distance: 0.1,
          condition: listForm.condition || "Like New",
          dailyRate: Number(listForm.dailyRate) || 120,
          deposit: Number(listForm.securityDeposit) || 1000,
          lateFee: Number(listForm.lateFee) || 30,
        };

        try {
          // Save to user listings
          const existingListings = localStorage.getItem("campus_circular_my_listings");
          const parsedListings = existingListings ? JSON.parse(existingListings) : [];
          localStorage.setItem(
            "campus_circular_my_listings",
            JSON.stringify([newItem, ...parsedListings.filter((l: any) => l.id !== newItem.id)])
          );

          // Save to browse resources
          const existingBrowse = localStorage.getItem("campus_circular_browse_resources");
          const parsedBrowse = existingBrowse ? JSON.parse(existingBrowse) : [];
          localStorage.setItem(
            "campus_circular_browse_resources",
            JSON.stringify([newBrowseResource, ...parsedBrowse.filter((b: any) => b.id !== newBrowseResource.id)])
          );
        } catch (e) {
          console.error("Failed to save listing:", e);
        }

        if (onSuccess) {
          onSuccess(newItem);
        }
      } else {
        // Wanted request
        const createdReq = {
          id: `CR-${Date.now()}`,
          title: requestForm.title,
          category: requestForm.category,
          requesterName: "Anaya Sharma",
          requesterDept: "3rd Year, Computer Engg",
          requesterAvatarBg: "bg-emerald-100 text-emerald-800",
          neededBy: requestForm.neededBy || "Tomorrow",
          duration: requestForm.duration || "2 Days",
          budget: `₹${requestForm.budget || 100} / day`,
          depositOffered: `₹${requestForm.depositOffered || 800}`,
          description: requestForm.description || "Campus coursework requirement.",
          responsesCount: 0,
          urgency: requestForm.urgency || "High",
          status: "Open",
          postedAgo: "Just now",
          location: requestForm.location || "Main Campus Quad",
        };

        try {
          const existingReqs = localStorage.getItem("campus_circular_requests");
          const parsedReqs = existingReqs ? JSON.parse(existingReqs) : [];
          localStorage.setItem(
            "campus_circular_requests",
            JSON.stringify([createdReq, ...parsedReqs.filter((r: any) => r.id !== createdReq.id)])
          );
        } catch (e) {
          console.error("Failed to save request:", e);
        }

        if (onSuccess) {
          onSuccess(createdReq);
        }
      }

      setIsSuccess(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as 1 | 2 | 3);
    }
  };

  const resetAndClose = () => {
    setIsSuccess(false);
    setCurrentStep(1);
    onClose();
  };

  const addAccessory = () => {
    if (listForm.newAccessory.trim()) {
      setListForm({
        ...listForm,
        accessories: [...listForm.accessories, listForm.newAccessory.trim()],
        newAccessory: "",
      });
    }
  };

  const removeAccessory = (index: number) => {
    setListForm({
      ...listForm,
      accessories: listForm.accessories.filter((_, i) => i !== index),
    });
  };

  const categories = ["Electronics", "Books", "Sports", "Tools", "Music", "Others"];

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 select-none">
      <div className="bg-white rounded-3xl border border-[#EDE8C8] max-w-xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* ─── Modal Header ───────────────────────────────────── */}
        <div className="px-6 pt-5 pb-4 border-b border-[#F0EAE0] flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-[#18181B] leading-tight">
              {activeTab === "list" ? "List a Resource to Share" : "Post a Community Request"}
            </h2>
            <p className="text-xs text-[#71717A] mt-0.5">
              {activeTab === "list"
                ? "Lend your unused campus items safely with escrow protection"
                : "Ask campus peers for equipment you need temporarily"}
            </p>
          </div>
          <button
            onClick={resetAndClose}
            className="w-8 h-8 rounded-full bg-[#FAF7F0] hover:bg-[#F3EFE3] text-[#71717A] hover:text-[#18181B] flex items-center justify-center font-bold text-sm cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* ─── Mode Switcher Tabs ──────────────────────────────── */}
        {!isSuccess && (
          <div className="px-6 pt-3">
            <div className="grid grid-cols-2 p-1 bg-[#FAF7F0] rounded-2xl border border-[#EDE8C8]">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("list");
                  setCurrentStep(1);
                }}
                className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  activeTab === "list"
                    ? "bg-white text-[#18181B] shadow-2xs"
                    : "text-[#71717A] hover:text-[#18181B]"
                }`}
              >
                <AppIcon name="package" size={14} />
                <span>List a Resource (Lend)</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("request");
                  setCurrentStep(1);
                }}
                className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  activeTab === "request"
                    ? "bg-white text-[#18181B] shadow-2xs"
                    : "text-[#71717A] hover:text-[#18181B]"
                }`}
              >
                <AppIcon name="bell" size={14} className="text-[#D97706]" />
                <span>Community Request (Wanted)</span>
              </button>
            </div>

            {/* 3-Step Progress Indicators */}
            <div className="flex items-center justify-between mt-3 px-2">
              {[
                { step: 1, label: "1. Details" },
                { step: 2, label: activeTab === "list" ? "2. Pricing & Escrow" : "2. Dates & Budget" },
                { step: 3, label: "3. Publish" },
              ].map((s) => (
                <div key={s.step} className="flex items-center gap-1.5">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      currentStep === s.step
                        ? "bg-[#84CC16] text-[#18181B]"
                        : currentStep > s.step
                        ? "bg-[#16A34A] text-white"
                        : "bg-[#E4E4E7] text-[#71717A]"
                    }`}
                  >
                    {currentStep > s.step ? "✓" : s.step}
                  </div>
                  <span
                    className={`text-[11px] font-bold ${
                      currentStep === s.step ? "text-[#18181B]" : "text-[#71717A]"
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── Modal Body ─────────────────────────────────────── */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4 text-xs">
          {/* SUCCESS SCREEN */}
          {isSuccess ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-16 h-16 bg-[#DCFCE7] text-[#15803D] rounded-full flex items-center justify-center text-3xl mx-auto shadow-xs">
                ✓
              </div>
              <h3 className="text-xl font-black text-[#18181B]">
                {activeTab === "list" ? "Resource Successfully Listed!" : "Community Request Published!"}
              </h3>
              <p className="text-xs text-[#52525B] max-w-sm mx-auto leading-relaxed">
                {activeTab === "list"
                  ? "Your item is now live in the Campus Circular marketplace with escrow protection enabled."
                  : "Your wanted request is now broadcasting to students in your department & campus halls."}
              </p>
              <div className="p-3 bg-[#FAF7F0] border border-[#EFE8D6] rounded-2xl max-w-xs mx-auto text-left text-xs space-y-1">
                <p><strong>Title:</strong> {activeTab === "list" ? listForm.title || "Custom Resource" : requestForm.title}</p>
                <p><strong>Category:</strong> {activeTab === "list" ? listForm.category : requestForm.category}</p>
                <p><strong>Status:</strong> <span className="text-[#16A34A] font-bold">Active on Campus</span></p>
              </div>
              <div className="flex items-center gap-2.5 justify-center mt-4 pt-2">
                <button
                  onClick={resetAndClose}
                  className="px-5 py-2.5 bg-[#FAF7F0] hover:bg-[#F3EFE3] border border-[#EDE8C8] text-[#18181B] font-bold text-xs rounded-xl cursor-pointer"
                >
                  Close
                </button>
                {activeTab === "list" ? (
                  <Link
                    href="/listings"
                    onClick={resetAndClose}
                    className="px-5 py-2.5 bg-gradient-to-b from-[#7FB634] to-[#689A24] text-white font-bold text-xs rounded-xl hover:from-[#8AC538] hover:to-[#72A627] cursor-pointer shadow-xs border-b-2 border-[#557F1C] active:translate-y-0.5 flex items-center gap-1.5"
                  >
                    <span>View in My Listings →</span>
                  </Link>
                ) : (
                  <Link
                    href="/requests"
                    onClick={resetAndClose}
                    className="px-5 py-2.5 bg-gradient-to-b from-[#7FB634] to-[#689A24] text-white font-bold text-xs rounded-xl hover:from-[#8AC538] hover:to-[#72A627] cursor-pointer shadow-xs border-b-2 border-[#557F1C] active:translate-y-0.5 flex items-center gap-1.5"
                  >
                    <span>View on Wanted Board →</span>
                  </Link>
                )}
              </div>
            </div>
          ) : activeTab === "list" ? (
            /* ═══════════════════════════════════════════════════════
               TAB A: LIST A RESOURCE (3 STEPS)
               ═══════════════════════════════════════════════════════ */
            <>
              {/* STEP 1: ITEM DETAILS */}
              {currentStep === 1 && (
                <div className="space-y-3.5">
                  <div>
                    <label className="block font-bold text-[#18181B] mb-1">Resource Title *</label>
                    <input
                      type="text"
                      placeholder="e.g., Canon EOS 200D DSLR Camera, Calculus Stewart 3rd Ed..."
                      value={listForm.title}
                      onChange={(e) => setListForm({ ...listForm, title: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#EDE8C8] bg-[#FAF7F0] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#84CC16] text-xs font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#18181B] mb-1.5">Category *</label>
                    <div className="flex flex-wrap gap-1.5">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setListForm({ ...listForm, category: cat })}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            listForm.category === cat
                              ? "bg-[#18181B] text-white"
                              : "bg-[#FAF7F0] border border-[#EDE8C8] text-[#52525B] hover:text-[#18181B]"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-[#18181B] mb-1">Item Condition *</label>
                      <select
                        value={listForm.condition}
                        onChange={(e) => setListForm({ ...listForm, condition: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-[#EDE8C8] bg-[#FAF7F0] text-xs font-semibold"
                      >
                        <option value="Like New">Like New (Mint)</option>
                        <option value="Good">Good (Light Wear)</option>
                        <option value="Fair">Fair (Functional)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-bold text-[#18181B] mb-1">Pickup Location</label>
                      <input
                        type="text"
                        value={listForm.pickupLocation}
                        onChange={(e) => setListForm({ ...listForm, pickupLocation: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-[#EDE8C8] bg-[#FAF7F0] text-xs font-semibold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-[#18181B] mb-1">Description</label>
                    <textarea
                      rows={2}
                      placeholder="Mention condition details, usage rules, or ideal coursework purposes..."
                      value={listForm.description}
                      onChange={(e) => setListForm({ ...listForm, description: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-[#EDE8C8] bg-[#FAF7F0] focus:bg-white text-xs font-medium"
                    />
                  </div>

                  {/* Included Accessories */}
                  <div>
                    <label className="block font-bold text-[#18181B] mb-1">Included Accessories</label>
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {listForm.accessories.map((acc, idx) => (
                        <span
                          key={idx}
                          className="bg-[#FAF7F0] border border-[#EDE8C8] text-[#18181B] px-2.5 py-0.5 rounded-lg flex items-center gap-1.5 text-[11px] font-semibold"
                        >
                          <span>{acc}</span>
                          <button
                            type="button"
                            onClick={() => removeAccessory(idx)}
                            className="text-[#EF4444] hover:font-bold cursor-pointer"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Add accessory (e.g., lens cap, case, 32GB SD)..."
                        value={listForm.newAccessory}
                        onChange={(e) => setListForm({ ...listForm, newAccessory: e.target.value })}
                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addAccessory())}
                        className="flex-1 px-3 py-1.5 rounded-xl border border-[#EDE8C8] bg-[#FAF7F0] text-xs"
                      />
                      <button
                        type="button"
                        onClick={addAccessory}
                        className="px-3 py-1.5 bg-[#FAF7F0] hover:bg-[#F3EFE3] border border-[#EDE8C8] text-xs font-bold rounded-xl cursor-pointer"
                      >
                        + Add
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: PRICING & ESCROW */}
              {currentStep === 2 && (
                <div className="space-y-3.5">
                  <div>
                    <label className="block font-bold text-[#18181B] mb-1.5">Sharing Model *</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: "rent", title: "Daily Rental", desc: "Charge per day" },
                        { id: "free", title: "Free Karma (₹0)", desc: "Community share" },
                        { id: "donate", title: "Permanent Giveaway", desc: "Pass to junior" },
                      ].map((model) => (
                        <button
                          key={model.id}
                          type="button"
                          onClick={() => setListForm({ ...listForm, sharingModel: model.id })}
                          className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
                            listForm.sharingModel === model.id
                              ? "bg-[#F7FEE7] border-[#84CC16] shadow-xs"
                              : "bg-[#FAF7F0] border-[#EDE8C8]"
                          }`}
                        >
                          <p className="font-bold text-xs text-[#18181B]">{model.title}</p>
                          <p className="text-[10px] text-[#71717A]">{model.desc}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {listForm.sharingModel === "rent" && (
                    <div className="grid grid-cols-3 gap-3 bg-[#FAF7F0] p-3.5 rounded-2xl border border-[#EDE8C8]">
                      <div>
                        <label className="block font-bold text-[#71717A] text-[11px] mb-1">Daily Charge (₹)</label>
                        <input
                          type="number"
                          value={listForm.dailyRate}
                          onChange={(e) => setListForm({ ...listForm, dailyRate: Number(e.target.value) })}
                          className="w-full px-3 py-1.5 rounded-xl border border-[#EDE8C8] bg-white font-bold text-xs"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-[#71717A] text-[11px] mb-1">Security Deposit (₹)</label>
                        <input
                          type="number"
                          value={listForm.securityDeposit}
                          onChange={(e) => setListForm({ ...listForm, securityDeposit: Number(e.target.value) })}
                          className="w-full px-3 py-1.5 rounded-xl border border-[#EDE8C8] bg-white font-bold text-xs"
                        />
                      </div>
                      <div>
                        <label className="block font-bold text-[#71717A] text-[11px] mb-1">Late Fee (₹/day)</label>
                        <input
                          type="number"
                          value={listForm.lateFee}
                          onChange={(e) => setListForm({ ...listForm, lateFee: Number(e.target.value) })}
                          className="w-full px-3 py-1.5 rounded-xl border border-[#EDE8C8] bg-white font-bold text-xs"
                        />
                      </div>
                    </div>
                  )}

                  {/* AI Recommendation Pill */}
                  <div className="p-3 bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl flex items-start gap-2.5 text-[11.5px] text-[#166534]">
                    <AppIcon name="sparkles" size={16} className="text-[#16A34A] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">Smart Pricing Suggestion</p>
                      <p className="text-[11px] text-[#15803D]">
                        Similar {listForm.category} resources on campus rent fastest at ₹100-150/day with a ₹1,000 refundable deposit.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: PREVIEW & PUBLISH */}
              {currentStep === 3 && (
                <div className="space-y-3">
                  <div className="bg-[#FAF7F0] border border-[#EFE8D6] rounded-2xl p-4 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold bg-[#DCFCE7] text-[#166534] px-2 py-0.5 rounded-full">
                        {listForm.category}
                      </span>
                      <span className="text-xs font-bold text-[#18181B]">
                        {listForm.sharingModel === "rent" ? `₹${listForm.dailyRate}/day` : "Free Community Share"}
                      </span>
                    </div>

                    <h4 className="font-black text-sm text-[#18181B]">
                      {listForm.title || "Custom Campus Resource"}
                    </h4>

                    <div className="grid grid-cols-3 gap-2 text-[11px] text-[#71717A] pt-1 border-t border-[#E8DFC8]">
                      <div>
                        <span className="block text-[10px]">Condition:</span>
                        <span className="font-bold text-[#18181B]">{listForm.condition}</span>
                      </div>
                      <div>
                        <span className="block text-[10px]">Deposit:</span>
                        <span className="font-bold text-[#18181B]">₹{listForm.securityDeposit}</span>
                      </div>
                      <div>
                        <span className="block text-[10px]">Pickup:</span>
                        <span className="font-bold text-[#18181B] truncate">{listForm.pickupLocation}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-[#FAF5EA] border border-[#EAE1CB] rounded-xl text-[11px] text-[#52525B] flex items-center gap-2">
                    <span className="text-[#16A34A] font-bold">✓</span>
                    <span>I confirm that this item is in working condition and I am authorized to lend it within campus regulations.</span>
                  </div>
                </div>
              )}
            </>
          ) : (
            /* ═══════════════════════════════════════════════════════
               TAB B: POST COMMUNITY REQUEST (WANTED)
               ═══════════════════════════════════════════════════════ */
            <>
              {/* STEP 1: REQUEST DETAILS */}
              {currentStep === 1 && (
                <div className="space-y-3.5">
                  <div>
                    <label className="block font-bold text-[#18181B] mb-1">What resource do you need? *</label>
                    <input
                      type="text"
                      placeholder="e.g., Wanted: Graphic Tablet for 2 days, Formal Blazer Size 40..."
                      value={requestForm.title}
                      onChange={(e) => setRequestForm({ ...requestForm, title: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#EDE8C8] bg-[#FAF7F0] text-xs font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#18181B] mb-1.5">Category *</label>
                    <div className="flex flex-wrap gap-1.5">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setRequestForm({ ...requestForm, category: cat })}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            requestForm.category === cat
                              ? "bg-[#18181B] text-white"
                              : "bg-[#FAF7F0] border border-[#EDE8C8] text-[#52525B]"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-[#18181B] mb-1">Why do you need it? (Context)</label>
                    <textarea
                      rows={2}
                      placeholder="Explain your academic requirement or event deadline..."
                      value={requestForm.description}
                      onChange={(e) => setRequestForm({ ...requestForm, description: e.target.value })}
                      className="w-full px-3.5 py-2 rounded-xl border border-[#EDE8C8] bg-[#FAF7F0] text-xs font-medium"
                    />
                  </div>
                </div>
              )}

              {/* STEP 2: DATES & BUDGET */}
              {currentStep === 2 && (
                <div className="space-y-3.5">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-[#18181B] mb-1">Needed By *</label>
                      <input
                        type="text"
                        value={requestForm.neededBy}
                        onChange={(e) => setRequestForm({ ...requestForm, neededBy: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-[#EDE8C8] bg-[#FAF7F0] text-xs font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-[#18181B] mb-1">Borrow Duration *</label>
                      <input
                        type="text"
                        value={requestForm.duration}
                        onChange={(e) => setRequestForm({ ...requestForm, duration: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-[#EDE8C8] bg-[#FAF7F0] text-xs font-semibold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 bg-[#FAF7F0] p-3.5 rounded-2xl border border-[#EDE8C8]">
                    <div>
                      <label className="block font-bold text-[#71717A] text-[11px] mb-1">Budget (₹/day)</label>
                      <input
                        type="number"
                        value={requestForm.budget}
                        onChange={(e) => setRequestForm({ ...requestForm, budget: Number(e.target.value) })}
                        className="w-full px-3 py-1.5 rounded-xl border border-[#EDE8C8] bg-white font-bold text-xs"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-[#71717A] text-[11px] mb-1">Deposit Ready (₹)</label>
                      <input
                        type="number"
                        value={requestForm.depositOffered}
                        onChange={(e) => setRequestForm({ ...requestForm, depositOffered: Number(e.target.value) })}
                        className="w-full px-3 py-1.5 rounded-xl border border-[#EDE8C8] bg-white font-bold text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: PREVIEW & PUBLISH */}
              {currentStep === 3 && (
                <div className="space-y-3">
                  <div className="bg-[#FAF7F0] border border-[#EFE8D6] rounded-2xl p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold bg-[#EFF6FF] text-[#2563EB] px-2 py-0.5 rounded-full">
                        Wanted: {requestForm.category}
                      </span>
                      <span className="text-xs font-bold text-[#18181B]">
                        Budget: ₹{requestForm.budget}/day
                      </span>
                    </div>

                    <h4 className="font-black text-sm text-[#18181B]">{requestForm.title}</h4>
                    <p className="text-[11.5px] text-[#52525B]">{requestForm.description}</p>

                    <div className="grid grid-cols-2 gap-2 text-[11px] text-[#71717A] pt-2 border-t border-[#E8DFC8]">
                      <div>
                        <span>Needed By: </span>
                        <strong className="text-[#18181B]">{requestForm.neededBy}</strong>
                      </div>
                      <div>
                        <span>Duration: </span>
                        <strong className="text-[#18181B]">{requestForm.duration}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl text-[11px] text-[#166534] flex items-center gap-2">
                    <AppIcon name="bell" size={14} className="text-[#16A34A] flex-shrink-0" />
                    <span>When you post this, students in matching clubs will be notified immediately.</span>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* ─── Modal Footer ───────────────────────────────────── */}
        {!isSuccess && (
          <div className="px-6 py-4 border-t border-[#F0EAE0] flex items-center justify-between">
            <button
              type="button"
              onClick={currentStep === 1 ? resetAndClose : handleBack}
              className="px-4 py-2 text-xs font-bold text-[#71717A] hover:text-[#18181B] cursor-pointer"
            >
              {currentStep === 1 ? "Cancel" : "← Back"}
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 bg-gradient-to-b from-[#7FB634] to-[#689A24] text-white font-bold text-xs rounded-xl transition-all shadow-xs hover:from-[#8AC538] hover:to-[#72A627] cursor-pointer border-b-2 border-[#557F1C] active:translate-y-0.5"
            >
              {currentStep === 3
                ? activeTab === "list"
                  ? "Publish Listing →"
                  : "Post Wanted Request →"
                : "Continue →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
