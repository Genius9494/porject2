// app/video/page.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import YouTubePlayer from '../components/YouTubePlayer';

export default function VideoPage() {
    const searchParams = useSearchParams();
    const game = searchParams.get('game') || '';
    const [videoId, setVideoId] = useState<string | null>(null);

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const res = await fetch(`/api/youtube?query=${encodeURIComponent(game)}`);
                const data = await res.json();
                setVideoId(data.videoId);
            } catch (err) {
                console.error('Video fetch failed', err);
            }
        };

        if (game) fetchVideo();
    }, [game]);

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
            <h1 className="text-xl font-bold mb-4">{game} - Trailer</h1>
            {videoId ? (
                <YouTubePlayer videoId={videoId} />
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
