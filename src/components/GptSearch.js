import GptSearchBar from "./GptSearchBar";
import { BG_URL } from '../utils/constant';
import GptMovieSuggestion from "./GptMovieSuggestion";

const GPTSearch = () => {
  return (
    <>
      <div className="fixed -z-10">
        <img className="h-screen object-cover" src={BG_URL} alt="logo" />
      </div>
      <div className="">
        <GptSearchBar />
        <GptMovieSuggestion />
      </div>
    </>
  );
};
export default GPTSearch;