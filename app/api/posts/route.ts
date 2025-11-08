import { NextResponse } from "next/server";
import User, { IUser } from "@/app/models/user";
import connect from "@/lib/connect";


export async function GET() {
  try {
    await connect();

    const usersWithPosts = await User.find({ "posts.0": { $exists: true } });

    const posts = usersWithPosts.flatMap(u =>
      u.posts.map((p:any, index: any) => ({
        ...p.toObject(),
        userName: u.name,
        userId: u._id,
        postIndex: index, // لتسهيل عملية Like
      }))
    );

    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return NextResponse.json(posts);
  } catch (err) {
    console.error("GET /api/posts error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}


export async function POST(req: Request) {
  try {
    await connect();
    const { userId, text } = await req.json();

    if (!text || text.trim() === "") {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    // استخدام Generic لإخبار TypeScript أن user من نوع IUser
    const user = await User.findById<IUser>(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const newPost = { text, likes: 0, date: new Date() };
    user.posts.push(newPost);
    await user.save();

    return NextResponse.json({
      ...newPost,
      userName: user.name,
      userId: user._id,
      postIndex: user.posts.length - 1,
    });
  } catch (err) {
    console.error("POST /api/posts error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// ======================
// POST: زيادة إعجاب بوست
// ======================
// يفضل عمل ملف route منفصل: /api/posts/[userId]/[postIndex]/like/route.ts
export async function POST_LIKE(req: Request, { params }: { params: { userId: string; postIndex: string } }) {
  try {
    await connect();

    const { userId, postIndex } = params;
    const user = await User.findById<IUser>(userId);
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const index = parseInt(postIndex, 10);
    if (!user.posts[index]) return NextResponse.json({ error: "Post not found" }, { status: 404 });

    user.posts[index].likes += 1;
    await user.save();

    return NextResponse.json({
      _id: user._id,
      postIndex: index,
      likes: user.posts[index].likes,
    });
  } catch (err) {
    console.error("POST_LIKE /api/posts/:userId/:postIndex error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
