import React from 'react';
import Link from 'next/link';

export default function Footer() {
  // 📱 MỚI 5: Tăng padding bottom (pb-28) trên Mobile để không bị cái Smart FAB dưới đáy đè lên
  return (
    <footer className="bg-[#003046] text-white/70 pt-20 pb-28 md:pb-8 relative overflow-hidden border-t border-[#60CBED]/20">
      
      {/* 💡 Watermark Bạch tuộc siêu ảo ở góc Footer */}
      <div className="absolute -bottom-20 -right-10 text-[25rem] text-[#60CBED] opacity-5 rotate-12 select-none pointer-events-none">
        🐙
      </div>

      <div className="max-w-7xl mx-auto px-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12 mb-16 relative z-10">
        
        {/* Cột 1: Thông tin chung */}
        <div className="sm:col-span-2 lg:col-span-1 mb-4 sm:mb-0">
          <Link href="/" className="inline-block mb-6 active:scale-95 hover:opacity-80 transition-all duration-300">
            <img 
              src="https://octo.vn/img_data/images/logo/logo.png" 
              alt="Octo English Logo" 
              className="h-10 w-auto object-contain drop-shadow-lg" 
            />
          </Link>
          <p className="text-sm leading-relaxed max-w-[280px] font-medium">
            Trung tâm tiếng Anh tại Vinhomes Grand Park – TP. Thủ Đức. Ngoại ngữ toàn diện trong môi trường học <span className="text-[#60CBED] font-bold">thật chill.</span>
          </p>
        </div>

        {/* Cột 2: Khóa học */}
        <div>
          <h5 className="font-black text-white mb-5 uppercase tracking-widest text-sm">Khóa học.</h5>
          <ul className="space-y-4 text-sm font-medium">
            <li>
              {/* 📱 MỚI 4: Gắn active:scale-95 */}
              <Link href="/khoa-hoc" className="inline-block active:scale-95 hover:text-[#FDB714] hover:translate-x-2 transition-all duration-300">Tiếng Anh Thiếu Nhi.</Link>
            </li>
            <li>
              <Link href="/khoa-hoc" className="inline-block active:scale-95 hover:text-[#FDB714] hover:translate-x-2 transition-all duration-300">Tiếng Anh Thiếu Niên.</Link>
            </li>
            <li>
              <Link href="/khoa-hoc" className="inline-block active:scale-95 hover:text-[#FDB714] hover:translate-x-2 transition-all duration-300">Tiếng Anh Cấp Tốc.</Link>
            </li>
          </ul>
        </div>

        {/* Cột 3: Về chúng tôi */}
        <div>
          <h5 className="font-black text-white mb-5 uppercase tracking-widest text-sm">Về chúng tôi.</h5>
          <ul className="space-y-4 text-sm font-medium">
            <li>
              {/* 📱 MỚI 4: Gắn active:scale-95 */}
              <Link href="/ve-chung-toi" className="inline-block active:scale-95 hover:text-[#60CBED] hover:translate-x-2 transition-all duration-300">Giới thiệu.</Link>
            </li>
            <li>
              <Link href="/tin-tuc" className="inline-block active:scale-95 hover:text-[#60CBED] hover:translate-x-2 transition-all duration-300">Tin tức & Sự kiện.</Link>
            </li>
            <li>
              <Link href="/lien-he" className="inline-block active:scale-95 hover:text-[#60CBED] hover:translate-x-2 transition-all duration-300">Liên hệ.</Link>
            </li>
          </ul>
        </div>

        {/* Cột 4: Liên hệ */}
        <div className="sm:col-span-2 lg:col-span-1 mt-4 lg:mt-0">
          <h5 className="font-black text-white mb-5 uppercase tracking-widest text-sm">Liên hệ.</h5>
          <ul className="space-y-5 text-sm font-medium">
            <li className="flex items-start gap-3">
              {/* 💡 ĐÃ CẬP NHẬT: Icon SVG sang trọng thay cho Emoji phèn */}
              <span className="text-[#FDB714] shrink-0 mt-0.5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
              </span>
              <span className="leading-relaxed">45 đường D2A, khu Manhattan – Vinhomes Grand Park.</span>
            </li>
            <li className="flex items-center gap-3">
              {/* 💡 ĐÃ CẬP NHẬT: Icon SVG sang trọng */}
              <span className="text-[#FDB714] shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.48-4.18-7.076-7.076l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
              </span>
              {/* 📱 MỚI 4: Gắn active:scale-95 */}
              <a href="tel:0909964296" className="active:scale-95 hover:text-[#60CBED] transition-all inline-block">0909 964 296.</a>
            </li>
            <li className="flex items-center gap-3">
              {/* 💡 ĐÃ CẬP NHẬT: Icon SVG sang trọng */}
              <span className="text-[#FDB714] shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
              </span>
              {/* 📱 MỚI 4: Gắn active:scale-95 */}
              <a href="mailto:services@octo.vn" className="active:scale-95 hover:text-[#60CBED] transition-all inline-block">services@octo.vn.</a>
            </li>
          </ul>
        </div>

      </div>
      
      {/* ═══ ĐÁY FOOTER & MẠNG XÃ HỘI ═══ */}
      <div className="max-w-7xl mx-auto px-5 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        
        <p className="text-xs font-medium tracking-wide">
          © 2026 Octo. English – All rights reserved.
        </p>
        
        <div className="flex gap-4">
          {/* Facebook */}
          <a href="https://www.facebook.com/hp.octo" target="_blank" rel="noopener noreferrer" 
            className="w-10 h-10 rounded-[10px] bg-white/10 flex items-center justify-center text-white/70 hover:bg-[#60CBED] hover:text-[#003046] active:scale-95 hover:-translate-y-1 hover:shadow-[0_5px_15px_rgba(96,203,237,0.3)] transition-all duration-300"
            aria-label="Facebook"
          >
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.312h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
          </a>

          {/* TikTok */}
          <a href="https://www.tiktok.com/@octo.vn" target="_blank" rel="noopener noreferrer" 
            className="w-10 h-10 rounded-[10px] bg-white/10 flex items-center justify-center text-white/70 hover:bg-[#FDB714] hover:text-[#003046] active:scale-95 hover:-translate-y-1 hover:shadow-[0_5px_15px_rgba(253,183,20,0.3)] transition-all duration-300"
            aria-label="TikTok"
          >
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.16-3.44-3.37-3.43-5.7.04-3.33 2.85-5.9 6.19-5.88 1.4.02 2.79.52 3.86 1.4.03-3.95-.03-7.91.03-11.86.63-.03 1.25-.01 1.88-.02-.01-.32 0-.64 0-.96z"/></svg>
          </a>

          {/* YouTube */}
          <a href="https://www.youtube.com/channel/UCwXWPyMCDH39R2kT6ckzcWw" target="_blank" rel="noopener noreferrer" 
            className="w-10 h-10 rounded-[10px] bg-white/10 flex items-center justify-center text-white/70 hover:bg-[#ff0000] hover:text-white active:scale-95 hover:-translate-y-1 hover:shadow-[0_5px_15px_rgba(255,0,0,0.3)] transition-all duration-300"
            aria-label="YouTube"
          >
            <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          </a>
        </div>

      </div>
    </footer>
  );
}