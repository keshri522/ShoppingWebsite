import React, { useEffect, useState } from "react";
import { Card, Tabs } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
// this is the carousel from npm pakage and this is the css for the carousal pakage for showing multiple images
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Productdetails from "./productdetails";
const ViewProductdetails = ({ product }) => {
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
              <ShoppingCartOutlined className="text-success"></ShoppingCartOutlined>
              <br />
              <h6> Add to Cart</h6>
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
