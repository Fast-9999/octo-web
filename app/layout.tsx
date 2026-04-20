import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import SmoothScrolling from "@/components/SmoothScrolling"; // 💡 IMPORT COMPONENT LENIS VÀO ĐÂY

const notoSans = Noto_Sans({ 
  subsets: ["vietnamese"],
  weight: ['400', '600', '700', '900'],
  variable: '--font-noto-sans',
});

export const metadata: Metadata = {
  title: "Octo. English",
  description: "Ngoại ngữ toàn diện. Môi trường thật chill.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="scroll-smooth" data-scroll-behavior="smooth">
      <body className={`${notoSans.variable} font-sans text-[#003046] antialiased relative`}>
        
        {/* 💡 BỌC TOÀN BỘ APP BẰNG SMOOTH SCROLLING */}
        <SmoothScrolling>
          {/* Chỉ giữ lại children, KHÔNG CÒN Navbar hay Footer ở đây nữa */}
          {children}
        </SmoothScrolling>
        
      </body>
    </html>
  );
}
