"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Sidebar from "@/app/components/dashboard/Sidebar";
import AppNavbar from "@/app/components/layout/AppNavbar";
import { AppIcon } from "@/app/components/dashboard/Icons";
import {
  printOfficialTallyBill,
  downloadOfficialTallyBill,
  TallyBillData,
} from "@/app/utils/printBill";
import TallyBillModal from "@/app/components/modals/TallyBillModal";

interface WalletTransaction {
  id: string;
  type: "escrow_lock" | "escrow_refund" | "earning" | "topup" | "withdrawal";
  title: string;
  amount: number;
  depositLocked?: number;
  rentalCharge?: number;
  platformFee?: number;
  status: string;
  timestamp: string;
  utrOrAuth?: string;
  receipt?: any;
}

const defaultInitialTransactions: WalletTransaction[] = [
  {
    id: "TXN-CC-894102",
    type: "escrow_lock",
    title: "Escrow Hold: Sony Alpha A7 III Camera",
    amount: -2500,
    depositLocked: 2000,
    rentalCharge: 500,
    platformFee: 50,
    status: "Active in Escrow",
    timestamp: "Aug 26, 2026 • 02:45 PM",
    utrOrAuth: "AUTH-ESC-9921",
  },
  {
    id: "TXN-CC-849120",
    type: "escrow_refund",
    title: "Security Deposit Refund: Digitek Tripod",
    amount: 800,
    status: "Refunded to Wallet",
    timestamp: "Aug 25, 2026 • 06:15 PM",
    utrOrAuth: "REF-ESC-4102",
  },
  {
    id: "TXN-CC-791043",
    type: "earning",
    title: "Lender Payout: Rode Wireless Mic GO II",
    amount: 360,
    status: "Settled to Wallet",
    timestamp: "Aug 24, 2026 • 11:30 AM",
    utrOrAuth: "PAYOUT-CC-1092",
  },
  {
    id: "TXN-CC-730194",
    type: "topup",
    title: "Wallet Top-up via UPI (student@oksbi)",
    amount: 2000,
    status: "Success",
    timestamp: "Aug 22, 2026 • 09:10 AM",
    utrOrAuth: "UPI-SBIN-891041",
  },
  {
    id: "TXN-CC-681902",
    type: "withdrawal",
    title: "Bank Payout to HDFC A/C •••• 9104",
    amount: -1500,
    status: "Transferred",
    timestamp: "Aug 20, 2026 • 04:00 PM",
    utrOrAuth: "UTR-HDFC-991048",
  },
];

