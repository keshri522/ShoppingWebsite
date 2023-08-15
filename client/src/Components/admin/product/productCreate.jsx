import React, { useEffect, useState } from "react";
import AdminSidebar from "../../Navbar/adminSidebar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios"; // these are async function that are imported from the functions
import { toast } from "react-toastify";
// import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ProductFormCreate from "../../forms/productFormCreate";
const ProductCreate = () => {
  // this is protected route so i need to add the code to only access by admin.
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
  //*********************************************************** */
  // creating a form for taking all the data that is going to save in the product modal.
  const IntialState = {
    title: "",
    description: "",
    price: "",
    category: "",
    Subcategory: [],
    shipping: "",
    quantity: "",
    images: "",
    colors: ["Black", "Brown", "Silver", "White", "Blue"], // these are set in the dropdown user select then the value will go to color and that will save in the backend
    brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
    color: "",
    brand: "",
  };
  const [value, Setvalue] = useState(IntialState);
  // destructure the item from value
  const {
    title,
    description,
    price,
    categories,
    category,
    Subcategory,
    shipping,
    quantity,
    images,
    colors,
    brands,
    color,
    brand,
  } = value;

  const handleSubmit = (e) => {
    e.preventDefault();
    //
  };

  const handleChange = (e) => {
    //
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
            <h3 className="text-center text-primary"> Product page</h3>
          )}
          {/* creating a form  */}
          <ProductFormCreate
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            quantity={quantity}
            description={description}
            price={price}
            colors={colors}
            brands={brands}
            title={title}
          ></ProductFormCreate>
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
