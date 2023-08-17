import React from "react";
import { Card } from "antd";
//destructing the Meta from card
const { Meta } = Card;
const AdminProductCard = ({ products }) => {
  // we need to destructure the card or simply go with . notation..
  const { title, description, images } = products;
  return (
    <Card
      cover={
        <img
          src={images && images.length ? images[0].url : " "}
          style={{ height: "220px", objectFit: "cover" }}
          className="p-1"
        ></img>
      }
    >
      <Meta title={title} description={description}></Meta>
    </Card>
  );
};
export default AdminProductCard;
