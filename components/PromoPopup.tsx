'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function PromoPopup() {
  const [promo, setPromo] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  
  // State mới để xử lý hiệu ứng trượt xuống khi đóng
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Gọi API lấy data quảng cáo
    const fetchPromo = async () => {
      try {
        const res = await fetch('/api/promo');
        const data = await res.json();
        
        // Chỉ hiển thị nếu admin đang bật (isActive: true)
        if (data && data.isActive) {
          setPromo(data);
          // Set timeout vài giây rồi mới hiện popup cho mượt
          setTimeout(() => setIsOpen(true), 3000); 
        }
      } catch (error) {
        console.error("Không tải được Popup:", error);
      }
    };
    fetchPromo();
  }, []);

  // Hàm xử lý đóng mượt mà (chờ animation xong mới unmount)
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 300); // Khớp với duration-300 của Tailwind
  };

  if (!isOpen || !promo) return null;

  return (
    // THAY ĐỔI: Thêm items-end p-4 trên mobile để tạo hiệu ứng Bottom Sheet, md:items-center để giữ modal giữa màn hình trên Desktop
    <div className="fixed inset-0 z-[9999] flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm p-4 md:p-0 transition-opacity duration-300">
      
      {/* Container của Popup */}
      {/* THAY ĐỔI: Đổi flex-col trên mobile, flex-row trên desktop. Thêm hiệu ứng translate-y trượt lên xuống */}
      <div className={`relative flex flex-col md:flex-row bg-[#E83C3C] text-white rounded-[2rem] md:rounded-2xl overflow-hidden max-w-3xl w-full shadow-2xl transform transition-transform duration-300 ${isClosing ? 'translate-y-full md:translate-y-8 opacity-0' : 'translate-y-0 opacity-100'}`}>
        
        {/* Nút đóng (Chuẩn Thumb-zone & Haptic Feedback) */}
        {/* THAY ĐỔI: w-10 h-10 trên mobile, active:scale-90 để có phản hồi xúc giác */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 md:w-8 md:h-8 bg-black/20 md:bg-white text-white md:text-black rounded-full flex items-center justify-center font-bold backdrop-blur-md md:backdrop-blur-none active:scale-90 transition-transform"
        >
          ✕
        </button>

        {/* Cột phải: Hình ảnh (Đưa lên TRÊN CÙNG trên thiết bị di động bằng order-1) */}
        <div className="w-full md:w-1/2 relative h-[200px] md:min-h-[350px] order-1 md:order-2">
           {promo.imageUrl ? (
             <Image 
               src={promo.imageUrl} 
               alt="Promo" 
               fill 
               className="object-cover" 
               sizes="(max-width: 768px) 100vw, 50vw"
             />
           ) : (
             <div className="w-full h-full bg-white/10"></div>
           )}
           {/* Phủ một lớp đen mờ ở viền trên ảnh để nút Close màu trắng dễ nhìn hơn trên mobile */}
           <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/40 to-transparent md:hidden"></div>
        </div>

        {/* Cột trái: Nội dung (Nằm DƯỚI trên di động bằng order-2) */}
        <div className="p-6 pb-8 md:p-8 w-full md:w-1/2 flex flex-col justify-center order-2 md:order-1">
          <h2 className="text-2xl md:text-3xl font-black mb-2 md:mb-4 uppercase leading-tight">{promo.title}</h2>
          <p className="mb-4 md:mb-2 text-sm opacity-90">{promo.subtitle}</p>
          <div className="text-5xl md:text-6xl font-black mb-6 md:mb-8 drop-shadow-md">{promo.discountText}</div>
          
          {/* Nút CTA (Chuẩn Thumb-zone: w-full py-4 trên mobile & Haptic Feedback active:scale-95) */}
          <a 
            href={promo.buttonLink} 
            onClick={handleClose}
            className="bg-[#003046] text-white px-8 py-4 md:py-3 rounded-full font-bold text-center w-full md:w-max active:scale-95 transition-transform duration-150 shadow-[0_10px_20px_rgba(0,0,0,0.2)]"
          >
            {promo.buttonText}
          </a>
        </div>

      </div>
    </div>
  );
}