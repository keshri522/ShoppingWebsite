import React, { useState } from "react";
import { toast } from "react-toastify";
import { auth } from "../firbase";
import { updatePassword } from "firebase/auth";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const Password = () => {
  // getting the data or user from redux store..
  const LoginUser = useSelector((state) => state.rootreducer.user);
  const navigate = useNavigate();
  const [password, Setpassword] = useState("");

  // for the trak of loading we use a usestate..
  const [loading, Setloading] = useState(false);

  // Define the correct regex pattern using forward slashes and backslashes
  let passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    Setloading(true);
    try {
      // Form validation

      if (password.length < 6) {
        toast.error("Password must be at least six characters");
        Setloading(false);
      } else if (!password.match(passwordRegex)) {
        // Use ! to check if the regex does not match
        toast.error(
          "Password must include at least one letter, one number, and one special character."
        );
        Setloading(false);
      } else {
        // we need to update the password with new password..
        let user = auth.currentUser;
        const UpdatePassword = await updatePassword(user, password);
        // once password is update then we make the setloading or setPassword to false or null.
        Setloading(false);
        toast.success("Password updated  successfully");
        Setpassword("");
        // navigating based on the user after password is updated
        if (LoginUser && LoginUser.role && LoginUser.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/user/dashboard");
        }
      }
    } catch (error) {
      Setloading(false);
      toast.error(error.message);
    }
  };
  // function for the forms.
  const PasswordForm = () => (
    <form action="" onSubmit={handleSubmit}>
      <div className="form-group mt-3 ">
        <input
          type="password"
          className="form-control"
          onChange={(e) => Setpassword(e.target.value)}
          placeholder="Enter your new password "
          value={password}
          autoFocus
        />
        <button
          className="btn btn-sm btn-secondary mt-3"
          disabled={!password || loading}
        >
          Submit
        </button>
      </div>
    </form>
  );
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {/* show based on loading.. */}
          {loading ? (
            <h2 className="text-danger">Loading...</h2>
          ) : (
            <h4 className="text-center text-primary">Password Reset</h4>
          )}
          {PasswordForm()}
        </div>
      </div>
    </div>
  );
};

export default Password;
