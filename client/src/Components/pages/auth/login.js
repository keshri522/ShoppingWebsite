import React, { useState, useEffect } from "react";
import { auth, googleProvider } from "../../firbase";
import {
  signInWithEmailAndPassword,
  getIdTokenResult,
  signInWithPopup,
} from "firebase/auth";
import { toast } from "react-toastify";
import "../../../style.css";
import { Link } from "react-router-dom";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { loggedInUser } from "../../Redux/reducers/userReducers";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import axios from "axios";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // rendering the login title based on the loading
  // get the user or token of current user check if user and token are there we need to navigate the user to homepage.
  // this will prevent user to go to manually forgot/password page if he is already loggin..
  let user = useSelector((state) => state.rootreducer.user); // this will give current user toekn
  // this will run when we refresh or mount the page.
  useEffect(() => {
    if (user && user.token) {
      navigate("/");
    }
  });
  // Define the correct regex pattern using forward slashes and backslashes
  let passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Form validation
    if (!password.match(passwordRegex)) {
      // Use ! to check if the regex does not match
      toast.error(
        "Password must include at least one letter, one number, and one special character."
      );
    } else {
      // Perform the authentication logic
      try {
        const result = await signInWithEmailAndPassword(auth, email, password);
        // destructing the user from the result.
        const { user } = result;
        const Idtokoen = await getIdTokenResult(user); // this will give the token of logged in uder
        // sending the token to backend to the particlar route to verfiy the token by backend.. once veryfied means user is valid..

        //send the details to redux
        const config = {
          headers: {
            "Content-type": "application/json",
            token: Idtokoen.token,
          },
        };
        // if we want to change the route based on apio simply change it no need to change entire
        axios
          .post(
            `${process.env.REACT_APP_ROUTE_API}/create-or-update`,
            {}, // 2nd one is passed in the body
            config // 3rd one is passed in the headers
          )
          .then((data) => {
            console.log("The response is sucessfull and the data is ", data);
          })
          .catch((error) => {
            console.log(error);
          });

        dispatch(
          loggedInUser({
            email: user.email,
            token: Idtokoen.token,
          })
        );

        // navigate to home page
        navigate("/");
      } catch (error) {
        toast.error("User not found, please check email and password");
        console.log(error);
        setLoading(false);
      }
    }
  };
  const googleLogin = async () => {
    try {
      const userConfim = await signInWithPopup(auth, googleProvider);
      // destructure the user from the UserConfirm
      const { user } = userConfim;
      // get the token of the user and dispatch into the redux..
      const IdToken = await getIdTokenResult(user);
      console.log(IdToken);
      dispatch(
        loggedInUser({
          email: user.email,
          toekn: IdToken,
        })
      );
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const loginform = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="email"
          className="form-control "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
          placeholder="Enter your email address"
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          className="form-control "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
      </div>
      <Button
        onClick={handleSubmit}
        type="primary"
        size="large"
        icon={<MailOutlined />}
        block
        shape="round"
        className="mt-2"
        disabled={!email || password.length < 6}
      >
        Login with email/password
      </Button>

      <Button
        onClick={googleLogin}
        size="large"
        icon={<GoogleOutlined />}
        block
        shape="round"
        className="mt-4 bg-warning"
      >
        Login with Google
      </Button>

      <Link
        to="/forgot/password"
        className="float-right text-danger mt-2 text-decoration-none font-weight-bold"
      >
        forgot password
      </Link>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {loading ? (
            <h3 className="text-danger text-center">loading...</h3>
          ) : (
            <h3 className="text-center text-primary"> User Login</h3>
          )}
          <br />
          {loginform()}
        </div>
      </div>
    </div>
  );
};

export default Login;
