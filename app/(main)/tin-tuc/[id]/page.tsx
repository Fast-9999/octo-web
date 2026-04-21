'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

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

interface News {
  _id: string;
  title: string;
  summary: string;
  content: string;
  imageUrl: string;
  author: string;
  createdAt: string;
  tag?: string;
}

export default function ArticleDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params);
  const [article, setArticle] = useState<News | null>(null);
  const [relatedNews, setRelatedNews] = useState<News[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // 📱 MỚI 5: State cho thanh Smart Contextual FAB
  const [isFabVisible, setIsFabVisible] = useState(false);
  const lastScrollY = useRef(0);
  
  // Logic nhận diện vuốt tay để ẩn/hiện FAB
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Ẩn khi ở trên cùng để không che ảnh bìa
      if (currentScrollY < 300) {
        setIsFabVisible(false);
      } else if (currentScrollY > lastScrollY.current) {
        setIsFabVisible(false); // Đang vuốt xuống để đọc bài -> Ẩn FAB nhường chỗ
      } else {
        setIsFabVisible(true);  // Hơi vuốt lên -> Hiện FAB mời gọi
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resArticle = await fetch(`/api/news/${resolvedParams.id}`);
        if (resArticle.ok) {
          const data = await resArticle.json();
          setArticle(data);
        }
        
        const resAll = await fetch('/api/news');
        if (resAll.ok) {
          const allData = await resAll.json();
          const filtered = allData.filter((n: News) => n._id !== resolvedParams.id).slice(0, 3);
          setRelatedNews(filtered);
        }
      } catch (error) {
        console.error('Lỗi lấy dữ liệu:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [resolvedParams.id]);
  
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8fcfd] pt-20">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#60CBED] border-t-transparent mb-6 shadow-sm"></div>
        <p className="text-[#5a7a8a] font-bold uppercase tracking-widest text-xs animate-pulse">Đang tải bài viết...</p>
      </div>
    );
  }
  
  if (!article) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center bg-[#f8fcfd]">
        <div className="text-[8rem] opacity-30 text-[#003046] animate-bounce-slow drop-shadow-xl select-none">🐙</div>
        <h1 className="text-4xl font-black text-[#003046] mt-6 mb-4 tracking-tight">Bài viết không tồn tại.</h1>
        <p className="text-[#5a7a8a] mb-10 font-medium text-lg">Có thể bài viết đã bị xóa hoặc đường dẫn không đúng.</p>
        <Link href="/tin-tuc" className="bg-[#FDB714] text-[#003046] font-black px-10 py-4 rounded-full hover:shadow-[0_15px_30px_rgba(253,183,20,0.4)] active:scale-95 transition-all uppercase tracking-[0.15em] text-xs">
          ← Quay lại trang Tin tức
        </Link>
      </div>
    );
  }
  
  return (
    <main className="min-h-screen bg-[#f8fcfd] pb-24 overflow-x-hidden relative">
      {/* ═══ HERO COVER (ẢNH BÌA) ═══ */}
      <section className="relative pt-32 pb-40 bg-[#003046] overflow-hidden flex flex-col items-center justify-center min-h-[70vh]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#60CBED] rounded-full mix-blend-multiply filter blur-[150px] opacity-40 animate-pulse pointer-events-none"></div>
        <div className="absolute inset-0 opacity-40 mix-blend-luminosity">
          <img src={article.imageUrl} alt="Cover" className="w-full h-full object-cover blur-sm scale-105" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#f8fcfd] via-[#003046]/70 to-transparent opacity-100"></div>
        
        <FadeIn className="max-w-4xl w-full mx-auto px-5 relative z-10 text-center text-white mt-10">
          {/* 📱 MỚI 4: Gắn active:scale-95 cho Link quay lại */}
          <Link href="/tin-tuc" className="inline-flex items-center gap-2 text-white/60 hover:text-white active:scale-95 text-[10px] font-bold mb-10 transition-all uppercase tracking-[0.2em]">
            ← Trở về danh sách
          </Link>
          <br/>
          <span className="inline-block bg-[#FDB714] text-[#003046] text-[10px] font-black px-5 py-2.5 rounded-full uppercase mb-8 shadow-lg tracking-[0.2em]">
            {article.tag || 'TIN TỨC OCTO.'}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight mb-10 drop-shadow-2xl">
            {article.title}
          </h1>
          
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-bold text-white/80 uppercase tracking-widest">
            {/* 👇 CẬP NHẬT: TÁC GIẢ & AVATAR ĐỘNG TẠI ĐÂY 👇 */}
            <span className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-[0.8rem] bg-white/10 backdrop-blur-md text-[#60CBED] border border-white/20 flex items-center justify-center font-black text-[10px] shadow-inner">
                {article.author ? article.author.substring(0, 2).toUpperCase() : 'AD'}
              </span>
              {article.author || 'Admin Octo'}
            </span>
            {/* 👆 CẬP NHẬT 👆 */}

            <span className="w-1.5 h-1.5 rounded-full bg-white/30 hidden sm:block"></span>
            <span className="flex items-center gap-2">
              🗓️ {formatDate(article.createdAt)}
            </span>
          </div>
        </FadeIn>
      </section>

      {/* ═══ NỘI DUNG BÀI VIẾT ═══ */}
      <section className="max-w-4xl mx-auto px-5 -mt-32 relative z-20">
        <FadeIn className="bg-white rounded-[3rem] shadow-[0_30px_80px_rgba(0,48,70,0.08)] p-8 md:p-14 lg:p-20 border border-[#60CBED]/20">
          <div className="w-full aspect-[16/9] rounded-[2rem] overflow-hidden mb-16 shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-4 border-white bg-gray-100 relative group">
            <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s]" />
          </div>
          
          <div className="text-[#1a2e38] leading-relaxed font-medium">
            <h2 className="text-2xl md:text-3xl font-black text-[#003046] mb-10 leading-[1.3] tracking-tight">
              {article.summary}
            </h2>
            <div
              className="prose prose-lg max-w-none w-full break-words overflow-hidden [&>*]:whitespace-normal prose-headings:font-black prose-headings:text-[#003046] prose-p:text-[#5a7a8a] prose-a:text-[#60CBED] prose-strong:text-[#003046] prose-li:marker:text-[#FDB714] prose-img:rounded-2xl"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
            
            <div className="mt-16 p-10 bg-gradient-to-br from-[#f0faff] to-white rounded-[2rem] border border-[#60CBED]/30 relative overflow-hidden group shadow-sm">
              <div className="absolute -top-8 -left-4 text-[#60CBED] opacity-10 text-[10rem] font-serif leading-none group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500 select-none pointer-events-none">"</div>
              <p className="relative z-10 font-black text-[#003046] text-xl md:text-2xl italic leading-[1.4] tracking-tight pl-8 border-l-4 border-[#FDB714]">
                Học tiếng Anh tại Octo. không chỉ là học ngôn ngữ, mà là mở ra một thế giới mới đầy cảm hứng.
              </p>
            </div>
          </div>

          {/* Nút share mạng xã hội */}
          <div className="mt-20 pt-10 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6">
            <span className="font-black text-[#003046] uppercase tracking-[0.2em] text-[10px]">Chia sẻ bài viết</span>
            <div className="flex flex-wrap justify-center gap-3">
              {['Facebook', 'Twitter', 'Copy Link'].map((social, i) => (
                <button key={i} className="px-6 py-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-[#5a7a8a] hover:bg-[#60CBED] hover:text-[#003046] hover:border-[#60CBED] active:scale-95 transition-all">
                  {social}
                </button>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ═══ BÀI VIẾT LIÊN QUAN ═══ */}
      {relatedNews.length > 0 && (
        <section className="max-w-7xl mx-auto px-5 mt-32">
          <FadeIn className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6 text-center md:text-left">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#FDB714]/10 border border-[#FDB714]/30 text-[#003046] text-[10px] font-bold px-5 py-2 rounded-full uppercase tracking-[0.2em] mb-4">
                📖 Khám phá thêm
              </div>
              <h3 className="text-4xl font-black text-[#003046] tracking-tight">Bài viết liên quan.</h3>
            </div>
            
            {/* 📱 MỚI 4: Gắn active:scale-95 */}
            <Link href="/tin-tuc" className="hidden md:inline-flex items-center gap-2 text-xs font-bold text-[#003046] hover:text-white hover:bg-[#003046] active:scale-95 transition-all bg-white px-6 py-3.5 rounded-full shadow-[0_5px_15px_rgba(0,48,70,0.05)] border border-gray-200 uppercase tracking-widest">
              Xem tất cả →
            </Link>
          </FadeIn>

          {/* 📱 MỚI 2: Áp dụng Horizontal Snap Scrolling cho mobile */}
          <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-3 gap-6 md:gap-8 pb-6 md:pb-0 -mx-5 px-5 md:mx-0 md:px-0">
            {relatedNews.map((item, index) => (
              <FadeIn key={item._id} delay={index * 150} className="snap-center w-[85vw] md:w-auto shrink-0 md:shrink bg-white rounded-[2.5rem] p-4 border border-[#60CBED]/10 shadow-[0_10px_30px_rgba(0,48,70,0.03)] hover:shadow-[0_20px_50px_rgba(96,203,237,0.15)] hover:-translate-y-2 transition-all duration-500 group flex flex-col relative overflow-hidden">
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#60CBED]/30 rounded-[2.5rem] transition-colors pointer-events-none z-20"></div>
                <Link href={`/tin-tuc/${item._id}`} className="relative h-[220px] w-full overflow-hidden rounded-[2rem] bg-gray-100 block shrink-0 z-10">
                  <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-md text-[#003046] text-[10px] font-black px-4 py-2 rounded-full uppercase shadow-md tracking-[0.15em] border border-white/50">
                    {item.tag || 'TIN MỚI'}
                  </div>
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]"
                  />
                </Link>
                
                <div className="pt-8 px-4 pb-4 flex flex-col flex-1 z-10">
                  <div className="flex items-center gap-3 text-[10px] font-bold text-[#5a7a8a] mb-4 uppercase tracking-widest">
                    <span className="w-6 h-6 rounded-xl bg-[#f0faff] text-[#60CBED] flex items-center justify-center text-xs shadow-inner">🗓️</span>
                    {formatDate(item.createdAt)}
                  </div>
                  <Link href={`/tin-tuc/${item._id}`}>
                    <h3 className="text-xl font-black text-[#003046] leading-[1.2] tracking-tight mb-4 group-hover:text-[#60CBED] transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                  </Link>
                  <p className="text-[#5a7a8a] text-sm leading-relaxed mb-8 line-clamp-2 flex-1 font-medium">
                    {item.summary}
                  </p>
                  
                  {/* 📱 MỚI 4: Gắn active:scale-95 */}
                  <Link href={`/tin-tuc/${item._id}`} className="mt-auto inline-flex items-center w-max font-black text-[#003046] text-[10px] uppercase tracking-[0.2em] group-hover:text-[#60CBED] active:scale-95 transition-all cursor-pointer bg-gray-50 hover:bg-[#f0faff] px-6 py-3.5 rounded-2xl border border-transparent hover:border-[#60CBED]/20">
                    Đọc tiếp <span className="ml-3 text-base group-hover:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </FadeIn>
            ))}
          </div>
          
          <div className="mt-12 text-center md:hidden">
            {/* 📱 MỚI 4: Gắn active:scale-95 */}
            <Link href="/tin-tuc" className="inline-flex items-center gap-2 text-xs font-bold text-[#003046] hover:text-white hover:bg-[#003046] active:scale-95 transition-all bg-white px-8 py-4 rounded-full shadow-md border border-gray-200 uppercase tracking-widest">
              Xem tất cả tin tức →
            </Link>
          </div>
        </section>
      )}

      {/* 📱 MỚI 5: SMART CONTEXTUAL FAB (MOBILE CHỈ HIỆN KHI VUỐT LÊN) */}
      <div className={`fixed bottom-0 left-0 right-0 z-[900] bg-white/90 backdrop-blur-xl border-t border-gray-100 p-4 px-5 flex items-center justify-between gap-4 transition-transform duration-300 md:hidden shadow-[0_-10px_40px_rgba(0,48,70,0.1)]
        ${isFabVisible ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="text-xs text-[#003046] font-bold tracking-tight">
          Thấy bài viết thú vị?<br/><strong className="text-[#FDB714] text-sm drop-shadow-sm">Tìm hiểu lộ trình Octo!</strong>
        </div>
        <Link href="/lien-he" className="bg-[#003046] text-white font-black text-[10px] py-3.5 px-6 rounded-full shrink-0 shadow-md uppercase tracking-wider active:scale-95 transition-transform">
          Nhận tư vấn
        </Link>
      </div>
    </main>
  );
}