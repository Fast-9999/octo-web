import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import News from '@/models/News';

// LẤY DANH SÁCH BÀI VIẾT
export async function GET() {
  try {
    await connectDB();
    const news = await News.find({}).sort({ createdAt: -1 });
    return NextResponse.json(news, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Lỗi GET News" }, { status: 500 });
  }
}

// THÊM BÀI VIẾT MỚI
export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const newArticle = await News.create(body);
    return NextResponse.json(newArticle, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Lỗi POST News" }, { status: 500 });
  }
}

// CẬP NHẬT BÀI VIẾT (SỬA)
export async function PUT(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    
    // Tách _id ra, phần còn lại là dữ liệu cần cập nhật
    const { _id, ...updateData } = body; 

    if (!_id) {
      return NextResponse.json({ message: "Thiếu ID bài viết" }, { status: 400 });
    }

    const updatedArticle = await News.findByIdAndUpdate(_id, updateData, { new: true });
    return NextResponse.json(updatedArticle, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Lỗi PUT News" }, { status: 500 });
  }
}

// XÓA BÀI VIẾT
export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id"); // Lấy ID từ URL (VD: /api/news?id=123)

    if (!id) {
      return NextResponse.json({ message: "Thiếu ID bài viết" }, { status: 400 });
    }

    await connectDB();
    await News.findByIdAndDelete(id);
    return NextResponse.json({ message: "Đã xóa bài viết thành công" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Lỗi DELETE News" }, { status: 500 });
  }
}