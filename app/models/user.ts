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
  //pints user
  points: number;
  level: string;
  userId?: Number;
  collectedGifts?: string[];
  text: string;
  likes: number;
  date: Date;
  
}

//  سكيم الصورة
const imageSchema = new Schema<IImage>({
  secure_url: { type: String, required: true },
  public_id: { type: String, required: true },
});

//  سكيم المستخدم
const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true, select: false },

    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
    },

    avatar: { type: imageSchema, required: false },
    wishlist: [{ type: String }],
    topTenList: [{ type: String }],
    gamesRating: [{ type: Schema.Types.ObjectId, ref: "GameReview" }],
    bio: { type: String, maxlength: 500, default: "No bio" },
    createdAt: { type: Date, default: Date.now },
    
    points: { type: Number, default: 0 }, // 
    level: { type: String, default: "LV-1" }, 
     // IDs of collected gifts
    collectedGifts: [{ type: String }],
text: { type: String, required: false },
  likes: { type: Number, default: 0 },
  date: { type: Date, default: Date.now },
    
    
  },
  { timestamps: true }
);

//  إعادة استخدام الموديل
const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
export type UserDocument = IUser ;





