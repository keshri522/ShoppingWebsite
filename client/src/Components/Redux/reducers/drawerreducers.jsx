import React from "react";
import { createSlice } from "@reduxjs/toolkit";

const Drawer = createSlice({
  initialState: false,
  name: "StatChange",
  reducers: {
    changeState: (state, action) => {
      return action.payload;
    },
  },
});
export const { changeState } = Drawer.actions;
export default Drawer.reducer;
