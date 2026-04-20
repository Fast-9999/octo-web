import mongoose, { Schema, Document } from 'mongoose';

export interface ILead extends Document {
  fullName: string;
  phone: string;
  email?: string;       
  program?: string;     
  type?: string;        
  message?: string;     // 🎯 ĐÃ THÊM: Chỗ chứa lời nhắn của khách
  status: 'MỚI' | 'ĐANG_TƯ_VẤN' | 'THÀNH_CÔNG' | 'HỦY';
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema: Schema = new Schema(
  {
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: false }, 
    program: { type: String },                
    type: { type: String, default: 'HỌC THỬ' }, 
    message: { type: String }, // 🎯 ĐÃ THÊM: Chỗ chứa lời nhắn của khách
    status: { 
      type: String, 
      enum: ['MỚI', 'ĐANG_TƯ_VẤN', 'THÀNH_CÔNG', 'HỦY'],
      default: 'MỚI' 
    },
  },
  { timestamps: true }
);

// Chiêu thức tối thượng để không bị dính lỗi đè Model của Next.js
const Lead = mongoose.models.Lead || mongoose.model<ILead>('Lead', LeadSchema);

export default Lead;