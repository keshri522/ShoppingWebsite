import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Getusercart, EmptyCart, UserAddress } from "../../functions/User";
import { toast } from "react-toastify";
import { addtocart } from "../../Redux/reducers/addtocartreducers";
// to createaddress bar we use React quill library
import ReactQuill from "react-quill";
// this is the css of Reactquill
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
const Checkout = () => {
  const navigate = useNavigate();
  const disptach = useDispatch();
  const User = useSelector((state) => state.rootreducer.user);
  const [count, Setcount] = useState(5);
  const [loading, Setloading] = useState(false);
  const [products, Setproducts] = useState([]);
  const [total, Settotal] = useState(0);
  const [address, Setaddress] = useState(""); // fro the text area taking addres from user
  const [savedaddress, Setsavedaddress] = useState(false); // to keep the button disable based on state
  // using useeffect to run the function
  useEffect(() => {
    if (User && User.token) {
      Getusercart(User.token)
        .then((res) => {
          //   console.log(res.data);
          Setproducts(res.data.products);
          Settotal(res.data.cartTotal);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);
  /// this function will save all the cart into the databse so if user manipulates from local storgage then no worries
  const savecarttoDb = () => {
    // need to send the address to database
    if (User && User.token) {
      UserAddress(address, User.token).then((res) => {
        // this will work only if in the response data===ok
        Setsavedaddress(true);

        toast.success("Address Saved");
      });
    }
  };

  // this will delete the cart to empty
  const DeleteCart = () => {
    // need to remove from localstroage
    if (typeof window !== "undefined") {
      localStorage.removeItem("Cart");
      // remove from redux
    }
    disptach(addtocart(""));
    if (User && User.token) {
      EmptyCart(User.token)
        .then((res) => {
          //   console.log(res.data);
          Setproducts(res.data.product);
          Settotal(0);
          toast.success("Cart is empty continue shopping");
        })
        .catch((error) => {
          console.log(error);
          toast.error("Something went wrong please try after Sometime");
        });
    }
  };
  // this function will redirect user to its history when user placed the order
  // const OrderPlaced = () => {
  //   // remove from the local storage as well as from redux

  //   Setloading(true);
  //   if (typeof window !== "undefined") {
  //     localStorage.removeItem("Cart");
  //   }
  //   disptach(addtocart("")); // making reddux empty
  //   // make some delay
  //   Setcount(5);
  //   const Interval = setInterval(() => {
  //     Setcount((count) => count - 1);
  //   }, 1000);
  //   // if it count become =0 then navigate
  //   // navigate to the user/history

  //   if (count === 0) {
  //     clearInterval(Interval);
  //     navigate("/user/history");
  //     Setloading(false);
  //   }
  // };
  const handleOrderPlaced = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("Cart");
    }

    disptach(addtocart("")); // Make sure the action creator and reducer are properly defined
    Setcount(5); // Reset the countdown value here
    toast.success("Order placed sucessfully");
    navigate("/user/history");
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row mt-2">
          <div className="col-md-6 ">
            <h1>Delivery address</h1>
            <br />
            <ReactQuill
              theme="snow"
              value={address}
              onChange={Setaddress}
            ></ReactQuill>
            <br />
            <button
              className="btn btn-sm btn-warning mt-2 mr-3"
              onClick={savecarttoDb}
            >
              Save
            </button>
          </div>
          <div className="col-md-6">
            <h1>Product Summary</h1>
            <hr />
            <p className="text-secondary  font-weight-bold">
              Products {products && products.length}
            </p>
            <hr />
            {products?.map((item, index) => (
              <div key={index}>
                <p className="text-secondary font-weight-bold">
                  {item.product.title} ({item.color}x{item.count}=
                  {item.product.price * item.count})
                </p>
              </div>
            ))}

            <hr />
            <p className="text-secondary  font-weight-bold">
              Cart Total:{total}
            </p>
            <div className="row">
              <div className="col-md-5 mt-2">
                <button
                  onClick={handleOrderPlaced}
                  className="btn btn-primary"
                  disabled={!savedaddress}
                >
                  Place Order
                </button>
              </div>
              <div className="col-md-5 mt-2">
                <button
                  disabled={!products || !products.length}
                  onClick={DeleteCart}
                  className="btn btn-danger"
                >
                  Empty Cart
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="row">
          <div className="col-md-6 mt-3">
            <button className="btn btn-primary">Place Order</button>
          </div>
          <div className="col-md-6 mt-3">
            <button className="btn btn-danger">Empty Cart</button>
          </div>
        </div> */}
      </div>
    </>
  );
};
export default Checkout;
