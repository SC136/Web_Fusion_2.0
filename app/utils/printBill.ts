export interface TallyBillData {
  voucherNo: string;
  transactionId: string;
  authCode: string;
  date: string;
  time?: string;
  borrowerName: string;
  borrowerDept?: string;
  borrowerRoll?: string;
  ownerName: string;
  ownerDept?: string;
  itemTitle: string;
  category?: string;
  durationDays: number;
  dailyRate: number;
  rentalFee: number;
  platformFee: number;
  securityDeposit: number;
  totalAmount: number;
  paymentMethod: string;
  status: "LOCKED_IN_ESCROW" | "SETTLED_REFUNDED" | "PAID_COMPLETED";
  refundAmount?: number;
  damageDeduction?: number;
  utrNumber?: string;
}

// Convert numbers to Indian Rupees in words
export function numberToWords(amount: number): string {
  const a = [
    "",
    "One ",
    "Two ",
    "Three ",
    "Four ",
    "Five ",
    "Six ",
    "Seven ",
    "Eight ",
    "Nine ",
    "Ten ",
    "Eleven ",
    "Twelve ",
    "Thirteen ",
    "Fourteen ",
    "Fifteen ",
    "Sixteen ",
    "Seventeen ",
    "Eighteen ",
    "Nineteen ",
  ];
  const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

  const num = Math.floor(amount);
  if (num === 0) return "Zero Rupees Only";

  function inWords(n: number): string {
    if (n < 20) return a[n];
    const digit = n % 10;
    if (n < 100) return b[Math.floor(n / 10)] + (digit ? " " + a[digit] : " ");
    if (n < 1000) return a[Math.floor(n / 100)] + "Hundred " + (n % 100 ? "and " + inWords(n % 100) : "");
    if (n < 100000) return inWords(Math.floor(n / 1000)) + "Thousand " + (n % 1000 ? inWords(n % 1000) : "");
    if (n < 10000000) return inWords(Math.floor(n / 100000)) + "Lakh " + (n % 100000 ? inWords(n % 100000) : "");
    return inWords(Math.floor(n / 10000000)) + "Crore " + (n % 10000000 ? inWords(n % 10000000) : "");
  }

  return `Indian Rupees ${inWords(num).trim()} Only`;
}

