import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Cấu trúc không có thư mục src
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'octo-white': '#FFFFFF', // 50% 
        'octo-blue': '#60CBED',  // 40% 
        'octo-yellow': '#FDB714', // 10% 
        'octo-dark': '#003046', // Deep Ocean Blue dùng thay cho màu đen 
      },
      spacing: {
        'safe': '10vw', // Khoảng trống an toàn 10% ở các góc 
      },
      borderRadius: {
        'octo': '24px', // Bo tròn theo nhận diện thương hiệu Octo.
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // Plugin xử lý định dạng văn bản cho bài viết
  ],
};
export default config;