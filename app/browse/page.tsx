"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import AppNavbar from "@/app/components/layout/AppNavbar";
import { browseCategories, browseResources } from "@/app/data/mockData";
import { AppIcon } from "@/app/components/dashboard/Icons";
import ListResourceModal from "@/app/components/modals/ListResourceModal";

export default function BrowsePage() {
  // Modal state
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<"list" | "request">("list");

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedAvailabilities, setSelectedAvailabilities] = useState<string[]>(["now"]);
  const [maxDistance, setMaxDistance] = useState<number>(5);
  const [maxDailyRate, setMaxDailyRate] = useState<number>(1000);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<"relevance" | "price-asc" | "price-desc" | "rating" | "distance">("relevance");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({
    b1: true,
  });

  // Accordion open/close states
  const [openSections, setOpenSections] = useState({
    category: true,
    price: true,
    availability: true,
    distance: true,
    condition: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleAvailability = (type: string) => {
    setSelectedAvailabilities((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleCondition = (cond: string) => {
    setSelectedConditions((prev) =>
      prev.includes(cond) ? prev.filter((c) => c !== cond) : [...prev, cond]
    );
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedAvailabilities([]);
    setMaxDistance(15);
    setMaxDailyRate(1000);
    setSelectedConditions([]);
    setMinRating(0);
  };

  const quickSearchTags = [
    { label: "DSLR Cameras", query: "camera", icon: "camera" },
    { label: "Tripods & Lighting", query: "tripod", icon: "video" },
    { label: "Synthesizers", query: "keyboard", icon: "music" },
    { label: "Microphones", query: "mic", icon: "mic" },
    { label: "Coursebooks", query: "calculus", icon: "book" },
  ];

  // Filter and Sort logic
  const filteredResources = useMemo(() => {
    return browseResources
      .filter((item) => {
        // Search filter
        if (
          searchQuery &&
          !item.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !item.owner.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !item.category.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          return false;
        }

        // Category filter
        if (selectedCategory !== "all" && item.category.toLowerCase() !== selectedCategory.toLowerCase()) {
          return false;
        }

        // Availability filter
        if (selectedAvailabilities.length > 0 && !selectedAvailabilities.includes(item.statusType)) {
          return false;
        }

        // Distance filter
        if (item.distance > maxDistance) {
          return false;
        }

        // Max Daily Rate filter
        if (item.dailyRate && item.dailyRate > maxDailyRate) {
          return false;
        }

        // Condition filter
        if (selectedConditions.length > 0 && !selectedConditions.includes(item.condition)) {
          return false;
        }

        // Rating filter
        if (item.rating < minRating) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return (a.dailyRate || 0) - (b.dailyRate || 0);
        if (sortBy === "price-desc") return (b.dailyRate || 0) - (a.dailyRate || 0);
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "distance") return a.distance - b.distance;
        return 0; // relevance
      });
  }, [
    searchQuery,
    selectedCategory,
    selectedAvailabilities,
    maxDistance,
    maxDailyRate,
    selectedConditions,
    minRating,
    sortBy,
  ]);

  return (
    <div className="min-h-screen bg-[#FDFBF1] text-[#18181B] flex flex-col select-none animate-fadeIn">
      {/* ─── MASTER CONTINUOUS TOP NAVBAR ─────────────────────── */}
      <AppNavbar variant="auth" />

      {/* ─── BROWSE BODY CONTAINER ───────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1 flex flex-col">
        {/* ─── 1. Hero Header Banner ──────────────────────────── */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-[#EDE8C8]">
          <div className="max-w-2xl text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#F5F8E9] border border-[#D8E8B8] rounded-full text-xs font-bold text-[#2E5E1C] mb-2 shadow-2xs">
              <AppIcon name="sparkles" size={14} className="text-[#6F9535]" />
              <span>CAMPUS RESOURCE CATALOG</span>
              <span>✦</span>
            </div>
            <h1
              className="text-2xl sm:text-4xl font-extrabold text-[#18181B] tracking-tight leading-tight mb-2"
              style={{ fontFamily: "'Pixelify Sans', monospace" }}
            >
              Borrow Equipment from Campus Peers
            </h1>
            <p className="text-xs sm:text-sm text-[#52525B] font-medium leading-relaxed mb-4">
              Access verified cameras, lab gear, coursebooks, and tools right on campus with automated security deposit escrow.
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <button
                type="button"
                onClick={() => {
                  setModalTab("list");
                  setIsListModalOpen(true);
                }}
                className="px-5 py-2.5 bg-gradient-to-b from-[#7FB634] to-[#689A24] text-white font-bold text-xs sm:text-sm rounded-2xl transition-all shadow-xs hover:from-[#8AC538] hover:to-[#72A627] flex items-center gap-2 cursor-pointer border-b-2 border-[#557F1C] active:translate-y-0.5"
              >
                <AppIcon name="package" size={15} />
                <span>List a Resource</span>
              </button>
              <Link
                href="/requests"
                className="px-4 py-2.5 bg-white hover:bg-[#FAF7F0] border border-[#EDE8C8] text-[#18181B] font-bold text-xs sm:text-sm rounded-2xl transition-all shadow-2xs flex items-center gap-2 cursor-pointer active:translate-y-0.5"
              >
                <AppIcon name="bell" size={15} className="text-[#D97706]" />
                <span>Wanted Requests</span>
                <span className="bg-[#FEF3C7] text-[#92400E] text-[10px] px-2 py-0.5 rounded-full font-extrabold border border-[#FDE68A]">
                  4 Open
                </span>
              </Link>
            </div>
          </div>

          {/* Right Mascot with Speech Bubble */}
          <div className="relative hidden md:flex items-center gap-3 flex-shrink-0">
            <div className="bg-white border border-[#EDE8C8] px-4 py-2 rounded-2xl text-xs font-bold text-[#18181B] shadow-2xs relative flex items-center gap-1.5">
              <AppIcon name="map-pin" size={13} className="text-[#16A34A]" />
              <span><strong className="text-[#16A34A]">{filteredResources.length} items</strong> available nearby</span>
              <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-2.5 h-2.5 bg-white border-t border-r border-[#EDE8C8] rotate-45" />
            </div>
            <div className="relative w-28 h-32 lg:w-32 lg:h-36">
              <Image
                src="/mascots/mascot_character.png"
                alt="Browse Mascot"
                fill
                className="object-contain object-bottom select-none pointer-events-none scale-105"
                priority
              />
            </div>
          </div>
        </div>

        {/* ─── 2. Search Command Bar & Quick Filter Chips ──────── */}
        <div className="mt-5 bg-white p-4 rounded-3xl border border-[#EDE8C8] shadow-2xs space-y-3">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            {/* Search Input Box */}
            <div className="relative flex-1 min-w-0">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#9CA3AF]">
                <AppIcon name="search" size={18} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search gear, course codes, or student owners..."
                className="w-full pl-11 pr-10 py-2.5 bg-[#FDFBF1] border border-[#EDE8C8] rounded-2xl text-xs sm:text-sm text-[#18181B] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#6F9535] transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#9CA3AF] hover:text-[#18181B] cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort & Grid/List Switcher & Mobile Filter Toggle */}
            <div className="flex items-center gap-2 sm:gap-2.5 flex-shrink-0">
              {/* Mobile Filter Toggle */}
              <button
                type="button"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className={`lg:hidden px-3.5 py-2.5 rounded-2xl border text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                  showMobileFilters
                    ? "bg-[#18181B] text-white border-[#18181B]"
                    : "bg-[#FDFBF1] hover:bg-[#F5F2E8] border-[#EDE8C8] text-[#18181B]"
                }`}
              >
                <AppIcon name="filter" size={14} className={showMobileFilters ? "text-white" : "text-[#6F9535]"} />
                <span>Filters</span>
              </button>

              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="appearance-none bg-[#FDFBF1] border border-[#EDE8C8] text-[#18181B] text-xs font-bold py-2.5 pl-3.5 pr-8 rounded-2xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#6F9535]"
                >
                  <option value="relevance">Sort: Relevance</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Top Rated (★)</option>
                  <option value="distance">Nearest Distance</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-[#71717A]">
                  <AppIcon name="chevron-down" size={12} />
                </div>
              </div>

              {/* View Switcher */}
              <div className="flex items-center bg-[#FDFBF1] border border-[#EDE8C8] p-1 rounded-2xl gap-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-xl transition-all cursor-pointer ${
                    viewMode === "grid" ? "bg-[#18181B] text-white shadow-2xs" : "text-[#71717A] hover:text-[#18181B]"
                  }`}
                  title="Grid View"
                >
                  <AppIcon name="grid" size={16} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded-xl transition-all cursor-pointer ${
                    viewMode === "list" ? "bg-[#18181B] text-white shadow-2xs" : "text-[#71717A] hover:text-[#18181B]"
                  }`}
                  title="List View"
                >
                  <AppIcon name="list" size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Search Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-1">
            <span className="text-[11px] font-bold text-[#71717A] flex-shrink-0">Quick Search:</span>
            {quickSearchTags.map((tag) => (
              <button
                key={tag.query}
                onClick={() => setSearchQuery(tag.query)}
                className="px-3 py-1.5 rounded-xl bg-[#FDFBF1] hover:bg-[#F5F2E8] border border-[#EDE8C8] text-[11px] font-bold text-[#52525B] hover:text-[#18181B] transition-all flex items-center gap-1.5 flex-shrink-0 cursor-pointer shadow-2xs hover:border-[#6F9535]/40"
              >
                <AppIcon name={tag.icon} size={13} className="text-[#6F9535]" />
                <span>{tag.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ─── 3. Claymorphic Category Pills ──────────────────── */}
        <div className="mt-4 flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2.5 rounded-2xl border text-xs font-bold transition-all duration-200 flex items-center gap-2 flex-shrink-0 cursor-pointer ${
              selectedCategory === "all"
                ? "bg-[#18181B] text-white border-[#18181B] shadow-xs scale-102"
                : "bg-white text-[#52525B] border-[#EDE8C8] hover:bg-[#FDFBF1]"
            }`}
          >
            <span>All Categories</span>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${selectedCategory === "all" ? "bg-white/20 text-white" : "bg-[#F5F2E8] text-[#71717A]"}`}>
              {browseResources.length}
            </span>
          </button>

          {browseCategories.map((cat) => {
            const isSelected = selectedCategory.toLowerCase() === cat.name.toLowerCase();
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(isSelected ? "all" : cat.name.toLowerCase())}
                className={`px-3.5 py-2 rounded-2xl border flex items-center gap-2.5 flex-shrink-0 cursor-pointer shadow-2xs hover:shadow-xs transition-all duration-200 ${
                  isSelected
                    ? "bg-[#6F9535] text-white border-[#6F9535] scale-102"
                    : "bg-white text-[#52525B] border-[#EDE8C8] hover:bg-[#FDFBF1]"
                }`}
              >
                <div className={`w-7 h-7 rounded-xl flex items-center justify-center ${isSelected ? "bg-white/20 text-white" : "bg-[#FAF7F0] text-[#6F9535]"}`}>
                  <AppIcon name={cat.icon} size={14} />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold leading-tight">{cat.name}</p>
                  <p className={`text-[10px] leading-tight ${isSelected ? "text-white/80" : "text-[#71717A]"}`}>
                    {cat.count} items
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* ─── 4. Main Layout (Sidebar + Product Grid) ────────── */}
        <div className="mt-5 flex flex-col lg:flex-row items-start gap-6 flex-1">
          {/* ─── LEFT FILTERS SIDEBAR ─────────────────────────── */}
          <aside className={`w-full lg:w-[250px] xl:w-[260px] bg-white rounded-3xl border border-[#EDE8C8] p-5 shadow-2xs flex-shrink-0 select-none space-y-4 ${showMobileFilters ? "block animate-fadeIn" : "hidden lg:block"}`}>
            {/* Filter Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#EDE8C8]">
              <div className="flex items-center gap-2">
                <AppIcon name="filter" size={16} className="text-[#6F9535]" />
                <h2 className="text-sm font-bold text-[#18181B]">Filters &amp; Radius</h2>
              </div>
              <button
                onClick={clearAllFilters}
                className="text-xs font-bold text-[#16A34A] hover:underline cursor-pointer"
              >
                Reset All
              </button>
            </div>

            {/* Accordion 1: Daily Budget Max Slider */}
            <div className="pb-3 border-b border-[#F8F5EC]">
              <button
                onClick={() => toggleSection("price")}
                className="w-full flex items-center justify-between text-xs font-bold text-[#18181B] mb-2 cursor-pointer"
              >
                <span>Max Daily Rate</span>
                <span className="text-[#6F9535] font-black">₹{maxDailyRate}/d</span>
              </button>
              {openSections.price && (
                <div className="space-y-1.5 pt-1">
                  <input
                    type="range"
                    min="50"
                    max="1000"
                    step="50"
                    value={maxDailyRate}
                    onChange={(e) => setMaxDailyRate(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-[#EDE8C8] rounded-lg appearance-none cursor-pointer accent-[#6F9535]"
                  />
                  <div className="flex items-center justify-between text-[10px] text-[#71717A] font-semibold">
                    <span>₹50/day</span>
                    <span>₹1,000/day</span>
                  </div>
                </div>
              )}
            </div>

            {/* Accordion 2: Distance Radius */}
            <div className="pb-3 border-b border-[#F8F5EC]">
              <button
                onClick={() => toggleSection("distance")}
                className="w-full flex items-center justify-between text-xs font-bold text-[#18181B] mb-2 cursor-pointer"
              >
                <span>Campus Radius</span>
                <span className="text-[#6F9535] font-black">{maxDistance} km</span>
              </button>
              {openSections.distance && (
                <div className="space-y-1.5 pt-1">
                  <input
                    type="range"
                    min="0.5"
                    max="15"
                    step="0.5"
                    value={maxDistance}
                    onChange={(e) => setMaxDistance(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-[#EDE8C8] rounded-lg appearance-none cursor-pointer accent-[#6F9535]"
                  />
                  <div className="flex items-center justify-between text-[10px] text-[#71717A] font-semibold">
                    <span>Within 500m</span>
                    <span>15 km</span>
                  </div>
                </div>
              )}
            </div>

            {/* Accordion 3: Availability */}
            <div className="pb-3 border-b border-[#F8F5EC]">
              <button
                onClick={() => toggleSection("availability")}
                className="w-full flex items-center justify-between text-xs font-bold text-[#18181B] mb-2.5 cursor-pointer"
              >
                <span>Availability</span>
                <AppIcon name="chevron-down" size={12} className={openSections.availability ? "rotate-180" : ""} />
              </button>
              {openSections.availability && (
                <div className="space-y-2 text-xs">
                  {[
                    { id: "now", label: "Available Now", badge: "Instant", color: "text-[#16A34A]" },
                    { id: "week", label: "This Week", badge: "Upcoming", color: "text-[#D97706]" },
                    { id: "flexible", label: "Flexible", badge: "On-Demand", color: "text-[#2563EB]" },
                  ].map((a) => (
                    <label
                      key={a.id}
                      className="flex items-center justify-between p-2 rounded-xl bg-[#FDFBF1] hover:bg-[#F5F2E8] border border-[#EDE8C8] cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedAvailabilities.includes(a.id)}
                          onChange={() => toggleAvailability(a.id)}
                          className="w-4 h-4 rounded text-[#6F9535] focus:ring-[#6F9535] accent-[#6F9535] cursor-pointer"
                        />
                        <span className="font-bold text-[#18181B] text-[11.5px]">{a.label}</span>
                      </div>
                      <span className={`text-[9.5px] font-extrabold ${a.color}`}>
                        {a.badge}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Accordion 4: Condition */}
            <div className="pb-3 border-b border-[#F8F5EC]">
              <button
                onClick={() => toggleSection("condition")}
                className="w-full flex items-center justify-between text-xs font-bold text-[#18181B] mb-2.5 cursor-pointer"
              >
                <span>Item Condition</span>
                <AppIcon name="chevron-down" size={12} className={openSections.condition ? "rotate-180" : ""} />
              </button>
              {openSections.condition && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {["Like New", "Good", "Fair"].map((cond) => {
                    const isSelected = selectedConditions.includes(cond);
                    return (
                      <button
                        key={cond}
                        type="button"
                        onClick={() => toggleCondition(cond)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#6F9535] text-white border-[#6F9535] shadow-xs"
                            : "bg-[#FDFBF1] text-[#52525B] border-[#EDE8C8] hover:bg-[#F5F2E8]"
                        }`}
                      >
                        {cond}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Bottom Escrow Security Badge */}
            <div className="p-4 rounded-2xl bg-[#F5F8E9] border border-[#D8E8B8] space-y-1 text-center">
              <div className="w-8 h-8 rounded-xl bg-white text-[#16A34A] flex items-center justify-center mx-auto shadow-2xs font-bold mb-1">
                <AppIcon name="shield-check" size={16} />
              </div>
              <p className="text-xs font-bold text-[#18181B]">Campus Escrow Protected</p>
              <p className="text-[10px] text-[#52525B] leading-tight">
                Deposits are held safely and released immediately on verified return.
              </p>
            </div>
          </aside>

          {/* ─── RIGHT PRODUCT CARDS GRID ───────────────────────── */}
          <main className="flex-1 w-full min-w-0">
            {filteredResources.length === 0 ? (
              <div className="bg-white rounded-3xl border border-[#EDE8C8] p-12 text-center shadow-2xs">
                <div className="w-16 h-16 rounded-full bg-[#FEF3C7] text-[#D97706] flex items-center justify-center mx-auto mb-4">
                  <AppIcon name="search" size={28} />
                </div>
                <h3 className="text-lg font-bold text-[#18181B] mb-1">No resources match your filters</h3>
                <p className="text-xs text-[#71717A] max-w-sm mx-auto mb-4">
                  Try clearing your search query or expanding your max daily budget and distance radius.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-5 py-2.5 bg-[#18181B] text-white text-xs font-bold rounded-2xl hover:bg-[#27272A] transition-all cursor-pointer shadow-xs"
                >
                  Reset All Filters
                </button>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredResources.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-3xl border border-[#EDE8C8] overflow-hidden shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
                  >
                    {/* Top Image Container with Price & Wishlist Badges */}
                    <div className="relative w-full aspect-[4/3] bg-[#FDFBF1] overflow-hidden">
                      <Link href={`/browse/${item.id}`} className="block w-full h-full">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </Link>

                      {/* Top-Left Price Badge */}
                      <div className="absolute top-3 left-3 bg-[#18181B]/85 backdrop-blur-xs text-white px-3 py-1 rounded-2xl shadow-xs border border-white/10 flex items-baseline gap-1 pointer-events-none">
                        <span className="text-sm font-black text-[#BBF7D0]">₹{item.dailyRate || 100}</span>
                        <span className="text-[10px] text-white/70 font-normal">/day</span>
                      </div>

                      {/* Top-Right Favorite Button */}
                      <button
                        onClick={(e) => toggleFavorite(item.id, e)}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#EF4444] shadow-xs hover:scale-110 active:scale-95 transition-all cursor-pointer z-10"
                        title={favorites[item.id] ? "Favorited" : "Add to favorites"}
                      >
                        {favorites[item.id] ? (
                          <span className="text-sm">❤️</span>
                        ) : (
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                          </svg>
                        )}
                      </button>

                      {/* Bottom Availability & Distance Bar */}
                      <div className="absolute bottom-2.5 inset-x-2.5 flex items-center justify-between pointer-events-none">
                        <span
                          className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-2xs backdrop-blur-xs ${
                            item.statusType === "now"
                              ? "bg-[#DEF7EC]/95 text-[#03543F] border border-[#BBF7D0]"
                              : item.statusType === "week"
                              ? "bg-[#FEF3C7]/95 text-[#92400E] border border-[#FDE68A]"
                              : "bg-[#E0F2FE]/95 text-[#075985] border border-[#BAE6FD]"
                          }`}
                        >
                          {item.status}
                        </span>

                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#18181B]/75 text-white backdrop-blur-xs flex items-center gap-1">
                          <AppIcon name="map-pin" size={10} className="text-[#86EFAC]" />
                          <span>{item.distance} km</span>
                        </span>
                      </div>
                    </div>

                    {/* Card Content Details */}
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        {/* Title */}
                        <Link href={`/browse/${item.id}`}>
                          <h3 className="text-sm font-bold text-[#18181B] leading-snug line-clamp-1 group-hover:text-[#6F9535] transition-colors">
                            {item.title}
                          </h3>
                        </Link>

                        {/* Owner & Department */}
                        <div className="flex items-center gap-2.5 mt-2">
                          <div className={`w-7 h-7 rounded-xl ${item.avatarBg} flex items-center justify-center font-bold text-[10.5px] flex-shrink-0 shadow-2xs border border-white`}>
                            {item.initials}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-bold text-[#18181B] truncate leading-tight">
                              {item.owner}
                            </p>
                            <p className="text-[10px] text-[#71717A] truncate leading-tight">
                              {item.department}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 text-xs font-bold text-[#18181B]">
                            <span className="text-[#F59E0B]">★</span>
                            <span>{item.rating}</span>
                          </div>
                        </div>
                      </div>

                      {/* Deposit & Escrow Badge */}
                      <div className="pt-2.5 border-t border-[#EDE8C8] flex items-center justify-between text-[11px]">
                        <span className="text-[#71717A] font-medium">
                          Deposit: <strong className="text-[#18181B]">₹{item.deposit || 800}</strong>
                        </span>
                        <span className="text-[10px] font-extrabold text-[#16A34A] bg-[#DCFCE7] px-2 py-0.5 rounded-full border border-[#BBF7D0]">
                          100% Escrow
                        </span>
                      </div>

                      {/* Tactile Borrow Action Button */}
                      <Link
                        href={`/browse/${item.id}`}
                        className="w-full py-2.5 bg-[#FDFBF1] hover:bg-[#6F9535] text-[#18181B] hover:text-white border border-[#EDE8C8] hover:border-[#6F9535] font-bold text-xs rounded-2xl transition-all flex items-center justify-center gap-1.5 shadow-2xs active:translate-y-0.5"
                      >
                        <span>Borrow Equipment</span>
                        <AppIcon name="arrow-right" size={13} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* List View Mode */
              <div className="space-y-3.5">
                {filteredResources.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-3xl border border-[#EDE8C8] p-4 shadow-2xs hover:shadow-md hover:-translate-y-0.5 transition-all flex flex-col sm:flex-row items-center justify-between gap-5 group"
                  >
                    <Link href={`/browse/${item.id}`} className="flex items-center gap-4 min-w-0 w-full sm:w-auto flex-1">
                      <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-[#FDFBF1] flex-shrink-0 border border-[#EDE8C8]">
                        <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform" />
                      </div>
                      <div className="min-w-0 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#DEF7EC] text-[#03543F]">
                            {item.status}
                          </span>
                          <span className="text-[10.5px] text-[#71717A] font-semibold">{item.distance} km away</span>
                        </div>
                        <h3 className="text-sm sm:text-base font-bold text-[#18181B] group-hover:text-[#6F9535] transition-colors truncate">
                          {item.title}
                        </h3>
                        <p className="text-xs text-[#71717A] truncate">
                          Owner: <strong>{item.owner}</strong> ({item.department}) • ★ {item.rating}
                        </p>
                      </div>
                    </Link>

                    <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-[#EDE8C8]">
                      <div className="text-left sm:text-right">
                        <p className="text-base font-black text-[#16A34A]">₹{item.dailyRate || 100} <span className="text-xs font-normal text-[#71717A]">/day</span></p>
                        <p className="text-[10px] text-[#71717A]">₹{item.deposit || 800} refundable deposit</p>
                      </div>
                      <Link
                        href={`/browse/${item.id}`}
                        className="px-5 py-2.5 bg-gradient-to-b from-[#7FB634] to-[#689A24] text-white font-bold text-xs rounded-2xl hover:from-[#8AC538] hover:to-[#72A627] transition-all shadow-xs border-b-2 border-[#557F1C] active:translate-y-0.5 flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>Borrow →</span>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* ─── 3-Step List Modal ─────────────────────────────────── */}
      <ListResourceModal
        isOpen={isListModalOpen}
        onClose={() => setIsListModalOpen(false)}
        initialTab={modalTab}
      />
    </div>
  );
}
