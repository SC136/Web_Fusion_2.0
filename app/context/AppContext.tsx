"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════════════
   1. TYPES & DATA INTERFACES
   ═══════════════════════════════════════════════════════════════════ */

export interface User {
  id: string;
  name: string;
  fullName: string;
  initials: string;
  avatar: string;
  avatarBg: string;
  department: string;
  year: string;
  location: string;
  trustScore: number;
  reviewsCount: number;
  successfulExchanges: number;
  lateReturns: number;
  disputes: number;
  co2Saved: number;
  verifiedId: boolean;
  verifiedEmail: boolean;
  role: "student" | "admin";
}

export interface Listing {
  id: string;
  title: string;
  category: string;
  description: string;
  ownerId: string;
  ownerName: string;
  ownerDept: string;
  ownerAvatar: string;
  ownerAvatarBg: string;
  dailyRate: number;
  securityDeposit: number;
  image: string;
  location: string;
  distance: number;
  condition: "Like New" | "Very Good" | "Good" | "Fair";
  status: "Available Now" | "Borrowed" | "Reserved";
  statusType: "now" | "soon" | "reserved";
  rating: number;
  reviewsCount: number;
  includedAccessories?: string[];
  createdAt: string;
}

export interface LoanExchange {
  id: string;
  listingId: string;
  listingTitle: string;
  listingImage: string;
  category: string;
  borrowerId: string;
  borrowerName: string;
  borrowerDept: string;
  borrowerAvatarBg: string;
  ownerId: string;
  ownerName: string;
  ownerDept: string;
  ownerAvatarBg: string;
  dailyRate: number;
  durationDays: number;
  totalRentalFee: number;
  securityDeposit: number;
  platformFee: number;
  totalPaid: number;
  startDate: string;
  returnDueDate: string;
  handoverLocation: string;
  handoverOtp: string;
  status: "pending" | "accepted" | "handover" | "active" | "return_due" | "returned" | "inspection" | "settled" | "completed";
  stageIndex: number; // 0 to 8
  beforeCondition: {
    rating: string;
    notes: string;
    photo: string;
    date: string;
    checklist: { item: string; checked: boolean }[];
  };
  afterCondition: {
    rating: string;
    notes: string;
    photo: string;
    date: string;
    checklist: { item: string; checked: boolean }[];
  };
  settlement: {
    transactionId: string;
    refundAmount: number;
    lenderPayout: number;
    date: string;
  };
  ratingData: {
    borrowerRating: number;
    borrowerReview: string;
    lenderRating: number;
    lenderReview: string;
  };
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  threadId: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  text: string;
  timestamp: string;
  createdAt: number;
}

export interface ChatThread {
  id: string;
  participantIds: string[];
  itemTitle: string;
  itemImage: string;
  exchangeId?: string;
  exchangeRole?: string;
  statusBadge?: string;
  meetupOtp?: string;
  meetupLocation?: string;
  lastMessage: string;
  lastTimestamp: string;
  unreadCount: Record<string, number>; // userId -> unread count
}

export interface WantedRequest {
  id: string;
  title: string;
  description: string;
  category: string;
  requesterId: string;
  requesterName: string;
  requesterDept: string;
  requesterAvatarBg: string;
  neededBy: string;
  budget: string;
  depositOffered: string;
  location: string;
  postedAgo: string;
  urgency: "High" | "Medium" | "Low";
  respondedUserIds: string[];
  createdAt: string;
}

/* ═══════════════════════════════════════════════════════════════════
   2. INITIAL SEED DATA
   ═══════════════════════════════════════════════════════════════════ */

export const INITIAL_USERS: User[] = [
  {
    id: "u1",
    name: "Anaya",
    fullName: "Anaya Sharma",
    initials: "AS",
    avatar: "/mascots/blue_dress_hat.png",
    avatarBg: "bg-emerald-100 text-emerald-800",
    department: "Computer Engineering",
    year: "3rd Year",
    location: "North Campus Dorm B",
    trustScore: 4.85,
    reviewsCount: 28,
    successfulExchanges: 32,
    lateReturns: 0,
    disputes: 0,
    co2Saved: 12.4,
    verifiedId: true,
    verifiedEmail: true,
    role: "student",
  },
  {
    id: "u2",
    name: "Aarav",
    fullName: "Aarav Mehta",
    initials: "AM",
    avatar: "/mascots/admin_laptop.png",
    avatarBg: "bg-amber-100 text-amber-800",
    department: "Computer Science & Engg",
    year: "3rd Year",
    location: "Engineering Block Dorm 4",
    trustScore: 4.92,
    reviewsCount: 35,
    successfulExchanges: 41,
    lateReturns: 0,
    disputes: 0,
    co2Saved: 18.2,
    verifiedId: true,
    verifiedEmail: true,
    role: "student",
  },
  {
    id: "u3",
    name: "Kabir",
    fullName: "Kabir Singh",
    initials: "KS",
    avatar: "/mascots/mascot_character.png",
    avatarBg: "bg-blue-100 text-blue-800",
    department: "Electronics & Comm (ECE)",
    year: "4th Year",
    location: "South Campus Hostel 2",
    trustScore: 4.8,
    reviewsCount: 22,
    successfulExchanges: 25,
    lateReturns: 0,
    disputes: 0,
    co2Saved: 10.5,
    verifiedId: true,
    verifiedEmail: true,
    role: "student",
  },
  {
    id: "u4",
    name: "Maya",
    fullName: "Maya Ortiz",
    initials: "MO",
    avatar: "/mascots/blue_dress_hat.png",
    avatarBg: "bg-purple-100 text-purple-800",
    department: "Environmental Design",
    year: "3rd Year",
    location: "Central Arts Quad",
    trustScore: 4.95,
    reviewsCount: 47,
    successfulExchanges: 52,
    lateReturns: 1,
    disputes: 0,
    co2Saved: 24.8,
    verifiedId: true,
    verifiedEmail: true,
    role: "student",
  },
];

