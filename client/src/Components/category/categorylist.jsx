import React, { useEffect, useState } from "react";
import { getCategory } from "../functions/category";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const Categorylist = () => {
  const [categorylist, Setcategorylist] = useState([]);
  const [loading, Setloading] = useState(false);
  // run the useffect here to get all the categories once refresh the pages.
  useEffect(() => {
    AllCategory();
  }, []);
  // this function will return the all the categories based on the database.
  const AllCategory = () => {
    getCategory()
      .then((res) => {
        Setloading(true);
        // console.log(res.data);
        Setcategorylist(res.data);

        Setloading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
      });
  };
  // this function will all the categories that admin had created
  const ShowAllCategories = () =>
    categorylist?.map((item) => (
      <div className="col-md-3">
        <Link to={`/category/${item.slug}`} style={{ textDecoration: "none" }}>
          <div key={item._id} className="btn btn-info m-3 btn-lg btn-block">
            {item.name}
          </div>
        </Link>
      </div>
    ));
  return (
    <div>
      <div className="container">
        <div className="row">
          {loading ? (
            <h4 className="text-center text-danger">...loading</h4>
          ) : (
            ShowAllCategories()
          )}
        </div>
      </div>
    </div>
  );
};

export default Categorylist;
