import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/connect";
import GameReview from "@/app/models/review";

export async function POST(
  req: NextRequest,
  context: {params: {id: string }}
  // { params }: { params: { id: string } }
) {
  await connect();

  const reviewId = context.params.id;
  const { userId, comment, username } = await req.json();

  if (!userId || !comment) {
    return NextResponse.json(
      { error: "userId and comment are required" },
      { status: 400 }
    );
  }

  const updatedReview = await GameReview.findByIdAndUpdate(
    reviewId,
    {
      $push: {
        replies: {
          userId,
          comment,
          username,
          createdAt: new Date(),
        },
      },
    },
    { new: true }
  );

  if (!updatedReview) {
    return NextResponse.json({ error: "Review not found" }, { status: 404 });
  }

  return NextResponse.json(updatedReview);
}
