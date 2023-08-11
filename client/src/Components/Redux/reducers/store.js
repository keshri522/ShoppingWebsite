import { configureStore } from "@reduxjs/toolkit";
import rootreducer from "./combineReducers";
const store = configureStore({
  reducer: {
    rootreducer,
  },
});
export default store;
