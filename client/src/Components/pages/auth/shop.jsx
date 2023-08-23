import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductList } from "../../functions/product";
import SingleProduct from "../../admin/cards/SingleProduct";
import { LoadingOutlined } from "@ant-design/icons";
import { fetchSearch } from "../../functions/product";

const Shop = () => {
  // getting the data from the redux
  const SearchQuery = useSelector((state) => state.rootreducer.text); // this will give the text from redux..

  const [product, Setproduct] = useState([]);
  const [loading, Setloading] = useState(false);

  // using useffect to show all the products based on the count
  useEffect(() => {
    Getproduct();
  }, []);
  const Getproduct = () => {
    Setloading(true);
    getProductList(50).then((res) => {
      Setproduct(res.data);
      Setloading(false);
    });
  };

  // making reqquest to the backend based on the data coming from redux store..
  useEffect(() => {
    // to make a delay of some seconds we use settimeout
    const delayed = setTimeout(() => {
      fetchProducts({ query: SearchQuery.text });
    }, 400);
    // clearing the time interval once it is completed
    return () => clearInterval(delayed);
  }, [SearchQuery.text]);
  // this function will give the  products based on the search on input
  const fetchProducts = (arg) => {
    Setloading(true);
    fetchSearch(arg).then((res) => {
      if (res.data.length <= 0) {
        Setproduct([]);
      } else {
        Setproduct(res.data);
      }
      Setloading(false);
    });
    // to stop the loading to flase
    if (product.length === 0) {
      Setloading(false);
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <p>Search/filter</p>
          </div>
          <div className="col-md-10">
            {loading ? (
              <h4 className="text-danger text-center mt-5">
                <LoadingOutlined className="size my-auto"></LoadingOutlined>
              </h4>
            ) : (
              <h4 className="text-center text-primary jumbotron p-3 mt-2">
                Products
              </h4>
            )}
            {product.length === 0 ? (
              <>
                <h4 className="text-center text-danger">No products found</h4>
              </>
            ) : (
              <div className="row pb-5">
                {product.map((item) => (
                  <div className="col-md-4 mt-3" key={item._id}>
                    <SingleProduct product={item}></SingleProduct>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Shop;
