'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PromoPopup from '@/components/PromoPopup';

// 💡 COMPONENT: TẠO HIỆU ỨNG NỞ RA (SCALE)
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

// 💡 COMPONENT: TYPING TEXT
const TYPING_WORDS = ["toàn diện.", "chuẩn quốc tế.", "cho tương lai.", "không giới hạn."];
const TypingText = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % TYPING_WORDS.length;
      const fullText = TYPING_WORDS[i];
      setText(isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1));
      setTypingSpeed(isDeleting ? 50 : 100);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };
    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  return (
    <span className="text-[#FDB714] drop-shadow-[0_0_20px_rgba(253,183,20,0.3)] border-r-4 border-[#FDB714] pr-2 animate-blink">
      {text}
    </span>
  );
};

// ═══ DỮ LIỆU KHÓA HỌC ═══
const COURSE_DATA = [
  {
    id: 'thieu-nhi', category: 'Thiếu nhi.', age: '3-6 tuổi.',
    levels: [
      { id: 1, name: 'Level 1', img: 'https://octo.vn/img_data/images/hinhanh/1.jpg', levelTitle: 'Tiếng Anh Thiếu Nhi (Cấp độ 1).', levelDesc: 'Khóa Tiếng Anh Thiếu Nhi - Cấp độ 1 (Pre-Foundation) phù hợp với học viên muốn lấy lại nền tảng cơ bản.' },
      { id: 2, name: 'Level 2', img: 'https://octo.vn/img_data/images/hinhanh/2.jpg', levelTitle: 'Tiếng Anh Thiếu Nhi (Cấp độ 2).', levelDesc: 'Khóa Tiếng Anh Thiếu Nhi - Cấp độ 2 (Foundation) phù hợp với học viên muốn đạt trình độ A1, tương đương trình độ nền tảng của IELTS, TOEIC.' },
      { id: 3, name: 'Level 3', img: 'https://octo.vn/img_data/images/hinhanh/3.jpg', levelTitle: 'Tiếng Anh Thiếu Nhi (Cấp độ 3).', levelDesc: 'Khóa Tiếng Anh Thiếu Nhi - Cấp độ 3 (Beginner) phù hợp với học viên muốn đạt trình độ A2, tương đương 2.0-3.0 IELTS/350 TOEIC.' },
      { id: 4, name: 'Level 4', img: 'https://octo.vn/img_data/images/hinhanh/4.jpg', levelTitle: 'Tiếng Anh Thiếu Nhi (Cấp độ 4).', levelDesc: 'Khóa Tiếng Anh Thiếu Nhi - Cấp độ 4 (Pre-intermediate) phù hợp với học viên muốn đạt trình độ B1 (tương đương 3.0-4.0 IELTS/450 TOEIC).' },
      { id: 5, name: 'Level 5', img: 'https://octo.vn/img_data/images/hinhanh/5.jpg', levelTitle: 'Tiếng Anh Thiếu Nhi (Cấp độ 5).', levelDesc: 'Khóa Tiếng Anh Thiếu Nhi - Cấp độ 5 (Intermediate) phù hợp với các bạn học viên mong muốn đạt trình độ B1 - B2, tương đương 4.0-5.0 IELTS/550 TOEIC.' },
      { id: 6, name: 'Level 6', img: 'https://octo.vn/img_data/images/hinhanh/6.jpg', levelTitle: 'Tiếng Anh Thiếu Nhi (Cấp độ 6).', levelDesc: 'Khóa Tiếng Anh Thiếu Nhi - Cấp độ 6 (Advanced A) phù hợp với học viên muốn đạt trình độ B2 - C1, tương đương 5.5-6.5 IELTS/700 TOEIC.' },
      { id: 7, name: 'Level 7', img: 'https://octo.vn/img_data/images/hinhanh/7.jpg', levelTitle: 'Tiếng Anh Thiếu Nhi (Cấp độ 7).', levelDesc: 'Khóa Tiếng Anh Thiếu Nhi - Cấp độ 7 (Advanced B) phù hợp với học viên muốn đạt trình độ C1 - C2, tương đương 7.0+ IELTS/800+TOEIC.' },
    ]
  },
  {
    id: 'thieu-nien', category: 'Thiếu niên.', age: '6-11 tuổi.',
    levels: [
      { id: 1, name: 'Level 1', img: 'https://octo.vn/img_data/images/khoa-hoc/1%20(1).jpg', levelTitle: 'Tiếng Anh Thiếu Niên/ Người Lớn (Cấp độ 1).', levelDesc: 'Tiếng Anh Thiếu Niên/ Người Lớn - Cấp độ 1 (Foundation) phù hợp với học viên muốn lấy lại nền tảng cơ bản.' },
      { id: 2, name: 'Level 2', img: 'https://octo.vn/img_data/images/khoa-hoc/2%20(1).jpg', levelTitle: 'Tiếng Anh Thiếu Niên/ Người Lớn (Cấp độ 2).', levelDesc: 'Khóa Tiếng Anh Thiếu Niên/ Người Lớn - Cấp độ 2 (Foundation) phù hợp với học viên muốn đạt trình độ A1, tương đương trình độ nền tảng của IELTS, TOEIC.' },
      { id: 3, name: 'Level 3', img: 'https://octo.vn/img_data/images/khoa-hoc/3%20(1).jpg', levelTitle: 'Tiếng Anh Thiếu Niên/ Người Lớn (Cấp độ 3).', levelDesc: 'Khóa Tiếng Anh Thiếu Niên/ Người lớn - Cấp độ 3 (Beginner) phù hợp với học viên muốn đạt trình độ A2, tương đương 2.0-3.0 IELTS/350 TOEIC.' },
      { id: 4, name: 'Level 4', img: 'https://octo.vn/img_data/images/khoa-hoc/4%20(1).jpg', levelTitle: 'Tiếng Anh Thiếu Niên/ Người Lớn (Cấp độ 4).', levelDesc: 'Tiếng Anh Thiếu Niên/ Người Lớn - Cấp độ 4 (Pre-intermediate) phù hợp với học viên muốn đạt trình độ B1 (tương đương 3.0-4.0 IELTS/450 TOEIC).' },
      { id: 5, name: 'Level 5', img: 'https://octo.vn/img_data/images/khoa-hoc/5%20(1).jpg', levelTitle: 'Tiếng Anh Thiếu Niên/ Người Lớn (Cấp độ 5).', levelDesc: 'Khóa Tiếng Anh Thiếu Niên/ Người Lớn - Cấp độ 5 (Intermediate) phù hợp với các bạn học viên mong muốn đạt trình độ B1 - B2, tương đương 4.0-5.0 IELTS/550 TOEIC.' },
      { id: 6, name: 'Level 6', img: 'https://octo.vn/img_data/images/khoa-hoc/6%20(1).jpg', levelTitle: 'Tiếng Anh Thiếu Niên/ Người Lớn (Cấp độ 6).', levelDesc: 'Khóa Tiếng Anh Thiếu Niên/ Người Lớn - Cấp độ 6 (Advanced A) phù hợp với học viên muốn đạt trình độ B2 - C1, tương đương 5.5-6.5 IELTS/700 TOEIC.' },
      { id: 7, name: 'Level 7', img: 'https://octo.vn/img_data/images/khoa-hoc/7.jpg', levelTitle: 'Tiếng Anh Thiếu Niên/ Người Lớn (Cấp độ 7).', levelDesc: 'Khóa Tiếng Anh Thiếu Niên/ Người Lớn - Cấp độ 7 (Advanced B) phù hợp với học viên muốn đạt trình độ C1 - C2, tương đương 7.0+ IELTS/800+TOEIC.' },
    ]
  },
  {
    id: 'cap-toc', category: 'Cấp tốc.', age: '11-16 tuổi.',
    levels: [
      { id: 1, name: 'Level 1', img: 'https://octo.vn/img_data/images/khoa-hoc/1.jpg', levelTitle: 'Khóa Cấp Tốc (Cấp độ 1).', levelDesc: 'Khóa Tiếng Anh Cấp Tốc - Cấp độ 1 (Foundation) phù hợp với học viên muốn đạt trình độ A1, tương đương trình độ nền tảng của IELTS, TOEIC trong thời gian ngắn.' },
      { id: 2, name: 'Level 2', img: 'https://octo.vn/img_data/images/khoa-hoc/2.jpg', levelTitle: 'Khóa Cấp Tốc (Cấp độ 2).', levelDesc: 'Khóa Cấp Tốc - Cấp độ 2 (Beginner) phù hợp với học viên muốn đạt trình độ A2, tương đương 2.0-3.0 IELTS/350 TOEIC trong thời gian ngắn.' },
      { id: 3, name: 'Level 3', img: 'https://octo.vn/img_data/images/khoa-hoc/3.jpg', levelTitle: 'Khóa Cấp Tốc (Cấp độ 3).', levelDesc: 'Khóa Tiếng Anh Cấp Tốc - Cấp độ 3 (Pre-intermediate) phù hợp với học viên muốn đạt trình độ B1 (tương đương 3.0-4.0 IELTS/450 TOEIC) trong thời gian ngắn.' },
      { id: 4, name: 'Level 4', img: 'https://octo.vn/img_data/images/khoa-hoc/4.jpg', levelTitle: 'Khóa Cấp Tốc (Cấp độ 4).', levelDesc: 'Khóa Tiếng Anh Cấp Tốc - Cấp độ 4 (Intermediate) phù hợp với các bạn học viên mong muốn đạt trình độ B1 - B2, tương đương 4.0-5.0 IELTS/550 TOEIC trong thời gian ngắn.' },
      { id: 5, name: 'Level 5', img: 'https://octo.vn/img_data/images/khoa-hoc/5.jpg', levelTitle: 'Khóa Cấp Tốc (Cấp độ 5).', levelDesc: 'Khóa Tiếng Anh Cấp Tốc - Cấp độ 5 (Advanced A) phù hợp với học viên muốn đạt trình độ B2 - C1, tương đương 5.5-6.5 IELTS/700 TOEIC trong thời gian ngắn.' },
      { id: 6, name: 'Level 6', img: 'https://octo.vn/img_data/images/khoa-hoc/6.jpg', levelTitle: 'Khóa Cấp Tốc (Cấp độ 6).', levelDesc: 'Khóa Tiếng Anh Cấp Tốc - Cấp độ 6 (Advanced B) phù hợp với học viên muốn đạt trình độ C1 - C2, tương đương 7.0+ IELTS/800+TOEIC trong thời gian ngắn.' },
    ]
  }
];

