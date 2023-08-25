import React, { useEffect, useState } from "react";
import ModalImage from "react-modal-image";
import laptop from "../../pages/auth/download.png";
import { useSelector, useDispatch } from "react-redux";
import { addtocart } from "../../Redux/reducers/addtocartreducers";
// this compoentes basically create table body taking props as cart fomr cart.js
const Checkoutdetails = ({ cart }) => {
  const Cart = useSelector((state) => state.rootreducer.cart);
  const dispatch = useDispatch();
  const [colors, Setcolors] = useState([
    "Black",
    "Brown",
    "Silver",
    "White",
    "Blue",
  ]); // this is default colors

  // function this will set the value of select option
  const handlechange = (e) => {
    console.log(e.target.value);
    // need to update the local strogage when once change the color
    if (typeof window !== undefined) {
      let carts = [];
      if (localStorage.getItem("Cart")) {
        // need to add all the locastorage to cart
        carts = JSON.parse(localStorage.getItem("Cart"));
      }
      // need to update the color
      carts.map((product, index) => {
        if (product._id === cart._id) {
          carts[index].color = e.target.value;
        }
      });
      // need to update on local strogage
      localStorage.setItem("Cart", JSON.stringify(carts));
      // dispatch to redux also.
      dispatch(addtocart(carts));
    }
  };
  return (
    <tbody>
      <tr>
        <td>
          <div style={{ width: "100px", height: "auto" }}>
            {cart.images.length ? (
              <ModalImage
                small={cart.images[0].url}
                large={cart.images[0].url}
              ></ModalImage>
            ) : (
              <ModalImage small={laptop} large={laptop}></ModalImage>
            )}
          </div>
        </td>
        <td>{cart.title}</td>
        <td>{cart.brand}</td>
        <td>{cart.price}</td>
        <td>
          <select
            name="color"
            id=""
            onChange={handlechange}
            className="form-control"
          >
            {cart.color ? (
              <option>{cart.color}</option>
            ) : (
              <option>Select Color</option>
            )}
            {colors
              .filter((c) => c !== cart.color)
              .map((el) => (
                <option key={el} value={el}>
                  {el}
                </option>
              ))}
          </select>
        </td>
        <td>{cart.count}</td>
        <td>{cart.shipping}</td>
        <td>Delete</td>
      </tr>
    </tbody>
  );
};

export default Checkoutdetails;
