// app/api/me/route.ts
import { NextResponse } from "next/server";
import { getUser } from "@/app/actions/auth";

export async function GET() {
  const user = await getUser();
  if (user.error) {
    return NextResponse.json({ error: user.error }, { status: 401 });
  }
  return NextResponse.json({ data: user.data });
}
