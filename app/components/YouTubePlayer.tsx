"use client";

type Props = {
    videoId: string;
};

export default function YouTubePlayer({ videoId }: Props) {
    return (
        <div className="aspect-video w-full rounded-xl overflow-hidden mt-2">
            <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${encodeURIComponent(videoId)}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                title="YouTube Video"
            />
        </div>
    );
}
