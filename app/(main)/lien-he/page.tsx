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
  
  // 📱 MỚI: State cho thanh FAB dính thông minh
  const [isFabVisible, setIsFabVisible] = useState(false);
  const lastScrollY = useRef(0);

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

  // HÀM XỬ LÝ GỬI TIN NHẮN (Đã kết nối Spring Boot API)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('name') as string;

    // ✅ ĐÃ ĐỔI TÊN BIẾN CHO KHỚP 100% VỚI BACKEND
    const data = {
      fullName: name,                               // Đổi 'name' thành 'fullName'
      phone: formData.get('phone') as string,
      email: (formData.get('email') as string) || '',
      program: 'Khách cần tư vấn chung',            // Đổi 'course' thành 'program'
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
        setToastMessage(`🎉 Cảm ơn ${name}! Octo. đã nhận được tin nhắn và sẽ phản hồi sớm nhất.`);
        setTimeout(() => setToastMessage(''), 4000);
        form.reset(); // Xóa trắng form
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
        <FadeIn className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-white border border-[#60CBED]/30 text-[#003046] text-[10px] font-bold px-5 py-2 rounded-full uppercase mb-6 shadow-sm tracking-[0.2em]">
            🐙 Kết nối với Octo.
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-[4rem] font-black text-[#003046] leading-[1.05] tracking-tight">
            Liên hệ với <span className="text-[#60CBED]">chúng tôi.</span>
          </h1>
          <p className="text-[#5a7a8a] max-w-2xl mx-auto text-lg leading-relaxed mt-6 font-medium">
            Octo. luôn sẵn sàng lắng nghe và giải đáp mọi thắc mắc của phụ huynh và học viên về các chương trình đào tạo.
          </p>
        </FadeIn>

        {/* ═══ THÔNG TIN LIÊN LẠC & GOOGLE MAPS ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-28">

          {/* Cột trái: Bento Grid Thông tin - 📱 MỚI: Tích hợp Snap Scrolling ngang */}
          <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide sm:grid sm:grid-cols-2 gap-6 pb-6 -mx-5 px-5 sm:mx-0 sm:px-0 sm:pb-0">
            
            <FadeIn delay={100} className="w-[85vw] sm:w-auto shrink-0 snap-center bg-white rounded-[2.5rem] p-8 md:p-10 border border-[#60CBED]/10 hover:border-[#60CBED]/40 hover:shadow-[0_20px_50px_rgba(96,203,237,0.15)] hover:-translate-y-2 transition-all duration-500 flex flex-col justify-center group shadow-sm">
              <div className="w-16 h-16 bg-[#f0faff] text-[#60CBED] group-hover:bg-[#003046] group-hover:text-[#FDB714] rounded-2xl flex items-center justify-center text-3xl mb-8 shadow-inner transition-colors duration-500">📍</div>
              <h3 className="text-[#003046] font-black text-2xl mb-3 tracking-tight">Địa chỉ.</h3>
              <p className="text-[#5a7a8a] text-sm leading-relaxed font-medium">45 đường D2A, khu Manhattan – Vinhomes Grand Park, TP. Thủ Đức, TP.HCM.</p>
            </FadeIn>

            <FadeIn delay={200} className="w-[85vw] sm:w-auto shrink-0 snap-center bg-white rounded-[2.5rem] p-8 md:p-10 border border-[#60CBED]/10 hover:border-[#60CBED]/40 hover:shadow-[0_20px_50px_rgba(96,203,237,0.15)] hover:-translate-y-2 transition-all duration-500 flex flex-col justify-center group shadow-sm">
              <div className="w-16 h-16 bg-[#f0faff] text-[#60CBED] group-hover:bg-[#60CBED] group-hover:text-white rounded-2xl flex items-center justify-center text-3xl mb-8 shadow-inner transition-colors duration-500">📞</div>
              <h3 className="text-[#003046] font-black text-2xl mb-3 tracking-tight">Hotline.</h3>
              {/* 📱 MỚI: Haptic Feedback active:scale-95 */}
              <a href="tel:0909964296" className="text-[#003046] text-xl font-black hover:text-[#60CBED] active:scale-95 inline-block transition-transform duration-150">0909 964 296.</a>
              <p className="text-[#5a7a8a] text-[10px] uppercase tracking-[0.1em] mt-3 font-bold">Hỗ trợ 24/7.</p>
            </FadeIn>

            <FadeIn delay={300} className="w-[85vw] sm:w-auto shrink-0 snap-center bg-white rounded-[2.5rem] p-8 md:p-10 border border-[#60CBED]/10 hover:border-[#60CBED]/40 hover:shadow-[0_20px_50px_rgba(96,203,237,0.15)] hover:-translate-y-2 transition-all duration-500 flex flex-col justify-center group shadow-sm">
              <div className="w-16 h-16 bg-[#f0faff] text-[#60CBED] group-hover:bg-[#FDB714] group-hover:text-[#003046] rounded-2xl flex items-center justify-center text-3xl mb-8 shadow-inner transition-colors duration-500">✉️</div>
              <h3 className="text-[#003046] font-black text-2xl mb-3 tracking-tight">Email.</h3>
              {/* 📱 MỚI: Haptic Feedback active:scale-95 */}
              <a href="mailto:services@octo.vn" className="text-[#003046] text-lg font-black hover:text-[#60CBED] active:scale-95 inline-block transition-transform duration-150">services@octo.vn.</a>
              <p className="text-[#5a7a8a] text-[10px] uppercase tracking-[0.1em] mt-3 font-bold">Phản hồi trong 24h.</p>
            </FadeIn>

            <FadeIn delay={400} className="w-[85vw] sm:w-auto shrink-0 snap-center bg-gradient-to-br from-[#f0faff] to-white rounded-[2.5rem] p-8 md:p-10 border border-[#60CBED]/30 hover:border-[#60CBED] hover:shadow-[0_20px_50px_rgba(96,203,237,0.15)] hover:-translate-y-2 transition-all duration-500 flex flex-col justify-center group">
              <div className="w-16 h-16 bg-white text-[#60CBED] rounded-2xl flex items-center justify-center text-3xl mb-8 shadow-sm border border-[#60CBED]/20 group-hover:rotate-12 transition-transform duration-500">🕐</div>
              <h3 className="text-[#003046] font-black text-2xl mb-3 tracking-tight">Giờ làm việc.</h3>
              <p className="text-[#003046] text-lg font-black">8:00 – 22:00.</p>
              <p className="text-[#5a7a8a] text-[10px] uppercase tracking-[0.1em] mt-3 font-bold">Tất cả các ngày trong tuần.</p>
            </FadeIn>
          </div>

          {/* Cột phải: Bản đồ Google Maps */}
          <FadeIn delay={200} className="bg-white rounded-[3rem] overflow-hidden border-4 border-white shadow-[0_20px_50px_rgba(0,48,70,0.08)] hover:shadow-[0_30px_60px_rgba(0,48,70,0.15)] hover:border-[#60CBED]/20 transition-all duration-500 relative min-h-[350px] lg:min-h-full group mt-6 lg:mt-0">
            <div className="absolute inset-0 bg-[#003046]/5 group-hover:bg-transparent transition-colors pointer-events-none z-10"></div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.4206584285145!2d106.83756201533423!3d10.855574392267575!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752b001d898ed9%3A0xc03e5c9b7e7a2b25!2sVinhomes%20Grand%20Park!5e0!3m2!1svi!2s!4v1714440312678!5m2!1svi!2s"
              width="100%"
              height="100%"
              style={{ border: 0, position: 'absolute', top: 0, left: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bản đồ vị trí Octo English"
              className="grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
            ></iframe>
          </FadeIn>
        </div>

        {/* ═══ FORM GỬI CÂU HỎI NHANH ═══ */}
        <section className="relative bg-gradient-to-br from-[#003046] to-[#005070] rounded-[3.5rem] p-8 md:p-16 lg:p-24 overflow-hidden shadow-[0_30px_60px_rgba(0,48,70,0.2)]">
          <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-[#60CBED] rounded-full mix-blend-screen filter blur-[150px] opacity-20 animate-pulse pointer-events-none"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#FDB714] rounded-full mix-blend-screen filter blur-[180px] opacity-10 animate-pulse pointer-events-none" style={{ animationDelay: '2s' }}></div>
          
          {/* Bạch tuộc nền Multiply */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/4 text-[40rem] text-[#60CBED] mix-blend-multiply opacity-10 pointer-events-none select-none animate-pulse">🐙</div>
          
          <FadeIn className="relative z-10 max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
              Gửi câu hỏi <span className="text-[#FDB714]">nhanh.</span>
            </h2>
            <p className="text-white/80 text-lg md:text-xl font-medium">Bạn có điều gì băn khoăn? Hãy để lại lời nhắn, đội ngũ Octo. sẽ hỗ trợ bạn ngay lập tức.</p>
          </FadeIn>

          <FadeIn delay={200} className="relative z-10 max-w-4xl mx-auto bg-white/95 backdrop-blur-xl rounded-[3rem] p-8 md:p-14 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/20">
            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div>
                  <label className="block text-[10px] font-black text-[#003046] mb-3 uppercase tracking-[0.15em]">Họ và tên <span className="text-red-500">*</span></label>
                  {/* 📱 MỚI: Tăng focus:ring lên 20% cho form */}
                  <input type="text" name="name" required placeholder="Nhập tên của bạn..."
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-[#60CBED] focus:bg-white focus:ring-4 focus:ring-[#60CBED]/20 transition-all text-sm text-[#003046] font-bold" />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-[#003046] mb-3 uppercase tracking-[0.15em]">Số điện thoại <span className="text-red-500">*</span></label>
                  {/* type="tel" đã cực chuẩn Thumb-Zone rồi */}
                  <input type="tel" name="phone" required placeholder="Nhập số điện thoại..."
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-[#60CBED] focus:bg-white focus:ring-4 focus:ring-[#60CBED]/20 transition-all text-sm text-[#003046] font-bold" />
                </div>
              </div>
              
              <div>
                <label className="block text-[10px] font-black text-[#003046] mb-3 uppercase tracking-[0.15em]">Email (Nếu có)</label>
                <input type="email" name="email" placeholder="Nhập địa chỉ email..."
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-[#60CBED] focus:bg-white focus:ring-4 focus:ring-[#60CBED]/20 transition-all text-sm text-[#003046] font-bold" />
              </div>
              
              <div>
                <label className="block text-[10px] font-black text-[#003046] mb-3 uppercase tracking-[0.15em]">Nội dung câu hỏi <span className="text-red-500">*</span></label>
                <textarea name="message" required placeholder="Bạn muốn hỏi về chương trình học, học phí hay lịch học..." rows={5}
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:border-[#60CBED] focus:bg-white focus:ring-4 focus:ring-[#60CBED]/20 transition-all text-sm text-[#003046] font-bold resize-none leading-relaxed" />
              </div>
              
              <div className="pt-4">
                {/* 📱 MỚI: Haptic Feedback active:scale-95 */}
                <button type="submit" className="w-full bg-[#FDB714] text-[#003046] font-black py-5 rounded-2xl shadow-[0_10px_25px_rgba(253,183,20,0.3)] hover:shadow-[0_15px_35px_rgba(253,183,20,0.5)] active:scale-95 hover:-translate-y-1 transition-all uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3">
                  🚀 Gửi tin nhắn ngay!
                </button>
              </div>
            </form>
          </FadeIn>
        </section>
      </div>

      {/* 📱 MỚI: SMART CONTEXTUAL FAB (MOBILE CHỈ HIỆN KHI VUỐT LÊN) */}
      <div className={`fixed bottom-0 left-0 right-0 z-[900] bg-white/90 backdrop-blur-xl border-t border-gray-100 p-4 px-5 flex items-center justify-between gap-4 transition-transform duration-300 md:hidden shadow-[0_-10px_40px_rgba(0,48,70,0.1)] 
      ${isFabVisible ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="text-xs text-[#003046] font-bold tracking-tight">
          Cần hỗ trợ gấp?<br/><strong className="text-[#60CBED] text-sm drop-shadow-sm">Gọi Hotline ngay!</strong>
        </div>
        <a href="tel:0909964296" className="bg-[#FDB714] text-[#003046] font-black text-[10px] py-3.5 px-6 rounded-full shrink-0 shadow-md uppercase tracking-wider active:scale-95 transition-transform">
          Gọi tư vấn
        </a>
      </div>

      {/* Thông báo Toast */}
      <div className={`fixed bottom-24 left-1/2 -translate-x-1/2 bg-[#003046] text-white px-8 py-4 rounded-full text-sm font-bold shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-[#60CBED]/40 z-[9999] transition-all duration-500 whitespace-nowrap flex items-center gap-3 ${toastMessage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
        {toastMessage}
      </div>
    </main>
  );
}