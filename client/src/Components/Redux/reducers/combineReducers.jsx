import { combineReducers } from "@reduxjs/toolkit";
import userReducers from "./userReducers";

const rootreducer = combineReducers({
  user: userReducers, //user reducers which works on the given action present int userReducers
});
// user is state of the userReducers if we call the userReducer then we can call with user state..
export default rootreducer;
