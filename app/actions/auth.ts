  "use server";
  import mongoose from "mongoose";
  import User from "../models/user";
  import connect from "./connet";
  import bcrypt from "bcrypt";
  import jwt from "jsonwebtoken";
  import { cookies } from "next/headers"; 
  import { NextResponse } from "next/server";

  import { NextApiRequest } from "next";


  // type DecodedUser = {
  //   id: string;
  //   email: string;
  //   role: "admin" | "user";
  // };


  // const JWT_SECRET = process.env.JWT_SECRET || "your-secret";






  // ثابت منتهي الصلاحية (90 دقيقة)
  const JWT_EXPIRES = 90 * 60; 

  // ✅ توليد التوكن
  // const generateToken = ({ id, role }: { id: string; role: "admin" | "user" }) => {
  //   return jwt.sign({ id, role }, process.env.JWT_SECRET as string, {
  //     expiresIn: JWT_EXPIRES,
  //   });
  // };



  console.log("✅ تم الاتصال بقاعدة البيانات بنجاح");

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




  // if (typeof data.avatar !== "object" || !data.avatar?.secure_url) {
  //   delete data.avatar;
  // }

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


//0f5653da099bc566f9a959a302a3ecf378777d86a004efac8267b552c9adb9fbc1e0de98f4bfac0d421b4c5265fe97ec84468de97f10442eb78






















// "use server";
// import User from "../models/user";
// import connect from "./connet";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import { cookies } from "next/headers";
// const JWT_EXPIRES = 90 * 60;
// const generateToken = async ({ id }: { id: any }) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET!!, {
//     expiresIn: JWT_EXPIRES,
//   });
// };
// export const signup = async (data: any) => {
//   try {
//     await connect();
//     const hashedPassword = await bcrypt.hash(data.password, 10);
//     const user = await User.create({ ...data, password: hashedPassword });
//     return { success: "User created successfully" };
//   } catch (error: any) {
//     console.error(error);
//     return { error: "User creation failed", details: error.message };
//   }
// };
// export const login = async (data: { email: string; password: string }) => {
//   try {
//     await connect();
//     const cookie = await cookies();
//     console.log(data);
//     const user = await User.findOne({ email: data.email }).select("+password");
//     console.log(user);
//     if (!user) {
//       return { error: "User not found" };
//     }
//     const isMatch = await bcrypt.compare(data.password, user.password);
//     if (!isMatch) {
//       return { error: "Incorrect email or password !" }; //not make them know if it is the password or email
//     }
//     const userObj = JSON.parse(JSON.stringify(user));
//     const token = await generateToken({ id: user._id });
//     console.log(token);
//     cookie.set("token", token, {
//       httpOnly: true,
//       maxAge: JWT_EXPIRES,
//       sameSite: "none",
//       path: "/",
//       secure: true,
//     });

//     return { success: "Login successful", data: userObj };
//   } catch (error: any) {
//     console.log(error);
//     return { error: "Login failed", details: error.message };
//   }
// };
// // review game update
// export const protect = async () => {
//   const cookie = await cookies();
//   const token = cookie.get("token")?.value;
//   if (!token) return { error: "you are not authorized to preform this action"! };
//   let decode;
//   decode = jwt.verify(token, process.env.JWT_SECRET!!);
//   if (!decode) return { error: "you are not authorized to preform this action"! };
//   return { decode };
// };
// export const getUser = async () => {
//   try {
//     connect();
//     const { decode } = await protect();
//     const user = await User.findById((decode as any).id);
//     if (!user) return { error: "you are not authorized to preform this action"! };
//     const userObj = JSON.parse(JSON.stringify(user));
//     return { data: userObj };
//   } catch (error) {
//     return { error: "you are not authorized to preform this action"! };
//   }
// };
// export const logout = async () => {
//   try {
//     (await cookies()).delete("token");
//     return { success: "Logout successful" };
//   } catch (error) {
//     return { error: "Logout failed" };
//   }
// };
