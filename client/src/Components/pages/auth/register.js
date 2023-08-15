import React, { useState, useEffect } from "react";
import { auth } from "../../firbase";
import { sendSignInLinkToEmail } from "firebase/auth";
import { toast } from "react-toastify";
import "../../../style.css";
import Registerform from "../../forms/registerform";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
const Register = () => {
  const navigate = useNavigate();
  // get the user or token of current user check if user and token are there we need to navigate the user to homepage.
  // this will prevent user to go to manually forgot/password page if he is already loggin..
  let user = useSelector((state) => state.rootreducer.user); // this will give current user toekn
  // this will run when we refresh or mount the page.
  useEffect(() => {
    if (user && user.token) {
      navigate("/");
    }
  });

  const [email, setEmail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    //add a check if the email length==0 then simpy return and show a toast message..
    if (email.length === 0) {
      toast.error("Email field cannot be empty");
      return;
    }
    const config = {
      url: process.env.REACT_APP_URL,
      handleCodeInApp: true,
    };

    try {
      await sendSignInLinkToEmail(auth, email, config); // this is used for sending email to particular email that user provided at the time of register
      toast.success(
        `Email is sent to ${email}. Click the link to complete your registration.`
      );
    } catch (error) {
      toast.error("Some is wrong please fill proper email format");
      // console.log(error);
    }

    // save user email in local storage
    window.localStorage.setItem("emailForRegistration", email);
    // clear state
    setEmail("");
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h3 className="text-center text-primary">Register</h3>
          <br />

          {/* import register form from form */}
          <Registerform
            handleSubmit={handleSubmit}
            email={email}
            setEmail={setEmail}
          ></Registerform>
        </div>
      </div>
    </div>
  );
};

export default Register;
