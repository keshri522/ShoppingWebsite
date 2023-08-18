import React from "react";
import { Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { ProductDelete } from "../../functions/product";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
//destructing the Meta from card
const { Meta } = Card;
const AdminProductCard = ({ products, SetgetProduct }) => {
  console.log(products._id);
  let user = useSelector((state) => state.rootreducer.user);
  // we need to destructure the card or simply go with . notation..
  const { title, description, images } = products;
  // creating a function which will delete the products.
  const DeleteProducts = (product_id) => {
    console.log(product_id);
    // calling the delete api function
    ProductDelete(product_id, user.token)
      .then((res) => {
        console.log(res.data);
        SetgetProduct(res.data);
        toast.success("Deleted Sucessfully");
      })
      .catch((err) => {
        if (err && err.response & (err.response.status === 404)) {
          toast.error("Product not found");
        }
        toast.error(err.message);
        // console.log(err.message);
      });
  };
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
        <EditOutlined className="text-warning"></EditOutlined>,
        <DeleteOutlined
          className="text-danger"
          onClick={() => {
            DeleteProducts(products._id);
          }}
        ></DeleteOutlined>,
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
export default AdminProductCard;
