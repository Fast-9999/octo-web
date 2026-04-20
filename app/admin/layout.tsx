'use client';

import React, { useState } from 'react';
import Link from 'next/link';
// Nhớ import thêm useRouter để điều hướng sau khi đăng xuất
import { usePathname, useRouter } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Danh sách menu của Admin
  const menuItems = [
    { name: 'Tổng quan', path: '/admin', icon: '📊' },
    { name: 'Quản lý Khách hàng', path: '/admin/leads', icon: '👥' },
    { name: 'Quản lý Khóa học', path: '/admin/courses', icon: '📚' },
    { name: 'Quản lý Tin tức', path: '/admin/news', icon: '📰' },
    { name: 'Cài đặt', path: '/admin/settings', icon: '⚙️' },
  ];

  // Hàm xử lý Đăng xuất
  const handleLogout = () => {
    // Xóa cookie "admin_token" bằng cách set ngày hết hạn về quá khứ
    document.cookie = "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    // Đẩy văng về trang đăng nhập
    router.push('/admin-login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex text-[#1a2e38] font-sans">
      
      {/* ═══ SIDEBAR (Thanh điều hướng bên trái) ═══ */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#003046] text-white transition-transform duration-300 lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* Logo & Đóng Sidebar (Mobile) */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-white/10">
          <Link href="/admin" className="font-black text-2xl tracking-tight">octo<span className="text-[#FDB714]">.</span> <span className="text-xs font-medium text-[#60CBED] uppercase tracking-widest ml-1">Admin</span></Link>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-white/50 hover:text-white">✕</button>
        </div>

        {/* Menu Navigation */}
        <nav className="p-4 space-y-1.5">
          {menuItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link 
                key={item.path} 
                href={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${isActive ? 'bg-[#60CBED] text-[#003046] shadow-md' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Admin User / Đăng xuất (Đã cập nhật) */}
        <div className="absolute bottom-0 left-0 w-full p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="w-8 h-8 rounded-full bg-[#FDB714] text-[#003046] flex items-center justify-center font-black text-xs">AD</div>
            <div className="flex-1">
              <div className="text-sm font-bold leading-tight">Admin Octo</div>
              <div className="flex items-center justify-between mt-1">
                <Link href="/" className="text-[10px] text-white/50 hover:text-[#60CBED]">Xem Web</Link>
                <button onClick={handleLogout} className="text-[10px] text-red-400 hover:text-red-300 font-bold">
                  Đăng xuất ⍈
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Lớp nền mờ khi mở Sidebar trên Mobile */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)}></div>
      )}

      {/* ═══ MAIN CONTENT (Khu vực nội dung bên phải) ═══ */}
      <main className="flex-1 lg:ml-64 min-h-screen flex flex-col transition-all duration-300">
        
        {/* Topbar (Thanh công cụ trên cùng) */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-5 lg:px-8 sticky top-0 z-30">
          <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden text-[#003046] p-2 -ml-2">
            ☰
          </button>
          
          <div className="ml-auto flex items-center gap-4">
            <div className="text-sm font-bold text-[#5a7a8a] hidden sm:block">Hôm nay: {new Date().toLocaleDateString('vi-VN')}</div>
            <button className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-sm relative hover:bg-gray-200 transition-colors">
              🔔
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
          </div>
        </header>

        {/* Khu vực render trang con */}
        <div className="p-5 lg:p-8 flex-1">
          {children}
        </div>

      </main>
    </div>
  );
}