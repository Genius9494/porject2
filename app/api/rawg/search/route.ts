import { NextResponse } from "next/server";

const RAWG_BASE = "https://api.rawg.io/api" ;
const RAWG_KEY = process.env.RAWG_API_KEY || "fcbd529a05684ba98365adaf247f7c68"; 

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");

  if (!q) {
    return NextResponse.json({ error: "missing query" }, { status: 400 });
  }

  const url = `${RAWG_BASE}/games?key=${RAWG_KEY}&search=${encodeURIComponent(
    q
  )}&page_size=8`;

  try {
    const r = await fetch(url);
    if (!r.ok) {
      const text = await r.text();
      console.error("RAWG search error:", r.status, text);
      return NextResponse.json(
        { error: "upstream error", status: r.status, details: text },
        { status: r.status }
      );
    }

    const data = await r.json();

    const results = (data.results || []).map((g: any) => ({
      id: g.id,
      name: g.name,
      released: g.released,
      background_image: g.background_image,
      slug: g.slug,
      rating: g.rating,
      added: g.added,
      playtime: g.playtime,
      metacritic: g.metacritic,
      parent_platforms: g.parent_platforms,
      ratings_count: g.ratings_count,
      short_screenshots: g.short_screenshots,
    }));

    return NextResponse.json({ results });
  } catch (err: any) {
    console.error("Search API crashed:", err);
    return NextResponse.json(
      { error: err.message || String(err) },
      { status: 500 }
    );
  }
}
