"use client";

import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { FaPlaystation, FaXbox, FaSteam } from "react-icons/fa";
import ImageSwitcher from "./ImageSwitcher";
import AddToWishList from "./AddToWishList";
import { Game, normalizeGame } from "@/types";
import { useState } from "react";
import toast from "react-hot-toast";

type GameCardProps = {
  game: Game;
  images?: { image: string }[];
  wishlist?: boolean;
  screenBig?: boolean;
  image?: string;
};

const renderStars = (rating: number) => {
  const fullStars = Math.floor(rating);
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <span key={i} className="text-yellow-400 text-sm">
        {i < fullStars ? "★" : "☆"}
      </span>
    );
  }
  return stars;
};

const BuyButtonForFreeGames = ({ game: rawGame, images, wishlist = false, image }: GameCardProps) => { 
  const game = normalizeGame({ ...rawGame, price: 0 });
  if (!game) return null;


  const reviews = React.useMemo(() => {
    const min = 100000;
    const max = 700000;
    return +(Math.random() * (max - min) + min).toFixed(0);
  }, []);
  const play = React.useMemo(() => {
    const min = 100000;
    const max = 700000;
    return +(Math.random() * (max - min) + min).toFixed(0);
  }, []);



  const {
    background_image,
    name,
    id,
    parent_platforms = [],
    rating = 0,
    released = "Unknown",
    playtime= 0,
  } = game;
  const main = background_image || images?.[0]?.image;

  const platforms = parent_platforms?.map((p) => p.platform.slug);



  const [videoId, setVideoId] = useState<string | null>(null);
  //youtube api key
    React.useEffect(() => {
      const fetchVideo = async () => {
        try {
          
          const cleanName = game.name.replace(/[:\d]+$/, '').trim();
  
          const res = await fetch(`/api/youtube?query=${encodeURIComponent(cleanName)}`);
          const data = await res.json();
          console.log("Video Data:", data);
          setVideoId(data.videoId);
        } catch (error) {
          console.error("Failed to fetch video", error);
        }
      };
  
      fetchVideo();
    }, [game.name]);
    //youtube api key//

    


  return (
    <HoverCard>
      <div className="flex relative flex-col items-start gap-4">
        <HoverCardTrigger className="relative cursor-pointer w-full" asChild>
          <div>
            <div className="relative flex flex-col gap-2">
              {wishlist && (
                <div className="absolute left-2 top-2 z-10">
                  <AddToWishList plus gameId={id.toString()} />
                </div>
              )}

              <div className="hover:opacity-80 hover:scale-105 hover:rotate-3 duration-150 w-full overflow-hidden h-64 relative rounded-xl mt-2">
                {main ? (
                  <>
                    <Image
                      className="object-cover "
                      src={main}
                      alt={name}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {game.price == 0 && image && (
                      <div className="absolute bottom-1 left-0 z-20 w-14 h-14">
                        <Image
                          src={image}
                          alt="free"
                          fill
                          className="object-contain"
                          priority
                          sizes="(max-width: 100px) 50%vw, 50vh"

                        />
                      </div>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full bg-gray-500 flex items-center justify-center text-white text-xs">
                    No Image Available
                  </div>
                )}

              </div>
              <div id="famous" className="pb-4 rounded-xl p-2 space-y-2">
                <Link href={`/game/${game.id}`} className="text-sm line-clamp-1 font-semibold text-white">
                  {name}
                </Link>


                <Link href={`/video?game=${encodeURIComponent(game.name)}`}>
                          <div className="bg-orange-500 w-52 mt-2 text-sm rounded-xl items-center justify-center flex animate-pulse duration-700 ">
                            <button> watch the presentation now</button>
                          </div>
                          </Link>


                <div className="flex items-center gap-1 ">
                  {renderStars(rating)}
                  <span className="text-xs text-gray-300 ml-1">{rating.toFixed(1) || "N/A"}</span>
                </div>

                <p className="text-xs text-gray-300">
                  Released: <span className="font-medium">{released}</span>
                </p>

                <p className="text-xs text-gray-300">
                  playtime: <span className="font-medium text-yellow-500">{play}</span>
                </p>
                <p className="text-xs text-gray-300">
                  Download Times: <span className="font-medium text-yellow-500">{reviews}</span>
                </p>

                
                <button
                  onClick={() =>
                    toast.success(`The free game "${name}" has been added to your wishes`, {
                      style: {
                        background: "rgba(0, 0, 0, 1)",
                        color: "green",
                        fontWeight: "bold",
                        fontSize: "16px",
                        borderRadius: "10px",
                      },
                    })
                  }
                  className="p-1.5 mt-7 w-full text-white bg-fuchsia-700 hover:bg-green-600 rounded-xl transition animate-pulse skew-x-6"
                >
                  Download it for Free
                </button>
              </div>
              <div className="mt-2 flex items-center gap-1">
                {platforms?.map((slug, i) => {
                  if (slug === "pc") return <FaSteam key={i} title="PC" />;
                  if (slug.includes("playstation")) return <FaPlaystation key={i} className="text-blue-500" title="PlayStation" />;
                  if (slug.includes("xbox")) return <FaXbox key={i} className="text-green-500" title="Xbox" />;
                  return null;
                })}
              </div>
            </div>
          </div>
        </HoverCardTrigger>

        <HoverCardContent align="center" className="w-full bg-transparent border-none">
          {images && images.length > 0 && <ImageSwitcher game={game} images={images} />}
        </HoverCardContent>
      </div>
    </HoverCard>
  );
};

export default BuyButtonForFreeGames;
