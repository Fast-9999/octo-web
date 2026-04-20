'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// 💡 HIỆU ỨNG NỞ RA (SCALE) CHUẨN GODLY
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

// 💡 DANH SÁCH GIÁO VIÊN
const TEACHERS = [
  { id: 1, name: 'Cô Lan Phương', role: 'Chuyên gia IELTS & Giao tiếp.', img: '' },
  { id: 2, name: 'Thầy Minh Tuấn', role: 'Chuyên gia IELTS & Giao tiếp.', img: '' },
  { id: 3, name: 'Cô Thanh Trúc', role: 'Chuyên gia IELTS & Giao tiếp.', img: '' },
  { id: 4, name: 'Thầy David', role: 'Giáo viên Bản ngữ.', img: '' }
];

export default function AboutUs() {
  const [activeTab, setActiveTab] = useState(1);
  
  // 📱 MỚI: State cho Bottom Sheet và Smart FAB
  const [isSheetOpen, setIsSheetOpen] = useState(false);
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

  const visionData = [
    {
      id: 1,
      title: "Định hướng 5.0.",
      content: `Nhờ sự phát triển của khoa học hiện đại, đặc biệt là mạng xã hội và internet, các bạn trẻ ngày nay được tiếp xúc với rất nhiều nguồn tài liệu mở đến từ vô vàn những nền tảng giáo dục và văn hóa khác nhau.\n\nCác giá trị cốt lõi trong tư duy của các netizens, từ đó, cũng đã có sự thay đổi mạnh mẽ mà trước đây chưa hề có tiền lệ.\n\nĐể thích ứng với đà phát triển đó, một chương trình giáo dục theo tiêu chuẩn mới phải đáp ứng được các tính chất: Tính cập nhật tức thời, Tính thực tiễn cao, Tính thích ứng và đa chiều, Tính cầu toàn nhưng luôn cầu thị.`
    },
    {
      id: 2,
      title: "Giá trị cân bằng.",
      content: `Bất kể hệ tư duy nào cũng được xem là đúng trong đạo đức cá nhân (morals) của mỗi người.\n\nTuy nhiên, để đạt được định hướng phát triển toàn cầu, việc tiếp cận hệ tư duy mới của hệ thống đạo đức cộng đồng (ethics) là vô cùng cần thiết.\n\nKhả năng thích ứng, chấp nhận, và vận dụng các giá trị mới được xem là một tiêu chuẩn trong giai đoạn xã hội hiện nay.\n\nVì thế, một hệ thống giáo dục tốt cần phải hướng đến việc "làm mở" nhưng không chối bỏ các hệ tư duy xưa cũ của xã hội, nhưng đồng thời vẫn hướng học viên đến các giá trị tốt hơn, mới hơn.`
    },
    {
      id: 3,
      title: "Tiếp cận tự nhiên.",
      content: `Một hệ thống giáo dục ngôn ngữ toàn diện cần được xây dựng nội dung học vững chắc từ nền tảng đến nâng cao, giúp người học thẩm thấu các lớp của ngôn ngữ, tiếp cận theo phương pháp tự nhiên, và tiếp nhận giá trị theo tinh thần tích cực.\n\nNhờ sự hỗ trợ của Google và các công cụ AI, việc ghi nhớ và học thuộc lòng giờ đây đã không cần thiết. Cách học tốt nhất ở thời điểm hiện tại là gia tăng thời gian tiếp xúc và sử dụng với ngôn ngữ một cách tối đa trên đa dạng nền tảng khác nhau.`
    }
  ];

  const activeTabData = visionData.find(t => t.id === activeTab);

  return (
    <main className="font-sans text-[#1a2e38] bg-[#f8fcfd] overflow-x-hidden relative min-h-screen">
      
      {/* ═══ HEADER SECTION ═══ */}
      <section className="relative pt-32 pb-24 bg-gradient-to-b from-[#f0faff] to-[#f8fcfd] overflow-hidden text-center px-5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#60CBED]/20 blur-[120px] rounded-full pointer-events-none animate-pulse"></div>
        <FadeIn className="relative z-10 max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 bg-white border border-[#60CBED]/30 text-[#003046] text-[10px] font-bold px-5 py-2 rounded-full uppercase shadow-sm tracking-[0.2em]">
            🐙 Câu chuyện của chúng tôi.
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-[4rem] font-black text-[#003046] leading-[1.05] tracking-tight">
            Vượt xa hơn cả<br/>
            một lớp học <span className="text-[#FDB714]">ngôn ngữ.</span>
          </h1>
          <p className="text-lg text-[#5a7a8a] leading-relaxed font-medium">
            Tại Octo., chúng tôi không chỉ giảng dạy tiếng Anh, mà còn đồng hành cùng thế hệ trẻ kiến tạo một hệ tư duy mở, sẵn sàng trở thành những "Thinkers" của tương lai.
          </p>
        </FadeIn>
      </section>

      {/* ═══ TẦM NHÌN & SỨ MỆNH ═══ */}
      <section className="py-24 px-5 max-w-7xl mx-auto relative z-10">
        <FadeIn className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-[#003046] tracking-tight">
            Tầm nhìn & <span className="text-[#60CBED]">Sứ mệnh.</span>
          </h2>
        </FadeIn>

        {/* 📱 HIỂN THỊ DESKTOP: Dàn Tabs to bản */}
        <FadeIn delay={100} className="hidden md:flex items-start md:items-center justify-center gap-10 md:gap-20 mb-16">
          {visionData.map((tab) => (
            <div
              key={tab.id}
              className={`flex flex-col items-center cursor-pointer transition-all duration-500 group active:scale-95 ${activeTab === tab.id ? 'opacity-100 scale-110' : 'opacity-40 hover:opacity-70 scale-100'}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <div className={`text-7xl md:text-[7rem] font-black leading-none transition-colors duration-500 ${activeTab === tab.id ? 'text-[#FDB714] drop-shadow-lg' : 'text-[#003046]/10'}`}>
                0{tab.id}
              </div>
              <h3 className={`mt-4 text-sm font-black max-w-xs text-center transition-colors duration-500 tracking-wide ${activeTab === tab.id ? 'text-[#60CBED]' : 'text-[#003046]'}`}>
                {tab.title}
              </h3>
            </div>
          ))}
        </FadeIn>

        {/* 📱 HIỂN THỊ MOBILE: Nút gọi Bottom Sheet siêu gọn */}
        <FadeIn delay={100} className="md:hidden mb-8 w-full max-w-md mx-auto">
          <button 
            onClick={() => setIsSheetOpen(true)}
            className="w-full bg-white border-2 border-[#60CBED]/30 text-[#003046] font-black py-4 rounded-2xl flex justify-between items-center px-6 shadow-sm active:scale-95 transition-all"
          >
            <span>Mục: <span className="text-[#60CBED]">{activeTabData?.title}</span></span>
            <span className="text-xs opacity-50">Đổi ▼</span>
          </button>
        </FadeIn>

        <FadeIn delay={200} className="max-w-5xl mx-auto bg-white border-2 border-dashed border-[#60CBED]/30 rounded-[3rem] p-8 md:p-14 relative shadow-[0_20px_50px_rgba(0,48,70,0.05)]">
          <div className="absolute -top-8 -left-4 text-[#60CBED] opacity-20 text-[8rem] font-serif leading-none select-none pointer-events-none">"</div>
          <div className="absolute -bottom-16 -right-4 text-[#60CBED] opacity-20 text-[8rem] font-serif leading-none rotate-180 select-none pointer-events-none">"</div>
          <div className="text-[#003046]/80 leading-relaxed space-y-5 whitespace-pre-line text-base md:text-lg font-medium min-h-[150px] relative z-10 text-justify">
            {activeTabData?.content}
          </div>
        </FadeIn>
      </section>

      {/* ═══ GIÁ TRỊ CỐT LÕI ═══ */}
      <section className="py-28 bg-[#003046] relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[35rem] opacity-5 text-[#60CBED] mix-blend-multiply pointer-events-none select-none">🐙</div>
        <div className="max-w-7xl mx-auto px-5 relative z-10">
          <FadeIn className="mb-12 md:mb-20 flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/10 pb-8">
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-[4rem] font-black text-white leading-[1.1] tracking-tight">
                Giá trị cốt lõi<br/>
                <span className="text-[#60CBED]">tại Trung tâm.</span>
              </h2>
            </div>
            <div className="text-white/50 text-[10px] font-bold uppercase tracking-[0.2em] bg-white/5 px-5 py-2.5 rounded-full backdrop-blur-md">Core Values // 04</div>
          </FadeIn>

          {/* 📱 MỚI 2: Snap Scrolling ngang trên điện thoại, Grid trên Desktop */}
          <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-2 gap-6 md:gap-x-12 md:gap-y-24 pb-8 md:pb-0 -mx-5 px-5 md:mx-0 md:px-0">
            {[
              { img: 'https://octo.vn/img_data/images/printing/Artworks%202.png', title: 'Every Idea Matters.', desc: 'Mọi ý tưởng đều rất quan trọng.', mt: 'md:mt-0' },
              { img: 'https://octo.vn/img_data/images/printing/Artworks%203.png', title: 'Difference Is The Norm.', desc: 'Sự khác biệt là điều bình thường.', mt: 'md:mt-24' },
              { img: 'https://octo.vn/img_data/images/printing/Artworks4.png', title: 'Knowledge Leads The Way.', desc: 'Kiến thức dẫn lối con đường đúng đắn.', mt: 'md:-mt-12' },
              { img: 'https://octo.vn/img_data/images/printing/Artworks.png', title: 'Lead In The Moment.', desc: 'Sống ở hiện tại.', mt: 'md:mt-12' }
            ].map((value, idx) => (
              <FadeIn key={idx} delay={idx * 150} className={`w-[85vw] md:w-auto shrink-0 snap-center bg-white rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.2)] hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(96,203,237,0.15)] transition-all duration-500 group ${value.mt}`}>
                <div className="aspect-video w-full flex items-center justify-center overflow-hidden mb-10 relative">
                  <div className="absolute w-40 h-40 bg-[#60CBED]/20 rounded-full blur-[40px] group-hover:scale-150 transition-transform duration-700"></div>
                  <img src={value.img} alt={value.title} className="w-auto h-full max-h-60 object-contain relative z-10 group-hover:scale-105 transition-transform duration-500 drop-shadow-2xl" />
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-2xl md:text-3xl font-black text-[#60CBED] mb-3 tracking-tight">{value.title}</h3>
                  <p className="text-[#003046]/70 text-base md:text-lg font-medium">{value.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ LỜI NGỎ TỪ GIÁM ĐỐC ═══ */}
      <section className="py-28 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FDB714]/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-5 grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">

          <FadeIn className="relative order-2 md:order-1">
            <div className="absolute inset-0 bg-[#FDB714] rounded-[3rem] rotate-3 scale-105 opacity-20"></div>
            <img
              src="https://i.ibb.co/RTT7MPMg/B-n-sao-c-a-IMG-6116.jpg"
              alt="Giám đốc Nguyễn Hoàng Phú"
              className="w-full aspect-[4/5] object-cover rounded-[3rem] shadow-[0_20px_60px_rgba(0,48,70,0.2)] relative z-10 bg-gray-100"
            />
            <div className="absolute -bottom-6 -right-6 bg-white/95 backdrop-blur-md p-6 md:p-8 rounded-[2rem] shadow-2xl z-20 border border-gray-100 animate-bounce-slow flex items-center gap-4">
              <div className="text-[#60CBED] font-serif text-6xl leading-none h-10 overflow-hidden">"</div>
              <div>
                <div className="font-black text-[#003046] text-lg">Octo. English</div>
                <div className="text-[10px] font-bold text-[#5a7a8a] uppercase tracking-[0.2em] mt-1">Thành lập 2023</div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={200} className="order-1 md:order-2">
            <div className="inline-flex items-center gap-2 bg-[#FDB714]/10 border border-[#FDB714]/40 text-[#003046] text-[10px] font-bold px-5 py-2 rounded-full uppercase mb-6 tracking-[0.2em] shadow-sm">
              🤝 Thông điệp lãnh đạo
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-[4rem] font-black text-[#003046] mb-8 leading-[1.05] tracking-tight">
              Hành trình tạo nên<br/>
              <span className="text-[#60CBED]">sự khác biệt.</span>
            </h2>
            <div className="bg-[#f8fcfd] p-8 md:p-10 rounded-[2rem] border-l-4 border-[#FDB714] mb-10 shadow-sm">
              <p className="text-[#5a7a8a] text-base md:text-lg leading-relaxed italic font-medium">
                "Giáo dục ngôn ngữ không đơn thuần là truyền đạt từ vựng hay ngữ pháp, mà là thắp lên ngọn lửa đam mê, giúp các bạn trẻ tự tin trở thành những công dân toàn cầu. Tại Octo., chúng tôi cam kết xây dựng một môi trường 'thật chill' nhưng vô cùng hiệu quả, nơi mọi ý tưởng đều được lắng nghe."
              </p>
            </div>
            <div>
              <h3 className="text-3xl font-black text-[#003046] tracking-tight">Nguyễn Hoàng Phú.</h3>
              <p className="text-[#60CBED] font-bold mt-2 text-[10px] uppercase tracking-[0.2em]">
                Giám đốc — Công ty TNHH TCDG OMNI-CHANEL
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ ĐỘI NGŨ GIÁO VIÊN ═══ */}
      <section className="py-20 md:py-28 bg-[#f8fcfd] max-w-7xl mx-auto md:px-5 md:rounded-[3rem] mb-24 md:border border-gray-100 md:shadow-[0_10px_30px_rgba(0,48,70,0.03)]">
        <FadeIn className="text-center mb-12 md:mb-20 px-5">
          <div className="inline-flex items-center gap-2 bg-white border border-[#60CBED]/30 text-[#003046] text-[10px] font-bold px-5 py-2 rounded-full uppercase mb-4 shadow-sm tracking-[0.2em]">
            👨‍🏫 Đội ngũ chuyên gia
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-[4rem] font-black text-[#003046] tracking-tight">
            Người dẫn đường <span className="text-[#FDB714]">tận tâm.</span>
          </h2>
        </FadeIn>

        {/* 📱 MỚI 2: Snap Scrolling ngang cho danh sách giáo viên */}
        <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-4 gap-6 pb-8 md:pb-0 px-5 md:px-0">
          {TEACHERS.map((teacher, index) => (
            <FadeIn key={teacher.id} delay={index * 150} className="w-[70vw] md:w-auto shrink-0 snap-center group relative overflow-hidden rounded-[2rem] aspect-[3/4] bg-gray-200 shadow-sm border border-gray-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
              {teacher.img ? (
                <img src={teacher.img} alt={teacher.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s]" />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 font-bold bg-gray-100">
                  <div className="text-5xl mb-3 opacity-30">👤</div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-center px-4">Chưa cập nhật ảnh</div>
                </div>
              )}
              <div className="absolute inset-0 bg-[#003046]/10 group-hover:bg-[#003046]/0 transition-colors z-10"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#003046] via-[#003046]/40 to-transparent z-20 opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="absolute bottom-0 left-0 p-6 md:p-8 z-30 w-full transform group-hover:-translate-y-2 transition-transform duration-500">
                <span className="bg-[#FDB714] text-[#003046] text-[10px] font-black px-4 py-2 rounded-full uppercase shadow-md tracking-[0.15em]">
                  {teacher.name.includes('David') ? 'Bản ngữ' : 'Việt Nam'}
                </span>
                <h3 className="text-white font-black text-xl md:text-3xl mt-4 tracking-tight drop-shadow-md">{teacher.name}</h3>
                <p className="text-white/80 text-xs md:text-sm mt-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity delay-100 font-medium">
                  {teacher.role}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ═══ THÀNH TÍCH ═══ */}
      <section className="py-24 bg-gradient-to-br from-[#60CBED]/20 to-[#f8fcfd]">
        <FadeIn className="max-w-7xl mx-auto px-5">
          <div className="bg-[#003046] rounded-[3rem] p-10 md:p-16 shadow-[0_30px_60px_rgba(0,48,70,0.2)] relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#FDB714] rounded-full blur-[100px] opacity-30 animate-pulse"></div>
            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#60CBED] rounded-full blur-[100px] opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-4 relative z-10">
              {[
                { number: '500+', label: 'Học viên tin tưởng.' },
                { number: '5+', label: 'Năm kinh nghiệm.' },
                { number: '100%', label: 'Giáo viên Bản ngữ.' },
                { number: '4.9/5', label: 'Đánh giá hài lòng.' }
              ].map((stat, index) => (
                <div key={index} className="text-center md:border-r border-white/10 last:border-0 group">
                  <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#FDB714] mb-3 group-hover:scale-110 transition-transform drop-shadow-[0_0_20px_rgba(253,183,20,0.3)]">{stat.number}</div>
                  <div className="text-white/80 font-bold text-[9px] sm:text-[10px] tracking-[0.1em] sm:tracking-[0.2em] uppercase px-2">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* 📱 MỚI 1: BOTTOM SHEET MODAL BẰNG FRAMER MOTION */}
      <AnimatePresence>
        {isSheetOpen && (
          <div className="fixed inset-0 z-[1000] flex justify-end flex-col md:hidden">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#003046]/40 backdrop-blur-sm" 
              onClick={() => setIsSheetOpen(false)}
            />
            <motion.div 
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              drag="y" dragConstraints={{ top: 0 }} dragElastic={0.2}
              onDragEnd={(e, { offset, velocity }) => {
                if (offset.y > 100 || velocity.y > 500) setIsSheetOpen(false);
              }}
              className="bg-white rounded-t-[2.5rem] p-6 pb-10 relative z-10 flex flex-col"
            >
              <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6 cursor-grab active:cursor-grabbing shrink-0" />
              <h4 className="text-2xl font-black text-[#003046] mb-6 tracking-tight">Tầm nhìn & Sứ mệnh</h4>
              
              <div className="flex flex-col gap-3" onPointerDown={(e) => e.stopPropagation()}>
                {visionData.map(tab => (
                  <button 
                    key={tab.id} 
                    onClick={() => { setActiveTab(tab.id); setIsSheetOpen(false); }}
                    className={`p-4 rounded-2xl font-bold text-left active:scale-95 transition-all border flex justify-between items-center
                    ${activeTab === tab.id 
                      ? 'bg-[#FDB714]/10 border-[#FDB714] text-[#003046] shadow-sm' 
                      : 'bg-white border-gray-100 text-[#5a7a8a]'}`}
                  >
                    <span className="text-sm">0{tab.id} - {tab.title}</span>
                    {activeTab === tab.id && <span className="text-[#FDB714] text-lg leading-none">✓</span>}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 📱 MỚI 5: SMART CONTEXTUAL FAB */}
      <div className={`fixed bottom-0 left-0 right-0 z-[900] bg-white/90 backdrop-blur-xl border-t border-gray-100 p-4 px-5 flex items-center justify-between gap-4 transition-transform duration-300 md:hidden shadow-[0_-10px_40px_rgba(0,48,70,0.1)] 
      ${isFabVisible && !isSheetOpen ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="text-xs text-[#003046] font-bold tracking-tight">
          Đồng hành cùng Octo?<br/><strong className="text-[#FDB714] text-sm drop-shadow-sm">Đăng ký tư vấn ngay!</strong>
        </div>
        <Link href="/lien-he" className="bg-[#003046] text-white font-black text-[10px] py-3.5 px-6 rounded-full shrink-0 shadow-md uppercase tracking-wider active:scale-95 transition-transform">
          Liên hệ ngay
        </Link>
      </div>

    </main>
  );
}