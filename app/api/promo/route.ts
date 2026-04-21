// app/api/promo/route.ts
import { NextResponse } from 'next/server';
import connectMongoDB from '@/lib/mongodb';
import Promo from '@/models/Promo';

// Client gọi để lấy data hiển thị
export async function GET() {
  try {
    await connectMongoDB();
    const promo = await Promo.findOne(); // Chỉ lấy 1 document duy nhất
    return NextResponse.json(promo || { isActive: false });
  } catch (error) {
    return NextResponse.json({ isActive: false }, { status: 500 });
  }
}

// Admin gọi để cập nhật data
export async function PUT(request: Request) {
  try {
    const data = await request.json();
    await connectMongoDB();
    
    // Upsert: Có rồi thì update, chưa có thì tạo mới
    const updatedPromo = await Promo.findOneAndUpdate({}, data, { new: true, upsert: true });
    
    return NextResponse.json({ message: "Đã cập nhật quảng cáo", data: updatedPromo });
  } catch (error) {
    return NextResponse.json({ message: "Lỗi server" }, { status: 500 });
  }
}