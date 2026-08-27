"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AppIcon } from "@/app/components/dashboard/Icons";

export interface NotificationItem {
  id: string;
  type: "loan" | "listing" | "meetup" | "impact" | "trust";
  title: string;
  description: string;
  time: string;
  read: boolean;
  link: string;
  iconName: string;
  iconBg: string;
  iconColor: string;
}

const initialNotifications: NotificationItem[] = [
  {
    id: "notif-1",
    type: "loan",
    title: "Borrow Request Approved",
    description: "Aarav Mehta accepted your request for Canon EOS 80D Camera. Handover scheduled at Engineering Block Quad.",
    time: "5m ago",
    read: false,
    link: "/messages",
    iconName: "camera",
    iconBg: "bg-[#DCFCE7]",
    iconColor: "text-[#15803D]",
  },
  {
    id: "notif-2",
    type: "listing",
    title: "New Borrow Request Received",
    description: "Kabir Singh requested your Sony WH-1000XM4 Headphones for 3 days (₹360 + ₹1,000 escrow).",
    time: "25m ago",
    read: false,
    link: "/listings",
    iconName: "handshake",
    iconBg: "bg-[#DBEAFE]",
    iconColor: "text-[#1D4ED8]",
  },
  {
    id: "notif-3",
    type: "meetup",
    title: "Handover OTP Ready: CC-8821",
    description: "Your meetup with Aarav Mehta is active. Share this 6-digit code during in-person verification.",
    time: "1h ago",
    read: false,
    link: "/loans",
    iconName: "key",
    iconBg: "bg-[#FEF3C7]",
    iconColor: "text-[#B45309]",
  },
  {
    id: "notif-4",
    type: "impact",
    title: "Campus Sustainability Milestone",
    description: "You saved 18.5 kg CO₂e and ₹3,400 this week through circular campus sharing!",
    time: "3h ago",
    read: true,
    link: "/impact",
    iconName: "leaf",
    iconBg: "bg-[#F0FDF4]",
    iconColor: "text-[#166534]",
  },
  {
    id: "notif-5",
    type: "trust",
    title: "Trust Score Upgraded: 4.9",
    description: "Successful return inspection verified for Bosch Drill Set. +15 Campus Trust points added.",
    time: "Yesterday",
    read: true,
    link: "/profile",
    iconName: "shield-check",
    iconBg: "bg-[#FAF5FF]",
    iconColor: "text-[#7E22CE]",
  },
];

