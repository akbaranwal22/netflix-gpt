// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDboLUQE-X3oyUfujrpuQND2LhK3y3unh0",
  authDomain: "netflix-gpt-2212.firebaseapp.com",
  projectId: "netflix-gpt-2212",
  storageBucket: "netflix-gpt-2212.firebasestorage.app",
  messagingSenderId: "1091218898641",
  appId: "1:1091218898641:web:ec01e5b9e0e1300dc68ff0",
  measurementId: "G-W74CDX7QSV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
