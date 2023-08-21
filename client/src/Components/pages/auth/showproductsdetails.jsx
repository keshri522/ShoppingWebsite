import React, { useEffect, useState } from "react";
import { getSingleProduct } from "../../functions/product";
import { useParams } from "react-router-dom";
const ShowProductDetails = () => {
  const [loading, Setloading] = useState(false);
  const [singleproduct, Setsingleproduct] = useState([]);
  const { slug } = useParams();
  // getting all the deatils of the products based on the slug
  useEffect(() => {
    loadProduct();
  }, [slug]);
  // function which will return the single product details based on the slug
  const loadProduct = () => {
    Setloading(true);
    getSingleProduct(slug).then((res) => {
      Setsingleproduct(res.data);
      Setloading(false);
    });
  };
  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
};
export default ShowProductDetails;
