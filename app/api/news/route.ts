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