"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AppIcon } from "@/app/components/dashboard/Icons";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("admin@campuscircular.edu");
  const [password, setPassword] = useState("••••••••");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/admin");
  };

  return (
    <div className="min-h-screen bg-[#FBF7F0] text-[#18181B] flex flex-col items-center justify-center p-6 relative select-none overflow-hidden">
      {/* Top Left Logo */}
      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2.5 group">
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#3B82F6] via-[#10B981] to-[#84CC16] p-[2px] flex items-center justify-center shadow-xs">
          <div className="w-full h-full bg-[#FBF7F0] rounded-full flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
            </svg>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-[11px] font-black tracking-tight text-[#18181B] leading-none">CAMPUS</span>
          <span className="text-[11px] font-black tracking-tight text-[#18181B] leading-none">CIRCULAR</span>
        </div>
      </Link>

      {/* Center Container */}
      <div className="w-full max-w-sm flex flex-col items-center z-10">
        {/* Logo */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#3B82F6] via-[#10B981] to-[#84CC16] p-[2.5px] flex items-center justify-center mb-3">
          <div className="w-full h-full bg-[#FBF7F0] rounded-full flex items-center justify-center">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <div className="relative mb-6 text-center">
          <h1
            className="text-2xl sm:text-3xl font-bold text-[#18181B]"
            style={{ fontFamily: "'Pixelify Sans', monospace" }}
          >
            Admin Login
          </h1>
          <svg className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-24" height="6" viewBox="0 0 100 6" fill="none">
            <path d="M2 3.5C25 1.5 75 1.5 98 4" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>

        {/* Form Card */}
        <form
          onSubmit={handleSubmit}
          className="w-full bg-white rounded-3xl border border-[#EDE8C8] p-6 shadow-md space-y-4"
        >
          {/* Username Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#9CA3AF]">
              <AppIcon name="user" size={17} />
            </div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Admin Username or Email"
              className="w-full pl-10 pr-4 py-3 bg-white border border-[#E5E7EB] rounded-2xl text-xs sm:text-sm text-[#18181B] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#84CC16]"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#9CA3AF]">
              <AppIcon name="shield-check" size={17} />
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full pl-10 pr-4 py-3 bg-white border border-[#E5E7EB] rounded-2xl text-xs sm:text-sm text-[#18181B] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#84CC16]"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-[#18181B] hover:bg-[#27272A] text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
          >
            <span>Enter Admin Panel</span>
            <span className="text-base">→</span>
          </button>

          {/* Forgot Password */}
          <div className="text-center pt-1">
            <button
              type="button"
              className="text-xs text-[#71717A] hover:text-[#18181B] hover:underline cursor-pointer"
            >
              Forgot Password?
            </button>
          </div>
        </form>
      </div>

      {/* Mascot at bottom left */}
      <div className="absolute left-6 bottom-4 hidden lg:flex items-end gap-3 pointer-events-none">
        <div className="relative w-44 h-44">
          <Image
            src="/mascots/admin_laptop.png"
            alt="Admin Laptop Mascot"
            fill
            className="object-contain object-bottom"
          />
        </div>
        {/* Speech Bubble */}
        <div className="bg-[#D1E7B7] text-[#1E4E1C] border border-[#B8D996] px-3.5 py-2 rounded-2xl rounded-bl-none text-xs font-bold shadow-xs -mb-3">
          Let&apos;s keep the campus circular! 💻
        </div>
      </div>
    </div>
  );
}
