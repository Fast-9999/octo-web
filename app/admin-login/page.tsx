'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // 💡 State mới: Quản lý trạng thái đang đăng nhập
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true); // 💡 Bật trạng thái loading
    setError(''); // Xóa lỗi cũ nếu có

    const formData = new FormData(e.currentTarget);
    const username = formData.get('username');
    const password = formData.get('password');

    try {
      // GỌI API THẬT XUỐNG SPRING BOOT
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        // Đăng nhập thành công từ DB -> Phát thẻ thông hành
        document.cookie = "admin_token=da_dang_nhap_hop_le; path=/";
        router.push('/admin');
      } else {
        // Sai pass hoặc sai username
        setError('Tài khoản hoặc mật khẩu không chính xác!');
        setIsSubmitting(false); // Tắt loading để người dùng thử lại
      }
    } catch (err) {
      console.error(err);
      setError('Lỗi kết nối đến máy chủ Backend (Port 8080)!');
      setIsSubmitting(false); // Tắt loading
    }
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-[#003046] to-[#005070] flex items-center justify-center p-5 relative overflow-hidden">
      
      {/* 💡 Ánh sáng Glow ảo diệu */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-125 h-125 bg-[#60CBED] rounded-full mix-blend-screen filter blur-[150px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-100 h-100 bg-[#FDB714] rounded-full mix-blend-screen filter blur-[150px] opacity-10"></div>
      </div>

      {/* Form Đăng Nhập */}
      <div className="bg-white rounded-[2.5rem] w-full max-w-md p-10 md:p-12 relative z-10 shadow-[0_20px_60px_rgba(0,0,0,0.3)] border border-[#60CBED]/10">
        
        <div className="text-center mb-10">
          <div className="font-black text-4xl text-[#003046] mb-3 tracking-tighter flex items-center justify-center gap-1">
            <span className="text-5xl text-[#60CBED] opacity-20 -mr-4">🐙</span>
            octo<span className="text-[#FDB714]">.</span>
          </div>
          <h1 className="text-sm font-bold text-[#5a7a8a] uppercase tracking-widest bg-gray-50 inline-block px-4 py-1.5 rounded-full border border-gray-100">
            Quản trị viên
          </h1>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 text-sm font-bold p-4 rounded-2xl mb-6 text-center border border-red-200 shadow-sm animate-fade-in">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-[11px] font-black text-[#003046] mb-2 uppercase tracking-wider">Tên đăng nhập</label>
            <input
              type="text" name="username" required
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#60CBED] focus:bg-white focus:ring-4 focus:ring-[#60CBED]/10 text-[#003046] font-bold transition-all"
              placeholder="admin"
              disabled={isSubmitting} // 💡 Khóa ô nhập khi đang tải
            />
          </div>
          
          <div>
            <label className="block text-[11px] font-black text-[#003046] mb-2 uppercase tracking-wider">Mật khẩu</label>
            <input
              type="password" name="password" required
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#60CBED] focus:bg-white focus:ring-4 focus:ring-[#60CBED]/10 text-[#003046] font-bold transition-all"
              placeholder="••••••••"
              disabled={isSubmitting} // 💡 Khóa ô nhập khi đang tải
            />
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting} // 💡 Khóa nút khi đang tải
            className={`w-full bg-[#FDB714] text-[#003046] font-black py-4.5 rounded-xl mt-6 shadow-[0_8px_20px_rgba(253,183,20,0.3)] transition-all uppercase tracking-widest text-sm flex items-center justify-center gap-2
              ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-[0_12px_25px_rgba(253,183,20,0.5)] hover:-translate-y-1'}`}
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-[#003046] border-t-transparent rounded-full animate-spin"></div>
                ĐANG XỬ LÝ...
              </>
            ) : (
              'ĐĂNG NHẬP'
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-center text-[11px] font-medium text-gray-400">
            Hệ thống quản trị nội bộ bảo mật của<br/>
            <strong className="text-[#5a7a8a]">Octo. English</strong>
          </p>
        </div>
      </div>
    </main>
  );
}