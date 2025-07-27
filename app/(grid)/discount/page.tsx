"use client";

import React from "react";
import { Game, normalizeGame } from "@/types";
import GridContainer from "../../components/defaults/GridContainer";
import GameCard from "../../components/GameCard";


const Discount: Partial<Game>[] = [
  //new games
  {
    id: 356714,
    name: "Among Us",
    background_image: "amongus.jpg",
    rating: 4.5,
    released: "2024-10-10",
    playtime: 10000,
    parent_platforms: [
      { platform: { slug: "pc", id: 1, name: "PC" } },
      { platform: { slug: "playstation", id: 2, name: "PlayStation" } },
      { platform: { slug: "xbox", id: 3, name: "Xbox" } },
    ],
    
  },
  {
    id: 108,
    name: "Mortal Kombat X",
    background_image: "kombat.jpg",
    rating: 4.1,
    released: "2024-11-15",
    parent_platforms: [
      { platform: { slug: "pc", id: 1, name: "PC" } },
      { platform: { slug: "playstation", id: 2, name: "PlayStation" } },
      { platform: { slug: "xbox", id: 3, name: "Xbox" } },
    ],
  },
  {
    id: 17572,
    name: "Batman: Arkham Asylum Game of the Year Edition",
    background_image: "batman2.jpg",
    rating: 4.3,
    released: "2025-03-01",
    parent_platforms: [
      { platform: { slug: "pc", id: 1, name: "PC" } },
      { platform: { slug: "playstation", id: 2, name: "PlayStation" } },
      { platform: { slug: "xbox", id: 3, name: "Xbox" } },
    ],
  },
  {
    id: 10533,
    name: "Path of Exile",
    background_image: "path.jpg",
    rating: 3.9,
    released: "2024-06-21",
    parent_platforms: [
      { platform: { slug: "pc", id: 1, name: "PC" } },
      { platform: { slug: "playstation", id: 2, name: "PlayStation" } },
      { platform: { slug: "xbox", id: 3, name: "Xbox" } },
    ],
  },
  {
    id: 19487,
    name: "Alan Wake",
    background_image: "alan.jpg",
    rating: 3.7,
    released: "2024-08-20",
    parent_platforms: [
      { platform: { slug: "pc", id: 1, name: "PC" } },
      { platform: { slug: "playstation", id: 2, name: "PlayStation" } },
      { platform: { slug: "xbox", id: 3, name: "Xbox" } },
    ],
  },
  {
    id: 3696,
    name: "Wolfenstein: The New Order",
    background_image: "wolf.jpg",
    rating: 3.4,
    released: "2024-04-26",
    parent_platforms: [
      { platform: { slug: "playstation", id: 2, name: "PlayStation" } },
      
    ],
  },
  {
    id: 3144,
    name: "Super Meat Boy",
    background_image: "super.jpg",
    rating: 4.2,
    released: "2024-05-21",
    parent_platforms: [
      { platform: { slug: "xbox", id: 3, name: "Xbox" } },
      { platform: { slug: "pc", id: 1, name: "PC" } },
    ],
  },
  
  
  {
    id: 1416,
    name: "Mafia II",
    background_image: "mafia2.jpg",
    rating: 4.1,
    released: "2024-03-22",
    parent_platforms: [
      { platform: { slug: "pc", id: 1, name: "PC" } },
      { platform: { slug: "playstation", id: 2, name: "PlayStation" } },
      { platform: { slug: "xbox", id: 3, name: "Xbox" } },
    ],
  },
  {
    id: 4248,
    name: "Dishonored",
    background_image: "dishonored.jpg",
    rating: 4.6,
    released: "2024-05-06",
    parent_platforms: [
      { platform: { slug: "pc", id: 1, name: "PC" } },
    ],
  },
  {
    id: 16944,
    name: "The Witcher 2: Assassins of Kings Enhanced Edition",
    background_image: "witcher.jpg",
    rating: 4.5,
    released: "2024-07-25",
    parent_platforms: [
      { platform: { slug: "pc", id: 1, name: "PC" } },
      { platform: { slug: "xbox", id: 3, name: "Xbox" } },
      { platform: { slug: "playstation", id: 2, name: "PlayStation" } },
      { platform: { slug: "nintendo", id: 7, name: "Nintendo" } },
    ],
  },
  
  ////////////////////////////////
  {
    id: 332,
    name: "Limbo",
    background_image: "limbo.jpg",
    rating: 4.2,
    released: "2010-07-21",
    parent_platforms: [
      { platform: { slug: "pc", id: 1, name: "PC" } },
      { platform: { slug: "xbox", id: 3, name: "Xbox" } },
      { platform: { slug: "playstation", id: 2, name: "PlayStation" } },
    ],
  },
  {
    id: 10035,
    name: "Half-Life",
    background_image: "halflife.jpg",
    rating: 4.7,
    released: "1998-11-19",
    parent_platforms: [
      { platform: { slug: "pc", id: 1, name: "PC" } },
    ],
  },
  ///////////////////////
  {
    id: 17576,
    name: "Batman: Arkham City",
    background_image: "batman.jpg",
    rating: 4.2,
    released: "2013-09-17",
    parent_platforms: [
      { platform: { slug: "pc", id: 1, name: "PC" } },
      { platform: { slug: "playstation", id: 2, name: "PlayStation" } },
      { platform: { slug: "xbox", id: 3, name: "Xbox" } },
    ],

  },
  {
    id: 10142,
    name: "PlayerUnknown’s Battlegrounds",
    background_image: "pubgmobile.jpg",
    rating: 4.0,
    released: "2013-09-17",
    parent_platforms: [
      { platform: { slug: "pc", id: 1, name: "PC" } },
      { platform: { slug: "playstation", id: 2, name: "PlayStation" } },
      { platform: { slug: "xbox", id: 3, name: "Xbox" } },
    ],

  },
  {
    id: 2597,
    name: "LEGO The Lord of the Rings",
    background_image: "lego.jpg",
    rating: 4.1,
    released: "2013-09-17",
    parent_platforms: [
      { platform: { slug: "pc", id: 1, name: "PC" } },
      { platform: { slug: "playstation", id: 2, name: "PlayStation" } },
      { platform: { slug: "xbox", id: 3, name: "Xbox" } },
    ],

  },

  {
    id: 3328,
    name: "The Witcher 3: Wild Hunt",
    background_image: "thewitcher.jpg",
    rating: 4.8,
    released: "2015-05-18",
    parent_platforms: [
      { platform: { slug: "pc", id: 1, name: "PC" } },
      { platform: { slug: "playstation", id: 2, name: "PlayStation" } },
      { platform: { slug: "xbox", id: 3, name: "Xbox" } },
    ],

  },
  {
    id: 5286,
    name: "Tomb Raider",
    background_image: "tombrider.jpg",
    rating: 4.7,
    released: "2018-10-26",
    parent_platforms: [
      { platform: { slug: "pc", id: 1, name: "PC" } },
      { platform: { slug: "playstation", id: 2, name: "PlayStation" } },
      { platform: { slug: "xbox", id: 3, name: "Xbox" } },
    ],

  },
  {
    id: 3498,
    name: "Grand Theft Auto V",
    background_image: "grand.jpg",
    rating: 4.6,
    released: "2013-09-17",
    parent_platforms: [
      { platform: { slug: "pc", id: 1, name: "PC" } },
      { platform: { slug: "playstation", id: 2, name: "PlayStation" } },
      { platform: { slug: "xbox", id: 3, name: "Xbox" } },
    ],

  },

  {
    id: 11934,
    name: "Counter-Strike: Source",
    background_image: "counterstrike.jpg",
    rating: 4.3,
    released: "2013-09-17",
    parent_platforms: [
      { platform: { slug: "pc", id: 1, name: "PC" } },
      { platform: { slug: "playstation", id: 2, name: "PlayStation" } },
      { platform: { slug: "xbox", id: 3, name: "Xbox" } },
    ],

  },
  {
    id: 3272,
    name: "Rocket League",
    background_image: "rocket.jpg",
    rating: 4.2,
    released: "2013-09-17",
    parent_platforms: [
      { platform: { slug: "pc", id: 1, name: "PC" } },
      { platform: { slug: "playstation", id: 2, name: "PlayStation" } },
      { platform: { slug: "xbox", id: 3, name: "Xbox" } },
    ],

  },
  {
    id: 58134,
    name: "Marvel's Spider-Man",
    background_image: "spiderman.jpeg",
    rating: 4.1,
    released: "2013-09-17",
    parent_platforms: [
      { platform: { slug: "pc", id: 1, name: "PC" } },
      { platform: { slug: "playstation", id: 2, name: "PlayStation" } },
      { platform: { slug: "xbox", id: 3, name: "Xbox" } },
    ],

  },
  {
    id: 23702,
    name: "Need for Speed Payback",
    background_image: "/needforspeed.png",
    rating: 4.0,
    released: "2013-09-17",
    parent_platforms: [
      { platform: { slug: "pc", id: 1, name: "PC" } },
      { platform: { slug: "playstation", id: 2, name: "PlayStation" } },
      { platform: { slug: "xbox", id: 3, name: "Xbox" } },
    ],

  },
  {
    id: 10243,
    name: "Company of Heroes 2",
    background_image: "company.jpg",
    rating: 3.4,
    released: "2013-09-17",
    parent_platforms: [
      { platform: { slug: "pc", id: 1, name: "PC" } },
      { platform: { slug: "playstation", id: 2, name: "PlayStation" } },
      { platform: { slug: "xbox", id: 3, name: "Xbox" } },
    ],

  },


];

const DiscountGames = () => {
  return (
    <section id="famous" className="p-6 mt-5 rounded-2xl">
      <h1 className="text-3xl font-bold mb-4 text-yellow-400 animate-pulse  ">🔥 Descount Section</h1>
      <GridContainer cols={3} className="gap-4">
        {Discount.map((data) => {
          const game: Game = normalizeGame(data);
          return <GameCard
            key={game.id}
            game={game}
            screenBig={false}
            wishlist
            image="/discount20.png"
            discountPercent={20}
            discountEndTime="2025-11-17T23:59:00Z"
          />;

        })}
      </GridContainer>
    </section>
  );
};

export default DiscountGames;


