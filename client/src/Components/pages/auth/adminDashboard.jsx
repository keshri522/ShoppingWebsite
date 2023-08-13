import React, { useEffect, useState } from "react";
import UserSidebar from "../../Navbar/UserSidebar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";
const AdminDashBoard = () => {
  const navigate = useNavigate();

  let user = useSelector((state) => state.rootreducer.user);

  const [count, Setcount] = useState(5);

  const [state, setstate] = useState(false);

  // using useeffect..
  useEffect(() => {
    if (user && user.token) {
      setstate(false);
      console.log(state);
      // make a post request verfiy the token and also verify the role==admin in the backend or not.
      const config = {
        headers: {
          "Content-type": "application/json",
          token: user.token,
        },
      };
      axios
        .post(
          `${process.env.REACT_APP_ROUTE_API}/currentadmin`,
          {}, // 2nd one is passed in the body
          config // 3rd one is passed in the headers
        )
        .then((data) => {
          console.log("Admin data response is", data);
          setstate(false);
        })
        .catch((error) => {
          console.log("Admin route error", error);
          setstate(false);
        });
    }
    // what if the user or user.token is not presnet in the redux means try to acces the route before admin login..
    else {
      setstate(true);
      //   console.log(state);
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
  }, [user, count, navigate, state]);

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
            <h1 className="text-center">Admin Dashboard</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashBoard;
