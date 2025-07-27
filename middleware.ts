import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const url = req.nextUrl.clone();

  if (url.pathname.startsWith("/settings")) {
    if (!token) {
      url.pathname = "/Home";
      return NextResponse.redirect(url);
    }

    try {
      // تحضير المفتاح السري للتحقق من التوكن
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);

      // التحقق من التوكن
      const { payload } = await jwtVerify(token, secret);

      console.log("🧾 Payload from token:", payload);

      // التحقق من دور المستخدم
      if (payload.role !== "admin") {
        url.pathname = "/Home";
        return NextResponse.redirect(url);
      }
    } catch (error) {
      console.error("❌ JWT verification failed:", error);
      url.pathname = "/Home";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/settings"],
};
