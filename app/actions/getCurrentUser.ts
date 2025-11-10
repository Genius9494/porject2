"use server";

import { protect } from "./auth"; 
import User from "@/app/models/user";
import connect from "@/lib/connect";

/**
 * ✅ getCurrentUser: ترجع المستخدم الحالي اعتمادًا على التوكن في الكوكي
 */
export async function getCurrentUser() {
  try {
    await connect();

    const { decode, error } = await protect();
    if (error || !decode?.id) return null;

    const user = await User.findById(decode.id);
    if (!user) return null;

    return user;
  } catch (err) {
    console.error("getCurrentUser error:", err);
    return null;
  }
}
