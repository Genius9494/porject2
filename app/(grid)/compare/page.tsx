"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    CartesianGrid,
} from "recharts";
import GridContainer from "@/app/components/defaults/GridContainer";

type GameOption = {
    id: number;
    name: string;
    released: string;
};

type Game = {
    id: number;
    name: string;
    background_image: string;
    playtime: number;
    added: number;
    rating: number;
    ratings_count: number;
    metacritic: number;
    released: string;
};

export default function ComparePage() {
    const [query1, setQuery1] = useState("");
    const [query2, setQuery2] = useState("");
    const [options1, setOptions1] = useState<GameOption[]>([]);
    const [options2, setOptions2] = useState<GameOption[]>([]);
    const [game1, setGame1] = useState<Game | null>(null);
    const [game2, setGame2] = useState<Game | null>(null);

    // البحث عن اللعبة الأولى
    useEffect(() => {
        const fetchOptions = async () => {
            if (query1.length < 2) return setOptions1([]);
            const res = await fetch(`/api/rawg/search?q=${query1}`);
            const data = await res.json();
            setOptions1(data.results || []);
        };
        fetchOptions();
    }, [query1]);

    // البحث عن اللعبة الثانية
    useEffect(() => {
        const fetchOptions = async () => {
            if (query2.length < 2) return setOptions2([]);
            const res = await fetch(`/api/rawg/search?q=${query2}`);
            const data = await res.json();
            setOptions2(data.results || []);
        };
        fetchOptions();
    }, [query2]);

    // عند اختيار لعبة من القائمة
    const selectGame = async (id: number, which: "g1" | "g2") => {
        const res = await fetch(`/api/rawg/game?id=${id}`);
        const data = await res.json();
        if (which === "g1") {
            setGame1(data);
            setOptions1([]); // يخفي القائمة
            setQuery1(data.name[0]);
        } else {
            setGame2(data);
            setOptions2([]); // يخفي القائمة
            setQuery2(data.name);
        }
    };

    // تجهيز البيانات للـ Chart
    const chartData =
        game1 && game2
            ? [
                {
                    metric: "Playtime (hrs)",
                    [game1.name]: game1.playtime,
                    [game2.name]: game2.playtime,
                },
                {
                    metric: "Popularity (Added)",
                    [game1.name]: game1.added,
                    [game2.name]: game2.added,
                },
                {
                    metric: "Rating (0-5)",
                    [game1.name]: game1.rating,
                    [game2.name]: game2.rating,
                },
                {
                    metric: "Ratings Count",
                    [game1.name]: game1.ratings_count,
                    [game2.name]: game2.ratings_count,
                },
                {
                    metric: "Metacritic",
                    [game1.name]: game1.metacritic,
                    [game2.name]: game2.metacritic,
                },
            ]
            : [];

    return (
        
        <div id="cart" className=" rounded-2xl mt-8 relative">
            <div className="p-6 max-w-5xl mx-auto  ">
                <h1 className="text-3xl font-bold mb-6 text-center">🎮 Compare two games</h1>

                {/* البحث */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* اللعبة الأولى */}
                    <div className="relative">
                        <Input
                            id="cart"
                            className="p-5 rounded-lg text-left "
                            placeholder="...Search for the first game"
                            value={query1}
                            onChange={(e) => setQuery1(e.target.value)}
                        />
                        {options1.length > 0 && (
                            <ul className="absolute  border rounded-lg shadow w-full z-10 max-h-64 overflow-y-auto">
                                {options1.map((opt) => (
                                    <li
                                        key={opt.id}
                                        className="p-2 hover:bg-black/10 cursor-pointer"
                                        onClick={() => selectGame(opt.id, "g1")}
                                    >
                                        {opt.name}{" "}
                                        <span className="text-gray-500 text-sm">
                                            {opt.released || "N/A"}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* اللعبة الثانية */}
                    <div className="relative">
                        <Input
                            id="cart"
                            placeholder="...Search for the second game"
                            value={query2}
                            onChange={(e) => setQuery2(e.target.value)}
                            className="p-5 rounded-lg text-left"
                        />
                        {options2.length > 0 && (
                            <ul id="cart" className="absolute bg-white border rounded-lg shadow w-full z-10 max-h-64 overflow-y-auto">
                                {options2.map((opt) => (
                                    <li
                                        key={opt.id}
                                        className="p-2 hover:bg-black/10 cursor-pointer"
                                        onClick={() => selectGame(opt.id, "g2")}
                                    >
                                        {opt.name}{" "}
                                        <span className="text-gray-400 text-sm">
                                            {opt.released || "N/A"}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                {/* عرض النتائج */}
                {game1 && game2 && (
                    <div className="space-y-8">
                        {/* بطاقات الألعاب */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[game1, game2].map((g) => (
                                <div
                                    id="cart"
                                    key={g.id}
                                    className=" rounded-2xl shadow-lg p-4 flex flex-col items-center hover:shadow-xl transition"
                                >
                                    <img
                                        src={g.background_image}
                                        alt={g.name}
                                        className="w-full h-48 object-cover rounded-xl mb-4"
                                    />
                                    <h2 className="text-xl font-semibold">{g.name}</h2>
                                    <p className="text-white">
                                        Version: {g.released || "N/A"}
                                    </p>
                                    <p className="mt-2">
                                        ⭐ Rating: {g.rating} ({g.ratings_count} rating)
                                    </p>
                                    <p>🎯 Metacritic: {g.metacritic || "N/A"}</p>
                                </div>
                            ))}
                        </div>

                        {/* الرسم البياني */}
                        <div id="empty" className=" rounded-2xl shadow-lg p-6 h-[350px]">
                            <h3 className="text-lg font-semibold mb-4 text-center">
                                🎖️ Detailed comparison
                            </h3>
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="metric" />
                                    <YAxis />
                                    <Tooltip
                                        cursor={{ fill: "transparent" }} // يمنع لون عند المرور على الفراغ
                                        contentStyle={{ backgroundColor: "#1F2937", border: "none" }} // خلفية سوداء داكنة
                                        labelStyle={{ color: "#FBBF24", fontWeight: "bold" }} // لون التاريخ/اسم العمود
                                        itemStyle={{ color: "#10B981" }} // لون القيم لكل لعبة
                                    />

                                    <Legend />

                                    {game1 && (
                                        <Bar
                                            dataKey={game1.name}
                                            fill="url(#colorGame1)"
                                            activeBar={{ fill: "#8B5CF6" }} // بنفسجي قوي
                                        />
                                    )}
                                    {game2 && (
                                        <Bar
                                            dataKey={game2.name}
                                            fill="url(#colorGame2)"
                                            activeBar={{ fill: "#F59E0B" }} // برتقالي
                                        />
                                    )}
                                    <defs>

                                        <linearGradient id="colorGame1" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#6366F1" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#6366F1" stopOpacity={0.2} />

                                        </linearGradient>
                                        <linearGradient id="colorGame2" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#10B981" stopOpacity={0.2} />
                                        </linearGradient>
                                    </defs>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}
            </div>
        </div>
        
    );
}
