import mongoose, { Schema, Document } from 'mongoose';

export interface INews extends Document {
  title: string;
  summary: string;
  content: string; // Chỗ này mốt sẽ lưu mã HTML chứa Font, Màu sắc từ bộ gõ Word
  imageUrl: string;
  author: string;
  tag: string;
  createdAt: Date;
  updatedAt: Date;
}

const NewsSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    summary: { type: String, required: true },
    content: { type: String, required: true },
    imageUrl: { type: String, required: true },
    author: { type: String, default: 'Admin Octo' },
    tag: { type: String, default: 'Thông báo' },
  },
  { timestamps: true }
);

const News = mongoose.models.News || mongoose.model<INews>('News', NewsSchema);

export default News;