"use client";

import React from "react";
import { Game, normalizeGame } from "@/types";
import GridContainer from "../../components/defaults/GridContainer";
import BuyButtonForFreeGames from "@/app/components/BuyBottonForFreeGames";


const freeGame: Partial<Game>[] = [
  {
    id: 987515,
    name: "mafia-the-old-country",
    background_image: "mafia.jpg",
    rating: 4.8,
    released: "2015-05-18",
    parent_platforms: [
      { platform: { slug: "pc", id: 1, name: "PC" } },
      { platform: { slug: "playstation", id: 2, name: "PlayStation" } },
      { platform: { slug: "xbox", id: 3, name: "Xbox" } },
    ],

  },
  {
    id: 997553,
    name: "Minds-Eye",
    background_image: "minds.jpg",
    rating: 4.7,
    released: "2018-10-26",
    parent_platforms: [
      { platform: { slug: "pc", id: 1, name: "PC" } },
      { platform: { slug: "playstation", id: 2, name: "PlayStation" } },
      { platform: { slug: "xbox", id: 3, name: "Xbox" } },
    ],

  },
  {
    id: 989329,
    name: "Ghost of Yotei",
    background_image: "ghost.jpg",
    rating: 4.6,
    released: "2013-09-17",
    parent_platforms: [
      { platform: { slug: "pc", id: 1, name: "PC" } },
      { platform: { slug: "playstation", id: 2, name: "PlayStation" } },
      { platform: { slug: "xbox", id: 3, name: "Xbox" } },
    ],

  },
  {
    id: 395192,
    name: "Lost Soul Aside",
    background_image: "lost.jpg",
    rating: 4.0,
    released: "2013-09-17",
    parent_platforms: [
      { platform: { slug: "pc", id: 1, name: "PC" } },
      { platform: { slug: "playstation", id: 2, name: "PlayStation" } },
      { platform: { slug: "xbox", id: 3, name: "Xbox" } },
    ],

  },
  {
    id: 1004511,
    name: "Resident Evil 9: Requiem",
    background_image: "resident.jpg",
    rating: 4.1,
    released: "2013-09-17",
    parent_platforms: [
      { platform: { slug: "pc", id: 1, name: "PC" } },
      { platform: { slug: "playstation", id: 2, name: "PlayStation" } },
      { platform: { slug: "xbox", id: 3, name: "Xbox" } },
    ],

  },
  {
    id: 19409,
    name: "Operation Flashpoint: Dragon Rising",
    background_image: "operation.jpg",
    rating: 4.2,
    released: "2013-09-17",
    parent_platforms: [
      { platform: { slug: "pc", id: 1, name: "PC" } },
      { platform: { slug: "playstation", id: 2, name: "PlayStation" } },
      { platform: { slug: "xbox", id: 3, name: "Xbox" } },
    ],

  },
  {
    id: 782261,
    name: "Hell is Us",
    background_image: "hell.jpg",
    rating: 4.3,
    released: "2013-09-17",
    parent_platforms: [
      { platform: { slug: "pc", id: 1, name: "PC" } },
      { platform: { slug: "playstation", id: 2, name: "PlayStation" } },
      { platform: { slug: "xbox", id: 3, name: "Xbox" } },
    ],

  },
  {
    id: 980464,
    name: "Stygian: Outer Gods",
    background_image: "stygian.jpg",
    rating: 4.2,
    released: "2013-09-17",
    parent_platforms: [
      { platform: { slug: "pc", id: 1, name: "PC" } },
      { platform: { slug: "playstation", id: 2, name: "PlayStation" } },
      { platform: { slug: "xbox", id: 3, name: "Xbox" } },
    ],

  },
  {
    id: 1001848,
    name: "FBC: Firebreak",
    background_image: "fbc.jpg",
    rating: 4.1,
    released: "2013-09-17",
    parent_platforms: [
      { platform: { slug: "pc", id: 1, name: "PC" } },
      { platform: { slug: "playstation", id: 2, name: "PlayStation" } },
      { platform: { slug: "xbox", id: 3, name: "Xbox" } },
    ],

  },
  {
    id: 998286,
    name: "Game of Thrones",
    background_image: "gameof.jpg",
    rating: 4.0,
    released: "2013-09-17",
    parent_platforms: [
      { platform: { slug: "pc", id: 1, name: "PC" } },
      { platform: { slug: "playstation", id: 2, name: "PlayStation" } },
      { platform: { slug: "xbox", id: 3, name: "Xbox" } },
    ],

  },
  {
    id: 476120,
    name: "AI Limit",
    background_image: "allimit.jpg",
    rating: 3.4,
    released: "2013-09-17",
    parent_platforms: [
      { platform: { slug: "pc", id: 1, name: "PC" } },
      { platform: { slug: "playstation", id: 2, name: "PlayStation" } },
      { platform: { slug: "xbox", id: 3, name: "Xbox" } },
    ],

  },
  {
    id: 1000582,
    name: "Donkey Kong Bananza",
    background_image: "kong.jpg",
    rating: 3.0,
    released: "2013-09-17",
    parent_platforms: [
      { platform: { slug: "pc", id: 1, name: "PC" } },
      { platform: { slug: "playstation", id: 2, name: "PlayStation" } },
      { platform: { slug: "xbox", id: 3, name: "Xbox" } },
    ],

  },
  {
    id: 1002396,
    name: "Deadzone: Rogue",
    background_image: "deadzone.jpg",
    rating: 3.9,
    released: "2013-09-17",
    parent_platforms: [
      { platform: { slug: "pc", id: 1, name: "PC" } },
      { platform: { slug: "playstation", id: 2, name: "PlayStation" } },
      { platform: { slug: "xbox", id: 3, name: "Xbox" } },
    ],

  },
];

const freeGames = () => {
  return (
    <section id="famous" className="p-6 mt-5 rounded-2xl">
      <h1 className="text-3xl font-bold mb-4 text-yellow-400 animate-pulse ">🔥 Free Games</h1>
      <GridContainer cols={4} className="gap-4">
        {freeGame.map((data) => {
          const game: Game = normalizeGame(data);
          return <BuyButtonForFreeGames
            image="/free.png"
            key={game.id}
            game={game}
            screenBig={false}
            wishlist />


        })}
      </GridContainer>
    </section>
  );
};

export default freeGames;