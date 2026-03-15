import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondContainer = () => {
    const movies = useSelector((store) => store.movies);
    
    return ( movies.nowPlayingMovies && 
        (
            <div className="bg-black"> 
                <div className=" mt-0 md:-mt-52 pl-4 md:pl-12 relative z-20">
                    {/* Main Categories */}
                    <MovieList title='🔥 Trending Now' movies={movies.nowPlayingMovies} isNetflixStyle={true} />
                    <MovieList title='⭐ Top Rated' movies={movies.topRated} isNetflixStyle={true} />
                    <MovieList title='🎬 Popular' movies={movies.popularMovies} isNetflixStyle={true} />
                    <MovieList title='📅 Upcoming' movies={movies.upComing} isNetflixStyle={true} />
                    
                    {/* Anime Categories */}
                    <MovieList title='🌸 Anime Movies' movies={movies.animeMovies} isNetflixStyle={true} />
                    <MovieList title='📺 Anime Series' movies={movies.animeSeries} isNetflixStyle={true} />
                    
                    {/* Genre-specific Categories */}
                    <MovieList title='😱 Horror & Thriller' movies={movies.nowPlayingMovies} isNetflixStyle={true} />
                    <MovieList title='🎭 Drama' movies={movies.topRated} isNetflixStyle={true} />
                    <MovieList title='😂 Comedy' movies={movies.popularMovies} isNetflixStyle={true} />
                    <MovieList title='🚀 Action & Adventure' movies={movies.upComing} isNetflixStyle={true} />
                </div>
            </div>
        )
    )
}

export default SecondContainer;