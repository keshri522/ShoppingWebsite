import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getCategoryNames } from "../../functions/category";
import SingleProduct from "../../admin/cards/SingleProduct";
const Categoryhome = () => {
  const { slug } = useParams();
  const [category, Setcategory] = useState([]);
  // this will add all the products matched the slug category
  const [product, Setproduct] = useState([]);
  const [loading, Setloading] = useState(false);

  useEffect(() => {
    CategoryList();
  }, []);
  // this function will all the categories based on the slug
  const CategoryList = () => {
    Setloading(true);
    getCategoryNames(slug).then((res) => {
      Setcategory(res.data.category);
      Setproduct(res.data.products);
      Setloading(false);
    });
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <di className="col">
            {loading ? (
              <h4 className="text-center text-danger jumbotron p-3 mt-5">
                ...loading
              </h4>
            ) : (
              <h4 className="text-center text-secondary jumbotron p-3 mt-5">
                {product.length} Products in {category.name} Category
              </h4>
            )}
          </di>
        </div>
        <div className="row">
          {product.map((el) => (
            <div className="col-md-4">
              <SingleProduct product={el}></SingleProduct>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categoryhome;
