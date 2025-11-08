import GameReview from '@/app/models/review';
import User from '@/app/models/user';
import { NextResponse } from 'next/server';
import connect from '@/lib/connect';

export async function GET(
  req: Request,
  context: { params: { id: string } } | Promise<{ params: { id: string } }>
) {
  await connect();

  // ✅ حل نهائي: دعم الحالتين (sync / async)
  const resolved = await context;
  const gameId = resolved.params.id;

  if (!gameId) {
    return NextResponse.json({ error: 'Missing game ID' }, { status: 400 });
  }

  try {
    const reviews = await GameReview.find({ gameId }).sort({ createdAt: -1 });
    return NextResponse.json(reviews);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

export async function POST(
  req: Request,
  context: { params: { id: string } } | Promise<{ params: { id: string } }>
) {
  await connect();

  // ✅ نفس الشيء هنا
  const resolved = await context;
  const gameId = resolved.params.id;

  if (!gameId)
    return NextResponse.json({ error: 'Missing game ID' }, { status: 400 });

  const { rating, comment, userId, username } = await req.json();
  if (!userId || !comment || !rating) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  try {
    const review = await GameReview.create({
      gameId,
      rating,
      comment,
      userId,
      username,
      likes: [],
      replies: [],
    });

    const user = await User.findById(userId);
    if (user) {
      user.points = (user.points || 0) + 10;
      user.level = calculateLevel(user.points);
      await user.save();
    }

    return NextResponse.json(
      { review, points: user?.points, level: user?.level },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding review:', error);
    return NextResponse.json({ error: 'Failed to add review' }, { status: 500 });
  }
}

function calculateLevel(points: number) {
  if (points < 100) return 'LV-1';
  if (points < 500) return 'GENIUS';
  if (points < 2000) return 'LEGEND';
  return 'MASTER';
}
