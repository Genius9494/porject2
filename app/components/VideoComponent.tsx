"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import YouTubePlayer from "./YouTubePlayer";

export default function VideoComponent() {
    const searchParams = useSearchParams();
    const game = searchParams.get("game") || "";
    const [videoId, setVideoId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchVideo = async () => {
            if (!game) return;
            setLoading(true);
            setError(null);

            try {
                const baseUrl = process.env.NEXT_PUBLIC_URL || "";
                const res = await fetch(`${baseUrl}/api/youtube?query=${encodeURIComponent(game)}`);
                const data = await res.json();

                if (res.ok) {
                    setVideoId(data.videoId);
                } else {
                    setError(data.error || "Failed to fetch video");
                }
            } catch (err) {
                console.error("Video fetch failed", err);
                setError("Network error");
            } finally {
                setLoading(false);
            }
        };

        fetchVideo();
    }, [game]);

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
            <h1 className="text-xl font-bold mb-4">{game ? `${game} - Trailer` : "Video"}</h1>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {videoId && <YouTubePlayer videoId={videoId} />}
        </div>
    );
}
