'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
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

// Định nghĩa cấu trúc bài viết
interface News {
  _id: string; // ✅ Đúng chuẩn Mongoose
  title: string;
  summary: string;
  content: string;
  imageUrl: string;
  author: string;
  createdAt: string;
  tag?: string; 
}

export default function PublicNewsPage() {
  const [newsList, setNewsList] = useState<News[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Tất cả');

  // LẤY DỮ LIỆU TỪ SPRING BOOT
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/news');
        if (response.ok) {
          const data = await response.json();
          // Bài mới nhất lên đầu
          data.sort((a: News, b: News) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          setNewsList(data);
        }
      } catch (error) {
        console.error('Lỗi lấy bài viết:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Format ngày tháng hiển thị cho đẹp
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  // LOGIC LỌC BÀI VIẾT THEO TAB
  const filteredNews = useMemo(() => {
    if (activeTab === 'Tất cả') return newsList;
    return newsList.filter(news => (news.tag || 'Tin tức') === activeTab);
  }, [newsList, activeTab]);

  return (
    <main className="font-sans bg-[#f8fcfd] min-h-screen pt-32 pb-24 relative overflow-x-hidden">
      
      {/* 💡 Ánh sáng nền ảo diệu (Đã fix lỗi kích thước) */}
      <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#60CBED]/20 blur-[150px] rounded-full pointer-events-none z-0 animate-pulse"></div>

      <div className="max-w-7xl mx-auto px-5 relative z-10">
        
        {/* ═══ HEADER ═══ */}
        <FadeIn className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white border border-[#60CBED]/30 text-[#003046] text-[10px] font-bold px-5 py-2 rounded-full uppercase tracking-[0.2em] mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#60CBED] animate-pulse"></span> Cập nhật liên tục
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#003046] leading-[1.05] tracking-tight">
            Tin tức & <span className="text-[#60CBED]">Bài viết.</span>
          </h1>
          <p className="text-[#5a7a8a] max-w-2xl mx-auto text-lg leading-relaxed mt-6 font-medium">
            Cập nhật những thông tin mới nhất, sự kiện nổi bật và kinh nghiệm học tập hữu ích từ Octo. English.
          </p>
        </FadeIn>

        {/* ═══ TABS BỘ LỌC (Đã độ lại Kính mờ siêu thực) ═══ */}
        <FadeIn delay={100} className="flex justify-center mb-20 relative z-20">
          <div className="inline-flex bg-white/70 backdrop-blur-xl backdrop-saturate-150 border border-white/50 p-2 rounded-full shadow-[0_10px_30px_rgba(0,48,70,0.05)] gap-2 flex-wrap justify-center">
            {['Tất cả', 'Thông báo', 'Sự kiện', 'Kinh nghiệm'].map((tab) => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-full text-xs font-bold transition-all duration-300 uppercase tracking-wide ${
                  activeTab === tab 
                    ? 'bg-[#003046] text-[#FDB714] shadow-lg scale-105' 
                    : 'bg-transparent text-[#5a7a8a] hover:bg-white hover:text-[#003046] hover:shadow-sm'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* ═══ DANH SÁCH BÀI VIẾT ═══ */}
        {isLoading ? (
          <div className="flex flex-col justify-center items-center py-24">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#60CBED] border-t-transparent mb-6 shadow-sm"></div>
            <p className="text-[#5a7a8a] font-bold uppercase tracking-widest text-xs animate-pulse">Đang tải tin tức...</p>
          </div>
        ) : filteredNews.length === 0 ? (
          <FadeIn className="text-center py-28 bg-white rounded-[3rem] border-2 border-dashed border-[#60CBED]/30 shadow-sm max-w-3xl mx-auto relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#60CBED]/10 blur-[80px] rounded-full pointer-events-none"></div>
            <div className="text-[6rem] mb-6 opacity-30 text-[#003046] animate-bounce-slow select-none relative z-10">🐙</div>
            <h3 className="text-3xl font-black text-[#003046] mb-4 tracking-tight relative z-10">Chưa có bài viết nào ở mục này.</h3>
            <p className="text-[#5a7a8a] mb-10 text-lg font-medium relative z-10">Ní chuyển sang Tab khác hoặc quay lại sau nha!</p>
            <button onClick={() => setActiveTab('Tất cả')} className="relative z-10 bg-[#FDB714] text-[#003046] font-black px-8 py-4 rounded-full hover:shadow-[0_10px_25px_rgba(253,183,20,0.4)] hover:-translate-y-1 transition-all uppercase tracking-[0.15em] text-xs">
              Xem tất cả bài viết
            </button>
          </FadeIn>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((item, index) => (
              /* 💡 Đã fix: rounded-[2.5rem] và đổ bóng chuẩn Godly */
              <FadeIn key={item._id} delay={index * 100} className="bg-white rounded-[2.5rem] p-4 border border-[#60CBED]/10 shadow-[0_10px_30px_rgba(0,48,70,0.03)] hover:shadow-[0_20px_50px_rgba(96,203,237,0.15)] hover:-translate-y-2 transition-all duration-500 group flex flex-col relative overflow-hidden">
                
                {/* Viền ảo khi hover */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#60CBED]/30 rounded-[2.5rem] transition-colors pointer-events-none z-20"></div>

                {/* Ảnh bìa */}
                <Link href={`/tin-tuc/${item._id}`} className="relative h-[240px] w-full overflow-hidden rounded-[2rem] bg-gray-100 block shrink-0 z-10">
                  <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-md text-[#003046] text-[10px] font-black px-4 py-2 rounded-full uppercase shadow-md tracking-[0.15em] border border-white/50">
                    {item.tag || 'TIN MỚI'}
                  </div>
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]" 
                  />
                </Link>

                {/* Nội dung */}
                <div className="pt-8 px-4 pb-4 flex flex-col flex-1 z-10">
                  <div className="flex items-center gap-3 text-[10px] font-bold text-[#5a7a8a] mb-4 uppercase tracking-widest">
                    <span className="w-6 h-6 rounded-xl bg-[#f0faff] text-[#60CBED] flex items-center justify-center text-xs shadow-inner">🗓️</span>
                    {formatDate(item.createdAt)}
                  </div>
                  
                  <Link href={`/tin-tuc/${item._id}`}>
                    <h3 className="text-2xl font-black text-[#003046] leading-[1.2] tracking-tight mb-4 group-hover:text-[#60CBED] transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                  </Link>

                  <p className="text-[#5a7a8a] text-base leading-relaxed mb-8 line-clamp-3 flex-1 font-medium">
                    {item.summary}
                  </p>
                  
                  <Link href={`/tin-tuc/${item._id}`} className="mt-auto inline-flex items-center w-max font-black text-[#003046] text-xs uppercase tracking-widest group-hover:text-[#60CBED] transition-colors cursor-pointer bg-gray-50 hover:bg-[#f0faff] px-6 py-3.5 rounded-2xl border border-transparent hover:border-[#60CBED]/20">
                    Đọc chi tiết <span className="ml-3 text-lg group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>
        )}
      </div>

    </main>
  );
}