import React, { useEffect, useState } from "react";
import AdminSidebar from "../../Navbar/adminSidebar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios"; // these are async function that are imported from the functions

import {
  createCatetogy,
  removeCategory,
  getCategory,
} from "../../functions/category";
import { toast } from "react-toastify";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Categoryfrom from "../../forms/categoryfrom";
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
  const [categories, Setcategories] = useState([]); // this is for the getting all the categories.
  const [keyword, Setkeyword] = useState("");
  // we need to run the getcategory in
  // getting all the list of category from the backend using the api..
  useEffect(() => {
    getCategory().then((res) => {
      Setcategories(res.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // i need to send the category as the body that will created at backend..
    createCatetogy(name, user.token)
      .then((res) => {
        Setname("");
        toast.success(`${res.data.name} is Created sucessfully`);
        // appending the data coming in the response in the start means that res added at top
        Setcategories((prevData) => [res.data, ...prevData]);
      })
      .catch((err) => {
        // showing error based on the status
        if (err.response && err.response.status === 400) {
          // coming the code from backend ifalready the categroy present
          toast.error("Catergory already created");
        }
      });
  };

  // Deleting the categories when admin click on the any of the delte button.
  // to render on frontend we need to perform the delete operation on user state to inSTANT UPDATE THE STATE AFTER deleting.
  const DeleteItem = async (slug, token) => {
    removeCategory(slug, user.token)
      .then((res) => {
        // console.log(res);
        // i need to set the category and return only those which are not equal to given slug..
        let filterdata = categories.filter((item) => item.slug !== slug);
        Setcategories(filterdata);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // createing the handlechange
  const handleChange = (e) => {
    e.preventDefault();
    Setkeyword(e.target.value);
  };
  // this function will check if the keyword that admi enter is present in the category or not..
  const SearchFilterItem = (categories, keyword) => {
    return categories.filter((items) =>
      items.name.toLowerCase().startsWith(keyword.toLowerCase())
    );
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          {user && user.role === "admin" && <AdminSidebar></AdminSidebar>}
        </div>
        <div className="col-md-8  mt-3">
          {state ? (
            <div>
              <h4 className="text-center text-secondary">
                Redirecting to home page {count}
              </h4>
              <h3 className="text-center text-danger">
                Sorry Only Admin can access this route
              </h3>
            </div>
          ) : (
            <h3 className="text-center"> Category page</h3>
          )}
          {/* Refactor the code  */}
          {user && user.role && user.role === "admin" ? (
            <div>
              <Categoryfrom
                handleSubmit={handleSubmit}
                Setname={Setname}
                name={name}
              ></Categoryfrom>

              {/* for the filter of the category */}
              <input
                type="search"
                value={keyword}
                onChange={handleChange}
                placeholder="Find Category "
                className="form-control mb-5"
              />
            </div>
          ) : null}

          {/* rendering the response coming from the server */}
          {/* rendering the content based on the user if admin then only renders */}
          {user && user.role === "admin"
            ? keyword.length > 0
              ? SearchFilterItem(categories, keyword)?.map((el) => (
                  <div
                    className="alert alert-primary text-dark font-weight-bold "
                    key={el._id}
                  >
                    {el.name}
                    <span
                      className="btn btn-sm float-right button "
                      type="button"
                    >
                      <DeleteOutlined
                        className="text-danger "
                        onClick={() => {
                          DeleteItem(el.slug);
                        }}
                      />
                    </span>
                    <span className="btn btn-sm float-right  button">
                      <EditOutlined
                        className="text-warning "
                        onClick={() => {
                          // sending the name of slug also that we use in uelocation hook to grab it.
                          navigate(`/admin/category/${el.slug}`, {
                            state: el.name,
                          });
                        }}
                      />
                    </span>
                  </div>
                ))
              : categories?.map((el) => (
                  <div
                    className="alert alert-primary text-dark font-weight-bold "
                    key={el._id}
                  >
                    {el.name}
                    <span
                      className="btn btn-sm float-right button "
                      type="button"
                    >
                      <DeleteOutlined
                        className="text-danger "
                        onClick={() => {
                          DeleteItem(el.slug);
                        }}
                      />
                    </span>
                    <span className="btn btn-sm float-right  button">
                      <EditOutlined
                        className="text-warning "
                        onClick={() => {
                          // sending the name of slug also that we use in uelocation hook to grab it.
                          navigate(`/admin/category/${el.slug}`, {
                            state: el.name,
                          });
                        }}
                      />
                    </span>
                  </div>
                ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
