'use client';
import { useState, useEffect } from 'react';

export default function PromoAdminPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  // State lưu trữ dữ liệu form
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    discountText: '',
    imageUrl: '',
    buttonText: '',
    buttonLink: '',
    isActive: true,
  });

  // Khi mới vào trang, gọi API lấy dữ liệu hiện tại lên
  useEffect(() => {
    const fetchPromo = async () => {
      try {
        const res = await fetch('/api/promo');
        if (res.ok) {
          const data = await res.json();
          // Nếu có data thì set vào form, không thì dùng giá trị mặc định
          if (data && Object.keys(data).length > 1) {
            setFormData({
              title: data.title || '',
              subtitle: data.subtitle || '',
              discountText: data.discountText || '',
              imageUrl: data.imageUrl || '',
              buttonText: data.buttonText || 'ĐẾN NGAY',
              buttonLink: data.buttonLink || '#register',
              isActive: data.isActive !== undefined ? data.isActive : true,
            });
          }
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      }
    };
    fetchPromo();
  }, []);

  // Hàm xử lý khi gõ vào input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Hàm xử lý khi bấm Lưu
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/promo', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMessage('✅ Lưu thành công! Ra trang chủ kiểm tra nhé.');
        setTimeout(() => setMessage(''), 3000); // Ẩn thông báo sau 3s
      } else {
        setMessage('❌ Có lỗi xảy ra khi lưu.');
      }
    } catch (error) {
      setMessage('❌ Lỗi kết nối server.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-[#003046]">Quản lý Quảng Cáo (Popup)</h1>
        <p className="text-[#5a7a8a] mt-2">Thay đổi nội dung hiển thị trên trang chủ Octo.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* CÔNG TẮC BẬT/TẮT POPUP */}
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="w-5 h-5 accent-[#60CBED] cursor-pointer"
            />
            <label htmlFor="isActive" className="font-bold text-[#003046] cursor-pointer">
              Bật / Hiện Popup trên trang chủ
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tiêu đề chính */}
            <div>
              <label className="block text-sm font-bold text-[#003046] mb-2">Tiêu đề chính</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="VD: KHAI GIẢNG CÁC LỚP..."
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#60CBED] transition-colors"
                required
              />
            </div>

            {/* Chữ nổi bật (Phần trăm giảm) */}
            <div>
              <label className="block text-sm font-bold text-[#003046] mb-2">Chữ nổi bật (Giảm giá)</label>
              <input
                type="text"
                name="discountText"
                value={formData.discountText}
                onChange={handleChange}
                placeholder="VD: 30%"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#60CBED] transition-colors"
              />
            </div>

            {/* Dòng mô tả nhỏ */}
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-[#003046] mb-2">Mô tả phụ</label>
              <input
                type="text"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleChange}
                placeholder="VD: Đăng ký ngay hôm nay để nhận học bổng..."
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#60CBED] transition-colors"
              />
            </div>

            {/* Link Hình Ảnh */}
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-[#003046] mb-2">Link Hình Ảnh (URL)</label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="VD: https://octo.vn/img_data/images/.../hinh.jpg"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#60CBED] transition-colors"
              />
              {formData.imageUrl && (
                <div className="mt-3 p-2 bg-gray-100 rounded-lg inline-block">
                  <img src={formData.imageUrl} alt="Preview" className="h-24 w-auto rounded-md object-cover" />
                </div>
              )}
            </div>

            {/* Nút bấm */}
            <div>
              <label className="block text-sm font-bold text-[#003046] mb-2">Chữ trên nút</label>
              <input
                type="text"
                name="buttonText"
                value={formData.buttonText}
                onChange={handleChange}
                placeholder="VD: ĐẾN NGAY"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#60CBED] transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-[#003046] mb-2">Link khi bấm nút</label>
              <input
                type="text"
                name="buttonLink"
                value={formData.buttonLink}
                onChange={handleChange}
                placeholder="VD: #register hoặc /lien-he"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#60CBED] transition-colors"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex items-center gap-4">
            <button
              type="submit"
              disabled={isLoading}
              className={`bg-[#003046] text-white font-bold py-3 px-8 rounded-xl hover:bg-[#60CBED] hover:text-[#003046] transition-all active:scale-95 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Đang lưu...' : 'Lưu Thay Đổi'}
            </button>
            
            {message && (
              <span className={`text-sm font-bold ${message.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>
                {message}
              </span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}