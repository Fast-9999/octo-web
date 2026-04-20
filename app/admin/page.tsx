'use client';
import React, { useState, useEffect } from 'react';

// 💡 Cập nhật Interface cho chuẩn 100% với Mongoose Backend
interface Lead {
  _id: string;        // Fix: Đổi id thành _id của Mongoose
  fullName: string;   // Fix: Đổi name thành fullName
  phone: string;
  email?: string;
  program?: string;   // Fix: Đổi course thành program
  status: string;
  type?: string; 
  message?: string; 
  createdAt: string;
}

export default function AdminDashboard() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState('');
  
  // STATE CHO BỘ LỌC TABS
  const [activeTab, setActiveTab] = useState('TẤT CẢ');

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await fetch('/api/leads');
      if (response.ok) {
        const data = await response.json();
        data.sort((a: Lead, b: Lead) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setLeads(data);
      }
    } catch (error) {
      console.error('Lỗi lấy dữ liệu leads:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/leads/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        // Fix: So sánh với lead._id thay vì lead.id
        setLeads(leads.map(lead => lead._id === id ? { ...lead, status: newStatus } : lead));
        setToastMessage('✅ Cập nhật trạng thái thành công!');
        setTimeout(() => setToastMessage(''), 3000);
      } else {
        alert('Có lỗi xảy ra khi cập nhật!');
      }
    } catch (error) {
      console.error('Lỗi cập nhật:', error);
    }
  };

  // TÍNH TOÁN DỮ LIỆU ĐÃ LỌC
  const filteredLeads = leads.filter(lead => {
    if (activeTab === 'TẤT CẢ') return true;
    return lead.type === activeTab;
  });

  const totalLeads = leads.length;
  const newLeads = leads.filter(l => l.status === 'MỚI' || l.status === 'Mới').length;

  const stats = [
    { title: 'Tổng Khách Hàng', value: totalLeads.toString(), trend: 'Thực tế', isUp: true, icon: '🙋‍♂️' },
    { title: 'Khách Hàng MỚI', value: newLeads.toString(), trend: 'Cần gọi ngay', isUp: true, icon: '🔥' },
    { title: 'Lượt xem trang', value: '1.240', trend: 'Giả lập', isUp: true, icon: '👁️' },
    { title: 'Bài viết Blog', value: '15', trend: 'Giả lập', isUp: true, icon: '📝' },
  ];

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Chưa rõ';
    const date = new Date(dateString);
    return date.toLocaleString('vi-VN', {
      hour: '2-digit', minute: '2-digit',
      day: '2-digit', month: '2-digit', year: 'numeric'
    });
  };

  // 💡 ĐÃ ĐỘ LẠI MÀU SẮC CỦA STATUS TRÔNG 3D HƠN
  const getStatusStyle = (status: string) => {
    const s = status.toUpperCase();
    if (s === 'MỚI') return 'bg-[#FDB714] text-[#003046] border-[#FDB714] shadow-sm';
    if (s === 'ĐANG TƯ VẤN') return 'bg-[#60CBED]/20 text-[#005070] border-[#60CBED]/40';
    if (s === 'ĐÃ CHỐT') return 'bg-green-100 text-green-700 border-green-300';
    if (s === 'HỦY') return 'bg-red-100 text-red-600 border-red-300';
    return 'bg-gray-100 text-gray-600 border-gray-300';
  };

  return (
    <div className="animate-fade-in-up relative pb-20">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-[#003046]">Quản lý Khách hàng (Leads)</h1>
        <p className="text-[#5a7a8a] text-sm mt-1">Quản lý và cập nhật tiến độ tư vấn học viên.</p>
      </div>

      {/* 💡 STATS CARDS CÓ HIỆU ỨNG HOVER */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 group">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-full bg-[#f0faff] group-hover:bg-[#60CBED]/20 transition-colors flex items-center justify-center text-xl">{stat.icon}</div>
              <span className={`text-[10px] font-bold px-2 py-1 rounded-md ${stat.isUp ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                {stat.trend}
              </span>
            </div>
            <h3 className="text-[#5a7a8a] text-xs font-bold uppercase tracking-wider mb-1">{stat.title}</h3>
            <div className="text-3xl font-black text-[#003046]">{stat.value}</div>
          </div>
        ))}
      </div>

      {/* 💡 BỘ LỌC TABS ĐƯỢC CHUỐT LẠI */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {['TẤT CẢ', 'HỌC THỬ', 'KHÓA HỌC', 'LIÊN HỆ'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2.5 rounded-full text-xs font-bold transition-all duration-300 shadow-sm ${
              activeTab === tab
                ? 'bg-[#003046] text-[#FDB714] scale-105 shadow-md'
                : 'bg-white border border-gray-200 text-[#5a7a8a] hover:border-[#60CBED] hover:bg-[#f0faff]'
            }`}
          >
            {tab === 'TẤT CẢ' ? 'Tất cả đăng ký' : tab === 'HỌC THỬ' ?
              '🎁 Đăng ký Học Thử' : tab === 'KHÓA HỌC' ?
              '📚 Đăng ký Khóa Học' : '💬 Câu hỏi liên hệ'}
          </button>
        ))}
      </div>

      {/* LEADS TABLE */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          {isLoading ? (
            /* 💡 HIỆU ỨNG LOADING XỊN XÒ */
            <div className="p-20 flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-4 border-[#60CBED] border-t-transparent mb-4"></div>
              <p className="text-[#5a7a8a] font-bold animate-pulse">Đang tải dữ liệu khách hàng...</p>
            </div>
          ) : filteredLeads.length === 0 ? (
            /* 💡 MÀN HÌNH TRỐNG CÓ BÉ BẠCH TUỘC */
            <div className="p-24 text-center flex flex-col items-center justify-center">
              <div className="text-6xl mb-4 opacity-30 text-[#003046] animate-bounce-slow">🐙</div>
              <h3 className="text-xl font-black text-[#003046] mb-2">Trống trơn!</h3>
              <p className="text-[#5a7a8a]">Chưa có khách hàng nào trong mục này.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-[#5a7a8a] text-xs uppercase tracking-wider">
                  <th className="p-5 font-bold border-b border-gray-100">Họ và tên</th>
                  <th className="p-5 font-bold border-b border-gray-100">Liên hệ</th>
                  <th className="p-5 font-bold border-b border-gray-100 w-1/3">Nhu cầu & Lời nhắn</th>
                  <th className="p-5 font-bold border-b border-gray-100">Đăng ký lúc</th>
                  <th className="p-5 font-bold border-b border-gray-100">Trạng thái xử lý</th>
                </tr>
              </thead>
              <tbody className="text-sm text-[#003046] divide-y divide-gray-50">
                {filteredLeads.map((lead) => (
                  /* Fix: Sửa lead.id thành lead._id cho Key */
                  <tr key={lead._id} className="hover:bg-[#f0faff]/50 transition-colors">
                    {/* Fix: Sửa lead.name thành lead.fullName */}
                    <td className="p-5 font-black">{lead.fullName}</td>
                    <td className="p-5">
                      <a href={`tel:${lead.phone}`} className="text-[#60CBED] hover:underline font-bold block">{lead.phone}</a>
                      {lead.email && <span className="text-xs text-gray-500 font-medium">{lead.email}</span>}
                    </td>
                    <td className="p-5">
                      <div className="mb-1">
                        {lead.type && (
                          <span className={`text-[9px] font-black uppercase px-2 py-1 rounded mr-2 inline-block shadow-sm ${
                            lead.type === 'HỌC THỬ' ? 'bg-purple-100 text-purple-700' :
                            lead.type === 'KHÓA HỌC' ? 'bg-blue-100 text-blue-700' :
                            'bg-orange-100 text-orange-700'
                          }`}>
                            {lead.type}
                          </span>
                        )}
                        {/* Fix: Sửa lead.course thành lead.program */}
                        <span className="text-xs font-bold text-[#5a7a8a]">
                          {lead.program || 'Không rõ chương trình'}
                        </span>
                      </div>
                      {lead.message && (
                        <p className="mt-2 text-xs text-gray-600 italic border-l-2 border-[#FDB714] pl-3 py-1 bg-gray-50 rounded-r-md">
                          "{lead.message}"
                        </p>
                      )}
                    </td>
                    <td className="p-5 text-[#5a7a8a] text-xs font-medium">{formatDate(lead.createdAt)}</td>
                    <td className="p-5">
                      <select
                        value={lead.status.toUpperCase()}
                        /* Fix: Truyền lead._id vào hàm đổi status */
                        onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                        className={`text-[10px] font-black uppercase px-3 py-2 rounded-full border cursor-pointer outline-none transition-all ${getStatusStyle(lead.status)}`}
                      >
                        <option value="MỚI">MỚI</option>
                        <option value="ĐANG TƯ VẤN">ĐANG TƯ VẤN</option>
                        <option value="ĐÃ CHỐT">ĐÃ CHỐT</option>
                        <option value="HỦY">HỦY</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* 💡 ĐÃ FIX LỖI CLASS: z-[9999] */}
      <div className={`fixed bottom-10 right-10 bg-green-500 text-white px-6 py-3 rounded-xl shadow-[0_10px_30px_rgba(34,197,94,0.3)] font-bold transition-all duration-300 z-[9999] ${toastMessage ?
        'opacity-100 translate-y-0' : 'opacity-0 translate-y-5 pointer-events-none'}`}>
        {toastMessage}
      </div>
    </div>
  );
}