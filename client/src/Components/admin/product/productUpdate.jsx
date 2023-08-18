import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import AdminSidebar from "../../Navbar/adminSidebar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { getSingleProduct } from "../../functions/product";
import { LoadingOutlined } from "@ant-design/icons";
import { getSubcategory } from "../../functions/category";
import ProductUpdateForm from "../../forms/productupdateform";
import { getCategory } from "../../functions/category";
const ProductUpdate = () => {
  // with the help of useloaction we here got the slug coming from admin product card
  const location = useLocation();
  let slug = location.state;
  const navigate = useNavigate();
  const [count, Setcount] = useState(5);
  const [loading, Setloading] = useState(false);
  const [state, setstate] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subOptions, setSubOptions] = useState([]);
  //getting token from redux
  const user = useSelector((state) => state.rootreducer.user);
  // router

  // this is protected routes
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

  // same as product create so need to use all thestate that we used in product create

  const initialState = {
    title: "",
    description: "",
    price: "",
    // categories: [],
    category: "",
    Subcatergory: [],
    shipping: "",
    quantity: "",
    images: [],
    colors: ["Black", "Brown", "Silver", "White", "Blue"],
    brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
    color: "",
    brand: "",
  };
  const [values, Setvalues] = useState(initialState);
  // using useeffect
  useEffect(() => {
    getproducts(slug);
    loadCategories(); // this will give the all the categories in select options
  }, [slug]);

  // this will load the products
  const getproducts = (slug) => {
    Setloading(true);
    getSingleProduct(slug)
      .then((res) => {
        // console.log(res.data[0]);
        // setting the resdata to the initial state of the update form then make a update and send to backend for updating
        Setvalues({ ...values, ...res.data[0] }); // it will set the intial state to res.data values
        Setloading(false);
      })
      .catch((err) => {
        if (err && err.response && err.response.status === 404) {
          //   console.log("Product not found");
          toast.error("Product not found");
          Setloading(false);
        }
      });
  };
  // this will load the categoties to show on select option
  const loadCategories = () =>
    getCategory().then((c) => {
      setCategories(c.data);
    });

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    Setvalues({ ...values, [name]: value });
    //
  };

  // creating a separate function for the category to the id of category once got the id we show the subcategory based on the id
  const handleChangeCategory = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    Setvalues({ ...values, subs: [], category: value });
    // console.log(`${name} is clicked whose id is ${value}`);
    // once user clicked i make a request ot backend to find the subcategory based on the parent category.
    getSubcategory(value)
      .then((res) => {
        // console.log(res);
        setSubOptions(res.data); // set into usestate .
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminSidebar />
        </div>

        <div className="col-md-10">
          <h4 className="text-danger text-center">Product update</h4>
          {loading ? (
            <div className="text-primary text-center mt-auto  ">
              <LoadingOutlined className="text"></LoadingOutlined>
            </div>
          ) : (
            <ProductUpdateForm
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              values={values}
              Setvalues={Setvalues}
              handleChangeCategory={handleChangeCategory}
              categories={categories}
              subOptions={subOptions}
            ></ProductUpdateForm>
          )}

          <hr />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