export default function Home() {
  const [toastMessage, setToastMessage] = useState('');
  const [activeLevels, setActiveLevels] = useState<{ [key: string]: number }>({
    'thieu-nhi': 1, 'thieu-nien': 1, 'cap-toc': 1
  });
  const [activeCourseTab, setActiveCourseTab] = useState('thieu-nhi');

  // 📱 MỚI 1: State cho Khay vuốt từ đáy (Bottom Sheet) trên Mobile
  const [isLevelSheetOpen, setIsLevelSheetOpen] = useState(false);

  // 📱 MỚI 5: Logic Smart Contextual FAB (Vuốt xuống ẩn, vuốt lên hiện)
  const [isFabVisible, setIsFabVisible] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 300) {
        setIsFabVisible(false); // Ẩn khi ở trên cùng màn hình
      } else if (currentScrollY > lastScrollY.current) {
        setIsFabVisible(false); // Đang vuốt xuống -> lặn mất để nhường không gian đọc
      } else {
        setIsFabVisible(true);  // Hơi vuốt lên -> hiện ra mời gọi
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLevelChange = (courseId: string, levelId: number) => {
    setActiveLevels(prev => ({ ...prev, [courseId]: levelId }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('name') as string;

    const data = {
      fullName: name,
      phone: formData.get('phone') as string,
      email: (formData.get('email') as string) || '',
      program: formData.get('course') as string,
      status: 'MỚI',
      type: 'HỌC THỬ'
    };

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setToastMessage(`🎉 Cảm ơn ${name}! Octo. sẽ liên hệ bạn sớm nhất.`);
        setTimeout(() => setToastMessage(''), 4000);
        form.reset();
      } else {
        alert('Có lỗi xảy ra khi lưu dữ liệu!');
      }
    } catch (error) {
      console.error('Lỗi Server:', error);
      alert('Không kết nối được với Spring Boot ở cổng 8080!');
    }
  };

  return (
    <main className="font-sans text-[#1a2e38] bg-[#f8fcfd] overflow-x-hidden relative">
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes ticker { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .animate-ticker { animation: ticker 40s linear infinite; }
        .animate-ticker:hover { animation-play-state: paused; }
        .mask-gradient { mask-image: linear-gradient(to right, transparent 0%, #000 12%, #000 88%, transparent 100%); }
        @keyframes blink { 0%, 100% { border-color: transparent; } 50% { border-color: #FDB714; } }
        .animate-blink { animation: blink 1s step-end infinite; }
        @keyframes scroll-line { 0% { transform: translateY(-100%); opacity: 0; } 50% { opacity: 1; } 100% { transform: translateY(100%); opacity: 0; } }
        .animate-scroll-line { animation: scroll-line 2s cubic-bezier(0.77, 0, 0.175, 1) infinite; }
      `}} />

      {/* ═══ HERO SECTION ═══ */}
      <section id="hero" className="relative min-h-[120vh] bg-gradient-to-br from-[#003046] via-[#005070] to-[#0080a0] flex flex-col justify-center items-center pt-32 pb-40 overflow-hidden">
        <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-[#60CBED] rounded-full mix-blend-screen filter blur-[150px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-[20%] right-[5%] w-[600px] h-[600px] bg-[#FDB714] rounded-full mix-blend-screen filter blur-[180px] opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>

        <div className="absolute top-[15%] right-[10%] text-[8rem] font-black text-white opacity-5 rotate-12 select-none pointer-events-none">∞</div>
        <div className="absolute bottom-[30%] left-[5%] text-[6rem] font-black text-white opacity-5 -rotate-12 select-none pointer-events-none">◎</div>
        
        <div className="max-w-6xl w-full mx-auto px-5 flex flex-col items-center text-center relative z-10">
          <FadeIn className="flex flex-col items-center space-y-6 w-full">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-[10px] font-bold px-5 py-2 rounded-full uppercase tracking-[0.2em] shadow-lg backdrop-blur-md">
              <span className="w-2 h-2 bg-[#FDB714] rounded-full animate-pulse shadow-[0_0_10px_#FDB714]"></span>
              HỆ THỐNG ANH NGỮ CHUẨN QUỐC TẾ.
            </div>
            <h1 className="text-[4rem] md:text-[5.5rem] lg:text-[7rem] font-black text-white leading-[1] tracking-tighter">
              Ngoại ngữ<br className="hidden sm:block" />
              <TypingText /><br className="hidden sm:block" />
              <span className="text-[#60CBED] font-bold text-[3rem] md:text-[4rem] lg:text-[5rem] tracking-tight">Môi trường thật chill.</span>
            </h1>
            <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-2xl font-medium tracking-wide mt-4">
              Octo. mang đến hệ thống học tiếng Anh từ cơ bản đến nâng cao với 100% giáo viên bản ngữ, giúp học viên tự tin giao tiếp và phát triển tư duy sáng tạo.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-6">
              {/* 📱 MỚI 4: Thêm active:scale-95 cho Visual Haptic Feedback */}
              <Link href="#register" className="bg-[#FDB714] text-[#003046] font-black py-4 px-10 rounded-full shadow-[0_10px_30px_rgba(253,183,20,0.4)] hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(253,183,20,0.5)] active:scale-95 transition-all tracking-widest uppercase text-sm">
                Đăng ký học thử.
              </Link>
              <Link href="#courses" className="bg-white/5 backdrop-blur-md border border-white/20 text-white font-bold py-4 px-10 rounded-full hover:bg-white/20 hover:border-white active:scale-95 transition-all tracking-widest uppercase text-sm">
                Xem lộ trình.
              </Link>
            </div>
          </FadeIn>

          <FadeIn delay={300} className="w-full mt-20 relative rounded-[2.5rem] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.6)] group border border-white/20">
            <Image
              src="https://octo.vn/img_data/images/Home/Gi%E1%BB%9Bi%20thi%E1%BB%87u/gioithieu_main.jpg"
              alt="Lớp học tại Octo."
              fill
              className="object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-transform duration-[2s]"
              sizes="(max-width: 768px) 100vw, 80vw"
              priority
            />
            <div className="w-full aspect-[16/9] md:aspect-[21/9]"></div>
            <div className="absolute inset-0 bg-[#003046]/40 mix-blend-multiply z-10 transition-opacity duration-700 group-hover:opacity-0"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#003046] via-[#003046]/20 to-transparent opacity-90 z-10"></div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] md:w-auto bg-white/90 backdrop-blur-xl rounded-[2rem] p-4 md:pr-10 flex flex-col md:flex-row items-center justify-center gap-8 shadow-2xl border border-white/50 z-20">
              <div className="flex gap-8 items-center px-4">
                {[
                  { num: '500+', label: 'Học viên.' },
                  { num: '03', label: 'Lộ trình.' },
                  { num: '100%', label: 'Bản ngữ.' }
                ].map((stat, idx) => (
                  <div key={idx} className="text-center md:text-left">
                    <div className="text-2xl md:text-3xl font-black text-[#003046] leading-none drop-shadow-sm mb-1">{stat.num}</div>
                    <div className="text-[10px] text-[#5a7a8a] font-bold uppercase tracking-[0.1em]">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-60 hover:opacity-100 transition-opacity hidden md:flex z-30">
          <span className="text-[9px] uppercase tracking-[0.3em] text-white font-bold">Cuộn xuống</span>
          <div className="w-[1px] h-12 bg-white/20 overflow-hidden relative">
            <div className="w-full h-full bg-[#FDB714] animate-scroll-line"></div>
          </div>
        </div>
      </section>

      {/* TICKER CHẠY NGANG */}
      <div className="bg-[#003046] border-y border-white/10 overflow-hidden py-5 flex relative z-20 shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
        <div className="flex whitespace-nowrap animate-ticker w-max hover:[animation-play-state:paused]">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 px-4 text-white/60 font-black uppercase tracking-[0.15em] text-sm md:text-base">
              <span className="text-[#FDB714] drop-shadow-[0_0_10px_rgba(253,183,20,0.5)]">🚀 TUYỂN SINH 2026</span>
              <span className="text-white/20 text-xs">●</span>
              <span className="hover:text-white transition-colors cursor-default">TIẾNG ANH GIAO TIẾP</span>
              <span className="text-white/20 text-xs">●</span>
              <span className="hover:text-white transition-colors cursor-default">LUYỆN THI CHỨNG CHỈ</span>
              <span className="text-white/20 text-xs">●</span>
              <span className="text-[#60CBED] text-lg hover:scale-110 hover:text-white transition-all cursor-default">IELTS</span>
              <span className="text-white/20 text-xs">●</span>
              <span className="text-[#60CBED] text-lg hover:scale-110 hover:text-white transition-all cursor-default">TOEIC</span>
              <span className="text-white/20 text-xs">●</span>
              <span className="text-[#60CBED] text-lg hover:scale-110 hover:text-white transition-all cursor-default">TOEFL</span>
              <span className="text-white/20 text-xs">●</span>
              <span className="text-[#60CBED] text-lg hover:scale-110 hover:text-white transition-all cursor-default">SAT</span>
              <span className="text-white/20 text-xs">●</span>
              <span className="text-[#60CBED] text-lg hover:scale-110 hover:text-white transition-all cursor-default">GRE</span>
              <span className="text-white/20 text-xs">●</span>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ ABOUT SECTION ═══ */}
      <section id="about" className="py-28 bg-[#f8fcfd] relative overflow-hidden">
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#60CBED]/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-5 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <FadeIn className="relative grid grid-cols-2 gap-4 h-auto md:h-[550px]">
            <div className="absolute -inset-10 flex items-center justify-center text-[30rem] text-[#60CBED] mix-blend-multiply opacity-5 z-0 pointer-events-none select-none">🐙</div>
            <div className="col-span-1 h-full relative z-10 group rounded-[2.5rem] overflow-hidden shadow-xl border border-white">
              <Image src="https://octo.vn/img_data/images/slider-center/slider_1.jpg" alt="Không gian học." fill className="object-cover" sizes="(max-width: 768px) 50vw, 33vw" />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-gradient-to-br from-[#FDB714] to-yellow-500 rounded-full flex flex-col items-center justify-center font-black text-[#003046] text-center shadow-[0_15px_30px_rgba(253,183,20,0.4)] z-20 group-hover:scale-110 transition-transform duration-500 border-4 border-white">
                <span className="text-4xl leading-none">5+</span>
                <span className="text-[10px] uppercase tracking-[0.2em] mt-1">Năm KN.</span>
              </div>
            </div>
            <div className="col-span-1 grid grid-rows-2 gap-4 h-full relative z-10">
              <div className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-md border border-white hover:-translate-y-1 transition-transform duration-500">
                <Image src="https://octo.vn/img_data/images/hinhanh/tienganhtoancau_2.jpg" alt="Hoạt động." fill className="object-cover" sizes="(max-width: 768px) 50vw, 33vw" />
              </div>
              <div className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-md border border-white hover:-translate-y-1 transition-transform duration-500">
                <Image src="https://octo.vn/img_data/images/hinhanh/453616773_1872224676603910_175310071241587143_n.jpg" alt="Giờ học vui." fill className="object-cover" sizes="(max-width: 768px) 50vw, 33vw" />
              </div>
            </div>
          </FadeIn>
          <FadeIn delay={200} className="space-y-8 relative z-10">
            <div className="inline-flex items-center gap-2 bg-[#60CBED]/10 border border-[#60CBED]/30 text-[#003046] text-[10px] font-black px-5 py-2 rounded-full uppercase tracking-[0.2em] shadow-sm">
              🐙 Về Octo. English.
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-[4rem] font-black text-[#003046] leading-[1.05] tracking-tight">
              Học tiếng Anh<br/>
              <span className="text-[#60CBED]">đúng cách</span> — vui, thực tế & hiệu quả<span className="text-[#FDB714]">.</span>
            </h2>
            <p className="text-[#5a7a8a] text-lg leading-relaxed border-l-4 border-[#FDB714] pl-6 bg-white py-5 pr-5 rounded-r-3xl shadow-[0_10px_30px_rgba(0,48,70,0.03)] font-medium">
              Octo. không chỉ dạy tiếng Anh — chúng tôi xây dựng tư duy (thinkers) cho thế hệ trẻ. Tăng thời gian sử dụng ngôn ngữ trên đa nền tảng, học viên tiếp cận tự nhiên và tích cực trong môi trường "thật chill".
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              {['📍 Vinhomes Grand Park.', '👩‍🏫 Giáo viên bản ngữ.', '🎯 Lộ trình rõ ràng.', '🌐 Đa nền tảng.'].map(tag => (
                <span key={tag} className="px-5 py-2.5 rounded-[1rem] border border-gray-200 bg-white text-xs font-bold text-[#003046] shadow-sm hover:border-[#60CBED] transition-colors cursor-default">
                  {tag}
                </span>
              ))}
            </div>
            <div className="pt-6">
              <Link href="/ve-chung-toi" className="inline-flex bg-[#003046] text-white font-bold py-4 px-8 rounded-full hover:bg-[#60CBED] hover:text-[#003046] shadow-[0_15px_30px_rgba(0,48,70,0.2)] hover:-translate-y-1 active:scale-95 transition-all tracking-wide">
                Khám phá câu chuyện của chúng tôi →
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ COURSES SECTION ═══ */}
      <section id="courses" className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-5">
          <FadeIn className="text-center mb-16 md:mb-24">
            <div className="inline-flex items-center gap-2 bg-[#f0faff] border border-[#60CBED]/30 text-[#003046] text-[10px] font-black px-5 py-2 rounded-full uppercase shadow-sm tracking-[0.2em]">
              📚 Lộ trình học tập
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-[4rem] font-black text-[#003046] mt-6 leading-tight tracking-tight">
              Khám phá lộ trình<br/>
              <span className="text-[#60CBED]">chuyên biệt</span> cho từng độ tuổi<span className="text-[#FDB714]">.</span>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-4 flex flex-row lg:flex-col gap-6 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-hide lg:sticky lg:top-32 h-max z-20">
              {COURSE_DATA.map((course) => {
                const isActive = activeCourseTab === course.id;
                return (
                  <button
                    key={course.id}
                    onClick={() => setActiveCourseTab(course.id)}
                    className={`flex-shrink-0 text-left transition-all duration-500 relative py-2 ${isActive ? 'opacity-100' : 'opacity-40 hover:opacity-70'}`}
                  >
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] mb-2 text-[#5a7a8a]">{course.age}</div>
                    <h3 className={`text-2xl lg:text-4xl font-black tracking-tight transition-colors duration-500 ${isActive ? 'text-[#003046]' : 'text-[#003046]'}`}>
                      {course.category}
                    </h3>
                    <div className={`absolute -left-4 top-0 bottom-0 w-1 bg-[#60CBED] rounded-r-full transition-all duration-500 hidden lg:block ${isActive ? 'h-full opacity-100' : 'h-0 opacity-0'}`}></div>
                  </button>
                );
              })}
            </div>

            <div className="lg:col-span-8 relative">
              {COURSE_DATA.map((course) => {
                const isActive = activeCourseTab === course.id;
                const currentLevel = course.levels.find(l => l.id === activeLevels[course.id]) || course.levels[0];

                return (
                  <div
                    key={course.id}
                    className={`w-full transition-all duration-700 ease-[cubic-bezier(0.25,0.4,0,1)]
                    ${isActive ? 'opacity-100 translate-y-0 scale-100 z-10 relative' : 'opacity-0 translate-y-8 scale-95 pointer-events-none z-0 absolute top-0 left-0 invisible'}`}
                  >
                    <div className="bg-[#f8fcfd] rounded-[3rem] p-8 md:p-12 border border-[#60CBED]/20 shadow-[0_20px_50px_rgba(0,48,70,0.05)]">
                      <div className="mb-10">
                        <h3 className="text-3xl md:text-4xl font-black text-[#003046] mb-4 leading-[1.1] tracking-tight">{currentLevel.levelTitle}</h3>
                        <p className="text-[#5a7a8a] text-lg leading-relaxed font-medium">{currentLevel.levelDesc}</p>
                      </div>
                      
                      <div className="relative w-full aspect-video md:aspect-[21/9] rounded-[2rem] overflow-hidden mb-10 bg-white border border-gray-100 shadow-inner group">
                        <Image src={currentLevel.img} alt={currentLevel.levelTitle} fill className="object-cover object-top group-hover:scale-105 transition-transform duration-[2s]" sizes="(max-width: 1024px) 100vw, 50vw" />
                        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-black text-[#003046] uppercase tracking-widest shadow-sm">
                          {currentLevel.name}
                        </div>
                      </div>

                      <div className="mb-6 flex items-center gap-4">
                        <span className="text-[10px] font-black text-[#003046] uppercase tracking-[0.2em] bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">Chọn cấp độ:</span>
                        <div className="h-[1px] bg-gray-200 grow"></div>
                      </div>

                      {/* 📱 HIỂN THỊ DESKTOP: Các nút Level inline truyền thống */}
                      <div className="hidden md:flex flex-wrap gap-3 mb-10">
                        {course.levels.map((level) => (
                          <button
                            key={level.id} onClick={() => handleLevelChange(course.id, level.id)}
                            className={`px-6 py-3 rounded-2xl text-xs font-bold transition-all duration-150 active:scale-95
                            ${activeLevels[course.id] === level.id
                              ? 'bg-[#FDB714] text-[#003046] shadow-[0_8px_20px_rgba(253,183,20,0.3)] scale-105'
                              : 'bg-white border border-gray-200 text-[#5a7a8a] hover:border-[#60CBED] hover:text-[#003046]'
                            }`}
                          >
                            {level.name}
                          </button>
                        ))}
                      </div>

                      {/* 📱 HIỂN THỊ MOBILE: Nút mở Bottom Sheet để chọn Level gọn gàng */}
                      <div className="md:hidden mb-8">
                        <button 
                          onClick={() => setIsLevelSheetOpen(true)}
                          className="w-full bg-white border-2 border-gray-100 text-[#003046] font-black py-4 rounded-2xl flex justify-between items-center px-5 shadow-sm active:scale-95 transition-all"
                        >
                          <span>Cấp độ: <span className="text-[#60CBED]">{currentLevel.name}</span></span>
                          <span className="text-xs opacity-50">Thay đổi ▼</span>
                        </button>
                      </div>

                      {/* 📱 MOBILE BOTTOM SHEET MODAL (Chỉ render cho Tab đang Active) */}
                      {isLevelSheetOpen && isActive && (
                        <div className="fixed inset-0 z-[1000] flex justify-end flex-col md:hidden">
                          <div className="absolute inset-0 bg-[#003046]/40 backdrop-blur-sm transition-opacity" onClick={() => setIsLevelSheetOpen(false)}></div>
                          <div className="bg-white rounded-t-[2.5rem] p-6 pb-10 relative z-10 transform transition-transform duration-300 translate-y-0">
                            <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6"></div>
                            <h4 className="text-2xl font-black text-[#003046] mb-4 tracking-tight">Chọn cấp độ</h4>
                            <div className="flex flex-col gap-2 max-h-[50vh] overflow-y-auto scrollbar-hide">
                              {course.levels.map(level => (
                                <button 
                                  key={level.id} 
                                  onClick={() => { handleLevelChange(course.id, level.id); setIsLevelSheetOpen(false); }}
                                  className={`p-4 rounded-2xl font-bold text-left active:scale-95 transition-all border
                                  ${activeLevels[course.id] === level.id 
                                    ? 'bg-[#FDB714]/10 border-[#FDB714] text-[#003046]' 
                                    : 'bg-white border-gray-100 text-[#5a7a8a]'}`}
                                >
                                  <span className="block text-sm mb-1">{level.name}</span>
                                  <span className="block text-[11px] font-medium opacity-70 line-clamp-1">{level.levelTitle}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                        <Link href={`/khoa-hoc/${course.id}`} className="flex-1 bg-[#003046] text-white font-black py-4.5 rounded-2xl flex items-center justify-center gap-2 hover:bg-[#60CBED] hover:text-[#003046] transition-all active:scale-95 shadow-[0_10px_30px_rgba(0,48,70,0.2)] hover:-translate-y-1 text-sm uppercase tracking-widest">
                          Xem chi tiết <span className="text-lg">→</span>
                        </Link>
                        <Link href="#register" className="flex-1 bg-white border-2 border-[#003046] text-[#003046] font-black py-4.5 rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-50 active:scale-95 transition-colors text-sm uppercase tracking-widest">
                          Đăng ký tư vấn
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ BENEFITS SECTION ═══ */}
      <section id="benefits" className="py-28 bg-[#003046] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_90%_10%,rgba(96,203,237,0.15)_0%,transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_10%_90%,rgba(253,183,20,0.08)_0%,transparent_60%)]"></div>
        <div className="max-w-7xl mx-auto px-5 relative z-10">
          <FadeIn className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-[#60CBED]/20 text-[#60CBED] text-[10px] font-bold px-5 py-2 rounded-full uppercase tracking-[0.2em] backdrop-blur-md shadow-sm">
              ✨ Điểm khác biệt.
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-[4rem] font-black text-white mt-6 leading-tight tracking-tight">
              Vì sao chọn <span className="text-[#60CBED]">Octo.</span><span className="text-[#FDB714]">?</span>
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { icon: '🗺️', title: 'Lộ trình rõ ràng.', desc: 'Chương trình được thiết kế theo lộ trình từng bước, đảm bảo học viên luôn biết mình đang ở đâu.' },
              { icon: '💛', title: 'Giáo viên tận tâm.', desc: 'Đội ngũ giáo viên bản ngữ và Việt Nam được đào tạo bài bản, tận tâm với từng học viên.' },
              { icon: '🎯', title: 'Chương trình độc quyền.', desc: 'Giáo trình được phát triển riêng bởi Octo., tích hợp kiến thức cuộc sống đa dạng.' },
              { icon: '💻', title: 'Hỗ trợ trực tuyến.', desc: 'Học viên được hỗ trợ 24/7 qua các nền tảng online, giúp duy trì việc học mọi lúc.' },
              { icon: '🌱', title: 'Môi trường tích cực.', desc: 'Không gian học tập "chill" — thoải mái, khuyến khích sự sáng tạo và tự tin.' },
              { icon: '🧠', title: 'Kiến thức đa dạng.', desc: 'Không chỉ tiếng Anh — chúng tôi trang bị cho học viên kiến thức cuộc sống và tư duy.' }
            ].map((benefit, idx) => (
              <FadeIn key={idx} delay={idx * 100} className="group bg-white/5 backdrop-blur-xl backdrop-saturate-150 border border-white/10 rounded-[2.5rem] p-8 hover:bg-white/10 hover:border-[#60CBED]/40 hover:shadow-[0_20px_50px_rgba(96,203,237,0.15)] hover:-translate-y-2 transition-all duration-500">
                <div className="w-16 h-16 shrink-0 rounded-[1.2rem] bg-white/5 flex items-center justify-center text-3xl mb-8 group-hover:scale-110 group-hover:bg-[#FDB714]/20 transition-all border border-white/10 shadow-inner">{benefit.icon}</div>
                <div>
                  <h4 className="text-white font-black text-2xl mb-4 tracking-tight">{benefit.title}</h4>
                  <p className="text-white/60 text-base leading-relaxed font-medium">{benefit.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ GALLERY SECTION ═══ */}
      <section id="gallery" className="py-28 bg-white">
        <FadeIn className="max-w-7xl mx-auto px-5 mb-20 text-center">
          <div className="inline-flex items-center gap-2 bg-[#60CBED]/10 border border-[#60CBED]/30 text-[#003046] text-[10px] font-bold px-5 py-2 rounded-full uppercase tracking-[0.2em]">
            📸 Không gian học tập.
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-[4rem] font-black text-[#003046] mt-6 leading-tight tracking-tight">
            Hệ thống cơ sở<br/><span className="text-[#60CBED]">hiện đại & đẳng cấp.</span>
          </h2>
        </FadeIn>
        <div className="overflow-hidden mask-gradient py-6">
          <div className="flex gap-6 w-max animate-ticker hover:[animation-play-state:paused]">
            {[...Array(2)].map((_, loopIdx) => (
              <React.Fragment key={loopIdx}>
                {["DSC_9045-01-jpeg%20(2).jpg", "slider_7.jpg", "391556076_270094962666205_8909956938447762004_n.jpg", "slider_6.jpg", "341545075_184082517849766_2970636211752244414_n.jpg", "slider_8.jpg", "slider_2.jpg", "anh.jpg"].map((img, idx) => (
                  <div key={idx} className="relative w-[300px] md:w-[450px] h-[220px] md:h-[300px] rounded-[2rem] overflow-hidden shrink-0 group shadow-md hover:shadow-2xl transition-all duration-700 cursor-pointer border-2 border-gray-100 hover:border-[#60CBED]/30 bg-gray-100">
                    <Image src={`https://octo.vn/img_data/images/${img.includes('slider') ? 'slider-center' : 'hinhanh'}/${img}`} alt="Octo Space." fill className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" sizes="(max-width: 768px) 300px, 450px" />
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS SECTION ═══ */}
      <section id="testimonials" className="py-28 bg-gradient-to-b from-white to-[#f0faff] relative">
        <div className="max-w-7xl mx-auto px-5">
          <FadeIn className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-[#f0faff] border border-[#60CBED]/30 text-[#003046] text-[10px] font-bold px-5 py-2 rounded-full uppercase tracking-[0.2em] shadow-sm">
              💬 Học viên nói gì.
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-[4rem] font-black text-[#003046] mt-6 leading-tight tracking-tight">
              Cảm nhận từ<br/><span className="text-[#60CBED]">phụ huynh & học viên.</span>
            </h2>
          </FadeIn>
          
          {/* 📱 MỚI 2: Horizontal Snap Scrolling với hiệu ứng "Nam châm" */}
          <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 pb-8 md:pb-0 -mx-5 px-5 md:mx-0 md:px-0">
            {[
              { init: 'LM', quote: 'Con tôi trước rất ngại nói tiếng Anh, nhưng chỉ sau 3 tháng học tại Octo. con đã tự tin giao tiếp với người nước ngoài. Giáo viên rất tận tâm và phương pháp dạy rất sáng tạo.', author: 'Chị Lan Minh.', role: 'Phụ huynh học viên – Thiếu nhi.' },
              { init: 'TN', quote: 'Không khí lớp học rất vui và thoải mái. Mình học được rất nhiều từ vựng và cách nói chuyện thực tế, không chỉ học ngữ pháp khô khan như trường thôi.', author: 'Bạn Tuấn Nguyên.', role: 'Học viên – Thiếu niên, 14 tuổi.' },
              { init: 'HT', quote: 'Chương trình cấp tốc rất phù hợp với lịch bận của tôi. Sau 2 tháng tôi đã có thể tự tin phỏng vấn bằng tiếng Anh. Octo. thực sự thay đổi cách nhìn của tôi về việc học ngoại ngữ.', author: 'Anh Hoàng Thịnh.', role: 'Học viên – Cấp tốc, Người lớn.' }
            ].map((item, idx) => (
              <FadeIn key={idx} delay={idx * 150} className="w-[85vw] md:w-auto shrink-0 snap-center md:snap-align-none group bg-white rounded-[2.5rem] p-10 shadow-[0_15px_40px_rgba(0,48,70,0.04)] border border-[#60CBED]/10 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(96,203,237,0.12)] transition-all duration-500 relative overflow-hidden flex flex-col">
                <div className="absolute -top-6 -right-6 text-[12rem] leading-none text-[#60CBED] opacity-5 font-black group-hover:rotate-12 group-hover:scale-110 transition-transform duration-500 select-none">🐙</div>
                <p className="italic text-[#5a7a8a] text-lg mb-12 leading-relaxed relative z-10 font-medium flex-1">"{item.quote}"</p>
                <div className="flex items-center gap-5 relative z-10 pt-6 border-t border-gray-100">
                  <div className="w-16 h-16 rounded-[1.2rem] bg-gradient-to-br from-[#60CBED] to-[#003046] flex items-center justify-center text-xl font-black text-white shadow-lg">{item.init}</div>
                  <div>
                    <div className="font-black text-[#003046] text-lg tracking-tight">{item.author}</div>
                    <div className="text-[10px] text-[#5a7a8a] font-black uppercase tracking-[0.15em] mt-1 mb-1.5">{item.role}</div>
                    <div className="text-[#FDB714] text-sm tracking-widest drop-shadow-sm">★★★★★</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ REGISTER FORM SECTION ═══ */}
      <section id="register" className="py-28 bg-gradient-to-br from-[#003046] to-[#005070] relative overflow-hidden">
        <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-[#60CBED] rounded-full mix-blend-screen filter blur-[180px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[700px] bg-[#FDB714] rounded-full mix-blend-screen filter blur-[200px] opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>

        <div className="max-w-7xl mx-auto px-5 grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10 items-center">
          <FadeIn className="text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-[10px] font-bold px-5 py-2 rounded-full uppercase tracking-[0.2em] backdrop-blur-md shadow-lg">
              🎁 Học thử miễn phí.
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-[4rem] font-black mt-8 leading-[1.05] tracking-tight">
              Đăng ký nhận<br/><span className="text-[#FDB714]">buổi học thử</span> miễn phí<span className="text-[#FDB714]">.</span>
            </h2>
            <p className="text-white/70 mt-6 leading-relaxed text-lg max-w-lg font-medium">
              Điền thông tin bên dưới, đội ngũ tư vấn Octo. sẽ liên hệ bạn trong vòng 30 phút để sắp xếp buổi học thử hoàn toàn miễn phí.
            </p>
            <div className="flex flex-col gap-4 mt-10">
              {['Buổi học thử miễn phí, không ràng buộc.', 'Tư vấn lộ trình học phù hợp với từng học viên.', 'Gặp gỡ giáo viên bản ngữ trực tiếp.', 'Tham quan không gian học tập hiện đại.'].map((perk, idx) => (
                <div key={idx} className="flex items-center gap-5 bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 shadow-sm group">
                  <div className="w-10 h-10 shrink-0 bg-white/10 group-hover:bg-[#FDB714] rounded-xl flex items-center justify-center text-white group-hover:text-[#003046] text-base font-black transition-colors">✓</div>
                  <span className="text-white/90 font-medium text-sm md:text-base">{perk}</span>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={200} className="bg-white rounded-[3rem] p-8 md:p-14 shadow-[0_40px_100px_rgba(0,0,0,0.5)] border border-white/20 relative backdrop-blur-lg">
            <div className="absolute -top-8 -right-8 text-[6rem] opacity-20 drop-shadow-2xl animate-bounce-slow pointer-events-none select-none">🚀</div>
            <h3 className="text-3xl lg:text-4xl font-black text-[#003046] mb-2 tracking-tight">Đăng ký ngay.</h3>
            <p className="text-[#5a7a8a] text-[10px] mb-10 font-bold uppercase tracking-[0.2em]">Ưu đãi có hạn — đừng bỏ lỡ!</p>

            {/* 📱 MỚI 3: Form "Thumb-Zone" tăng ring và border khi chạm */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[10px] font-black text-[#003046] mb-2 uppercase tracking-[0.1em]">Họ và tên phụ huynh <span className="text-red-500">*</span></label>
                <input type="text" name="name" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#60CBED] focus:ring-4 focus:ring-[#60CBED]/20 transition-all text-sm text-[#003046] font-bold" placeholder="Nguyễn Văn A" required />
              </div>
              <div>
                <label className="block text-[10px] font-black text-[#003046] mb-2 uppercase tracking-[0.1em]">Số điện thoại <span className="text-red-500">*</span></label>
                {/* Đã chuẩn type="tel" để bung bàn phím số */}
                <input type="tel" name="phone" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#60CBED] focus:ring-4 focus:ring-[#60CBED]/20 transition-all text-sm text-[#003046] font-bold" placeholder="0909 xxx xxx" required />
              </div>
              <div>
                <label className="block text-[10px] font-black text-[#003046] mb-2 uppercase tracking-[0.1em]">Email (không bắt buộc)</label>
                <input type="email" name="email" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#60CBED] focus:ring-4 focus:ring-[#60CBED]/20 transition-all text-sm text-[#003046] font-bold" placeholder="email@example.com" />
              </div>
              <div>
                <label className="block text-[10px] font-black text-[#003046] mb-2 uppercase tracking-[0.1em]">Chương trình quan tâm <span className="text-red-500">*</span></label>
                <select name="course" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#60CBED] focus:ring-4 focus:ring-[#60CBED]/20 transition-all text-sm text-[#003046] font-bold cursor-pointer" required defaultValue="">
                  <option value="" disabled>Chọn chương trình...</option>
                  <option>Tiếng Anh Thiếu Nhi (3–6 tuổi).</option>
                  <option>Tiếng Anh Thiếu Niên / Người lớn.</option>
                  <option>Tiếng Anh Cấp Tốc.</option>
                </select>
              </div>
              
              {/* 📱 MỚI 4: Visual Haptic Feedback cho CTA chính (active:scale-95) */}
              <button type="submit" className="w-full bg-[#FDB714] text-[#003046] font-black py-5 rounded-xl mt-6 shadow-[0_10px_25px_rgba(253,183,20,0.3)] hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(253,183,20,0.5)] active:scale-95 transition-all duration-150 uppercase tracking-[0.15em] text-xs flex items-center justify-center gap-2">
                🎁 Đăng ký học thử ngay!
              </button>
              <p className="text-center text-[10px] text-[#5a7a8a] mt-4 font-medium uppercase tracking-wider">* Thông tin được bảo mật tuyệt đối theo chính sách của Octo.</p>
            </form>
          </FadeIn>
        </div>
      </section>

      {/* ═══ FLOATING CTA BAR (MOBILE) - SMART SCROLL ═══ */}
      {/* 📱 MỚI 5: Thanh hành động dính thông minh bắt State isFabVisible */}
      <div className={`fixed bottom-0 left-0 right-0 z-[900] bg-white/90 backdrop-blur-xl border-t border-gray-100 p-4 px-5 flex items-center justify-between gap-4 transition-transform duration-300 md:hidden shadow-[0_-10px_40px_rgba(0,48,70,0.1)] 
      ${isFabVisible ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="text-xs text-[#003046] font-bold tracking-tight">
          ⏰ Đăng ký hôm nay — <br/><strong className="text-[#FDB714] text-sm drop-shadow-sm">Học thử MIỄN PHÍ!</strong>
        </div>
        <a href="#register" className="bg-[#003046] text-white font-black text-[10px] py-3.5 px-6 rounded-full shrink-0 shadow-md uppercase tracking-wider active:scale-95 transition-transform">
          Đăng ký ngay
        </a>
      </div>

      {/* ═══ TOAST NOTIFICATION ═══ */}
      <div className={`fixed bottom-24 left-1/2 -translate-x-1/2 bg-[#003046] text-white px-8 py-4 rounded-full text-sm font-bold shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-[#60CBED]/40 z-[9999] transition-all duration-500 whitespace-nowrap flex items-center gap-3 ${toastMessage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
        {toastMessage}
      </div>
      <PromoPopup />
    </main>
  );
}