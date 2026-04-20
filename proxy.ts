import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Ở bản Next.js 16, hàm này bắt buộc phải tên là "proxy" thay vì "middleware"
export function proxy(request: NextRequest) {
  // Lấy thẻ thông hành từ Cookie
  const token = request.cookies.get('admin_token');

  // Kiểm tra xem user đang cố vào thư mục /admin đúng không?
  if (request.nextUrl.pathname.startsWith('/admin')) {
    
    // Nếu KHÔNG CÓ thẻ thông hành -> Đá văng ra trang đăng nhập
    if (!token) {
      return NextResponse.redirect(new URL('/admin-login', request.url));
    }
  }

  // Nếu có thẻ rồi thì cho qua bình thường
  return NextResponse.next();
}

// Chỉ định proxy này chỉ chặn cửa ở các đường link bắt đầu bằng /admin
export const config = {
  matcher: '/admin/:path*',
};