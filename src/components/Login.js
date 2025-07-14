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
            <div className="absolute">
                <img 
                    className="h-screen object-cover"
                    src={BG_URL}
                    alt="background-image"
                />
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="w-full md: w-3/12 absolute p-12 bg-black my-36 mx-auto left-0 right-0 text-white bg-opacity-80 rounded-sm">
                <h1 className="font-bold text-3xl py-4"> Sign In</h1>
                {!isSignInForm && <input ref={name} type="text" placeholder="Full Name" className="p-3 my-4 w-full bg-gray-700" />}
                <input ref={email} type="text" placeholder="Email Address" className="p-3 my-4 w-full bg-gray-700" />
                <input ref={password} type="password" placeholder="Password" className="p-3 my-4 w-full bg-gray-700" />

                <p className="text-sm font-semibold text-red-600 py-2"> {errorMsg} </p>

                <button className="p-2 my-6 bg-red-700 w-full rounded-lg" onClick={handleButtonClick}> {isSignInForm ? "Sign In" : "Sign Up"} </button>

                <p className="py-6 cursor-pointer" onClick={toggleSignInForm}>
                    {isSignInForm
                        ? "New to Netflix? Sign Up Now"
                        : "Already registered? Sign In Now."}
                </p>
            </form>
        </div>
    )
}

export default Login;