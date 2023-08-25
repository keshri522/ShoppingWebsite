import React from "react";
import { createSlice } from "@reduxjs/toolkit";

const getDataFromLocalStroage = () => {
  let localData = localStorage.getItem("Cart");
  if (localData) {
    return JSON.parse(localData);
  } else {
    return [];
  }
};
const AddtpCart = createSlice({
  initialState: getDataFromLocalStroage(),

  name: "cart",
  reducers: {
    // reduceers can not make update directly in the state first make the copy of orgianl state using spread operator then push the actions
    addtocart: (state, action) => {
      return action.payload;
    },
  },
});
// export
export const { addtocart } = AddtpCart.actions;
export default AddtpCart.reducer;
