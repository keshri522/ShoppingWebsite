import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/auth/register";
import Home from "./pages/auth/home";
import Login from "./pages/auth/login";
import RegisterComplete from "./pages/auth/registerComplete";
import ForgotPassword from "./pages/auth/forgotpassword";
const Router = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/register/" element={<Register></Register>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route
          path="/register/complete"
          element={<RegisterComplete></RegisterComplete>}
        ></Route>
        <Route
          path="/forgot/password"
          element={<ForgotPassword></ForgotPassword>}
        ></Route>
      </Routes>
    </div>
  );
};

export default Router;
