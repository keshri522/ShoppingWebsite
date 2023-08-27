import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Checkoutdetails from "../../admin/cards/checkoutdetails";
import { toast } from "react-toastify";
import { UserCartData } from "../../functions/User";
const CartPage = () => {
  const navigate = useNavigate();
  // get the data from redux
  const Cart = useSelector((state) => state.rootreducer.cart);

  const User = useSelector((state) => state.rootreducer.user);

  const disptach = useDispatch();
  // this function will return the total ammout
  const gettotalPrice = () => {
    if (!Cart && !Cart.length) {
      return 0;
    }
    let add = 0;
    let price = Cart?.map((item) => {
      let c = item.price * item.count;
      add += c;
    });
    return add;
  };
  // this function will create the details of the product in the table form
  const ShowprodcutCartdetails = () => (
    <table className="table table-bordered">
      <thead className="table-light">
        <tr>
          <th scope="col">Image</th>
          <th scope="col">Title</th>
          <th scope="col">Brand</th>
          <th scope="col">Price</th>
          <th scope="col">Color</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
          <th scope="col">Remove</th>
        </tr>
      </thead>

      {Cart && Cart.length ? (
        Cart.map((item) => (
          <Checkoutdetails key={item._id} cart={item}></Checkoutdetails>
        ))
      ) : (
        <h4>No item in the Cart</h4>
      )}
    </table>
  );

  // this function will send all the cart details to databse if user manually try to CHANGE THE LOCAL stroage price then its not good we send it to db then once user come as login then we will get it from db
  const SavecarttoDb = () => {
    console.log("hello");
    // saving the cart into data base for security reason
    if (User && User.token) {
      console.log(User && User.token);
      UserCartData(Cart, User.token)
        .then((res) => {
          console.log(res.data);
          // if response is coming then only redirect the use to check out we have to for that
          if (res.data.ok) {
            navigate("/checkout");
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.message);
        });
    }
  };
  return (
    <>
      <div className="container-fluid pt-3">
        <div className="row">
          <div className="col-md-8 ">
            <h4 className="text-primary ml-3">Cart {Cart.length}</h4>
            {!Cart.length ? (
              <h4 className="text-danger ml-3">
                No porducts in the Cart{" "}
                <Link style={{ textDecoration: "none" }} to="/">
                  Continue Shopping
                </Link>
              </h4>
            ) : (
              ShowprodcutCartdetails()
            )}
          </div>

          <div className="col-lg-3">
            <h4 className="text-primary">Order Summary</h4>
            <hr />
            <p>Products</p>
            <div>
              {Cart.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                Cart.map((item) => (
                  <div key={item._id}>
                    <p className="font-weight-bold text-secondary">
                      {item.title} x {item.count} = ${item.count * item.price}
                    </p>
                  </div>
                ))
              )}
            </div>
            <hr />
            Total:
            {
              <span className="font-weight-bold text-secondary ml-1">
                ${gettotalPrice()}
              </span>
            }
            <hr />
            {/* need to check if try to purchase after add to card we need to verfiy if user i  loged in then only move ofrward  */}
            {User && User.email ? (
              <button
                onClick={SavecarttoDb}
                disabled={!Cart.length}
                className="btn btn-sm  mt-2 btn-success"
              >
                Proceed to checkout
              </button>
            ) : (
              <button
                onClick={() => {
                  navigate("/login", { state: { from: "cart" } });
                }}
                className="btn btn-sm btn-secondary mt-2"
                disabled={!Cart.length}
              >
                login to checkout
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default CartPage;
