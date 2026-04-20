'use client';

import React, { useState, useEffect } from 'react';

export default function PromoPopup() {
  const [isOpen, setIsOpen] = useState(false);

  // Tự động mở popup sau khi load trang 2 giây
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-99999 flex items-center justify-center p-4">
      {/* Lớp nền mờ */}
      <div 
        className="absolute inset-0 bg-[#003046]/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Nội dung Popup */}
      <div className="relative bg-[#E53935] rounded-3xl w-full max-w-3xl flex flex-col md:flex-row overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] animate-fade-in-up">
        
        {/* Nút Tắt (X) */}
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 z-50 w-8 h-8 bg-white rounded-full flex items-center justify-center text-[#E53935] font-black hover:scale-110 transition-transform shadow-md"
        >
          ✕
        </button>

        {/* Nền trang trí Giáng sinh (Tuyết rơi) */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>

        {/* Cột trái: Chữ và Ưu đãi */}
        <div className="relative z-10 w-full md:w-3/5 p-8 md:p-10 flex flex-col justify-center text-white">
          <div className="font-black text-2xl mb-4 tracking-tighter">octo<span className="text-[#FDB714]">.</span></div>
          
          <h2 className="text-2xl md:text-3xl font-black mb-4 leading-tight uppercase">
            Khai giảng các lớp <br /> trong tháng 4
          </h2>
          
          <p className="text-sm font-bold mb-2 opacity-90">Đăng ký ngay hôm nay</p>
          <p className="text-sm font-medium mb-1">để nhận học bổng lên đến</p>
          
          <div className="text-7xl font-black text-white drop-shadow-md leading-none mb-1">
            30%
          </div>
          <p className="text-sm font-bold mb-8 opacity-90">từ SANTA OCTO.</p>

          {/* Nút bấm dẫn qua Fanpage Facebook */}
          <a 
            href="https://www.facebook.com/hp.octo" 
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="inline-block w-fit bg-[#003046] border-2 border-[#60CBED] text-white font-black text-sm px-8 py-3 rounded-full hover:bg-[#60CBED] hover:text-[#003046] transition-all shadow-lg uppercase tracking-wider"
          >
            Đến ngay
          </a>
        </div>

        {/* Cột phải: Hình ảnh */}
        <div className="relative z-10 w-full md:w-2/5 hidden md:block bg-linear-to-t from-[#c62828] to-transparent">
          <img 
            src="https://octo.vn/img_data/images/hinhanh/Web%20teen%204.png" 
            alt="Santa Octo Promo" 
            className="w-full h-full object-cover opacity-90 mix-blend-luminosity"
          />
        </div>

      </div>
    </div>
  );
}