import React, { useState, useEffect } from "react";
import { getProductList } from "../../functions/product";
import SingleProduct from "../../admin/cards/SingleProduct";
import { LoadingOutlined } from "@ant-design/icons";
import Typewrittereffect from "../../admin/cards/typewrittereffect";
const Home = () => {
  const [allproducts, Setallproducts] = useState([]);
  const [loading, Setloading] = useState(false);
  // call the use effret hook to render the api in each once mounting.
  useEffect(() => {
    loadProducts();
  }, []);
  // this will give all the products to home page ..
  const loadProducts = () => {
    Setloading(true);
    getProductList(6)
      .then((res) => {
        Setallproducts(res.data);
        Setloading(false);
      })
      .catch((err) => {
        // console.log(err);
        Setloading(false);
      });
  };
  return (
    <>
      <div className="jumbotron">
        {loading ? (
          <h1 className=" text-danger text-center   ">
            <LoadingOutlined></LoadingOutlined>
          </h1>
        ) : (
          <div className="text-center style">
            <Typewrittereffect
              text={["Latest Products", "New Arrivals", "Best Seller"]}
            ></Typewrittereffect>
          </div>
        )}
      </div>
      {/* showing all the product based on the api  */}
      <di className="container-fluid">
        <div className="row p-5">
          <div className="col-md-2">
            <h1>Hello</h1>
          </div>
          <div className="col">
            <div className="row">
              {allproducts &&
                allproducts.length > 0 &&
                allproducts?.map((product) => (
                  <div className="col-md-4 mt-5 " key={product._id}>
                    <SingleProduct
                      product={product}
                      Setallproducts={Setallproducts}
                    ></SingleProduct>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </di>
    </>
  );
};

export default Home;
