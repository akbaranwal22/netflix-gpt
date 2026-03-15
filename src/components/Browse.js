import { useSelector } from "react-redux";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpComingMovies from "../hooks/useUpComingMovies";
import useAnimeMovies from "../hooks/useAnimeMovies";
import useAnimeSeries from "../hooks/useAnimeSeries";
import Header from "./Header";
import MainContainer from './MainContainer';
import SecondContainer from './SecondaryContainer';
import GptSearch from "./GptSearch";


const Browse = () => {
    const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  
    useNowPlayingMovies();
    usePopularMovies();
    useTopRatedMovies();
    useUpComingMovies();
    useAnimeMovies();
    useAnimeSeries();
  
    return (
      <div>
        <Header />
        {showGptSearch ? (
          <GptSearch />
        ) : (
          <>
            <MainContainer />
            <SecondContainer />
          </>
        )}
      </div>
    );
  };
  export default Browse;