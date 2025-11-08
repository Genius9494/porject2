import User from "@/app/models/user";
import { NextRequest, NextResponse } from "next/server";
import connect from "@/app/actions/connet";

export async function POST(req: NextRequest) {
  await connect();
  const { amount } = await req.json();
  const userId = "…"; // جلب الـ userId من session أو token

  const user = await User.findById(userId);
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  user.points = (user.points || 0) + amount;
  user.level = calculateLevel(user.points);
  await user.save();

  return NextResponse.json({ points: user.points, level: user.level });
}

function calculateLevel(points: number) {
  if (points < 100) return "LV-1";
  if (points < 500) return "GENIUS";
  if (points < 2000) return "LEGEND";
  return "LEGEND";
}
