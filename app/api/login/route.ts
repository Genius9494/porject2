import { NextResponse } from "next/server";
import connect from "@/lib/connect";
import User from "../../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_EXPIRES = 90 * 60; // 90 دقيقة

// ✅ توليد التوكن
const generateToken = ({ id, role }: { id: string; role: "admin" | "user" }) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET!, {
    expiresIn: JWT_EXPIRES,
  });
};

export async function POST(req: Request) {
  try {
    await connect();
    console.log("✅ Database connected.");

    const data = await req.json();
    console.log("📥 Received data:", data);

    const user = await User.findOne({ email: data.email }).select("+password");

    if (!user) {
      console.log("❌ User not found");
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
      console.log("❌ Incorrect password");
      return NextResponse.json({ error: "Incorrect email or password!" }, { status: 401 });
    }

    // ✅ التحقق من الدور الموجود في قاعدة البيانات
    console.log("🧾 User role from DB:", user.role);

    const token = generateToken({ id: user._id.toString(), role: user.role });
    const payload = jwt.decode(token);
    console.log("🔐 JWT Payload:", payload);

    // ✅ حفظ التوكن في الكوكيز
    (await cookies()).set("token", token, {
      httpOnly: true,
      maxAge: JWT_EXPIRES,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    return NextResponse.json({
      success: "Login successful",
      data: {
        _id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error: any) {
    console.error("❌ Login error:", error);
    return NextResponse.json(
      { error: "Something went wrong", details: error.message },
      { status: 500 }
    );
  }
}









// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import connect from "@/lib/connect";
// import User from "../../models/user";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import { serialize } from "cookie";

// const JWT_EXPIRES = 90 * 60; // 90 دقيقة

// const generateToken = ({ id }: { id: any }) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET!, {
//     expiresIn: JWT_EXPIRES,
//   });
// };

// export async function POST(req: NextRequest) {
//   try {
//     console.log("API called"); // تتبع ما إذا كانت الدالة قد استُدعيت
//     await connect(); // تأكد من الاتصال بقاعدة البيانات

//     const data = await req.json(); // استخراج البيانات من الجسم
//     const user = await User.findOne({ email: data.email }).select("+password");
    
//     if (!user) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     const isMatch = await bcrypt.compare(data.password, user.password);
//     if (!isMatch) {
//       return NextResponse.json(
//         { error: "Incorrect email or password!" },
//         { status: 401 }
//       );
//     }

//     const res = NextResponse.json(
//       {
//         success: "Login successful",
//         data: {
//           _id: user._id,
//           email: user.email,
//           name: user.name,
//         },
//       },
//       { status: 200 }
//     );

//     const token = generateToken({ id: user._id });
//     const serialized = serialize("token", token, {
//       httpOnly: true,
//       maxAge: JWT_EXPIRES,
//       path: "/",
//       sameSite: "lax",
//       secure: process.env.NODE_ENV === "production",
//     });

//     res.headers.set("Set-Cookie", serialized);

//     return res;
//   } catch (error: any) {
//     console.error("Login error:", error);
//     return NextResponse.json(
//       { error: "Something went wrong", details: error.message },
//       { status: 500 }
//     );
//   }
// }

