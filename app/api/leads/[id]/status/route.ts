import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Lead from '@/models/Lead';

export async function PUT(
  request: Request,
  // 🎯 Fix 1: Khai báo params là một Promise
  { params }: { params: Promise<{ id: string }> } 
) {
  try {
    await connectDB();
    
    // 🎯 Fix 2: Bắt buộc phải có chữ 'await' ở đây để lấy ID ra
    const { id } = await params; 
    
    const body = await request.json();
    const { status } = body;

    const updatedLead = await Lead.findByIdAndUpdate(
      id,
      { status: status },
      // 🎯 Fix 3: Sửa 'new: true' thành chuẩn mới để Mongoose hết càm ràm
      { returnDocument: 'after' } 
    );

    if (!updatedLead) {
      return NextResponse.json({ message: "Không tìm thấy khách hàng này!" }, { status: 404 });
    }

    return NextResponse.json(updatedLead, { status: 200 });
  } catch (error) {
    console.error("Lỗi cập nhật trạng thái Lead:", error);
    return NextResponse.json({ message: "Lỗi Server" }, { status: 500 });
  }
}