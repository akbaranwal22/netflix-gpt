import { useSelector } from "react-redux";
import useMoviesTrailer from "../hooks/useMoviesTrailer";
import { useState, useEffect, useRef } from "react";


const VideoBackGround = ({ movieId }) => {
    const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
    const [isMuted, setIsMuted] = useState(true);
    const iframeRef = useRef(null);

    useMoviesTrailer(movieId);

    useEffect(() => {
        const handleUserInteraction = () => {
            if (isMuted && iframeRef.current) {
                setIsMuted(false);
                // Reload iframe with sound enabled
                const src = iframeRef.current.src;
                iframeRef.current.src = src.replace('mute=1', 'mute=0');
            }
            // Remove event listeners after first interaction
            document.removeEventListener('click', handleUserInteraction);
            document.removeEventListener('keydown', handleUserInteraction);
        };

        document.addEventListener('click', handleUserInteraction);
        document.addEventListener('keydown', handleUserInteraction);

        return () => {
            document.removeEventListener('click', handleUserInteraction);
            document.removeEventListener('keydown', handleUserInteraction);
        };
    }, [isMuted]);

    return <div className="w-screen">
        <iframe
            ref={iframeRef}
            className="w-screen aspect-video"
            src={"https://www.youtube.com/embed/" + trailerVideo?.key + "?autoplay=1&mute=" + (isMuted ? "1" : "0")} 
            title="YouTube video player" 
            allow="accelerometer; autoplay; 
            clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" 
        >
        </iframe>
    </div>
}

export default VideoBackGround;