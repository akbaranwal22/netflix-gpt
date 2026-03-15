import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addAnimeMovies } from "../utils/moviesSlice";
import { API_OPIONS } from "../utils/constant";

const useAnimeMovies = () => {
  const dispatch = useDispatch();

  const getAnimeMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/discover/movie?with_genres=16&sort_by=popularity.desc&page=1",
      API_OPIONS
    );
    const json = await data.json();
    
    dispatch(addAnimeMovies(json.results));
  };

  useEffect(() => {
    getAnimeMovies();
  }, []);
};

export default useAnimeMovies;
