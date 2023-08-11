import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from "./Components/router";
import Header from "./Components/Navbar/Header";
import { useDispatch } from "react-redux";
import { auth } from "./Components/firbase";
import { useEffect } from "react";
import { onAuthStateChanged, getIdTokenResult } from "firebase/auth";
import { loggedInUser } from "./Components/Redux/reducers/userReducers";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const checkUser = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // then i need to find the token id that was given to user at the time of login..
        let IdToken = await getIdTokenResult(user);

        // we need to dispatch the tokenId to redux store..
        dispatch(
          loggedInUser({
            email: user.email,
            token: IdToken.token, //sending to global state of the application..
          })
        );
      }
    });
  });
  return (
    <div>
      <Header></Header>
      <ToastContainer></ToastContainer>
      <Router></Router>
    </div>
  );
}

export default App;
