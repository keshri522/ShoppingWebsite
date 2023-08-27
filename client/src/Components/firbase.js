import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAORKKtZXSLRoAAMOJ8mY945C-M1uBJumw",
  authDomain: "shopping-website-89d53.firebaseapp.com",
  projectId: "shopping-website-89d53",
  storageBucket: "shopping-website-89d53.appspot.com",
  messagingSenderId: "1050151020748",
  appId: "1:1050151020748:web:32e50e0909e7b58408fa69",
  measurementId: "G-TS8T42B0VH",
};
// const firebaseConfig = {
//   apiKey: "AIzaSyDJ7bOO0DuwRDqFLewCApKvKRU25OkFVQE",
//   authDomain: "cloneflipkart-3bbf9.firebaseapp.com",
//   projectId: "cloneflipkart-3bbf9",
//   storageBucket: "cloneflipkart-3bbf9.appspot.com",
//   messagingSenderId: "407009816071",
//   appId: "1:407009816071:web:58e617dd39abf4fc2b04a2",
//   measurementId: "G-WKL976VBCX",
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Get the auth object
// Set up Google authentication provider
const googleProvider = new GoogleAuthProvider(); //this will give verification from google
export { auth, analytics, googleProvider };
