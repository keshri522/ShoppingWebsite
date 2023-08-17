import React, { useEffect, useState } from "react";
import AdminSidebar from "../Navbar/adminSidebar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";

const AdminDashBoard = () => {
  const navigate = useNavigate();

  let user = useSelector((state) => state.rootreducer.user);

  const [count, Setcount] = useState(5);

  const [state, setstate] = useState(false);
  const [getProduct, SetgetProduct] = useState([]); // this is for the getting all the products from backend
  const [loading, Setloading] = useState(false);

  // using useeffect..
  useEffect(() => {
    setstate(false);
    if (user && user.token) {
      console.log(state);
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
          console.log(state);
        })
        .catch((error) => {
          console.log("Admin route error", error);
          setstate(false);
        });
    }
    // what if the user or user.token is not presnet in the redux means try to acces the route before admin login..
    else {
      setstate(true);

      let interval = setInterval(() => {
        Setcount((count) => --count);
      }, 1000);

      if (count === 0) {
        navigate("/");
      }

      console.log(state);

      // Clear the interval
      return () => {
        clearInterval(interval);
        setstate("");
      };
    }
  }, [user, count, navigate, state]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <div className="col-md-2">
            {user && user.role === "admin" && <AdminSidebar></AdminSidebar>}
          </div>
          {state ? (
            <div className="mt-5">
              <h4 className="text-center text-secondary">
                Redirecting to home page {count}
              </h4>
              <h3 className="text-center text-danger">
                Sorry Only Admin can access this route
              </h3>
            </div>
          ) : (
            <h1 className="text-center">Admin Dashboard</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashBoard;
