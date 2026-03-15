import { useNavigate } from "react-router-dom";
import { LOGO, SUPPORTED_LANGUAGES, USER_AVATAR } from "../utils/constant";
import { auth } from "../utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";


const Header = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

    const handleSignOut = () => {
        signOut(auth)
            .then(() => { })
            .catch((error) => {
                navigate("/error");
            });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const { uid, email, displayName, photoURL } = user;
                dispatch(
                    addUser({
                        uid: uid,
                        email: email,
                        displayName: displayName,
                        photoURL: photoURL,
                    })
                );
                navigate("/browse");
            } else {
                dispatch(removeUser());
                navigate("/");
            }
        });

        // Unsiubscribe when component unmounts
        return () => unsubscribe();
    }, []);

    const handleGptSearchClick = () => {
        // Toggle GPT Search
        dispatch(toggleGptSearchView());
    };

    const handleLanguageChange = (e) => {
        dispatch(changeLanguage(e.target.value));
    }

    return (
        <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
            <img className="w-44 mx-auto md:mx-0" src={LOGO} alt="logo" />
            {user && (
                <div className="flex p-2 justify-between">
                    {showGptSearch && (
                <select
                  className="p-2 m-2 bg-gray-900 text-white"
                  onChange={handleLanguageChange}
                >
                  {
                    SUPPORTED_LANGUAGES.map((lang)=>(
                        <option key={lang.identifier} value={lang.identifier}>
                            {lang.name}
                        </option>
                    ))
                  }
                </select>
              )}
                    <button
                        className="py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg hover:bg-purple-700 transition-colors"
                        onClick={handleGptSearchClick}
                    >
                        {showGptSearch ? "Homepage" : "GPT Search"}
                    </button>
                    <img
                        className="hidden md:block w-12 h-12"
                        alt="usericon"
                        src={user?.photoURL}
                    />
                    <button 
                        onClick={handleSignOut} 
                        className="font-bold text-white p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    );

}

export default Header;