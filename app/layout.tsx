import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import MobileBottomNav from "@/app/components/dashboard/MobileBottomNav";
import { AppProvider } from "@/app/context/AppContext";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Campus Circular — Share, Borrow & Build Trust on Campus",
  description:
    "Discover, share, and borrow resources within your campus. Save money, build trust, and make the most of what we already have.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col pb-16 lg:pb-0">
        <AppProvider>
          {children}
          <MobileBottomNav />
        </AppProvider>
      </body>
    </html>
  );
}
