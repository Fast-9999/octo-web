import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import News from '@/models/News';

// API LẤY CHI TIẾT 1 BÀI VIẾT
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    
    // Tìm bài viết theo ID
    const article = await News.findById(id);

    if (!article) {
      return NextResponse.json({ message: "Không tìm thấy bài viết!" }, { status: 404 });
    }

    return NextResponse.json(article, { status: 200 });
  } catch (error) {
    console.error("Lỗi lấy chi tiết News:", error);
    return NextResponse.json({ message: "Lỗi Server" }, { status: 500 });
  }
}