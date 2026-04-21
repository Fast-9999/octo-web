'use client';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import 'react-quill-new/dist/quill.snow.css';

interface News {
  _id: string;
  title: string;
  summary: string;
  content: string;
  imageUrl: string;
  author: string;
  tag: string;
  createdAt: string;
}

export default function AdminNews() {
  const [newsList, setNewsList] = useState<News[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Đổi tên state cho chuẩn logic (form mở hay đóng)
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentArticle, setCurrentArticle] = useState<News | null>(null); // Lưu bài viết đang sửa
  
  const [toastMessage, setToastMessage] = useState('');
  const [content, setContent] = useState('');
  const [authorName, setAuthorName] = useState('');

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch('/api/news');
      if (response.ok) {
        const data = await response.json();
        data.sort((a: News, b: News) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setNewsList(data);
      }
    } catch (error) {
      console.error('Lỗi lấy bài viết:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 🟢 HÀM MỞ FORM TẠO MỚI
  const handleAddNew = () => {
    setCurrentArticle(null);
    setContent('');
    setAuthorName('');
    setIsFormOpen(true);
  };

  // 🟡 HÀM MỞ FORM ĐỂ SỬA
  const handleEdit = (article: News) => {
    setCurrentArticle(article);
    setContent(article.content);
    setAuthorName(article.author);
    setIsFormOpen(true);
    // Cuộn lên trên cùng để dễ nhìn
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 🔴 HÀM XÓA BÀI VIẾT
  const handleDelete = async (id: string) => {
    // Hỏi xác nhận trước khi xóa (chống lỡ tay bấm nhầm)
    if (!window.confirm('Ní có chắc muốn xóa bài viết này không? Không khôi phục được đâu nha!')) return;
    
    try {
      const res = await fetch(`/api/news?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setToastMessage('🗑️ Đã xóa bài viết thành công!');
        setTimeout(() => setToastMessage(''), 3000);
        fetchNews(); // Tải lại danh sách
      } else {
        alert('Có lỗi khi xóa bài viết!');
      }
    } catch (error) {
      console.error('Lỗi Server:', error);
    }
  };

  // 🔵 HÀM LƯU DỮ LIỆU (TẠO MỚI HOẶC SỬA)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const articleData = {
      title: formData.get('title'),
      summary: formData.get('summary'),
      content: content, 
      imageUrl: formData.get('imageUrl'),
      author: authorName.trim() !== '' ? authorName.trim() : 'Admin Octo', 
      tag: formData.get('tag')
    };

    try {
      let response;
      if (currentArticle) {
        // Nếu có currentArticle => Đang ở chế độ SỬA (Gọi PUT)
        response = await fetch('/api/news', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ _id: currentArticle._id, ...articleData }),
        });
      } else {
        // Nếu không có => Đang ở chế độ TẠO MỚI (Gọi POST)
        response = await fetch('/api/news', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(articleData),
        });
      }

      if (response.ok) {
        setToastMessage(currentArticle ? '✅ Cập nhật thành công!' : '✅ Đăng bài thành công!');
        setTimeout(() => setToastMessage(''), 3000);
        form.reset();
        setContent(''); 
        setAuthorName('');
        setIsFormOpen(false);
        setCurrentArticle(null);
        fetchNews(); 
      } else {
        alert('Có lỗi xảy ra khi lưu bài viết!');
      }
    } catch (error) {
      console.error('Lỗi Server:', error);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['clean']
    ],
  };

  return (
    <div className="animate-fade-in-up relative pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-[#003046]">Quản lý Tin tức & Sự kiện</h1>
          <p className="text-[#5a7a8a] text-sm mt-1">Đăng tải thông báo, bài viết SEO cho trung tâm Octo.</p>
        </div>
        {!isFormOpen && (
          <button
            onClick={handleAddNew}
            className="bg-[#003046] text-[#FDB714] font-black px-6 py-3 rounded-xl hover:bg-[#60CBED] hover:text-[#003046] transition-all shadow-md flex items-center gap-2"
          >
            <span className="text-xl leading-none">+</span> Đăng bài mới
          </button>
        )}
      </div>

      {isFormOpen ? (
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-[#60CBED]/20 animate-fade-in">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
            <h2 className="text-xl font-black text-[#003046]">
              {currentArticle ? '✏️ Chỉnh sửa bài viết' : '✍️ Soạn bài viết mới'}
            </h2>
            <button 
              onClick={() => { setIsFormOpen(false); setCurrentArticle(null); }} 
              className="text-[#5a7a8a] text-sm font-bold hover:text-red-500 transition-colors"
            >
              ✕ Hủy bỏ
            </button>
          </div>

          {/* SỬ DỤNG KEY ĐỂ RESET FORM KHI THAY ĐỔI TRẠNG THÁI */}
          <form key={currentArticle ? currentArticle._id : 'new'} onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-[#5a7a8a] mb-2 uppercase">Tiêu đề bài viết <span className="text-red-500">*</span></label>
                  <input type="text" name="title" defaultValue={currentArticle?.title || ''} required placeholder="VD: Khai giảng lớp Tiếng Anh..."
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#60CBED] focus:bg-white transition-all text-[#003046] font-bold" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#5a7a8a] mb-2 uppercase">Link ảnh bìa (URL) <span className="text-red-500">*</span></label>
                  <input type="url" name="imageUrl" defaultValue={currentArticle?.imageUrl || ''} required placeholder="Dán link ảnh từ postimages.org vô đây..."
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#60CBED] focus:bg-white transition-all text-[#003046]" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#5a7a8a] mb-2 uppercase">Loại bài viết <span className="text-red-500">*</span></label>
                    <select name="tag" defaultValue={currentArticle?.tag || 'Thông báo'} required
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#60CBED] focus:bg-white transition-all text-[#003046] font-bold cursor-pointer"
                    >
                      <option value="Thông báo">Thông báo</option>
                      <option value="Sự kiện">Sự kiện</option>
                      <option value="Kinh nghiệm">Kinh nghiệm</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#5a7a8a] mb-2 uppercase">Tên tác giả</label>
                    <input 
                      type="text" 
                      name="author" 
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      placeholder="VD: Cô Lan Phương"
                      className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#60CBED] focus:bg-white transition-all text-[#003046]" 
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#5a7a8a] mb-2 uppercase">Đoạn tóm tắt <span className="text-red-500">*</span></label>
                <textarea name="summary" defaultValue={currentArticle?.summary || ''} required rows={10} placeholder="Viết 2-3 câu tóm tắt nội dung chính..."
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-[#60CBED] focus:bg-white transition-all text-[#003046] resize-none"></textarea>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#5a7a8a] mb-2 uppercase">Nội dung chi tiết <span className="text-red-500">*</span></label>
              <div className="bg-white text-black">
                <ReactQuill 
                  theme="snow" 
                  value={content} 
                  onChange={setContent} 
                  modules={modules}
                  className="h-64 mb-12"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <button type="submit" className="px-8 py-4 rounded-xl font-black text-[#003046] bg-[#FDB714] hover:-translate-y-0.5 transition-all mt-5 shadow-lg shadow-[#FDB714]/20">
                {currentArticle ? '💾 Cập nhật bài viết' : '🚀 Xuất bản bài viết'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        isLoading ? (
          <div className="p-20 text-center text-[#5a7a8a] font-bold animate-pulse">Đang tải danh sách bài viết...</div>
        ) : newsList.length === 0 ? (
          <div className="bg-white rounded-3xl p-20 text-center border border-gray-100 shadow-sm">
            <h3 className="text-xl font-black text-[#003046] mb-2">Chưa có bài viết nào.</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {newsList.map((item) => (
              <div key={item._id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex flex-col group hover:shadow-xl transition-all duration-300">
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="bg-[#FDB714] text-[#003046] text-[10px] font-black px-3 py-1.5 rounded-full shadow-sm uppercase">
                      {item.tag}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-lg font-black text-[#003046] mb-3 line-clamp-2">{item.title}</h3>
                  <p className="text-[#5a7a8a] text-sm mb-6 line-clamp-3">{item.summary}</p>
                  
                  {/* THANH CÔNG CỤ SỬA/XÓA Ở DƯỚI CÙNG */}
                  <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex flex-col text-[10px] font-bold text-[#5a7a8a]">
                      <span>🗓️ {formatDate(item.createdAt)}</span>
                      <span className="italic text-[#003046]">✍️ {item.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleEdit(item)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors active:scale-90"
                        title="Sửa bài"
                      >
                        ✏️
                      </button>
                      <button 
                        onClick={() => handleDelete(item._id)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors active:scale-90"
                        title="Xóa bài"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )
      )}

      <div className={`fixed bottom-10 right-10 bg-[#003046] text-white border border-[#60CBED]/50 px-6 py-3 rounded-xl shadow-2xl font-bold transition-all duration-300 z-[9999] ${toastMessage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5 pointer-events-none'}`}>
        {toastMessage}
      </div>
    </div>
  );
}