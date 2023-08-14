import React, { useEffect, useState } from "react";
import AdminSidebar from "../../Navbar/adminSidebar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios"; // these are async function that are imported from the functions
import { axiox } from "axios";
import {
  createCatetogy,
  removeCategory,
  getCategory,
} from "../../functions/category";
import { toast } from "react-toastify";

const CreateCategory = () => {
  const navigate = useNavigate();
  let user = useSelector((state) => state.rootreducer.user);
  const [count, Setcount] = useState(5);
  const [state, setstate] = useState(false);

  // this is protected route means only logged user can access.
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
          //   console.log("Admin data response is", data);
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

  const [name, Setname] = useState("");
  const [loading, Setloading] = useState(false);
  // creating handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // i need to send the category as the body that will created at backend..
    createCatetogy(name, user.token)
      .then((res) => {
        Setname("");
        toast.success(`${res.data.name} is Created sucessfully`);
        Setloading(true);
      })
      .catch((err) => {
        Setloading(false);
        // showing error based on the status
        if (err.response && err.response.status === 400) {
          // coming the code from backend ifalready the categroy present
          toast.error("Catergory already created");
        }

        // if (err.response && err.response.status === 400) {
        //   // coming the code from backend ifalready the categroy present
        //   toast.error(err.res.data);
        //   console.log("category already presnet");
        // }
      });
  };
  //creating a form using function.
  const ShowForm = () => (
    <form action="" onSubmit={handleSubmit} className="form-group">
      <input
        className="form-control"
        type="text"
        value={name}
        onChange={(e) => Setname(e.target.value)}
        autoFocus
        required
      />
      <br />
      <button className="btn btn-md btn-outline-success">Create</button>
    </form>
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          {user && user.role === "admin" && <AdminSidebar></AdminSidebar>}
        </div>
        <div className="col-md-8  mt-3">
          {state ? (
            <h4 className="text-center text-secondary">
              Redirecting to home page {count}
            </h4>
          ) : (
            <h3 className="text-center">Create category page</h3>
          )}
          {ShowForm()}
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