export const INITIAL_LISTINGS: Listing[] = [
  {
    id: "lst-1",
    title: "Canon EOS 80D DSLR Camera + 18-55mm IS STM Lens",
    category: "Electronics",
    description: "Professional DSLR camera in mint condition. Comes with 2 high-capacity batteries, 64GB high speed SD card, neck strap, and padded shoulder bag.",
    ownerId: "u2",
    ownerName: "Aarav Mehta",
    ownerDept: "3rd Year, CSE",
    ownerAvatar: "/mascots/admin_laptop.png",
    ownerAvatarBg: "bg-amber-100 text-amber-800",
    dailyRate: 150,
    securityDeposit: 1500,
    image: "/products/camera.jpg",
    location: "Engineering Quad (Block 2)",
    distance: 0.3,
    condition: "Very Good",
    status: "Available Now",
    statusType: "now",
    rating: 4.9,
    reviewsCount: 19,
    includedAccessories: ["18-55mm Lens", "2 Batteries + Charger", "64GB SD Card", "Camera Bag"],
    createdAt: "2026-08-25T10:00:00Z",
  },
  {
    id: "lst-2",
    title: "Sony WH-1000XM4 Noise Cancelling Headphones",
    category: "Music",
    description: "Industry-leading noise cancelling over-ear headphones with 30-hour battery life. Perfect for exam focus and quiet study sessions in the library.",
    ownerId: "u1",
    ownerName: "Anaya Sharma",
    ownerDept: "3rd Year, Computer Engg",
    ownerAvatar: "/mascots/blue_dress_hat.png",
    ownerAvatarBg: "bg-emerald-100 text-emerald-800",
    dailyRate: 120,
    securityDeposit: 1000,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80",
    location: "Central Library Lounge",
    distance: 0.2,
    condition: "Like New",
    status: "Available Now",
    statusType: "now",
    rating: 5.0,
    reviewsCount: 14,
    includedAccessories: ["Hard Travel Case", "3.5mm Aux Cable", "USB-C Fast Cable"],
    createdAt: "2026-08-26T09:00:00Z",
  },
  {
    id: "lst-3",
    title: "Casio FX-991CW Scientific Lab Calculator",
    category: "Electronics",
    description: "Latest approved scientific calculator for engineering mathematics, thermodynamics, and circuit analysis. Clean display and responsive tactile keys.",
    ownerId: "u1",
    ownerName: "Anaya Sharma",
    ownerDept: "3rd Year, Computer Engg",
    ownerAvatar: "/mascots/blue_dress_hat.png",
    ownerAvatarBg: "bg-emerald-100 text-emerald-800",
    dailyRate: 30,
    securityDeposit: 400,
    image: "https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?w=600&auto=format&fit=crop&q=80",
    location: "North Campus Dorm B",
    distance: 0.1,
    condition: "Like New",
    status: "Available Now",
    statusType: "now",
    rating: 5.0,
    reviewsCount: 22,
    includedAccessories: ["Hard Slide Cover", "Quick Reference Sheet"],
    createdAt: "2026-08-24T14:30:00Z",
  },
  {
    id: "lst-4",
    title: "Heavy Duty Aluminum Video Tripod (1.6m)",
    category: "Electronics",
    description: "Smooth fluid-head tripod designed for steady panning and macro video capture. Includes quick-release mounting plate.",
    ownerId: "u3",
    ownerName: "Kabir Singh",
    ownerDept: "4th Year, ECE",
    ownerAvatar: "/mascots/mascot_character.png",
    ownerAvatarBg: "bg-blue-100 text-blue-800",
    dailyRate: 50,
    securityDeposit: 400,
    image: "/products/tripod.jpg",
    location: "Electronics Lab Annex",
    distance: 0.4,
    condition: "Like New",
    status: "Available Now",
    statusType: "now",
    rating: 4.8,
    reviewsCount: 11,
    includedAccessories: ["Padded Carrying Case", "Phone Mount Clamp"],
    createdAt: "2026-08-23T11:20:00Z",
  },
  {
    id: "lst-5",
    title: "Quechua 2-Person Waterproof Dome Tent",
    category: "Sports",
    description: "Easy 5-minute pitch dome tent with double wall ventilation and waterproof groundsheet. Perfect for campus hill treks and weekend expeditions.",
    ownerId: "u4",
    ownerName: "Maya Ortiz",
    ownerDept: "3rd Year, Env Design",
    ownerAvatar: "/mascots/blue_dress_hat.png",
    ownerAvatarBg: "bg-purple-100 text-purple-800",
    dailyRate: 140,
    securityDeposit: 900,
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&auto=format&fit=crop&q=80",
    location: "Central Sports Pavilion",
    distance: 0.5,
    condition: "Very Good",
    status: "Available Now",
    statusType: "now",
    rating: 4.9,
    reviewsCount: 16,
    includedAccessories: ["Tent Poles", "Ground Pegs", "Rainfly", "Storage Sack"],
    createdAt: "2026-08-22T16:00:00Z",
  },
  {
    id: "lst-6",
    title: "Thomas Calculus (14th Metric Edition)",
    category: "Books",
    description: "Official textbook for Multivariable Calculus & Differential Equations. Free of marks and clean binding.",
    ownerId: "u2",
    ownerName: "Aarav Mehta",
    ownerDept: "3rd Year, CSE",
    ownerAvatar: "/mascots/admin_laptop.png",
    ownerAvatarBg: "bg-amber-100 text-amber-800",
    dailyRate: 20,
    securityDeposit: 300,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80",
    location: "Engineering Library Desk",
    distance: 0.3,
    condition: "Good",
    status: "Available Now",
    statusType: "now",
    rating: 4.8,
    reviewsCount: 8,
    createdAt: "2026-08-20T12:00:00Z",
  },
];

