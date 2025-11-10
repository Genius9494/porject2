"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import YouTubePlayer from "../components/YouTubePlayer";

function VideoContent() {
    const searchParams = useSearchParams();
    const game = searchParams.get("game");

    if (!game) {
        return <p className="text-center text-red-500 mt-8">❌ No game provided</p>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4 text-white">{game} Trailer</h1>
            <YouTubePlayer videoId={game} />
        </div>
    );
}

export default function VideoPage() {
    return (
        <Suspense fallback={<p className="text-center mt-8">Loading video...</p>}>
            <VideoContent />
        </Suspense>
    );
}








// "use client";
// export const dynamic = "force-dynamic";
// import VideoComponent from "../components/VideoComponent";
// export default function VideoPage() { return <VideoComponent />; }








// "use client";
// import { useSearchParams } from 'next/navigation';
// import { useEffect, useState } from 'react';
// import YouTubePlayer from '../components/YouTubePlayer';

// export const dynamic = "force-dynamic";


// export default function VideoPage() {
//     const searchParams = useSearchParams();
//     const game = searchParams.get('game') || '';
//     const [videoId, setVideoId] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchVideo = async () => {
//             try {
//                 const baseUrl = process.env.NEXT_PUBLIC_URL || '';
//                 const res = await fetch(`${baseUrl}/api/youtube?query=${encodeURIComponent(game)}`);

//                 const data = await res.json();
//                 setVideoId(data.videoId);
//             } catch (err) {
//                 console.error('Video fetch failed', err);
//             }
//         };

//         if (game) fetchVideo();
//     }, [game]);

//     return (
//         <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
//             <h1 className="text-xl font-bold mb-4">{game} - Trailer</h1>
//             {videoId ? (
//                 <YouTubePlayer videoId={videoId} />
//             ) : (
//                 <p>Loading...</p>
//             )}
//         </div>
//     );
// }
