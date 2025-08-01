const APIURL = "https://api.rawg.io/api/";
const KEY = process.env.RAWG_API_KEY || "fcbd529a05684ba98365adaf247f7c68"; 

export const getGameDetails = async (slug: string) => {
  const res = await fetch(`${APIURL}games/${slug}?key=${KEY}`);
  if (!res.ok) {
    throw new Error("❌ Failed to fetch game details");
  }

  return await res.json(); // هذا يحتوي على كل شيء من وصف، مطورين، روابط، إلخ
};
