'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';

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
    }, { threshold: 0.1 }); 
    
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

// Dữ liệu Khóa học và Cấp độ
const COURSE_DATA = [
  {
    id: 'thieu-nhi',
    category: 'Thiếu nhi',
    age: '3-6 tuổi',
    level: 'Cơ bản',
    title: 'Tiếng Anh Thiếu Nhi.',
    desc: 'Khơi dậy niềm đam mê tiếng Anh từ nhỏ thông qua phương pháp học qua chơi (Play-based learning). Lộ trình 7 cấp độ từ cơ bản đến nâng cao.',
    levels: [
      { id: 1, name: 'Level 1', img: 'https://octo.vn/img_data/images/hinhanh/1.jpg' },
      { id: 2, name: 'Level 2', img: 'https://octo.vn/img_data/images/hinhanh/2.jpg' },
      { id: 3, name: 'Level 3', img: 'https://octo.vn/img_data/images/hinhanh/3.jpg' },
      { id: 4, name: 'Level 4', img: 'https://octo.vn/img_data/images/hinhanh/4.jpg' },
      { id: 5, name: 'Level 5', img: 'https://octo.vn/img_data/images/hinhanh/5.jpg' },
      { id: 6, name: 'Level 6', img: 'https://octo.vn/img_data/images/hinhanh/6.jpg' },
      { id: 7, name: 'Level 7', img: 'https://octo.vn/img_data/images/hinhanh/7.jpg' },
    ]
  },
  {
    id: 'thieu-nien',
    category: 'Thiếu niên',
    age: '6-11 tuổi',
    level: 'Trung cấp',
    title: 'Tiếng Anh Thiếu Niên.',
    desc: 'Phát triển toàn diện 4 kỹ năng và tư duy phản biện. Trang bị kiến thức vững chắc để chinh phục các kỳ thi quốc tế. Lộ trình 7 cấp độ chuyên sâu.',
    levels: [
      { id: 1, name: 'Level 1', img: 'https://octo.vn/img_data/images/khoa-hoc/1%20(1).jpg' },
      { id: 2, name: 'Level 2', img: 'https://octo.vn/img_data/images/khoa-hoc/2%20(1).jpg' },
      { id: 3, name: 'Level 3', img: 'https://octo.vn/img_data/images/khoa-hoc/3%20(1).jpg' },
      { id: 4, name: 'Level 4', img: 'https://octo.vn/img_data/images/khoa-hoc/4%20(1).jpg' },
      { id: 5, name: 'Level 5', img: 'https://octo.vn/img_data/images/khoa-hoc/5%20(1).jpg' },
      { id: 6, name: 'Level 6', img: 'https://octo.vn/img_data/images/khoa-hoc/6%20(1).jpg' },
      { id: 7, name: 'Level 7', img: 'https://octo.vn/img_data/images/khoa-hoc/7.jpg' },
    ]
  },
  {
    id: 'cap-toc',
    category: 'Cấp tốc',
    age: '11-16 tuổi',
    level: 'Nâng cao',
    title: 'Tiếng Anh Cấp Tốc.',
    desc: 'Lộ trình tinh gọn giúp học viên bứt phá điểm số và giao tiếp tự tin trong thời gian ngắn nhất. Chương trình 6 cấp độ hiệu quả cao.',
    levels: [
      { id: 1, name: 'Level 1', img: 'https://octo.vn/img_data/images/khoa-hoc/1.jpg' },
      { id: 2, name: 'Level 2', img: 'https://octo.vn/img_data/images/khoa-hoc/2.jpg' },
      { id: 3, name: 'Level 3', img: 'https://octo.vn/img_data/images/khoa-hoc/3.jpg' },
      { id: 4, name: 'Level 4', img: 'https://octo.vn/img_data/images/khoa-hoc/4.jpg' },
      { id: 5, name: 'Level 5', img: 'https://octo.vn/img_data/images/khoa-hoc/5.jpg' },
      { id: 6, name: 'Level 6', img: 'https://octo.vn/img_data/images/khoa-hoc/6.jpg' },
    ]
  }
];

