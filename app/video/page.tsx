"use client";
export const dynamic = "force-dynamic";
import VideoComponent from "../components/VideoComponent";
export default function VideoPage() { return <VideoComponent />; }








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
