"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Sidebar from "@/app/components/dashboard/Sidebar";
import AppNavbar from "@/app/components/layout/AppNavbar";
import { AppIcon } from "@/app/components/dashboard/Icons";
import { useApp } from "@/app/context/AppContext";

export default function MessagesPage() {
  const { currentUser, allUsers, chatThreads, chatMessages, sendMessage } = useApp();
  const [activeThreadId, setActiveThreadId] = useState<string>("");
  const [searchFilter, setSearchFilter] = useState("");
  const [inputText, setInputText] = useState("");
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [copiedOtp, setCopiedOtp] = useState(false);
  const [mobileView, setMobileView] = useState<"list" | "chat">("list");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Filter threads for current user
  const userThreads = useMemo(() => {
    return chatThreads.filter((t) => t.participantIds.includes(currentUser.id));
  }, [chatThreads, currentUser.id]);

  // Set active thread initially or when switching users
  useEffect(() => {
    if (userThreads.length > 0) {
      if (!activeThreadId || !userThreads.some((t) => t.id === activeThreadId)) {
        setActiveThreadId(userThreads[0].id);
      }
    }
  }, [userThreads, activeThreadId]);

  const activeThread = useMemo(() => {
    return userThreads.find((t) => t.id === activeThreadId) || userThreads[0];
  }, [userThreads, activeThreadId]);

  // Get peer info for active thread
  const peerUser = useMemo(() => {
    if (!activeThread) return allUsers[1];
    const peerId = activeThread.participantIds.find((id) => id !== currentUser.id) || "u2";
    return allUsers.find((u) => u.id === peerId) || allUsers[1];
  }, [activeThread, currentUser.id, allUsers]);

  // Messages for active thread
  const threadMessages = useMemo(() => {
    if (!activeThread) return [];
    return chatMessages.filter((m) => m.threadId === activeThread.id);
  }, [chatMessages, activeThread]);

  // Filtered threads for sidebar
  const filteredThreads = useMemo(() => {
    return userThreads.filter((t) => {
      const peerId = t.participantIds.find((id) => id !== currentUser.id);
      const peer = allUsers.find((u) => u.id === peerId);
      const peerName = peer?.fullName || "";
      return (
        peerName.toLowerCase().includes(searchFilter.toLowerCase()) ||
        t.itemTitle.toLowerCase().includes(searchFilter.toLowerCase())
      );
    });
  }, [userThreads, currentUser.id, allUsers, searchFilter]);

  // Auto scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [threadMessages]);

  // Send message handler
  const handleSendMessage = (customText?: string) => {
    const textToSend = (customText || inputText).trim();
    if (!textToSend || !activeThread) return;

    sendMessage(activeThread.id, textToSend);
    setInputText("");
  };

  const handleCopyOtp = () => {
    setCopiedOtp(true);
    setTimeout(() => setCopiedOtp(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FBF7F0] text-[#18181B] select-none flex flex-col">
      {/* ─── FULL-WIDTH CONTINUOUS TOP NAVBAR ─────────────── */}
      <AppNavbar variant="auth" />

      {/* ─── MAIN BODY (Sidebar + Content) ─────────────────── */}
      <div className="flex-1 flex w-full">
        {/* ─── Persistent Left Sidebar ──────────────────────── */}
        <Sidebar />

        {/* ─── Main Content Area ────────────────────────────── */}
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
                    <AppIcon name="message" size={16} />
                    <span>Campus Messages</span>
                  </h1>
                  <span className="text-xs font-bold text-[#166534] bg-[#DCFCE7] px-2 py-0.5 rounded-full">
                    {filteredThreads.length} Chats
                  </span>
                </div>

                {/* Search Bar */}
                <div className="relative">
                  <input
                    type="text"
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    placeholder="Search students or items..."
                    className="w-full pl-3.5 pr-8 py-2 bg-[#FAF7F0] border border-[#EDE8C8] rounded-xl text-xs text-[#18181B] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#84CC16]"
                  />
                </div>
              </div>

              {/* Thread List */}
              <div className="flex-1 overflow-y-auto divide-y divide-[#F5F2E8]">
                {filteredThreads.length > 0 ? (
                  filteredThreads.map((thread) => {
                    const isSelected = activeThread?.id === thread.id;
                    const peerId = thread.participantIds.find((id) => id !== currentUser.id);
                    const peer = allUsers.find((u) => u.id === peerId) || allUsers[0];

                    return (
                      <button
                        key={thread.id}
                        type="button"
                        onClick={() => {
                          setActiveThreadId(thread.id);
                          setMobileView("chat");
                        }}
                        className={`w-full p-4 flex items-start gap-3 text-left transition-colors cursor-pointer ${
                          isSelected ? "bg-[#F5F2E8]/60" : "hover:bg-[#FAF7F0]"
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-2xl ${peer.avatarBg} flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-2xs`}>
                          {peer.initials}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-bold text-[#18181B] truncate">{peer.fullName}</p>
                            <span className="text-[10px] text-[#71717A]">{thread.lastTimestamp}</span>
                          </div>
                          <p className="text-[11px] font-semibold text-[#166534] truncate mt-0.5">
                            {thread.itemTitle}
                          </p>
                          <p className="text-[11px] text-[#71717A] truncate mt-0.5">
                            {thread.lastMessage}
                          </p>
                        </div>
                      </button>
                    );
                  })
                ) : (
                  <div className="p-8 text-center text-xs text-[#71717A] space-y-2">
                    <p className="font-bold text-[#18181B]">No conversations yet</p>
                    <p>Browse resources or post wanted requests to start chatting with students!</p>
                  </div>
                )}
              </div>
            </div>

            {/* ══════════════════════════════════════════════════════════
               2. RIGHT PANE: ACTIVE CHAT CONVERSATION (2/3)
               ══════════════════════════════════════════════════════════ */}
            {activeThread ? (
              <div className={`flex-1 bg-white rounded-3xl border border-[#EDE8C8] shadow-2xs flex flex-col overflow-hidden min-w-0 ${mobileView === "chat" ? "flex" : "hidden sm:flex"}`}>
                {/* Chat Top Header */}
                <div className="p-4 border-b border-[#F0EAE0] flex items-center justify-between flex-wrap gap-3 bg-[#FAF7F0]/40">
                  <div className="flex items-center gap-3 min-w-0">
                    <button
                      type="button"
                      onClick={() => setMobileView("list")}
                      className="sm:hidden p-1.5 rounded-xl hover:bg-[#FAF7F0] text-[#71717A] font-bold text-xs"
                    >
                      ←
                    </button>
                    <div className={`w-10 h-10 rounded-2xl ${peerUser.avatarBg} flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-2xs`}>
                      {peerUser.initials}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h2 className="text-sm font-bold text-[#18181B] truncate">
                          {peerUser.fullName}
                        </h2>
                        <span className="text-[9.5px] font-extrabold bg-[#FEF3C7] text-[#92400E] px-1.5 py-0.2 rounded-full flex items-center gap-0.5">
                          <AppIcon name="star" size={10} className="text-[#D97706]" />
                          <span>{peerUser.trustScore}★</span>
                        </span>
                      </div>
                      <p className="text-[10px] sm:text-[11px] text-[#71717A] truncate">
                        {peerUser.department} • {peerUser.location}
                      </p>
                    </div>
                  </div>

                  {/* Handover Actions Strip */}
                  <div className="flex items-center gap-2">
                    {activeThread.meetupOtp && (
                      <button
                        type="button"
                        onClick={() => setShowOtpModal(true)}
                        className="px-3 py-1.5 bg-[#84CC16] hover:bg-[#76B813] text-[#18181B] text-xs font-black rounded-xl transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
                      >
                        <AppIcon name="shield-check" size={13} />
                        <span>Handover OTP: {activeThread.meetupOtp}</span>
                      </button>
                    )}

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
                    <span className="font-bold text-[#166534]">Active Resource:</span>
                    <span className="font-semibold text-[#18181B] truncate">{activeThread.itemTitle}</span>
                  </div>
                  {activeThread.meetupLocation && (
                    <span className="text-[#166534] font-semibold hidden md:inline flex items-center gap-1">
                      <AppIcon name="map-pin" size={12} />
                      <span>{activeThread.meetupLocation}</span>
                    </span>
                  )}
                </div>

                {/* Chat Messages Body */}
                <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-[#FAF7F0]/30 min-h-[300px]">
                  {threadMessages.map((msg) => {
                    const isMe = msg.senderId === currentUser.id;
                    return (
                      <div
                        key={msg.id}
                        className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
                      >
                        <div
                          className={`max-w-[85%] sm:max-w-[70%] p-3.5 rounded-2xl text-xs sm:text-[13px] leading-relaxed shadow-2xs ${
                            isMe
                              ? "bg-[#18181B] text-white rounded-br-none"
                              : "bg-white text-[#18181B] border border-[#EDE8C8] rounded-bl-none"
                          }`}
                        >
                          {msg.text}
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] text-[#9CA3AF] mt-1 px-1">
                          <span>{msg.senderName}</span>
                          <span>•</span>
                          <span>{msg.timestamp}</span>
                        </div>
                      </div>
                    );
                  })}

                  <div ref={messagesEndRef} />
                </div>

                {/* Suggested Quick Replies */}
                <div className="px-4 py-2 bg-white border-t border-[#F0EAE0] flex items-center gap-2 overflow-x-auto">
                  <span className="text-[10px] font-bold text-[#71717A] flex-shrink-0 flex items-center gap-1">
                    <AppIcon name="zap" size={12} className="text-[#2563EB]" />
                    <span>Quick Reply:</span>
                  </span>
                  {[
                    "I've reached the meetup spot",
                    `Here is my OTP: ${activeThread.meetupOtp || "CC-8821"}`,
                    "Condition checked, looks pristine!",
                    "Can we extend by 1 extra day?",
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
                    placeholder={`Message ${peerUser.name} (logged in as ${currentUser.name})...`}
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
            ) : (
              <div className="flex-1 bg-white rounded-3xl border border-[#EDE8C8] p-12 flex flex-col items-center justify-center text-center space-y-3">
                <AppIcon name="message" size={32} className="text-[#9CA3AF]" />
                <h3 className="text-base font-bold text-[#18181B]">No Conversation Selected</h3>
                <p className="text-xs text-[#71717A] max-w-sm">
                  Select a student conversation from the left to start live messaging or coordinate resource handovers.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─── Handover OTP Modal ────────────────────────────────── */}
      {showOtpModal && activeThread && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#EDE8C8] p-6 max-w-sm w-full shadow-2xl space-y-4 text-center animate-fadeInUp">
            <div className="w-14 h-14 rounded-2xl bg-[#F0FDF4] text-[#16A34A] flex items-center justify-center text-2xl mx-auto shadow-xs">
              <AppIcon name="shield-check" size={28} className="text-[#16A34A]" />
            </div>
            <div>
              <h3 className="text-base font-black text-[#18181B]">
                Handover Verification OTP
              </h3>
              <p className="text-xs text-[#71717A] mt-0.5">
                Share this secure PIN with <strong>{peerUser.fullName}</strong> in person to release custody and confirm handover.
              </p>
            </div>

            <div className="p-4 bg-[#FAF7F0] border-2 border-dashed border-[#84CC16] rounded-2xl space-y-1">
              <p className="text-2xl font-black tracking-widest text-[#18181B]">
                {activeThread.meetupOtp || "CC-8821"}
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
  );
}