/* ─── Vector Icon Mapper ─────────────────────────────────────── */
function NotificationIcon({ name }: { name: string }) {
  switch (name) {
    case "camera":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
          <circle cx="12" cy="13" r="3" />
        </svg>
      );
    case "handshake":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m11 17 2 2a1 1 0 0 0 1.4 0l4.3-4.3a1 1 0 0 0 0-1.4l-2.6-2.6a1 1 0 0 0-1.4 0l-3.7 3.7" />
          <path d="m18 10 3.3-3.3a1 1 0 0 0 0-1.4l-2.6-2.6a1 1 0 0 0-1.4 0L14 6" />
          <path d="m2 14 3.3-3.3a1 1 0 0 1 1.4 0l2.6 2.6a1 1 0 0 1 0 1.4L6 18" />
          <path d="m7 9 3.7-3.7a1 1 0 0 1 1.4 0l2.6 2.6a1 1 0 0 1 0 1.4L11 13" />
        </svg>
      );
    case "key":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="7.5" cy="15.5" r="5.5" />
          <path d="m21 2-9.6 9.6" />
          <path d="m15.5 7.5 3 3" />
        </svg>
      );
    case "leaf":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
          <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
        </svg>
      );
    case "shield-check":
    case "trust":
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    default:
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" x2="12" y1="8" y2="12" />
          <line x1="12" x2="12.01" y1="16" y2="16" />
        </svg>
      );
  }
}

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleNotificationClick = (notif: NotificationItem) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notif.id ? { ...n, read: true } : n))
    );
    setIsOpen(false);
    router.push(notif.link);
  };

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "unread") return !n.read;
    return true;
  });

  return (
    <div className="relative" ref={dropdownRef}>
      {/* ─── Notification Trigger Bell ─────────────────────────── */}
      <button
        id="nav-notification-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Notifications"
        className={`w-10 h-10 rounded-full border flex items-center justify-center relative shadow-xs transition-all cursor-pointer flex-shrink-0 ${
          isOpen
            ? "bg-[#F5F8E9] border-[#6F9535] ring-2 ring-[#84CC16]"
            : "bg-white border-[#E5E7EB] hover:bg-[#F9FAFB]"
        }`}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#18181B"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>

        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-[#EA4335] text-white text-[10px] font-black rounded-full ring-2 ring-white flex items-center justify-center shadow-xs animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {/* ─── Dropdown Popover ───────────────────────────────────── */}
      {isOpen && (
        <div className="absolute right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 mt-2.5 w-[330px] sm:w-[380px] bg-white rounded-3xl border border-[#EDE8C8] shadow-2xl z-50 overflow-hidden animate-fadeInUp">
          {/* Header */}
          <div className="p-4 bg-[#FAF7F0] border-b border-[#EDE8C8] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#18181B] text-white flex items-center justify-center">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
              </span>
              <h3 className="text-sm font-black text-[#18181B]">
                Activity & Alerts
              </h3>
              {unreadCount > 0 && (
                <span className="text-[10px] font-extrabold bg-[#EA4335] text-white px-2 py-0.2 rounded-full">
                  {unreadCount} New
                </span>
              )}
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAllRead}
                className="text-[11px] font-bold text-[#16A34A] hover:underline cursor-pointer"
              >
                Mark all as read
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div className="px-4 py-2 bg-white border-b border-[#F0EAE0] flex items-center gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                filter === "all"
                  ? "bg-[#18181B] text-white"
                  : "bg-[#FAF7F0] text-[#52525B] hover:bg-[#F3EFE3]"
              }`}
            >
              All Alerts ({notifications.length})
            </button>
            <button
              onClick={() => setFilter("unread")}
              className={`px-3 py-1 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                filter === "unread"
                  ? "bg-[#18181B] text-white"
                  : "bg-[#FAF7F0] text-[#52525B] hover:bg-[#F3EFE3]"
              }`}
            >
              Unread ({unreadCount})
            </button>
          </div>

          {/* Notifications List */}
          <div className="max-h-[360px] overflow-y-auto divide-y divide-[#F5EFE6]">
            {filteredNotifications.length === 0 ? (
              <div className="p-8 text-center space-y-2">
                <div className="w-10 h-10 rounded-2xl bg-[#DCFCE7] text-[#15803D] flex items-center justify-center mx-auto shadow-2xs">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <p className="text-xs font-bold text-[#18181B]">You're all caught up!</p>
                <p className="text-[11px] text-[#71717A]">
                  No new exchange or handover alerts right now.
                </p>
              </div>
            ) : (
              filteredNotifications.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleNotificationClick(item)}
                  className={`p-3.5 flex items-start gap-3 transition-colors cursor-pointer hover:bg-[#FAF7F0] relative ${
                    !item.read ? "bg-[#F7FEE7]/40" : "bg-white"
                  }`}
                >
                  {/* Icon */}
                  <div
                    className={`w-9 h-9 rounded-2xl ${item.iconBg} ${item.iconColor} flex items-center justify-center flex-shrink-0 shadow-2xs`}
                  >
                    <NotificationIcon name={item.iconName} />
                  </div>

                  {/* Body */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="text-xs font-bold text-[#18181B] leading-snug">
                        {item.title}
                      </h4>
                      <span className="text-[10px] text-[#9CA3AF] whitespace-nowrap flex-shrink-0">
                        {item.time}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#52525B] leading-relaxed mt-0.5 line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  {/* Unread indicator dot */}
                  {!item.read && (
                    <span className="w-2 h-2 rounded-full bg-[#16A34A] flex-shrink-0 self-center" />
                  )}
                </div>
              ))
            )}
          </div>

          {/* Footer Jump Links */}
          <div className="p-3 bg-[#FAF7F0] border-t border-[#EDE8C8] grid grid-cols-2 gap-2 text-center text-xs font-bold">
            <Link
              href="/loans"
              onClick={() => setIsOpen(false)}
              className="py-2 px-2 bg-white hover:bg-[#F3EFE3] border border-[#EDE8C8] rounded-xl text-[#18181B] shadow-2xs transition-all flex items-center justify-center gap-1.5"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m17 2 4 4-4 4" />
                <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
                <path d="m7 22-4-4 4-4" />
                <path d="M21 13v1a4 4 0 0 1-4 4H3" />
              </svg>
              <span>Active Loans</span>
            </Link>
            <Link
              href="/messages"
              onClick={() => setIsOpen(false)}
              className="py-2 px-2 bg-[#84CC16] hover:bg-[#76B813] text-[#18181B] rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 font-black"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <span>Meetup Chat</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
