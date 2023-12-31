import React, { useState } from "react";
import { useEffect } from "react";
import AdminSidebar from "../../Navbar/adminSidebar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import axios from "axios"; // these are async function that are imported from the functions
import {
  createsubcategory,
  getsubcategory,
  removesubcategory,
} from "../../functions/subcategory";
import Categoryfrom from "../../forms/categoryfrom";
import { getCategory } from "../../functions/category";
const Subcategory = () => {
  const navigate = useNavigate();
  let user = useSelector((state) => state.rootreducer.user);
  const [count, Setcount] = useState(5);
  const [state, setstate] = useState(false);

  const [name, Setname] = useState("");
  const [subcategory, Setsubcategory] = useState([]);
  const [categories, Setcategories] = useState([]); // this is for the getting all the categories.
  const [keyword, Setkeyword] = useState("");
  const [category, setcategory] = useState("");

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

  // we need to run the getcategory in
  // getting all the list of category from the backend using the api..
  useEffect(() => {
    getCategory().then((res) => {
      Setcategories(res.data);
    });
    getsubcategory().then((res) => {
      Setsubcategory(res.data);
    });
  }, []);

  // createing the handlechange
  const handleChange = (e) => {
    e.preventDefault();
    Setkeyword(e.target.value);
    console.log(keyword);
  };

  // this function will check if the keyword that admi enter is present in the category or not..
  const SearchFilterItem = (cateegory, keyword) => {
    return subcategory.filter((items) =>
      items.name.toLowerCase().startsWith(keyword.toLowerCase())
    );
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // i need to send the category as the body that will created at backend..
    createsubcategory(name, user.token, category)
      .then((res) => {
        Setname("");

        toast.success(`${res.data.name} is Created sucessfully`);
        // appending the data coming in the response in the start means that res added at top

        Setsubcategory((prevData) => [res.data, ...prevData]);
      })
      .catch((err) => {
        // showing error based on the status
        if (err.response && err.response.status === 400) {
          // coming the code from backend ifalready the categroy present
          toast.error("Subcatergory already created");
        }
      });
  };

  // Deleting the categories when admin click on the any of the delte button.
  // to render on frontend we need to perform the delete operation on user state to inSTANT UPDATE THE STATE AFTER deleting.
  const DeleteItem = async (slug, token) => {
    removesubcategory(slug, user.token)
      .then((res) => {
        // console.log(res);
        // i need to set the category and return only those which are not equal to given slug..
        let filterdata = subcategory.filter((item) => item.slug !== slug);
        Setsubcategory(filterdata);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          {user && user.role === "admin" && <AdminSidebar></AdminSidebar>}
        </div>
        <div className="col-md-8" mt-3>
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
            <h3 className="text-center text-primary"> Subcategory page</h3>
          )}
          {user && user.role && user.role === "admin" ? (
            <div>
              <div className="form-group mt-4">
                <label htmlFor="" className="text-primary">
                  Parent Category
                </label>
                <select
                  name="category"
                  className="form-control"
                  onChange={(e) => {
                    setcategory(e.target.value);
                  }}
                >
                  <option value="">Please Select</option>
                  {/* Render options based on the categories */}
                  {categories &&
                    categories.length > 0 &&
                    categories.map((items) => (
                      <option value={items._id} key={items._id} className="m-2">
                        {items.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className=" mt-5">
                <Categoryfrom
                  handleSubmit={handleSubmit}
                  Setname={Setname}
                  name={name}
                ></Categoryfrom>
              </div>
              {/* create a select option for first confirm tour parent category */}

              {/* for the filter of the category */}
              <div className="mt-5">
                <input
                  type="search"
                  value={keyword}
                  onChange={handleChange}
                  placeholder="Find Subcategory "
                  className="form-control mb-5"
                />
              </div>
            </div>
          ) : null}
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
                          toast.success(`${el.slug} deleted successfully`);
                          Setkeyword("");
                        }}
                      />
                    </span>
                    <span className="btn btn-sm float-right  button">
                      <EditOutlined
                        className="text-warning "
                        onClick={() => {
                          // sending the name of slug also that we use in uelocation hook to grab it.
                          navigate(`/admin/subcategory/${el.slug}`, {
                            state: el.name,
                          });
                        }}
                      />
                    </span>
                  </div>
                ))
              : subcategory?.map((el) => (
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
                          navigate(`/admin/subcategory/${el.slug}`, {
                            state: el,
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

export default Subcategory;
