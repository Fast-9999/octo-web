'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
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
      {/* 💡 ĐÃ FIX: z-[100] và Kính mờ siêu thực (backdrop-saturate-150) */}
      <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-xl backdrop-saturate-150 border-b border-[#60CBED]/20 shadow-[0_20px_40px_rgba(0,48,70,0.05)] py-2' : 'bg-transparent py-4'}`}>
        <div className="max-w-7xl mx-auto px-5 h-14 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity hover:scale-105 duration-300">
            <img src="https://octo.vn/img_data/images/logo/logo.png" alt="Octo." className="h-10 w-auto drop-shadow-md" />
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

          {/* Nút CTA */}
          <Link href="/#register" className="hidden md:inline-flex bg-[#FDB714] text-[#003046] font-black py-3 px-8 rounded-full hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(253,183,20,0.4)] transition-all text-xs tracking-[0.15em] uppercase">
            Học thử miễn phí.
          </Link>

          {/* 💡 ĐÃ FIX: Hamburger Button (z-[101] và h-[3px]) */}
          <button className="md:hidden w-10 h-10 flex flex-col justify-center items-end gap-1.5 p-1 z-[101] relative group" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <span className={`block h-[3px] bg-[#003046] rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'w-7 rotate-45 translate-y-2.5' : 'w-7 group-hover:w-8'}`}></span>
            <span className={`block h-[3px] bg-[#003046] rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0 translate-x-3' : 'w-5 group-hover:w-8'}`}></span>
            <span className={`block h-[3px] bg-[#003046] rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'w-7 -rotate-45 -translate-y-2' : 'w-7 group-hover:w-8'}`}></span>
          </button>
        </div>
      </nav>

      {/* 💡 ĐÃ FIX: Mobile Menu (z-[99] và layout cao cấp hơn) */}
      <div className={`fixed inset-0 top-0 bg-[#f8fcfd] z-[99] p-8 pt-32 flex flex-col gap-2 transition-transform duration-700 ease-[cubic-bezier(0.25,0.4,0,1)] md:hidden shadow-2xl ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Họa tiết trang trí */}
        <div className="absolute -bottom-20 -right-10 text-[#60CBED] opacity-5 text-[20rem] rotate-12 select-none pointer-events-none">🐙</div>

        {navLinks.map((link, index) => {
          const isActive = checkActive(link.path);
          return (
            <Link 
              key={link.path}
              href={link.path} 
              onClick={() => setIsMobileMenuOpen(false)} 
              className={`block py-5 font-black text-3xl border-b border-[#60CBED]/10 transition-all duration-500
                ${isActive ? 'text-[#60CBED] translate-x-2' : 'text-[#003046] hover:text-[#60CBED] hover:translate-x-2'}`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className="flex items-center justify-between">
                {link.name}
                {isActive && <span className="text-[#60CBED] text-2xl animate-pulse">🐙</span>}
              </div>
            </Link>
          );
        })}
        
        <div className="mt-auto pb-10">
          <p className="text-[#5a7a8a] text-[10px] font-bold uppercase tracking-widest mb-4 text-center">Bắt đầu hành trình mới</p>
          <Link href="/#register" onClick={() => setIsMobileMenuOpen(false)} className="block bg-[#FDB714] text-[#003046] font-black py-5 rounded-2xl text-center shadow-[0_15px_30px_rgba(253,183,20,0.3)] hover:shadow-[0_20px_40px_rgba(253,183,20,0.5)] transition-all text-sm uppercase tracking-widest">
            Đăng ký học thử ngay!
          </Link>
        </div>
      </div>
    </>
  );
}