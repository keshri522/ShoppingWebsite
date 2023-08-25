import React, { useState, useEffect } from "react";
import {
  getTotalProduct,
  getPaginationProducts,
} from "../../functions/product";
import SingleProduct from "../../admin/cards/SingleProduct";
import { LoadingOutlined } from "@ant-design/icons";
import Typewrittereffect from "../../admin/cards/typewrittereffect";
import { Pagination } from "antd";
import Categorylist from "../../category/categorylist";
import Subcategorylist from "../../Subcategpry/subcategory";
const Home = () => {
  const [allproducts, Setallproducts] = useState([]);

  const [loading, Setloading] = useState(false);
  // store the total product in usestate
  const [totalProuct, SettotalProduct] = useState(0);
  // once user click on the pagination i want to send the page number also in backend based on that skip will workd
  const [page, Setpage] = useState(1);
  // call the use effret hook to render the api in each once mounting.
  useEffect(() => {
    loadProducts();
  }, [page]); // when ever our pages changes the use effect will run
  // this will give the total number of products present in db
  useEffect(() => {
    getTotalProduct().then((res) => {
      SettotalProduct(res.data);
    });
  }, []);

  // this will give all the products to home page ..
  const loadProducts = () => {
    Setloading(true);
    getPaginationProducts("createdAt", "desc", page)
      .then((res) => {
        // console.log(res);
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
      <div className="jumbotron p-4">
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
      <div className="container-fluid">
        <div className="row p-5">
          <div className="col">
            <div className="row">
              {allproducts &&
                allproducts.length > 0 &&
                allproducts?.map((product) => (
                  <div className="col-md-4 mb-4 " key={product._id}>
                    <SingleProduct
                      product={product}
                      Setallproducts={Setallproducts}
                    ></SingleProduct>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      {/* this is pagination coming from ant desgin onchang if we change the pagination button it will increase or decrease the value by one based on that we are sending the page in backend */}
      <Pagination
        current={page}
        total={Math.ceil(totalProuct / 6) * 10}
        onChange={(value) => Setpage(value)}
        className="text-center p-3 mb-5"
      ></Pagination>

      <h4 className="text-center text-primary jumbotron p-3 ">Categories</h4>
      <Categorylist></Categorylist>

      <h4 className="text-center text-primary jumbotron p-3 ">Subcategories</h4>
      <Subcategorylist></Subcategorylist>
    </>
  );
};

export default Home;
