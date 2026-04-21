'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
// 📱 MỚI: Import icon từ lucide-react
import { Sparkles, User, Calendar, Wallet, Send, BookOpen, ChevronRight } from 'lucide-react';

// 💡 HIỆU ỨNG NỞ RA (SCALE) CHUẨN GODLY TỪ TRANG CHỦ
const FadeIn = ({ children, delay = 0, className = "", id }: { children: React.ReactNode, delay?: number, className?: string, id?: string }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
        if (domRef.current) observer.unobserve(domRef.current);
      }
    }, { threshold: 0.1 });
    const currentRef = domRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, []);
  return (
    <div
      ref={domRef}
      id={id}
      className={`transition-all duration-[1200ms] ease-[cubic-bezier(0.25,0.4,0,1)] ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// ═══ DỮ LIỆU CHI TIẾT KHÓA HỌC ═══
const COURSE_DETAILS: Record<string, any> = {
  'thieu-nhi': {
    title: 'Tiếng Anh Thiếu Nhi.',
    subtitle: 'Vui học tiếng Anh, khơi dậy tiềm năng.',
    desc: 'Chương trình được thiết kế đặc biệt cho trẻ từ 3 tuổi trở lên, kết hợp phương pháp học qua chơi (Play-based learning). Giúp trẻ phát triển phản xạ ngôn ngữ tự nhiên, phát âm chuẩn bản xứ và nuôi dưỡng sự tự tin ngay từ những năm tháng đầu đời.',
    audience: ['Trẻ em từ 3 tuổi trở lên.', 'Bé bắt đầu làm quen với tiếng Anh.', 'Phụ huynh muốn con học phát âm chuẩn từ nhỏ.'],
    schedule: '2 buổi/tuần (Thứ 2-4, 3-5 hoặc Cuối tuần). Mỗi buổi 1.5 giờ.',
    tuition: 'Từ 14.000.000đ - 27.500.000đ / Khóa',
    levels: [
      { id: 1, name: 'Level 1', title: 'Tiếng Anh Thiếu Nhi (Cấp độ 1).', desc: 'Khóa Tiếng Anh Thiếu Nhi - Cấp độ 1 (Pre-Foundation) phù hợp với học viên muốn lấy lại nền tảng cơ bản.', img: 'https://octo.vn/img_data/images/hinhanh/1.jpg', price: '14,000,000đ' },
      { id: 2, name: 'Level 2', title: 'Tiếng Anh Thiếu Nhi (Cấp độ 2).', desc: 'Khóa Tiếng Anh Thiếu Nhi - Cấp độ 2 (Foundation) phù hợp với học viên muốn đạt trình độ A1, tương đương trình độ nền tảng của IELTS, TOEIC.', img: 'https://octo.vn/img_data/images/hinhanh/2.jpg', price: '20,000,000đ' },
      { id: 3, name: 'Level 3', title: 'Tiếng Anh Thiếu Nhi (Cấp độ 3).', desc: 'Khóa Tiếng Anh Thiếu Nhi - Cấp độ 3 (Beginner) phù hợp với học viên muốn đạt trình độ A2, tương đương 2.0-3.0 IELTS/350 TOEIC.', img: 'https://octo.vn/img_data/images/hinhanh/3.jpg', price: '21,500,000đ' },
      { id: 4, name: 'Level 4', title: 'Tiếng Anh Thiếu Nhi (Cấp độ 4).', desc: 'Khóa Tiếng Anh Thiếu Nhi - Cấp độ 4 (Pre-intermediate) phù hợp với học viên muốn đạt trình độ B1 (tương đương 3.0-4.0 IELTS/450 TOEIC).', img: 'https://octo.vn/img_data/images/hinhanh/4.jpg', price: '23,000,000đ' },
      { id: 5, name: 'Level 5', title: 'Tiếng Anh Thiếu Nhi (Cấp độ 5).', desc: 'Khóa Tiếng Anh Thiếu Nhi - Cấp độ 5 (Intermediate) phù hợp với các bạn học viên mong muốn đạt trình độ B1 - B2, tương đương 4.0-5.0 IELTS/550 TOEIC.', img: 'https://octo.vn/img_data/images/hinhanh/5.jpg', price: '24,500,000đ' },
      { id: 6, name: 'Level 6', title: 'Tiếng Anh Thiếu Nhi (Cấp độ 6).', desc: 'Khóa Tiếng Anh Thiếu Nhi - Cấp độ 6 (Advanced A) phù hợp với học viên muốn đạt trình độ B2 - C1, tương đương 5.5-6.5 IELTS/700 TOEIC.', img: 'https://octo.vn/img_data/images/hinhanh/6.jpg', price: '26,000,000đ' },
      { id: 7, name: 'Level 7', title: 'Tiếng Anh Thiếu Nhi (Cấp độ 7).', desc: 'Khóa Tiếng Anh Thiếu Nhi - Cấp độ 7 (Advanced B) phù hợp với học viên muốn đạt trình độ C1 - C2, tương đương 7.0+ IELTS/800+TOEIC.', img: 'https://octo.vn/img_data/images/hinhanh/7.jpg', price: '27,500,000đ' },
    ]
  },
  'thieu-nien': {
    title: 'Tiếng Anh Thiếu Niên.',
    subtitle: 'Nền tảng vững chắc, vươn tầm quốc tế.',
    desc: 'Lộ trình phát triển toàn diện 4 kỹ năng Nghe - Nói - Đọc - Viết. Khóa học tập trung xây dựng tư duy phản biện (Critical Thinking) và trang bị kiến thức học thuật để học viên sẵn sàng chinh phục các kỳ thi quốc tế như Cambridge, IELTS.',
    audience: ['Học sinh cấp 2, cấp 3 (từ 12 tuổi trở lên).', 'Học viên cần xây gốc ngữ pháp và từ vựng.', 'Học viên có định hướng thi chứng chỉ quốc tế.'],
    schedule: '2 buổi/tuần (Thứ 3-5, 4-6 hoặc Cuối tuần). Mỗi buổi 2 giờ.',
    tuition: 'Từ 14.000.000đ - 27.500.000đ / Khóa',
    levels: [
      { id: 1, name: 'Level 1', title: 'Tiếng Anh Thiếu Niên/ Người Lớn (Cấp độ 1).', desc: 'Tiếng Anh Thiếu Niên/ Người Lớn - Cấp độ 1 (Foundation) phù hợp với học viên muốn lấy lại nền tảng cơ bản.', img: 'https://octo.vn/img_data/images/khoa-hoc/1%20(1).jpg', price: '14,000,000đ' },
      { id: 2, name: 'Level 2', title: 'Tiếng Anh Thiếu Niên/ Người Lớn (Cấp độ 2).', desc: 'Khóa Tiếng Anh Thiếu Niên/ Người Lớn - Cấp độ 2 (Foundation) phù hợp với học viên muốn đạt trình độ A1, tương đương nền tảng IELTS, TOEIC.', img: 'https://octo.vn/img_data/images/khoa-hoc/2%20(1).jpg', price: '20,000,000đ' },
      { id: 3, name: 'Level 3', title: 'Tiếng Anh Thiếu Niên/ Người Lớn (Cấp độ 3).', desc: 'Khóa Tiếng Anh Thiếu Niên/ Người lớn - Cấp độ 3 (Beginner) phù hợp với học viên muốn đạt trình độ A2, tương đương 2.0-3.0 IELTS/350 TOEIC.', img: 'https://octo.vn/img_data/images/khoa-hoc/3%20(1).jpg', price: '21,500,000đ' },
      { id: 4, name: 'Level 4', title: 'Tiếng Anh Thiếu Niên/ Người Lớn (Cấp độ 4).', desc: 'Tiếng Anh Thiếu Niên/ Người Lớn - Cấp độ 4 (Pre-intermediate) phù hợp với học viên muốn đạt trình độ B1 (tương đương 3.0-4.0 IELTS).', img: 'https://octo.vn/img_data/images/khoa-hoc/4%20(1).jpg', price: '23,000,000đ' },
      { id: 5, name: 'Level 5', title: 'Tiếng Anh Thiếu Niên/ Người Lớn (Cấp độ 5).', desc: 'Khóa Tiếng Anh Thiếu Niên/ Người Lớn - Cấp độ 5 (Intermediate) phù hợp mong muốn đạt trình độ B1 - B2, tương đương 4.0-5.0 IELTS/550 TOEIC.', img: 'https://octo.vn/img_data/images/khoa-hoc/5%20(1).jpg', price: '24,500,000đ' },
      { id: 6, name: 'Level 6', title: 'Tiếng Anh Thiếu Niên/ Người Lớn (Cấp độ 6).', desc: 'Khóa Tiếng Anh Thiếu Niên/ Người Lớn - Cấp độ 6 (Advanced A) phù hợp với học viên muốn đạt trình độ B2 - C1, tương đương 5.5-6.5 IELTS.', img: 'https://octo.vn/img_data/images/khoa-hoc/6%20(1).jpg', price: '26,000,000đ' },
      { id: 7, name: 'Level 7', title: 'Tiếng Anh Thiếu Niên/ Người Lớn (Cấp độ 7).', desc: 'Khóa Tiếng Anh Thiếu Niên/ Người Lớn - Cấp độ 7 (Advanced B) phù hợp với học viên muốn đạt trình độ C1 - C2, tương đương 7.0+ IELTS.', img: 'https://octo.vn/img_data/images/khoa-hoc/7.jpg', price: '27,500,000đ' },
    ]
  },
  'cap-toc': {
    title: 'Tiếng Anh Cấp Tốc.',
    subtitle: 'Đột phá điểm số, tự tin giao tiếp.',
    desc: 'Khóa học được thiết kế tinh gọn, cá nhân hóa lộ trình để tối ưu thời gian học. Phù hợp cho học viên cần luyện thi chứng chỉ gấp hoặc người đi làm muốn cải thiện khả năng tiếng Anh trong thời gian ngắn nhất.',
    audience: ['Mọi lứa tuổi (Học sinh, sinh viên, người đi làm...)', 'Người cần thi chứng chỉ IELTS, TOEIC gấp.', 'Người đi làm bận rộn cần học cấp tốc.'],
    schedule: '3 buổi/tuần hoặc linh hoạt theo lịch học viên. Mỗi buổi 2 giờ.',
    tuition: 'Từ 20.000.000đ - 27.500.000đ / Khóa',
    levels: [
      { id: 1, name: 'Level 1', title: 'Khóa Cấp Tốc (Cấp độ 1).', desc: 'Khóa Tiếng Anh Cấp Tốc - Cấp độ 1 (Foundation) phù hợp với học viên muốn đạt trình độ A1, tương đương nền tảng của IELTS trong thời gian ngắn.', img: 'https://octo.vn/img_data/images/khoa-hoc/1.jpg', price: '20,000,000đ' },
      { id: 2, name: 'Level 2', title: 'Khóa Cấp Tốc (Cấp độ 2).', desc: 'Khóa Cấp Tốc - Cấp độ 2 (Beginner) phù hợp với học viên muốn đạt trình độ A2, tương đương 2.0-3.0 IELTS/350 TOEIC trong thời gian ngắn.', img: 'https://octo.vn/img_data/images/khoa-hoc/2.jpg', price: '21,500,000đ' },
      { id: 3, name: 'Level 3', title: 'Khóa Cấp Tốc (Cấp độ 3).', desc: 'Khóa Tiếng Anh Cấp Tốc - Cấp độ 3 (Pre-intermediate) phù hợp với học viên muốn đạt trình độ B1 (tương đương 3.0-4.0 IELTS) trong thời gian ngắn.', img: 'https://octo.vn/img_data/images/khoa-hoc/3.jpg', price: '23,000,000đ' },
      { id: 4, name: 'Level 4', title: 'Khóa Cấp Tốc (Cấp độ 4).', desc: 'Khóa Tiếng Anh Cấp Tốc - Cấp độ 4 (Intermediate) phù hợp với học viên mong muốn đạt B1 - B2, tương đương 4.0-5.0 IELTS trong thời gian ngắn.', img: 'https://octo.vn/img_data/images/khoa-hoc/4.jpg', price: '24,500,000đ' },
      { id: 5, name: 'Level 5', title: 'Khóa Cấp Tốc (Cấp độ 5).', desc: 'Khóa Tiếng Anh Cấp Tốc - Cấp độ 5 (Advanced A) phù hợp với học viên muốn đạt trình độ B2 - C1, tương đương 5.5-6.5 IELTS trong thời gian ngắn.', img: 'https://octo.vn/img_data/images/khoa-hoc/5.jpg', price: '26,000,000đ' },
      { id: 6, name: 'Level 6', title: 'Khóa Cấp Tốc (Cấp độ 6).', desc: 'Khóa Tiếng Anh Cấp Tốc - Cấp độ 6 (Advanced B) phù hợp với học viên muốn đạt trình độ C1 - C2, tương đương 7.0+ IELTS trong thời gian ngắn.', img: 'https://octo.vn/img_data/images/khoa-hoc/6.jpg', price: '27,500,000đ' },
    ]
  }
};

export default function CourseDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const [toastMessage, setToastMessage] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('Chưa xác định (Cần tư vấn)');
  const course = COURSE_DETAILS[resolvedParams.id];

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

  if (!course) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center bg-[#f8fcfd]">
        <div className="text-8xl opacity-30 text-[#003046]">🐙</div>
        <h1 className="text-4xl font-black text-[#003046] mt-4">Khóa học không tồn tại.</h1>
        <Link href="/khoa-hoc" className="mt-6 bg-[#FDB714] text-[#003046] font-bold px-6 py-3 rounded-full hover:shadow-lg active:scale-95 transition-all">
          Quay lại Danh sách Khóa học
        </Link>
      </div>
    );
  }

  const handleRegisterClick = (levelTitle: string) => {
    setSelectedLevel(levelTitle);
    const formElement = document.getElementById('register-form-area');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const email = (formData.get('email') as string) || '';
    const courseTitle = formData.get('course') as string;
    const level = formData.get('level') as string;

    const fullCourseInfo = level !== 'Chưa xác định (Cần tư vấn)' ? `${courseTitle} (${level})` : courseTitle;
    const data = {
      fullName: name,
      phone: phone,
      email: email,
      program: fullCourseInfo,
      status: 'MỚI',
      type: 'KHÓA HỌC'
    };

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setToastMessage(`🎉 Đăng ký thành công! Tư vấn viên sẽ liên hệ phụ huynh ${name} sớm nhất.`);
        setTimeout(() => setToastMessage(''), 4000);
        form.reset();
        setSelectedLevel('Chưa xác định (Cần tư vấn)');
      } else {
        alert('Có lỗi xảy ra khi lưu dữ liệu!');
      }
    } catch (error) {
      console.error('Lỗi Server:', error);
      alert('Không kết nối được với Server!');
    }
  };

  return (
    <main className="font-sans bg-[#f8fcfd] overflow-x-hidden relative min-h-screen pt-32 pb-24">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#60CBED]/10 rounded-full mix-blend-multiply filter blur-[150px] animate-pulse pointer-events-none"></div>
      <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-[#FDB714]/5 rounded-full mix-blend-multiply filter blur-[180px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-5 relative z-10">
        <Link href="/khoa-hoc" className="inline-flex items-center gap-2 text-[#5a7a8a] hover:text-[#60CBED] active:scale-95 text-sm font-bold mb-8 transition-all">
          ← Trở về Danh sách khóa học
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* ================= CỘT TRÁI (FORM ĐĂNG KÝ) ================= */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 space-y-6 z-20">
            <FadeIn className="bg-[#003046] text-white rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,48,70,0.2)] border border-[#60CBED]/20 relative overflow-hidden">
              <div className="absolute -top-6 -right-6 text-[10rem] opacity-5 text-[#60CBED] rotate-12 select-none pointer-events-none">🐙</div>
              
              {/* 📱 MỚI: Đã thay Icon Thông tin khóa học */}
              <div className="inline-flex items-center gap-2 bg-[#60CBED]/20 border border-[#60CBED]/40 text-[#60CBED] text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-4">
                <Sparkles className="w-3.5 h-3.5" /> Thông tin khóa học
              </div>
              
              <h1 className="text-3xl md:text-4xl font-black leading-tight mb-2 tracking-tight">
                {course.title.replace('.', '')}<span className="text-[#FDB714]">.</span>
              </h1>
              <h3 className="text-lg font-bold text-[#60CBED] mb-6">{course.subtitle}</h3>
              <p className="text-white/70 text-sm leading-relaxed mb-6 font-medium">{course.desc}</p>
              <div className="space-y-4 pt-6 border-t border-white/10">
                
                <div className="flex items-center gap-4">
                  {/* 📱 MỚI: Đã thay Icon Đối tượng */}
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#FDB714] shadow-inner"> 
                    <User className="w-5 h-5" /> 
                  </div>
                  <div>
                    <div className="text-[10px] text-[#60CBED] font-bold uppercase tracking-wider">Đối tượng</div>
                    <div className="text-sm font-bold text-white">{course.audience[0]}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {/* 📱 MỚI: Đã thay Icon Lịch học */}
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#FDB714] shadow-inner"> 
                    <Calendar className="w-5 h-5" /> 
                  </div>
                  <div>
                    <div className="text-[10px] text-[#60CBED] font-bold uppercase tracking-wider">Lịch học</div>
                    <div className="text-sm font-bold text-white truncate max-w-[200px]" title={course.schedule}>{course.schedule}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {/* 📱 MỚI: Đã thay Icon Học phí */}
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#FDB714] shadow-inner"> 
                    <Wallet className="w-5 h-5" /> 
                  </div>
                  <div>
                    <div className="text-[10px] text-[#60CBED] font-bold uppercase tracking-wider">Học phí chung</div>
                    <div className="text-sm font-bold text-white">{course.tuition}</div>
                  </div>
                </div>

              </div>
            </FadeIn>

            <FadeIn delay={100} id="register-form-area" className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-[0_15px_40px_rgba(0,48,70,0.06)] border border-[#60CBED]/20">
              <h3 className="text-2xl font-black text-[#003046] mb-2 tracking-tight">Đăng ký tư vấn.</h3>
              <p className="text-[#5a7a8a] text-[10px] mb-6 font-bold uppercase tracking-wider">Nhận lộ trình test miễn phí!</p>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <input type="text" name="name" required placeholder="Họ và tên phụ huynh..."
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#60CBED] focus:bg-white focus:ring-4 focus:ring-[#60CBED]/20 transition-all text-sm text-[#003046] font-bold" />
                </div>
                <div>
                  {/* 📱 Đã dùng input type="tel" chuẩn Thumb-zone */}
                  <input type="tel" name="phone" required placeholder="Số điện thoại liên hệ..."
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#60CBED] focus:bg-white focus:ring-4 focus:ring-[#60CBED]/20 transition-all text-sm text-[#003046] font-bold" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-[#5a7a8a] mb-2 uppercase tracking-wide">Cấp độ quan tâm.</label>
                  <input type="hidden" name="level" value={selectedLevel} />

                  {/* 📱 HIỂN THỊ DESKTOP */}
                  <select
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="hidden md:block w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#60CBED] focus:bg-white focus:ring-4 focus:ring-[#60CBED]/20 transition-all text-sm text-[#003046] font-bold cursor-pointer"
                  >
                    <option value="Chưa xác định (Cần tư vấn)">Chưa xác định (Cần tư vấn)</option>
                    {course.levels.map((l: any) => (
                      <option key={l.id} value={l.title}>{l.title}</option>
                    ))}
                  </select>

                  {/* 📱 HIỂN THỊ MOBILE: Nút mở Bottom Sheet */}
                  <button
                    type="button"
                    onClick={() => setIsSheetOpen(true)}
                    className="md:hidden w-full p-4 bg-gray-50 border border-gray-200 rounded-xl flex justify-between items-center text-left active:scale-95 transition-all text-sm text-[#003046] font-bold"
                  >
                    <span className="truncate">{selectedLevel}</span>
                    <span className="text-xs opacity-50 shrink-0 ml-2">▼</span>
                  </button>
                </div>
                <input type="hidden" name="course" value={course.title} />

                {/* 📱 MỚI: Đã thay Icon Nút Submit */}
                <button type="submit" className="w-full bg-[#FDB714] text-[#003046] font-black py-4.5 rounded-xl mt-2 hover:shadow-[0_8px_25px_rgba(253,183,20,0.4)] hover:-translate-y-1 active:scale-95 transition-all uppercase tracking-widest text-xs flex justify-center items-center gap-2">
                  <Send className="w-4 h-4" /> Gửi thông tin
                </button>
              </form>
            </FadeIn>
          </div>

          {/* ================= CỘT PHẢI (DANH SÁCH LỘ TRÌNH) ================= */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8">
            {/* 📱 MỚI: Đã thay Icon Chi tiết các cấp độ học */}
            <div className="inline-flex items-center gap-2 bg-white border border-[#60CBED]/30 text-[#003046] text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
              <BookOpen className="w-3.5 h-3.5 text-[#60CBED]" /> Chi tiết các cấp độ học
            </div>

            {/* 📱 MỚI: Swipe Hint - Hiệu ứng vuốt ngang chỉ hiện trên Mobile */}
            <div className="md:hidden flex items-center gap-1.5 text-[#5a7a8a] text-[10px] font-bold uppercase tracking-wider mt-4 mb-2">
              <span>Vuốt xem thêm</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                <ChevronRight className="w-3.5 h-3.5 text-[#FDB714]" />
              </motion.div>
            </div>

            {/* 📱 Snap Scroll theo phương ngang cho mobile */}
            <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide md:flex-col md:overflow-visible gap-6 md:gap-6 pb-6 md:pb-0 -mx-5 px-5 md:mx-0 md:px-0">
              {course.levels.map((level: any, idx: number) => (
                <FadeIn key={level.id} delay={idx * 100} className="snap-center w-[85vw] md:w-auto shrink-0 md:shrink flex flex-col sm:flex-row gap-6 group bg-white rounded-[2rem] p-4 shadow-[0_10px_30px_rgba(0,48,70,0.03)] border border-[#60CBED]/10 hover:border-[#60CBED]/40 hover:shadow-[0_20px_50px_rgba(96,203,237,0.15)] hover:-translate-y-2 transition-all duration-500 overflow-hidden relative">

                  <div className="w-full sm:w-2/5 aspect-[4/3] sm:aspect-auto sm:h-auto rounded-2xl overflow-hidden shrink-0 relative bg-gray-100">
                    <img src={level.img} alt={level.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#003046] text-[10px] font-black px-3 py-1 rounded-full uppercase shadow-md tracking-wider">
                      {level.name}
                    </div>
                  </div>

                  <div className="w-full sm:w-3/5 py-2 pr-4 flex flex-col">
                    <h3 className="text-xl font-black text-[#003046] mb-3 group-hover:text-[#60CBED] transition-colors leading-tight tracking-tight">
                      {level.title}
                    </h3>
                    <p className="text-[#5a7a8a] text-sm leading-relaxed font-medium mb-6 flex-1">
                      {level.desc}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                      <div>
                        <div className="text-[10px] text-[#5a7a8a] font-bold uppercase tracking-wider mb-0.5">Học phí dự kiến</div>
                        <div className="text-[#FDB714] font-black text-sm">{level.price}</div>
                      </div>
                      <button
                        onClick={() => handleRegisterClick(level.title)}
                        className="bg-[#003046] text-white text-xs font-bold px-5 py-2.5 rounded-full hover:bg-[#60CBED] hover:text-[#003046] hover:shadow-lg active:scale-95 transition-all tracking-wide"
                      >
                        Chọn cấp độ
                      </button>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 📱 BOTTOM SHEET MODAL */}
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
              className="bg-white rounded-t-[2.5rem] p-6 pb-10 relative z-10 flex flex-col max-h-[85vh]"
            >
              <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto mb-6 cursor-grab active:cursor-grabbing shrink-0" />
              <h4 className="text-2xl font-black text-[#003046] mb-1 tracking-tight shrink-0">Chọn cấp độ</h4>
              <p className="text-xs text-[#5a7a8a] mb-6 shrink-0 uppercase tracking-wider font-bold">Lộ trình {course.title}</p>

              <div className="flex flex-col gap-3 overflow-y-auto scrollbar-hide pb-10" onPointerDown={(e) => e.stopPropagation()}>
                <button
                  onClick={() => { setSelectedLevel('Chưa xác định (Cần tư vấn)'); setIsSheetOpen(false); }}
                  className={`p-4 rounded-2xl font-bold text-left active:scale-95 transition-all border shrink-0 flex justify-between items-center ${selectedLevel === 'Chưa xác định (Cần tư vấn)' ?
                    'bg-[#FDB714]/10 border-[#FDB714] text-[#003046]' : 'bg-white border-gray-100 text-[#5a7a8a]'}`}
                >
                  <span className="text-sm">Chưa xác định (Cần tư vấn)</span>
                </button>
                {course.levels.map((l: any) => (
                  <button
                    key={l.id}
                    onClick={() => { setSelectedLevel(l.title); setIsSheetOpen(false); }}
                    className={`p-4 rounded-2xl font-bold text-left active:scale-95 transition-all border shrink-0 flex justify-between items-center ${selectedLevel === l.title ?
                      'bg-[#FDB714]/10 border-[#FDB714] text-[#003046] shadow-sm' : 'bg-white border-gray-100 text-[#5a7a8a]'}`}
                  >
                    <span className="text-sm pr-4 leading-snug">{l.title}</span>
                    {selectedLevel === l.title && <span className="text-[#FDB714] text-lg leading-none shrink-0">✓</span>}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 📱 SMART CONTEXTUAL FAB */}
      <div className={`fixed bottom-0 left-0 right-0 z-[900] bg-white/90 backdrop-blur-xl border-t border-gray-100 p-4 px-5 flex items-center justify-between gap-4 transition-transform duration-300 md:hidden shadow-[0_-10px_40px_rgba(0,48,70,0.1)]
        ${isFabVisible && !isSheetOpen ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="text-xs text-[#003046] font-bold tracking-tight">
          Sẵn sàng bắt đầu?<br /><strong className="text-[#FDB714] text-sm drop-shadow-sm">Đăng ký ngay!</strong>
        </div>
        <button onClick={() => handleRegisterClick('Chưa xác định (Cần tư vấn)')} className="bg-[#003046] text-white font-black text-[10px] py-3.5 px-6 rounded-full shrink-0 shadow-md uppercase tracking-wider active:scale-95 transition-transform">
          Nhận tư vấn
        </button>
      </div>

      <div className={`fixed bottom-24 left-1/2 -translate-x-1/2 bg-[#003046] text-white px-8 py-4 rounded-full text-sm font-bold shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-[#60CBED]/40 z-[9999] transition-all duration-500 whitespace-nowrap flex items-center gap-3 ${toastMessage ?
        'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
        {toastMessage}
      </div>
    </main>
  );
}