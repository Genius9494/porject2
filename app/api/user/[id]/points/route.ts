import User from '@/app/models/user';
import { NextRequest, NextResponse } from 'next/server';
import connect from '@/lib/connect';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await connect();
  const userId = params.id;

  try {
    const user = await User.findById(userId).select('points level');
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    return NextResponse.json({ points: user.points || 0, level: user.level || 'LV-1' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch user points' }, { status: 500 });
  }
}
