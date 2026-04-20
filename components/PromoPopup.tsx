'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PromoPopup() {
  const [isOpen, setIsOpen] = useState(false);

  // Tự động mở popup sau khi load trang 2 giây
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-end md:items-center justify-center p-0 md:p-4">
          
          {/* Lớp nền mờ (Click để đóng) */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#003046]/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* 💻 GIAO DIỆN DESKTOP (Popup Modal giữa màn hình) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative hidden md:flex bg-[#E53935] rounded-3xl w-full max-w-3xl flex-row overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] z-10"
          >
            {/* Nút Tắt (X) */}
            <button 
              onClick={() => setIsOpen(false)}
              // 📱 MỚI 4: Gắn active:scale-95
              className="absolute top-4 right-4 z-50 w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#E53935] font-black hover:scale-110 active:scale-95 transition-transform shadow-md"
            >
              ✕
            </button>

            {/* Nền trang trí */}
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>

            {/* Cột trái: Chữ và Ưu đãi */}
            <div className="relative z-10 w-3/5 p-10 flex flex-col justify-center text-white">
              <div className="font-black text-2xl mb-4 tracking-tighter">octo<span className="text-[#FDB714]">.</span></div>
              <h2 className="text-3xl font-black mb-4 leading-tight uppercase">Khai giảng các lớp <br /> trong tháng 4</h2>
              <p className="text-sm font-bold mb-2 opacity-90">Đăng ký ngay hôm nay</p>
              <p className="text-sm font-medium mb-1">để nhận học bổng lên đến</p>
              <div className="text-7xl font-black text-white drop-shadow-md leading-none mb-1">30%</div>
              <p className="text-sm font-bold mb-8 opacity-90">từ SANTA OCTO.</p>
              <a 
                href="https://www.facebook.com/hp.octo" target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)}
                // 📱 MỚI 4: Gắn active:scale-95
                className="inline-block w-fit bg-[#003046] border-2 border-[#60CBED] text-white font-black text-sm px-8 py-3 rounded-full hover:bg-[#60CBED] hover:text-[#003046] active:scale-95 transition-all shadow-lg uppercase tracking-wider"
              >
                Đến ngay
              </a>
            </div>

            {/* Cột phải: Hình ảnh */}
            <div className="relative z-10 w-2/5 bg-gradient-to-t from-[#c62828] to-transparent">
              <img src="https://octo.vn/img_data/images/hinhanh/Web%20teen%204.png" alt="Santa Octo Promo" className="w-full h-full object-cover opacity-90 mix-blend-luminosity" />
            </div>
          </motion.div>


          {/* 📱 MỚI 1: GIAO DIỆN MOBILE (Bottom Sheet) */}
          <motion.div 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, { offset, velocity }) => {
              if (offset.y > 100 || velocity.y > 500) setIsOpen(false); // Vuốt xuống để tắt
            }}
            className="relative md:hidden w-full bg-[#E53935] rounded-t-[2.5rem] flex flex-col overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.3)] z-10 pt-4"
          >
            {/* Thanh vuốt ngang (Handle) */}
            <div className="w-12 h-1.5 bg-white/50 rounded-full mx-auto mb-4 cursor-grab active:cursor-grabbing relative z-20" />

            {/* Nút Tắt (X) cho Mobile */}
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 z-50 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white font-black active:scale-90 transition-transform backdrop-blur-sm"
            >
              ✕
            </button>

            {/* Nền trang trí */}
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>

            <div className="relative z-10 w-full p-8 pt-4 flex flex-col justify-center text-white text-center">
              <div className="font-black text-xl mb-4 tracking-tighter opacity-80">octo<span className="text-[#FDB714]">.</span></div>
              <h2 className="text-2xl font-black mb-3 leading-tight uppercase">Khai giảng <br /> tháng 4</h2>
              <p className="text-xs font-bold mb-1 opacity-90">Nhận học bổng lên đến</p>
              <div className="text-6xl font-black text-[#FDB714] drop-shadow-md leading-none mb-2">30%</div>
              <p className="text-[10px] font-bold mb-8 opacity-70 tracking-widest">TỪ SANTA OCTO.</p>
              <a 
                href="https://www.facebook.com/hp.octo" target="_blank" rel="noopener noreferrer" onClick={() => setIsOpen(false)}
                // 📱 MỚI 4: Gắn active:scale-95
                className="block w-full bg-[#003046] border-2 border-[#60CBED] text-white font-black text-sm py-4 rounded-2xl active:scale-95 transition-all shadow-lg uppercase tracking-wider"
              >
                Nhận ưu đãi ngay
              </a>
            </div>
          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
}