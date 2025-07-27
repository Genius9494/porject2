import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

type DecodedUser = {
  id: string;
  email: string;
  role: "admin" | "user";
};

export async function getUserFromRequest(): Promise<DecodedUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedUser;
    return decoded;
  } catch (err) {
    return null;
  }
}
