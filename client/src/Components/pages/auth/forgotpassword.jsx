import React, { useEffect, useState } from "react";
import { auth } from "../../firbase";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, Setemail] = useState("");
  // get the user or token of current user check if user and token are there we need to navigate the user to homepage.
  // this will prevent user to go to manually forgot/password page if he is already loggin..
  let user = useSelector((state) => state.rootreducer.user); // this will give current user toekn
  // this will run when we refresh or mount the page.
  useEffect(() => {
    if (user && user.token) {
      navigate("/");
    }
  });

  // handing the submit buttons
  const handleSubmit = async (e) => {
    e.preventDefault();

    Setemail(""); // clear the email field once we click the button.
    // the url is route once user fill their updated password then he will redirect to the current url:urls
    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_URL, // this url redirects to login page once user reset the password
      handleCodeInApp: true,
    };
    try {
      await sendPasswordResetEmail(auth, email, config);
      toast.success(`Password rest link is sent to ${email} please check`);
    } catch (error) {
      console.log(error);
      toast.error(`No user founds with the ${email} please register`);
    }
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h3 className="text-primary text-center">Forgot Password</h3>
          <form action="">
            <div className="from-group">
              <input
                type="email"
                className="form-control"
                value={email}
                autoFocus
                placeholder="Enter your email"
                onChange={(e) => {
                  Setemail(e.target.value);
                }}
              />
            </div>

            <button
              className="btn btn-md btn-success mt-3"
              onClick={handleSubmit}
              disabled={!email}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default ForgotPassword;
