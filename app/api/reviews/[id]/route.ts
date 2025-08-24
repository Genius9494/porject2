import GameReview from '@/app/models/review';
import User from '@/app/models/user';
import { NextRequest, NextResponse } from "next/server";
import connect from "@/lib/connect";

export async function GET(
  request: NextRequest,
  context: { params: { id?: string } }
) {
  await connect();
  const gameId = context.params?.id;
  if (!gameId) {
    return NextResponse.json({ error: "Missing game ID" }, { status: 400 });
  }
  try {
    const reviews = await GameReview.find({ gameId }).sort({ createdAt: -1 });
    return NextResponse.json(reviews, { status: 200 });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connect();
  const gameId = params.id;
  const { rating, comment, userId, username } = await request.json();

  if (!userId || !comment || !rating) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    // ✅ إنشاء التعليق
    const review = await GameReview.create({
      gameId,
      rating,
      comment,
      userId,
      username,
      likes: [],
      replies: [],
    });

    // ✅ تحديث نقاط المستخدم
    const updatedUser = await User.findById(userId);
    if (updatedUser) {
      updatedUser.points = (updatedUser.points || 0) + 5; // زيادة 5 نقاط
      updatedUser.level = calculateLevel(updatedUser.points);
      await updatedUser.save();
    }

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error("Error adding review:", error);
    return NextResponse.json({ error: "Failed to add review" }, { status: 500 });
  }
}

// ✅ دالة حساب المستوى
function calculateLevel(points: number) {
  if (points < 100) return "LV-1";
  if (points < 500) return "GENIUS";
  if (points < 2000) return "LEGEND";
  return " LEGENG ";
}
