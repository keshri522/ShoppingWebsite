import React, { useEffect, useState } from "react";
import { Card, Tabs, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import _ from "lodash";
import { addtocart } from "../../Redux/reducers/addtocartreducers";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
// this is the carousel from npm pakage and this is the css for the carousal pakage for showing multiple images
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Productdetails from "./productdetails";
const ViewProductdetails = ({ product }) => {
  const dispatch = useDispatch();
  const [tooltip, Settooltip] = useState("Click to add ");
  const { Tabpane } = Tabs;
  // destructing the itesm from product props.
  const {
    title,
    description,
    images, // this is an array of image which we need to show as carousal
    price,
    brand,
    category,
    color,
    Subcatergory,
    sold,
  } = product;
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

  return (
    <>
      <div className="col-md-7">
        <Carousel showArrows={true} autoPlay infiniteLoop>
          {images &&
            images.map((item) => (
              <img src={item.url} key={item.public_id}></img>
            ))}
        </Carousel>
        {/* using tabs to show the dexcription */}
        <Tabs type="card">
          <Tabpane
            tab="Description"
            key="1"
            className="text-secondary font-weight-bold ml-2 pb-2"
          >
            {description && description}
          </Tabpane>
          <Tabpane
            tab="More"
            key="2"
            className="text-secondary font-weight-bold ml-2 pb-3 "
          >
            Call us on xxxxxxxxxx to know more about this product.
          </Tabpane>
        </Tabs>
      </div>

      <div className="col-md-5">
        <h1 className="bg-info p-3">{product.title}</h1>

        {/* this is the layout from ant desgin */}
        <Card
          actions={[
            <>
              <Tooltip title={tooltip}>
                <a onClick={() => handleAddtoCart(product)}>
                  <ShoppingCartOutlined className="text-danger "></ShoppingCartOutlined>
                  <br />
                  Add to Cart
                </a>
              </Tooltip>
              ,
            </>,
            <Link to="/" style={{ textDecoration: "none" }}>
              <HeartOutlined className="text-primary"></HeartOutlined>
              <br />
              <h6> Add to Wishlist</h6>
            </Link>,
          ]}
        >
          <Productdetails product={product}></Productdetails>
        </Card>
      </div>
    </>
  );
};

export default ViewProductdetails;