export const INITIAL_EXCHANGES: LoanExchange[] = [
  {
    id: "ex-8891",
    listingId: "lst-1",
    listingTitle: "Canon EOS 80D DSLR Camera",
    listingImage: "/products/camera.jpg",
    category: "Electronics",
    borrowerId: "u1",
    borrowerName: "Anaya Sharma",
    borrowerDept: "3rd Year, Computer Engg",
    borrowerAvatarBg: "bg-emerald-100 text-emerald-800",
    ownerId: "u2",
    ownerName: "Aarav Mehta",
    ownerDept: "3rd Year, CSE",
    ownerAvatarBg: "bg-amber-100 text-amber-800",
    dailyRate: 150,
    durationDays: 3,
    totalRentalFee: 450,
    securityDeposit: 1500,
    platformFee: 45,
    totalPaid: 1995,
    startDate: "Aug 27, 2026",
    returnDueDate: "Aug 30, 2026 • 6:00 PM",
    handoverLocation: "Engineering Block Quad (Near Coffee Booth)",
    handoverOtp: "CC-8821",
    status: "active",
    stageIndex: 3, // Active Custody
    beforeCondition: {
      rating: "Very Good (4.9/5)",
      notes: "Lens front element clean, zero scratch on sensor glass. Battery 100% charged.",
      photo: "/products/camera.jpg",
      date: "Aug 27, 2026 • 10:18 AM",
      checklist: [
        { item: "Lens glass inspected (no scratches / dust)", checked: true },
        { item: "Sensor checked & clean shutter operation", checked: true },
        { item: "Battery 100% charged with wall adapter", checked: true },
        { item: "32GB High-speed SD Card initialized", checked: true },
      ],
    },
    afterCondition: {
      rating: "Pristine Condition (5.0/5)",
      notes: "All components packed in original bag, zero signs of wear or drop impact.",
      photo: "/products/camera.jpg",
      date: "Aug 30, 2026 • 5:45 PM",
      checklist: [
        { item: "Lens cap and barrel in original clean state", checked: true },
        { item: "SD card returned and erased", checked: true },
        { item: "Power on test verified on spot", checked: true },
        { item: "Zero water exposure / body scratches", checked: true },
      ],
    },
    settlement: {
      transactionId: "TXN-ESCROW-992140",
      refundAmount: 1500,
      lenderPayout: 450,
      date: "Aug 30, 2026 • 6:02 PM",
    },
    ratingData: {
      borrowerRating: 5,
      borrowerReview: "Aarav was super helpful with the camera setup! The 80D was in pristine shape and made our event look cinematic.",
      lenderRating: 5,
      lenderReview: "Anaya handled the gear with immense care, returned 15 minutes before the deadline, and fully charged the battery.",
    },
    createdAt: "2026-08-26T18:30:00Z",
  },
];

