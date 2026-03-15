import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addAnimeSeries } from "../utils/moviesSlice";
import { API_OPIONS } from "../utils/constant";

const useAnimeSeries = () => {
  const dispatch = useDispatch();

  const getAnimeSeries = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/discover/tv?with_genres=16&sort_by=popularity.desc&page=1",
      API_OPIONS
    );
    const json = await data.json();
    
    dispatch(addAnimeSeries(json.results));
  };

  useEffect(() => {
    getAnimeSeries();
  }, []);
};

export default useAnimeSeries;
