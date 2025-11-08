import { NextResponse } from "next/server";
import Post from "@/app/models/user";
import connect from "@/lib/connect";

export async function POST(_: Request, { params }: { params: { id: string } }) {
  await connect();

  const post = await Post.findById(params.id);
  if (!post) return NextResponse.json({ error: "Post not found" }, { status: 404 });

  post.likes += 1;
  await post.save();

  return NextResponse.json(post);
}
