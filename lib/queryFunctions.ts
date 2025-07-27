
"use client";

import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/app/actions/auth";
import { getGamesByIds, searchGames } from "@/app/api/api";

// 📌 Hook: الحصول على بيانات المستخدم
export const useGetUser = () => {
  const { data: user, isLoading, isError, error } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        return await getUser();
      } catch (err) {
        console.error("Error fetching user:", err);
        throw err;
      }
    },
  });

  return { user, isLoading, isError, error };
};

// 📌 Hook: الحصول على ألعاب عبر معرفات متعددة
export const useGetGamesWithIds = (ids: string[]) => {
  const query = useQuery({
    queryKey: [`games-${ids.join(",")}`],
    queryFn: async () => {
      try {
        const raw = await getGamesByIds(ids);
        return raw.map((item) => ({
          ...item.data,
          short_screenshots: item.screenshots,
        }));
      } catch (err) {
        console.error("Error fetching games by IDs:", err);
        throw err;
      }
    },
    enabled: ids.length > 0,
  });

  return {
    games: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch, // ✅ لإعادة التحميل يدويًا
  };
};

// 📌 Hook: البحث عن الألعاب أو عرض ألعاب عامة بفلترة اختيارية
export const useGetGames = ({
  query = "",
  page = 1,
  pageSize = 21,
  filters = [],
  isDisabled = false,
}: {
  query?: string;
  page?: number;
  pageSize?: number;
  filters?: { filterName: string; option: string }[] | any;
  isDisabled?: boolean;
}) => {
  const { data: games, isLoading, isError, error } = useQuery({
    queryKey: ["games", page, filters, query],
    queryFn: async () => {
      try {
        return await searchGames(query, page, filters, pageSize);
      } catch (err) {
        console.error("Error searching for games:", err);
        throw err;
      }
    },
    enabled: !isDisabled,
  });

  return { games, isLoading, isError, error };
};
