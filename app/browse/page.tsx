"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import AppNavbar from "@/app/components/layout/AppNavbar";
import { browseCategories, browseResources } from "@/app/data/mockData";
import { AppIcon } from "@/app/components/dashboard/Icons";

export default function BrowsePage() {
  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedAvailabilities, setSelectedAvailabilities] = useState<string[]>(["now"]);
  const [maxDistance, setMaxDistance] = useState<number>(5);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number>(4.0);
  const [sortBy, setSortBy] = useState<"relevance" | "rating" | "distance" | "name">("relevance");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [favorites, setFavorites] = useState<Record<string, boolean>>({
    b1: true,
  });

  // Accordion open/close states
  const [openSections, setOpenSections] = useState({
    category: true,
    availability: true,
    distance: true,
    condition: true,
    rating: true,
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
    setSelectedConditions([]);
    setMinRating(0);
  };

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
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "distance") return a.distance - b.distance;
        if (sortBy === "name") return a.title.localeCompare(b.title);
        return 0; // relevance
      });
  }, [
    searchQuery,
    selectedCategory,
    selectedAvailabilities,
    maxDistance,
    selectedConditions,
    minRating,
    sortBy,
  ]);

  return (
    <div className="min-h-screen bg-[#FBF7F0] text-[#18181B] flex flex-col select-none">
      {/* ─── Top Navbar ───────────────────────────────────────── */}
      <AppNavbar variant="auth" />

      {/* ─── Main Content Container ───────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1 flex flex-col">
        {/* ─── Header Banner with Title & Mascot ──────────────── */}
        <div className="flex items-center justify-between pb-6 border-b border-[#EDE8C8] relative">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-1.5">
              <h1
                className="text-3xl sm:text-4xl font-extrabold text-[#18181B] tracking-tight"
                style={{ fontFamily: "'Pixelify Sans', monospace" }}
              >
                Browse Resources
              </h1>
              {/* Sparkle decorative lines */}
              <div className="text-[#18181B] flex items-center -mt-3">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                </svg>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-[#52525B] font-medium">
              Discover and access resources shared by students across your campus.
            </p>
          </div>

          {/* Right Mascot with Heart Bubble */}
          <div className="relative hidden md:flex items-center gap-2 flex-shrink-0 -mr-2">
            <div className="relative w-32 h-32 lg:w-36 lg:h-36">
              <Image
                src="/mascots/blue_dress_hat.png"
                alt="Browse Mascot"
                fill
                className="object-contain object-bottom select-none pointer-events-none drop-shadow-sm"
                priority
              />
            </div>
            {/* Floating Heart Thought Bubble */}
            <div className="w-9 h-9 rounded-full bg-white border border-[#E5E7EB] shadow-sm flex items-center justify-center text-sm -ml-4 -mt-12 animate-pulse">
              ❤️
            </div>
          </div>
        </div>

        {/* ─── Search & Controls Row ──────────────────────────── */}
        <div className="mt-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3.5 bg-white p-3.5 rounded-3xl border border-[#EDE8C8] shadow-2xs">
          {/* Search Bar */}
          <div className="relative flex-1 min-w-0">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#9CA3AF]">
              <AppIcon name="search" size={18} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for resources (e.g., DSLR camera, Calculus textbook...)"
              className="w-full pl-11 pr-4 py-2.5 bg-[#FBF7F0]/60 border border-[#E8E1D5] rounded-2xl text-xs sm:text-sm text-[#18181B] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#84CC16]"
            />
          </div>

          {/* Sort Dropdown & View Mode */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="appearance-none bg-[#FBF7F0]/80 border border-[#E8E1D5] text-[#374151] text-xs font-semibold py-2.5 pl-3.5 pr-8 rounded-2xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#84CC16]"
              >
                <option value="relevance">Sort: Relevance</option>
                <option value="rating">Sort: Rating</option>
                <option value="distance">Sort: Distance</option>
                <option value="name">Sort: Name</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-[#71717A]">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-[#FBF7F0] border border-[#E8E1D5] p-1 rounded-2xl gap-1">
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

        {/* ─── Category Quick-Filter Horizontal Cards ─────────── */}
        <div className="mt-4 flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2.5 rounded-2xl border text-xs font-bold transition-all flex items-center gap-2 flex-shrink-0 cursor-pointer ${
              selectedCategory === "all"
                ? "bg-[#18181B] text-white border-[#18181B] shadow-xs"
                : "bg-white text-[#374151] border-[#EDE8C8] hover:bg-[#FBF7F0]"
            }`}
          >
            <span>All Categories</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${selectedCategory === "all" ? "bg-white/20 text-white" : "bg-[#F3EFE6] text-[#71717A]"}`}>
              {browseResources.length}
            </span>
          </button>

          {browseCategories.map((cat) => {
            const isSelected = selectedCategory.toLowerCase() === cat.name.toLowerCase();
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(isSelected ? "all" : cat.name.toLowerCase())}
                style={{
                  backgroundColor: isSelected ? "#18181B" : cat.bgColor,
                  borderColor: isSelected ? "#18181B" : cat.borderColor,
                }}
                className={`px-3.5 py-2 rounded-2xl border flex items-center gap-3 flex-shrink-0 cursor-pointer shadow-2xs hover:shadow-xs transition-all ${
                  isSelected ? "text-white" : "text-[#18181B]"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    isSelected ? "bg-white/20 text-white" : "bg-white"
                  }`}
                  style={{ color: isSelected ? "#FFFFFF" : cat.iconColor }}
                >
                  <AppIcon name={cat.icon} size={15} />
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold leading-tight">{cat.name}</p>
                  <p className={`text-[10.5px] leading-tight ${isSelected ? "text-white/70" : "text-[#71717A]"}`}>
                    {cat.count}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* ─── Main Grid Layout (Filters Sidebar + Products) ──── */}
        <div className="mt-5 flex flex-col lg:flex-row items-start gap-6 flex-1">
          {/* ─── LEFT FILTERS SIDEBAR ─────────────────────────── */}
          <aside className="w-full lg:w-[240px] xl:w-[250px] bg-white rounded-3xl border border-[#EDE8C8] p-5 shadow-2xs flex-shrink-0 select-none">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#F0EAE0]">
              <div className="flex items-center gap-2">
                <AppIcon name="filter" size={16} className="text-[#18181B]" />
                <h2 className="text-sm font-bold text-[#18181B]">Filters</h2>
              </div>
              <button
                onClick={clearAllFilters}
                className="text-xs font-bold text-[#16A34A] hover:underline cursor-pointer"
              >
                Clear all
              </button>
            </div>

            {/* Accordion 1: Category */}
            <div className="py-3.5 border-b border-[#F0EAE0]">
              <button
                onClick={() => toggleSection("category")}
                className="w-full flex items-center justify-between text-xs font-bold text-[#18181B] mb-2.5 cursor-pointer"
              >
                <span>Category</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className={`transition-transform ${openSections.category ? "rotate-180" : ""}`}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              {openSections.category && (
                <div className="space-y-2 text-xs text-[#374151]">
                  {[
                    { id: "all", label: "All Categories" },
                    { id: "electronics", label: "Electronics" },
                    { id: "books", label: "Books" },
                    { id: "sports", label: "Sports" },
                    { id: "tools", label: "Tools" },
                    { id: "music", label: "Musical Instruments" },
                    { id: "others", label: "Others" },
                  ].map((c) => (
                    <label key={c.id} className="flex items-center gap-2 cursor-pointer hover:text-[#18181B]">
                      <input
                        type="checkbox"
                        checked={selectedCategory === c.id || (c.id === "all" && selectedCategory === "all")}
                        onChange={() => setSelectedCategory(c.id)}
                        className="w-4 h-4 rounded text-[#16A34A] focus:ring-[#16A34A] accent-[#16A34A] cursor-pointer"
                      />
                      <span>{c.label}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Accordion 2: Availability */}
            <div className="py-3.5 border-b border-[#F0EAE0]">
              <button
                onClick={() => toggleSection("availability")}
                className="w-full flex items-center justify-between text-xs font-bold text-[#18181B] mb-2.5 cursor-pointer"
              >
                <span>Availability</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className={`transition-transform ${openSections.availability ? "rotate-180" : ""}`}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              {openSections.availability && (
                <div className="space-y-2 text-xs text-[#374151]">
                  {[
                    { id: "now", label: "Available Now" },
                    { id: "week", label: "Available This Week" },
                    { id: "flexible", label: "Availability Flexible" },
                  ].map((a) => (
                    <label key={a.id} className="flex items-center gap-2 cursor-pointer hover:text-[#18181B]">
                      <input
                        type="checkbox"
                        checked={selectedAvailabilities.includes(a.id)}
                        onChange={() => toggleAvailability(a.id)}
                        className="w-4 h-4 rounded text-[#16A34A] focus:ring-[#16A34A] accent-[#16A34A] cursor-pointer"
                      />
                      <span>{a.label}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Accordion 3: Distance */}
            <div className="py-3.5 border-b border-[#F0EAE0]">
              <button
                onClick={() => toggleSection("distance")}
                className="w-full flex items-center justify-between text-xs font-bold text-[#18181B] mb-2.5 cursor-pointer"
              >
                <span>Distance</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className={`transition-transform ${openSections.distance ? "rotate-180" : ""}`}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              {openSections.distance && (
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-[#52525B] mb-2">
                    <span>Radius</span>
                    <span className="font-bold text-[#16A34A]">{maxDistance} km</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="15"
                    step="0.5"
                    value={maxDistance}
                    onChange={(e) => setMaxDistance(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-[#E5E7EB] rounded-lg appearance-none cursor-pointer accent-[#16A34A]"
                  />
                  <div className="flex items-center justify-between text-[10px] text-[#9CA3AF] mt-1">
                    <span>0.5 km</span>
                    <span>15 km</span>
                  </div>
                </div>
              )}
            </div>

            {/* Accordion 4: Condition */}
            <div className="py-3.5 border-b border-[#F0EAE0]">
              <button
                onClick={() => toggleSection("condition")}
                className="w-full flex items-center justify-between text-xs font-bold text-[#18181B] mb-2.5 cursor-pointer"
              >
                <span>Condition</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className={`transition-transform ${openSections.condition ? "rotate-180" : ""}`}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              {openSections.condition && (
                <div className="space-y-2 text-xs text-[#374151]">
                  {["Like New", "Good", "Fair"].map((cond) => (
                    <label key={cond} className="flex items-center gap-2 cursor-pointer hover:text-[#18181B]">
                      <input
                        type="checkbox"
                        checked={selectedConditions.includes(cond)}
                        onChange={() => toggleCondition(cond)}
                        className="w-4 h-4 rounded text-[#16A34A] focus:ring-[#16A34A] accent-[#16A34A] cursor-pointer"
                      />
                      <span>{cond}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Accordion 5: Rating */}
            <div className="pt-3.5">
              <button
                onClick={() => toggleSection("rating")}
                className="w-full flex items-center justify-between text-xs font-bold text-[#18181B] mb-2.5 cursor-pointer"
              >
                <span>Rating</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  className={`transition-transform ${openSections.rating ? "rotate-180" : ""}`}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              {openSections.rating && (
                <div className="space-y-2 text-xs">
                  <div
                    onClick={() => setMinRating(minRating === 4.0 ? 0 : 4.0)}
                    className="flex items-center gap-2 cursor-pointer hover:text-[#18181B]"
                  >
                    <div className="flex items-center text-[#F59E0B] text-xs">
                      {"★★★★★"}
                    </div>
                    <span className="text-xs text-[#374151] font-semibold">4.0 & above</span>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Cute Graphic from Existing Mascot Assets */}
            <div className="mt-6 pt-4 border-t border-[#F0EAE0] flex items-center justify-center">
              <div className="relative w-24 h-24">
                <Image
                  src="/mascots/ladder.png"
                  alt="Decorative mascot element"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </aside>

          {/* ─── RIGHT RESOURCE CARDS GRID ─────────────────────── */}
          <main className="flex-1 w-full min-w-0">
            {filteredResources.length === 0 ? (
              <div className="bg-white rounded-3xl border border-[#EDE8C8] p-12 text-center shadow-2xs">
                <div className="w-16 h-16 rounded-full bg-[#FEF3C7] text-[#D97706] flex items-center justify-center mx-auto mb-4">
                  <AppIcon name="search" size={28} />
                </div>
                <h3 className="text-lg font-bold text-[#18181B] mb-1">No resources found</h3>
                <p className="text-xs text-[#71717A] max-w-sm mx-auto mb-4">
                  Try adjusting your search keywords, clearing your category filters, or expanding the distance radius.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-4 py-2 bg-[#18181B] text-white text-xs font-bold rounded-xl hover:bg-[#27272A] transition-all cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
                {filteredResources.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-3xl border border-[#EDE8C8] overflow-hidden shadow-2xs hover:shadow-md transition-all group flex flex-col justify-between"
                  >
                    {/* Top Image Container with Badges */}
                    <div className="relative w-full aspect-[4/3] bg-[#F9FAFB] overflow-hidden">
                      <Link href={`/browse/${item.id}`} className="block w-full h-full">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </Link>

                      {/* Availability Pill (Bottom Left of Image) */}
                      <div className="absolute bottom-2.5 left-2.5 pointer-events-none">
                        <span
                          className={`text-[10px] font-bold px-2.5 py-1 rounded-full shadow-2xs ${
                            item.statusType === "now"
                              ? "bg-[#DEF7EC] text-[#03543F]"
                              : item.statusType === "week"
                              ? "bg-[#FEF3C7] text-[#92400E]"
                              : "bg-[#E0F2FE] text-[#075985]"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>

                      {/* Favorite Heart Button (Top Right of Image) */}
                      <button
                        onClick={(e) => toggleFavorite(item.id, e)}
                        className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#EF4444] shadow-xs hover:scale-110 transition-transform cursor-pointer z-10"
                        title={favorites[item.id] ? "Favorited" : "Add to favorites"}
                      >
                        {favorites[item.id] ? (
                          <span className="text-sm">❤️</span>
                        ) : (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                          </svg>
                        )}
                      </button>
                    </div>

                    {/* Card Body */}
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Title */}
                        <Link href={`/browse/${item.id}`}>
                          <h3 className="text-[13.5px] font-bold text-[#18181B] leading-tight mb-2.5 line-clamp-1 group-hover:text-[#16A34A] transition-colors">
                            {item.title}
                          </h3>
                        </Link>

                        {/* Owner Row */}
                        <div className="flex items-center gap-2 mb-3">
                          <div className={`w-6 h-6 rounded-full ${item.avatarBg} flex items-center justify-center font-bold text-[10px] flex-shrink-0 shadow-2xs`}>
                            {item.initials}
                          </div>
                          <div className="min-w-0">
                            <p className="text-[11px] font-bold text-[#18181B] truncate leading-tight">
                              {item.owner}
                            </p>
                            <p className="text-[9.5px] text-[#71717A] truncate leading-tight">
                              {item.department}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Stats: Rating & Distance */}
                      <div className="pt-2.5 border-t border-[#F0EAE0] flex items-center justify-between text-[11px] text-[#52525B]">
                        <div className="flex items-center gap-1 font-semibold">
                          <span className="text-[#F59E0B]">★</span>
                          <span className="text-[#18181B] font-bold">{item.rating}</span>
                          <span className="text-[#9CA3AF]">({item.reviews})</span>
                        </div>
                        <div className="flex items-center gap-1 text-[#71717A] font-medium">
                          <AppIcon name="map-pin" size={12} className="text-[#16A34A]" />
                          <span>{item.distance} km</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* List View */
              <div className="space-y-3">
                {filteredResources.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-3xl border border-[#EDE8C8] p-4 shadow-2xs hover:shadow-md transition-all flex flex-col sm:flex-row items-center justify-between gap-4 group"
                  >
                    <Link href={`/browse/${item.id}`} className="flex items-center gap-4 min-w-0 w-full sm:w-auto">
                      <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-[#F9FAFB] flex-shrink-0">
                        <Image src={item.image} alt={item.title} fill className="object-cover" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`text-[9.5px] font-bold px-2 py-0.5 rounded-full ${
                              item.statusType === "now"
                                ? "bg-[#DEF7EC] text-[#03543F]"
                                : item.statusType === "week"
                                ? "bg-[#FEF3C7] text-[#92400E]"
                                : "bg-[#E0F2FE] text-[#075985]"
                            }`}
                          >
                            {item.status}
                          </span>
                          <span className="text-[10px] text-[#9CA3AF]">• {item.condition}</span>
                        </div>
                        <h3 className="text-sm font-bold text-[#18181B] truncate group-hover:text-[#16A34A] transition-colors">{item.title}</h3>
                        <p className="text-xs text-[#71717A] mt-0.5">
                          Shared by <span className="font-semibold text-[#18181B]">{item.owner}</span> ({item.department})
                        </p>
                      </div>
                    </Link>

                    <div className="flex items-center justify-between sm:justify-end gap-5 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-[#F0EAE0]">
                      <div className="text-left sm:text-right">
                        <div className="flex items-center gap-1 text-xs font-semibold">
                          <span className="text-[#F59E0B]">★</span>
                          <span className="text-[#18181B] font-bold">{item.rating}</span>
                          <span className="text-[#9CA3AF]">({item.reviews})</span>
                        </div>
                        <p className="text-[11px] text-[#71717A] flex items-center sm:justify-end gap-1 mt-0.5">
                          <AppIcon name="map-pin" size={11} className="text-[#16A34A]" />
                          <span>{item.distance} km away</span>
                        </p>
                      </div>

                      <button
                        onClick={(e) => toggleFavorite(item.id, e)}
                        className="w-8 h-8 rounded-full bg-[#F3EFE6] flex items-center justify-center text-sm cursor-pointer hover:bg-white transition-colors"
                      >
                        {favorites[item.id] ? "❤️" : "🤍"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
