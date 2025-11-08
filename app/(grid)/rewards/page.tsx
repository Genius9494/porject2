"use client";
import { useEffect, useState } from "react";

export default function MyRewardsPage() {
    const [rewards, setRewards] = useState<{ prize: string; date: string }[]>([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("myRewards") || "[]");
        setRewards(saved);
    }, []);

    return (
        <div className="Split min-h-screen bg-gradient-to-br from-[#6e0c5499] to-[#150f2499] mt-7 rounded-2xl text-white flex flex-col items-center p-10">
            <h1 className="text-4xl font-bold mb-8 text-yellow-400 drop-shadow-lg">
                🏆 My Rewards
            </h1>
            

            {rewards.length === 0 ? (
                <p className="text-gray-400">No rewards yet. Spin the wheel to earn some!</p>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
                    {rewards.map((r, i) => (
                        <div
                            key={i}
                            className="bg-purple-800/40 border border-purple-600 rounded-2xl p-6 shadow-lg backdrop-blur-sm hover:scale-105 transition"
                        >
                            <h2 className="text-2xl font-bold text-yellow-300">
                                {r.prize}
                            </h2>
                            <p className="text-gray-300 mt-2 text-sm">
                                Won on: {new Date(r.date).toLocaleString()}
                            </p>

                                                  </div>
                    ))}
                </div>
            )}
            <button
                onClick={() => {

                    window.location.href = "/spin"; // الانتقال للجوائز
                }}
                className="Split bottom-0 absolute bg-yellow-500 hover:bg-yellow-600 px-6 py-3 rounded-lg text-white font-bold"
            >
                Back To Spin page 🏆    
            </button>  
        </div>
    );
}
