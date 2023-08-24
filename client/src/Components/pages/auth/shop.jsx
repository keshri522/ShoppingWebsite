import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductList } from "../../functions/product";
import SingleProduct from "../../admin/cards/SingleProduct";
import { LoadingOutlined } from "@ant-design/icons";
import { fetchSearch } from "../../functions/product";
import { Menu, Slider, Checkbox } from "antd";

import { searchQuery } from "../../Redux/reducers/searchreducers";
import { getCategory } from "../../functions/category";
import { getsubcategory } from "../../functions/subcategory";
const { SubMenu, ItemGroup } = Menu; //destructure
const Shop = () => {
  // getting the data from the redux
  const SearchQuery = useSelector((state) => state.rootreducer.text); // this will give the text from redux..
  const dispatch = useDispatch();
  const [product, Setproduct] = useState([]);
  const [loading, Setloading] = useState(false);
  const [price, Setprice] = useState([0, 0]); // this is for the onchange on slider
  const [ok, Setok] = useState(false); // this is for change in state of slider
  const [category, Setcategory] = useState([]); // to add the category
  const [subcategory, Setsubcategory] = useState([]);
  const [sub, Setsub] = useState("");
  const [categoryIds, SetcategoryIds] = useState([]); // this is array of category id when user checked on checkbox
  // using useffect to show all the products based on the count
  // 1 load default products
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
  //  2 search the product
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

  // 3 search or filter the products based on price
  useEffect(() => {
    loadPrice({ price: price });
    // this is for subcategory to get all subcateogry
    getsubcategory().then((res) => {
      Setsubcategory(res.data);
    });
    // find all the category
    getCategory().then((res) => Setcategory(res.data));
  }, [ok]);
  const loadPrice = (arg) => {
    Setloading(true);
    fetchSearch(arg).then((res) => {
      Setproduct(res.data);
      Setloading(false);
    });
  };
  // function for
  const handleSlider = (value) => {
    // first we need to remove the previos redux store to empty
    dispatch(searchQuery({ text: "" }));
    // clear the check box
    SetcategoryIds([]);

    Setprice(value);
    //delaying
    setTimeout(() => {
      Setok(!ok);
    }, 400);
  };
  //  4 load product based on the category
  // view all the category based on checkbox
  useEffect(() => {
    // call the function to pass the id of category
    fetchSearch({ category: categoryIds }).then((res) => Setproduct(res.data));
  }, [categoryIds]);
  // this function will show all the categories in the slider
  const ShowCategories = () =>
    category?.map((item) => (
      <div key={item._id}>
        <Checkbox
          value={item._id}
          className="p-1 font-weight-bold"
          name="Category"
          onChange={handlechange}
        >
          {item.name}{" "}
        </Checkbox>
        <br />
      </div>
    ));
  //creating handlechange function to send the id of each checkbox when checked
  // it also check there is no dublicate items
  const handlechange = (e) => {
    // clearing the previos redux store
    dispatch(searchQuery({ text: "" }));
    //clear the price also..
    Setprice([0, 0]);
    Setsub("");
    const selectedId = e.target.value;
    // Check if the selectedId is already in categoryIds
    const isSelected = categoryIds.includes(selectedId);

    if (!isSelected) {
      // If not selected, add it to the array
      SetcategoryIds([...categoryIds, selectedId]);
    } else {
      // If selected, remove it from the array
      const updatedCategoryIds = categoryIds.filter((id) => id !== selectedId);
      SetcategoryIds(updatedCategoryIds);
    }
  };

  //  this is number 5 for subcategory
  const ShowSubCategories = () =>
    subcategory.map((item) => (
      <div
        key={item._id}
        style={{ cursor: "pointer", fontSize: "12px" }}
        onClick={() => handleSubmit(item)}
        className="p-2 m-1 badge badge-secondary"
      >
        {item.name}
      </div>
    ));

  // crreating the handlesubmit function
  const handleSubmit = (el) => {
    Setsub(el); // adding to this and send to backend sub
    // need to clear all the thing like redux or price fileter checkbox
    dispatch(searchQuery({ text: "" }));
    SetcategoryIds([]);
    Setprice([0, 0]);
  };
  useEffect(() => {
    fetchSearch({ Subcatergory: sub }).then((res) => Setproduct(res.data));
  }, [sub]);
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 pt-2">
            <h4>Search/filter</h4>
            <hr />
            <Menu mode="inline" defaultOpenKeys={["1", "2", "3"]}>
              {/* for the slider of price */}
              <SubMenu key="1" title={<span className="h6">Price</span>}>
                <div>
                  <Slider
                    className="ml-4 mr-4"
                    tipFormatter={(v) => `$${v}`}
                    range
                    value={price}
                    onChange={handleSlider}
                    max="7000"
                  ></Slider>
                </div>
              </SubMenu>
              {/* for the categorires */}
              <SubMenu key="2" title={<span className="h6">Categories</span>}>
                <div
                  style={{
                    height: "250px",
                    overflow: "scroll",
                    overflowX: "hidden",
                  }}
                >
                  {ShowCategories()}
                </div>
              </SubMenu>
              {/* this is for Subcategory */}
              <SubMenu
                key="3"
                title={<span className="h6 mt-2">Subcategories</span>}
              >
                <div
                  className="pl-4 pr-4"
                  // style={{
                  //   height: "250px",
                  //   overflow: "scroll",
                  //   overflowX: "hidden",
                  // }}
                >
                  {ShowSubCategories()}
                </div>
              </SubMenu>
            </Menu>
          </div>
          <div className="col-md-9 pt-2">
            <h4 className="text-center text-primary jumbotron p-3 mt-2"></h4>
            {/* {loading ? (
              <h4 className="text-danger text-center mt-5">
                <LoadingOutlined className="size my-auto"></LoadingOutlined>
              </h4>
            ) : (
              <h4 className="text-center text-primary jumbotron p-3 mt-2">
                Products
              </h4>
            )} */}

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
