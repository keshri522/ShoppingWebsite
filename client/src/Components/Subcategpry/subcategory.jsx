import React, { useEffect, useState } from "react";
import { getsubcategory } from "../functions/subcategory";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Subcategorylist = () => {
  const [subcategorylist, Setsubcategorylist] = useState([]);
  const [loading, Setloading] = useState(false);
  // run the useffect here to get all the categories once refresh the pages.
  useEffect(() => {
    AllSubcategory();
  }, []);
  // this function will return the all the categories based on the database.
  const AllSubcategory = () => {
    getsubcategory()
      .then((res) => {
        Setloading(true);
        // console.log(res.data);
        Setsubcategorylist(res.data);

        Setloading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
      });
  };
  // this function will all the categories that admin had created
  const ShowAllSubCategories = () =>
    subcategorylist?.map((item) => (
      <div className="col-md-3">
        <Link
          to={`/subcategory/${item.slug}`}
          style={{ textDecoration: "none" }}
        >
          <div key={item._id} className="btn btn-info m-3 btn-md btn-block">
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
            ShowAllSubCategories()
          )}
        </div>
      </div>
    </div>
  );
};

export default Subcategorylist;
