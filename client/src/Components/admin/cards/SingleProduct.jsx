import React, { useEffect, useState } from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
const { Meta } = Card; // destructing the Meta object from the Card compoentest
const SingleProduct = ({ product, Setallproducts }) => {
  const { title, description, images, slug } = product; // destruting the objects from the item
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
        <Link to={`/product/${slug}`}>
          <EyeOutlined className="text-warning"></EyeOutlined>
          <br />
          view cart
        </Link>,

        <Link>
          <ShoppingCartOutlined
            className="text-danger "
            onClick={() => {}}
          ></ShoppingCartOutlined>
          <br />
          Add to Cart
        </Link>,
      ]}
    >
      {/* i want to show the description only of 50 char. */}
      <Meta
        title={title}
        description={`${description && description.substring(0, 50)}.....`}
        className="text-secondary"
      ></Meta>
    </Card>
  );
};

export default SingleProduct;
