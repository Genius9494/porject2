// import { NextResponse } from "next/server";
// import User, { IPost } from "@/app/models/user";
// import connect from "@/lib/connect";

// export async function GET() {
//   try {
//     await connect();

//     const users = await User.find({ "posts.0": { $exists: true } });

//     const posts: Array<IPost & { userName: string; userId: string; postIndex: number }> = [];

//     users.forEach((user) => {
//       user.posts.forEach((p, idx) => {
//         posts.push({
//   _id: p._id?.toString() || "",
//   text: p.text,
//   likes: p.likes,
//   date: p.date instanceof Date ? p.date.toISOString() : new Date(p.date).toISOString(),
//   userId: p.userId?.toString() || "",
//   likedBy: p.likedBy?.map((id) => id.toString()) || [],
//   userName: user.name,
//   postIndex: idx,
// });

//       });
//     });

//     // ترتيب المنشورات حسب التاريخ الأحدث
//     posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

//     return NextResponse.json(posts);
//   } catch (err) {
//     console.error("GET /api/posts error:", err);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }

// export async function POST(req: Request) {
//   try {
//     await connect();
//     const { userId, text } = await req.json();

//     if (!text?.trim() || !userId) {
//       return NextResponse.json({ error: "Missing userId or text" }, { status: 400 });
//     }

//     const user = await User.findById(userId);
//     if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

//     const newPost: IPost = {
//       text,
//       likes: 0,
//       date: new Date(),
//       userId: user._id.toString(),
//       likedBy: [], // إضافة حقل likedBy الجديد
//     };

//     user.posts.push(newPost);
//     await user.save();

//     // إرسال plain object فقط
//     const responsePost = {
//       ...newPost,
//       _id: newPost._id?.toString() || "",
//       date: newPost.date instanceof Date ? newPost.date.toISOString() : newPost.date,
//       userName: user.name,
//       postIndex: user.posts.length - 1,
//       likedBy: [],
//     };

//     return NextResponse.json(responsePost);
//   } catch (err) {
//     console.error("POST /api/posts error:", err);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }
