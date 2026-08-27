// ─── Mock Data for Campus Circular Dashboard ─────────────────────────────

export const currentUser = {
  id: "u1",
  name: "Anaya",
  fullName: "Anaya Sharma",
  initials: "AS",
  avatarBg: "bg-emerald-100 text-emerald-800",
  department: "Computer Engineering",
  year: "3rd Year",
  verified: true,
  trustScore: 4.7,
  successfulExchanges: 32,
  lateReturns: 0,
  disputes: 0,
  co2Saved: 12.4,
};

export const overviewStats = [
  {
    label: "Active Members",
    value: "128",
    change: "+12 this week",
    icon: "users",
    bgColor: "#FEF3C7",
    textColor: "#B45309",
  },
  {
    label: "Resources Shared",
    value: "342",
    change: "+28 this week",
    icon: "share-nodes",
    bgColor: "#D1FAE5",
    textColor: "#047857",
  },
  {
    label: "Successful Exchanges",
    value: "215",
    change: "+18 this week",
    icon: "repeat",
    bgColor: "#DBEAFE",
    textColor: "#1D4ED8",
  },
  {
    label: "Money Saved",
    value: "₹86,430",
    change: "+₹6,120 this week",
    icon: "banknote",
    bgColor: "#FEE2E2",
    textColor: "#B91C1C",
  },
  {
    label: "On-time Returns",
    value: "91%",
    change: "+4% this week",
    icon: "clock-check",
    bgColor: "#EDE9FE",
    textColor: "#6D28D9",
  },
];

export const activityStages = [
  { label: "Requested", count: 2, icon: "file-text", active: false },
  { label: "Accepted", count: 1, icon: "check-circle", active: false },
  { label: "Borrowed", count: 2, icon: "package", active: true },
  { label: "Return Due", count: 1, icon: "calendar-clock", active: false },
  { label: "Returned", count: 3, icon: "rotate-ccw", active: false },
  { label: "Settled", count: 2, icon: "check-check", active: false },
];

export const recommendedItems = [
  {
    id: "r1",
    name: "Sony ZV-E10",
    owner: "Rohan Verma",
    image: "/products/camera.jpg",
    rating: 4.8,
    distance: "1.2 km",
    pricePerDay: "₹350/day",
    deposit: "+ ₹1,500 deposit",
  },
  {
    id: "r2",
    name: "Digitek Tripod",
    owner: "Mehak Singh",
    image: "/products/tripod.jpg",
    rating: 4.6,
    distance: "0.8 km",
    pricePerDay: "₹120/day",
    deposit: "+ ₹500 deposit",
  },
  {
    id: "r3",
    name: "Boya BY-MM1 Mic",
    owner: "Arjun Patel",
    image: "/products/mic.jpg",
    rating: 4.7,
    distance: "1.5 km",
    pricePerDay: "₹80/day",
    deposit: "+ ₹300 deposit",
  },
  {
    id: "r4",
    name: "LED Ring Light",
    owner: "Simran Kaur",
    image: "/products/ringlight.jpg",
    rating: 4.5,
    distance: "1.1 km",
    pricePerDay: "₹100/day",
    deposit: "+ ₹400 deposit",
  },
];

export const popularCategories = [
  { name: "Electronics", count: 120, icon: "laptop", color: "bg-blue-50 text-blue-600" },
  { name: "Books & Notes", count: 98, icon: "book-open", color: "bg-amber-50 text-amber-600" },
  { name: "Sports", count: 76, icon: "trophy", color: "bg-rose-50 text-rose-600" },
  { name: "Event Supplies", count: 64, icon: "sparkles", color: "bg-purple-50 text-purple-600" },
  { name: "Tools & DIY", count: 43, icon: "wrench", color: "bg-slate-100 text-slate-700" },
];

export const upcomingReturns = [
  {
    id: "ret1",
    item: "Canon EOS M50",
    owner: "Rohan Verma",
    initials: "RV",
    avatarBg: "bg-blue-100 text-blue-800",
    dueIn: "Due in 1 day",
    urgent: true,
  },
  {
    id: "ret2",
    item: "Tripod Stand",
    owner: "Mehak Singh",
    initials: "MS",
    avatarBg: "bg-pink-100 text-pink-800",
    dueIn: "Due in 2 days",
    urgent: false,
  },
];

export const recentMessages = [
  {
    id: "m1",
    name: "Rohan Verma",
    initials: "RV",
    avatarBg: "bg-blue-100 text-blue-800",
    message: "Accepted your request",
    time: "2m ago",
  },
  {
    id: "m2",
    name: "Mehak Singh",
    initials: "MS",
    avatarBg: "bg-pink-100 text-pink-800",
    message: "Sent you a message",
    time: "15m ago",
  },
  {
    id: "m3",
    name: "Arjun Patel",
    initials: "AP",
    avatarBg: "bg-amber-100 text-amber-800",
    message: "Returning request",
    time: "1h ago",
  },
];

export const sidebarNav = [
  { label: "Dashboard", icon: "grid", href: "/dashboard", active: true },
  { label: "Browse", icon: "search", href: "/browse", active: false },
  { label: "AI Assistant", icon: "sparkles", href: "/ai", active: false },
  { label: "My Requests", icon: "inbox", href: "/requests", active: false },
  { label: "My Loans", icon: "arrow-up-right", href: "/loans", active: false },
  { label: "My Listings", icon: "list", href: "/listings", active: false },
  { label: "Messages", icon: "message", href: "/messages", active: false },
  { label: "Reviews", icon: "star", href: "/reviews", active: false },
  { label: "Impact", icon: "leaf", href: "/impact", active: false },
  { label: "Admin Panel", icon: "shield", href: "/admin", active: false },
];

export const popularSearches = [
  "Camera + Tripod",
  "Projector",
  "Mic",
  "Lighting",
  "Calculator",
];
