'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // 📱 MỚI 5: State cho Smart Contextual FAB
  const [isFabVisible, setIsFabVisible] = useState(true);
  const lastScrollY = useRef(0);

  // Logic nhận diện vuốt tay để ẩn/hiện Nút liên hệ
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 100) {
        setIsFabVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        // Đang vuốt xuống -> Ẩn nút đi
        setIsFabVisible(false);
        setIsOpen(false); // Tự động đóng menu nếu nó đang mở
      } else {
        // Vuốt lên -> Hiện nút lại
        setIsFabVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hiệu ứng tự động đóng Menu khi click ra ngoài vùng trống (Dành cho Desktop)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Gom nhóm dữ liệu liên hệ để render code sạch đẹp hơn
  const CONTACT_LINKS = [
    {
      id: 'messenger',
      href: "https://www.messenger.com/t/105637972440422/?messaging_source=source%3Apages%3Amessage_shortlink&source_id=1441792&recurring_notification=0",
      title: "Nhắn tin Messenger.",
      subtitle: "Chat trực tiếp với Fanpage",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.145 2 11.26c0 2.923 1.558 5.485 3.993 7.155.195.133.326.35.342.584l.115 1.704c.046.685.787 1.107 1.395.795l1.986-1.02a1.08 1.08 0 0 1 .801-.067A10.74 10.74 0 0 0 12 20.52c5.523 0 10-4.145 10-9.26S17.523 2 12 2zm1.096 12.35l-2.61-2.784a.978.978 0 0 0-1.424-.044l-3.328 3.328c-.42.42.18.995.631.576l2.61-2.784a.978.978 0 0 1 1.424.044l3.328 3.328c.42.42-.18-.995-.631-.576z"/></svg>
      ),
      bg: "from-[#0084FF] to-[#00C6FF]",
      textHover: "group-hover:text-[#0084FF]"
    },
    {
      id: 'zalo',
      href: "https://zalo.me/0909964296",
      title: "Chat qua Zalo.",
      subtitle: "Hỗ trợ tư vấn nhanh 24/7",
      icon: <span className="font-black text-[12px] tracking-widest mt-0.5">ZALO</span>,
      bg: "from-[#0068FF] to-[#0090FF]",
      textHover: "group-hover:text-[#0068FF]"
    },
    {
      id: 'hotline',
      href: "tel:0909964296",
      title: "0909 964 296",
      subtitle: "Hotline hỗ trợ",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.48-4.18-7.076-7.076l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" /></svg>
      ),
      bg: "from-[#FDB714] to-yellow-400",
      textHover: "group-hover:text-[#FDB714]"
    }
  ];

  return (
    <>
      {/* 📱 MỚI 1: BOTTOM SHEET CHO MOBILE THAY VÌ POPUP */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[99999] flex justify-end flex-col md:hidden">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#003046]/40 backdrop-blur-sm" 
              onClick={() => setIsOpen(false)}
            />
            <motion.div 
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              drag="y" dragConstraints={{ top: 0 }} dragElastic={0.2}
              onDragEnd={(e, { offset, velocity }) => {
                if (offset.y > 100 || velocity.y > 500) setIsOpen(false);
              }}
              className="bg-white rounded-t-[2.5rem] p-6 pb-10 relative z-10 flex flex-col shadow-[0_-20px_50px_rgba(0,48,70,0.2)]"
            >
              <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6 cursor-grab active:cursor-grabbing shrink-0" />
              <h4 className="text-2xl font-black text-[#003046] mb-6 tracking-tight">Liên hệ Octo.</h4>
              
              <div className="flex flex-col gap-3">
                {CONTACT_LINKS.map(link => (
                  <a 
                    key={link.id}
                    href={link.href}
                    target={link.id !== 'hotline' ? "_blank" : undefined}
                    rel={link.id !== 'hotline' ? "noopener noreferrer" : undefined}
                    // 📱 MỚI 4: Gắn active:scale-95 cho Mobile
                    className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-[#60CBED]/50 active:scale-95 transition-all"
                  >
                    <div className={`w-12 h-12 shrink-0 rounded-[1.2rem] bg-gradient-to-tr ${link.bg} flex items-center justify-center text-white shadow-md`}>
                      {link.id === 'hotline' ? <span className="text-[#003046]">{link.icon}</span> : link.icon}
                    </div>
                    <div>
                      <div className="text-[10px] text-[#5a7a8a] font-bold uppercase tracking-widest mb-1">{link.subtitle}</div>
                      <div className="text-[#003046] text-sm font-black tracking-tight">{link.title}</div>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MAIN FLOATING BUTTON WRAPPER */}
      {/* 📱 Nâng bottom-24 trên di động để không bị đè lên thanh Smart CTA Đăng Ký */}
      <div 
        className={`fixed bottom-24 md:bottom-8 right-5 md:right-8 z-[9998] transition-transform duration-500 ease-[cubic-bezier(0.25,0.4,0,1)] 
        ${isFabVisible ? 'translate-y-0' : 'translate-y-[200px]'}`} 
        ref={menuRef}
      >
        
        {/* 💻 MỚI 1: MENU POPUP CHỈ HIỂN THỊ TRÊN DESKTOP (hidden md:block) */}
        <div 
          className={`hidden md:block absolute bottom-20 right-0 bg-white/95 backdrop-blur-xl backdrop-saturate-150 rounded-[2rem] shadow-[0_20px_50px_rgba(0,48,70,0.15)] border border-white/50 p-3 w-72 transition-all duration-500 origin-bottom-right 
          ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-4 pointer-events-none'}`}
        >
          <div className="flex flex-col gap-2">
            {CONTACT_LINKS.map(link => (
              <a 
                key={link.id}
                href={link.href}
                target={link.id !== 'hotline' ? "_blank" : undefined}
                rel={link.id !== 'hotline' ? "noopener noreferrer" : undefined}
                // 📱 MỚI 4: Gắn active:scale-95 cho Desktop
                className="flex items-center gap-4 p-3 rounded-2xl hover:bg-[#f0faff] active:scale-95 transition-all group"
              >
                <div className={`w-10 h-10 shrink-0 rounded-[1rem] bg-gradient-to-tr ${link.bg} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  {link.id === 'hotline' ? <span className="text-[#003046]">{link.icon}</span> : link.icon}
                </div>
                <div>
                  {link.id === 'hotline' && <div className="text-[#5a7a8a] text-[10px] font-bold uppercase tracking-widest mb-0.5">Hotline hỗ trợ</div>}
                  <span className={`text-[#003046] text-sm font-black tracking-tight ${link.textHover} transition-colors`}>{link.title}</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* ═══ NÚT GỌI TỔNG (MAIN BUTTON) ═══ */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          // 📱 MỚI 4: Gắn active:scale-95
          className={`w-[60px] h-[60px] rounded-full flex items-center justify-center shadow-[0_15px_30px_rgba(96,203,237,0.4)] transition-all duration-500 relative hover:scale-110 active:scale-95 hover:shadow-[0_20px_40px_rgba(96,203,237,0.5)] z-10
          ${isOpen ? 'bg-[#003046] text-white rotate-90 shadow-[0_15px_30px_rgba(0,48,70,0.3)]' : 'bg-gradient-to-br from-[#60CBED] to-[#0080a0] text-white'}`}
        >
          {/* Vòng chớp nháy siêu mượt */}
          {!isOpen && <span className="absolute inset-0 rounded-full border-2 border-[#60CBED] animate-ping opacity-40 pointer-events-none"></span>}
          
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
    </>
  );
}