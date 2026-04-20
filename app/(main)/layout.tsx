import React from 'react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
// 💡 BƯỚC 1: Gọi em nó về
import FloatingContact from "@/components/FloatingContact"; 

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      
      <div className="min-h-screen">
        {children}
      </div>
      
      <Footer />
      
      {/* 💡 BƯỚC 2: Hiển thị em nó ở góc màn hình */}
      <FloatingContact />
    </>
  );
}