"use client";

import { useCollected } from "@/app/context/CollectedContext";
import Image from "next/image";
import Link from "next/link";

export default function CollectedPage() {
    const { collectedCards } = useCollected();

    return (
        <div className="description relative mt-8 rounded-2xl min-h-screen text-white p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold mr-7">  Collected Cards</h1>
                <img className="absolute w-10 h-12 right-0" src="/img4.png" alt="card" />
                <Link
                    href="/gifts"
                    className="bg-purple-950 hover:bg-purple-800 duration-150 text-white px-4 py-2 rounded-lg"
                >
                    → Back to Gifts
                </Link>
            </div>

            {collectedCards.length === 0 ? (
                <p className="text-gray-400 text-xl flex items-center justify-center mt-80">.No cards collected yet</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {collectedCards.map((card, i) => (
                        <div
                            key={i}
                            className=" relative rounded-xl  h-screen overflow-hidden transform   transition"
                        >
                            <img
                                
                                sizes="(max-width: 768px) 100vw, 50vw" width={300} height={300} src={card.img} alt={card.title} className=" absolute object-cover hover:rotate-2 hover:scale-105 duration-150 cursor-pointer" />

                            <div className="p-4 z-50">
                                <h2 className="text-xl font-bold">{card.title}</h2>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
