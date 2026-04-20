'use client';

import { ReactLenis } from 'lenis/react';

export default function SmoothScrolling({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis root options={{ 
      lerp: 0.08, // Độ mượt (càng nhỏ càng mượt, 0.08 là chuẩn bài)
      duration: 1.2, // Thời gian trượt
      smoothWheel: true, // Bật mượt cho chuột
    }}>
      {children}
    </ReactLenis>
  );
}