export const INITIAL_CHAT_THREADS: ChatThread[] = [
  {
    id: "thread-u1-u2",
    participantIds: ["u1", "u2"],
    itemTitle: "Canon EOS 80D DSLR Camera",
    itemImage: "/products/camera.jpg",
    exchangeId: "ex-8891",
    exchangeRole: "Active Borrow Exchange",
    statusBadge: "Active Borrow • Due Aug 30",
    meetupOtp: "CC-8821",
    meetupLocation: "Engineering Block Quad (Near Coffee Booth)",
    lastMessage: "Handover signed off on Campus Circular! Enjoy your club reel shoot!",
    lastTimestamp: "10:20 AM",
    unreadCount: { u1: 0, u2: 0 },
  },
  {
    id: "thread-u1-u3",
    participantIds: ["u1", "u3"],
    itemTitle: "Heavy Duty Aluminum Video Tripod",
    itemImage: "/products/tripod.jpg",
    statusBadge: "Pickup Arranged",
    meetupOtp: "CC-4419",
    meetupLocation: "Library Main Entrance",
    lastMessage: "I'll bring the tripod along with the smartphone clamp mount.",
    lastTimestamp: "Yesterday",
    unreadCount: { u1: 0, u3: 1 },
  },
];

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: "msg-1",
    threadId: "thread-u1-u2",
    senderId: "u2",
    senderName: "Aarav Mehta",
    receiverId: "u1",
    text: "Hey Anaya! I've accepted your borrow request for the Canon 80D kit. Are you free to meet around 10:15 AM tomorrow?",
    timestamp: "Yesterday, 6:30 PM",
    createdAt: Date.now() - 86400000,
  },
  {
    id: "msg-2",
    threadId: "thread-u1-u2",
    senderId: "u1",
    senderName: "Anaya Sharma",
    receiverId: "u2",
    text: "Hi Aarav! Yes, 10:15 AM works great. Let's meet in front of Engineering Block Room 204.",
    timestamp: "Yesterday, 6:42 PM",
    createdAt: Date.now() - 85000000,
  },
  {
    id: "msg-3",
    threadId: "thread-u1-u2",
    senderId: "u2",
    senderName: "Aarav Mehta",
    receiverId: "u1",
    text: "Perfect! I've brought the 18-55mm lens, 2 fully charged batteries, strap, and 32GB high-speed SD card.",
    timestamp: "Today, 10:10 AM",
    createdAt: Date.now() - 3600000,
  },
  {
    id: "msg-4",
    threadId: "thread-u1-u2",
    senderId: "u1",
    senderName: "Anaya Sharma",
    receiverId: "u2",
    text: "Just spotted you! My handover verification OTP is CC-8821.",
    timestamp: "Today, 10:16 AM",
    createdAt: Date.now() - 3000000,
  },
  {
    id: "msg-5",
    threadId: "thread-u1-u2",
    senderId: "u2",
    senderName: "Aarav Mehta",
    receiverId: "u1",
    text: "Handover signed off on Campus Circular! Enjoy your club reel shoot!",
    timestamp: "Today, 10:20 AM",
    createdAt: Date.now() - 2400000,
  },
];

export const INITIAL_WANTED_REQUESTS: WantedRequest[] = [
  {
    id: "req-1",
    title: "DJI Osmo Mobile 6 Gimbal for Campus Fest Promo",
    description: "Looking for a 3-axis smartphone gimbal stabilizer for filming student council election campaigns and promotional reels.",
    category: "Electronics",
    requesterId: "u1",
    requesterName: "Anaya Sharma",
    requesterDept: "3rd Year, Computer Engg",
    requesterAvatarBg: "bg-emerald-100 text-emerald-800",
    neededBy: "Tomorrow, 2:00 PM",
    budget: "₹90 / day",
    depositOffered: "₹800 Escrow Ready",
    location: "North Campus Quad",
    postedAgo: "25 mins ago",
    urgency: "High",
    respondedUserIds: [],
    createdAt: "2026-08-27T10:00:00Z",
  },
  {
    id: "req-2",
    title: "Scientific Graphing Calculator (TI-84 or Casio 991CW)",
    description: "Need a high-precision graphing calculator for Thursday's Signal Processing midterm exam in Hall 3.",
    category: "Electronics",
    requesterId: "u3",
    requesterName: "Kabir Singh",
    requesterDept: "4th Year, ECE",
    requesterAvatarBg: "bg-blue-100 text-blue-800",
    neededBy: "Thursday, 9:00 AM",
    budget: "₹40 / day",
    depositOffered: "₹400 Escrow Ready",
    location: "Library Annex",
    postedAgo: "1 hour ago",
    urgency: "Medium",
    respondedUserIds: [],
    createdAt: "2026-08-27T09:15:00Z",
  },
  {
    id: "req-3",
    title: "2-Person Dome Trekking Tent + Ground Mat",
    description: "Planning weekend trekking to Sunrise Peak. Seeking clean waterproof shelter for 2 days.",
    category: "Sports",
    requesterId: "u2",
    requesterName: "Aarav Mehta",
    requesterDept: "3rd Year, CSE",
    requesterAvatarBg: "bg-amber-100 text-amber-800",
    neededBy: "Friday, 5:00 PM",
    budget: "₹150 / day",
    depositOffered: "₹1,000 Escrow Ready",
    location: "Engineering Quad",
    postedAgo: "3 hours ago",
    urgency: "Medium",
    respondedUserIds: [],
    createdAt: "2026-08-27T07:30:00Z",
  },
];

/* ═══════════════════════════════════════════════════════════════════
   3. APP CONTEXT STATE & INTERFACE
   ═══════════════════════════════════════════════════════════════════ */

interface AppContextType {
  // Current user & authentication
  currentUser: User;
  allUsers: User[];
  switchUser: (userId: string) => void;

  // Listings
  listings: Listing[];
  addListing: (newListing: Omit<Listing, "id" | "ownerId" | "ownerName" | "ownerDept" | "ownerAvatar" | "ownerAvatarBg" | "rating" | "reviewsCount" | "createdAt">) => Listing;
  removeListing: (id: string) => void;
  deleteListing: (id: string) => void;
  updateListingImage: (id: string, imageDataUrl: string) => void;

  // Borrow Requests & Loan Lifecycle
  exchanges: LoanExchange[];
  createBorrowRequest: (listingId: string, durationDays: number, notes?: string) => LoanExchange;
  acceptBorrowRequest: (exchangeId: string) => void;
  advanceLoanStage: (exchangeId: string, stageIndex?: number, inspectionData?: Partial<LoanExchange>) => void;

  // Messaging & Real-Time Chat
  chatThreads: ChatThread[];
  chatMessages: ChatMessage[];
  sendMessage: (threadId: string, text: string) => void;
  getOrCreateThread: (peerId: string, itemTitle: string, itemImage: string) => ChatThread;

  // Wanted Requests
  wantedRequests: WantedRequest[];
  addWantedRequest: (req: Omit<WantedRequest, "id" | "requesterId" | "requesterName" | "requesterDept" | "requesterAvatarBg" | "postedAgo" | "respondedUserIds" | "createdAt">) => void;
  respondToWantedRequest: (requestId: string) => void;

  // Reset demo state
  resetToDefaults: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

/* ═══════════════════════════════════════════════════════════════════
   4. LOCALSTORAGE HELPERS
   ═══════════════════════════════════════════════════════════════════ */

const STORAGE_KEYS = {
  CURRENT_USER_ID: "cc_current_user_id_v2", // sessionStorage — per-tab
  USERS: "cc_users_v2",
  LISTINGS: "cc_listings_v2",
  EXCHANGES: "cc_exchanges_v2",
  THREADS: "cc_threads_v2",
  MESSAGES: "cc_messages_v2",
  WANTED: "cc_wanted_v2",
};

// Shared data helpers — uses localStorage (cross-tab sync via storage events)
function getStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error(`Error reading ${key} from localStorage:`, e);
    return fallback;
  }
}

function setStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error saving ${key} to localStorage:`, e);
  }
}

// Session helpers — uses sessionStorage (tab-isolated, independent per tab)
function getSessionStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const item = window.sessionStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error(`Error reading ${key} from sessionStorage:`, e);
    return fallback;
  }
}

function setSessionStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error saving ${key} to sessionStorage:`, e);
  }
}

/* ═══════════════════════════════════════════════════════════════════
   5. PROVIDER COMPONENT
   ═══════════════════════════════════════════════════════════════════ */

