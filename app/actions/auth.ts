  "use server";
  import User from "../models/user";
  import connect from "@/lib/connect";
  import bcrypt from "bcrypt";
  import jwt from "jsonwebtoken";
  import { cookies } from "next/headers"; 
  import { NextResponse } from "next/server";

  import { NextApiRequest } from "next";








  // ثابت منتهي الصلاحية (90 دقيقة)
  const JWT_EXPIRES = 90 * 60; 

  // ✅ توليد التوكن
  // const generateToken = ({ id, role }: { id: string; role: "admin" | "user" }) => {
  //   return jwt.sign({ id, role }, process.env.JWT_SECRET as string, {
  //     expiresIn: JWT_EXPIRES,
  //   });
  // };


  // ✅ تسجيل مستخدم جديد
  export const signup = async (data: { 
    email: string; 
    password: string; 
    name: string; 
    role?: "admin" | "user"; 
    avatar?: { secure_url: string; public_id: string }; 
  }) => {
    try {
      await connect();


      
      const existingUser = await User.findOne({ email: data.email });
      if (existingUser) {
        return { error: "البريد الإلكتروني مسجل بالفعل" };
      }

      const hashedPassword = await bcrypt.hash(data.password, 10);

      const createdUser = await User.create({
        name: data.name,
        email: data.email,
        password: hashedPassword,
        avatar: data.avatar?.secure_url ? data.avatar : undefined,
        role: data.role ?? "user",
      });
      console.log("✅ Created User:", createdUser);

      return { 
        success: "User created successfully",
        user: {
          id: createdUser._id.toString(),
          name: createdUser.name,
          email: createdUser.email,
          role: createdUser.role,
        }
      };

    } catch (error: any) {
      console.error("Signup error:", error);

      if (error.code === 11000) {
        return { error: "البريد الإلكتروني مسجل بالفعل (مكرر)" };
      }

      return { error: "فشل إنشاء المستخدم", details: error.message };
    }
  };


  // التحقق من الجلسة
  export const protect = async () => {
    try {
      const cookieStore = await cookies(); 
      const token = cookieStore.get("token")?.value;

      if (!token) {
        return { error: "You are not authorized to perform this action!" };
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string; role: "admin" | "user" };

      return { decode: decoded };
    } catch (error) {
      return { error: "Invalid or expired token!" };
    }
  };

  // الحصول على بيانات المستخدم
  export const getUser = async () => {
    try {
      await connect();
      const { decode, error } = await protect();

      if (error || !decode?.id) {
        return { error: "You are not authorized to perform this action!" };
      }

      const user = await User.findById(decode.id).lean(); // نحصل على كائن بسيط
      if (!user) return { error: "User not found" };

      //  نحذف أو نحول كل ObjectId
      const cleanUser = {
        ...user,
        _id: user._id.toString(),
        avatar: {
          ...user.avatar,
          _id: user.avatar && "_id" in user.avatar ? (user.avatar as any)._id.toString() : undefined,
        },
      };
      

      // نحذف الخصائص غير الضرورية مثل password و __v
      const { password: _, __v, ...userWithoutPassword } = cleanUser;

      return { data: userWithoutPassword };
    } catch (error) {
      return { error: "Failed to get user" };
    }
  };


  // تسجيل الخروج الصحيح
  export const logout = async () => {
    try {
      const response = NextResponse.json({ success: "Logout successful" });

      response.cookies.set("token", "", {
        httpOnly: true,
        maxAge: 0, // لحذف الكوكيز فورًا
        path: "/", 
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });

      return response; //
    } catch (error) {
      return NextResponse.json({ error: "Logout failed" }, { status: 500 });
    }
  };

