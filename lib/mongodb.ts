import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Ê ní quên bỏ link MONGODB_URI vô file .env.local rồi kìa!');
}

// Khởi tạo biến global để giữ connection (tránh bị sập DB do Next.js hot-reload liên tục lúc code)
let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      console.log("🔥 Đã kết nối thành công với MongoDB Atlas!");
      return mongoose;
    }).catch((error) => {
      console.error("❌ Lỗi kết nối MongoDB:", error);
      throw error;
    });
  }
  
  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;