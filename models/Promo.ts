// models/Promo.ts
import mongoose from 'mongoose';

const promoSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Vd: "KHAI GIẢNG CÁC LỚP..."
  subtitle: { type: String }, // Vd: "Đăng ký ngay hôm nay..."
  discountText: { type: String }, // Vd: "30%"
  imageUrl: { type: String }, // Link ảnh bên phải
  buttonText: { type: String, default: 'ĐẾN NGAY' },
  buttonLink: { type: String, default: '#register' },
  isActive: { type: Boolean, default: true }, // Dùng để admin bật/tắt popup
}, { timestamps: true });

export default mongoose.models.Promo || mongoose.model('Promo', promoSchema);