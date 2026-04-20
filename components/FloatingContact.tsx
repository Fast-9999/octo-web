'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Hiệu ứng tự động đóng Menu khi click ra ngoài vùng trống
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="fixed bottom-8 right-5 md:right-8 z-[9999]" ref={menuRef}>
      
      {/* ═══ MENU BUNG RA KHI CLICK (Kính mờ Godly) ═══ */}
      <div 
        className={`absolute bottom-20 right-0 bg-white/95 backdrop-blur-xl backdrop-saturate-150 rounded-[2rem] shadow-[0_20px_50px_rgba(0,48,70,0.15)] border border-white/50 p-3 w-72 transition-all duration-500 origin-bottom-right 
        ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-4 pointer-events-none'}`}
      >
        <div className="flex flex-col gap-2">
          
          {/* Nút Messenger */}
          <a 
            href="https://www.messenger.com/t/105637972440422/?messaging_source=source%3Apages%3Amessage_shortlink&source_id=1441792&recurring_notification=0" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-4 p-3 rounded-2xl hover:bg-[#f0faff] transition-colors group"
          >
            <div className="w-10 h-10 shrink-0 rounded-[1rem] bg-gradient-to-tr from-[#0084FF] to-[#00C6FF] flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-300">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.145 2 11.26c0 2.923 1.558 5.485 3.993 7.155.195.133.326.35.342.584l.115 1.704c.046.685.787 1.107 1.395.795l1.986-1.02a1.08 1.08 0 0 1 .801-.067A10.74 10.74 0 0 0 12 20.52c5.523 0 10-4.145 10-9.26S17.523 2 12 2zm1.096 12.35l-2.61-2.784a.978.978 0 0 0-1.424-.044l-3.328 3.328c-.42.42.18.995.631.576l2.61-2.784a.978.978 0 0 1 1.424.044l3.328 3.328c.42.42-.18-.995-.631-.576z"/></svg>
            </div>
            <span className="text-[#003046] text-sm font-black tracking-tight group-hover:text-[#0084FF] transition-colors">Nhắn tin Messenger.</span>
          </a>

          {/* Nút Zalo */}
          <a 
            href="https://zalo.me/0909964296" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-4 p-3 rounded-2xl hover:bg-[#f0faff] transition-colors group"
          >
            <div className="w-10 h-10 shrink-0 rounded-[1rem] bg-gradient-to-tr from-[#0068FF] to-[#0090FF] flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-300">
              <span className="font-black text-[12px] tracking-widest mt-0.5">ZALO</span>
            </div>
            <span className="text-[#003046] text-sm font-black tracking-tight group-hover:text-[#0068FF] transition-colors">Chat qua Zalo.</span>
          </a>

          {/* Nút Hotline (Đã thay bằng SVG sang trọng) */}
          <a 
            href="tel:0909964296" 
            className="flex items-center gap-4 p-3 rounded-2xl hover:bg-[#f0faff] transition-colors group"
          >
            <div className="w-10 h-10 shrink-0 rounded-[1rem] bg-gradient-to-tr from-[#FDB714] to-yellow-400 flex items-center justify-center text-[#003046] shadow-md group-hover:scale-110 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.48-4.18-7.076-7.076l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
              </svg>
            </div>
            <div>
              <div className="text-[#5a7a8a] text-[10px] font-bold uppercase tracking-widest mb-0.5">Hotline hỗ trợ</div>
              <div className="text-[#003046] text-sm font-black tracking-tight group-hover:text-[#FDB714] transition-colors">0909 964 296.</div>
            </div>
          </a>

        </div>
      </div>

      {/* ═══ NÚT GỌI TỔNG (MAIN BUTTON) ═══ */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-[60px] h-[60px] rounded-full flex items-center justify-center shadow-[0_15px_30px_rgba(96,203,237,0.4)] transition-all duration-500 relative hover:scale-110 hover:shadow-[0_20px_40px_rgba(96,203,237,0.5)] z-10
        ${isOpen ? 'bg-[#003046] text-white rotate-90 shadow-[0_15px_30px_rgba(0,48,70,0.3)]' : 'bg-gradient-to-br from-[#60CBED] to-[#0080a0] text-white'}`}
      >
        {/* Vòng chớp nháy siêu mượt */}
        {!isOpen && <span className="absolute inset-0 rounded-full border-2 border-[#60CBED] animate-ping opacity-40"></span>}
        
        {/* Đổi Icon giữa Đóng (X) và Gọi (Điện thoại SVG) */}
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${isOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.48-4.18-7.076-7.076l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
          </svg>
        </div>

        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      </button>

    </div>
  );
}