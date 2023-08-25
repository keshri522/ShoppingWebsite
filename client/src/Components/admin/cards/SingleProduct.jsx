import React, { useEffect, useState } from "react";
import { Card, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import { useDispatch } from "react-redux";
import { addtocart } from "../../Redux/reducers/addtocartreducers";
const { Meta } = Card; // destructing the Meta object from the Card compoentest
const SingleProduct = ({ product, Setallproducts }) => {
  const dispatch = useDispatch();
  const [tooltip, Settooltip] = useState("Click to add ");

  // this function will add item to add to cart
  // 1. we need to create empty array. once user click to add to we add the product into localstroge as well as in database
  // 2. If localstroage is already present then we get the value and assign to cart array
  // 3. if localstroage is not presnet then we need to push the product in the cart arry
  // 4. check if user click on the same product we need avoid adding dubplicate products in the cart so we can use mpap function or simpe use loadash library
  // 5. then add the unique item to the localstorage..

  const handleAddtoCart = (product) => {
    // check if window object is presnet or not
    let cart = [];
    if (typeof window !== undefined) {
      // check if local storage have some item
      if (localStorage.getItem("Cart")) {
        // then need to add this products in the cart
        cart = JSON.parse(localStorage.getItem("Cart"));
      }

      // if there is no product present in the local storage then we push the product in the cart array

      cart.push({
        ...product,
        count: 1,
      });

      // need ot check before adding the
      let unique = _.uniqWith(cart, _.isEqual); // remove the dublicates
      // save in the localstorge.
      localStorage.setItem("Cart", JSON.stringify(unique));
      // need to push to redux store
      dispatch(addtocart(unique));

      Settooltip("Added to cart");
    }
  };

  const navigate = useNavigate();
  const { title, description, images, slug, price } = product; // destruting the objects from the item
  return (
    <Card
      cover={
        <img
          src={images && images.length ? images[0].url : " "}
          style={{ height: "220px", objectFit: "cover" }}
          className="p-1"
        ></img>
      }
      actions={[
        <Link to={`/product/${slug}`} state={{ slug: slug }}>
          <EyeOutlined className="text-warning"></EyeOutlined>
          <br />
          view cart
        </Link>,
        <Tooltip title={tooltip}>
          <a onClick={() => handleAddtoCart(product)}>
            <ShoppingCartOutlined className="text-danger "></ShoppingCartOutlined>
            <br />
            Add to Cart
          </a>
        </Tooltip>,
      ]}
    >
      {/* i want to show the description only of 50 char. */}
      <Meta
        title={`${title}- $${price}`}
        description={`${description && description.substring(0, 50)}.....`}
        style={{ fontWeight: "bold" }}
      ></Meta>
    </Card>
  );
};

export default SingleProduct;
