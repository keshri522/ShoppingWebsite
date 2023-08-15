import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import { updateCategory } from "../../functions/category";
const UpdateCatgory = () => {
  const navigate = useNavigate();
  const location = useLocation();
  /// getting the name based on the user click on the edit using uselocation hook.

  // this will get the token or email from rdeux store
  let user = useSelector((state) => state.rootreducer.user);

  let { slug } = useParams();
  // setting the useState ot name of parameter coming from routes

  const [NewName, SetNewName] = useState();
  const [OldName, SetOldName] = useState(location.state);
  const [loading, Setloading] = useState(false);
  const [count, Setcount] = useState(5);
  const [state, setstate] = useState(false);
  // this will run if  admin manuallly go the special category
  useEffect(() => {
    if (user && user.role && user.role === "admin") {
      // Only proceed if the user is an admin
      let route = `http://localhost:3000/admin/category/${
        slug || location.state
      }`;

      SetOldName(slug.toLowerCase() || location.state.toLowerCase()); // Set the oldName state
    }
  }, [user, slug, location.state]); // this will run if any of the depedencies is changed

  // this is protected route means only logged user can access.
  //   using useeffect..
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

  const ShowForm = () =>
    // this is portected route so we need to show form based on the user if role==="admin then only showth form other wise null"
    user && user.role && user.role === "admin" ? (
      <form action="" onSubmit={handleSubmit} className="form-group">
        <div className="mt-2">
          <input
            className="form-control"
            type="text"
            value={OldName}
            contentEditable="false"
            style={{ fontWeight: "bold", fontSize: "20px" }}
          />
        </div>

        <div className="mt-4">
          <input
            className="form-control"
            type="text"
            value={NewName}
            onChange={(e) => SetNewName(e.target.value)}
            autoFocus
            required
            placeholder="Enter name to be updated"
            style={{ fontWeight: "bold", fontSize: "20px" }}
          />
        </div>
        <br />
        <button className="btn btn-md btn-outline-success">Update</button>
      </form>
    ) : (
      <h3 className="text-center text-danger">
        Sorry Only Admin can access this route
      </h3>
    );

  const handleSubmit = async (e) => {
    e.preventDefault();

    // calling a updateCategory function for updating..
    updateCategory(slug, NewName, user.token)
      .then((res) => {
        // console.log(res);
        navigate("/admin/category");
        toast.success(`${OldName}  has updated to ${res.data.name}`);
      })
      .catch((err) => {
        if (err && err.response && err.response.status === 400) {
          toast.error("Catergory not found");
          console.log(err);
          Setloading(false);
        }
      });
  };
  //creating a form using function.

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {state ? (
            <div>
              <h4 className="text-center text-secondary mt-5">
                Redirecting to home page {count}
              </h4>
            </div>
          ) : (
            <h1 className="text-center text-primary">Update Category</h1>
          )}
          {ShowForm()}
        </div>
      </div>
    </div>
  );
};

export default UpdateCatgory;
