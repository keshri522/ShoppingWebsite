import React, { useEffect, useState } from "react";
import { getSingleProduct } from "../../functions/product";
import { useParams } from "react-router-dom";
import ViewProductdetails from "../../admin/cards/viewProductdetails";
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
      // console.log(res.data);
      Setsingleproduct(res.data[0]);
      Setloading(false);
    });
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row pt-4">
          <ViewProductdetails product={singleproduct}></ViewProductdetails>
        </div>
      </div>
      <div className="row">
        <div className="col text-center pt-5 pb-5">
          <hr className="text-secondary" />
          <h1>Releated Prodcuts</h1>
        </div>
      </div>
    </>
  );
};
export default ShowProductDetails;