export default function EscrowWalletPage() {
  const [transactions, setTransactions] = useState<WalletTransaction[]>(defaultInitialTransactions);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [isTopUpModalOpen, setIsTopUpModalOpen] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<WalletTransaction | null>(null);
  const [isTallyModalOpen, setIsTallyModalOpen] = useState(false);

  const getWalletTallyData = (txn: WalletTransaction): TallyBillData => ({
    voucherNo: `BILL/2026/${txn.id.replace("TXN-", "").replace("REF-", "")}`,
    transactionId: txn.id,
    authCode: txn.utrOrAuth || `AUTH-ESC-${Math.floor(1000 + Math.random() * 9000)}`,
    date: txn.timestamp.split(" • ")[0] || new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    time: txn.timestamp.split(" • ")[1],
    borrowerName: "Anaya Sharma",
    borrowerRoll: "TCET-2023-CS-089",
    borrowerDept: "3rd Year, Computer Engg",
    ownerName: "Campus Circular Clearing House",
    ownerDept: "Verified Student Network",
    itemTitle: txn.title,
    category: "Campus Equipment & Escrow",
    durationDays: 3,
    dailyRate: Math.round(Math.abs(txn.amount) * 0.2),
    rentalFee: txn.rentalCharge || Math.round(Math.abs(txn.amount) * 0.2),
    platformFee: txn.platformFee || 25,
    securityDeposit: txn.depositLocked || Math.abs(txn.amount),
    totalAmount: Math.abs(txn.amount),
    paymentMethod: txn.type === "escrow_refund" ? "Campus Wallet (Refund)" : "Campus Escrow Switch",
    status: txn.type === "escrow_refund" ? "SETTLED_REFUNDED" : "LOCKED_IN_ESCROW",
    utrNumber: txn.utrOrAuth || `UTR-ESC-${Math.floor(100000 + Math.random() * 900000)}`,
  });

  // Top-Up Form
  const [topUpAmount, setTopUpAmount] = useState<number>(1000);
  const [topUpMethod, setTopUpMethod] = useState<"upi" | "card" | "netbanking">("upi");
  const [isProcessingAction, setIsProcessingAction] = useState(false);

  // Withdraw Form
  const [withdrawAmount, setWithdrawAmount] = useState<number>(1000);
  const [bankAccount, setBankAccount] = useState("HDFC Bank (A/C: •••• 9104)");

  // Load custom transactions from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("campus_circular_wallet_transactions");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const existingIds = new Set(parsed.map((p: any) => p.id));
          const combined = [...parsed, ...defaultInitialTransactions.filter((m) => !existingIds.has(m.id))];
          setTransactions(combined);
        }
      }
    } catch (e) {
      console.error("Failed to load wallet transactions:", e);
    }
  }, []);

  // Balances calculation
  const availableBalance = transactions.reduce((acc, t) => {
    if (t.type === "topup" || t.type === "earning" || t.type === "escrow_refund") return acc + Math.abs(t.amount);
    if (t.type === "withdrawal" || t.type === "escrow_lock") return acc - Math.abs(t.amount);
    return acc;
  }, 2500);

  const lockedInEscrow = 1500;
  const lifetimeEarnings = 4850;

  const filteredTransactions = transactions.filter((t) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "escrow") return t.type === "escrow_lock" || t.type === "escrow_refund";
    if (activeFilter === "earnings") return t.type === "earning";
    if (activeFilter === "transfers") return t.type === "topup" || t.type === "withdrawal";
    return true;
  });

  const handleExecuteTopUp = () => {
    setIsProcessingAction(true);
    setTimeout(() => {
      const newEntry: WalletTransaction = {
        id: `TXN-CC-${Math.floor(100000 + Math.random() * 900000)}`,
        type: "topup",
        title: `Wallet Top-Up via ${topUpMethod.toUpperCase()}`,
        amount: topUpAmount,
        status: "Success",
        timestamp: new Date().toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }),
        utrOrAuth: `UTR-UPI-${Math.floor(100000 + Math.random() * 900000)}`,
      };

      const updated = [newEntry, ...transactions];
      setTransactions(updated);
      try {
        localStorage.setItem("campus_circular_wallet_transactions", JSON.stringify(updated));
      } catch {}
      setIsProcessingAction(false);
      setIsTopUpModalOpen(false);
    }, 900);
  };

  const handleExecuteWithdrawal = () => {
    setIsProcessingAction(true);
    setTimeout(() => {
      const newEntry: WalletTransaction = {
        id: `TXN-CC-${Math.floor(100000 + Math.random() * 900000)}`,
        type: "withdrawal",
        title: `Payout to ${bankAccount}`,
        amount: -withdrawAmount,
        status: "Transferred",
        timestamp: new Date().toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }),
        utrOrAuth: `UTR-NEFT-${Math.floor(100000 + Math.random() * 900000)}`,
      };

      const updated = [newEntry, ...transactions];
      setTransactions(updated);
      try {
        localStorage.setItem("campus_circular_wallet_transactions", JSON.stringify(updated));
      } catch {}
      setIsProcessingAction(false);
      setIsWithdrawModalOpen(false);
    }, 900);
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

        {/* ─── Top Breadcrumbs & Header ─────────────────────────── */}
        <div className="px-5 lg:px-8 pt-6 pb-4 w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#71717A] mb-1">
                <Link href="/dashboard" className="hover:text-[#18181B]">Dashboard</Link>
                <span>/</span>
                <span className="text-[#18181B]">Escrow Wallet &amp; Banking</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#18181B] tracking-tight flex items-center gap-2.5">
                <span>Campus Escrow Wallet</span>
                <span className="text-xs bg-[#EAF7EE] text-[#166534] border border-[#BBF7D0] px-2.5 py-0.5 rounded-full font-bold">
                  256-Bit Safe Escrow
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-[#52525B] mt-0.5">
                Manage locked security deposits, withdraw lending earnings, and top-up student funds with 0% gateway fees.
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setIsWithdrawModalOpen(true)}
                className="px-4 py-2.5 bg-white hover:bg-[#FAF7F0] border border-[#EDE8C8] text-[#18181B] font-bold text-xs rounded-xl transition-all shadow-2xs cursor-pointer flex items-center gap-1.5"
              >
                <AppIcon name="arrow-up-right-sm" size={14} />
                <span>Withdraw to Bank</span>
              </button>

              <button
                type="button"
                onClick={() => setIsTopUpModalOpen(true)}
                className="px-5 py-2.5 bg-gradient-to-b from-[#7FB634] to-[#689A24] text-white font-bold text-xs rounded-2xl transition-all shadow-xs hover:from-[#8AC538] hover:to-[#72A627] border-b-2 border-[#557F1C] active:translate-y-0.5 cursor-pointer flex items-center gap-1.5"
              >
                <span>+ Top-Up Wallet</span>
              </button>
            </div>
          </div>

          {/* ─── Metric Summary Cards ────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {/* Card 1: Available Balance */}
            <div className="bg-gradient-to-br from-[#18181B] to-[#27272A] text-white rounded-3xl p-5 shadow-sm space-y-3 relative overflow-hidden border border-[#3F3F46]">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#A1A1AA]">
                  Available Balance
                </span>
                <span className="w-8 h-8 rounded-xl bg-[#84CC16] text-[#18181B] flex items-center justify-center font-bold text-xs shadow-xs">
                  ₹
                </span>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  ₹{Math.max(0, availableBalance).toLocaleString()}
                </p>
                <p className="text-[11px] text-[#4ADE80] font-bold mt-1 flex items-center gap-1">
                  <span>✓ 0% Gateway Deduction</span>
                </p>
              </div>
            </div>

            {/* Card 2: Active Escrow Holds */}
            <div className="bg-white rounded-3xl border border-[#EDE8C8] p-5 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#71717A]">
                  Locked in Escrow
                </span>
                <span className="w-8 h-8 rounded-xl bg-[#FEF3C7] text-[#D97706] flex items-center justify-center font-bold text-xs">
                  🔒
                </span>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-[#18181B] tracking-tight">
                  ₹{lockedInEscrow.toLocaleString()}
                </p>
                <p className="text-[11px] text-[#D97706] font-bold mt-1">
                  100% Refundable on Return
                </p>
              </div>
            </div>

            {/* Card 3: Lifetime Earnings */}
            <div className="bg-white rounded-3xl border border-[#EDE8C8] p-5 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#71717A]">
                  Lender Earnings
                </span>
                <span className="w-8 h-8 rounded-xl bg-[#DCFCE7] text-[#15803D] flex items-center justify-center font-bold text-xs">
                  📈
                </span>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-[#16A34A] tracking-tight">
                  ₹{lifetimeEarnings.toLocaleString()}
                </p>
                <p className="text-[11px] text-[#52525B] font-medium mt-1">
                  From 14 student borrowings
                </p>
              </div>
            </div>

            {/* Card 4: Escrow Protection Rating */}
            <div className="bg-white rounded-3xl border border-[#EDE8C8] p-5 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#71717A]">
                  Escrow Trust Tier
                </span>
                <span className="w-8 h-8 rounded-xl bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center font-bold text-xs">
                  🛡️
                </span>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-[#2563EB] tracking-tight">
                  Tier 1 Verified
                </p>
                <p className="text-[11px] text-[#16A34A] font-bold mt-1">
                  100% Auto-Settlement Score
                </p>
              </div>
            </div>
          </div>

          {/* ─── Transaction Ledger ────────────────────────────────── */}
          <div className="mt-8 bg-white rounded-3xl border border-[#EDE8C8] shadow-2xs overflow-hidden">
            {/* Filter Tabs */}
            <div className="p-5 border-b border-[#F0EAE0] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-black text-[#18181B]">Peer Escrow Ledger</h3>
                <p className="text-xs text-[#71717A]">
                  Real-time transparent audit logs of all student equipment holds and payouts
                </p>
              </div>

              <div className="flex flex-wrap gap-1 p-1 bg-[#FAF7F0] rounded-2xl border border-[#EDE8C8]">
                {[
                  { id: "all", label: "All Logs" },
                  { id: "escrow", label: "Escrow Holds & Refunds" },
                  { id: "earnings", label: "Lending Payouts" },
                  { id: "transfers", label: "Top-Up / Bank" },
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setActiveFilter(f.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeFilter === f.id
                        ? "bg-[#18181B] text-white shadow-2xs"
                        : "text-[#71717A] hover:text-[#18181B]"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF7F0] border-b border-[#EDE8C8] text-[#71717A] uppercase font-bold text-[10px]">
                  <tr>
                    <th className="px-5 py-3.5">Transaction &amp; Date</th>
                    <th className="px-5 py-3.5">Description</th>
                    <th className="px-5 py-3.5">Status</th>
                    <th className="px-5 py-3.5">Reference ID</th>
                    <th className="px-5 py-3.5 text-right">Amount</th>
                    <th className="px-5 py-3.5 text-center">Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0EAE0]">
                  {filteredTransactions.map((txn) => {
                    const isPositive = txn.amount > 0;
                    return (
                      <tr key={txn.id} className="hover:bg-[#FCFAF5] transition-colors">
                        <td className="px-5 py-4">
                          <p className="font-bold text-[#18181B]">{txn.id}</p>
                          <p className="text-[10px] text-[#71717A] mt-0.5">{txn.timestamp}</p>
                        </td>

                        <td className="px-5 py-4">
                          <p className="font-bold text-[#18181B]">{txn.title}</p>
                          <p className="text-[10px] text-[#71717A]">
                            {txn.type === "escrow_lock"
                              ? `Deposit: ₹${txn.depositLocked} • Rental: ₹${txn.rentalCharge}`
                              : txn.type === "earning"
                              ? "Lender Revenue Settlement"
                              : "Campus Banking Ledger"}
                          </p>
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10.5px] font-bold inline-flex items-center gap-1 ${
                              txn.type === "escrow_lock"
                                ? "bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]"
                                : txn.type === "escrow_refund" || txn.type === "earning" || txn.type === "topup"
                                ? "bg-[#DCFCE7] text-[#166534] border border-[#BBF7D0]"
                                : "bg-[#F4F4F5] text-[#52525B] border border-[#E4E4E7]"
                            }`}
                          >
                            <span>●</span>
                            <span>{txn.status}</span>
                          </span>
                        </td>

                        <td className="px-5 py-4 font-mono text-[11px] text-[#52525B]">
                          {txn.utrOrAuth || "AUTH-VERIFIED"}
                        </td>

                        <td className="px-5 py-4 text-right">
                          <p
                            className={`font-black text-sm ${
                              isPositive ? "text-[#16A34A]" : "text-[#18181B]"
                            }`}
                          >
                            {isPositive ? `+₹${txn.amount}` : `-₹${Math.abs(txn.amount)}`}
                          </p>
                        </td>

                        <td className="px-5 py-4 text-center">
                          <button
                            type="button"
                            onClick={() => setSelectedReceipt(txn)}
                            className="px-2.5 py-1 bg-[#FAF7F0] hover:bg-[#F3EFE3] border border-[#EDE8C8] rounded-lg text-[11px] font-bold text-[#18181B] transition-all cursor-pointer inline-flex items-center gap-1"
                          >
                            <AppIcon name="receipt" size={12} />
                            <span>View</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* ─── Top-Up Modal ─────────────────────────────────────── */}
      {isTopUpModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#EDE8C8] p-6 max-w-md w-full shadow-2xl space-y-4 animate-fadeInUp">
            <div className="flex items-center justify-between pb-3 border-b border-[#F0EAE0]">
              <h3 className="text-base font-black text-[#18181B]">Top-Up Student Escrow Wallet</h3>
              <button
                onClick={() => setIsTopUpModalOpen(false)}
                className="text-[#71717A] hover:text-[#18181B] font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-[#18181B] block mb-1">Select Amount</label>
                <div className="grid grid-cols-3 gap-2">
                  {[500, 1000, 2500].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setTopUpAmount(amt)}
                      className={`py-2 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
                        topUpAmount === amt
                          ? "bg-[#18181B] text-white border-[#18181B]"
                          : "bg-[#FAF7F0] border-[#EDE8C8] text-[#52525B]"
                      }`}
                    >
                      ₹{amt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-bold text-[#18181B] block mb-1">Payment Method</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "upi", label: "UPI (0% fee)" },
                    { id: "card", label: "Debit Card" },
                    { id: "netbanking", label: "NetBanking" },
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setTopUpMethod(m.id as any)}
                      className={`p-2 rounded-xl border text-[11px] font-bold cursor-pointer transition-all ${
                        topUpMethod === m.id
                          ? "bg-[#18181B] text-white border-[#18181B]"
                          : "bg-[#FAF7F0] border-[#EDE8C8] text-[#52525B]"
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-[#F0FDF4] border border-[#BBF7D0] rounded-xl text-[11px] text-[#166534]">
                ✨ Funds added to student wallet can be used instantly to lock refundable equipment bonds without third-party fees.
              </div>

              <button
                type="button"
                disabled={isProcessingAction}
                onClick={handleExecuteTopUp}
                className="w-full py-3.5 bg-gradient-to-b from-[#7FB634] to-[#689A24] text-white font-bold text-xs rounded-xl shadow-xs hover:from-[#8AC538] hover:to-[#72A627] border-b-2 border-[#557F1C] active:translate-y-0.5 cursor-pointer disabled:opacity-50"
              >
                {isProcessingAction ? "Processing Top-up..." : `Confirm Top-Up ₹${topUpAmount}`}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Withdraw Modal ───────────────────────────────────── */}
      {isWithdrawModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#EDE8C8] p-6 max-w-md w-full shadow-2xl space-y-4 animate-fadeInUp">
            <div className="flex items-center justify-between pb-3 border-b border-[#F0EAE0]">
              <h3 className="text-base font-black text-[#18181B]">Withdraw Earnings to Bank</h3>
              <button
                onClick={() => setIsWithdrawModalOpen(false)}
                className="text-[#71717A] hover:text-[#18181B] font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-[#18181B] block mb-1">Select Bank Account</label>
                <select
                  value={bankAccount}
                  onChange={(e) => setBankAccount(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF7F0] border border-[#EDE8C8] rounded-xl text-xs font-bold text-[#18181B]"
                >
                  <option value="HDFC Bank (A/C: •••• 9104)">HDFC Bank (A/C: •••• 9104)</option>
                  <option value="State Bank of India (A/C: •••• 4120)">State Bank of India (A/C: •••• 4120)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-[#18181B] block mb-1">Withdrawal Amount (₹)</label>
                <input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-[#FAF7F0] border border-[#EDE8C8] rounded-xl text-xs font-bold text-[#18181B]"
                />
                <p className="text-[10.5px] text-[#71717A] mt-1">Available for payout: ₹{availableBalance}</p>
              </div>

              <div className="p-3 bg-[#EFF6FF] border border-[#BFDBFE] rounded-xl text-[11px] text-[#1E40AF]">
                ⚡ Instant IMPS Transfer: Funds will reach your verified bank account within 60 seconds with 0 gateway charge.
              </div>

              <button
                type="button"
                disabled={isProcessingAction}
                onClick={handleExecuteWithdrawal}
                className="w-full py-3.5 bg-gradient-to-b from-[#7FB634] to-[#689A24] text-white font-bold text-xs rounded-xl shadow-xs hover:from-[#8AC538] hover:to-[#72A627] border-b-2 border-[#557F1C] active:translate-y-0.5 cursor-pointer disabled:opacity-50"
              >
                {isProcessingAction ? "Transferring to Bank..." : `Confirm Payout ₹${withdrawAmount}`}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Receipt Modal ────────────────────────────────────── */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#EDE8C8] p-6 max-w-md w-full shadow-2xl space-y-4 text-center animate-fadeInUp">
            <div className="w-12 h-12 bg-[#DCFCE7] text-[#15803D] rounded-full flex items-center justify-center text-xl mx-auto shadow-xs">
              🧾
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-[#71717A]">Official Campus Escrow Voucher</span>
              <h3 className="text-base font-black text-[#18181B]">{selectedReceipt.id}</h3>
            </div>

            <div className="bg-[#FAF7F0] p-4 rounded-2xl border border-[#EFE8D6] text-left text-xs space-y-1.5 font-mono">
              <p><strong>Item / Ref:</strong> {selectedReceipt.title}</p>
              <p><strong>Timestamp:</strong> {selectedReceipt.timestamp}</p>
              <p><strong>Status:</strong> <span className="text-[#16A34A] font-bold">{selectedReceipt.status}</span></p>
              <p><strong>Amount:</strong> <span className="font-extrabold text-sm text-[#18181B]">₹{Math.abs(selectedReceipt.amount)}</span></p>
              <p><strong>Auth Code:</strong> <span className="text-[#52525B]">{selectedReceipt.utrOrAuth || "AUTH-ESC-9921"}</span></p>
            </div>

            <div className="space-y-2">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const data = getWalletTallyData(selectedReceipt);
                    printOfficialTallyBill(data);
                  }}
                  className="flex-1 py-2.5 bg-gradient-to-b from-[#7FB634] to-[#689A24] text-white font-bold text-xs rounded-xl shadow-xs hover:from-[#8AC538] hover:to-[#72A627] border-b-2 border-[#557F1C] active:translate-y-0.5 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>🖨️ Print Tally Bill</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsTallyModalOpen(true);
                  }}
                  className="py-2.5 px-3 bg-white border border-[#EDE8C8] text-[#18181B] font-bold text-xs rounded-xl cursor-pointer hover:bg-[#FAF7F0]"
                >
                  Preview
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const data = getWalletTallyData(selectedReceipt);
                    downloadOfficialTallyBill(data);
                  }}
                  className="py-2.5 px-3 bg-[#FAF7F0] border border-[#EDE8C8] text-[#18181B] font-bold text-xs rounded-xl cursor-pointer hover:bg-[#F3EFE3]"
                  title="Download HTML"
                >
                  ⬇ Save
                </button>
              </div>

              <button
                type="button"
                onClick={() => setSelectedReceipt(null)}
                className="w-full py-2.5 bg-[#18181B] text-white font-bold text-xs rounded-xl cursor-pointer hover:bg-[#27272A]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Tally Bill Preview Modal ─────────────────────────── */}
      <TallyBillModal
        isOpen={isTallyModalOpen}
        onClose={() => setIsTallyModalOpen(false)}
        billData={selectedReceipt ? getWalletTallyData(selectedReceipt) : null}
      />
    </div>
  );
}
