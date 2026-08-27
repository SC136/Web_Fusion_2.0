"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Sidebar from "@/app/components/dashboard/Sidebar";
import AppNavbar from "@/app/components/layout/AppNavbar";
import { AppIcon } from "@/app/components/dashboard/Icons";
import { mockChatThreads, currentUser } from "@/app/data/mockData";

export default function MessagesPage() {
  const [threads, setThreads] = useState(mockChatThreads);
  const [activeThreadId, setActiveThreadId] = useState(mockChatThreads[0].id);
  const [searchFilter, setSearchFilter] = useState("");
  const [categoryTab, setCategoryTab] = useState<"all" | "borrowing" | "lending">("all");
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [copiedOtp, setCopiedOtp] = useState(false);
  const [mobileView, setMobileView] = useState<"list" | "chat">("list");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeThread = threads.find((t) => t.id === activeThreadId) || threads[0];

  // Filter threads
  const filteredThreads = threads.filter((t) => {
    const matchesSearch =
      t.peerName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      t.itemTitle.toLowerCase().includes(searchFilter.toLowerCase());

    if (categoryTab === "borrowing") return matchesSearch && t.exchangeRole.includes("Borrowing");
    if (categoryTab === "lending") return matchesSearch && t.exchangeRole.includes("Lending");
    return matchesSearch;
  });

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeThread.messages, isTyping]);

  // Send message handler
  const handleSendMessage = (customText?: string) => {
    const textToSend = (customText || inputText).trim();
    if (!textToSend) return;

    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: currentUser.fullName,
      isMe: true,
      text: textToSend,
      time: "Just now",
    };

    const updatedThreads = threads.map((t) => {
      if (t.id === activeThread.id) {
        return {
          ...t,
          unreadCount: 0,
          messages: [...t.messages, newMsg],
        };
      }
      return t;
    });

    setThreads(updatedThreads);
    setInputText("");

    // Simulate smart peer reply after 1.2s
    setIsTyping(true);
    setTimeout(() => {
      const peerReply = {
        id: `msg-reply-${Date.now()}`,
        sender: activeThread.peerName,
        isMe: false,
        text: `Got it, thanks! Looking forward to coordinating at ${activeThread.meetupLocation}. 👍`,
        time: "Just now",
      };

      setThreads((prev) =>
        prev.map((t) => {
          if (t.id === activeThread.id) {
            return {
              ...t,
              messages: [...t.messages, peerReply],
            };
          }
          return t;
        })
      );
      setIsTyping(false);
    }, 1400);
  };

  const handleCopyOtp = () => {
    setCopiedOtp(true);
    setTimeout(() => setCopiedOtp(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FBF7F0] text-[#18181B] select-none flex flex-col">
      {/* ─── Master Continuous Top Navbar ─────────────────────── */}
      <AppNavbar variant="auth" />

      {/* ─── Main Body (Sidebar + Content) ─────────────────── */}
      <div className="flex-1 flex w-full">
        {/* ─── Persistent Left Sidebar ────────────────────────── */}
        <Sidebar />

        {/* ─── Main Content Area ──────────────────────────────── */}
        <div className="flex-1 lg:ml-[240px] flex flex-col h-[calc(100vh-64px)] overflow-hidden min-w-0">

        {/* ─── Chat Container (2-Column Layout) ─────────────────── */}
        <div className="flex-1 flex overflow-hidden p-4 sm:p-6 gap-4">
          {/* ══════════════════════════════════════════════════════════
             1. LEFT PANE: CONVERSATION THREADS (1/3)
             ══════════════════════════════════════════════════════════ */}
          <div className={`w-full sm:w-80 md:w-96 bg-white rounded-3xl border border-[#EDE8C8] shadow-2xs flex-col overflow-hidden flex-shrink-0 ${mobileView === "list" ? "flex" : "hidden sm:flex"}`}>
            {/* Thread Header & Search */}
            <div className="p-4 border-b border-[#F0EAE0] space-y-3">
              <div className="flex items-center justify-between">
                <h1 className="text-base font-black text-[#18181B] flex items-center gap-2">
                  <span>💬 Exchange Messages</span>
                </h1>
                <span className="text-xs font-bold text-[#166534] bg-[#DCFCE7] px-2 py-0.5 rounded-full">
                  {threads.reduce((acc, curr) => acc + curr.unreadCount, 0)} New
                </span>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  placeholder="Search students or items..."
                  className="w-full pl-9 pr-4 py-2 bg-[#FAF7F0] border border-[#EDE8C8] rounded-xl text-xs text-[#18181B] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#84CC16]"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]">
                  <AppIcon name="search" size={14} />
                </span>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-1.5 pt-1">
                {[
                  { id: "all", label: "All Chats" },
                  { id: "borrowing", label: "Borrowing" },
                  { id: "lending", label: "Lending" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setCategoryTab(tab.id as any)}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer text-center ${
                      categoryTab === tab.id
                        ? "bg-[#84CC16] text-[#18181B] shadow-2xs"
                        : "bg-[#FAF7F0] hover:bg-[#F3EFE3] text-[#52525B]"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Threads List */}
            <div className="flex-1 overflow-y-auto divide-y divide-[#F5EFE6]">
              {filteredThreads.map((thread) => {
                const isActive = thread.id === activeThread.id;
                const lastMsg = thread.messages[thread.messages.length - 1];

                return (
                  <button
                    key={thread.id}
                    onClick={() => {
                      setActiveThreadId(thread.id);
                      setMobileView("chat");
                      setThreads((prev) =>
                        prev.map((t) => (t.id === thread.id ? { ...t, unreadCount: 0 } : t))
                      );
                    }}
                    className={`w-full p-4 text-left transition-all cursor-pointer flex items-start gap-3 relative ${
                      isActive ? "bg-[#F7FEE7] border-l-4 border-[#84CC16]" : "hover:bg-[#FAF7F0]"
                    }`}
                  >
                    {/* Avatar with Online indicator */}
                    <div className="relative flex-shrink-0">
                      <div className={`w-11 h-11 rounded-2xl ${thread.peerAvatarBg} flex items-center justify-center font-extrabold text-xs shadow-2xs`}>
                        {thread.peerInitials}
                      </div>
                      {thread.online && (
                        <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#16A34A] rounded-full ring-2 ring-white" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-bold text-[#18181B] truncate">
                          {thread.peerName}
                        </h3>
                        <span className="text-[10px] text-[#9CA3AF] font-medium">
                          {lastMsg ? lastMsg.time.replace("Yesterday, ", "").replace("Today, ", "") : ""}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[9.5px] font-extrabold bg-[#F3F4F6] text-[#374151] px-1.5 py-0.2 rounded-md truncate max-w-[150px]">
                          {thread.itemTitle}
                        </span>
                      </div>

                      <p className="text-[11.5px] text-[#52525B] truncate mt-1">
                        {lastMsg ? (lastMsg.isMe ? `You: ${lastMsg.text}` : lastMsg.text) : "No messages yet"}
                      </p>
                    </div>

                    {thread.unreadCount > 0 && (
                      <span className="w-5 h-5 bg-[#84CC16] text-[#18181B] text-[10px] font-black rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-2xs">
                        {thread.unreadCount}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════
             2. RIGHT PANE: ACTIVE CHAT CONVERSATION & MEETUP ACTIONS
             ══════════════════════════════════════════════════════════ */}
          <div className={`flex-1 bg-white rounded-3xl border border-[#EDE8C8] shadow-2xs flex-col overflow-hidden ${mobileView === "chat" ? "flex" : "hidden sm:flex"}`}>
            {/* Top Bar of Active Conversation */}
            <div className="p-3.5 sm:p-4 sm:px-6 border-b border-[#F0EAE0] flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 bg-[#FAF7F0]/60">
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                {/* Mobile Back Button */}
                <button
                  type="button"
                  onClick={() => setMobileView("list")}
                  className="sm:hidden p-2 rounded-xl bg-white border border-[#EDE8C8] text-[#18181B] font-bold text-xs shadow-2xs flex items-center gap-1 cursor-pointer"
                >
                  <span>←</span>
                </button>

                <div className="relative flex-shrink-0">
                  <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-2xl ${activeThread.peerAvatarBg} flex items-center justify-center font-extrabold text-xs shadow-2xs`}>
                    {activeThread.peerInitials}
                  </div>
                  {activeThread.online && (
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#16A34A] rounded-full ring-2 ring-white" />
                  )}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <h2 className="text-xs sm:text-sm font-bold text-[#18181B] truncate">
                      {activeThread.peerName}
                    </h2>
                    <span className="text-[9.5px] font-extrabold bg-[#FEF3C7] text-[#92400E] px-1.5 py-0.2 rounded-full flex items-center gap-0.5">
                      <span>★</span>
                      <span>{activeThread.peerTrustScore}</span>
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-[#71717A] truncate">
                    {activeThread.peerDept} • {activeThread.exchangeRole}
                  </p>
                </div>
              </div>

              {/* Handover Actions Strip */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowOtpModal(true)}
                  className="px-3 py-1.5 bg-[#84CC16] hover:bg-[#76B813] text-[#18181B] text-xs font-black rounded-xl transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <span>🔑 Handover OTP: {activeThread.meetupOtp}</span>
                </button>

                <Link
                  href="/loans"
                  className="px-3 py-1.5 bg-white hover:bg-[#F3EFE3] border border-[#EDE8C8] text-xs font-bold rounded-xl transition-all shadow-2xs flex items-center gap-1"
                >
                  <span>Lifecycle Tracker</span>
                  <span>→</span>
                </Link>
              </div>
            </div>

            {/* Linked Exchange Banner */}
            <div className="px-6 py-2.5 bg-[#F7FEE7] border-b border-[#D9F99D] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 truncate">
                <span className="font-bold text-[#166534]">Active Exchange:</span>
                <span className="font-semibold text-[#18181B] truncate">{activeThread.itemTitle}</span>
                <span className="text-[10px] bg-[#DCFCE7] text-[#166534] font-bold px-2 py-0.5 rounded-full">
                  {activeThread.statusBadge}
                </span>
              </div>
              <span className="text-[11px] text-[#4D7C0F] font-bold flex items-center gap-1 flex-shrink-0">
                <AppIcon name="map-pin" size={12} />
                <span>{activeThread.meetupLocation}</span>
              </span>
            </div>

            {/* Messages Scroll Stage */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#FBF7F0]/30">
              {activeThread.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.isMe ? "items-end" : "items-start"}`}
                >
                  <span className="text-[10px] text-[#9CA3AF] font-semibold mb-1 px-1">
                    {msg.sender} • {msg.time}
                  </span>
                  <div
                    className={`max-w-[85%] sm:max-w-md p-3.5 rounded-2xl text-xs sm:text-[13px] leading-relaxed shadow-2xs ${
                      msg.isMe
                        ? "bg-[#18181B] text-white rounded-tr-none"
                        : "bg-white text-[#18181B] border border-[#EDE8C8] rounded-tl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-xs text-[#71717A] italic py-1">
                  <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-[10px]">
                    {activeThread.peerInitials}
                  </div>
                  <span className="animate-pulse">{activeThread.peerName} is typing...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Quick Replies */}
            <div className="px-4 py-2 bg-white border-t border-[#F0EAE0] flex items-center gap-2 overflow-x-auto">
              <span className="text-[10px] font-bold text-[#71717A] flex-shrink-0">
                ⚡ Quick Reply:
              </span>
              {[
                "I've reached the meetup spot 📍",
                `Here is my OTP: ${activeThread.meetupOtp} 🔑`,
                "Condition checked, looks pristine! ✨",
                "Can we extend by 1 extra day? ⏱️",
              ].map((reply) => (
                <button
                  key={reply}
                  type="button"
                  onClick={() => handleSendMessage(reply)}
                  className="px-2.5 py-1 bg-[#FAF7F0] hover:bg-[#F3EFE3] border border-[#EDE8C8] text-[11px] font-semibold rounded-xl whitespace-nowrap cursor-pointer transition-all"
                >
                  {reply}
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-3 sm:p-4 bg-white border-t border-[#F0EAE0] flex items-center gap-2.5">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder={`Message ${activeThread.peerName} about handover, drop-off, or condition...`}
                className="flex-1 px-4 py-3 bg-[#FAF7F0] border border-[#EDE8C8] rounded-2xl text-xs sm:text-sm text-[#18181B] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#84CC16]"
              />

              <button
                type="button"
                onClick={() => handleSendMessage()}
                className="px-5 py-3 bg-[#84CC16] hover:bg-[#76B813] text-[#18181B] font-extrabold text-xs sm:text-sm rounded-2xl transition-all shadow-xs cursor-pointer flex items-center gap-1.5 flex-shrink-0"
              >
                <span>Send</span>
                <AppIcon name="arrow-up-right" size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Handover OTP Modal ────────────────────────────────── */}
      {showOtpModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#EDE8C8] p-6 max-w-sm w-full shadow-2xl space-y-4 text-center animate-fadeInUp">
            <div className="w-14 h-14 rounded-2xl bg-[#F0FDF4] text-[#16A34A] flex items-center justify-center text-2xl mx-auto shadow-xs">
              🔑
            </div>
            <div>
              <h3 className="text-base font-black text-[#18181B]">
                Handover Verification OTP
              </h3>
              <p className="text-xs text-[#71717A] mt-0.5">
                Share this secure PIN with <strong>{activeThread.peerName}</strong> in person to release custody and confirm handover.
              </p>
            </div>

            <div className="p-4 bg-[#FAF7F0] border-2 border-dashed border-[#84CC16] rounded-2xl space-y-1">
              <p className="text-2xl font-black tracking-widest text-[#18181B]">
                {activeThread.meetupOtp}
              </p>
              <p className="text-[10px] text-[#16A34A] font-bold">
                ✓ 100% Escrow Protected
              </p>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowOtpModal(false)}
                className="flex-1 py-2.5 bg-[#FAF7F0] hover:bg-[#F3EFE3] border border-[#EDE8C8] text-xs font-bold rounded-xl cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleCopyOtp}
                className="flex-1 py-2.5 bg-[#84CC16] hover:bg-[#76B813] text-[#18181B] font-black text-xs rounded-xl shadow-xs cursor-pointer"
              >
                {copiedOtp ? "Copied! ✓" : "Copy Code"}
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