export function AppProvider({ children }: { children: React.ReactNode }) {
  // State initialization
  const [currentUserId, setCurrentUserId] = useState<string>("u1");
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [listings, setListings] = useState<Listing[]>(INITIAL_LISTINGS);
  const [exchanges, setExchanges] = useState<LoanExchange[]>(INITIAL_EXCHANGES);
  const [chatThreads, setChatThreads] = useState<ChatThread[]>(INITIAL_CHAT_THREADS);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [wantedRequests, setWantedRequests] = useState<WantedRequest[]>(INITIAL_WANTED_REQUESTS);
  const [isHydrated, setIsHydrated] = useState(false);

  // Sync from storage on initial client mount
  useEffect(() => {
    // currentUserId comes from sessionStorage (tab-isolated)
    const storedUserId = getSessionStorage<string>(STORAGE_KEYS.CURRENT_USER_ID, "u1");
    const storedUsers = getStorage<User[]>(STORAGE_KEYS.USERS, INITIAL_USERS);
    const storedListings = getStorage<Listing[]>(STORAGE_KEYS.LISTINGS, INITIAL_LISTINGS);
    const storedExchanges = getStorage<LoanExchange[]>(STORAGE_KEYS.EXCHANGES, INITIAL_EXCHANGES);
    const storedThreads = getStorage<ChatThread[]>(STORAGE_KEYS.THREADS, INITIAL_CHAT_THREADS);
    const storedMessages = getStorage<ChatMessage[]>(STORAGE_KEYS.MESSAGES, INITIAL_CHAT_MESSAGES);
    const storedWanted = getStorage<WantedRequest[]>(STORAGE_KEYS.WANTED, INITIAL_WANTED_REQUESTS);

    setCurrentUserId(storedUserId);
    setUsers(storedUsers);
    setListings(storedListings);
    setExchanges(storedExchanges);
    setChatThreads(storedThreads);
    setChatMessages(storedMessages);
    setWantedRequests(storedWanted);
    setIsHydrated(true);
  }, []);

  // Listen for localStorage events (Cross-tab sync for shared data only)
  // Note: currentUserId is in sessionStorage — it does NOT fire storage events,
  // so each tab keeps its own identity independently.
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (!e.key) return;

      // Deliberately skip CURRENT_USER_ID — each tab manages its own session
      if (e.key === STORAGE_KEYS.USERS && e.newValue) {
        try { setUsers(JSON.parse(e.newValue)); } catch {}
      }
      if (e.key === STORAGE_KEYS.LISTINGS && e.newValue) {
        try { setListings(JSON.parse(e.newValue)); } catch {}
      }
      if (e.key === STORAGE_KEYS.EXCHANGES && e.newValue) {
        try { setExchanges(JSON.parse(e.newValue)); } catch {}
      }
      if (e.key === STORAGE_KEYS.THREADS && e.newValue) {
        try { setChatThreads(JSON.parse(e.newValue)); } catch {}
      }
      if (e.key === STORAGE_KEYS.MESSAGES && e.newValue) {
        try { setChatMessages(JSON.parse(e.newValue)); } catch {}
      }
      if (e.key === STORAGE_KEYS.WANTED && e.newValue) {
        try { setWantedRequests(JSON.parse(e.newValue)); } catch {}
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Sync currentUserId to sessionStorage (tab-isolated)
  useEffect(() => {
    if (!isHydrated) return;
    setSessionStorage(STORAGE_KEYS.CURRENT_USER_ID, currentUserId);
  }, [currentUserId, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    setStorage(STORAGE_KEYS.USERS, users);
  }, [users, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    setStorage(STORAGE_KEYS.LISTINGS, listings);
  }, [listings, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    setStorage(STORAGE_KEYS.EXCHANGES, exchanges);
  }, [exchanges, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    setStorage(STORAGE_KEYS.THREADS, chatThreads);
  }, [chatThreads, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    setStorage(STORAGE_KEYS.MESSAGES, chatMessages);
  }, [chatMessages, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    setStorage(STORAGE_KEYS.WANTED, wantedRequests);
  }, [wantedRequests, isHydrated]);

  // Current user helper
  const currentUser = users.find((u) => u.id === currentUserId) || users[0] || INITIAL_USERS[0];

  // 1-Click Fast Switch User (writes to sessionStorage — tab-isolated)
  const switchUser = useCallback((userId: string) => {
    setCurrentUserId(userId);
    setSessionStorage(STORAGE_KEYS.CURRENT_USER_ID, userId);
  }, []);

  // Add Listing
  const addListing = useCallback((newListingData: Omit<Listing, "id" | "ownerId" | "ownerName" | "ownerDept" | "ownerAvatar" | "ownerAvatarBg" | "rating" | "reviewsCount" | "createdAt">): Listing => {
    const newListing: Listing = {
      ...newListingData,
      id: `lst-${Date.now()}`,
      ownerId: currentUser.id,
      ownerName: currentUser.fullName,
      ownerDept: currentUser.department,
      ownerAvatar: currentUser.avatar,
      ownerAvatarBg: currentUser.avatarBg,
      rating: 5.0,
      reviewsCount: 1,
      createdAt: new Date().toISOString(),
    };

    setListings((prev) => [newListing, ...prev]);
    return newListing;
  }, [currentUser]);

  // Remove / Delete Listing
  const removeListing = useCallback((id: string) => {
    setListings((prev) => prev.filter((item) => item.id !== id));
    try {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("campus_circular_my_listings");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            localStorage.setItem(
              "campus_circular_my_listings",
              JSON.stringify(parsed.filter((l: any) => l.id !== id))
            );
          }
        }
        const browseSaved = localStorage.getItem("campus_circular_browse_resources");
        if (browseSaved) {
          const parsed = JSON.parse(browseSaved);
          if (Array.isArray(parsed)) {
            localStorage.setItem(
              "campus_circular_browse_resources",
              JSON.stringify(parsed.filter((l: any) => l.id !== id))
            );
          }
        }
      }
    } catch (e) {
      console.error("Failed to remove listing from localStorage:", e);
    }
  }, []);

  // Update Listing Image (quick upload from listing card)
  const updateListingImage = useCallback((id: string, imageDataUrl: string) => {
    setListings((prev) =>
      prev.map((item) => item.id === id ? { ...item, image: imageDataUrl } : item)
    );
  }, []);

  // Create Borrow Request
  const createBorrowRequest = useCallback((listingId: string, durationDays: number, notes?: string): LoanExchange => {
    const targetListing = listings.find((l) => l.id === listingId);
    if (!targetListing) throw new Error("Listing not found");

    const totalRental = targetListing.dailyRate * durationDays;
    const platformFee = Math.max(20, Math.round(totalRental * 0.1));
    const totalPaid = totalRental + platformFee + targetListing.securityDeposit;
    const otpCode = `CC-${Math.floor(1000 + Math.random() * 9000)}`;

    const newExchange: LoanExchange = {
      id: `ex-${Date.now()}`,
      listingId: targetListing.id,
      listingTitle: targetListing.title,
      listingImage: targetListing.image,
      category: targetListing.category,
      borrowerId: currentUser.id,
      borrowerName: currentUser.fullName,
      borrowerDept: currentUser.department,
      borrowerAvatarBg: currentUser.avatarBg,
      ownerId: targetListing.ownerId,
      ownerName: targetListing.ownerName,
      ownerDept: targetListing.ownerDept,
      ownerAvatarBg: targetListing.ownerAvatarBg,
      dailyRate: targetListing.dailyRate,
      durationDays,
      totalRentalFee: totalRental,
      securityDeposit: targetListing.securityDeposit,
      platformFee,
      totalPaid,
      startDate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      returnDueDate: new Date(Date.now() + durationDays * 86400000).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) + " • 6:00 PM",
      handoverLocation: targetListing.location,
      handoverOtp: otpCode,
      status: "pending",
      stageIndex: 0,
      beforeCondition: {
        rating: "Inspection Pending",
        notes: notes || "Standard check upon meetup.",
        photo: targetListing.image,
        date: "Scheduled on meetup",
        checklist: [
          { item: "Lens / sensor surface checked", checked: true },
          { item: "Power on and functions tested", checked: true },
          { item: "All accessories present", checked: true },
          { item: "Zero initial damage confirmed", checked: true },
        ],
      },
      afterCondition: {
        rating: "Post-Borrow Check",
        notes: "Item verified after custody return.",
        photo: targetListing.image,
        date: "Pending Return",
        checklist: [
          { item: "Clean exterior condition", checked: true },
          { item: "All cables and accessories present", checked: true },
          { item: "Power test verified", checked: true },
          { item: "Zero water exposure / damage", checked: true },
        ],
      },
      settlement: {
        transactionId: `TXN-${Math.floor(100000 + Math.random() * 900000)}`,
        refundAmount: targetListing.securityDeposit,
        lenderPayout: totalRental,
        date: "Pending Conclusion",
      },
      ratingData: {
        borrowerRating: 5,
        borrowerReview: "Smooth hand-off and great resource!",
        lenderRating: 5,
        lenderReview: "Responsible student borrower, highly recommended.",
      },
      createdAt: new Date().toISOString(),
    };

    setExchanges((prev) => [newExchange, ...prev]);

    // Also automatically create/update chat thread between borrower and owner!
    const threadId = [currentUser.id, targetListing.ownerId].sort().join("-");
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      threadId,
      senderId: currentUser.id,
      senderName: currentUser.fullName,
      receiverId: targetListing.ownerId,
      text: `Hi ${targetListing.ownerName}! I've requested to borrow your "${targetListing.title}" for ${durationDays} days. Refundable deposit of ₹${targetListing.securityDeposit} has been escrowed securely.`,
      timestamp: "Just now",
      createdAt: Date.now(),
    };

    setChatMessages((prev) => [...prev, newMsg]);

    setChatThreads((prev) => {
      const existing = prev.find((t) => t.id === threadId);
      if (existing) {
        return prev.map((t) =>
          t.id === threadId
            ? {
                ...t,
                itemTitle: targetListing.title,
                itemImage: targetListing.image,
                exchangeId: newExchange.id,
                exchangeRole: "Borrow Request Sent",
                statusBadge: "Pending Approval",
                meetupOtp: otpCode,
                lastMessage: newMsg.text,
                lastTimestamp: "Just now",
                unreadCount: { ...t.unreadCount, [targetListing.ownerId]: (t.unreadCount[targetListing.ownerId] || 0) + 1 },
              }
            : t
        );
      }

      const newThread: ChatThread = {
        id: threadId,
        participantIds: [currentUser.id, targetListing.ownerId],
        itemTitle: targetListing.title,
        itemImage: targetListing.image,
        exchangeId: newExchange.id,
        exchangeRole: "Borrow Request Sent",
        statusBadge: "Pending Approval",
        meetupOtp: otpCode,
        meetupLocation: targetListing.location,
        lastMessage: newMsg.text,
        lastTimestamp: "Just now",
        unreadCount: { [targetListing.ownerId]: 1, [currentUser.id]: 0 },
      };
      return [newThread, ...prev];
    });

    return newExchange;
  }, [currentUser, listings]);

  // Accept Borrow Request
  const acceptBorrowRequest = useCallback((exchangeId: string) => {
    setExchanges((prev) =>
      prev.map((ex) => {
        if (ex.id !== exchangeId) return ex;
        return {
          ...ex,
          status: "accepted",
          stageIndex: 1,
        };
      })
    );

    // Send confirmation message to borrower
    const ex = exchanges.find((e) => e.id === exchangeId);
    if (ex) {
      const threadId = [ex.borrowerId, ex.ownerId].sort().join("-");
      const confirmMsg: ChatMessage = {
        id: `msg-${Date.now()}`,
        threadId,
        senderId: currentUser.id,
        senderName: currentUser.fullName,
        receiverId: ex.borrowerId,
        text: `I've accepted your borrow request for "${ex.listingTitle}"! Meetup spot is confirmed at ${ex.handoverLocation}. Please have your PIN ready: ${ex.handoverOtp}.`,
        timestamp: "Just now",
        createdAt: Date.now(),
      };
      setChatMessages((prev) => [...prev, confirmMsg]);
    }
  }, [currentUser, exchanges]);

  // Advance loan stage
  const advanceLoanStage = useCallback((exchangeId: string, stageIndex?: number, inspectionData?: Partial<LoanExchange>) => {
    setExchanges((prev) =>
      prev.map((ex) => {
        if (ex.id !== exchangeId) return ex;
        const newStage = stageIndex !== undefined ? stageIndex : (ex.stageIndex + 1) % 9;
        const statusMap: LoanExchange["status"][] = [
          "pending",
          "accepted",
          "handover",
          "active",
          "return_due",
          "returned",
          "inspection",
          "settled",
          "completed",
        ];

        return {
          ...ex,
          stageIndex: newStage,
          status: statusMap[newStage] || "active",
          ...inspectionData,
        };
      })
    );
  }, []);

  // Send Chat Message
  const sendMessage = useCallback((threadId: string, text: string) => {
    const thread = chatThreads.find((t) => t.id === threadId);
    const receiverId = thread?.participantIds.find((id) => id !== currentUser.id) || "u2";

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      threadId,
      senderId: currentUser.id,
      senderName: currentUser.fullName,
      receiverId,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      createdAt: Date.now(),
    };

    setChatMessages((prev) => [...prev, newMsg]);

    setChatThreads((prev) =>
      prev.map((t) => {
        if (t.id !== threadId) return t;
        return {
          ...t,
          lastMessage: text,
          lastTimestamp: "Just now",
          unreadCount: {
            ...t.unreadCount,
            [receiverId]: (t.unreadCount[receiverId] || 0) + 1,
          },
        };
      })
    );
  }, [currentUser, chatThreads]);

  // Get or Create Thread
  const getOrCreateThread = useCallback((peerId: string, itemTitle: string, itemImage: string): ChatThread => {
    const threadId = [currentUser.id, peerId].sort().join("-");
    const existing = chatThreads.find((t) => t.id === threadId);
    if (existing) return existing;

    const newThread: ChatThread = {
      id: threadId,
      participantIds: [currentUser.id, peerId],
      itemTitle,
      itemImage,
      lastMessage: "Chat conversation started.",
      lastTimestamp: "Just now",
      unreadCount: { [peerId]: 0, [currentUser.id]: 0 },
    };

    setChatThreads((prev) => [newThread, ...prev]);
    return newThread;
  }, [currentUser, chatThreads]);

  // Add Wanted Request
  const addWantedRequest = useCallback((reqData: Omit<WantedRequest, "id" | "requesterId" | "requesterName" | "requesterDept" | "requesterAvatarBg" | "postedAgo" | "respondedUserIds" | "createdAt">) => {
    const newReq: WantedRequest = {
      ...reqData,
      id: `req-${Date.now()}`,
      requesterId: currentUser.id,
      requesterName: currentUser.fullName,
      requesterDept: currentUser.department,
      requesterAvatarBg: currentUser.avatarBg,
      postedAgo: "Just now",
      respondedUserIds: [],
      createdAt: new Date().toISOString(),
    };

    setWantedRequests((prev) => [newReq, ...prev]);
  }, [currentUser]);

  // Respond to wanted request
  const respondToWantedRequest = useCallback((requestId: string) => {
    const req = wantedRequests.find((r) => r.id === requestId);
    if (!req) return;

    setWantedRequests((prev) =>
      prev.map((r) => (r.id === requestId ? { ...r, respondedUserIds: [...r.respondedUserIds, currentUser.id] } : r))
    );

    // Open chat with requester
    const threadId = [currentUser.id, req.requesterId].sort().join("-");
    const offerMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      threadId,
      senderId: currentUser.id,
      senderName: currentUser.fullName,
      receiverId: req.requesterId,
      text: `Hey ${req.requesterName}! I saw your wanted request for "${req.title}". I have this available on campus and can lend it to you!`,
      timestamp: "Just now",
      createdAt: Date.now(),
    };

    setChatMessages((prev) => [...prev, offerMsg]);
  }, [currentUser, wantedRequests]);

  // Reset to defaults
  const resetToDefaults = useCallback(() => {
    setCurrentUserId("u1");
    setUsers(INITIAL_USERS);
    setListings(INITIAL_LISTINGS);
    setExchanges(INITIAL_EXCHANGES);
    setChatThreads(INITIAL_CHAT_THREADS);
    setChatMessages(INITIAL_CHAT_MESSAGES);
    setWantedRequests(INITIAL_WANTED_REQUESTS);

    if (typeof window !== "undefined") {
      Object.values(STORAGE_KEYS).forEach((k) => window.localStorage.removeItem(k));
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        currentUser,
        allUsers: users,
        switchUser,
        listings,
        addListing,
        removeListing,
        deleteListing: removeListing,
        updateListingImage,
        exchanges,
        createBorrowRequest,
        acceptBorrowRequest,
        advanceLoanStage,
        chatThreads,
        chatMessages,
        sendMessage,
        getOrCreateThread,
        wantedRequests,
        addWantedRequest,
        respondToWantedRequest,
        resetToDefaults,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
