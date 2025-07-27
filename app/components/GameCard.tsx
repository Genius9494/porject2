import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
import Image from "next/image";
import Link from "next/link";
import * as React from 'react';
import { FaPlaystation, FaXbox, FaSteam } from "react-icons/fa";
import ImageSwitcher from "./ImageSwitcher";
import AddToWishList from "./AddToWishList";
import { Game, normalizeGame } from "@/types";
import BuyButton from "./BuyButton";

import { useCart } from "../../app/store/cartStore";
import { useState, useEffect, useRef } from "react";

import { FaCartShopping } from "react-icons/fa6";
import toast, { Toaster } from 'react-hot-toast';



import { useDiscountStore } from "@/app/store/discountStore";



import YouTubePlayer from "./YouTubePlayer";
import review from "../models/review";



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

type GameCardProps = {
  game: Game;
  images?: { image: string }[];
  image?: string;
  wishlist?: boolean;
  screenBig?: boolean;
  discountPercent?: number;
  discountEndTime?: string;
};

const GameCard = ({ game: rawGame, images, wishlist = false,  image, discountEndTime, discountPercent }: GameCardProps) => {
  const game = normalizeGame(rawGame);

  const [videoId, setVideoId] = useState<string | null>(null);

  const price = React.useMemo(() => {
    const min = 100;
    const max = 700;
    return +(Math.random() * (max - min) + min).toFixed(2);
  }, []);

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

  



  

  //discount

  const { discounts } = useDiscountStore();
  const discountFromStore = discounts[game.id];

  const finalDiscountPercent = discountPercent ?? discountFromStore?.percent ?? 0;
  const finalDiscountEndTime = discountEndTime ?? discountFromStore?.endTime ?? null;

  const hasDiscount = finalDiscountPercent > 0 && !!finalDiscountEndTime;

  const discountedPrice = hasDiscount
    ? +(price * (1 - finalDiscountPercent / 100)).toFixed(2)
    : price;
  




  const notifiedRef = useRef(false);

  const [timeLeft, setTimeLeft] = useState<string | null>(null);

  //the time left from the end of discount
  useEffect(() => {
    if (!hasDiscount || !discountEndTime) return;

    const interval = setInterval(() => {
      const now = Date.now();
      const end = new Date(discountEndTime).getTime();
      const distance = end - now;

      if (distance <= 0) {
        setTimeLeft(null);
        clearInterval(interval);
        return;
      }

      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft(`${minutes}m ${seconds}s`);

      

      if (distance <= 33 * 60 * 1000 && !notifiedRef.current) {
        console.log("Showing toast now!");
        notifiedRef.current = true; 
        toast.success(" تبقّى أقل من 45 دقيقة!", {
          style: {
            background: "#000",
            color: "#FFD700",
            fontWeight: "bold",
            fontSize: "14px",
            borderRadius: "10px"
          }
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [hasDiscount, discountEndTime]);
  
  //the time left from the end of discount//
  
  

  if (!game) return null;

  const {
    background_image,
    name,
    id,
    parent_platforms = [],
    rating = 0,
    released = "Unknown",
    playtime = 0,
    slug = "default-slug",
    tba = false,
    rating_top = 0,
    ratings = [],
    ratings_count = 0,
    reviews_text_count = 0,
    added = 0,
  } = game;

  const mainImage = background_image || images?.[0]?.image;

  const [open, setOpen] = useState(false);
  const { cart, addToCart } = useCart();
  const isInCart = cart.some(item => item.id === game.id.toString());

  const handleAddToCart = () => {
    addToCart({
      id: id.toString(),
      name: game.name,
      price: discountedPrice,
      quantity: 1,
    });
    setOpen(true);
  };
  

  const platforms = parent_platforms?.map((platformObj) => platformObj.platform.slug);


  //youtube api key
  useEffect(() => {
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
      <div className="flex relative flex-col items-start">
        <HoverCardTrigger asChild>
          <div
            
            className="relative cursor-pointer w-full block"
          >
            <div className="relative flex flex-col gap-2">
              {wishlist && (
                <div className="absolute left-2 top-2 z-10">
                  <AddToWishList plus gameId={id.toString()} />
                </div>
              )}
              

              <div className="hover:opacity-80 hover:scale-105 hover:rotate-3 duration-150 w-full overflow-hidden h-64 relative rounded-xl mt-2 ">
                {mainImage ? (
                  <>
                    <Image
                      className="object-cover"
                      src={mainImage}
                      alt={name}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />

                    {discountPercent && discountPercent > 0 && image && (
                      <div className="absolute bottom-1 -left-2 z-20 w-16 h-16 -rotate-12">
                        <Image
                          src={image}
                          alt="Discount Icon"
                          fill
                          className="object-contain"
                          priority
                          sizes="(max-width: 100px) 50%vw, 50vw"
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
            </div>
          </div>
        </HoverCardTrigger>

        <div id="famous" className="pb-4 rounded-xl p-3 space-y-2 w-full">
          <Link
            href={`/game/${game.id}`}
            className="text-sm line-clamp-1 font-semibold text-white"
          >
            {name}
          </Link>


          <Link href={`/video?game=${encodeURIComponent(game.name)}`}>
          <div className="bg-orange-500 w-52 mt-2 text-sm rounded-xl items-center justify-center flex animate-pulse duration-700 ">
            <button> watch the presentation now</button>
          </div>
          </Link>



          
          <div className="flex items-center gap-1">
            {renderStars(rating)}
            <span className="text-xs text-gray-300">{rating.toFixed(1) || "N/A"}</span>
          </div>



          <p className="text-xs text-gray-300">
            Released: <span className="font-medium text-yellow-500">{released}</span>
          </p>
          <p className="text-xs text-gray-300">
            playtime: <span className="font-medium text-yellow-500">{play}</span>
          </p>
          <p className="text-xs text-gray-300">
            Download Times: <span className="font-medium text-yellow-500">{reviews}</span>
          </p>

          <div className="text-sm font-bold">
            {hasDiscount ? (
              <div className="flex flex-col items-start gap-1">
                <span className="text-red-500">
                  Discounted: ${(discountedPrice / 100).toFixed(2)}
                </span>
                <span className="line-through text-green-600 text-sm">
                  Original: ${(price / 100).toFixed(2)}
                </span>
                {timeLeft && (
                  <span className="text-yellow-400 text-xs">
                    Ends in: {timeLeft}
                  </span>
                )}
              </div>
            ) : (
              <div></div>
              // <span className="text-green-400 font-bold">
              //   Price: ${(price / 100).toFixed(2)}
              // </span>
            )}

          </div>
          

          
          


          <div className="flex items-center justify-center gap-x-3">
            <button
              onClick={() => {
                if (!isInCart) {
                  addToCart({
                    id: game.id.toString(),
                    name: game.name,
                    price: discountedPrice,
                    quantity: 1,
                  });
                  toast.success(`The game ${game.name} has been added to the cart!`, {
                    style: {
                      background: "rgba(0, 0, 0, 1)",
                      color: "green",
                      fontWeight: "bold",
                      fontSize: "15px",
                      borderRadius: "10px",
                    }
                  });
                }
              }}
              disabled={isInCart}
              className={`px-4 py-2 text-white rounded-xl transition h-10 mt-6 animate-pulse delay-75 ${isInCart ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"}`}
            >
              <FaCartShopping />
            </button>

            <BuyButton name={name} price={discountedPrice} />
          </div>

          
        </div>
        <div className="m-2 flex items-center gap-1 ">
          {platforms?.map((slug, i) => {
            if (slug === "pc") return <FaSteam key={i} title="PC" />;
            if (slug.includes("playstation")) return <FaPlaystation key={i} className="text-blue-500" title="PlayStation" />;
            if (slug.includes("xbox")) return <FaXbox key={i} className="text-green-500" title="Xbox" />;
            return null;
          })}
        </div>

        <HoverCardContent align="center" className="w-full bg-transparent border-none">
          {images && images.length > 0 && <ImageSwitcher game={game} images={images} />}
        </HoverCardContent>
      </div>
    </HoverCard>
  );
};

export default GameCard;























// import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card";
// import Image from "next/image";
// import Link from "next/link";
// import * as React from 'react';
// import { FaPlaystation, FaXbox, FaSteam } from "react-icons/fa";
// import ImageSwitcher from "./ImageSwitcher";
// import AddToWishList from "./AddToWishList";
// import { Game, normalizeGame } from "@/types";
// import BuyButton from "./BuyButton";

// import {useCart} from "../../app/store/cartStore"
// import { useState, useMemo } from "react";

// import { FaCartShopping } from "react-icons/fa6";
// import toast from 'react-hot-toast'
  
// type GameCardProps = {
//   game: Game;
//   images?: { image: string }[];
//   wishlist?: boolean;
//   screenBig?: boolean;
  
// };

// // STARS
// const renderStars = (rating: number) => {
//   const fullStars = Math.floor(rating);
//   const stars = [];
//   for (let i = 0; i < 5; i++) {
//     stars.push(
//       <span key={i} className="text-yellow-400 text-sm">
//         {i < fullStars ? "★" : "☆"}
//       </span>
//     );
//   }
//   return stars;
// };



// // const GameCard = ({ game, images, wishlist = false }: GameCardProps) => {
// //   if (!game) return null;

// const GameCard = ({ game: rawGame, images, wishlist = false }: GameCardProps) => {
//   const game = normalizeGame(rawGame);

//   // Function to generate a random price

//   const price = React.useMemo(() => {
//     const min = 100;
//     const max = 700;
//     return +(Math.random() * (max - min) + min).toFixed(2);
//   }, []);
  
  
//   if (!game) return null;

//   const {
//     background_image,
//     name,
//     id,
//     parent_platforms = [],
//     rating = 0,
//     released = "Unknown",
//     slug = "default-slug",
//     tba = false,
//     rating_top = 0,
//     ratings = [],
//     ratings_count = 0,  
//     reviews_text_count = 0,  
//     added = 0,  
//   } = game;


//   const [open, setOpen] = useState(false);
//   const { cart, addToCart } = useCart();
//   const isInCart = cart.some(item => item.id === game.id.toString());


//   const handleAddToCart = () => {
//     addToCart({
//       id: id.toString(),
//       name: game.name,
//       price: price,
//       quantity: 1,
//     });
//     setOpen(true);
//   };

//   const handleClose = (_: unknown, reason?: string) => {
//     if (reason === 'clickaway') return;
//     setOpen(false);
//   };

//   const platforms = parent_platforms?.map((platformObj) => platformObj.platform.slug);

//   return (
//     <>
//     <HoverCard>
//       <div className="flex relative flex-col items-start gap-4">
//         <HoverCardTrigger className="relative cursor-pointer w-full" asChild>
//           <div>
//             <div className="relative flex flex-col gap-2">
//               {wishlist && (
//                 <div className="absolute left-2 top-2 z-10">
//                   <AddToWishList plus gameId={id.toString()} />
//                 </div>
//               )}
//               <div className="hover:opacity-80 duration-150 w-full overflow-hidden h-64 relative rounded-xl">
//                 {background_image ? (
//                   <Image
//                     className="object-cover"
//                     src={background_image}
//                     alt={name}
//                     fill
//                     priority
//                     sizes="(max-width: 768px) 100vw, 50vw"
//                   />
//                 ) : (
//                   <div className="w-full h-full bg-gray-500 flex items-center justify-center text-white text-xs">
//                     No Image Available
//                   </div>
//                 )}
//               </div>
//               <Link
//                 href={`/game/${game.id}`}
//                 className="text-sm line-clamp-1 font-semibold text-white"
//               >
//                 {name}
//               </Link>

              
//               {/* stars */}
//               <div className="flex items-center gap-1">
//                 {renderStars(rating)}
//                 <span className="text-xs text-gray-300 ml-1">{rating.toFixed(1) || "N/A"}</span>
//               </div>
//               {/* stars// */}
              

//               <p className="text-xs text-gray-300">
//                 Released: <span className="font-medium">{released}</span>
//               </p>
//               {/* <span className="text-xs text-green-400 font-bold">
//               price: ${(price/100).toFixed(2)}
//               </span> */}

              
//               <div className="flex Items-center gap-x-3"> 
//               <button
//                   onClick={() => {
//                     if (!isInCart) {
//                       addToCart({
//                         id: game.id.toString(),
//                         name: game.name,
//                         price: price,
//                         quantity: 1,
//                       });
//                       toast.success("The game has been added to the cart!", {
//                         style: {
//                           background:"rgba(0, 0, 0, 1)",
//                           color:"green",
//                           fontWeight:"bold",
//                           fontSize:"15px",
//                           borderRadius:"10px", 

//                         }
//                       });
//                     }
//                   }}
//                   disabled={isInCart}
//                   className={`px-4 py-2 text-white rounded-xl transition h-10 mt-6 animate-pulse delay-75 ${
//                     isInCart ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
//                   }`}
//                 >
//                   {isInCart} <FaCartShopping />
//                </button>

//               <BuyButton name={name} price={price} />
//               </div>
              
              
//               <div className="mt-2 flex items-center gap-1">
//                 {platforms?.map((slug, i) => {
//                   if (slug === "pc") {
//                     return <FaSteam key={i} title="PC" />;
//                   } else if (slug.includes("playstation")) {
//                     return <FaPlaystation key={i} className="text-blue-500" title="PlayStation" />;
//                   } else if (slug.includes("xbox")) {
//                     return <FaXbox key={i} className="text-green-500" title="Xbox" />;
//                   }
//                   return null;
//                 })}
//               </div>
//             </div>
//           </div>
//         </HoverCardTrigger>

//         <HoverCardContent align="center" className="w-full bg-transparent border-none">
//           {images && images.length > 0 && <ImageSwitcher game={game} images={images} />}
//         </HoverCardContent>
//       </div>
//     </HoverCard>
//     </>
//   );
  
// };
// export default GameCard;