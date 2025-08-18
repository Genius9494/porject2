import { NextResponse } from "next/server";

const RAWG_BASE = process.env.RAWG_API_URL || "https://api.rawg.io/api";
const RAWG_KEY = process.env.RAWG_API_KEY || "fcbd529a05684ba98365adaf247f7c68";


if (!RAWG_KEY) {
  console.warn("RAWG_API_KEY is not set.");
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "missing id" }, { status: 400 });
  }

  const url = `${RAWG_BASE}/games/${encodeURIComponent(id)}?key=${RAWG_KEY}`;

  try {
    const r = await fetch(url);
    if (!r.ok) {
      const text = await r.text();
      console.error("RAWG error:", r.status, text); 
      return NextResponse.json({ error: "upstream error" }, { status: r.status });
    }
    const data = await r.json();

    // return only fields we need
    const out = {
      id: data.id,
      name: data.name,
      background_image: data.background_image,
      playtime: data.playtime,           // avg hours
      added: data.added,                 // users who added (proxy للـ downloads/popularity)
      rating: data.rating,               // aggregate rating (0-5)
      ratings_count: data.ratings_count, // عدد التقييمات
      metacritic: data.metacritic,
      released: data.released,
    };

    return NextResponse.json(out);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || String(err) },
      { status: 500 }
    );
  }
}
