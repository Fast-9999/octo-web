'use client';

import { ReactLenis } from 'lenis/react';

export default function SmoothScrolling({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ 
      lerp: 0.08, // Độ mượt (càng nhỏ càng mượt, 0.08 là chuẩn bài cho máy tính)
      duration: 1.2, // Thời gian trượt cho máy tính
      smoothWheel: true, // BẬT: Làm mượt cho con lăn chuột (Desktop)
      
      // 📱 TỐI ƯU MOBILE: 
      // Phiên bản Lenis mới đã mặc định trả lại vật lý cuộn gốc cho thiết bị cảm ứng,
      // nên không cần khai báo smoothTouch ở đây nữa, hiệu ứng Snap vẫn mượt mà!
    }}>
      {children}
    </ReactLenis>
  );
}