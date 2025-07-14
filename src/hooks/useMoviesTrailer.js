import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPIONS } from "../utils/constant";
import { addTrailerVideo } from "../utils/moviesSlice";


const useMoviesTrailer = (movieId) => {
    const dispatch = useDispatch();

    const getMoviesVideo = async () => {
        const videos = await fetch(
            "https://api.themoviedb.org/3/movie/"+movieId+"/videos?language=en-US",
            API_OPIONS
        );

        const json = await videos.json();
        const trailers = json.results.filter((video) => video.type === 'Trailer');
        const trailer = trailers.length ? trailers[0] : json[0];
        dispatch(addTrailerVideo(trailer));
    }

    useEffect(() => {
        getMoviesVideo();
    }, [])
}

export default useMoviesTrailer;