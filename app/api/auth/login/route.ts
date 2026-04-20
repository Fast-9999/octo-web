import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Admin from '@/models/Admin';

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const { username, password } = body;

    // --- TÍNH NĂNG ĐẶC BIỆT: Tự động tạo Admin nếu Database đang trống ---
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      console.log("🛠️ Database trống, đang tạo tài khoản Admin mặc định...");
      await Admin.create({
        username: 'admin',
        passwordHash: 'admin123' // Mật khẩu mặc định
      });
    }
    // ---------------------------------------------------------------------

    // Tìm user trong Database
    const user = await Admin.findOne({ username });

    // Kiểm tra tài khoản và mật khẩu (Đang so sánh text thường cho lẹ)
    if (!user || user.passwordHash !== password) {
      return NextResponse.json({ message: "Tài khoản hoặc mật khẩu không chính xác!" }, { status: 401 });
    }

    // Đăng nhập thành công
    return NextResponse.json({ 
      message: "Đăng nhập thành công!", 
      user: { username: user.username } 
    }, { status: 200 });

  } catch (error) {
    console.error("Lỗi API Login:", error);
    return NextResponse.json({ message: "Lỗi Server" }, { status: 500 });
  }
}