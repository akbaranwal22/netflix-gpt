import React, { useRef, useState, useEffect } from 'react';
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies, isNetflixStyle = false }) => {
    const scrollContainerRef = useRef(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const checkScroll = () => {
            const container = scrollContainerRef.current;
            if (container) {
                setShowLeftArrow(container.scrollLeft > 0);
                setShowRightArrow(
                    container.scrollLeft < container.scrollWidth - container.clientWidth
                );
            }
        };

        const container = scrollContainerRef.current;
        if (container) {
            checkScroll();
            container.addEventListener('scroll', checkScroll);
            return () => container.removeEventListener('scroll', checkScroll);
        }
    }, [movies]);

    const scrollLeft = () => {
        const container = scrollContainerRef.current;
        if (container) {
            container.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        const container = scrollContainerRef.current;
        if (container) {
            container.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    if (!movies || movies.length === 0) return null;

    const getTitleGradient = () => {
        if (title.includes('🔥')) return 'from-orange-500 to-red-500';
        if (title.includes('⭐')) return 'from-yellow-400 to-yellow-600';
        if (title.includes('🎬')) return 'from-purple-500 to-pink-500';
        if (title.includes('📅')) return 'from-blue-500 to-cyan-500';
        if (title.includes('🌸')) return 'from-pink-400 to-pink-600';
        if (title.includes('📺')) return 'from-indigo-500 to-purple-500';
        if (title.includes('😱')) return 'from-red-600 to-red-800';
        if (title.includes('🎭')) return 'from-amber-600 to-orange-600';
        if (title.includes('😂')) return 'from-green-500 to-emerald-500';
        if (title.includes('🚀')) return 'from-blue-600 to-indigo-600';
        return 'from-gray-600 to-gray-800';
    };

    return (
        <div className={`px-6 relative group ${isNetflixStyle ? 'mb-8' : ''}`}>
            <div className="relative">
                <h1 className={`text-lg md:text-3xl py-4 text-white font-bold bg-gradient-to-r ${getTitleGradient()} bg-clip-text text-transparent`}>
                    {title}
                </h1>
                
                {isNetflixStyle && (
                    <div className="absolute bottom-4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                )}
            </div>
            
            <div 
                className="relative"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Left scroll indicator */}
                {showLeftArrow && (
                    <button
                        onClick={scrollLeft}
                        className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 hover:bg-black text-white p-3 rounded-full transition-all duration-200 shadow-xl border border-white/20 ${
                            isNetflixStyle ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                        }`}
                        aria-label="Scroll left"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                )}

                {/* Movie container */}
                <div 
                    ref={scrollContainerRef}
                    className={`flex overflow-x-scroll scrollbar-hide scroll-smooth ${
                        isNetflixStyle ? 'gap-3' : 'gap-4'
                    }`}
                >
                    <div className={`flex ${isNetflixStyle ? 'gap-3' : 'gap-4'}`}>
                        {movies?.map((movie, index) => (
                            <div 
                                key={movie.id} 
                                className={`flex-shrink-0 transition-transform duration-300 ${
                                    isHovered && isNetflixStyle ? 'hover:scale-105 hover:z-10' : ''
                                }`}
                                style={{
                                    transform: isHovered && isNetflixStyle ? `translateX(${index * 2}px)` : 'translateX(0)',
                                    transitionDelay: isHovered ? `${index * 50}ms` : '0ms'
                                }}
                            >
                                <MovieCard posterPath={movie.poster_path} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right scroll indicator */}
                {showRightArrow && (
                    <button
                        onClick={scrollRight}
                        className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/80 hover:bg-black text-white p-3 rounded-full transition-all duration-200 shadow-xl border border-white/20 ${
                            isNetflixStyle ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                        }`}
                        aria-label="Scroll right"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                )}

                {/* Scroll hint for first-time users */}
                {!showLeftArrow && showRightArrow && !isNetflixStyle && (
                    <div className="absolute right-4 bottom-4 bg-black/60 text-white px-3 py-1 rounded-full text-xs flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <svg className="w-4 h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                        Scroll to see more
                    </div>
                )}

                {/* Netflix-style gradient fade */}
                {isNetflixStyle && (
                    <>
                        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black via-black/50 to-transparent pointer-events-none z-10"></div>
                        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black via-black/50 to-transparent pointer-events-none z-10"></div>
                    </>
                )}
            </div>
        </div>
    );
};

export default MovieList;