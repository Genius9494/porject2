'use client';
import React, { useEffect, useState } from 'react';
import AddToWishList from './AddToWishList';
import SwiperCards from './SwiperCards';
import GamesSlider from './GamesSlider';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { styleText } from 'util';
import BuyButton from './BuyButton';
import { normalizeGame, Game } from '@/types';
import { useDiscountStore } from '../store/discountStore';
import { FaCartShopping } from "react-icons/fa6";
import { useCart } from "../../app/store/cartStore";
import { useGetUser } from '@/lib/queryFunctions';

import User from './User';
import { Skeleton } from '@mui/material';


type Reply = {
    userId: string;
    comment: string;
    createdAt: string;
};

type Review = {
    _id: string;
    comment: string;
    username?: string;
    rating: number;
    createdAt: string;
    replies: Reply[];
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


export default function GameDetails({ gameData, screenshots, similar, initialReviews, discountPercent, discountEndTime, game: rawGame = false }: GameCardProps | any) {
    const [localReviews, setLocalReviews] = useState<Review[]>(initialReviews || []);
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await fetch(`/api/reviews/${gameData.id}`);
                if (res.ok) {
                    const reviews = await res.json();
                    setLocalReviews(reviews);
                } else {
                    console.error('Failed To Upload Comments');
                }
            } catch (err) {
                console.error('An Error Occurred While Uploading Comments', err);
            }
        };

        fetchReviews();
    }, [gameData.id]);

    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(1); // ⭐
    const [isSubmitting, setIsSubmitting] = useState(false);


    const [replyText, setReplyText] = useState<{ [reviewId: string]: string }>({});
    const [isReplying, setIsReplying] = useState<{ [reviewId: string]: boolean }>({});
    const [showReplies, setShowReplies] = useState<{ [reviewId: string]: boolean }>({});
    const { user, isLoading } = useGetUser();



    const ratingsCount = React.useMemo(() => {
        const min = 100000;
        const max = 700000;
        return +(Math.random() * (max - min) + min).toFixed(0);
    }, []);



    const game = normalizeGame(rawGame);


    const price = React.useMemo(() => {
        const min = 100;
        const max = 700;
        return +(Math.random() * (max - min) + min).toFixed(2);
    }, []);





    const {
        background_image,
        name,
        id,
        parent_platforms = [],
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



    const { cart, addToCart } = useCart();
    const isInCart = cart.some(item => item.id === game.id.toString());

    const { discounts } = useDiscountStore();
    const discountFromStore = discounts[game.id];

    const finalDiscountPercent = discountPercent ?? discountFromStore?.percent ?? 0;
    const finalDiscountEndTime = discountEndTime ?? discountFromStore?.endTime ?? null;

    const hasDiscount = finalDiscountPercent > 0 && !!finalDiscountEndTime;

    const discountedPrice = hasDiscount
        ? +(price * (1 - finalDiscountPercent / 100)).toFixed(2)
        : price;




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


    //reply
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!comment) {
            toast("You Have Not Written Your Comment");
            return;
        }
        if (!rating) {
            toast("You Haven't Rated The Game");
            return;
        }

        setIsSubmitting(true);

        try {
            const res = await fetch(`/api/reviews/${gameData.id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    gameId: gameData.id,
                    rating,
                    comment,
                    userId: "guest343242",
                    username: "Genius",
                    replies: [],

                }),

            });

            if (res.ok) {
                const newReview = await res.json();
                setLocalReviews((prev) => [newReview, ...prev]);
                setComment("");
                setRating(1);
            } else {
                const errorText = await res.text();
                console.error("Failed To Save Comment:", errorText);
                toast(`Failed To Save Comment: ${errorText}`);
            }
        } catch (err) {
            console.error("An Error Occurred While Sending The Comment", err);
            toast("An Error Occurred While Sending The Comment");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleReplySubmit = async (reviewId: string) => {
        const comment = replyText[reviewId];
        if (!comment) return toast("Please write a reply first");

        setIsReplying((prev) => ({ ...prev, [reviewId]: true }));

        try {
            const res = await fetch(`/api/reviews/${reviewId}/reply`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    comment,
                    userId: "guest343242", // ← غيّر حسب النظام
                }),
            });

            if (res.ok) {
                const updatedReview = await res.json();
                setLocalReviews((prev) =>
                    prev.map((r) => (r._id === reviewId ? updatedReview : r))
                );
                setReplyText((prev) => ({ ...prev, [reviewId]: "" }));
            } else {
                toast("Failed to send reply");
            }
        } catch (err) {
            console.error(err);
            toast("Error while sending reply");
        } finally {
            setIsReplying((prev) => ({ ...prev, [reviewId]: false }));
        }
    };







    const additionalImage = gameData.background_image_additional;
    const allImages = [
        ...screenshots.results,
        ...(additionalImage ? [additionalImage] : []),
        gameData.background_image,
    ].filter(Boolean);




    return (
        <div className="mt-10">
            {/* تفاصيل اللعبة */}
            <div className="col-span-4 flex flex-col gap-2">
                <h1 className="text-2xl text-white">{gameData.name}</h1>
                <div className="flex items-center justify-between">
                    <div>Rating count: <span className='text-green-600'> {ratingsCount} </span></div>
                    <AddToWishList gameId={gameData.id.toString()} />

                </div>




                <div style={{ width: "25%" }} className='mb-2 flex gap-2' >

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
                    <BuyButton name={name} price={price} />
                </div>


                <SwiperCards
                    slidesPerView={1}
                    className="h-full"
                    items={allImages.map((screenshot: any) => ({
                        card: (
                            <div className="rounded-xl overflow-hidden h-[36rem] w-full relative">
                                <Image
                                    src={screenshot.image || screenshot}
                                    alt={gameData.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ),
                        src: screenshot.image || screenshot,
                    }))}
                    paginationImages
                />

                <p className="mt-10 col-span-2">{gameData.description_raw}</p>
            </div>



            {similar?.results?.length > 0 && (
                <GamesSlider title="Similar Games" games={similar.results} />
            )}

            {/* نموذج إرسال التعليق */}
            <div className="mt-10">
                <h2 className="text-xl font-bold mb-4">Add a Comment🤞</h2>
                <form onSubmit={handleSubmit}>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full p-2 rounded bg-black/30 text-white focus:bg-black/40"
                        placeholder="Write Your Comment Here"
                        rows={4}
                    />

                    <div className="flex items-center gap-2 mt-2">
                        {[1, 2, 3, 4, 5].map((num) => (
                            <button
                                key={num}
                                type="button"
                                onClick={() => setRating(num)}
                                className={`text-xl ${rating >= num ? 'text-yellow-400' : 'text-gray-400'
                                    }`}
                            >
                                ★
                            </button>
                        ))}
                        <span className="text-white"> :Evaluation </span>
                    </div>

                    <button
                        type="submit"
                        className="mt-4 px-4 py-2 bg-green-600 text-white rounded-2xl animate-bounce"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Sent Now...' : 'Sent'}
                    </button>
                </form>
            </div>

            {/* التعليقات */}
            <div className="mt-10">
                <h2 className="text-xl font-bold mb-4"> Comments </h2>
                {localReviews.length > 0 ? (
                    localReviews.map((r) => (
                        <div key={r._id} className="mb-4 border border-pink-300 p-4 rounded-xl">
                            <div className="flex items-center justify-between">

                                <div className="flex items-center gap-1">
                                    {renderStars(r.rating)}
                                    <span className="text-xs text-green-300">{r.rating.toFixed(1) || "N/A"}</span>

                                </div>

                                <span className="text-xs text-gray-400">
                                    {new Date(r.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            <p className="text-sm mt-2">{r.comment}</p>
                            {isLoading ? (
                                <div className="w-full mb-6 mt-4 space-y-2">
                                    <Skeleton className="h-10 w-10 rounded-full" />
                                    <Skeleton className="h-4 w-[120px]" />
                                </div>
                            ) : user?.data ? (


                                <div>
                                    <p className="text-sm text-gray-400">{user.data.name}</p>
                                </div>

                            ) : null}
                            <p className="text-green-400 font-bold">{r.username}</p>

                            <button
                                onClick={() =>
                                    setShowReplies((prev) => ({ ...prev, [r._id]: !prev[r._id] }))
                                }
                                className="mt-2 text-white text-sm p-1 rounded-xl bg-blue-600 duration-700"
                            >
                                {showReplies[r._id] ? "Hide Replies" : "Reply"}
                            </button>


                            {showReplies[r._id] && (
                                <>
                                    {r.replies && r.replies.length > 0 && (
                                        <div className="mt-2 space-y-2 pl-4 border-l border-gray-500">
                                            {r.replies.map((rep, idx) => (
                                                <div key={idx} className="text-sm text-gray-300">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-green-400">{rep.userId}</span>
                                                        <span className="text-xs">{new Date(rep.createdAt).toLocaleDateString()}</span>
                                                    </div>
                                                    <p>{rep.comment}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <div className="mt-2">
                                        <textarea
                                            rows={2}
                                            placeholder="Write a reply..."
                                            className="w-full bg-black/30 text-white p-1 rounded focus:bg-black/40"
                                            value={replyText[r._id] || ''}
                                            onChange={(e) =>
                                                setReplyText((prev) => ({ ...prev, [r._id]: e.target.value }))
                                            }
                                        />
                                        <button
                                            onClick={() => handleReplySubmit(r._id)}
                                            disabled={isReplying[r._id]}
                                            className="mt-1 bg-blue-500 text-white px-3 py-1 rounded text-sm"
                                        >
                                            {isReplying[r._id] ? 'Replying...' : 'Submit Reply'}
                                        </button>
                                    </div>
                                </>
                            )}

                        </div>
                    ))
                ) : (
                    <p className="text-gray-400 text-sm">No Comments Yet 😐</p>
                )}
            </div>
        </div>
    );
}