export default function CourseListing() {
  const [activeLevels, setActiveLevels] = useState<{ [key: string]: number }>({
    'thieu-nhi': 1,
    'thieu-nien': 1,
    'cap-toc': 1
  });

  const [filterAge, setFilterAge] = useState('Tất cả');
  const [filterLevel, setFilterLevel] = useState('Tất cả');
  const [sortBy, setSortBy] = useState('newest');

  const handleLevelChange = (courseId: string, levelId: number) => {
    setActiveLevels(prev => ({ ...prev, [courseId]: levelId }));
  };

  const filteredCourses = useMemo(() => {
    let result = COURSE_DATA.filter(course => {
      const matchAge = filterAge === 'Tất cả' || course.age.includes(filterAge);
      const matchLevel = filterLevel === 'Tất cả' || course.level.includes(filterLevel);
      return matchAge && matchLevel;
    });

    if (sortBy === 'level-up') {
      const levelMap: { [key: string]: number } = { 'Cơ bản': 1, 'Trung cấp': 2, 'Nâng cao': 3 };
      result.sort((a, b) => levelMap[a.level] - levelMap[b.level]);
    }
    return result;
  }, [filterAge, filterLevel, sortBy]);

  return (
    <main className="min-h-screen bg-[#f8fcfd] pt-32 pb-24 relative overflow-x-hidden">
      
      {/* 💡 Ánh sáng nền Glow ảo diệu */}
      <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#60CBED]/20 blur-[150px] rounded-full pointer-events-none z-0 animate-pulse"></div>

      <div className="max-w-7xl mx-auto px-5 relative z-10">
        
        {/* ═══ HEADER TRANG ═══ */}
        <FadeIn className="mb-16 space-y-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white border border-[#60CBED]/30 text-[#003046] text-[10px] font-bold px-5 py-2 rounded-full uppercase tracking-[0.2em] shadow-sm">
            📚 Lộ trình học tập
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#003046] leading-[1.05] tracking-tight">
            Danh sách <br/><span className="text-[#60CBED]">Khóa học.</span>
          </h1>
          <p className="text-[#5a7a8a] max-w-2xl mx-auto text-lg leading-relaxed mt-6 font-medium">
            Khám phá các lộ trình học tập tối ưu được thiết kế riêng biệt với các cấp độ rõ ràng tại Octo. English.
          </p>
        </FadeIn>

        {/* ═══ BỘ LỌC (FILTER BAR VIP - GODLY STYLE) ═══ */}
        <div className="sticky top-24 z-[50] bg-white/70 backdrop-blur-xl backdrop-saturate-150 border border-white/50 rounded-[2rem] p-4 px-6 md:px-8 mb-20 flex flex-col md:flex-row items-center gap-6 shadow-[0_15px_40px_rgba(0,48,70,0.06)] transition-all">
          
          {/* Lọc theo tuổi */}
          <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
            <span className="text-[10px] font-black text-[#5a7a8a] uppercase tracking-[0.15em]">Độ tuổi:</span>
            <div className="flex flex-wrap gap-2">
              {['Tất cả', '3-6 tuổi', '6-11 tuổi', '11-16 tuổi'].map(age => (
                <button 
                  key={age} onClick={() => setFilterAge(age)}
                  className={`px-4 py-2.5 rounded-[1rem] text-xs font-bold transition-all duration-300 ${filterAge === age ? 
                    'bg-[#003046] text-[#FDB714] shadow-md scale-105' : 'bg-white border border-gray-200 text-[#5a7a8a] hover:border-[#60CBED] hover:bg-[#f0faff]'}`}
                >
                  {age}
                </button>
              ))}
            </div>
          </div>

          <div className="h-10 w-[1px] bg-gray-200 hidden md:block"></div>

          {/* Lọc theo trình độ */}
          <div className="flex items-center gap-4 w-full md:w-auto">
            <span className="text-[10px] font-black text-[#5a7a8a] uppercase tracking-[0.15em]">Trình độ:</span>
            <select 
              value={filterLevel} onChange={(e) => setFilterLevel(e.target.value)}
              className="bg-white border border-gray-200 text-[#003046] text-xs font-bold px-4 py-2.5 rounded-[1rem] outline-none focus:border-[#60CBED] cursor-pointer hover:bg-[#f0faff] transition-colors shadow-sm"
            >
              <option value="Tất cả">Tất cả</option>
              <option value="Cơ bản">Cơ bản</option>
              <option value="Trung cấp">Trung cấp</option>
              <option value="Nâng cao">Nâng cao</option>
            </select>
          </div>

          {/* Sắp xếp */}
          <div className="md:ml-auto w-full md:w-auto flex justify-end">
            <button 
              onClick={() => setSortBy(sortBy === 'newest' ? 'level-up' : 'newest')}
              className="text-[#003046] bg-[#FDB714] text-xs font-black px-6 py-3 rounded-full hover:shadow-[0_8px_20px_rgba(253,183,20,0.4)] hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 uppercase tracking-[0.1em]"
            >
              {sortBy === 'newest' ? 'Mới nhất' : 'Cấp độ tăng dần'} <span className="text-base leading-none">⇅</span>
            </button>
          </div>
        </div>

        {/* ═══ DANH SÁCH KHÓA HỌC ═══ */}
        {filteredCourses.length > 0 ? (
          <div className="space-y-20">
            {filteredCourses.map((course, index) => {
              const currentLevel = course.levels.find(l => l.id === activeLevels[course.id]) || course.levels[0];
              
              return (
                <FadeIn key={course.id} delay={index * 150} className="group bg-white rounded-[3rem] overflow-hidden border border-[#60CBED]/20 shadow-[0_15px_50px_rgba(0,48,70,0.06)] hover:shadow-[0_25px_60px_rgba(0,48,70,0.12)] hover:-translate-y-2 transition-all duration-500 flex flex-col lg:flex-row relative">
                  
                  {/* Hiệu ứng viền hắt sáng khi hover */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#60CBED]/30 rounded-[3rem] transition-colors pointer-events-none z-20"></div>

                  {/* Khu vực Hình ảnh */}
                  <div className="lg:w-5/12 relative bg-[#f0faff] flex flex-col justify-between p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-gray-100 overflow-hidden">
                    {/* Bạch tuộc mờ nền */}
                    <div className="absolute -bottom-10 -left-10 text-[15rem] text-[#60CBED] mix-blend-multiply opacity-5 pointer-events-none group-hover:rotate-12 transition-transform duration-700 select-none">🐙</div>
                    
                    <div className="relative z-10 flex gap-2">
                      <span className="bg-[#003046] text-white text-[10px] font-black px-5 py-2.5 rounded-full uppercase shadow-lg tracking-[0.15em]">{course.category}</span>
                      <span className="bg-white text-[#003046] text-[10px] font-black px-5 py-2.5 rounded-full uppercase shadow-sm border border-gray-100 tracking-[0.15em]">{course.level}</span>
                    </div>

                    {/* 💡 Đã sửa aspect-4/3 thành aspect-[4/3] chuẩn Tailwind */}
                    <div className="relative z-10 w-full aspect-[4/3] mt-10 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] transition-all duration-500 bg-gray-100">
                      <img 
                        src={currentLevel.img} 
                        alt={`${course.title} - ${currentLevel.name}`} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        key={currentLevel.img}
                      />
                    </div>
                    <div className="mt-10 text-center relative z-10">
                      <span className="inline-block bg-white px-5 py-2.5 rounded-xl text-[#003046] font-black text-xs shadow-sm border border-gray-100 tracking-wide">
                        Đang xem: <span className="text-[#60CBED]">{currentLevel.name}</span>.
                      </span>
                    </div>
                  </div>

                  {/* Khu vực Nội dung & Chọn Level */}
                  <div className="lg:w-7/12 p-8 md:p-14 flex flex-col bg-white relative z-10">
                    <h2 className="text-3xl md:text-4xl lg:text-[2.5rem] font-black text-[#003046] mb-6 group-hover:text-[#60CBED] transition-colors duration-500 leading-[1.1] tracking-tight">{course.title}</h2>
                    <p className="text-[#5a7a8a] text-lg mb-10 leading-relaxed font-medium">{course.desc}</p>
                    
                    <div className="mb-5 flex items-center gap-4">
                      <span className="text-[10px] font-black text-[#003046] uppercase tracking-[0.2em] bg-gray-50 px-4 py-2 rounded-md">Chọn lộ trình:</span>
                      <div className="h-[1px] bg-gray-100 grow"></div>
                    </div>
                    
                    <div className="flex flex-wrap gap-3 mb-10">
                      {course.levels.map((level) => (
                        <button 
                          key={level.id}
                          onClick={() => handleLevelChange(course.id, level.id)}
                          className={`px-5 py-3 rounded-xl text-sm font-bold transition-all duration-300 border-2
                            ${activeLevels[course.id] === level.id 
                              ? 'bg-[#FDB714] border-[#FDB714] text-[#003046] shadow-[0_8px_20px_rgba(253,183,20,0.3)] scale-105' 
                              : 'bg-white border-gray-100 text-[#5a7a8a] hover:border-[#60CBED] hover:text-[#003046] hover:bg-[#f0faff]'
                            }`}
                        >
                          {level.name}
                        </button>
                      ))}
                    </div>

                    {/* Nút hành động */}
                    <div className="mt-auto flex flex-col sm:flex-row gap-5 pt-8 border-t border-gray-100">
                      <Link 
                        href={`/khoa-hoc/${course.id}`} 
                        className="flex-1 bg-[#003046] text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-[#60CBED] hover:text-[#003046] shadow-[0_10px_30px_rgba(0,48,70,0.2)] hover:-translate-y-1 transition-all duration-300"
                      >
                        Chi tiết khóa học <span className="text-xl">→</span>
                      </Link>
                      <Link 
                        href="/#register" 
                        className="flex-1 bg-white border-2 border-[#003046] text-[#003046] font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-50 hover:-translate-y-1 transition-all duration-300"
                      >
                        Đăng ký tư vấn.
                      </Link>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        ) : (
          <FadeIn className="py-24 text-center bg-white rounded-[3rem] border-2 border-dashed border-[#60CBED]/40 mt-10 shadow-sm max-w-3xl mx-auto">
            <div className="text-[6rem] mb-6 opacity-30 text-[#003046] animate-bounce-slow select-none">🐙</div>
            <h3 className="text-3xl font-black text-[#003046] mb-4 tracking-tight">Hổng tìm thấy khóa học nào phù hợp!</h3>
            <p className="text-[#5a7a8a] mb-10 text-lg font-medium">Ní thử nới lỏng bộ lọc ra một chút xem sao nha.</p>
            <button 
              onClick={() => {setFilterAge('Tất cả'); setFilterLevel('Tất cả'); setSortBy('newest');}}
              className="bg-[#FDB714] text-[#003046] font-black px-10 py-4 rounded-full hover:shadow-[0_10px_25px_rgba(253,183,20,0.4)] hover:-translate-y-1 transition-all uppercase tracking-[0.15em] text-sm"
            >
              Xóa bộ lọc ngay
            </button>
          </FadeIn>
        )}
      </div>
    </main>
  );
}