import React, { useState, useEffect } from "react";
import { auth } from "../../firbase";
import { signInWithEmailLink, updatePassword } from "firebase/auth";
import { toast } from "react-toastify";
import "../../../style.css";
import { useNavigate } from "react-router-dom";
import { MailOutlined } from "@ant-design/icons";
import { Button } from "antd";
const RegisterComplete = () => {
  const [email, setEmail] = useState(""); // this is for email.
  const [password, setPassword] = useState(""); // this is for the password field.
  let passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

  // once this is mounted in the dom first thing we need to grab the email of the user so we will not ask the email again

  useEffect(() => {
    // need to grap the user email from the local storage
    setEmail(window.localStorage.getItem("emailForRegistration")); // set the value to email
  }, [email]);
  const Navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password.match(passwordRegex)) {
      // Use ! to check if the regex does not match
      toast.error(
        "Password must include at least one letter, one number, and one special character."
      );
    }
    // we need to save the user with the email id in the firebase database..
    try {
      const result = await signInWithEmailLink(
        auth,
        email,
        window.location.href
      );
      if (result.user.emailVerified) {
        // remove the localstroage..
        // window.localStorage.removeItem("emailForRegistration");
        // defien the user using firefox..
        let user = auth.currentUser;

        // need to update the password..
        await updatePassword(user, password); // saving the password
        setPassword("");
        Navigate("/");

        const IdToken = await user.getIdToken(); // this will give the unique id for each user
        // no i have to store this unique id to global state of the application that is rdux when ever i need to access the current user i simply use the id.
      }
    } catch (error) {
      toast.error("Something wrong,please try after sometime");
      console.error("Error signing in with email link:", error);
    }
  };

  const registerComplete = () => (
    <form>
      <div className="form-group">
        <input
          type="email"
          className="form-control "
          value={email}
          autoFocus
          contentEditable="false"
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          className="form-control "
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          autoFocus
          placeholder="Enter your password"
        />
      </div>

      <Button
        onClick={handleSubmit}
        type="primary"
        size="middle"
        icon={<MailOutlined />}
        block
        shape="round"
        className="mt-2"
        disabled={!email || !password}
      >
        Registe with email
      </Button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h3 className="text-center text-primary">Complete Registration</h3>
          {registerComplete()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
