"use server";

import { getUser } from "./auth";

/**
 * ✅ دالة ترجع المستخدم الحالي لاستخدامها في الواجهة (Client)
 */
export async function getCurrentUserClient() {
  const { data, error } = await getUser();

  if (error || !data) return null;

  return {
    id: data._id,
    name: data.name,
    email: data.email,
    role: data.role,
  };
}
