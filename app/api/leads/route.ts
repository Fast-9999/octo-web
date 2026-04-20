import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb'; // Chú ý đường dẫn này nha, dùng @/lib hoặc ../../../lib tùy dự án ní
import Lead from '@/models/Lead';

// 🟢 API GET: LẤY DANH SÁCH KHÁCH HÀNG
export async function GET() {
  try {
    await connectDB(); // Nhớ cắm điện vô Database trước
    // Lấy tất cả Lead, sắp xếp theo thời gian mới nhất (createdAt: -1)
    const leads = await Lead.find({}).sort({ createdAt: -1 }); 
    
    return NextResponse.json(leads, { status: 200 });
  } catch (error) {
    console.error("Lỗi GET Leads:", error);
    return NextResponse.json({ message: "Lỗi khi lấy danh sách khách hàng", error }, { status: 500 });
  }
}

// 🔵 API POST: THÊM KHÁCH HÀNG MỚI (Lúc user điền form liên hệ)
export async function POST(request: Request) {
  try {
    await connectDB();
    
    // Đọc dữ liệu user gửi lên từ form
    const body = await request.json(); 
    
    // Đúc bánh: Nhét dữ liệu vào Model Lead và lưu xuống Database
    const newLead = await Lead.create(body);
    
    return NextResponse.json(newLead, { status: 201 }); // 201 là Created (Tạo thành công)
  } catch (error) {
    console.error("Lỗi POST Lead:", error);
    return NextResponse.json({ message: "Lỗi khi tạo khách hàng mới", error }, { status: 500 });
  }
}