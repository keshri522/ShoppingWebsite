import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const CartPage = () => {
  const navigate = useNavigate();
  // get the data from redux
  const Cart = useSelector((state) => state.rootreducer.cart);
  const User = useSelector((state) => state.rootreducer.user);
  const disptach = useDispatch();
  // this function will return the total ammout
  const gettotalPrice = () => {
    let add = 0;
    let price = Cart.map((item) => {
      let c = item.price * item.count;
      add += c;
    });
    return add;
  };
  // this function will send all the cart details to databse if user manually try to CHANGE THE LOCAL stroage price then its not good we send it to db then once user come as login then we will get it from db
  const SavecarttoDb = () => {};
  return (
    <>
      <div className="container-fluid pt-3">
        <div className="row">
          <div className="col-md-8">
            <h4 className="text-primary">cart {Cart.length}</h4>
            {!Cart.length ? (
              <h4 className="text-danger">
                No porducts in the Cart{" "}
                <Link style={{ textDecoration: "none" }} to="/">
                  Continue Shopping
                </Link>
              </h4>
            ) : (
              "show cards"
            )}
          </div>

          <div className="col-md-3">
            <h4 className="text-primary">Order Summary</h4>
            <hr />
            <p>Products</p>
            {Cart.map((item) => (
              <div key={item._id}>
                <p className="font-weight-bold text-secondary">
                  {item.title}x{item.count}=${item.count * item.price}
                </p>
              </div>
            ))}
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
