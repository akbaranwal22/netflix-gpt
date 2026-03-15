import { useRef, useState } from "react";
import { BG_URL, LOGO, USER_AVATAR } from "../utils/constant";
import Body from "./Body";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMsg, setErrorMsg] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const handleButtonClick = () => {
        let message = checkValidData(email.current.value, password.current.value);           // handle validation
        setErrorMsg(message);
        if (message) return;

        if (!isSignInForm) {
            // signup logic
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    
                    updateProfile(user, {
                        displayName: name.current.value,
                        photoURL: USER_AVATAR
                      }).then((res) => {

                        const { uid, email, displayName, photoURL } = auth.currentUser;
                        dispatch(
                            addUser({
                            uid: uid,
                            email: email,
                            displayName: displayName,
                            photoURL: photoURL,
                        }));
                        
                        // navigate("/browse");

                      }).catch((error) => {
                        setErrorMsg(error.message);
                      });
                    

                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMsg(errorCode + "-" + errorMessage);
                });

        } else {
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;

                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMsg(errorCode + "-" + errorMessage);
                });
        }
    }

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    }

    return (
        <div>
            <Header />
            <div className="absolute inset-0">
                <img 
                    className="w-full h-full object-cover"
                    src={BG_URL}
                    alt="background-image"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/80"></div>
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-lg px-10 sm:px-14 md:px-20 py-6 md:py-10 bg-black/75 backdrop-blur-sm text-white rounded-lg shadow-2xl">
                <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl mb-6 text-center">
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </h1>
                
                <div className="space-y-4">
                    {!isSignInForm && (
                        <input 
                            ref={name} 
                            type="text" 
                            placeholder="Full Name" 
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                        />
                    )}
                    
                    <input 
                        ref={email} 
                        type="email" 
                        placeholder="Email Address" 
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                    />
                    
                    <input 
                        ref={password} 
                        type="password" 
                        placeholder="Password" 
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all duration-200 placeholder-gray-400"
                    />
                </div>

                {errorMsg && (
                    <p className="text-sm font-semibold text-red-500 mt-4 p-2 bg-red-900/20 border border-red-800/30 rounded-md">
                        {errorMsg}
                    </p>
                )}

                <button 
                    className="w-full py-3 mt-6 bg-red-600 hover:bg-red-700 rounded-md font-semibold text-lg transition-colors duration-200 shadow-lg hover:shadow-red-600/25" 
                    onClick={handleButtonClick}
                >
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </button>

                <div className="mt-6 text-center">
                    <p className="text-gray-300 cursor-pointer hover:text-white transition-colors duration-200" onClick={toggleSignInForm}>
                        {isSignInForm
                            ? "New to Netflix? Sign Up Now"
                            : "Already registered? Sign In Now."}
                    </p>
                </div>
            </form>
        </div>
    )
}

export default Login;