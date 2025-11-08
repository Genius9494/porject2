import { NextResponse } from "next/server";
import connect from "@/lib/connect";
import User from "@/app/models/user";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  await connect();

  const userId = params.id;
  if (!userId) return NextResponse.json({ error: "Missing user ID" }, { status: 400 });

  const { delta, giftId } = await req.json();
  if (!giftId) return NextResponse.json({ error: "Missing gift ID" }, { status: 400 });
  if (typeof delta !== "number") return NextResponse.json({ error: "Invalid delta" }, { status: 400 });

  try {
    const user = await User.findById(userId);
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    // ✅ تحقق إذا كان المستخدم قد حصل على البطاقة مسبقًا
    if (user.collectedGifts && user.collectedGifts.includes(giftId)) {
  return NextResponse.json({ error: "Gift already collected" }, { status: 400 });
}

if (!user.collectedGifts) {  //تهيئة collectedGifts إذا كانت غير موجودة
  user.collectedGifts = [];
}


    // ✅ تحقق إذا كان لديه نقاط كافية للتحصيل
    if (delta < 0 && user.points < Math.abs(delta)) {
      return NextResponse.json({ error: "Not enough points" }, { status: 400 });
    }

    // ✅ تحديث النقاط وإضافة الهدية
user.points = (user.points ?? 0) + Number(delta);
    user.level = calculateLevel(user.points);
    user.collectedGifts.push(giftId);

    await user.save();

    return NextResponse.json(
      { points: user.points, level: user.level, collectedGifts: user.collectedGifts },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating points:", error);
    return NextResponse.json({ error: "Failed to update points" }, { status: 500 });
  }
}

function calculateLevel(points: number) {
  if (points < 100) return "LV-1";
  if (points < 500) return "GENIUS";
  if (points < 2000) return "LEGEND";
  return "MASTER";
}
