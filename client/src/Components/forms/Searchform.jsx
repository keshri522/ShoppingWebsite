import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { searchQuery } from "../Redux/reducers/searchreducers";
const Searchform = () => {
  const dispatch = useDispatch(); // for dispatching the action into store..
  const SearchQuery = useSelector((state) => state.rootreducer.text); // this will give the text from redux..
  // console.log(SearchQuery.text);
  const navigate = useNavigate();
  //   console.log(SearchQuery);
  // some function onchange and handlesubmit

  const handleChange = (e) => {
    //sending the value to redux text state..
    e.preventDefault();
    dispatch(searchQuery({ text: e.target.value }));
  };
  const handlesubmit = (e) => {
    e.preventDefault();
    if (SearchQuery.text.length > 0) {
      navigate(`/shop?${SearchQuery.text}`);
    } else {
      toast.error("Cannot Search product with an empty value");
    }
  };

  return (
    <form className="form-inline my-2 my-lg-0" onSubmit={handlesubmit}>
      <input
        onChange={handleChange}
        type="text"
        className="form-control mr-sm-2 mt-1"
        value={SearchQuery.text}
        placeholder="Search"
      />
      <button
        className="btn btn-sm btn-secondary"
        onClick={handlesubmit}
        disabled={!SearchQuery.text}
      >
        Search
      </button>
    </form>
  );
};

export default Searchform;
