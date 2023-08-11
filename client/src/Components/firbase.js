// Import the functions you need from the SDKs you need

// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth } from "firebase/auth";
// const firebaseConfig = {
//   apiKey: "AIzaSyD-Q_0ohoYyEu1NJrzws-BXRfRBRGan_VA",
//   authDomain: "my-first-project-cdbf7.firebaseapp.com",
//   projectId: "my-first-project-cdbf7",
//   storageBucket: "my-first-project-cdbf7.appspot.com",
//   messagingSenderId: "956686504530",
//   appId: "1:956686504530:web:5dbd4aff29d4fab0f5458b",
//   measurementId: "G-0YB4QGWJG4",
// };

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const auth = getAuth(app); // Get the auth object
// export { auth, analytics };
// Import the functions you need from the SDKs you need
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Get the auth object
// Set up Google authentication provider
const googleProvider = new GoogleAuthProvider(); //this will give verification from google
export { auth, analytics, googleProvider };
