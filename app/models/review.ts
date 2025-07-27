import mongoose, { Schema, Document } from "mongoose";

// مخطط الردود
const ReplySchema = new Schema(
  {
    userId: String,
    comment: String,
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

// مخطط المراجعات
const gameReviewSchema = new Schema(
  {
    gameId: { type: String, required: true },
    userId: { type: String, required: true },
    username: { type: String, required: true }, 
    comment: { type: String, required: true },
    rating: { type: Number, required: true, min: 0, max: 10 },
    createdAt: { type: Date, default: Date.now },
    likes: {
      type: [String],
      default: [],
      index: false,
    },
    replies: {
      type: [ReplySchema],
      default: []
    },
  },
  { timestamps: true }
);

// الواجهة للـ TypeScript
export interface IReview extends Document {
  gameId: string;
  userId?: string;
  rating: number;
  comment: string;
  createdAt: Date;
  likes?: string[];
  replies?: {
    userId: string;
    comment: string;
    createdAt: Date;
  }[];
}

// التصدير
const GameReview =
  mongoose.models.GameReview ||
  mongoose.model<IReview>("GameReview", gameReviewSchema);

export default GameReview;
