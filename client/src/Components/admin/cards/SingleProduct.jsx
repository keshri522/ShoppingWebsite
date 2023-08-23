import React, { useEffect, useState } from "react";
import { Card } from "antd";
import { Link } from "react-router-dom";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const { Meta } = Card; // destructing the Meta object from the Card compoentest
const SingleProduct = ({ product, Setallproducts }) => {
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
        // <EyeOutlined
        //   className="text-warning"
        //   onClick={() => {
        //     navigate(`/product/${slug}`, { slug: slug });
        //   }}
        // />,

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
        title={`${title}- $${price}`}
        description={`${description && description.substring(0, 50)}.....`}
        style={{ fontWeight: "bold" }}
      ></Meta>
    </Card>
  );
};

export default SingleProduct;
