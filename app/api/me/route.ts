import { getUser } from "@/app/actions/auth";

export async function GET() {
  const result = await getUser();

  if (result.error) {
    return Response.json({ error: result.error }, { status: 401 });
  }

  return Response.json({ data: result.data }, { status: 200 });
}
