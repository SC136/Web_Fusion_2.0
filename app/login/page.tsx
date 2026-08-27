"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AppNavbar from "@/app/components/layout/AppNavbar";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate login and navigate to dashboard
    setTimeout(() => {
      router.push("/dashboard");
    }, 400);
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

          {/* Sound Burst SVG Icon */}
          <div className="absolute left-[150px] lg:left-[190px] bottom-[95px] lg:bottom-[120px] z-30 text-[#18181B]">
            <svg width="26" height="26" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 18 L9 10 L14 19 L19 9 L24 16" />
            </svg>
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
          <div className="absolute left-[9%] top-[19%] w-[66.5%] h-[73%] flex flex-col items-center justify-between text-center px-4 sm:px-6 py-2 z-20 overflow-hidden">
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
                Welcome back to Campus Circular!
              </p>

              {/* Green Wavy Line Accent */}
              <div className="flex justify-center mb-1 sm:mb-2">
                <svg width="32" height="5" viewBox="0 0 34 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M1 3C3.5 1 6.5 5 9 3C11.5 1 14.5 5 17 3C19.5 1 22.5 5 25 3C27.5 1 30.5 5 33 3"
                    stroke="#84CC16"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>

            {/* Login Form Inputs & Actions */}
            <form onSubmit={handleSubmit} className="w-full space-y-1.5 sm:space-y-2">
              {/* Campus Email Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#71717A]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <input
                  id="login-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Campus Email"
                  className="w-full pl-8 pr-3 py-1.5 sm:py-2 rounded-full bg-white/95 border border-[#E4E4E7] text-[11px] sm:text-xs text-[#18181B] placeholder:text-[#A1A1AA] focus:outline-none focus:ring-2 focus:ring-[#84CC16] focus:border-transparent transition-all shadow-2xs"
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#71717A]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full pl-8 pr-8 py-1.5 sm:py-2 rounded-full bg-white/95 border border-[#E4E4E7] text-[11px] sm:text-xs text-[#18181B] placeholder:text-[#A1A1AA] focus:outline-none focus:ring-2 focus:ring-[#84CC16] focus:border-transparent transition-all shadow-2xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#71717A] hover:text-[#18181B] transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                      <line x1="2" x2="22" y1="2" y2="22" />
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Forgot Password Link */}
              <div className="flex justify-end pr-1 -mt-0.5">
                <Link
                  href="#"
                  className="text-[9px] sm:text-[10px] font-semibold text-[#65A30D] hover:text-[#4D7C0F] transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Log in Button */}
              <button
                type="submit"
                id="login-submit-btn"
                disabled={loading}
                className="w-full py-2 sm:py-2.5 bg-[#8DBF43] hover:bg-[#7EAC3B] active:bg-[#729C34] text-[#18181B] font-bold text-xs sm:text-sm rounded-full transition-all duration-150 shadow-xs hover:shadow-sm cursor-pointer flex items-center justify-center"
              >
                {loading ? "Logging in..." : "Log in"}
              </button>

              {/* Divider */}
              <div className="relative flex items-center justify-center py-0.5">
                <div className="w-full border-t border-[#E4E4E7]" />
                <span className="absolute bg-white/90 px-2 text-[9px] text-[#71717A] uppercase font-semibold">
                  or
                </span>
              </div>

              {/* University SSO Button */}
              <button
                type="button"
                onClick={() => router.push("/dashboard")}
                id="login-sso-btn"
                className="w-full py-1.5 sm:py-2 bg-white/95 hover:bg-white border border-[#E4E4E7] text-[#18181B] font-semibold text-[11px] sm:text-xs rounded-full transition-all duration-150 shadow-2xs hover:shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#52525B]">
                  <path d="M3 21h18M3 10h18M5 10v11M19 10v11M9 10v11M15 10v11M12 2l10 5H2l10-5z" />
                </svg>
                <span>Log in with University SSO</span>
              </button>
            </form>

            {/* Sign Up Footer Link */}
            <p className="text-[10px] sm:text-[11px] text-[#52525B] font-medium pt-1">
              Don&apos;t have an account?{" "}
              <Link href="#" className="font-bold text-[#65A30D] hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
