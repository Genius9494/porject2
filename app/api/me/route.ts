// import { NextResponse } from "next/server";
// import User from "@/app/models/user";
// import jwt from "jsonwebtoken";

// export async function GET(req: Request) {
//   try {
//     // الحصول على الكوكيز
//     const cookieHeader = req.headers.get("cookie") || "";
//     const tokenMatch = cookieHeader.match(/token=([^;]+)/);
//     if (!tokenMatch) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }
//     const token = tokenMatch[1];

//     // فك تشفير التوكن
//     const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
//     const userId = decoded.id;
//     if (!userId) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     // البحث عن المستخدم
//     const user = await User.findById(userId).select("name _id");
//     if (!user) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     return NextResponse.json({ id: user._id.toString(), name: user.name });
//   } catch (error: any) {
//     console.error("GET /api/me error:", error);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }
