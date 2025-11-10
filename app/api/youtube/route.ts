import { NextRequest } from "next/server";

const memoryCache = new Map<string, { videoId: string; expires: number }>();
const CACHE_TTL = 1000 * 60 * 60; // ساعة

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return new Response(JSON.stringify({ error: "Query is required" }), { status: 400 });
  }

  const cached = memoryCache.get(query);
  if (cached && cached.expires > Date.now()) {
    return new Response(JSON.stringify({ videoId: cached.videoId }), { status: 200 });
  }

  const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
  if (!YOUTUBE_API_KEY) {
    return new Response(JSON.stringify({ error: "Missing API key" }), { status: 500 });
  }

  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoEmbeddable=true&maxResults=1&q=${encodeURIComponent(
    query + " trailer"
  )}&key=${YOUTUBE_API_KEY}`;

  try {
    const response = await fetch(url, { next: { revalidate: 10 } }); // يمنع build من انتظار API
    const data = await response.json();

    const video = data.items?.find((item: any) => item.id.kind === "youtube#video");
    const videoId = video?.id?.videoId;

    if (!videoId) {
      return new Response(JSON.stringify({ error: "No valid video found" }), { status: 404 });
    }

    memoryCache.set(query, { videoId, expires: Date.now() + CACHE_TTL });

    return new Response(JSON.stringify({ videoId }), { status: 200 });
  } catch (error) {
    console.error("YouTube API Error:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch video" }), { status: 500 });
  }
}











// import { NextRequest } from 'next/server';

// const memoryCache = new Map<string, { videoId: string; expires: number }>();
// const CACHE_TTL = 1000 * 60 * 60; // ساعة

// export async function GET(req: NextRequest) {
//   const { searchParams } = new URL(req.url);
//   const query = searchParams.get('query');

//   if (!query) {
//     return new Response(JSON.stringify({ error: 'Query is required' }), { status: 400 });
//   }

//   const cached = memoryCache.get(query);
//   if (cached && cached.expires > Date.now()) {
//     return new Response(JSON.stringify({ videoId: cached.videoId }), { status: 200 });
//   }

//   const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
//   if (!YOUTUBE_API_KEY) {
//     return new Response(JSON.stringify({ error: 'Missing API key' }), { status: 500 });
//   }

//   const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoEmbeddable=true&maxResults=1&q=${encodeURIComponent(
//     query + ' trailer'
//   )}&key=${YOUTUBE_API_KEY}`;

//   try {
//     const response = await fetch(url);
//     const data = await response.json();

//     if (data.error?.errors?.[0]?.reason === 'quotaExceeded') {
//       console.warn("❌ YouTube quota exceeded");
//       return new Response(JSON.stringify({ error: 'YouTube quota exceeded' }), { status: 429 });
//     }

//     if (!data.items || !Array.isArray(data.items)) {
//       console.error("❌ Unexpected YouTube response:", data);
//       return new Response(JSON.stringify({ error: 'Invalid response from YouTube API' }), { status: 500 });
//     }

//     const video = data.items.find((item: any) => item.id.kind === 'youtube#video');
//     const videoId = video?.id?.videoId;

//     if (!videoId) {
//       return new Response(JSON.stringify({ error: 'No valid video found' }), { status: 404 });
//     }

//     memoryCache.set(query, { videoId, expires: Date.now() + CACHE_TTL });

//     return new Response(JSON.stringify({ videoId }), { status: 200 });
//   } catch (error) {
//     console.error("YouTube API Error:", error);
//     return new Response(JSON.stringify({ error: 'Failed to fetch video' }), { status: 500 });
//   }
// }
