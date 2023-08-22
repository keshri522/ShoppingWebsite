import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getsubcategorynames } from "../../functions/subcategory";
import SingleProduct from "../../admin/cards/SingleProduct";
const Subcategoryhome = () => {
  const { slug } = useParams();
  const [subcategory, Setsubcategory] = useState([]);
  // this will add all the products matched the slug category
  const [product, Setproduct] = useState([]);
  const [loading, Setloading] = useState(false);

  useEffect(() => {
    SubcategoryList();
  }, []);
  // this function will all the categories based on the slug
  const SubcategoryList = () => {
    Setloading(true);
    getsubcategorynames(slug).then((res) => {
      Setsubcategory(res.data.Subcategory);
      Setproduct(res.data.SubCategoryProucts); // this will add all the subcategroy product based on the slug
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
                {product.length} Products in {subcategory.name} Subcategory
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

export default Subcategoryhome;
