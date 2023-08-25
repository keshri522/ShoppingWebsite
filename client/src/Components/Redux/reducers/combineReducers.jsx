import { combineReducers } from "@reduxjs/toolkit";
import userReducers from "./userReducers";
import searchreducers from "./searchreducers";
import addtocartreducers from "./addtocartreducers";
import changeState from "./drawerreducers";
const rootreducer = combineReducers({
  user: userReducers, //user reducers which works on the given action present int userReducers
  text: searchreducers,
  cart: addtocartreducers,
  statechange: changeState,
});
// user is state of the userReducers if we call the userReducer then we can call with user state..
export default rootreducer;