export function generateTallyBillHTML(data: TallyBillData): string {
  const words = numberToWords(data.totalAmount);
  const currentTime = data.time || new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Voucher_${data.voucherNo}</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 12mm 15mm;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: 'Courier New', Courier, monospace, 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
    body {
      background-color: #f5f5f5;
      color: #111;
      padding: 20px;
      font-size: 12px;
      line-height: 1.35;
    }
    .bill-wrapper {
      max-width: 800px;
      margin: 0 auto;
      background: #fff;
      border: 2px solid #111;
      padding: 16px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    }
    .header {
      text-align: center;
      border-bottom: 2px solid #111;
      padding-bottom: 10px;
      margin-bottom: 10px;
    }
    .header h1 {
      font-size: 16px;
      font-weight: 900;
      letter-spacing: 1px;
      text-transform: uppercase;
    }
    .header h2 {
      font-size: 13px;
      font-weight: 700;
      margin: 3px 0;
    }
    .header p {
      font-size: 10.5px;
      color: #333;
    }
    .badge-title {
      display: inline-block;
      border: 1.5px solid #111;
      padding: 3px 12px;
      font-weight: 900;
      font-size: 12px;
      margin-top: 6px;
      letter-spacing: 0.5px;
      background: #fafafa;
    }
    .meta-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      border-bottom: 1.5px solid #111;
      padding-bottom: 8px;
      margin-bottom: 8px;
      font-size: 11.5px;
    }
    .meta-col {
      padding: 0 4px;
    }
    .meta-row {
      display: flex;
      margin-bottom: 3px;
    }
    .meta-label {
      width: 140px;
      font-weight: bold;
      color: #333;
    }
    .meta-val {
      flex: 1;
      font-weight: 600;
    }
    .parties-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      border: 1px solid #111;
      margin-bottom: 10px;
      background: #fafafa;
    }
    .party-box {
      padding: 8px 10px;
    }
    .party-box:first-child {
      border-right: 1px solid #111;
    }
    .party-title {
      font-weight: 900;
      font-size: 11px;
      text-decoration: underline;
      margin-bottom: 4px;
      text-transform: uppercase;
    }
    .tally-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 10px;
      font-size: 11.5px;
    }
    .tally-table th {
      border: 1px solid #111;
      padding: 6px 8px;
      background: #eee;
      font-weight: 900;
      text-align: left;
    }
    .tally-table td {
      border: 1px solid #111;
      padding: 6px 8px;
      vertical-align: top;
    }
    .text-right {
      text-align: right;
    }
    .text-center {
      text-align: center;
    }
    .total-row td {
      font-weight: 900;
      background: #fafafa;
      border-top: 2px solid #111;
    }
    .grand-total-row td {
      font-weight: 900;
      font-size: 13px;
      background: #eee;
      border: 2px solid #111;
    }
    .words-box {
      border: 1px dashed #111;
      padding: 6px 10px;
      margin-bottom: 10px;
      background: #fdfdfd;
      font-size: 11px;
    }
    .words-box strong {
      font-size: 11.5px;
    }
    .terms {
      font-size: 9.5px;
      border-top: 1px solid #111;
      padding-top: 6px;
      margin-bottom: 10px;
      color: #333;
    }
    .terms ol {
      padding-left: 16px;
    }
    .terms li {
      margin-bottom: 2px;
    }
    .footer-grid {
      display: grid;
      grid-template-columns: 1.5fr 1fr 1fr;
      align-items: end;
      border-top: 1.5px solid #111;
      padding-top: 8px;
      font-size: 10px;
    }
    .stamp-box {
      border: 1.5px dashed #166534;
      color: #166534;
      padding: 6px;
      text-align: center;
      font-weight: 900;
      border-radius: 6px;
      display: inline-block;
      background: #f0fdf4;
    }
    .sign-box {
      text-align: right;
    }
    .sign-line {
      border-top: 1px solid #111;
      display: inline-block;
      width: 140px;
      margin-top: 25px;
      padding-top: 2px;
      font-weight: bold;
      text-align: center;
    }
    .print-controls {
      max-width: 800px;
      margin: 0 auto 16px auto;
      display: flex;
      gap: 10px;
      justify-content: flex-end;
    }
    .print-btn {
      background: #84CC16;
      color: #18181B;
      border: 1px solid #65A30D;
      padding: 8px 18px;
      font-weight: bold;
      border-radius: 8px;
      cursor: pointer;
      font-size: 12px;
    }
    .print-btn:hover {
      background: #65A30D;
      color: #fff;
    }
    .close-btn {
      background: #fff;
      color: #333;
      border: 1px solid #ccc;
      padding: 8px 14px;
      font-weight: bold;
      border-radius: 8px;
      cursor: pointer;
      font-size: 12px;
    }
    @media print {
      body {
        background: #fff;
        padding: 0;
      }
      .print-controls {
        display: none !important;
      }
      .bill-wrapper {
        border: 2px solid #000;
        box-shadow: none;
        max-width: 100%;
      }
    }
  </style>
