import GameReview  from '@/app/models/review';
import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/connect";

export async function GET(
  request: NextRequest,
  context: { params: { id?: string } }
) {
  await connect();
  console.log("context", context);
  const gameId = context.params?.id;
  if (!gameId) {
    return NextResponse.json({ error: "Missing game ID" }, { status: 400 });
  }
  const reviews = await GameReview.find({ gameId }).sort({ createdAt: -1 });
  return NextResponse.json(reviews);
}


export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connect();
  const gameId = params.id;
  const { rating, comment, userId, username } = await request.json();

  const review = await GameReview.create({
    gameId,
    rating,
    comment,
    userId,
    username,
    likes: [], // تأكد من تعيين القيمة  // تعيين مصفوفة فارغة للتفاعلات
  });

  return NextResponse.json(review, { status: 201 });
}
