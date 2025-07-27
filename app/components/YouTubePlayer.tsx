import React from "react";

type Props = {
    videoId: string;
};


const YouTubePlayer: React.FC<Props> = ({ videoId }) => {
    console.log("Rendering YouTubePlayer with ID:", videoId);

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
};

export default YouTubePlayer;
