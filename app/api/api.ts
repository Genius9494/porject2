const APIURL = "https://api.rawg.io/api/";
const KEY = "fcbd529a05684ba98365adaf247f7c68";

// دالة fetch موثوقة مع فحص للأخطاء

const fetchFn = async (url: string, cache?: number) => {
  const fetchOptions: RequestInit | any = {};

  // فقط أضف خيارات revalidate في بيئة الخادم
  if (typeof window === "undefined") {
    fetchOptions.next = { revalidate: cache || 3600 };
  }

  const res = await fetch(url, fetchOptions);

  if (!res.ok) {
    throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
  }

  return await res.json();
};


// بناءً على استعلام وكلمات مفتاحية
export const searchGames = async function (
  query?: string,
  page = 1,
  filters?: { filterName: string; option: string }[],
  page_size = 20,
  cache: number = 0
) {
  const filterParams = filters
    ?.map((filter) => `${filter.filterName}=${filter.option}`)
    .join("&") || "";

  const url = `${APIURL}games?search=${query}&page_size=${page_size}&page=${page}&${filterParams}&key=${KEY}`;
  const data = await fetchFn(url, cache);
  return { data, count: data.count };
};

// لعبة واحدة
export const getGame = async function (id: string) {
  try {
    const data = await fetchFn(`${APIURL}games/${id}?key=${KEY}`);
    const screenshots = await fetchFn(`${APIURL}games/${id}/screenshots?key=${KEY}`);
    const similar = await fetchFn(`${APIURL}games/${id}/game-series?key=${KEY}`);
    return { data, screenshots, similar };
  } catch (err) {
    throw err;
  }
};

// حسب النوع (genre)
export const getGameFromgenres = async function (genre = "51") {
  const data = await fetchFn(`${APIURL}games?genres=${genre}&page_size=15&key=${KEY}`);
  return data;
};

// حسب منصة معينة
export const gamebyplatforms = async function (id: string, page = 1, page_size = 20) {
  const data = await fetchFn(`${APIURL}games?platforms=${id}&page_size=${page_size}&page=${page}&key=${KEY}`);
  return data;
};

// متعددة باستخدام IDs
export const getGamesByIds = async function (ids: string[]) {
  const data = await Promise.all(ids.map((id) => getGame(id)));
  return data;
};










// import { APIURL, KEY } from "@/app/constants";
// const fetchFn = (url: string, cache?: number) =>
//   fetch(url, { next: { revalidate: cache || 3600 } }).then((res) => res.json());
// export const searchGames = async function (
//   query?: string,
//   page = 1,
//   filters?: { filterName: string; option: string }[],
//   page_size = 20,
//   cache: number = 0
// ) {
//   const data = await fetchFn(
//     `${APIURL}games?search=${query}&page_size=${page_size}&page=${page}&${filters
//       ?.map((filter: any) => `${filter.filterName}=${filter.option}&`)
//       .join("")}&key=${KEY}`,
//     cache
//   );
//   const count = data.count;

//   return { data, count };
// };
// export const getGame = async function (id: string) {
//   try {
//     const data = await fetchFn(`${APIURL}games/${id}?key=${KEY}`); //details
//     const screenshots = await fetchFn(`${APIURL}games/${id}/screenshots?&key=${KEY}`); //screenshots
//     const similar = await fetchFn(`${APIURL}games/${id}/game-series?key=${KEY}`); //simimlar
//     return { data, screenshots, similar };
//   } catch (err) {
//     throw err;
//   }
// };
// export const getGameFromgenres = async function (genre = "51") {
//   const data = await fetchFn(`${APIURL}games?genres=${genre}&page_size=15&key=${KEY}`);
//   return data;
// };
// export const gamebyplatforms = async function (id: string, page = 1, page_size = 20) {
//   const data = await fetchFn(`${APIURL}games?platforms=${id}&page_size=${page_size || 40}&page=${page}&key=${KEY}`);
//   return data;
// };
// export const getGamesByIds = async function (ids: string[]) {
//   const data = await Promise.all(ids.map((id) => getGame(id)));
//   return data;
// };
