// import { NextResponse } from "next/server";
// import connect from "@/lib/connect";
// import User from "@/app/models/user";
// import jwt from "jsonwebtoken";

// export async function POST(req: Request, { params }: { params: { userId: string; postIndex: string } }) {
//   try {
//     await connect();

//     // جلب التوكن من الكوكيز لتحديد المستخدم الحالي
//     const cookieHeader = req.headers.get("cookie") || "";
//     const tokenMatch = cookieHeader.match(/token=([^;]+)/);
//     if (!tokenMatch) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//     const token = tokenMatch[1];
//     const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
//     const currentUserId = decoded.id;

//     if (!currentUserId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//     const { userId, postIndex } = params;
//     const index = parseInt(postIndex);

//     const user = await User.findById(userId);
//     if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

//     const post = user.posts[index];
//     if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });

//     // ✅ تحقق إذا المستخدم الحالي أعجب بالفعل
//     if (!post.likedBy) post.likedBy = [];
//     if (post.likedBy.includes(currentUserId)) {
//       return NextResponse.json({ error: "You already liked this post" }, { status: 400 });
//     }

//     post.likes += 1;
//     post.likedBy.push(currentUserId);

//     await user.save();

//     return NextResponse.json({ message: "Post liked successfully", likes: post.likes });
//   } catch (err) {
//     console.error("❌ Error liking post:", err);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }
