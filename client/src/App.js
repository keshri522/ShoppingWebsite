import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from "./Components/router";
import Header from "./Components/Navbar/Header";
import { useDispatch } from "react-redux";
import { auth } from "./Components/firbase";
import { useEffect } from "react";
import { getIdTokenResult } from "firebase/auth";
import { loggedInUser } from "./Components/Redux/reducers/userReducers";
import axios from "axios";
import SideDrawer from "./Components/drawer/sidedrawer";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const checkUser = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // then i need to find the token id that was given to user at the time of login..
        let IdToken = await getIdTokenResult(user);
        // send the token to the end point to backend if token verified then return the whole details of logged in user even refresh the page
        const config = {
          headers: {
            "Content-type": "application/json",
            token: IdToken.token,
          },
        };
        // if we want to change the route based on apio simply change it no need to change entire
        axios
          .post(
            `${process.env.REACT_APP_ROUTE_API}/currentUser`,
            {}, // 2nd one is passed in the body
            config // 3rd one is passed in the headers
          )
          .then((data) => {
            // console.log("The response is sucessfull and the data is ", data);

            // the data coming from post request simply dispatching into the redux store. that can be accesss any where
            dispatch(
              loggedInUser({
                name: data.data.name,
                email: data.data.email,
                role: data.data.role,
                _id: data.data._id,
                token: IdToken.token,
              })
            );
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  });
  return (
    <div>
      <Header></Header>

      <ToastContainer></ToastContainer>
      <SideDrawer></SideDrawer>
      <Router></Router>
    </div>
  );
}

export default App;
