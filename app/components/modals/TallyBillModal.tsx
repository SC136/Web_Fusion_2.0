"use client";

import { AppIcon } from "@/app/components/dashboard/Icons";
import {
  TallyBillData,
  printOfficialTallyBill,
  downloadOfficialTallyBill,
  numberToWords,
} from "@/app/utils/printBill";

interface TallyBillModalProps {
  isOpen: boolean;
  onClose: () => void;
  billData: TallyBillData | null;
}

export default function TallyBillModal({
  isOpen,
  onClose,
  billData,
}: TallyBillModalProps) {
  if (!isOpen || !billData) return null;

  const words = numberToWords(billData.totalAmount);
  const currentTime =
    billData.time ||
    new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 select-none animate-fadeIn overflow-y-auto">
      <div className="bg-white rounded-3xl border border-[#EDE8C8] max-w-3xl w-full shadow-2xl overflow-hidden flex flex-col my-auto max-h-[96vh]">
        {/* Top Modal Bar */}
        <div className="px-6 py-4 bg-[#FAF7F0] border-b border-[#EDE8C8] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#18181B] text-[#84CC16] flex items-center justify-center font-black text-sm">
              <AppIcon name="receipt" size={16} />
            </div>
            <div>
              <h3 className="text-sm font-black text-[#18181B]">
                Official Institutional Tally Bill Voucher
              </h3>
              <p className="text-[11px] text-[#71717A]">
                Voucher No: <strong className="font-mono text-[#18181B]">{billData.voucherNo}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => printOfficialTallyBill(billData)}
              className="px-3.5 py-1.5 bg-gradient-to-b from-[#7FB634] to-[#689A24] text-white font-bold text-xs rounded-xl shadow-xs hover:from-[#8AC538] hover:to-[#72A627] border-b-2 border-[#557F1C] active:translate-y-0.5 cursor-pointer flex items-center gap-1.5"
            >
              <span>🖨️ Print / Save PDF</span>
            </button>

            <button
              type="button"
              onClick={() => downloadOfficialTallyBill(billData)}
              className="px-3 py-1.5 bg-white hover:bg-[#F3EFE3] border border-[#EDE8C8] text-[#18181B] font-bold text-xs rounded-xl transition-all shadow-2xs cursor-pointer flex items-center gap-1.5"
            >
              <span>⬇ Download</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white hover:bg-[#F3EFE3] border border-[#EDE8C8] text-[#71717A] flex items-center justify-center cursor-pointer transition-all ml-1"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Scrollable Bill Content */}
        <div className="p-5 sm:p-7 overflow-y-auto bg-[#F9F7F1]">
          <div className="bg-white border-2 border-[#18181B] p-6 rounded-xl shadow-sm text-xs font-mono text-[#18181B] space-y-4">
            {/* College Header */}
            <div className="text-center border-b-2 border-[#18181B] pb-3 space-y-0.5">
              <h2 className="text-base font-black tracking-wide uppercase">
                THAKUR COLLEGE OF ENGINEERING &amp; TECHNOLOGY
              </h2>
              <h3 className="text-xs font-bold text-[#18181B]">
                CAMPUS CIRCULAR P2P ESCROW CLEARING HOUSE
              </h3>
              <p className="text-[10px] text-[#52525B]">
                Autonomous Institute Affiliated to University of Mumbai • Approved by AICTE
              </p>
              <p className="text-[10px] text-[#52525B]">
                Shyamnarayan Thakur Marg, Thakur Village, Kandivali (E), Mumbai - 400101
              </p>
              <div className="inline-block border border-[#18181B] px-3 py-0.5 font-black text-[11px] mt-1.5 bg-[#FAF7F0]">
                TAX INVOICE &amp; ESCROW BOND VOUCHER
              </div>
            </div>

            {/* Bill Metadata Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-b border-[#18181B] pb-3 text-[11px]">
              <div className="space-y-1">
                <div>
                  <span className="text-[#71717A]">Voucher / Bill No: </span>
                  <strong className="font-bold">{billData.voucherNo}</strong>
                </div>
                <div>
                  <span className="text-[#71717A]">Transaction Ref ID: </span>
                  <strong className="font-bold">{billData.transactionId}</strong>
                </div>
                <div>
                  <span className="text-[#71717A]">Escrow Auth Code: </span>
                  <strong className="font-bold">{billData.authCode}</strong>
                </div>
              </div>

              <div className="space-y-1 sm:text-right">
                <div>
                  <span className="text-[#71717A]">Date &amp; Time: </span>
                  <strong>{billData.date} • {currentTime}</strong>
                </div>
                <div>
                  <span className="text-[#71717A]">Payment Mode: </span>
                  <strong>{billData.paymentMethod}</strong>
                </div>
                <div>
                  <span className="text-[#71717A]">Escrow Status: </span>
                  <strong className="text-[#16A34A]">{billData.status}</strong>
                </div>
              </div>
            </div>

            {/* Parties Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 border border-[#18181B] bg-[#FAF7F0] text-[11px]">
              <div className="p-3 border-b sm:border-b-0 sm:border-r border-[#18181B] space-y-0.5">
                <p className="font-black underline uppercase text-[10px] text-[#52525B]">
                  BILLED TO (BORROWER):
                </p>
                <p className="font-bold text-xs">{billData.borrowerName}</p>
                <p>Roll: {billData.borrowerRoll || "TCET-2023-CS-089"}</p>
                <p>Dept: {billData.borrowerDept || "3rd Year, Computer Engg"}</p>
              </div>

              <div className="p-3 space-y-0.5">
                <p className="font-black underline uppercase text-[10px] text-[#52525B]">
                  BENEFICIARY LENDER (PROVIDER):
                </p>
                <p className="font-bold text-xs">{billData.ownerName}</p>
                <p>Dept: {billData.ownerDept || "Campus Verified Lender"}</p>
                <p>Disbursement: Escrow Smart Wallet</p>
              </div>
            </div>

            {/* Tally Itemized Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-[#18181B] text-[11px]">
                <thead>
                  <tr className="bg-[#EAE5D9] border-b border-[#18181B]">
                    <th className="border border-[#18181B] p-2 text-center w-8">#</th>
                    <th className="border border-[#18181B] p-2 text-left">Particulars / Description</th>
                    <th className="border border-[#18181B] p-2 text-center w-16">HSN</th>
                    <th className="border border-[#18181B] p-2 text-center w-16">Duration</th>
                    <th className="border border-[#18181B] p-2 text-right w-20">Rate</th>
                    <th className="border border-[#18181B] p-2 text-right w-24">Amount (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-[#18181B] p-2 text-center">1</td>
                    <td className="border border-[#18181B] p-2">
                      <strong>{billData.itemTitle}</strong>
                      <p className="text-[10px] text-[#71717A]">Peer Borrowing Charge</p>
                    </td>
                    <td className="border border-[#18181B] p-2 text-center">9973</td>
                    <td className="border border-[#18181B] p-2 text-center">{billData.durationDays} Days</td>
                    <td className="border border-[#18181B] p-2 text-right">₹{billData.dailyRate}</td>
                    <td className="border border-[#18181B] p-2 text-right">₹{billData.rentalFee}</td>
                  </tr>

                  <tr>
                    <td className="border border-[#18181B] p-2 text-center">2</td>
                    <td className="border border-[#18181B] p-2">
                      <strong>Refundable Security Deposit</strong>
                      <p className="text-[10px] text-[#71717A]">Locked in Safe Vault #08 (100% Refundable)</p>
                    </td>
                    <td className="border border-[#18181B] p-2 text-center">9997</td>
                    <td className="border border-[#18181B] p-2 text-center">Bond</td>
                    <td className="border border-[#18181B] p-2 text-right">₹{billData.securityDeposit}</td>
                    <td className="border border-[#18181B] p-2 text-right">₹{billData.securityDeposit}</td>
                  </tr>

                  <tr>
                    <td className="border border-[#18181B] p-2 text-center">3</td>
                    <td className="border border-[#18181B] p-2">
                      <strong>Campus Circular Platform Tech Fee</strong>
                      <p className="text-[10px] text-[#71717A]">Campus Sustainability &amp; Tree Fund</p>
                    </td>
                    <td className="border border-[#18181B] p-2 text-center">9983</td>
                    <td className="border border-[#18181B] p-2 text-center">1 Txn</td>
                    <td className="border border-[#18181B] p-2 text-right">₹{billData.platformFee}</td>
                    <td className="border border-[#18181B] p-2 text-right">₹{billData.platformFee}</td>
                  </tr>

                  {billData.damageDeduction ? (
                    <tr className="text-[#DC2626]">
                      <td className="border border-[#18181B] p-2 text-center">4</td>
                      <td className="border border-[#18181B] p-2">
                        <strong>Inspection Damage Deduction</strong>
                      </td>
                      <td className="border border-[#18181B] p-2 text-center">--</td>
                      <td className="border border-[#18181B] p-2 text-center">Claim</td>
                      <td className="border border-[#18181B] p-2 text-right">-₹{billData.damageDeduction}</td>
                      <td className="border border-[#18181B] p-2 text-right">-₹{billData.damageDeduction}</td>
                    </tr>
                  ) : null}

                  <tr className="bg-[#FAF7F0] font-bold border-t-2 border-[#18181B]">
                    <td colSpan={5} className="border border-[#18181B] p-2 text-right">Sub-Total:</td>
                    <td className="border border-[#18181B] p-2 text-right">₹{billData.rentalFee + billData.securityDeposit + billData.platformFee}</td>
                  </tr>

                  <tr className="bg-[#EAE5D9] font-black text-xs border-2 border-[#18181B]">
                    <td colSpan={5} className="border border-[#18181B] p-2 text-right uppercase">
                      GRAND TOTAL AMOUNT:
                    </td>
                    <td className="border border-[#18181B] p-2 text-right text-sm">
                      ₹{billData.totalAmount}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Amount in words */}
            <div className="border border-dashed border-[#18181B] p-2.5 bg-[#FAF7F0] text-[11px]">
              <span className="text-[#71717A]">Amount in Words: </span>
              <strong className="font-bold">{words}</strong>
            </div>

            {/* Stamp & Signatory */}
            <div className="grid grid-cols-2 pt-2 items-end">
              <div>
                <div className="border-2 border-dashed border-[#16A34A] text-[#16A34A] px-3 py-1.5 inline-block text-center rounded-lg font-black text-[10px]">
                  ★ TCET VERIFIED ★<br />
                  SMART ESCROW CLEARING<br />
                  <span className="text-[8px] font-normal">{billData.authCode}</span>
                </div>
              </div>

              <div className="text-right space-y-1">
                <div className="border-t border-[#18181B] inline-block w-36 pt-1 text-center font-bold text-[10px]">
                  Authorized Signatory<br />
                  <span className="text-[8px] font-normal text-[#71717A]">Campus Circular Switch</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#FAF7F0] border-t border-[#EDE8C8] flex justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 bg-white hover:bg-[#F3EFE3] border border-[#EDE8C8] text-[#18181B] font-bold text-xs rounded-xl cursor-pointer"
          >
            Close
          </button>
          <button
            type="button"
            onClick={() => downloadOfficialTallyBill(billData)}
            className="px-4 py-2.5 bg-[#18181B] hover:bg-[#27272A] text-white font-bold text-xs rounded-xl cursor-pointer"
          >
            Download Invoice (.html)
          </button>
          <button
            type="button"
            onClick={() => printOfficialTallyBill(billData)}
            className="px-5 py-2.5 bg-gradient-to-b from-[#7FB634] to-[#689A24] text-white hover:from-[#8AC538] hover:to-[#72A627] font-bold text-xs rounded-xl shadow-xs border-b-2 border-[#557F1C] active:translate-y-0.5 cursor-pointer flex items-center gap-1.5"
          >
            <span>🖨️ Print / Save Official PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
}
