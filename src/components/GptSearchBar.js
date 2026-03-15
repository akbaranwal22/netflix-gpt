import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import lang from '../utils/languageConstants'
import openai from '../utils/openAI';
import { API_OPIONS } from '../utils/constant';
import { addGptMovieResult } from '../utils/gptSlice';

const GptSearchBar = () => {
    const langUpdate = useSelector((store) => store.config.lang);
    const searchText = useRef(null);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fallback movie suggestions based on common queries
    const getFallbackMovies = (query) => {
        const lowerQuery = query.toLowerCase();
        
        if (lowerQuery.includes('action') || lowerQuery.includes('thriller')) {
            return ["The Dark Knight", "Mad Max: Fury Road", "John Wick", "The Matrix", "Die Hard"];
        } else if (lowerQuery.includes('comedy') || lowerQuery.includes('funny')) {
            return ["The Hangover", "Superbad", "Step Brothers", "Anchorman", "Bridesmaids"];
        } else if (lowerQuery.includes('romance') || lowerQuery.includes('love')) {
            return ["The Notebook", "La La Land", "Titanic", "Pretty Woman", "When Harry Met Sally"];
        } else if (lowerQuery.includes('horror') || lowerQuery.includes('scary')) {
            return ["The Conjuring", "Get Out", "A Quiet Place", "Hereditary", "The Exorcist"];
        } else if (lowerQuery.includes('sci-fi') || lowerQuery.includes('science fiction')) {
            return ["Inception", "Interstellar", "Blade Runner 2049", "The Martian", "Arrival"];
        } else if (lowerQuery.includes('drama')) {
            return ["The Shawshank Redemption", "Forrest Gump", "The Godfather", "12 Angry Men", "Schindler's List"];
        } else {
            // Default popular movies
            return ["The Shawshank Redemption", "The Dark Knight", "Inception", "Pulp Fiction", "Forrest Gump"];
        }
    };

    // search movie in TMDB
    const searchMovieTMDB = async (movie) => {
        try {
            const data = await fetch(
                "https://api.themoviedb.org/3/search/movie?query=" +
                movie +
                "&include_adult=false&language=en-US&page=1",
                API_OPIONS
            );
            
            if (!data.ok) {
                throw new Error(`HTTP error! status: ${data.status}`);
            }
            
            const json = await data.json();
            return json.results;
        } catch (error) {
            console.error("Error searching TMDB:", error);
            return [];
        }
    };

    const handleGptSearchClick = async () => {
        const query = searchText.current.value?.trim();
        
        if (!query) {
            setError("Please enter a search query");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            console.log("Searching for:", query);

            const gptQuery =
                "Act as a Movie Recommendation system and suggest some movies for the query : " +
                query +
                ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

            let gptMovies;
            
            try {
                // Try OpenAI API first
                const gptResults = await openai.chat.completions.create({
                    messages: [{ role: "user", content: gptQuery }],
                    model: "gpt-4o-mini",
                });
                
                console.log("GPT Results:", gptResults);
                gptMovies = gptResults.choices?.[0]?.message?.content.split(",").map(movie => movie.trim());
            } catch (openaiError) {
                console.error("OpenAI API failed:", openaiError);
                // Fallback to predefined suggestions
                gptMovies = getFallbackMovies(query);
                setError("AI service unavailable. Showing popular suggestions based on your query.");
            }

            if (!gptMovies || gptMovies.length === 0) {
                gptMovies = getFallbackMovies(query);
                setError("No results found. Showing popular suggestions.");
            }

            const promiseArray = gptMovies.map(movie => searchMovieTMDB(movie));
            const tmdbResults = await Promise.all(promiseArray);

            console.log("TMDB Results:", tmdbResults);

            dispatch(
                addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults })
            );

        } catch (error) {
            console.error("Search failed:", error);
            setError("Search failed. Please try again.");
            
            // Still try to show fallback results
            const fallbackMovies = getFallbackMovies(query);
            const promiseArray = fallbackMovies.map(movie => searchMovieTMDB(movie));
            const tmdbResults = await Promise.all(promiseArray);
            
            dispatch(
                addGptMovieResult({ movieNames: fallbackMovies, movieResults: tmdbResults })
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='pt-[20%] flex justify-center'>
            <form className='w-1/2 bg-black grid grid-cols-12' onSubmit={(e) => e.preventDefault()}>
                <input
                    type="text"
                    ref={searchText}
                    className=" p-4 m-4 col-span-9"
                    placeholder={lang[langUpdate].gptSearchPlaceholder}
                    disabled={isLoading}
                />
                <button
                    className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg disabled:bg-gray-600 hover:bg-red-600 transition-colors"
                    onClick={handleGptSearchClick}
                    disabled={isLoading}
                >
                    {isLoading ? "Searching..." : lang[langUpdate].search}
                </button>
            </form>
            {error && (
                <div className="w-1/2 mx-auto mt-2 p-3 bg-yellow-900 text-yellow-200 rounded-lg text-sm animate-pulse">
                    {error}
                </div>
            )}
        </div>
    )
}

export default GptSearchBar