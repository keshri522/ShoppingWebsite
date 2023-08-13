import React, { useEffect, useState } from "react";
import UserSidebar from "../../Navbar/UserSidebar";
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
      } else {
        setstate(true);
        let interval = setInterval(() => {
          Setcount((count) => --count);
        }, 1000);

        if (count === 0) {
          navigate("/");
          setstate(false);
        }

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
            <UserSidebar></UserSidebar>
          </div>
          {state ? (
            <h4 className="text-center text-secondary">
              Redirecting to home page {count}
            </h4>
          ) : (
            <h1 className="text-center">User Dashboard</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashBoard;
