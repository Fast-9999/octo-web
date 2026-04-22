'use client';
import React, { useState, useEffect, useRef } from 'react';

// 💡 TẠO HIỆU ỨNG NỞ RA (SCALE) CHUẨN GODLY
const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
        if (domRef.current) observer.unobserve(domRef.current);
      }
    }, { threshold: 0.15 });
    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-[1200ms] ease-[cubic-bezier(0.25,0.4,0,1)] ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default function ContactPage() {
  const [toastMessage, setToastMessage] = useState('');
  const [isFabVisible, setIsFabVisible] = useState(false);
  const lastScrollY = useRef(0);
  
  // 🗺️ MỚI: State quản lý hiển thị Bản đồ cho 2 Cơ sở
  const [activeLocation, setActiveLocation] = useState<'cs1' | 'cs2'>('cs1');

  // Link Google Maps Embed (Ní có thể thay lại link src thực tế lấy từ Google Maps)
  const mapUrls = {
    cs1: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.420594896584!2d106.83765101533446!3d10.855589660699298!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175218d227593ab%3A0xc6fb5b0378d38703!2zVmluaG9tZXMgR3JhbmQgUGFyaywgTG9uZyBQaMaw4bubYywgUXXhuq1uIDksIEjhu5MgQ2jDrSBNaW5o!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s",
    cs2: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.123456789!2d106.8123456789!3d10.8123456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zS8O9IHRDumMgeMOhIMSQ4bqhaSBo4buNYyBMdeG6rXQgVFAuSENNIC0gQ8ahIHPhu58gMw!5e0!3m2!1svi!2s!4v1700000000001!5m2!1svi!2s"
  };

  // Logic nhận diện vuốt tay để ẩn/hiện FAB
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 300) {
        setIsFabVisible(false);
      } else if (currentScrollY > lastScrollY.current) {
        setIsFabVisible(false); // Đang vuốt xuống
      } else {
        setIsFabVisible(true);  // Vuốt lên nhẹ
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('name') as string;
    const data = {
      fullName: name,
      phone: formData.get('phone') as string,
      email: (formData.get('email') as string) || '',
      program: 'Khách cần tư vấn chung',
      message: formData.get('message') as string,
      status: 'MỚI',
      type: 'LIÊN HỆ'
    };

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Đã bỏ emoji 🎉 cho chuyên nghiệp
        setToastMessage(`Cảm ơn ${name}! Octo. đã nhận được tin nhắn và sẽ phản hồi sớm nhất.`);
        setTimeout(() => setToastMessage(''), 4000);
        form.reset();
      } else {
        alert('Có lỗi xảy ra khi lưu dữ liệu!');
      }
    } catch (error) {
      console.error('Lỗi Server:', error);
      alert('Không kết nối được với máy chủ Spring Boot!');
    }
  };

  return (
    <main className="min-h-screen bg-[#f8fcfd] pt-32 pb-24 relative overflow-x-hidden">
      {/* 💡 Ánh sáng nền Glow ảo diệu */}
      <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#60CBED]/20 blur-[150px] rounded-full pointer-events-none z-0 animate-pulse"></div>

      <div className="max-w-7xl mx-auto px-5 relative z-10">
        
        {/* ═══ HEADER TRANG ═══ */}
        <FadeIn className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 bg-white border border-[#60CBED]/30 text-[#003046] text-[10px] font-bold px-5 py-2.5 rounded-full uppercase mb-6 shadow-sm tracking-[0.2em]">
            {/* 💡 Thay Emoji bạch tuộc phèn bằng SVG Sparkles chuẩn tech */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-[#60CBED]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09l2.846.813-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
            </svg>
            Kết nối với Octo.
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-[4rem] font-black text-[#003046] leading-[1.05] tracking-tight">
            Liên hệ với <span className="text-[#60CBED]">chúng tôi.</span>
          </h1>
          <p className="text-[#5a7a8a] max-w-2xl mx-auto text-lg leading-relaxed mt-6 font-medium">
            Octo. luôn sẵn sàng lắng nghe và giải đáp mọi thắc mắc của phụ huynh và học viên về các chương trình đào tạo.
          </p>
        </FadeIn>

        {/* ═══ ANIMATION VUỐT NGANG (Chỉ Mobile) ═══ */}
        <div className="md:hidden flex items-center justify-end mb-3 pr-2 text-[#60CBED] text-[10px] uppercase font-black tracking-wider">
          <span className="flex items-center gap-1.5 bg-[#60CBED]/10 px-3 py-1.5 rounded-full animate-pulse">
            Vuốt xem thêm
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3 h-3">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </span>
        </div>

        {/* ═══ THÔNG TIN LIÊN LẠC & GOOGLE MAPS ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 mb-28">
          
          {/* Cột trái: Bento Grid Thông tin ngang */}
          <div className="flex overflow-x-auto overflow-y-hidden sm:overflow-visible snap-x snap-mandatory scrollbar-hide sm:grid sm:grid-cols-2 gap-4 sm:gap-6 pb-6 -mx-5 px-5 sm:mx-0 sm:px-0 sm:pb-0">

            {/* 📍 THẺ CƠ SỞ 1 (Clickable) */}
            <FadeIn delay={100} className={`w-[85vw] sm:w-auto shrink-0 snap-center bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 border-2 transition-all duration-300 flex flex-col justify-center group shadow-sm cursor-pointer active:scale-95 ${activeLocation === 'cs1' ? 'border-[#60CBED] shadow-[0_20px_50px_rgba(96,203,237,0.15)] sm:-translate-y-2' : 'border-transparent sm:border-[#60CBED]/10 hover:border-[#60CBED]/40'}`}>
              <div onClick={() => setActiveLocation('cs1')} className="h-full flex flex-col">
                <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-6 shadow-inner transition-colors duration-300 ${activeLocation === 'cs1' ? 'bg-[#003046] text-[#FDB714]' : 'bg-[#f0faff] text-[#60CBED] group-hover:bg-[#003046] group-hover:text-[#FDB714]'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                </div>
                <h3 className="text-[#003046] font-black text-xl md:text-2xl mb-2 tracking-tight">Cơ sở 1.</h3>
                <p className="text-[#5a7a8a] text-sm leading-relaxed font-medium">45 đường D2A, khu Manhattan – Vinhomes Grand Park, TP. Thủ Đức.</p>
                {activeLocation === 'cs1' && <span className="mt-4 text-[10px] font-bold text-[#60CBED] uppercase tracking-wider flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#60CBED] animate-pulse"></span> Đang xem bản đồ</span>}
              </div>
            </FadeIn>

            {/* 📍 THẺ CƠ SỞ 2 (Clickable) */}
            <FadeIn delay={150} className={`w-[85vw] sm:w-auto shrink-0 snap-center bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 border-2 transition-all duration-300 flex flex-col justify-center group shadow-sm cursor-pointer active:scale-95 ${activeLocation === 'cs2' ? 'border-[#60CBED] shadow-[0_20px_50px_rgba(96,203,237,0.15)] sm:-translate-y-2' : 'border-transparent sm:border-[#60CBED]/10 hover:border-[#60CBED]/40'}`}>
              <div onClick={() => setActiveLocation('cs2')} className="h-full flex flex-col">
                <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-6 shadow-inner transition-colors duration-300 ${activeLocation === 'cs2' ? 'bg-[#003046] text-[#FDB714]' : 'bg-[#f0faff] text-[#60CBED] group-hover:bg-[#003046] group-hover:text-[#FDB714]'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
                  </svg>
                </div>
                <h3 className="text-[#003046] font-black text-xl md:text-2xl mb-2 tracking-tight">Cơ sở 2.</h3>
                <p className="text-[#5a7a8a] text-sm leading-relaxed font-medium">Ký túc xá Đại học Luật TP.HCM CS3, Phường Long Phước, TP. Thủ Đức.</p>
                {activeLocation === 'cs2' && <span className="mt-4 text-[10px] font-bold text-[#60CBED] uppercase tracking-wider flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#60CBED] animate-pulse"></span> Đang xem bản đồ</span>}
              </div>
            </FadeIn>

            {/* 📞 THẺ HOTLINE */}
            <FadeIn delay={200} className="w-[85vw] sm:w-auto shrink-0 snap-center bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 border border-transparent sm:border-[#60CBED]/10 hover:border-[#60CBED]/40 hover:shadow-[0_20px_50px_rgba(96,203,237,0.15)] sm:hover:-translate-y-2 transition-all duration-300 flex flex-col justify-center group shadow-sm">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-[#f0faff] text-[#60CBED] group-hover:bg-[#60CBED] group-hover:text-white rounded-2xl flex items-center justify-center mb-6 shadow-inner transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.48-4.18-7.076-7.076l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
              </div>
              <h3 className="text-[#003046] font-black text-xl md:text-2xl mb-2 tracking-tight">Hotline.</h3>
              <a href="tel:0909964296" className="text-[#003046] text-xl font-black hover:text-[#60CBED] active:scale-95 inline-block transition-transform duration-150">0909 964 296.</a>
              <p className="text-[#5a7a8a] text-[10px] uppercase tracking-[0.1em] mt-3 font-bold">Hỗ trợ 24/7.</p>
            </FadeIn>

            {/* ⏰ THẺ GIỜ LÀM VIỆC (Gộp Email vào đây cho gọn bố cục nếu muốn, hoặc tách rời) */}
            <FadeIn delay={300} className="w-[85vw] sm:w-auto shrink-0 snap-center bg-gradient-to-br from-[#f0faff] to-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 border border-transparent sm:border-[#60CBED]/30 hover:border-[#60CBED] hover:shadow-[0_20px_50px_rgba(96,203,237,0.15)] sm:hover:-translate-y-2 transition-all duration-300 flex flex-col justify-center group">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-white text-[#60CBED] rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-[#60CBED]/20 group-hover:rotate-12 transition-transform duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
              <h3 className="text-[#003046] font-black text-xl md:text-2xl mb-2 tracking-tight">Giờ làm việc.</h3>
              <p className="text-[#003046] text-lg font-black">8:00 – 22:00.</p>
              <p className="text-[#5a7a8a] text-[10px] uppercase tracking-[0.1em] mt-3 font-bold">Tất cả các ngày.</p>
            </FadeIn>

          </div>

          {/* Cột phải: Bản đồ Google Maps (Dynamic theo Cơ sở) */}
          <FadeIn delay={200} className="bg-white rounded-[2.5rem] md:rounded-[3rem] overflow-hidden border-4 border-white shadow-[0_20px_50px_rgba(0,48,70,0.08)] hover:shadow-[0_30px_60px_rgba(0,48,70,0.15)] hover:border-[#60CBED]/20 transition-all duration-500 relative min-h-[300px] lg:min-h-full group mt-2 lg:mt-0">
            <div className="absolute inset-0 bg-[#003046]/5 group-hover:bg-transparent transition-colors pointer-events-none z-10"></div>
            {/* Thêm key để React re-render lại iframe khi đổi source, tạo cảm giác mượt hơn */}
            <iframe
              key={activeLocation}
              src={activeLocation === 'cs1' ? mapUrls.cs1 : mapUrls.cs2}
              width="100%"
              height="100%"
              style={{ border: 0, position: 'absolute', top: 0, left: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bản đồ vị trí Octo English"
              className="grayscale-[20%] group-hover:grayscale-0 transition-all duration-700 animate-[fadeIn_0.5s_ease-in-out]"
            ></iframe>
          </FadeIn>
        </div>

        {/* ═══ FORM GỬI CÂU HỎI NHANH ═══ */}
        <section className="relative bg-gradient-to-br from-[#003046] to-[#005070] rounded-[2.5rem] md:rounded-[3.5rem] p-6 md:p-16 lg:p-24 overflow-hidden shadow-[0_30px_60px_rgba(0,48,70,0.2)]">
          <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-[#60CBED] rounded-full mix-blend-screen filter blur-[150px] opacity-20 animate-pulse pointer-events-none"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#FDB714] rounded-full mix-blend-screen filter blur-[180px] opacity-10 animate-pulse pointer-events-none" style={{ animationDelay: '2s' }}></div>

          <FadeIn className="relative z-10 max-w-3xl mx-auto text-center mb-10 md:mb-12">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-4 md:mb-6 tracking-tight">
              Gửi câu hỏi <span className="text-[#FDB714]">nhanh.</span>
            </h2>
            <p className="text-white/80 text-base md:text-xl font-medium px-4">
              Bạn có điều gì băn khoăn? Hãy để lại lời nhắn, đội ngũ Octo. sẽ hỗ trợ ngay lập tức.
            </p>
          </FadeIn>

          <FadeIn delay={200} className="relative z-10 max-w-4xl mx-auto bg-white/95 backdrop-blur-xl rounded-[2rem] md:rounded-[3rem] p-6 md:p-14 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/20">
            <form onSubmit={handleSubmit} className="space-y-5 md:space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
                <div>
                  <label className="block text-[10px] font-black text-[#003046] mb-2 md:mb-3 uppercase tracking-[0.15em]">Họ và tên <span className="text-red-500">*</span></label>
                  <input type="text" name="name" required placeholder="Nhập tên của bạn..."
                    className="w-full h-14 px-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-[#60CBED] focus:bg-white focus:ring-4 focus:ring-[#60CBED]/20 transition-all text-sm text-[#003046] font-bold" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-[#003046] mb-2 md:mb-3 uppercase tracking-[0.15em]">Số điện thoại <span className="text-red-500">*</span></label>
                  <input type="tel" name="phone" required placeholder="Nhập số điện thoại..."
                    className="w-full h-14 px-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-[#60CBED] focus:bg-white focus:ring-4 focus:ring-[#60CBED]/20 transition-all text-sm text-[#003046] font-bold" />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-[#003046] mb-2 md:mb-3 uppercase tracking-[0.15em]">Email (Nếu có)</label>
                <input type="email" name="email" placeholder="Nhập địa chỉ email..."
                  className="w-full h-14 px-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-[#60CBED] focus:bg-white focus:ring-4 focus:ring-[#60CBED]/20 transition-all text-sm text-[#003046] font-bold" />
              </div>

              <div>
                <label className="block text-[10px] font-black text-[#003046] mb-2 md:mb-3 uppercase tracking-[0.15em]">Nội dung câu hỏi <span className="text-red-500">*</span></label>
                <textarea name="message" required placeholder="Bạn muốn hỏi về chương trình học, học phí hay lịch học..." rows={4}
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-[1.25rem] outline-none focus:border-[#60CBED] focus:bg-white focus:ring-4 focus:ring-[#60CBED]/20 transition-all text-sm text-[#003046] font-bold resize-none leading-relaxed" />
              </div>

              <div className="pt-2 md:pt-4">
                <button type="submit" className="w-full h-14 md:h-16 bg-[#FDB714] text-[#003046] font-black rounded-2xl shadow-[0_10px_25px_rgba(253,183,20,0.3)] hover:shadow-[0_15px_35px_rgba(253,183,20,0.5)] active:scale-95 sm:hover:-translate-y-1 transition-all uppercase tracking-[0.15em] text-xs flex items-center justify-center gap-2">
                  Gửi tin nhắn ngay
                  {/* 💡 Thay Icon Tên lửa phèn bằng SVG Send xịn xò */}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                  </svg>
                </button>
              </div>
            </form>
          </FadeIn>
        </section>
      </div>

      {/* 📱 MỚI: SMART CONTEXTUAL FAB (MOBILE CHỈ HIỆN KHI VUỐT LÊN) */}
      <div className={`fixed bottom-0 left-0 right-0 z-[900] bg-white/95 backdrop-blur-xl border-t border-gray-100 p-4 px-5 flex items-center justify-between gap-4 transition-transform duration-300 md:hidden shadow-[0_-10px_40px_rgba(0,48,70,0.1)] pb-safe ${isFabVisible ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="text-[11px] text-[#003046] font-bold tracking-tight">
          Cần hỗ trợ gấp?<br /><strong className="text-[#60CBED] text-[13px] drop-shadow-sm">Gọi Hotline ngay!</strong>
        </div>
        <a href="tel:0909964296" className="bg-[#FDB714] text-[#003046] font-black text-[10px] py-3.5 px-6 rounded-full shrink-0 shadow-md uppercase tracking-wider active:scale-95 transition-transform">
          Gọi tư vấn
        </a>
      </div>

      {/* Thông báo Toast */}
      <div className={`fixed bottom-24 left-1/2 -translate-x-1/2 bg-[#003046] text-white px-6 md:px-8 py-3 md:py-4 rounded-full text-xs md:text-sm font-bold shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-[#60CBED]/40 z-[9999] transition-all duration-500 whitespace-nowrap flex items-center gap-3 ${toastMessage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-[#60CBED]">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        {toastMessage}
      </div>
    </main>
  );
}