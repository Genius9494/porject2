"use client";


import axios from "axios";
import { Game, normalizeGame } from "@/types";
import GridContainer from "@/app/components/defaults/GridContainer";
import GameCard from "@/app/components/GameCard";
import { FaGamepad } from "react-icons/fa";
import React, { useState, useEffect } from "react";
//<icon>
import { GiTrophyCup } from "react-icons/gi";
//</icon>//
const ratings = [
  { name: "Best Game of the Year", key: "best" },
  { name: "Top 250 Games", key: "top250" },
  { name: "Most Popular in 2025", key: "popular2025" },
];

const RatingsGamesPage = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [selectedRating, setSelectedRating] = useState<string>("best");

  useEffect(() => {
    const fetchGames = async () => {
      const params: any = {
        key: "fcbd529a05684ba98365adaf247f7c68", 
        page_size: 100,
      };

      if (selectedRating === "best") {
        params.dates = "2025-01-01,2025-12-31";
        params.ordering = "-rating";
      } else if (selectedRating === "top250") {
        params.ordering = "-rating";
      } else if (selectedRating === "popular2025") {
        params.dates = "2025-01-01,2025-12-31";
        params.ordering = "-added";
      }

      try {
        const res = await axios.get("https://api.rawg.io/api/games", { params });
        setGames(res.data.results.map(normalizeGame));
      } catch (err) {
        console.error("Error fetching games:", err);
      }
    };
    
    
    fetchGames();
  }, [selectedRating]);   //استدعاء الدالة عند تحميل الصفحة أو تغيير التصنيف.
  

  return (
    <div id="ratings" className="p-6 min-h-screen text-white mt-5 rounded-2xl">
      {/* Dropdown + Label + Icon */}
      <div className="mb-8 flex items-center gap-4 ">
        
        <select id="select"
          className="!bg-pink-500 text-white border rounded-xl px-4 py-2 cursor-pointer"
          value={selectedRating}
          onChange={(e) => setSelectedRating(e.target.value)}
        >
          {ratings.map((cat) => (
            <option key={cat.key} value={cat.key}>
              {cat.name}
            </option>
          ))}
        </select>
        <label id="direction" className="flex items-center text-lg font-semibold text-yellow-400">
          <FaGamepad className="mr-2 text-xl" />
          Choos a Rating :
        </label>
      </div>

      {/* Games Grid */}
      <GridContainer cols={3} className="gap-6 mt-28"> 
        {games.map((game) => (
          <GameCard key={game.id} game={game} screenBig={false} wishlist />
        ))}
      </GridContainer>
    </div>
  );
};

export default RatingsGamesPage;
