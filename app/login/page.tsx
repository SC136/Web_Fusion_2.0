"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AppNavbar from "@/app/components/layout/AppNavbar";
import { useApp } from "@/app/context/AppContext";
import { AppIcon } from "@/app/components/dashboard/Icons";

export default function LoginPage() {
  const router = useRouter();
  const { allUsers, switchUser } = useApp();
  const [email, setEmail] = useState("anaya.sharma@campuscircular.edu");
  const [password, setPassword] = useState("••••••••");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 300);
  };

  const handleQuickLogin = (userId: string) => {
    switchUser(userId);
    router.push("/dashboard");
  };

  return (
    <div className="w-full h-screen h-[100dvh] max-h-screen overflow-hidden flex flex-col justify-between bg-[#FBF7F0] select-none">
      {/* ─── UNIFIED TOP NAVBAR ───────────────────────────────── */}
      <AppNavbar variant="guest" />

      {/* ─── MAIN CONTENT AREA ────────────────────────────────── */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 flex items-center justify-center relative min-h-0">
        {/* ─── LEFT MASCOTS CLUSTER (Bottom Left) ─────────────── */}
        <div className="absolute left-2 lg:left-6 bottom-0 hidden md:flex items-end gap-0 pointer-events-none z-10">
          {/* Books with Camera */}
          <div className="relative w-[130px] lg:w-[170px] h-[130px] lg:h-[170px] -mr-8 z-20">
            <Image
              src="/mascots/books_camera.png"
              alt="Books and camera"
              fill
              className="object-contain object-bottom"
              priority
            />
          </div>

          {/* Tall Yellow Character */}
          <div className="relative w-[85px] lg:w-[110px] h-[170px] lg:h-[220px] -mr-6 z-10">
            <Image
              src="/mascots/yellow_tall.png"
              alt="Tall clay character"
              fill
              className="object-contain object-bottom"
              priority
            />
          </div>

          {/* Green Radio Robot Head */}
          <div className="relative w-[75px] lg:w-[95px] h-[110px] lg:h-[140px] z-20">
            <Image
              src="/mascots/green_radio.png"
              alt="Green radio robot mascot"
              fill
              className="object-contain object-bottom"
              priority
            />
          </div>
        </div>

        {/* ─── CENTER LOGIN CARD WITH PEEKING CHARACTER ───────── */}
        <div className="relative w-full max-w-[580px] lg:max-w-[650px] aspect-[1374/1145] max-h-[82vh] flex items-center justify-center">
          {/* Background Clay Card Image with Peeking Character */}
          <Image
            src="/login_card.png"
            alt="Clay login card frame"
            fill
            className="object-contain object-center pointer-events-none drop-shadow-xl"
            priority
          />

          {/* Form Content Overlay accurately confined inside the white clay board */}
          <div className="absolute left-[10%] top-[17%] w-[64%] h-[75%] flex flex-col items-center justify-between text-center px-4 sm:px-6 py-2 z-20 overflow-hidden">
            {/* Top Heading Group */}
            <div className="flex flex-col items-center w-full">
              {/* LOG IN Title in Pixelify Sans */}
              <h1
                id="login-title"
                className="text-2xl sm:text-3xl lg:text-[2rem] font-bold text-[#18181B] tracking-normal leading-tight"
                style={{ fontFamily: "'Pixelify Sans', monospace" }}
              >
                LOG IN
              </h1>

              {/* Subtitle */}
              <p className="text-[10px] sm:text-[11px] lg:text-xs text-[#52525B] font-medium mt-0.5 mb-1 truncate max-w-full">
                Select account or sign in to Campus Circular!
              </p>

              {/* Quick Demo Switcher Strip */}
              <div className="flex items-center gap-1.5 justify-center py-1 w-full overflow-x-auto scrollbar-none">
                {allUsers.slice(0, 3).map((u) => (
                  <button
                    key={u.id}
                    type="button"
                    onClick={() => handleQuickLogin(u.id)}
                    className="px-2.5 py-1 bg-[#F5F8E9] hover:bg-[#EAF5DA] border border-[#D8E8B8] rounded-xl text-[10px] font-bold text-[#2E5E1C] flex items-center gap-1 transition-all cursor-pointer shadow-2xs whitespace-nowrap"
                    title={`Login as ${u.fullName}`}
                  >
                    <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
                    <span>{u.name} ({u.id === "u1" ? "Borrower" : "Lender"})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Login Form Inputs & Actions */}
            <form onSubmit={handleSubmit} className="w-full space-y-2">
              {/* Campus Email Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#71717A]">
                  <AppIcon name="mail" size={14} />
                </div>
                <input
                  id="login-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Campus Email"
                  className="w-full pl-9 pr-3 py-2 rounded-2xl bg-[#FBF9F4] border border-[#E5E0D5] text-xs text-[#18181B] placeholder:text-[#9C9588] focus:outline-none focus:ring-2 focus:ring-[#7FB634] focus:bg-white transition-all shadow-[inset_0_1px_3px_rgba(0,0,0,0.06)]"
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#71717A]">
                  <AppIcon name="shield-check" size={14} />
                </div>
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full pl-9 pr-9 py-2 rounded-2xl bg-[#FBF9F4] border border-[#E5E0D5] text-xs text-[#18181B] placeholder:text-[#9C9588] focus:outline-none focus:ring-2 focus:ring-[#7FB634] focus:bg-white transition-all shadow-[inset_0_1px_3px_rgba(0,0,0,0.06)]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#71717A] hover:text-[#18181B] transition-colors cursor-pointer"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <AppIcon name={showPassword ? "eye" : "shield-check"} size={13} />
                </button>
              </div>

              {/* Log in Button */}
              <button
                type="submit"
                id="login-submit-btn"
                disabled={loading}
                className="w-full py-2.5 sm:py-3 bg-gradient-to-b from-[#7FB634] to-[#689A24] hover:from-[#8AC538] hover:to-[#72A627] text-white font-black text-xs sm:text-[13.5px] rounded-2xl transition-all duration-150 shadow-[0_4px_12px_rgba(104,154,36,0.3),inset_0_1px_1px_rgba(255,255,255,0.4)] border-b-2 border-[#547C1C] active:translate-y-0.5 active:shadow-[0_2px_6px_rgba(104,154,36,0.2)] cursor-pointer flex items-center justify-center tracking-wide"
              >
                {loading ? "Logging in..." : "Log in to Campus Circular"}
              </button>

              {/* University SSO Button */}
              <button
                type="button"
                onClick={() => router.push("/dashboard")}
                id="login-sso-btn"
                className="w-full py-2 sm:py-2.5 bg-white hover:bg-[#FAF9F5] border border-[#DDD6C8] text-[#18181B] font-bold text-[11px] sm:text-xs rounded-2xl transition-all duration-150 shadow-[0_2px_8px_rgba(0,0,0,0.04),inset_0_1px_1px_rgba(255,255,255,0.8)] border-b-2 border-[#CCC4B4] active:translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
              >
                <AppIcon name="shield-check" size={14} className="text-[#65A30D]" />
                <span>Log in with University SSO</span>
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
