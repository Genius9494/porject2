import { NextResponse } from "next/server";
import { searchGames } from "@/lib/raw";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    if (!message) {
      return NextResponse.json({ reply: "Please write something 🎮" }, { status: 400 });
    }

    const text = message.toLowerCase();
    let query = "";

    // استخراج الكلمات المفتاحية من الرسالة
    if (text.includes("like")) {
      query = text.split("like")[1]?.trim() || "";
    } else if (text.includes("game") || text.includes("games")) {
      const words = text.split(" ");
      const genre = words.find((w:any) => w.endsWith("games") || w.endsWith("game"));
      query = genre ? words[words.indexOf(genre) - 1] : "popular";
    } else {
      query = text;
    }

    // 🔍 استدعاء RAWG
    const games = await searchGames(query);

    if (!games || games.length === 0) {
      return NextResponse.json({ reply: `No games found for "${query}". Try another one.` });
    }

    const reply = `Here are some games related to "${query}": ${games
      .slice(0, 5)
      .map((g: any) => g.name)
      .join(", ")}`;

    return NextResponse.json({ reply, results: games });
  } catch (err) {
    console.error("Assistant API Error:", err);
    return NextResponse.json(
      { reply: "Sorry, something went wrong with the assistant 😢" },
      { status: 500 }
    );
  }
}
