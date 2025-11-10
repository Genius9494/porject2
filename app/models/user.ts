import mongoose, { Schema, Document, Model } from "mongoose";

// ✅ Enum لتعريف الدور بشكل آمن
export enum UserRole {
  USER = "user",
  ADMIN = "admin",
}

// ✅ واجهة الصورة
interface IImage {
  secure_url: string;
  public_id: string;
}

// ✅ واجهة المنشور
// export interface IPost {
//   _id?: string;
//   text: string;
//   likes: number;
//   date: string | Date;
//   userId: string; // فقط string عند التعامل مع Client
//   likedBy: string[]; // بدلاً من ObjectId[] عند التعامل مع Client
//   userName?: string;
//   postIndex?: number;
// }


// ✅ واجهة المستخدم
export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  avatar?: IImage;
  wishlist: string[];
  topTenList: string[];
  gamesRating: mongoose.Types.ObjectId[];
  bio: string;
  createdAt: Date;
  points: number;
  level: string;
  text: string;
  likes: number;
  date: Date;
  userId: mongoose.Schema.Types.ObjectId;
  collectedGifts?: string[];
  // posts: IPost[];
}

// ✅ سكيم الصورة
const imageSchema = new Schema<IImage>({
  secure_url: { type: String, required: true },
  public_id: { type: String, required: true },
});

// ✅ سكيم المستخدم
const userSchema = new Schema<IUser>(
  {
    
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: Object.values(UserRole), default: UserRole.USER },
    avatar: { type: imageSchema, required: false },
    wishlist: [{ type: String }],
    topTenList: [{ type: String }],
    gamesRating: [{ type: Schema.Types.ObjectId, ref: "GameReview" }],
    bio: { type: String, maxlength: 500, default: "No bio" },
    createdAt: { type: Date, default: Date.now },
    points: { type: Number, default: 0 },
    level: { type: String, default: "LV-1" },
    collectedGifts: [{ type: String }],

    // ✅ المصفوفة الخاصة بالمنشورات
//     posts: [
//   {
//     text: { type: String, required: true },
//     likes: { type: Number, default: 0 },
//     date: { type: Date, default: Date.now },
//     userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
//     likedBy: [{ type: Schema.Types.ObjectId, ref: "User" }], // ✅ قائمة المستخدمين الذين أعجبوا
//   },
// ],

  },
  { timestamps: true }
);

// ✅ إصلاح الخطأ عند التحويل إلى JSON (لمنع ObjectId/Date من التسبب في crash)
// userSchema.set("toJSON", {
//   transform: (_doc, ret) => {
//     ret._id = ret._id?.toString();
//     if (ret.posts && Array.isArray(ret.posts)) {
//       ret.posts = ret.posts.map((p: any) => ({
//         ...p,
//         _id: p._id?.toString(),
//         userId: p.userId?.toString(),
//         date: p.date?.toISOString(),
//       }));
//     }
//     return ret;
//   },
// });

// ✅ إنشاء الموديل
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
export type UserDocument = IUser;
