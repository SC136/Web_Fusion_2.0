"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { AppIcon } from "@/app/components/dashboard/Icons";
import {
  printOfficialTallyBill,
  downloadOfficialTallyBill,
  TallyBillData,
} from "@/app/utils/printBill";
import TallyBillModal from "@/app/components/modals/TallyBillModal";

export interface PaymentReceipt {
  transactionId: string;
  authCode: string;
  paymentMethod: string;
  paidAmount: number;
  rentalFee: number;
  platformFee: number;
  escrowDeposit: number;
  timestamp: string;
  itemTitle: string;
  ownerName: string;
  borrowerName: string;
}

interface PaymentGatewayModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemTitle: string;
  itemImage?: string;
  category?: string;
  ownerName: string;
  ownerDept?: string;
  durationDays: number;
  dailyRate: number;
  platformFee: number;
  securityDeposit: number;
  totalPayable: number;
  onPaymentSuccess: (receipt: PaymentReceipt) => void;
}

type PaymentMethod = "upi" | "campus_id" | "card" | "netbanking";

export default function PaymentGatewayModal({
  isOpen,
  onClose,
  itemTitle,
  itemImage = "/products/camera.jpg",
  category = "Equipment",
  ownerName,
  ownerDept = "Campus Verified Lender",
  durationDays,
  dailyRate,
  platformFee,
  securityDeposit,
  totalPayable,
  onPaymentSuccess,
}: PaymentGatewayModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("upi");
  const [paymentStep, setPaymentStep] = useState<"select" | "processing" | "success">("select");
  const [processingStatus, setProcessingStatus] = useState("Connecting to Campus Banking Switch...");
  const [processingProgress, setProcessingProgress] = useState(15);
  const [receiptData, setReceiptData] = useState<PaymentReceipt | null>(null);
  const [isTallyModalOpen, setIsTallyModalOpen] = useState(false);

  // Form states
  const [upiId, setUpiId] = useState("anaya.sharma@okhdfcbank");
  const [upiMode, setUpiMode] = useState<"id" | "qr">("id");
  const [qrTimer, setQrTimer] = useState(299); // 5 mins
  const [cardHolder, setCardHolder] = useState("Anaya Sharma");
  const [cardNumber, setCardNumber] = useState("4532 •••• •••• 8819");
  const [cardExpiry, setCardExpiry] = useState("09/28");
  const [cardCvv, setCardCvv] = useState("721");
  const [selectedBank, setSelectedBank] = useState("sbi");

  // Escrow balance simulation
  const mockCampusCardBalance = 3450;

  // QR countdown timer
  useEffect(() => {
    let interval: any;
    if (isOpen && upiMode === "qr" && paymentStep === "select" && qrTimer > 0) {
      interval = setInterval(() => {
        setQrTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isOpen, upiMode, paymentStep, qrTimer]);

  if (!isOpen) return null;

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${remainder.toString().padStart(2, "0")}`;
  };

  const handlePayNow = () => {
    setPaymentStep("processing");
    setProcessingProgress(20);
    setProcessingStatus("Contacting Secure Student Banking Switch...");

    setTimeout(() => {
      setProcessingProgress(55);
      setProcessingStatus(`Locking ₹${securityDeposit} Security Deposit in College Safe Escrow Vault...`);
    }, 700);

    setTimeout(() => {
      setProcessingProgress(85);
      setProcessingStatus("Verifying Peer Exchange Contract with 256-Bit Escrow Hash...");
    }, 1400);

    setTimeout(() => {
      setProcessingProgress(100);
      const generatedReceipt: PaymentReceipt = {
        transactionId: `TXN-CC-${Math.floor(100000 + Math.random() * 900000)}`,
        authCode: `AUTH-ESC-${Math.floor(1000 + Math.random() * 9000)}`,
        paymentMethod:
          selectedMethod === "upi"
            ? `UPI (${upiId})`
            : selectedMethod === "campus_id"
            ? "Campus Student Smart ID Wallet"
            : selectedMethod === "card"
            ? `Debit Card (${cardNumber.slice(-4)})`
            : `NetBanking (${selectedBank.toUpperCase()})`,
        paidAmount: totalPayable,
        rentalFee: dailyRate * durationDays,
        platformFee: platformFee,
        escrowDeposit: securityDeposit,
        timestamp: new Date().toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }),
        itemTitle,
        ownerName,
        borrowerName: "Anaya Sharma",
      };

      // Also record into persistent wallet ledger in localStorage
      try {
        const existingTxns = localStorage.getItem("campus_circular_wallet_transactions");
        const parsed = existingTxns ? JSON.parse(existingTxns) : [];
        const walletEntry = {
          id: generatedReceipt.transactionId,
          type: "escrow_lock",
          title: `Escrow Lock: ${itemTitle}`,
          amount: -totalPayable,
          depositLocked: securityDeposit,
          rentalCharge: dailyRate * durationDays,
          platformFee: platformFee,
          status: "Locked in Escrow",
          timestamp: generatedReceipt.timestamp,
          receipt: generatedReceipt,
        };
        localStorage.setItem(
          "campus_circular_wallet_transactions",
          JSON.stringify([walletEntry, ...parsed])
        );
      } catch (e) {
        console.error("Failed to record wallet transaction:", e);
      }

      setReceiptData(generatedReceipt);
      setPaymentStep("success");
      onPaymentSuccess(generatedReceipt);
    }, 2100);
  };

  const getTallyBillData = (): TallyBillData => ({
    voucherNo: `BILL/2026/${receiptData?.transactionId.replace("TXN-", "") || "CC-894102"}`,
    transactionId: receiptData?.transactionId || "TXN-CC-894102",
    authCode: receiptData?.authCode || "ESC-AUTH-8821",
    date: receiptData?.timestamp.split(" • ")[0] || new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    time: receiptData?.timestamp.split(" • ")[1],
    borrowerName: receiptData?.borrowerName || "Anaya Sharma",
    borrowerRoll: "TCET-2023-CS-089",
    borrowerDept: "3rd Year, Computer Engg",
    ownerName: receiptData?.ownerName || ownerName,
    ownerDept: ownerDept,
    itemTitle: receiptData?.itemTitle || itemTitle,
    category: category,
    durationDays: durationDays,
    dailyRate: dailyRate,
    rentalFee: receiptData?.rentalFee || dailyRate * durationDays,
    platformFee: receiptData?.platformFee || platformFee,
    securityDeposit: receiptData?.escrowDeposit || securityDeposit,
    totalAmount: receiptData?.paidAmount || totalPayable,
    paymentMethod: receiptData?.paymentMethod || "Campus Escrow Gateway",
    status: "LOCKED_IN_ESCROW",
  });

  const handlePrintReceipt = () => {
    const data = getTallyBillData();
    printOfficialTallyBill(data);
  };

  const handleDownloadReceipt = () => {
    const data = getTallyBillData();
    downloadOfficialTallyBill(data);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 select-none animate-fadeIn">
      <div className="bg-white rounded-3xl border border-[#EDE8C8] max-w-xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[94vh]">
        {/* ─── Gateway Top Header ───────────────────────────────── */}
        <div className="bg-[#18181B] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-b from-[#84CC16] to-[#65A30D] text-[#18181B] flex items-center justify-center font-black text-sm shadow-xs">
              CC
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-sm font-black tracking-tight">Campus Safe Escrow Gateway</h2>
                <span className="text-[10px] bg-[#16A34A]/20 text-[#4ADE80] px-2 py-0.2 rounded-full font-bold border border-[#16A34A]/30 flex items-center gap-1">
                  <AppIcon name="shield-check" size={10} />
                  <span>256-Bit Escrow Vault</span>
                </span>
              </div>
              <p className="text-[11px] text-[#A1A1AA]">
                Instant student authorization • Security deposit 100% refunded post-return
              </p>
            </div>
          </div>

          {paymentStep === "select" && (
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center text-xs font-bold transition-all cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        {/* ─── Item & Total Breakdown Strip ─────────────────────── */}
        <div className="px-6 py-3 bg-[#FAF7F0] border-b border-[#EDE8C8] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl bg-white border border-[#E8DFC8] overflow-hidden flex-shrink-0">
              <Image src={itemImage} alt={itemTitle} fill className="object-contain p-1" />
            </div>
            <div>
              <p className="text-xs font-black text-[#18181B] line-clamp-1">{itemTitle}</p>
              <p className="text-[10.5px] text-[#71717A]">
                {durationDays} Days • Lender: <strong className="text-[#18181B]">{ownerName}</strong>
              </p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-[10px] uppercase font-bold text-[#71717A]">Total Payable</p>
            <p className="text-lg font-black text-[#15803D]">₹{totalPayable}</p>
          </div>
        </div>

        {/* ─── Main Gateway Body ───────────────────────────────── */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5 text-xs">
          {/* STEP 1: PAYMENT METHOD SELECTION */}
          {paymentStep === "select" && (
            <>
              {/* Payment Methods Grid Tabs */}
              <div>
                <label className="font-extrabold text-[#18181B] text-xs block mb-2">
                  Select Mock Payment Method:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: "upi", label: "UPI Instant", icon: "zap", desc: "GPay / PhonePe" },
                    { id: "campus_id", label: "Campus Card", icon: "wallet", desc: `Bal: ₹${mockCampusCardBalance}` },
                    { id: "card", label: "Debit/Credit", icon: "credit-card", desc: "Visa / RuPay" },
                    { id: "netbanking", label: "NetBanking", icon: "bank", desc: "SBI / HDFC / ICICI" },
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setSelectedMethod(m.id as PaymentMethod)}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                        selectedMethod === m.id
                          ? "bg-[#18181B] text-white border-[#18181B] shadow-md -translate-y-0.5"
                          : "bg-white text-[#18181B] border-[#EDE8C8] hover:bg-[#FAF7F0]"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <AppIcon
                          name={m.icon}
                          size={16}
                          className={selectedMethod === m.id ? "text-[#84CC16]" : "text-[#71717A]"}
                        />
                        {selectedMethod === m.id && (
                          <span className="w-2 h-2 rounded-full bg-[#84CC16]"></span>
                        )}
                      </div>
                      <p className="font-extrabold text-xs">{m.label}</p>
                      <p
                        className={`text-[10px] mt-0.5 ${
                          selectedMethod === m.id ? "text-[#A1A1AA]" : "text-[#71717A]"
                        }`}
                      >
                        {m.desc}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* ─── TAB 1: UPI ─── */}
              {selectedMethod === "upi" && (
                <div className="bg-[#FAF7F0] border border-[#EFE8D6] rounded-2xl p-4 space-y-3.5">
                  <div className="flex items-center justify-between border-b border-[#E8DFC8] pb-2.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-[#18181B]">UPI Mode:</span>
                      <div className="flex bg-white rounded-xl p-0.5 border border-[#EDE8C8]">
                        <button
                          type="button"
                          onClick={() => setUpiMode("id")}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-all ${
                            upiMode === "id"
                              ? "bg-[#18181B] text-white shadow-2xs"
                              : "text-[#71717A] hover:text-[#18181B]"
                          }`}
                        >
                          VPA / UPI ID
                        </button>
                        <button
                          type="button"
                          onClick={() => setUpiMode("qr")}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold cursor-pointer transition-all ${
                            upiMode === "qr"
                              ? "bg-[#18181B] text-white shadow-2xs"
                              : "text-[#71717A] hover:text-[#18181B]"
                          }`}
                        >
                          Dynamic QR Code
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-[10.5px] font-extrabold text-[#166534] bg-[#DCFCE7] px-2 py-0.5 rounded-full">
                      <span>✓ 0% Gateway Fees</span>
                    </div>
                  </div>

                  {upiMode === "id" ? (
                    <div className="space-y-2">
                      <label className="font-bold text-[#18181B] text-[11px] block">
                        Enter Student UPI VPA ID
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="username@okhdfcbank"
                          className="w-full pl-3.5 pr-20 py-2.5 bg-white border border-[#EDE8C8] rounded-xl text-xs font-bold text-[#18181B] focus:outline-none focus:ring-2 focus:ring-[#84CC16]"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-extrabold text-[#16A34A]">
                          VERIFIED
                        </span>
                      </div>

                      {/* Quick Autocomplete Chips */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        <span className="text-[10px] text-[#71717A] font-semibold">Quick select:</span>
                        {[
                          "student@oksbi",
                          "anaya@okaxis",
                          "campus.pay@paytm",
                          "thakur.engg@okhdfcbank",
                        ].map((vpa) => (
                          <button
                            key={vpa}
                            type="button"
                            onClick={() => setUpiId(vpa)}
                            className="px-2 py-0.5 rounded-lg bg-white border border-[#E8DFC8] text-[10px] font-medium text-[#52525B] hover:text-[#18181B] hover:border-[#18181B] cursor-pointer"
                          >
                            {vpa}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    /* Mock Dynamic QR View */
                    <div className="text-center py-2 space-y-2">
                      <div className="relative w-36 h-36 mx-auto bg-white p-2.5 rounded-2xl border-2 border-dashed border-[#84CC16] shadow-2xs flex flex-col items-center justify-center">
                        <AppIcon name="qr-code" size={96} className="text-[#18181B]" />
                        <div className="absolute inset-x-2 top-0 h-0.5 bg-gradient-to-r from-transparent via-[#84CC16] to-transparent animate-pulse"></div>
                      </div>
                      <p className="text-[11px] font-bold text-[#18181B]">
                        Scan via Google Pay, PhonePe, or Paytm
                      </p>
                      <p className="text-[10.5px] text-[#71717A]">
                        QR expires in: <strong className="text-[#DC2626]">{formatTimer(qrTimer)}</strong>
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* ─── TAB 2: CAMPUS CARD (STUDENT SMART ID) ─── */}
              {selectedMethod === "campus_id" && (
                <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] text-white rounded-2xl p-4.5 space-y-4 shadow-lg border border-[#334155]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#84CC16] text-[#18181B] flex items-center justify-center font-black text-xs">
                        CC
                      </div>
                      <div>
                        <p className="text-xs font-bold tracking-tight">THAKUR CAMPUS SMART ID</p>
                        <p className="text-[9.5px] text-[#94A3B8]">Autonomous Student Debit Ledger</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-extrabold bg-[#16A34A]/20 text-[#4ADE80] border border-[#16A34A]/40 px-2 py-0.5 rounded-full">
                      ACTIVE
                    </span>
                  </div>

                  <div className="py-1">
                    <p className="text-[10px] text-[#94A3B8] uppercase tracking-wider">Available Card Balance</p>
                    <p className="text-2xl font-black text-white">₹{mockCampusCardBalance.toLocaleString()}</p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-[#CBD5E1] pt-2 border-t border-white/10">
                    <div>
                      <span>Student: </span>
                      <strong className="text-white">Anaya Sharma</strong>
                    </div>
                    <div>
                      <span>Roll No: </span>
                      <strong className="text-white">TCET-2023-CS-089</strong>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── TAB 3: DEBIT / CREDIT CARD ─── */}
              {selectedMethod === "card" && (
                <div className="bg-[#FAF7F0] border border-[#EFE8D6] rounded-2xl p-4 space-y-3">
                  <div>
                    <label className="font-bold text-[#18181B] text-[11px] block mb-1">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      value={cardHolder}
                      onChange={(e) => setCardHolder(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-[#EDE8C8] rounded-xl text-xs font-bold text-[#18181B]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-[#18181B] text-[11px] block mb-1">
                      Card Number (Simulated)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full pl-3 pr-10 py-2 bg-white border border-[#EDE8C8] rounded-xl text-xs font-bold text-[#18181B] tracking-wider"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 font-black text-[10px] text-[#2563EB]">
                        VISA
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-[#18181B] text-[11px] block mb-1">
                        Expiry (MM/YY)
                      </label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-[#EDE8C8] rounded-xl text-xs font-bold text-[#18181B]"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-[#18181B] text-[11px] block mb-1">
                        CVV / CVC
                      </label>
                      <input
                        type="password"
                        value={cardCvv}
                        maxLength={3}
                        onChange={(e) => setCardCvv(e.target.value)}
                        className="w-full px-3 py-2 bg-white border border-[#EDE8C8] rounded-xl text-xs font-bold text-[#18181B]"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ─── TAB 4: NET BANKING ─── */}
              {selectedMethod === "netbanking" && (
                <div className="bg-[#FAF7F0] border border-[#EFE8D6] rounded-2xl p-4 space-y-3">
                  <label className="font-bold text-[#18181B] text-[11px] block">
                    Select University Partner Bank:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "sbi", name: "State Bank of India", code: "SBI" },
                      { id: "hdfc", name: "HDFC Bank", code: "HDFC" },
                      { id: "icici", name: "ICICI Bank", code: "ICICI" },
                      { id: "axis", name: "Axis Bank", code: "AXIS" },
                    ].map((bank) => (
                      <button
                        key={bank.id}
                        type="button"
                        onClick={() => setSelectedBank(bank.id)}
                        className={`p-2.5 rounded-xl border text-left font-bold text-xs transition-all cursor-pointer flex items-center justify-between ${
                          selectedBank === bank.id
                            ? "bg-[#18181B] text-white border-[#18181B]"
                            : "bg-white text-[#18181B] border-[#EDE8C8] hover:bg-[#F3EFE3]"
                        }`}
                      >
                        <span>{bank.name}</span>
                        <span className="text-[10px] opacity-75">{bank.code}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* ─── Escrow Security Assurance Card ─── */}
              <div className="p-3 bg-[#F0FDF4] border border-[#BBF7D0] rounded-2xl flex items-start gap-2.5">
                <span className="text-base text-[#16A34A] flex-shrink-0">🔐</span>
                <div className="text-[11px] text-[#166534] space-y-0.5">
                  <p className="font-bold">Automated Escrow Refund Guarantee:</p>
                  <p className="text-[10.5px] leading-relaxed opacity-90">
                    ₹{securityDeposit} security deposit is held in a neutral campus escrow account. It will be credited back automatically to your account as soon as the lender confirms the return inspection.
                  </p>
                </div>
              </div>

              {/* ─── Pay Button ─── */}
              <button
                type="button"
                onClick={handlePayNow}
                className="w-full py-4 bg-gradient-to-b from-[#7FB634] to-[#689A24] text-white font-black text-sm rounded-2xl shadow-md hover:from-[#8AC538] hover:to-[#72A627] border-b-2 border-[#557F1C] active:translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Authorize &amp; Pay ₹{totalPayable}</span>
                <span>→</span>
              </button>
            </>
          )}

          {/* STEP 2: PROCESSING ANIMATION */}
          {paymentStep === "processing" && (
            <div className="py-12 px-4 text-center space-y-6 animate-fadeIn">
              <div className="relative w-20 h-20 mx-auto">
                <div className="absolute inset-0 rounded-full border-4 border-[#EDE8C8] animate-pulse"></div>
                <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#84CC16] animate-spin"></div>
                <div className="absolute inset-3 rounded-full bg-[#FAF7F0] flex items-center justify-center font-black text-xl text-[#18181B]">
                  💳
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-black text-[#18181B]">Authorizing Escrow Deposit</h3>
                <p className="text-xs text-[#52525B] max-w-sm mx-auto leading-relaxed">
                  {processingStatus}
                </p>
              </div>

              {/* Progress Bar */}
              <div className="max-w-xs mx-auto">
                <div className="w-full bg-[#E4E4E7] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#84CC16] to-[#16A34A] h-full transition-all duration-500 rounded-full"
                    style={{ width: `${processingProgress}%` }}
                  ></div>
                </div>
                <p className="text-[10px] font-bold text-[#71717A] mt-1.5">
                  {processingProgress}% Completed • Campus Banking Secure Node
                </p>
              </div>
            </div>
          )}

          {/* STEP 3: SUCCESS & RECEIPT */}
          {paymentStep === "success" && receiptData && (
            <div className="py-4 space-y-4 animate-fadeIn">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 bg-[#DCFCE7] text-[#15803D] rounded-full flex items-center justify-center text-2xl mx-auto shadow-xs">
                  ✓
                </div>
                <h3 className="text-lg font-black text-[#18181B]">Escrow Payment Authorized!</h3>
                <p className="text-xs text-[#52525B]">
                  Your borrow request and escrow bond have been activated successfully.
                </p>
              </div>

              {/* Printable Official Escrow Receipt Card */}
              <div className="bg-[#FAF7F0] border border-[#EFE8D6] rounded-2xl p-4.5 space-y-3 relative overflow-hidden print:p-0 print:border-none">
                <div className="flex items-center justify-between border-b border-[#E8DFC8] pb-2.5">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-[#71717A]">Official Escrow Voucher</span>
                    <h4 className="font-black text-xs text-[#18181B]">{receiptData.transactionId}</h4>
                  </div>
                  <span className="text-[10px] font-extrabold bg-[#DCFCE7] text-[#166534] px-2 py-0.5 rounded-full border border-[#BBF7D0]">
                    BOND SECURED
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-[#52525B]">
                  <div>
                    <span>Item: </span>
                    <strong className="text-[#18181B] block truncate">{receiptData.itemTitle}</strong>
                  </div>
                  <div>
                    <span>Lender: </span>
                    <strong className="text-[#18181B] block truncate">{receiptData.ownerName}</strong>
                  </div>
                  <div>
                    <span>Method: </span>
                    <strong className="text-[#18181B] block">{receiptData.paymentMethod}</strong>
                  </div>
                  <div>
                    <span>Auth Code: </span>
                    <strong className="text-[#18181B] block font-mono">{receiptData.authCode}</strong>
                  </div>
                </div>

                {/* Financial breakdown */}
                <div className="bg-white p-3 rounded-xl border border-[#EDE8C8] space-y-1 text-[11px]">
                  <div className="flex justify-between text-[#71717A]">
                    <span>Rental Charge ({durationDays} days):</span>
                    <span className="font-bold text-[#18181B]">₹{receiptData.rentalFee}</span>
                  </div>
                  <div className="flex justify-between text-[#71717A]">
                    <span>Campus Platform Fee:</span>
                    <span className="font-bold text-[#18181B]">₹{receiptData.platformFee}</span>
                  </div>
                  <div className="flex justify-between text-[#166534] font-bold">
                    <span>Refundable Deposit (Locked in Escrow):</span>
                    <span>₹{receiptData.escrowDeposit}</span>
                  </div>
                  <div className="border-t border-[#E8DFC8] pt-1.5 flex justify-between font-black text-xs text-[#18181B]">
                    <span>Total Amount Paid:</span>
                    <span className="text-[#15803D] text-sm">₹{receiptData.paidAmount}</span>
                  </div>
                </div>

                <div className="text-[10px] text-[#71717A] flex items-center justify-between pt-1">
                  <span>{receiptData.timestamp}</span>
                  <span>TCET Student Circular Trust</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    type="button"
                    onClick={handlePrintReceipt}
                    className="flex-1 py-3 bg-gradient-to-b from-[#7FB634] to-[#689A24] text-white font-bold text-xs rounded-xl shadow-xs hover:from-[#8AC538] hover:to-[#72A627] border-b-2 border-[#557F1C] active:translate-y-0.5 cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>🖨️ Print Official Tally Bill</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsTallyModalOpen(true)}
                    className="py-3 px-4 bg-white hover:bg-[#FAF7F0] border border-[#EDE8C8] text-[#18181B] font-bold text-xs rounded-xl transition-all shadow-2xs cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <AppIcon name="receipt" size={14} />
                    <span>Preview Bill</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadReceipt}
                    className="py-3 px-3 bg-[#FAF7F0] hover:bg-[#F3EFE3] border border-[#EDE8C8] text-[#18181B] font-bold text-xs rounded-xl transition-all shadow-2xs cursor-pointer flex items-center justify-center gap-1"
                    title="Download Standalone Invoice HTML"
                  >
                    <span>⬇ Save</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="w-full py-3 bg-[#18181B] hover:bg-[#27272A] text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer flex items-center justify-center gap-1.5 transition-all"
                >
                  <span>Track in Lifecycle Tracker →</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ─── Tally Bill Preview Modal ─────────────────────────── */}
      <TallyBillModal
        isOpen={isTallyModalOpen}
        onClose={() => setIsTallyModalOpen(false)}
        billData={receiptData ? getTallyBillData() : null}
      />
    </div>
  );
}
