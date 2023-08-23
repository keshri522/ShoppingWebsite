import React from "react";
import { createSlice } from "@reduxjs/toolkit";

const SearchReducers = createSlice({
  initialState: {
    text: null,
  },
  name: "text",
  reducers: {
    // reduceers can not make update directly in the state first make the copy of orgianl state using spread operator then push the actions
    searchQuery: (state, action) => {
      state.text = action.payload.text;
    },
  },
});
// export
export const { searchQuery } = SearchReducers.actions;
export default SearchReducers.reducer;
