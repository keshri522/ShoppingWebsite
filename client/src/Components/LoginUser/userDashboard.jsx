import React, { useEffect, useState } from "react";
import UserSidebar from "../Navbar/UserSidebar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const UserDashBoard = () => {
  const navigate = useNavigate();

  let user = useSelector((state) => state.rootreducer.user);

  const [count, Setcount] = useState(5);
  const [state, setstate] = useState(false);
  useEffect(() => {
    const checkUser = async () => {
      if (user && user.email) {
        navigate("/user/dashboard");
        setstate(false);
        console.log(state);
      } else {
        setstate(true);
        let interval = setInterval(() => {
          Setcount((count) => --count);
        }, 1000);

        if (count === 0) {
          navigate("/");
          setstate(false);
        }
        console.log(state);
        // Clear the interval
        return () => {
          clearInterval(interval);
        };
      }
    };

    checkUser(); // Call the async function

    // Since useEffect doesn't support returning a promise, you can't use async/await directly here
  }, [user, navigate, count]);

  // Add further debugging logs throughout your component as needed

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <div className="col-md-2">
            {user && user.email && <UserSidebar></UserSidebar>}
          </div>
          {state ? (
            <div>
              <h4 className="text-center text-secondary mt-5">
                Redirecting to home page {count}
              </h4>
              <h3 className="text-center text-danger">
                Cannot access before login
              </h3>
            </div>
          ) : (
            <h1 className="text-center">User Dashboard</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashBoard;