</head>
<body>
  <div class="print-controls">
    <button class="print-btn" onclick="window.print()">🖨️ Print / Save as PDF</button>
    <button class="close-btn" onclick="window.close()">✕ Close</button>
  </div>

  <div class="bill-wrapper">
    <!-- Header -->
    <div class="header">
      <h1>THAKUR COLLEGE OF ENGINEERING &amp; TECHNOLOGY</h1>
      <h2>CAMPUS CIRCULAR P2P ESCROW CLEARING HOUSE</h2>
      <p>Autonomous Institute Affiliated to University of Mumbai • Approved by AICTE &amp; Govt of Maharashtra</p>
      <p>A-Block, Thakur Educational Campus, Shyamnarayan Thakur Marg, Kandivali (E), Mumbai - 400101</p>
      <p>Campus Escrow Node: <strong>#TCET-ESCROW-08</strong> | Clearing Switch ID: <strong>CC-SWITCH-MUM-400101</strong></p>
      <div class="badge-title">OFFICIAL TAX INVOICE &amp; ESCROW BOND VOUCHER</div>
    </div>

    <!-- Metadata Grid -->
    <div class="meta-grid">
      <div class="meta-col">
        <div class="meta-row">
          <span class="meta-label">Voucher / Bill No:</span>
          <span class="meta-val"><strong>${data.voucherNo}</strong></span>
        </div>
        <div class="meta-row">
          <span class="meta-label">Transaction Ref ID:</span>
          <span class="meta-val font-mono">${data.transactionId}</span>
        </div>
        <div class="meta-row">
          <span class="meta-label">Escrow Auth Code:</span>
          <span class="meta-val font-mono">${data.authCode}</span>
        </div>
        <div class="meta-row">
          <span class="meta-label">UTR / Channel Hash:</span>
          <span class="meta-val font-mono">${data.utrNumber || "UTR-ESC-" + Math.floor(100000 + Math.random() * 900000)}</span>
        </div>
      </div>
      <div class="meta-col">
        <div class="meta-row">
          <span class="meta-label">Date &amp; Time:</span>
          <span class="meta-val">${data.date} • ${currentTime}</span>
        </div>
        <div class="meta-row">
          <span class="meta-label">Payment Mode:</span>
          <span class="meta-val">${data.paymentMethod}</span>
        </div>
        <div class="meta-row">
          <span class="meta-label">Escrow Status:</span>
          <span class="meta-val"><strong>${data.status === "LOCKED_IN_ESCROW" ? "HELD IN ESCROW VAULT" : data.status === "SETTLED_REFUNDED" ? "SETTLED & REFUNDED" : "COMPLETED"}</strong></span>
        </div>
        <div class="meta-row">
          <span class="meta-label">Place of Supply:</span>
          <span class="meta-val">Campus Intranet (MH-27)</span>
        </div>
      </div>
    </div>

    <!-- Parties Grid -->
    <div class="parties-grid">
      <div class="party-box">
        <div class="party-title">BILLED TO (BORROWER)</div>
        <p><strong>${data.borrowerName}</strong></p>
        <p>Roll No: <strong>${data.borrowerRoll || "TCET-2023-CS-089"}</strong></p>
        <p>Department: ${data.borrowerDept || "3rd Year, Computer Engg"}</p>
        <p>Campus Trust Badge: Verified Student (Level 2)</p>
      </div>
      <div class="party-box">
        <div class="party-title">BENEFICIARY LENDER (PROVIDER)</div>
        <p><strong>${data.ownerName}</strong></p>
        <p>Department: ${data.ownerDept || "Campus Verified Lender"}</p>
        <p>Node ID: ESC-LEND-${Math.floor(100 + Math.random() * 900)}</p>
        <p>Disbursement Channel: Campus Smart Wallet</p>
      </div>
    </div>

    <!-- Tally Itemized Table -->
    <table class="tally-table">
      <thead>
        <tr>
          <th style="width: 35px;" class="text-center">Sr.</th>
          <th>Particulars / Description of Resource</th>
          <th style="width: 70px;" class="text-center">HSN/SAC</th>
          <th style="width: 70px;" class="text-center">Duration</th>
          <th style="width: 80px;" class="text-right">Rate (₹)</th>
          <th style="width: 95px;" class="text-right">Amount (₹)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="text-center">1</td>
          <td>
            <strong>${data.itemTitle}</strong><br>
            <span style="font-size: 10px; color: #555;">Category: ${data.category || "Campus Verified Equipment"} • Peer Rental Share</span>
          </td>
          <td class="text-center">9973</td>
          <td class="text-center">${data.durationDays} Days</td>
          <td class="text-right">₹${data.dailyRate.toFixed(2)}</td>
          <td class="text-right">₹${data.rentalFee.toFixed(2)}</td>
        </tr>
        <tr>
          <td class="text-center">2</td>
          <td>
            <strong>Refundable Escrow Security Deposit</strong><br>
            <span style="font-size: 10px; color: #555;">Locked in Campus Vault #08 • 100% Refundable upon inspection</span>
          </td>
          <td class="text-center">9997</td>
          <td class="text-center">Bond</td>
          <td class="text-right">₹${data.securityDeposit.toFixed(2)}</td>
          <td class="text-right">₹${data.securityDeposit.toFixed(2)}</td>
        </tr>
        <tr>
          <td class="text-center">3</td>
          <td>
            <strong>Campus Circular Technology &amp; Green Fund Fee</strong><br>
            <span style="font-size: 10px; color: #555;">Includes dispute protection &amp; student tree credit indexing</span>
          </td>
          <td class="text-center">9983</td>
          <td class="text-center">1 Txn</td>
          <td class="text-right">₹${data.platformFee.toFixed(2)}</td>
          <td class="text-right">₹${data.platformFee.toFixed(2)}</td>
        </tr>
        <tr>
          <td class="text-center">4</td>
          <td>
            <strong>Institutional GST / Campus Cess (CGST + SGST)</strong><br>
            <span style="font-size: 10px; color: #555;">Student Non-Profit Peer Exchange Exemption #TCET-CIR-2026</span>
          </td>
          <td class="text-center">--</td>
          <td class="text-center">0%</td>
          <td class="text-right">₹0.00</td>
          <td class="text-right">₹0.00</td>
        </tr>

        ${data.damageDeduction ? `
        <tr style="color: #b91c1c;">
          <td class="text-center">5</td>
          <td>
            <strong>Inspection Damage Assessment Deduction</strong><br>
            <span style="font-size: 10px;">Deduction applied during Stage 7 handover verification</span>
          </td>
          <td class="text-center">--</td>
          <td class="text-center">1 Claim</td>
          <td class="text-right">-₹${data.damageDeduction.toFixed(2)}</td>
          <td class="text-right">-₹${data.damageDeduction.toFixed(2)}</td>
        </tr>
        ` : ""}

        <tr class="total-row">
          <td colspan="5" class="text-right"><strong>Sub-Total Amount (INR):</strong></td>
          <td class="text-right">₹${(data.rentalFee + data.securityDeposit + data.platformFee).toFixed(2)}</td>
        </tr>

        <tr class="grand-total-row">
          <td colspan="5" class="text-right"><strong>GRAND TOTAL PAYABLE / BOND (INR):</strong></td>
          <td class="text-right"><strong>₹${data.totalAmount.toFixed(2)}</strong></td>
        </tr>
      </tbody>
    </table>

    <!-- Amount in Words -->
    <div class="words-box">
      <strong>Amount Chargeable (in words):</strong> ${words}
    </div>

    <!-- Terms and Conditions -->
    <div class="terms">
      <strong>TERMS &amp; ESCROW PROTOCOL CONDITIONS:</strong>
      <ol>
        <li>The security deposit is held in a cryptographically isolated escrow account (Node #TCET-ESCROW-08) until physical return verification.</li>
        <li>Borrower must present the authentic Handover OTP generated in the Campus Circular portal at physical exchange.</li>
        <li>100% of the security deposit will be automatically unlocked and transferred to the borrower's chosen destination at Stage 8 upon pristine inspection.</li>
        <li>Disputes are mediated autonomously by the Campus Equipment Trustee Board within 24 hours.</li>
      </ol>
    </div>

    <!-- Signatures & Official Seal -->
    <div class="footer-grid">
      <div>
        <div class="stamp-box">
          ★ TCET VERIFIED ★<br>
          SMART ESCROW CLEARING<br>
          <span style="font-size: 8px; font-weight: normal;">HASH: ${data.authCode}</span>
        </div>
      </div>
      <div style="font-size: 9.5px; color: #555; text-align: center;">
        <p>E. &amp; O. E.</p>
        <p>Digitally signed via Campus Intranet</p>
      </div>
      <div class="sign-box">
        <div class="sign-line">
          Authorized Signatory<br>
          <span style="font-size: 8px; font-weight: normal; color: #555;">Campus Circular Switch</span>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;
}

/**
 * Prints the isolated official Tally Bill in a dedicated print window
 */
export function printOfficialTallyBill(data: TallyBillData) {
  if (typeof window === "undefined") return;

  const html = generateTallyBillHTML(data);
  const printWindow = window.open("", "_blank", "width=850,height=900");
  if (!printWindow) {
    alert("Please allow popups to print the official bill voucher.");
    return;
  }

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();

  // Focus and trigger print after styles load
  printWindow.focus();
  setTimeout(() => {
    printWindow.print();
  }, 350);
}

/**
 * Downloads the official Tally Bill as a standalone .html tax invoice
 */
export function downloadOfficialTallyBill(data: TallyBillData) {
  if (typeof window === "undefined") return;

  const html = generateTallyBillHTML(data);
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Bill_Voucher_${data.voucherNo.replace(/[^a-zA-Z0-9_-]/g, "_")}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
