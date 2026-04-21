'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Trang chủ.', path: '/' },
    { name: 'Về chúng tôi.', path: '/ve-chung-toi' },
    { name: 'Khóa học.', path: '/khoa-hoc' },
    { name: 'Tin tức.', path: '/tin-tuc' },
    { name: 'Liên hệ.', path: '/lien-he' },
  ];

  const checkActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname?.startsWith(path);
  };

  return (
    <>
      {/* ═══ NAVBAR CHÍNH (GIỮ NGUYÊN GIAO DIỆN DESKTOP) ═══ */}
      <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-xl backdrop-saturate-150 border-b border-[#60CBED]/20 shadow-[0_20px_40px_rgba(0,48,70,0.05)] py-2' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-5 h-14 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity active:scale-95 md:hover:scale-105 duration-300">
            <img src="https://octo.vn/img_data/images/logo/Logo_Main.png" alt="Octo." className="h-10 w-auto drop-shadow-md" />
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => {
              const isActive = checkActive(link.path);
              return (
                <li key={link.path}>
                  <Link 
                    href={link.path} 
                    className={`relative text-[13px] uppercase tracking-[0.1em] font-black transition-all duration-300 group pb-1
                      ${isActive ? 'text-[#60CBED]' : 'text-[#003046] hover:text-[#60CBED]'}`}
                  >
                    {link.name}
                    {/* Hiệu ứng gạch chân */}
                    <span className={`absolute left-0 -bottom-1 h-[2px] rounded-full bg-[#60CBED] transition-all duration-300 ${isActive ? 'w-full shadow-[0_0_8px_#60CBED]' : 'w-0 group-hover:w-full'}`}></span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Nút CTA Desktop */}
          <Link href="/#register" className="hidden md:inline-flex active:scale-95 bg-[#FDB714] text-[#003046] font-black py-3 px-8 rounded-full hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(253,183,20,0.4)] transition-all text-xs tracking-[0.15em] uppercase">
            Học thử miễn phí.
          </Link>

          {/* Hamburger Button (Mobile) - 📱 MỚI 4: Thêm Haptic active:scale-90 */}
          <button 
            className="md:hidden w-10 h-10 flex flex-col justify-center items-end gap-1.5 p-1 z-[101] relative group active:scale-90 transition-transform" 
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Mở Menu"
          >
            <span className="block h-[3px] bg-[#003046] rounded-full w-7 transition-all duration-300"></span>
            <span className="block h-[3px] bg-[#003046] rounded-full w-5 transition-all duration-300"></span>
            <span className="block h-[3px] bg-[#003046] rounded-full w-7 transition-all duration-300"></span>
          </button>
        </div>
      </nav>

      {/* 📱 MỚI 1: BOTTOM SHEET THAY THẾ CHO MOBILE MENU XỔ XUỐNG CŨ */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[9999] flex justify-end flex-col md:hidden">
            
            {/* Backdrop làm mờ phần nền */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#003046]/40 backdrop-blur-sm" 
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Khay trượt (Bottom Sheet) vuốt nam châm */}
            <motion.div 
              initial={{ y: "100%" }} 
              animate={{ y: 0 }} 
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              drag="y" // Cho phép kéo vuốt tay
              dragConstraints={{ top: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, { offset, velocity }) => {
                if (offset.y > 100 || velocity.y > 500) setIsMobileMenuOpen(false); // Kéo xuống tắt
              }}
              className="bg-white rounded-t-[2.5rem] p-6 pb-12 relative z-10 flex flex-col shadow-[0_-20px_50px_rgba(0,48,70,0.2)]"
            >
              {/* Nút Handle (Cục xám nhỏ) chỉ báo có thể kéo */}
              <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-8 cursor-grab active:cursor-grabbing shrink-0" />
              
              <h4 className="text-[#5a7a8a] text-[10px] font-bold uppercase tracking-widest mb-6 px-2">Điều hướng Octo.</h4>

              {/* Danh sách Links */}
              <div className="flex flex-col gap-2" onPointerDown={(e) => e.stopPropagation()}>
                {navLinks.map((link) => {
                  const isActive = checkActive(link.path);
                  return (
                    <Link 
                      key={link.path}
                      href={link.path} 
                      onClick={() => setIsMobileMenuOpen(false)} 
                      // 📱 MỚI 4: Gắn active:scale-95 cho chuẩn cảm giác bấm
                      className={`flex items-center justify-between p-4 rounded-2xl font-black text-lg active:scale-95 transition-all
                        ${isActive ? 'bg-[#60CBED]/10 text-[#003046] shadow-sm' : 'bg-transparent text-[#5a7a8a] hover:bg-gray-50'}`}
                    >
                      <span className="flex items-center gap-3">
                        {link.name}
                      </span>
                      {isActive && <span className="text-[#60CBED] text-2xl leading-none animate-bounce-slow">🐙</span>}
                    </Link>
                  );
                })}
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}