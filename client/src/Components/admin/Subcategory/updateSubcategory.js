import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";
import { updatesubcategory } from "../../functions/subcategory";
import { getCategory } from "../../functions/category";
const UpdateSubcatgory = () => {
  const navigate = useNavigate();
  /// getting the name based on the user click on the edit using uselocation hook.
  const location = useLocation();

  // this will get the token or email from rdeux store
  let user = useSelector((state) => state.rootreducer.user);

  let { slug } = useParams();
  // setting the useState ot name of parameter coming from routes
  const [initialState, SetinitialState] = useState(slug);
  const [NewName, SetNewName] = useState(slug);

  const [categories, Setcategories] = useState([]); // to store all the categories
  const [count, Setcount] = useState(5);
  const [state, setstate] = useState(false);
  const [parent, Setparent] = useState(); // for the select once selected the of select is in the parent
  // this will run if  admin manuallly go the special category
  useEffect(() => {
    if (user && user.role && user.role === "admin") {
      // Only proceed if the user is an admin
      let route = `http://localhost:3000/admin/subcategory/${
        slug || location.state.name
      }`;

      SetNewName(slug);
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

  // getting all the category to show on the select option
  useEffect(() => {
    getCategory().then((res) => {
      Setcategories(res.data);
    });
  }, []);
  const ShowForm = () =>
    // this is portected route so we need to show form based on the user if role==="admin then only showth form other wise null"
    user && user.role && user.role === "admin" ? (
      <form action="" onSubmit={handleSubmit} className="form-group">
        <div className="mt-4">
          <input
            className="form-control"
            type="text"
            value={NewName}
            onChange={(e) => SetNewName(e.target.value)}
            autoFocus
            required
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
    updatesubcategory(slug, NewName, user.token)
      .then((res) => {
        // console.log(res);

        navigate("/admin/subcategory");
        toast.success(`${initialState}  has updated to ${res.data.name}`);
      })
      .catch((err) => {
        if (err && err.response && err.response.status === 400) {
          toast.error("Please Select the parent category");
          //   console.log(err);
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
            <h1 className="text-center text-primary">Update Subcategory</h1>
          )}
          {user && user.role && user.role === "admin" ? (
            <div className="form-group mt-4">
              <label htmlFor="" className="text-primary">
                Parent Category
              </label>
              <select
                name="category"
                className="form-control"
                onChange={(e) => {
                  Setparent(e.target.value);
                }}
              >
                {/* Render options based on the categories */}
                {categories &&
                  categories.length > 0 &&
                  categories.map((items) => (
                    <option
                      value={items._id}
                      key={items._id}
                      selected={items._id === parent}
                      className="m-2"
                    >
                      {items.name}
                    </option>
                  ))}
              </select>
            </div>
          ) : null}
          {ShowForm()}
        </div>
      </div>
    </div>
  );
};

export default UpdateSubcatgory;
