import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Getusercart, EmptyCart } from "../../functions/User";
import { toast } from "react-toastify";
import { addtocart } from "../../Redux/reducers/addtocartreducers";
const Checkout = () => {
  const disptach = useDispatch();
  const User = useSelector((state) => state.rootreducer.user);

  /// this function will save all the cart into the databse so if user manipulates from local storgage then no worries
  const savecarttoDb = () => {};
  const [products, Setproducts] = useState([]);
  const [total, Settotal] = useState(0);
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
  return (
    <>
      <div className="container-fluid">
        <div className="row mt-2">
          <div className="col-md-6 ">
            <h1>Delivery address</h1>
            <br />
            textarea
            <br />
            <button
              className="btn btn-sm btn-warning mt-2"
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
                <button className="btn btn-primary">Place Order</button>
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
