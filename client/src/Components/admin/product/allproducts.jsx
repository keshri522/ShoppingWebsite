import React, { useEffect, useState } from "react";
import AdminSidebar from "../../Navbar/adminSidebar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";
import { getProductList } from "../../functions/product";
import AdminProductCard from "../cards/adminProductcart";
import { LoadingOutlined } from "@ant-design/icons";

const AllProducts = () => {
  const navigate = useNavigate();

  let user = useSelector((state) => state.rootreducer.user);

  const [count, Setcount] = useState(5);

  const [state, setstate] = useState(false);
  const [getProduct, SetgetProduct] = useState([]); // this is for the getting all the products from backend
  const [loading, Setloading] = useState(false);
  const [search, Setsearch] = useState(""); // this is for the search of products

  // using useeffect..
  useEffect(() => {
    setstate(false);
    if (user && user.token) {
      // console.log(state);
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
          // console.log("Admin data response is", data);
          setstate(false);
          // console.log(state);
        })
        .catch((error) => {
          // console.log("Admin route error", error);
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

      // console.log(state);

      // Clear the interval
      return () => {
        clearInterval(interval);
        setstate("");
      };
    }
  }, [user, count, navigate, state]);
  // write the api function in the useeffect
  useEffect(() => {
    loadingProduct();
  }, []);
  // this function will give the all the products
  const loadingProduct = () => {
    Setloading(true);
    getProductList(100)
      .then((res) => {
        SetgetProduct(res.data);
        // console.log(res.data);
        Setloading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }; // creating a DeleteProducts functions

  const handleChange = (e) => {
    e.preventDefault();
    Setsearch(e.target.value);
    SearchFilterItem(e.target.value);
  };
  // this function will check if the keyword that admi enter is present in the category or not..
  const SearchFilterItem = (keyword) => {
    let filterData = getProduct.filter((item) =>
      item.title.toLowerCase().startsWith(keyword.toLowerCase())
    );
    return filterData;
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          {user && user.role === "admin" && <AdminSidebar></AdminSidebar>}
        </div>
        {state ? (
          <div className="mt-5 mx-auto">
            <h4 className="text-center text-secondary">
              Redirecting to home page {count}
            </h4>
            <h3 className="text-center text-danger">
              Sorry Only Admin can access this route
            </h3>
          </div>
        ) : loading ? (
          <h1 className=" text-danger  mx-auto my-auto">
            <LoadingOutlined></LoadingOutlined>
          </h1>
        ) : (
          <div className="col mt-4">
            {/* // this is for the searching products for admin */}
            <input
              type="text"
              placeholder="Search Products"
              className="form-control ml-auto mr-3 mb-3"
              style={{ width: "20%" }}
              onChange={handleChange}
            />
            {/* based on the search it show all the values */}
            {search && search.length > 0 ? (
              <div className="row">
                {SearchFilterItem(search)?.map((products) => (
                  <div className="col-md-4 mt-3" key={products._id}>
                    <AdminProductCard
                      products={products}
                      SetgetProduct={SetgetProduct}
                    ></AdminProductCard>
                  </div>
                ))}
              </div>
            ) : getProduct && getProduct.length > 0 ? (
              <div className="row">
                {getProduct?.map((products) => (
                  <div className="col-md-4 mt-3" key={products._id}>
                    <AdminProductCard
                      products={products}
                      SetgetProduct={SetgetProduct}
                    ></AdminProductCard>
                  </div>
                ))}
              </div>
            ) : (
              <div className=" text-center text-danger">
                <h3>No products availbale please create</h3>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProducts;
