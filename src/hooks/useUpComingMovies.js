import React, { useEffect } from 'react'
import { API_OPIONS } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { addPopularMovies, addTopRatedMovies, addUpComingMovies } from '../utils/moviesSlice';

const useUpComingMovies = () => {
    const dispatch = useDispatch();
    const getUpComingMovies = async() => {
        const data = await fetch(
            "https://api.themoviedb.org/3/movie/upcoming?page=1",
            API_OPIONS
          );
          const json = await data.json();
          
          dispatch(addUpComingMovies(json.results));
    }

    useEffect(() => {
        getUpComingMovies();
      }, []);
}

export default useUpComingMovies;
