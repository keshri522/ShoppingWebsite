import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/auth/register";
import Home from "./pages/auth/home";
import Login from "./pages/auth/login";
import RegisterComplete from "./pages/auth/registerComplete";
import ForgotPassword from "./pages/auth/forgotpassword";
import UserDashBoard from "./LoginUser/userDashboard";
import Password from "./LoginUser/password";
import AdminDashBoard from "./admin/adminDashboard";
import CreateCategory from "./admin/category/CreateCategory";
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
        <Route
          path="user/dashboard"
          element={<UserDashBoard></UserDashBoard>}
        ></Route>

        <Route
          path="admin/dashboard"
          element={<AdminDashBoard></AdminDashBoard>}
        ></Route>
        <Route path="user/password" element={<Password></Password>}></Route>
        <Route
          path="admin/category"
          element={<CreateCategory></CreateCategory>}
        ></Route>
      </Routes>
    </div>
  );
};

export default Router;
