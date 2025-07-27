"use client";

import React from "react";
import { useState, useEffect } from "react";
import Empty from "@/app/components/defaults/Empty";
import GridContainer from "@/app/components/defaults/GridContainer";
import GameCard from "@/app/components/GameCard";
import GameSkeleton from "@/app/components/GameSkeleton";
import Heading from "@/app/components/Heading";
import { useWishlist } from "@/app/context/wishlistContext";
import { useGetGamesWithIds } from "@/lib/queryFunctions";
import BuyButtonForFreeGames from "@/app/components/BuyBottonForFreeGames";
import { clear } from "console";
import { Skeleton } from "@mui/material";

const Page = () => {
  const { wishlist } = useWishlist();
  const { games, isLoading } = useGetGamesWithIds(wishlist);

  const removeWishes = () => {

    localStorage.removeItem("wishlist");
    window.location.reload();

  }

  useEffect(() => {
    console.log("Updated wishlist:", wishlist);
  }, [wishlist]);

  return (
    <div id="distinct" className="mt-10 p-4 flex flex-col gap-4 rounded-2xl">
      <Heading text="My Wishes 💛" className="m-10" />
      <GridContainer className="gap-4" cols={3}>
        {isLoading ? (
          <GameSkeleton />
        ) : games.length > 0 ? (
          games.map((game: any, i: number) => (

            <GameCard
              key={i}
              wishlist={true}
              game={game}
              images={game.short_screenshots || []}
            />
          )
          )
        ) : (
          <Empty
            message="You have not added anything to your wishes yet!"
            link="/games"
            linkText="Browse More Games"
          />
        )}
      </GridContainer>
      <div className="flex items-center justify-center">
        <button onClick={removeWishes} className="bg-red-500 w-40 rounded-2xl h-9 ">
          clear wishes
        </button>
      </div>
    </div>
  );
};

export default Page;
