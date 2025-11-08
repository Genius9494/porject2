const APIURL = "https://api.rawg.io/api/";
const KEY = process.env.RAWG_API_KEY || "fcbd529a05684ba98365adaf247f7c68";

/**
 * 🔍 البحث عن ألعاب حسب الاسم أو التصنيف
 */
export const searchGames = async (query: string) => {
  if (!query.trim()) return [];

  const url = `${APIURL}games?key=${KEY}&search=${encodeURIComponent(query)}&page_size=6`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      console.error("RAWG search error:", res.status);
      return [];
    }

    const data = await res.json();
    return data.results || [];
  } catch (err) {
    console.error("RAWG fetch failed:", err);
    return [];
  }
};

/**
 * 🕹️ جلب تفاصيل لعبة معينة عبر slug
 */
export const getGameDetails = async (slug: string) => {
  const res = await fetch(`${APIURL}games/${slug}?key=${KEY}`);
  if (!res.ok) {
    throw new Error("❌ Failed to fetch game details");
  }

  const data = await res.json();
  return data;
};













// const APIURL = "https://api.rawg.io/api/";
// const KEY = process.env.RAWG_API_KEY || "fcbd529a05684ba98365adaf247f7c68"; 

// export const getGameDetails = async (slug: string) => {
//   const res = await fetch(`${APIURL}games/${slug}?key=${KEY}`);
//   if (!res.ok) {
//     throw new Error("❌ Failed to fetch game details");
//   }

//   return await res.json(); // هذا يحتوي على كل شيء من وصف، مطورين، روابط، إلخ
// };
