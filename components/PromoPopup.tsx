'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function PromoPopup() {
  const [promo, setPromo] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Gọi API lấy data quảng cáo thay vì hardcode
    const fetchPromo = async () => {
      try {
        const res = await fetch('/api/promo');
        const data = await res.json();
        
        if (data && data.isActive) {
          setPromo(data);
          setTimeout(() => setIsOpen(true), 3000); 
        }
      } catch (error) {
        console.error("Không tải được Popup:", error);
      }
    };
    fetchPromo();
  }, []);

  return (
    <AnimatePresence>
      {isOpen && promo && (
        <div className="fixed inset-0 z-[99999] flex items-end md:items-center justify-center p-0 md:p-4">
          
          {/* LỚP NỀN MỜ: Click vào đây sẽ đóng Modal (Đáp ứng yêu cầu 1) */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)} 
          />

          {/* 💻 GIAO DIỆN DESKTOP */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative hidden md:flex bg-[#E83C3C] text-white rounded-2xl overflow-hidden max-w-3xl w-full shadow-[0_20px_60px_rgba(0,0,0,0.5)] z-10"
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-20 w-8 h-8 bg-white text-black rounded-full flex items-center justify-center font-bold active:scale-90 transition-transform"
            >
              ✕
            </button>

            {/* Trái: Chữ */}
            <div className="p-8 w-1/2 flex flex-col justify-center">
              <h2 className="text-3xl font-black mb-4 uppercase leading-tight">{promo.title}</h2>
              <p className="mb-2 text-sm opacity-90">{promo.subtitle}</p>
              <div className="text-6xl font-black mb-8 drop-shadow-md">{promo.discountText}</div>
              <a 
                href={promo.buttonLink} 
                onClick={() => setIsOpen(false)}
                className="bg-[#003046] text-white px-8 py-3 rounded-full font-bold text-center w-max active:scale-95 transition-transform duration-150 shadow-lg"
              >
                {promo.buttonText}
              </a>
            </div>

            {/* Phải: Hình */}
            <div className="w-1/2 relative min-h-[350px]">
              {promo.imageUrl ? (
                <Image src={promo.imageUrl} alt="Promo" fill className="object-cover" sizes="50vw" />
              ) : (
                <div className="w-full h-full bg-white/10"></div>
              )}
            </div>
          </motion.div>

          {/* 📱 GIAO DIỆN MOBILE (Bottom Sheet vuốt để tắt - Đáp ứng yêu cầu 2) */}
          <motion.div 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, { offset, velocity }) => {
              if (offset.y > 100 || velocity.y > 500) setIsOpen(false); // Vuốt xuống nhanh hoặc sâu thì tắt
            }}
            className="relative md:hidden w-full bg-[#E83C3C] text-white rounded-t-[2.5rem] flex flex-col overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.3)] z-10 pt-4"
          >
            {/* Thanh vuốt ngang (Handle) */}
            <div className="w-12 h-1.5 bg-white/50 rounded-full mx-auto mb-4 cursor-grab active:cursor-grabbing relative z-20" />

            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 z-20 w-10 h-10 bg-black/20 text-white rounded-full flex items-center justify-center font-bold backdrop-blur-md active:scale-90 transition-transform"
            >
              ✕
            </button>

            {/* Mobile: Hình nằm trên */}
            <div className="w-full relative h-[200px]">
              {promo.imageUrl ? (
                <Image src={promo.imageUrl} alt="Promo" fill className="object-cover" sizes="100vw" />
              ) : (
                <div className="w-full h-full bg-white/10"></div>
              )}
              <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/40 to-transparent"></div>
            </div>

            {/* Mobile: Chữ và nút nằm dưới bám đáy (Thumb-zone) */}
            <div className="p-6 pb-8 w-full flex flex-col justify-center text-center">
              <h2 className="text-2xl font-black mb-2 uppercase leading-tight">{promo.title}</h2>
              <p className="mb-4 text-sm opacity-90">{promo.subtitle}</p>
              <div className="text-5xl font-black mb-6 drop-shadow-md">{promo.discountText}</div>
              <a 
                href={promo.buttonLink} 
                onClick={() => setIsOpen(false)}
                className="block w-full bg-[#003046] text-white py-4 rounded-2xl font-bold active:scale-95 transition-transform duration-150 shadow-lg"
              >
                {promo.buttonText}
              </a>
            </div>
          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
}